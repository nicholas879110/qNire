/**
 * Created by Dendy on 2014/7/28.
 */
$(function () {
    Validator.validate($("#reg-form"), {
        rules: {
            username: {
                required: true,
                rangelength: [6, 16],
                username: true,
                remote: {
                    url: getContentPath() + "/u/ck/un/",
                    type: "post",
                    dataType: "json",
                    data: {
                        username: function () {
                            return $("#username").val();
                        }
                    }
                }
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: getContentPath() + "/u/ck/em",
                    type: "post",
                    dataType: "json",
                    data: {
                        email: function () {
                            return $("#email").val();
                        }
                    }
                }
            },
            password: {
                required: true,
                rangelength: [6, 16]
            },
            confirmPwd: {
                required: true,
                equalTo: "#password"
            },
            validateCode: {
                required: true,
                remote: {
                    url: getContentPath() + "/captcha/check",
                    type: "post",
                    dataType: "json",
                    data: {
                        validateCode: function () {
                            return $("#validateCode").val();
                        }
                    }
                }
            }
        },
        messages: {
            username: {
                required: "用户名不能为空",
                rangelength: "用户名长度为{0}到{1}的常规字符",
                username: "用户名必须为字母、数字、下划线的组合，且第一个字符必须为字母",
                remote: "用户名已经存在"
            },
            email: {
                required: "邮箱地址不能为空",
                email: "邮箱格式不正确",
                remote: "邮箱已经被注册"
            },
            password: {
                required: "请输入密码",
                rangelength: "密码长度为{0}到{1}的字符"
            },
            confirmPwd: {
                required: "请输入确认密码",
                equalTo: "两次输入的密码不一致"
            },
            validateCode: {
                required: "请输入验证码",
                remote: "验证码错误"
            }
        },
        submitHandler: function (form) {
            startLoading("注册中...");
            $.ajax(
                {
                    url: $(form).attr("action"),
                    type: "post",
                    dataType: 'json',
                    data: $(form).serializeArray(),
                    success: function (data) {
                        if (data.code == CODE_ENUM.ERROR) {
                            bootBoxError(data.msg);
                        } else {
                            bootBoxSuccess(data.msg, function () {
                                top.location.href = getContentPath() + "/u/reg/r?mail=" + data.result;
                            })
                        }
                    },
                    error: function (data) {
                        bootBoxError(data.msg);
                    },
                    complete: function () {
                        endLoading();
                    }
                });
        }
    });

    $('#captcha-image').on('click', function (e) {
        e.preventDefault();
        $(this).find('img').attr("src", getContentPath() + "/captcha/image?" + Math.floor(Math.random() * 100)).fadeIn();
    });

    $('#register-btn').on('click', function () {
        $('#reg-form').submit();
    });
});