/**
 * Created by danjiaxin on 2014/8/26.
 */
$(document).ready(function() {
    var fileType = /\.(rar|zip|html|html)$/i;
    Validator.validate("#importResource", {
        rules : {
            resourceFile : {
                required: true
            }
        },
        messages : {
            resourceFile : {
                required: "初始化数据不能为空"
            }
        },
        submitHandler : function(form) {
            var name = $("#resourceFile").val();
            name = name.substring(name.lastIndexOf(".")+1).toLowerCase();
            if (name == "htm" || name == "html") {
                $(form).ajaxSubmit({
                    url: getContentPath()+"/resource/importResource",
                    type:'post',
                    success : function (data) {
                        $.disposeData(data, function(data) {
                            if (data.code == 0) {
                                bootBoxSuccess(data.msg);
                                $("#resourceFile").val("");
                            }
                            else{
                                bootBoxError(data.msg)
                            }
                        });
                    }
                });
            } else {
                bootBoxWarning("不支持该文件类型的导入");
            }
        }
    });
});
