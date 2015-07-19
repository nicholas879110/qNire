/**
 * 实名认证.
 * Created by Dendy on 2014/8/5.
 */
$(function () {
    $('#audit-btn').on('click', function () {
        $('#audit-form').submit();
    });

    var form = $("#audit-form");
    Validator.validate(form, {
        rules: {
            applyResult: {
                required: true
            },
            auditOpinion: {
                maxlength: 50
            }
        },
        messages: {
            applyResult: {
                required: "审核结果不能为空"
            },
            auditOpinion: {
                maxlength: "审核意见最多为50个字符"
            }
        },
        submitHandler: function () {
            form.ajaxSubmit({
                type: "post",
                dataType: 'json',
                success: function (data) {
                    if (data.code == CODE_ENUM.ERROR) {
                        bootBoxError(data.msg);
                    } else {
                        bootBoxSuccess(data.msg, function () {
                            top.location.href = getContentPath() + "/u/cert/list";
                        })
                    }
                },
                error: function (data) {
                    bootBoxError(data.msg);
                },
                complete: function () {
                }
            });
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.insertAfter(element.parent().parent());
            } else {
                error.insertAfter(element.parent());
            }
        }
    });

    $('input[name=applyResult]').on('click', function (e) {
        if ($(this).val() == "cert.status.notPass") {
            $('textarea[name=auditOpinion]').rules('add', {
                required: true,
                messages: {
                    required: "审核意见不能为空"
                }
            })
        } else {
            $('textarea[name=auditOpinion]').rules('remove');
            $('textarea[name=auditOpinion]').parents('.form-group').removeClass('has-error');
            $('textarea[name=auditOpinion]').parents('.form-group').find('.help-block').remove();
        }
    });
});