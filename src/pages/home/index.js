require(["../../scripts/conf/config.js"], function () {
    require(["jquery", "swiper", "cookie"], function ($, swiper) {
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

            //吸顶效果
            $(window).scroll(function () {
                let top = $('html, body').scrollTop();

                if (top >= 45) {
                    $('.nav').css({
                        position: 'fixed',
                        top: 0
                    })
                } else {
                    $('.nav').css({
                        position: 'relative',
                    })
                }
            });

            // 图片轮播
            var mySwiper = new swiper('.swiper-container', {

                loop: true, // 循环模式选项    

                pagination: { // 如果需要分页器
                    el: '.swiper-pagination',
                },

                pagination: { //点击分页器的指示点分页器会控制Swiper切换
                    el: '.swiper-pagination',
                    clickable: true,
                },

                autoplay: true, //自动切换

                effect: 'fade', //切换效果
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

            //动态创建热门商品列表
            $.getJSON("/api/product/home", function (data) {
                let info = data.data.home_hot;
                for (let i = 0; i < info.length; i++) {
                    //let $li = document.createElement('li');
                    let $li = $('<li class="item_four"></li>');
                    creatGoods($li, info[i]);
                    $li.attr("sku_id", info[i].sku_id);
                    $('#hot_items1').append($li);
                    $li.on("click", function () {
                        $.cookie("idVal", $(this).attr("sku_id"), {
                            path: '/'
                        });
                        window.open("../details/details.html");
                    })
                }
            })

            //动态创建专场列表
            $.getJSON("/api/product/home", function (data) {
                for (let j = 0; j < data.data.home_floors.length; j++) {
                    let newdata = data.data.home_floors[j];
                    let info = newdata.tabs[0].tab_items;
                    //第一个li
                    let $firstLi = document.createElement('li');
                    $firstLi.className = 'item-four item-recom';
                    $firstLi.innerHTML = `
                        <div class="advertise">
                            <div class="advertise_item">
                                <img src=${info[0].image} alt=""
                                    style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
                            </div>
                        </div>
                    `;
                    $('.items').eq(j).append($firstLi);
                    for (let i = 1; i < info.length; i++) {
                        let $li = $('<li class="item_four"></li>');
                        $li.attr("sku_id", info[i].sku_id);
                        creatGoods($li, info[i]);
                        $('.items').eq(j).append($li);
                        $li.on("click", function () {
                            $.cookie("idVal", $(this).attr("sku_id"), {
                                path: '/'
                            });
                            window.open("../details/details.html");
                        })
                    }
                }
            })

            //创建一个商品 
            function creatGoods($li, info) {
                //$li.className = 'item_four';
                $li.html(`
                        <div class="product_box_item">
                            <div>
                                <div class="item_img">
                                    <img src=${info.spu.sku_info[0].ali_image}
                                        alt="" style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
                                </div>
                                <h4>${info.spu.sku_info[0].title}</h4>
                                <h6>${info.spu.sku_info[0].sub_title}</h6>
                            </div>
                            <!-- 分页器 -->
                            <div class="params_colors">
                                <ul class="colors_list">
                                    <li>
                                        <div class="outer">
                                            <img src="https://resource.smartisan.com/resource/85c73076d653ab42954d499c241a0d7e.jpg?x-oss-process=image/resize,w_20"
                                                style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
                                        </div>
                                    </li>
                                    <li>
                                        <div class="outer">
                                            <img src="https://resource.smartisan.com/resource/85c73076d653ab42954d499c241a0d7e.jpg?x-oss-process=image/resize,w_20"
                                                style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
                                        </div>
                                    </li>
                                    <li>
                                        <div class="outer">
                                            <img src="https://resource.smartisan.com/resource/85c73076d653ab42954d499c241a0d7e.jpg?x-oss-process=image/resize,w_20"
                                                style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <!-- 价格 -->
                            <div class="item_price">
                                <div class="discount_price">
                                    <span>
                                        <i>¥</i>
                                        <span>${info.spu.sku_info[0].price}</span>
                                    </span>
                                </div>
                            </div>
                            <span class="colorful_tag">清仓</span>
                        </div>
                    `);
            }

            //创建论坛精选
            $.getJSON("/api/product/home", function (data) {
                let info = data.data.home_forum;
                for (let i = 0; i < info.length; i++) {
                    let $div = document.createElement('div');
                    $div.className = 'image_text_item';
                    $div.innerHTML = `
                    <div>
                        <a href=${info[i].link}></a>
                        <img src=${info[i].image}
                            alt="">
                        <h5>${info[i].title}</h5>
                        <p>${info[i].subtitle}</p>
                        <span>阅读全文&nbsp;
                            <i class="smartisan_icon">></i>
                        </span>
                     </div>
                    `;
                    $('.image_text_wrapper').append($div);
                }
            })

            //热门商品左右切换
            $('.home_page a').click(function () {
                $(this).addClass('disabled');
                $(this).siblings().removeClass('disabled');
            })
            $('.home_page a').eq(1).click(function () {
                $('.hot_items').css({
                    transform: "translate(-1220px, 0px)",
                })
            })
            $('.home_page a').eq(0).click(function () {
                $('.hot_items').css({
                    transform: "translate(0px, 0px)",
                })
            })
            //鼠标移入商品
            $('.category_normal_wrapper').on('mouseover', '.item_four', function () {
                $(this).css({
                    boxShadow: "0px 0px 30px #E0E0E0 inset"
                })
                $(this).find('h6').css("color", "#e04e4e");
            })
            //鼠标移出商品
            $('.category_normal_wrapper').on('mouseout', '.item_four', function () {
                $(this).css({
                    boxShadow: ""
                })
                $(this).find('h6').css("color", "#999");
            })

            //鼠标移入论坛精选
            $('.image_text_wrapper').on('mouseover', '.image_text_item', function () {
                $(this).css({
                    boxShadow: "0px 0px 30px #E0E0E0 inset"
                })
            })
            //鼠标移出论坛精选
            $('.image_text_wrapper').on('mouseout', '.image_text_item', function () {
                $(this).css({
                    boxShadow: ""
                })
            })
            //点击官方微信
            $('.weixin').click(function () {
                $('.mask').css("display", "block");
                $('.qrcode').css("display", "block");
            })
            //点击关闭按钮
            $(document).on('click', '.close_btn', function () {
                $('.qrcode').css("display", "none");
                $('.mask').css("display", "none");
            })



        })
    })
})