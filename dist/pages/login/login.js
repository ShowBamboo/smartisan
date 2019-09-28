require(["../../scripts/conf/config.js"], function () {
    require(["jquery", "cookie"], function ($) {
        $(function () {
            //点击自动登录
            $('.checkbox').click(function () {
                $(this).toggleClass("checked");
            })

            //移入其他登录方式
            $('.login_three li').hover(function () {
                $(this).addClass("active");
            }, function () {
                $(this).removeClass("active");
            })

            //输入手机号时清空文本框的内容
            $(".username .input input").on('input', function () {
                let nameVal = $(".username .input input").val();

                if (nameVal != '') {
                    $(".username .input .placeholder").html('');
                } else {
                    $(".username .input .placeholder").html('手机号/邮箱');
                }
            })
            let onoff1 = false;
            let onoff2 = false;
            //判断手机号
            $(".username .input input").blur(function () {
                let nameVal = $(".username .input input").val();
                let rePhone = /^1[3|4|5|6|7|8|9]\d{9}$/;

                if (nameVal == '') {
                    $(".username .input .warning").eq(0).css("display", "block");
                } else {
                    $(".username .input .warning").eq(0).css("display", "none");
                }
                if (nameVal != '' && rePhone.test(nameVal) == false) {
                    $(".username .input .warning").eq(1).css("display", "block");
                } else {
                    $(".username .input .warning").eq(1).css("display", "none");
                }
                if (nameVal != '' && rePhone.test(nameVal) == true) {
                    onoff1 = true;
                }
            })

            //输入密码时清空文本框的内容
            $(".password .input input").on('input', function () {
                let passVal = $(".password .input input").val();

                if (passVal != '') {
                    $(".password .input .placeholder").html('');
                } else {
                    $(".password .input .placeholder").html('密码');
                }
            })

            //判断密码
            $(".password .input input").blur(function () {
                let passVal = $(".password .input input").val();

                if (passVal == '') {
                    $(".password .input .warning").eq(0).css("display", "block");
                } else {
                    $(".password .input .warning").eq(0).css("display", "none");
                }
                if (passVal != '') {
                    onoff2 = true;
                }
            })

            //判断登录按钮是否可点击
            $('.checkbox').click(function () {
                if (onoff1 && onoff2) {
                    $('.btn_wrapper .btn').removeClass("disabled");
                }
            })

            //点击登录按钮
            $('.btn_wrapper .btn a').click(function () {
                let flag = false;
                if ($(".username .input input").val() != $.cookie('username')) {
                    $(".username .input .warning").eq(2).css("display", "block");
                    flag = false;
                } else {
                    $(".username .input .warning").eq(2).css("display", "none");
                    flag = true;
                }

                if ($(".password .input input").val() != $.cookie('password')) {
                    $(".password .input .warning").eq(1).css("display", "block");
                    flag = false;
                } else {
                    $(".password .input .warning").eq(1).css("display", "none");
                    flag = true;
                }

                if (flag == true) {
                    $.cookie('username1', $(".username .input input").val(), {
                        expires: 1000,
                        path: '/'
                    });
                    $.cookie('password1', $(".password .input input").val(), {
                        expires: 1000,
                        path: '/'
                    });
                    window.location.href = "../home/index.html";
                }
            })


        })
    })
})