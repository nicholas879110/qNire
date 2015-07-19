/**
 * Created by Dendy on 2014/7/28.
 */
$(function () {
    $('#captcha-image').on('click', function (e) {
        e.preventDefault();
        $(this).find('img').attr("src", getContentPath() + "/captcha/image?" + Math.floor(Math.random() * 100)).fadeIn();
    });
    var url = document.URL;
    var savePath=$('#savePath').attr('path');
    if (url.indexOf('/student/login') > 0)
        $(".block").last().append('<a href='+savePath+'/portal/manager/login class=\"grey font-12\" id=\"login-transfer\"> 管理员登录</a>');
    else if (url.indexOf('/manager/login') > 0)
        $(".block").last().append('<a href='+savePath+'/portal/student/login class=\"grey font-12\" id=\"login-transfer\"> 学生登录</a>');
    Validator.validate($("#login-form"), {
        rules: {
            validateCode: {
                required:this.attr('verify')
            }
        },
        messages: {
            validateCode: {
                required: "请输入验证码"
            }
        },
        submitHandler: function (form) {
            $(form).submit();
        }
    });
});
