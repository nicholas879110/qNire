jQuery(function($){

    //初始化码值
    $("#cardType").html(Constant.CertificateType.decideCertificateTypeName($("#cardType").html()));
    $("#education").html(Constant.EducationLevel.decideEducationLevelTypeName($("#education").html()));
    $("#policitalStatus").html(Constant.PoliticStatus.decidePoliticStatusTypeName($("#policitalStatus").html()));

    //初始化日期控件
    $('.date-picker').datepicker({autoclose:true,endDate:""}).next().on(ace.click_event, function(){
        $(this).prev().focus();
    });

    var $validation = false;
    $('#fuelux-wizard').ace_wizard().on('change', function (e, info) {
        if(info.step == 2) {
            if(!$('#certNumForm').valid()) return false;
        }
    }).on('finished', function (e) {
    }).on('stepclick', function (e) {
            return false;//prevent clicking on steps
    });

    function _activeStep(step) {
        $('#fuelux-wizard').data('wizard').currentStep = step;
        $('#fuelux-wizard').data('wizard').setState();
    }

    $('#page-content').on('click', '#before-apply-btn', function () {
        $('#fuelux-wizard').wizard('next');
    });

   /* $('#page-content').on('click', '#cert-input-btn', function () {
        $('#fuelux-wizard').wizard('next');
    });*/

    $(".form-group.center p").on("click","a",function(e){
        switchPage("/stuCert/edit/person/info",{
            certId:$("input[name=certId]").val()
        });
    })
    if($("#certNumForm").length>0)
    Validator.validate($('#certNumForm'), {
        rules: {
            userCertNum:{
                required:true,
                digits:true
            },
            licenceDate:{
                required:true
            },
            profession: {
                required: true
            },
            job: {
                required: true
            },
            workLife: {
                required: true
            },
            oldJob: {
                required: true
            },
            oldLevel: {
                required: true
            },
            oldCertofocateNum: {
                required:true
            }
        },
        debug : true,
        messages: {
            userCertNum:{
                required:"证书号码不能为空",
                digits:"证书号码只能为数字"
            },
            licenceDate:{
                required:"发证日期不能为空"
            },
            profession: {
                required: "现任职业不能为空"
            },
            job: {
                required: "现任工种不能为空"
            },
            workLife: {
                required: "本职业工作年限不能为空"
            },
            oldJob: {
                required: "原职业工种不能为空"
            },
            oldLevel: {
                required: "原职业技术等级不能为空"
            },
            oldCertofocateNum: {
                required: "原证书编号不能为空"
            }
        },
        submitHandler: function (form) {
        },
        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')){
                var controls = element.closest('div[class*="col-"]');
                if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            }
            else {
                error.insertAfter(element.parent());
            }
        }
    });

    if($("#certNumForm0").length>0)
    Validator.validate($('#certNumForm0'), {
        rules: {
            profession: {
                required: true
            },
            job: {
                required: true
            },
            licenceDate:{
                required:true
            }
        },
        debug : true,
        messages: {
            licenceDate:{
                required:"发证日期不能为空"
            },
            profession: {
                required: "行政职务能为空"
            },
            job: {
                required: "现任技术职务不能为空"
            }
        },
        submitHandler: function (form) {
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.insertAfter(element.parent().parent());
            } else {
                error.insertAfter(element.parent());
            }
        }
    });

    $("#cert-input-btn").click(function(){
        /*var certCode=$("input[name=certId]").val();
        followCert(certCode);*/
        var $form;
        if($("#certNumForm").length>0){
            $form=$("#certNumForm");
        }
        if($("#certNumForm0").length>0){
            $form=$("#certNumForm0");
        }

        var fd=new FormData($form.get(0))
        if(!$form.valid()) return;
        $.ajax({
            url: getContentPath()+"/stuCert/follow/cert",
            type: 'post',
            dataType: 'json',
            processData:false,
            contentType:false,
            data: fd,
            success: function (data, textStatus, jqXHR) {
                if (data.code==0) {
                    $('#fuelux-wizard').data('wizard').currentStep = 3;
                    $('#fuelux-wizard').data('wizard').setState();
                } else {
                    bootBoxError(data.msg);
                }
                endLoading();
            }
        });
    })

    function followCert(certCode){
        startLoading("正在处理");

        $.ajax({
            url: getContentPath()+"/stuCert/bindUserCert",
            type: 'post',
            dataType: 'json',
            data: {
                certId:certCode,
                certCode:$("#certNum").val(),
                licenceDate:$("#licenceDate").val()
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code==0) {
                   /* bootBoxSuccess(data.msg,function(){
                        *//*switchPage("/stuCert/init");*//*
                    })*/
                    $('#fuelux-wizard').data('wizard').currentStep = 4;
                    $('#fuelux-wizard').data('wizard').setState();
                } else {
                    bootBoxError(data.msg);
                }
                endLoading();
            }
        });
    }

    /*// 动态添加验证规则
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
    });*/

})


function followCert(certCode){
    startLoading("正在处理");
    $.ajax({
        url: getContentPath() + "/stuCert/follow/"+certCode,
        type: 'post',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
                bootBoxSuccess(data.msg,function(){
                    switchPage("/stuCert/init");
                })
            } else {
                bootBoxError(data.msg);
            }
            endLoading();
        }
    });
}