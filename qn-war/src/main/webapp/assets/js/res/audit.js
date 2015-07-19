/**
 * Created by Dendy on 2014/5/21.
 */

$(function () {
    var fileUrl = $('#res_visit_url').val() + $('#swfFilePath').val();
    var fileMediaType = $('#fileMediaType').val();
    var isVideo = fileMediaType == Constant.Resource.FILE_TYPE.VIDEO;
    /**
     * flex paper加载
     * @type {*|jQuery}
     */
    if ($('#documentViewer')) {
        var fp = $('#documentViewer').FlexPaperViewer(
            {config: {
                SwfFile: fileUrl,
                Scale: 0.6,
                ZoomTransition: 'easeOut',
                ZoomTime: 0.5,
                ZoomInterval: 0.2,
                FitPageOnLoad: true,
                FitWidthOnLoad: true,
                FullScreenAsMaxWindow: true,
                ProgressiveLoading: true,
                MinZoomSize: 0.2,
                MaxZoomSize: 5,
                SearchMatchAll: false,
                InitViewMode: 'Portrait',
                ViewModeToolsVisible: true,
                ZoomToolsVisible: true,
                NavToolsVisible: true,
                CursorToolsVisible: true,
                SearchToolsVisible: true,
                localeChain: 'en_US',
                jsDirectory: getContentPath() + "/asset-libs/FlexPaper/js/", /*设置FlexPaper的js文件目录，包含FlexPaperVier.swf文件，否则默认在flex目录下.*/
                cssDirectory: getContentPath() + "/asset-libs/FlexPaper/css/"
            }}
        );
    }

    if ($('#videoPlayer')) {
        var type = isVideo ? "video" : "audio";
        var logo = ""; //getContentPath() + "/JarisFLVPlayer-v2.0.15b/img/logo-color.png";
        var logoUrl = "";
        var poster = getContentPath() + "/asset-libs/img/" + (isVideo ? "video.png" : "audio.png");

        var flashvarsVideo = {
            source: fileUrl, // 播放的视频文件地址
            type: type, // 文件格式，支持两种格式：audio, mgr
            streamtype: "file", // 文件流类型：file, http, rmtp, youtube
            server: "", // streamtype为rmtp时使用，协调rmtp文件流的服务器地址
            duration: "52",
            poster: poster, // 视频封面图片
            autostart: "false", // 自动开始播放
            logo: logo, // 视频播放画面的logo
            logoposition: "top left", // logo的位置：top bottom right left
            logoalpha: "30", // logo的透明度
            logowidth: "130", // logo的宽度
            logolink: logoUrl, // logo点击后连接地址
            hardwarescaling: "false",
            darkcolor: "000000", // 播放画面的背景颜色
            brightcolor: "4c4c4c", // 播放页面前景色
            controlcolor: "FFFFFF", // 工具栏的颜色
            hovercolor: "67A8C1", // 鼠标移动到工具栏按钮上的颜色
            controltype: 1 // 控制类型：0 - 老版本样式，播放控制在右边，1-新版本样式，播放控制在下边
        };
        var params = {
            menu: "false",
            scale: "noScale",
            allowFullscreen: "false", //是否允许全屏播放
            allowScriptAccess: "always",
            bgcolor: "#000000", // 播放背景色
            quality: "high", //视频画面质量：high low
            wmode: "opaque"
        };
        var attributes = {
            id: "JarisFLVPlayer"
        };
        var player = getContentPath() + "/asset-libs/JarisFLVPlayer-v2.0.15b/bin/JarisFLVPlayer.swf";
        var container = "videoPlayer";
        var installer = getContentPath() + "/asset-libs/JarisFLVPlayer-v2.0.15b/bin/expressInstall.swf"
        var width = "100%";
        var height = "100%";
        swfobject.embedSWF(player, container, width, height, "10.0.0", installer, flashvarsVideo, params, attributes);
    }

    $('#res-edit').hide();
    $('#res-info').show();

    // form验证
    Validator.validate($('#editForm'), {
        rules: {
            name: {
                required: true,
                rangelength: [2, 20]
            },
            description: {
                rangelength: [5, 100]
            }
        },

        messages: {
            name: {
                required: "课件名称不能为空",
                rangelength: "名称为2到20个字符"
            },
            description: {
                rangelength: "资源描述长度为{0}到{1}个字符"
            }
        },

        submitHandler: function (form) {
            $(form).ajaxSubmit(
                {
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == CODE_ENUM.ERROR) {
                            alert(data.msg);
                        } else {
                            alert("修改成功！");
                            _showInfo();
                        }
                    },
                    error: function (data) {
                        alert(data.msg);
                    }
                });
        }
    });

    // form验证
    Validator.validate($('#audit-form'), {
        rules: {
            auditResult: {
                required: true
            },
            auditOpinion: {
                rangelength: [5, 50]
            }
        },
        messages: {
            auditResult: {
                required: "结果不能为空"
            },
            auditOpinion: {
                rangelength: "意见为{0}到{1}个字符."
            }
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit(
                {
                    dataType: 'json',
                    success: function (data) {
                        alert('审核成功！');
//                        top.location.href = getContentPath() + "/res/man";
                        //返回资源审核页面
                        $('ul.submenu a[view="/res/man"]').click();
                    },
                    error: function (data) {
                        alert(data.msg);
                    }
                });
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.insertAfter(element.parent().parent().parent());
            } else {
                error.insertAfter(element.parent());
            }
        }
    });
    $('textarea').autosize({append: "\n"});
});

/**
 * 加载courseware数据
 *
 * @private
 */
function switchEdit() {
    if ($('#editBtn').html() == "修改") {
        _showEditForm();
    } else {
        _showInfo();
    }
}

function _showInfo() {
    $('#editBtn').html('修改');
    var id = $('#id').val();
    $('#res-edit').hide();
    ajax(getContentPath() + "/res/gd", {id: id}, function (data) {
        $("#info-name").html(data.name);
        $("#info-type").html(data.srcFileTypeName);
        $("#info-size").html(data.fileSizeText);
        $("#info-uploaduser").html(data.uploadUserName);
        $("#info-uploadtime").html(data.uploadTime);
        $("#info-description").html(data.description);
        $('#res-info').show();
        $('#auditDiv').show();
    });
}

function _showEditForm($self) {
    $('#editBtn').html('取消');
    var id = $('#id').val();
    $('#res-info').hide();
    $('#editForm').resetForm();
    $('#auditDiv').hide();
    // 返回CourseWareDomain
    ajax(getContentPath() + "/res/get", {id: id}, function (data) {
        $("#id").val(data.id);
        $("#name").val(data.name);
        $("#comment").val(data.description);
        $('#res-edit').show();
    });
}