require(["../../scripts/conf/config.js"], function () {
    require(["jquery", "cookie"], function ($) {
        $(function () {
            //点击我已阅读
            $('.checkbox').click(function () {
                $(this).toggleClass("checked");
            })

            //获取验证码
            $('.verification .btn a').click(function () {
                let count = 10;
                $(this).html(count + 's');
                $(this).css("cursor", "not-allowed");
                let timer = setInterval(() => {
                    if (count == 0) {
                        clearInterval(timer);
                        $(this).html('获取验证码');
                        $(this).css("cursor", "pointer");
                    } else {
                        count--;
                        $(this).html(count + 's');
                    }
                }, 1000);
            })

            //输入手机号时清空文本框的内容
            $(".username .input .indent").on('input', function () {
                let nameVal = $(".username .input .indent").val();

                if (nameVal != '') {
                    $(".username .input .placeholder").html('');
                } else {
                    $(".username .input .placeholder").html('手机号');
                }
            })

            let onoff1 = false;
            let onoff2 = false;
            let onoff3 = false;
            //判断手机号
            $(".username .input .indent").blur(function () {
                let nameVal = $(".username .input .indent").val();
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
                let rePass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

                if (passVal == '') {
                    $(".password .input .warning").eq(0).css("display", "block");
                } else {
                    $(".password .input .warning").eq(0).css("display", "none");
                }
                if (passVal != '' && rePass.test(passVal) == false) {
                    $(".password .input .warning").eq(1).css("display", "block");
                } else {
                    $(".password .input .warning").eq(1).css("display", "none");
                }
                if (passVal != '' && rePass.test(passVal) == true) {
                    onoff2 = true;
                }
            })

            //输入重复密码时清空文本框的内容
            $(".password_repeat .input input").on('input', function () {
                let repassVal = $(".password_repeat .input input").val();

                if (repassVal != '') {
                    $(".password_repeat .input .placeholder").html('');
                } else {
                    $(".password_repeat .input .placeholder").html('重复密码');
                }
            })

            //判断重复密码
            $(".password_repeat .input input").blur(function () {
                let passVal = $(".password .input input").val();
                let repassVal = $(".password_repeat .input input").val();

                if (repassVal == '') {
                    $(".password_repeat .input .warning").eq(0).css("display", "block");
                } else {
                    $(".password_repeat .input .warning").eq(0).css("display", "none");
                }
                if (repassVal != passVal) {
                    $(".password_repeat .input .warning").eq(1).css("display", "block");
                } else {
                    $(".password_repeat .input .warning").eq(1).css("display", "none");
                }
                if (repassVal != '' && repassVal == passVal) {
                    onoff3 = true;
                }
            })

            //判断注册按钮是否可点击
            $('.checkbox').click(function () {
                if (onoff1 && onoff2 && onoff3) {
                    $('.btn_wrapper .btn').removeClass("disabled");
                }
            })

            //点击注册按钮
            $('.btn_wrapper .btn a').click(function () {
                $.cookie('username', $(".username .input .indent").val(), {
                    expires: 1000,
                    path: '/'
                });
                $.cookie('password', $(".password .input input").val(), {
                    expires: 1000,
                    path: '/'
                });
                window.location.href = "../login/login.html";
            })


        })
    })
})