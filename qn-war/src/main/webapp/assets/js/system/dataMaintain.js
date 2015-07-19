/**
 * Created by danjiaxin on 2014/8/26.
 */
$(document).ready(function() {
    Validator.validate("#initData", {
        rules : {
            initDataType : {
                required: true
            },
            courseFrontCoverFile : {
                required: true
            }
        },
        messages : {
            initDataType: {
                required: "初始化类型不能为空"
            },
            courseFrontCoverFile : {
                required: "初始化数据不能为空"
            }
        },
        submitHandler : function(form) {
            var name = $("#courseFrontCoverFile").val();
            name = name.substring(name.lastIndexOf(".")+1).toLowerCase();
            if (name == "xls" || name == "xlsx") {
                $(form).ajaxSubmit({
                    url: getContentPath()+"/dm/init",
                    type:'post',
                    success : function (data) {
                        $.disposeData(data, function(data) {
                            if (data.code == 0) {
                                $("#initDataType,#courseFrontCoverFile").val("");
                            }
                        });
                    }
                });
            } else {
                bootBoxWarning("只能上传excel文件");
            }
        }
    });
    Validator.validate("#initData2", {
        rules : {
            courseFrontCoverFile : {
                required: true
            }
        },
        messages : {
            courseFrontCoverFile : {
                required: "初始化数据不能为空"
            }
        },
        submitHandler : function(form) {
            var name = $("#courseFrontCoverFile2").val();
            var isAudio = $("input[name='isAudio']").val();
            name = name.substring(name.lastIndexOf(".")+1).toLowerCase();
            if (name == "zip") {
                $(form).ajaxSubmit({
                    url: getContentPath()+"/idc/init",
                    type:'post',
                    success : function (data) {
                        clearInterval(clearIcPlan);
                        if (data.code == 0) {
                            $('.bootbox.modal.fade.in .bootbox-body').html("100.00%");
                            setTimeout(function(){$('.bootbox.modal.fade.in .bootbox-body').html(data.msg);},500);
                            $("#courseFrontCoverFile2").val("");
                        } else {
                            $('.bootbox.modal.fade.in .bootbox-body').html("<span>导入失败</span>");
                        }
                    }
                });
                bootBoxInitData("数据解析中，请稍等...", function() {
                    $('.bootbox.modal.fade.in .bootbox-body').html("数据解析中，请稍等...");
                });
                clearIcPlan = setInterval(icPlan, 1000);
            } else {
                bootBoxWarning("只能上传zip压缩包");
            }
        }
    });
});
var clearIcPlan;
function icPlan() {
    $.post(getContentPath()+"/idc/plan",function(data){
        var msg = parseInt(data.msg);
        if (msg != 0) {

           /* $('.bootbox.modal.fade.in .bootbox-body').html(data.result+"--"+msg+"--"+new Number(data.result/msg*100).toFixed(2)+"%");*/

            $('.bootbox.modal.fade.in .bootbox-body').html(new Number(data.result/msg*100).toFixed(2)+"%");
        }
    });
}