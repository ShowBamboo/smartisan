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
                $('.cart_wrapper').css("display", "block");
            }, function () {
                $(this).css("background-position", "0px -17px");
                timer2 = setTimeout(() => {
                    $('.cart_wrapper').css("display", "none");
                }, 300);
            })
            $('.cart_wrapper').hover(function () {
                clearTimeout(timer2);
                $(this).css("display", "block");
            }, function () {
                $(this).css("display", "none");
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

            //创建商品列表
            let info = JSON.parse($.cookie("data"));
            console.log(info);
            for (let i = 0; i < info.length; i++) {
                createInfo(info[i]);
            }
            //创建一条商品的购物车信息
            function createInfo(info) {
                let $div = $('<div class="cart_group"></div>');
                $div.html(`
                    <div>
                        <div class="cart_items">
                            <div class="checkbox_container">
                                
                            </div>
                            <div class="item-wrapper">
                                <div class="items-thumb">
                                    <img src=${info.img}
                                        alt="">
                                </div>
                                <div class="name">
                                    <div class="name-table">
                                        <a href="">${info.name}</a>
                                    </div>
                                </div>
                                <div class="operation">
                                    <a class="items-delete-btn"></a>
                                </div>
                                <div>
                                    <div class="subtotal">
                                        <p class="discount">
                                            <i>¥</i>
                                            <span>${info.total}</span>
                                        </p>
                                    </div>
                                    <div class="item-cols-num">
                                        <div class="quantity">
                                            <span class="down"></span>
                                            <span class="num">${info.sum}</span>
                                            <span class="up"></span>
                                        </div>
                                    </div>
                                    <div class="price">
                                        <i>¥</i>
                                        <span>${info.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                $('.item_list').append($div);
            }

            //选择数量改变总价格 减
            $('.item_list').on('click', '.quantity .down', function () {
                let num = $(this).next().html();
                //当前商品的单价
                let price = $(this).parent().parent().next().find('span').html();
                if (num > 1) {
                    //加减的数量
                    $(this).next().html(--num);
                    //当前商品的总价格
                    $(this).parent().parent().prev().find('span').html(num * price);
                    //总商品的数量
                    let sum = 0;
                    for (let i = 0; i < $('.quantity .num').length; i++) {
                        sum = parseInt($('.quantity .num').eq(i).html()) + parseInt(sum);
                    }
                    $('.shipping-num h4 i').html(sum);
                    //总价格
                    let money = 0;
                    for (let i = 0; i < $('.discount span').length; i++) {
                        money = parseInt($('.discount span').eq(i).html()) + parseInt(money);
                    }
                    $('.shipping-price h4 span').html('￥' + money);
                    //同步cookie中的数据
                    let info = JSON.parse($.cookie("data"));
                    let $index = $(this).parents('.cart_group').index();

                    info[$index].sum = $(this).next().html();
                    info[$index].total = $(this).parent().parent().prev().find('span').html();

                    info = JSON.stringify(info);
                    $.cookie('data', info, {
                        path: '/'
                    });
                }
            })
            //加
            $('.item_list').on('click', '.quantity .up', function () {
                let num = $(this).prev().html();
                let price = $(this).parent().parent().next().find('span').html();
                $(this).prev().html(++num);
                $(this).parent().parent().prev().find('span').html(num * price);
                //总商品的数量
                let sum = 0;
                for (let i = 0; i < $('.quantity .num').length; i++) {
                    sum = parseInt($('.quantity .num').eq(i).html()) + parseInt(sum);
                }
                $('.shipping-num h4 i').html(sum);
                //总价格
                let money = 0;
                for (let i = 0; i < $('.discount span').length; i++) {
                    money = parseInt($('.discount span').eq(i).html()) + parseInt(money);
                }
                $('.shipping-price h4 span').html('￥' + money);
                //同步cookie中的数据
                let info = JSON.parse($.cookie("data"));
                let $index = $(this).parents('.cart_group').index();

                info[$index].sum = $(this).prev().html();
                info[$index].total = $(this).parent().parent().prev().find('span').html();

                info = JSON.stringify(info);
                $.cookie('data', info, {
                    path: '/'
                });
            })

            //点击删除按钮
            $('.item_list').on('click', '.operation .items-delete-btn', function () {

                //找到当前按钮对应的一条商品信息
                let $index1 = $(this).parents('.cart_group').index();
                //删除cookie对应的数据
                let info1 = JSON.parse($.cookie("data"));
                info1.splice($index1, 1);

                info1 = JSON.stringify(info1);
                $.cookie('data', info1, {
                    path: '/'
                });

                ($(this).parents('.cart_group')).remove();

                //总商品的数量
                let sum = 0;
                for (let i = 0; i < $('.quantity .num').length; i++) {
                    sum = parseInt($('.quantity .num').eq(i).html()) + parseInt(sum);
                }
                $('.shipping-num h4 i').html(sum);
                //总价格
                let money = 0;
                for (let i = 0; i < $('.discount span').length; i++) {
                    money = parseInt($('.discount span').eq(i).html()) + parseInt(money);
                }
                $('.shipping-price h4 span').html('￥' + money);
                //同步cookie中的数据
                let info = JSON.parse($.cookie("data"));
                let $index = $(this).parents('.cart_group').index();

                info[$index].sum = $(this).prev().html();
                info[$index].total = $(this).parent().parent().prev().find('span').html();

                info = JSON.stringify(info);
                $.cookie('data', info, {
                    path: '/'
                });
            })
            //初始化总数量和总价格
            setTimeout(() => {
                let sum = 0;
                for (let i = 0; i < $('.quantity .num').length; i++) {
                    sum = parseInt($('.quantity .num').eq(i).html()) + parseInt(sum);
                }
                $('.shipping-num h4 i').html(sum);

                let money = 0;
                for (let i = 0; i < $('.discount span').length; i++) {
                    money = parseInt($('.discount span').eq(i).html()) + parseInt(money);
                }
                $('.shipping-price h4 span').html('￥' + money);
            }, 0);

            //点击现在结算
            $('.jieguo').click(function () {
                $('.paymask').css("display", "block");
                $('.paycode').css("display", "block");
            })
            //点击关闭按钮
            $(document).on('click', '.close', function () {
                $('.paycode').css("display", "none");
                $('.paymask').css("display", "none");
            })


        })
    })
})