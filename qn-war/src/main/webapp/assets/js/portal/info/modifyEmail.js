/**
 * Created by Dendy on 2014/8/5.
 */
$(function () {
    Validator.validate($("#email-update-form"), {
        rules: {
            srcEmail: {
                required: true,
                email: true,
                remote: {
                    url: getContentPath() + "/u/ck/srcem",
                    type: "post",
                    dataType: "json",
                    data: {
                        email: function () {
                            return $("#src-email").val();
                        }
                    }
                }
            },
            newEmail: {
                required: true,
                email: true,
                remote: {
                    url: getContentPath() + "/u/ck/em",
                    type: "post",
                    dataType: "json",
                    data: {
                        email: function () {
                            return $("#new-email").val();
                        }
                    }
                }
            },
            cfmNewEmail: {
                required: true,
                equalTo: "#new-email",
                email: true
            }
        },
        messages: {
            srcEmail: {
                required: "原邮箱地址不能为空",
                email: "邮箱格式不正确",
                remote: "原邮箱地址不正确"
            },
            newEmail: {
                required: "邮箱地址不能为空",
                email: "邮箱格式不正确",
                remote: "邮箱已经被注册"
            },
            cfmNewEmail: {
                required: "请重新输入邮箱地址",
                equalTo: "两次输入的邮箱不一致",
                email: "邮箱格式不正确"
            }
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: "post",
                dataType: 'json',
                success: function (data) {
                    if (data.code == CODE_ENUM.ERROR) {
                        bootBoxError(data.msg);
                    } else {
                        bootBoxSuccess(data.msg, function () {
                            top.location.href = getContentPath() + "/j_spring_security_logout";
                        })
                    }
                },
                error: function (data) {
                    bootBoxError(data.msg);
                },
                complete: function () {
                }
            });
        }
    });
    Validator.validate($("#pwd-update-form"), {
        rules: {
            srcPwd: {
                required: true,
                remote: {
                    url: getContentPath() + "/u/ck/srcPwd",
                    type: "post",
                    dataType: "json",
                    data: {
                        pwd: function () {
                            return $("#srcPwd").val();
                        }
                    }
                }
            },
            pwd: {
                required: true,
                minlength: 6
            },
            newPwd: {
                required: true,
                equalTo: "#pwd"
            }
        },
        messages: {
            srcPwd: {
                required: "原密码不能为空",
                remote: "原密码不正确"
            },
            pwd: {
                required: "新密码不能为空",
                minlength: "密码至少6位"
            },
            newPwd: {
                required: "请重新输入新密码",
                equalTo: "两次输入的密码不一致"
            }
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: "post",
                dataType: 'json',
                success: function (data) {
                    if (data.code == CODE_ENUM.ERROR) {
                        bootBoxError(data.msg);
                    } else {
                        bootBoxSuccess(data.msg, function () {
                            top.location.href = getContentPath() + "/portal/student/login";
                        })
                    }
                }
            });
        }
    });
});
