require(["../../scripts/conf/config.js"], function () {
    require(["jquery", "cookie"], function ($) {
        $(function () {
            // 移入顶部导航栏
            $('.top_nav li a').hover(function () {
                $(this).addClass('active');
            }, function () {
                $(this).removeClass('active');
            })

            //移入个人中心
            let timer1;
            $('.top_user a').hover(function () {
                $(this).css("background-position", "-17px 2px");
                if ($.cookie("username1")) {
                    $('.nav_user_wrapper').css("display", "block");
                    $('.user').html('+86 ' + $.cookie("username"));
                }

            }, function () {
                $(this).css("background-position", "1px 2px");
                timer1 = setTimeout(() => {
                    $('.nav_user_wrapper').css("display", "none");
                }, 300);
            })
            $('.nav_user_wrapper').mouseover(function () {
                clearTimeout(timer1);
                $(this).css("display", "block");
            })
            $('.nav_user_wrapper').mouseout(function () {
                $(this).css("display", "none");
            })

            //注销
            $('.list .logout').click(function () {
                $('.nav_user_wrapper').css("display", "none");
                $.cookie('username1', '', {
                    expires: -1,
                    path: '/'
                })
                $.cookie('password1', '', {
                    expires: -1,
                    path: '/'
                })
            })

            //移入购物车
            let timer2;
            $('.top_cart a').hover(function () {
                $(this).css("background-position", "-18px -17px");

                if ($.cookie("data") && $.cookie("username1")) {
                    //创建右上角购物车
                    $('.box_inner').html('');

                    let info = JSON.parse($.cookie("data"));
                    console.log(info);
                    for (let i = 0; i < info.length; i++) {
                        createInfo(info[i]);
                    }

                    function createInfo(info) {
                        let $div = $('<div class="cart_group"></div>');
                        $div.html(`
                            <div class="items-thumb">
                            <img src=${info.img}
                                alt="">
                            </div>
                            <div class="cart_info">
                                <div class="name">
                                    ${info.name}
                                </div>
                                <div class="price">
                                    <span>¥${info.price}<i>&nbsp;×&nbsp;${info.sum}</i></span>
                                </div>
                            </div>
                        `);
                        $('.box_inner').append($div);
                    }

                    //总商品的数量 总价格
                    let sum = 0;
                    let money = 0;
                    for (let i = 0; i < info.length; i++) {
                        sum = parseInt(info[i].sum) + parseInt(sum);
                        money = parseInt(info[i].total) + parseInt(money);
                    }
                    $('.shipping-num h4 i').html(sum);

                    $('.shipping-price h4 span').html('￥' + money);
                    //显示购物车
                    $('.info_wrapper').css("display", "block");
                } else {
                    $('.cart_wrapper').css("display", "block");
                }

            }, function () {
                $(this).css("background-position", "0px -17px");
                timer2 = setTimeout(() => {
                    $('.info_wrapper').css("display", "none");
                    $('.cart_wrapper').css("display", "none");
                }, 300);
            })
            $('.cart_wrapper').hover(function () {
                clearTimeout(timer2);
                $(this).css("display", "block");
            }, function () {
                $(this).css("display", "none");
            })
            $('.info_wrapper').hover(function () {
                clearTimeout(timer2);
                $(this).css("display", "block");
            }, function () {
                $(this).css("display", "none");
            })


            //点击进入购物车
            $('.jieguo').click(function () {
                window.open("../shoppingcart/shoppingcart.html");
            })
            $('.top_cart a').click(function () {
                window.open("../shoppingcart/shoppingcart.html");
            })

            // 移入导航栏
            $('.nav_list li a').hover(function () {
                $(this).addClass('active');
            }, function () {
                $(this).removeClass('active');
            })

            //搜索框获得焦点
            $('.search_box').focus(function () {
                $('.keywords_list').css("display", "block");
                $('.search_recommend_words').css("display", "none");
                $(this).attr("placeholder", "请输入搜索的商品");
            })

            //搜索框失去焦点
            $('.search_box').blur(function () {
                $('.keywords_list').css("display", "none");
                $('.search_recommend_words').css("display", "block");
                $(this).attr("placeholder", "");
            })

            //搜索框输入关键字
            $('.search_box').on('input', function () {
                let val = $(this).val();
                $.getJSON('/api/v1/search/suggest?keyword=' + val, function (data) {
                    let info = data.data;

                    $('.result_list').html('');
                    for (let i = 0; i < info.length; i++) {

                        let $li = document.createElement('li');
                        $li.innerHTML = `
                            <span>${info[i]}</span>
                        `;
                        $('.result_list').append($li);
                    }
                })
            })
            //动态创建首页二级导航
            $.getJSON("/api/v1/cms/second_nav", function (data) {
                let info = data[0].list;

                for (let i = 0; i < info.length; i++) {
                    let $li = document.createElement('li');
                    $li.innerHTML = `
                        <a href="" class="min_title">${info[i].title}</a>
                        <div class="nav_category_item">                           
                        </div>
                    `;
                    $('.nav_category_list').append($li);

                    for (let j = 0; j < info[i].sub.length; j++) {
                        let $span = document.createElement('span');
                        $span.className = 'sw';
                        $span.innerHTML = `
                            <img src=${info[i].sub[j].image} alt="">
                            <span>${info[i].sub[j].name}</span>
                            <a href="" title="${info[i].sub[j].name}"></a>
                        `;
                        $('.nav_category_item').eq(i).append($span);
                    }
                }
            })

            //移入导航栏首页
            let timer3;
            $('.nav_list').hover(function () {
                $('.nav_goods_panel').css("display", "block");
            }, function () {
                timer3 = setTimeout(() => {
                    $('.nav_goods_panel').css("display", "none");
                }, 300);
            })
            $('.nav_goods_panel').mouseover(function () {
                clearTimeout(timer3);
                $(this).css("display", "block");
            })
            $('.nav_goods_panel').mouseout(function () {
                $(this).css("display", "none");
            })

            //动态创建主体内容
            let idVal = $.cookie("idVal");
            $.getJSON("/api/product/skus?ids=" + idVal + "&with_stock=true&with_spu=true", function (data) {
                let info = data.data.list[0];

                let $div = $('<div class="item_wrapper"></div>');
                $div.html(`
                    <div class="gray_box">
                    <div class="gallery_wrapper">
                        <div class="gallery">
                            <figure class="thumbnail">
                                <ul>
                                    <li><img src=${info.shop_info.ali_images[0]}?x-oss-process=image/resize,w_80/format,webp
                                            alt=""
                                            data-src=${info.shop_info.ali_images[0]}?x-oss-process=image/resize,w_527/format,webp>
                                    </li>
                                   <li><img src=${info.shop_info.ali_images[1]}?x-oss-process=image/resize,w_80/format,webp
                                            alt=""
                                            data-src=${info.shop_info.ali_images[1]}?x-oss-process=image/resize,w_527/format,webp>
                                    </li>
                                    <li><img src=${info.shop_info.ali_images[2]}?x-oss-process=image/resize,w_80/format,webp
                                            alt=""
                                            data-src=${info.shop_info.ali_images[2]}?x-oss-process=image/resize,w_527/format,webp>
                                    </li>
                                    <li><img src=${info.shop_info.ali_images[3]}?x-oss-process=image/resize,w_80/format,webp
                                            alt=""
                                            data-src=${info.shop_info.ali_images[3]}?x-oss-process=image/resize,w_527/format,webp>
                                    </li>
                                    <li><img src=${info.shop_info.ali_images[4]}?x-oss-process=image/resize,w_80/format,webp
                                            alt=""
                                            data-src=${info.shop_info.ali_images[4]}?x-oss-process=image/resize,w_527/format,webp>
                                    </li>
                                </ul>
                            </figure>
                            <figure class="thumb">
                                <ul>
                                    <li><img src=${info.shop_info.ali_images[0]}?x-oss-process=image/resize,w_527/format,webp
                                            alt=""></li>
                                </ul>
                            </figure>
                        </div>
                    </div>
                    <div class="item_information">
                        <article class="item_title">
                            <h1>${info.shop_info.title}</h1>
                            <h2></h2>
                            <div class="item_price">
                                <span>
                                    <em>¥</em> <i>${info.price}</i>
                                </span>
                                <span class="original_price"> 原价： <em>¥1000.00</em>
                                </span>
                            </div>
                        </article>
                        <section class="activities_wrapper">
                            <div class="activities">
                                <span class="activities_title">促销活动 </span>
                                <div class="activities_list">
                                    <article class="activities_item">
                                        <figure class="tag_wrapper">
                                            <span class="tag_yellow"> 鞋服优惠 </span>
                                        </figure>
                                        <label for="">9月19日鞋服清仓优惠 </label>
                                    </article>
                                </div>
                            </div>
                        </section>
                        <section class="item_spec_package">
                            <div class="item_spec">
                                <span class="spec_title">款式选择</span>
                                <ul class="spec_info">
                                    <li class="active">
                                        <aside class="specs_item">
                                            <h1 class="item_name">男款</h1>
                                        </aside>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section class="item_spec_color">
                            <div class="item_spec">
                                <span class="spec_title">颜色选择</span>
                                <ul class="spec_info">
                                    <li>
                                        <aside>
                                            <span class="color_box">
                                                <i class="color_item">
                                                    <img src="https://resource.smartisan.com/resource/85c73076d653ab42954d499c241a0d7e.jpg?x-oss-process=image/resize,w_52"
                                                        alt="">
                                                </i>
                                            </span>
                                            <label for="">藏蓝色</label>
                                        </aside>
                                    </li>
                                    <li>
                                        <aside>
                                            <span class="color_box">
                                                <i class="color_item">
                                                    <img src="https://resource.smartisan.com/resource/e647e77234f9ed0fde9dd4084d35ff57.jpg?x-oss-process=image/resize,w_52"
                                                        alt="">
                                                </i>
                                            </span>
                                            <label for="">白色</label>
                                        </aside>
                                    </li>
                                    <li>
                                        <aside>
                                            <span class="color_box">
                                                <i class="color_item">
                                                    <img src="https://resource.smartisan.com/resource/4ef6f3a638cdb3d4546b89bb46a16621.jpg?x-oss-process=image/resize,w_52"
                                                        alt="">
                                                </i>
                                            </span>
                                            <label for="">黑色</label>
                                        </aside>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section class="item_spec_package">
                            <div class="item_spec">
                                <span class="spec_title">尺码选择</span>
                                <ul class="spec_info">
                                    <li class="active">
                                        <aside class="specs_item">
                                            <h1 class="item_name">S</h1>
                                        </aside>
                                    </li>
                                    <li class="">
                                        <aside class="specs_item">
                                            <h1 class="item_name">M</h1>
                                        </aside>
                                    </li>
                                    <li class="">
                                        <aside class="specs_item">
                                            <h1 class="item_name">L</h1>
                                        </aside>
                                    </li>
                                    <li class="">
                                        <aside class="specs_item">
                                            <h1 class="item_name">XL</h1>
                                        </aside>
                                    </li>
                                    <li class="">
                                        <aside class="specs_item">
                                            <h1 class="item_name">XXL</h1>
                                        </aside>
                                    </li>
                                    <li class="">
                                        <aside class="specs_item">
                                            <h1 class="item_name">XXXL</h1>
                                        </aside>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section class="item_count_wrapper">
                            <div class="item_count">
                                <span class="count_title">数量选择</span>
                                <aside class="do_count">
                                    <div class="select">
                                        <span class="down"><i></i> -</span>
                                        <span class="num">1</span>
                                        <span class="up"><i></i>+</span>
                                    </div>
                                </aside>
                            </div>
                        </section>
                        <section class="sku_custom_tips_wrapper">
                            <div class="sku_custom_tips">
                                <span class="sku_custom_tips_title">服务说明</span>
                                <aside class="sku_custom_tips_text">
                                    <p>* 满 99 元包邮</p>
                                </aside>
                            </div>
                        </section>
                    </div>
                    </div>
                    <div class="gray_box1">
                        <article class="headline">
                            <h2>产品信息</h2>
                        </article>
                        <div class="item_info">
                            <img src=${info.shop_info.tpl_content.base.images.ali_mobile.url[0]} alt="">
                        </div>
                    </div>
                    <div class="product_fix_bar">
                        <div class="fix_bar_wrapper">
                            <h1 class="bar_text">您已选择了</h1>
                            <div class="bar_device_info">
                                <h1 class="clearfix">
                                    <span class="title">${info.shop_info.title} × <i>1</i></span>
                                </h1>
                                 <h2>&nbsp;&nbsp;&nbsp;男款 | 白色 | L</h2>
                            </div>
                            <div class="bar_btn">加入购物车</div>
                            <div class="white_btn">
                                <a>现在购买</a>
                            </div>
                            <div class="discount_price">
                                <div class="bar_price">
                                    <i>¥</i><span>${info.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                $('.wrapper').append($div);
            })

            //点击切换图片
            $('.wrapper').on('click', '.thumbnail ul li', function () {

                $(this).css({
                    padding: 10,
                    border: '3px solid rgba(0, 0, 0, .2)',
                })
                $(this).siblings().css({
                    padding: 12,
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                })

                let $src = $(this).children().data("src");
                $('.thumb ul li img').attr("src", $src);
            })

            //选择尺码
            $('.wrapper').on('click', '.spec_info li', function () {
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            })

            //选择数量
            let num = $('.select .num').text();
            let price;
            setTimeout(() => {
                price = $('.bar_price span').html();
            }, 1000);

            // if (num <= 1) {
            //     $('.select .down').addClass("disabled");
            // } else {
            //     $('.select .down').removeClass("disabled");
            // }

            $('.wrapper').on('click', '.select .down', function () {
                if (num > 1) {
                    //加减的数量
                    $('.select .num').text(--num);
                    //结算的数量
                    $('.bar_device_info .clearfix i').html(num);
                    //结算的价格
                    $('.bar_price span').html(num * price);
                }
            })
            $('.wrapper').on('click', '.select .up', function () {
                $('.select .num').text(++num);
                $('.bar_device_info .clearfix i').html(num);
                $('.bar_price span').html(num * price);
            })

            //现在购买
            $('.wrapper').on('click', '.white_btn a', function () {
                let name = $('.item_title h1').html();
                let price = $('.item_price span i').html();
                let sum = $('.bar_device_info .clearfix i').html();
                let total = $('.bar_price span').html();
                let img = $('.thumbnail ul li').eq(0).children().attr("src");

                //判断cookie里是否有数据
                let data = [];
                if ($.cookie("data")) {
                    data = JSON.parse($.cookie("data"));
                }

                let info = {
                    "name": name,
                    "price": price,
                    "sum": sum,
                    "total": total,
                    "img": img
                }

                let flag = false;
                for (let i = 0; i < data.length; i++) {
                    if (info.name == data[i].name) { //判断是否有相同的商品
                        data[i].sum = parseInt(data[i].sum) + parseInt(info.sum);
                        data[i].total = parseInt(data[i].total) + parseInt(info.total);
                        flag = true;
                    }
                }
                if (flag == true) {
                    data = JSON.stringify(data);
                    $.cookie('data', data, {
                        path: '/'
                    });
                } else {
                    data.push(info);
                    data = JSON.stringify(data);
                    $.cookie('data', data, {
                        path: '/'
                    });
                }
                window.open("../shoppingcart/shoppingcart.html");
            })

            //加入购物车
            $('.wrapper').on('click', '.bar_btn', function () {
                let name = $('.item_title h1').html();
                let price = $('.item_price span i').html();
                let sum = $('.bar_device_info .clearfix i').html();
                let total = $('.bar_price span').html();
                let img = $('.thumbnail ul li').eq(0).children().attr("src");

                //判断cookie里是否有数据
                let data = [];
                if ($.cookie("data")) {
                    data = JSON.parse($.cookie("data"));
                }

                let info = {
                    "name": name,
                    "price": price,
                    "sum": sum,
                    "total": total,
                    "img": img
                }

                let flag = false;
                for (let i = 0; i < data.length; i++) {
                    if (info.name == data[i].name) { //判断是否有相同的商品
                        data[i].sum = parseInt(data[i].sum) + parseInt(info.sum);
                        data[i].total = parseInt(data[i].total) + parseInt(info.total);
                        flag = true;
                    }
                }
                if (flag == true) {
                    data = JSON.stringify(data);
                    $.cookie('data', data, {
                        path: '/'
                    });
                } else {
                    data.push(info);
                    data = JSON.stringify(data);
                    $.cookie('data', data, {
                        path: '/'
                    });
                }
                alert("已添加至购物车");
            })

        })
    })
})