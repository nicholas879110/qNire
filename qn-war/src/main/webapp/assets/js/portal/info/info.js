/**
 * Created by Dendy on 2014/7/28.
 */
$(function () {
    Validator.validate($('#info-form'), {
        rules: {
            name: {
                required: true,
                rangelength: [2, 10]
            },
            sex: {
                required: true
            },
            nation: {
                required: true
            },
            birthDate: {
                required: true
            },
            cardType: {
                required: true
            },
            cardNum: {
                required: true
            },
            introduction: {
                maxlength: 50
            },
            tel: {
                phoneNum: true
            }
        },
        debug : true,
        messages: {
            name: {
                required: "姓名不能为空",
                rangelength: "姓名必须为{0}到{1}个字符."
            },
            sex: {
                required: "性别不能为空"
            },
            nation: {
                required: "民族不能为空"
            },
            birthDate: {
                required: "出生日期不能为空"
            },
            cardType: {
                required: "证件类型不能为空"
            },
            cardNum: {
                required: "证件号码不能为空"
            },
            introduction: {
                maxlength: "个人说明最多为50个字符."
            },
            tel: {
                phoneNum: "电话号码格式不正确，座机需加区号，例如：xxx-xxxxxxxx"
            }
        },
        submitHandler: function (form) {
            startLoading("保存中...");
            $(form).ajaxSubmit(
                {
                    type: "post",
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == CODE_ENUM.ERROR) {
                            bootBoxError(data.msg);
                        } else {
                            bootBoxSuccess(data.msg, function () {

                                top.location.href = getContentPath() + "/u/info/show";
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
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.insertAfter(element.parent().parent());
            } else {
                error.insertAfter(element.parent());
            }
        }
    });

    // 动态添加验证规则
    $('#card-type').on('change', function (e) {
        var type = $(this).val();
        if (Constant.CertificateType.IDENTITY_CARD == type) {
            $('#card-num').rules("add", {
                idCard: true,
                messages: {
                    idCard: "请输入正确的15位或18位身份证号码"
                }
            });
        } else {
            $('#card-num').rules('remove');
            $('#card-num').parents('.form-group').removeClass('has-error');
            $('#card-num').parents('.form-group').find('.help-block').remove();
        }
    });

    var SUPPORT_FILE_SUFFIX = /\.(jpe?g|png|gif)$/i;
    var SUPPORT_FILE_TYPE = /(image)/i;
    var SUPPORT_FILE_MAX_SIZE = 200; // 最大支持100KB的图片上传
    $('input[type=file]').ace_file_input({
        no_file: '未选择任何图片文件',
        btn_choose: '选择图片文件',
        btn_change: '',
        no_icon: 'icon-picture',
        droppable: false,  // 是否可以直接拖入文件
        thumbnail: 'large', // large, fit, small, true, false —— 压缩并预览
        style: 'well',  // 'well', false —— 显示效果，well支持预览，并支持多个文件上传
        preview_error: null,
        before_remove: function () {
            if (upload_in_progress)
                return false;//if we are in the middle of uploading a file, don't allow resetting file input
            return true;
        },

        before_change: function (files, dropped) {
            var file = files[0];
            if (typeof file == "string") {//files is just a file name here (in browsers that don't support FileReader API)
                if (!SUPPORT_FILE_SUFFIX.test(file)) {
                    alert('不支持的文件类型!');
                    return false;
                }
            } else {
                var type = $.trim(file.type);
//                console.log(type + " " + SUPPORT_FILE_TYPE.test(type));
                if (type.length > 0 && !SUPPORT_FILE_TYPE.test(type) || type.length == 0 && !SUPPORT_FILE_SUFFIX.test(file.name)) //for android's default browser!
                {
                    alert('不支持的文件类型!');
                    return false;
                }
                if (file.size > SUPPORT_FILE_MAX_SIZE * 1024 * 1024) {
                    alert('仅支持最大' + SUPPORT_FILE_MAX_SIZE + 'M的文件上传!');
                    return false;
                }
            }
            return true;
        }
    });

    $('.date-picker').datepicker({autoclose: true}).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });
});
