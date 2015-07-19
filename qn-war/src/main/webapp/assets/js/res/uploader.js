/**
 * Created by Dendy on 2014/8/12.
 */
window.Uploader = window.Uploader || (function init($, undefined) {
    "use strict";
/**
    document.write("<link rel='stylesheet' href='" + getContentPath() + "/assets/css/uploader.css'/>");
    document.write("<link rel='stylesheet' href='" + getContentPath() + "/asset-libs/css/zTree/zTree.css'/>");

    // add wizard support.
    document.write("<script src='" + getContentPath() + "/asset-libs/js/uncompressed/fuelux/fuelux.wizard.js'>" + "</" + "script>");
    // add ajax file upload support.
//    document.write("<script src='" + getContentPath() + "/asset-libs/js/uncompressed/zTree/jquery.ztree.core-3.5.js'>" + "</" + "script>");
    document.write("<script src='" + getContentPath() + "/asset-libs/js/zTree/jquery.ztree.core-3.5.min.js'>" + "</" + "script>");
    document.write("<script src='" + getContentPath() + "/asset-libs/js/zTree/jquery.ztree.excheck-3.5.min.js'>" + "</" + "script>");
    document.write("<script src='" + getContentPath() + "/asset-libs/js/zTree/jquery.ztree.exedit-3.5.min.js'>" + "</" + "script>");
    document.write("<script src='" + getContentPath() + "/asset-libs/js/ajaxfileupload.js'>" + "</" + "script>");
**/
    var path = getContentPath();
    var treeId = "category-tree";
    var treeDivId = "select-ztree";
    var treeLevel = "";

    // the base DOM structure needed to create a modal

    var fileInputId = 'resFileId';

    var selectFileTemplate =
        '<div class="center" id="#select-file">' +
            '<span class="btn btn-success fileinput-button">' +
                '<i class="icon-plus icon-white"></i>' +
                '<span>选择资源文件</span>' +
                '<input type="file" name="resFile" id="resFileId" multiple/>' +
            '</span>' +
        '</div>' +
        '<div style="margin-top: 25px;">' +
            '<h5>资源上传须知：</h5>' +
            '<ul>' +
                '<li>支持的文件格式：' +
                    '<div style="padding-left: 15px;">' +
                        '<img src="' + path + '/assets/images/res/docx.png">doc(docx),<img src="' + path + '/assets/images/res/xls.gif">xls(xlsx),' +
                        '<img src="' + path + '/assets/images/res/ppt.gif">ppt(pptx),<img src="' + path + '/assets/images/res/swf.gif">swf' +
                        '<img src="' + path + '/assets/images/res/flv.gif">flv,<img src="' + path + '/assets/images/res/mp4.gif">mp4,' +
                        '<img src="' + path + '/assets/images/res/mp3.gif">mp3,<img src="' + path + '/assets/images/res/pdf.gif">pdf' +
                    '</div>' +
                '</li>' +
                '<li>文件大小不能超过50M.</li>' +
                '<li>上传过程中请勿刷新或关闭本页面.</li>' +
            '</ul>' +
        '</div>';

    var uploadFormTemplate =
        '<form class="form-horizontal" action="' + path + '/res/up" method="post">' +
            '<input type="hidden" name="id">' +
            '<input type="hidden" name="oldName">' +
            '<input type="hidden" name="newName">' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label no-padding-right"><space class="red">*</space>名称:</label>' +
                '<div class="col-sm-5"><div class="clearfix">' +
                    '<input type="text" name="name" class="form-control"/>' +
                '</div></div>' +
            '</div>' +
            '<div class="space-2"></div>' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label no-padding-right"><space class="red">*</space>知识点:</label>' +
                '<div class="col-sm-5"><div class="clearfix" id="select-tree-container">' +
                    '<div id="select-ztree" class="selectZtree col-xs-12  no-padding">' +
                        '<input class="hide zTree-ids" name="level">' +
                        '<input readonly class="zTree-input form-control" name="categoryName">' +
                        '<input class="hide zTree-ids" name="knowledgePoint">' +
//                        '<input class="hide zTree-ids" name="category.profession">' +
//                        '<input class="hide zTree-ids" name="category.certificate">' +
                        '<input class="hide zTree-ids" name="category.course">' +
                        '<input class="hide zTree-ids" name="category.section">' +
                        '<input class="hide zTree-ids" name="category.knowledgePoint">' +
                        '<a class="zTree-btn"><i class="icon-caret-down"></i></a>' +
                        '<div class="zTree-content" style="display:none;position:absolute;z-index:3;">' +
                            '<ul id="category-tree" class="ztree">' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                '</div></div>' +
            '</div>' +
            '<div class="space-2"></div>' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label no-padding-right">资源描述:</label>' +
                '<div class="col-sm-5"><div class="clearfix">' +
                    '<textarea class="form-control" name="description"></textarea>' +
                '</div></div>' +
            '</div>' +
        '</form>';

    var templates =
        '<div id="modal-wizard" class="modal">' +
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header" data-target="#modal-step-contents">' +
                        '<h4 class="modal-title">资源上传向导</h4><br>' +
                        '<ul class="wizard-steps">' +
                            '<li data-target="#modal-step1" class="active">' +
                                '<span class="step">1</span>' +
                                '<span class="title">选择资源文件</span>' +
                            '</li>' +
                            '<li data-target="#modal-step2">' +
                                '<span class="step">2</span>' +
                                '<span class="title">填写资源信息</span>' +
                            '</li>' +
                            '<li data-target="#modal-step3">' +
                                '<span class="step">3</span>' +
                                '<span class="title">上传</span>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="modal-body step-content" id="modal-step-contents">' +
                        '<div class="step-pane active" id="modal-step1">' +
                            selectFileTemplate +
                        '</div>' +
                        '<div class="step-pane" id="modal-step2">' +
                            '<div class="center">' +
                            uploadFormTemplate +
                            '</div>' +
                        '</div>' +
                        '<div class="step-pane" id="modal-step3">' +
                            '<div class="center" id="upload-step">' +
                                '<h5>最后一步，点击完成按钮完成资源上传！</h5>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-footer wizard-actions">' +
                        '<button class="btn btn-sm btn-prev"><i class="icon-arrow-left"></i>前一步</button>' +
                        '<button class="btn btn-success btn-sm btn-next" data-last="完成">下一步<i class="icon-arrow-right icon-on-right"></i></button>' +
                        '<button class="btn btn-danger btn-sm pull-left" data-dismiss="modal"><i class="icon-remove"></i>取消</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    // cache a reference to the jQueryfied body element
    var appendTo = $("body");
    var defaults = {
        // show backdrop or not
        backdrop: true,
        // animate the modal in/out
        animate: true,
        // show the dialog immediately by default
        show: true
    };

    // our public object; augmented after our private API
    var exports = {};

    function _init(options) {
        // make sure any supplied options take precedence over defaults
        options = $.extend({}, defaults, options);
        options.backdrop = options.backdrop ? "static" : false;
        return options;
    }

    var fm = null;
    exports.uploadWizard = function (options) {
        options = _init(options);
        var dialog = $(templates);
        fm = dialog.find('form');
        var modalBody = dialog.find(".modal-body");
        var callbacks = {
            onEscape: options.onEscape
        };

        dialog.on("hidden.bs.modal", function (e) {
            // ensure we don't accidentally intercept hidden events triggered
            // by children of the current dialog. We shouldn't anymore now BS
            // namespaces its events; but still worth doing
            if (e.target === this) {
                dialog.remove();
            }
        });

        dialog.on("shown.bs.modal", function () {
            _fileInit();
            _wizardInit();
            _eventInit();
            _uploadFormValidate();
            _loadCategoryData();
        });

        function _eventInit() {
            // 点击取消按钮
            dialog.find('.btn-danger').on('click', function (e) {
                $.ajax({
                    url: path + "/res/rmt",
                    data: {
                        fileName : fm.find('input[name=newName]').val()
                    },
                    type : 'post',
                    success: function (data) {
                    },
                    error: function (data) {
                    }
                });
            });
        }

        function _wizardInit() {
            $('#' + treeDivId).css({width: $('.form-horizontal').find('input[name=name]').width});
            dialog.find('.modal-header').ace_wizard().on('change', function (e, info) {
                if (info.step == 1) {
                    var tmpName = fm.find('input[name=newName]').val();;
                    if (tmpName == "") {
                        alert('请先选择资源文件！');
                        return false;
                    }
                } else if (info.step == 2) {
                    if (!fm.valid()) return false;
                }
            }).on('finished', function (e) {
                _upload();
            }).on('stepclick', function (e) {
                return false;//prevent clicking on steps
            });

            dialog.find('.wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');
        }

        // 上传资源文件
        function _upload() {
            fm.submit();
            dialog.modal("hide");
        }

        function _fileInit() {
            var SUPPORT_FILE_SUFFIX = /\.(docx?|xlsx?|pptx?|mp3|mp4|flv|swf|pdf)$/i;
            // 上传课件所支持的文件类型.

            $('#' + fileInputId).on('change', function () {
                var self = $(this);
                var file = self.val();
                if (!SUPPORT_FILE_SUFFIX.test(file)) {
                    alert('不支持的文件类型!');
                    return false;
                }

                // 上传
                $.ajaxFileUpload({
                    url: path + '/res/upload?fileInputName=resFile', //用于文件上传的服务器端请求地址,resFileId传file的name属性值
                    secureuri: false,//一般设置为false
                    fileElementId: fileInputId, //文件上传空间的id属性  <input type="file" name="file" />
                    dataType: 'json',//返回值类型 一般设置为json
                    success: function (data, status) //服务器成功响应处理函数
                    {
                        var res = data.result;
                        fm.find('input[name=newName]').val(res.newName);
                        fm.find('input[name=oldName]').val(res.oldName);
                        // 名称默认为上传时文件的名称
                        fm.find('input[name=name]').val(res.oldName);
                        // 下一步
                        dialog.find('.btn-next').click();
                    },
                    error: function (data)//服务器响应失败处理函数
                    {

                    }
                });
                return false;
            });
        }

        function _uploadFormValidate() {
            // form验证
            Validator.validate(fm, {
                rules: {
                    name: {
                        required: true,
                        rangelength: [2, 20]
                    },
                    categoryName: {
                        required: true
                    },
                    description: {
                        rangelength: [5, 100]
                    }
                },

                messages: {
                    name: {
                        required: "资源名称不能为空",
                        rangelength: "名称长度{0}到{1}"
                    },
                    categoryName: {
                        required: "请选择知识点"
                    },
                    description: {
                        rangelength: "资源描述长度为{0}到{1}个字符"
                    }
                },
                submitHandler: function (form) {
                    startLoading("上传中...");
                    $(form).ajaxSubmit(
                        {
                            dataType: 'json',
                            success: function (data) {
                                if (data.code == CODE_ENUM.ERROR) {
                                    bootBoxError(data.msg);
                                } else {
                                    bootBoxSuccess(data.msg, function () {
                                        $('#data-table').dataTable().fnClearTable();
//                                        if (document.referrer)
//                                            top.location.href = document.referrer;
//                                        else
//                                            top.location.href = path + "/res/l";
//                                        top.location.reload(true);
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
                errorPlacement: function (error, el) {
                    error.appendTo(el.parent());
                }
            });
        }

        function _loadCategoryData () {
            $('#' + treeId).html('数据加载中...');
            // 加载知识点
            var setting = {
                view: {
                    showIcon: true,
                    showLine: false
                },
                async: {
                    enable: true,
                    url: path + "/kp/l",
                    otherParam : ["code", ""],
                    dataFilter : filter
                },
                callback: {
                    onClick: selectNode,
                    beforeAsync: zTreeBeforeAsync
//                    beforeClick: zTreeBeforeClick
                }
            };

            function filter(treeId, parentNode, childNodes) {
                if (!childNodes) return null;
                for (var i=0, l=childNodes.length; i<l; i++) {
                    childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
                }
                return childNodes;
            }

            // 只有知识点能被点击(能选中)
//            function zTreeBeforeClick (treeId, treeNode, clickFlag) {
//                return treeNode.type == Constant.ProfessionType.KNOWLEDGE_POINT;
//            }

            // 异步将在之前
            function zTreeBeforeAsync (treeId, treeNode) {
                var codes = "";
                if (!treeNode) {
                } else {
                    var cs = [];
                    cs.push(treeNode.code);
                    var pNode = treeNode.getParentNode();
                    while (pNode) {
                        cs.push(pNode.code);
                        pNode = pNode.getParentNode();
                    }
                    // 需要将code反序，从上之下拼接，传递之后台
                    var tmp = cs.reverse();
                    codes = tmp.join(",");
                }
                $.fn.zTree.getZTreeObj(treeId).setting.async.otherParam = ["code", codes];
                return true;
            }

            // 单击节点
            function selectNode(e, treeId, treeNode) {
                var sectionNode = "";
                var courseNode = "";
                if(treeNode.getParentNode()==null) {
                    sectionNode = treeNode.getParentNode();
                    treeLevel = Constant.ProfessionType.COURSE;
                }
                else {
                    sectionNode = treeNode.getParentNode();
                    treeLevel = Constant.ProfessionType.SECTION;
                    if (sectionNode.getParentNode() != null)
                        treeLevel = Constant.ProfessionType.KNOWLEDGE_POINT;
                }
//                var certNode = courseNode.getParentNode();
//                var proNode = certNode.getParentNode();
                // 设置显示知识点名称
                $("#" + treeDivId).find("input[name='categoryName']").val(treeNode.name);
                //保存资源关联的知识点
                $("#" + treeDivId).find("input[name='level']").val(treeLevel);
                // 设置存储的当前知识点以上的所有节点code.
                $("#" + treeDivId).find("input[name='knowledgePoint']").val(treeNode.code);
                $("#" + treeDivId).find("input[name='category.knowledgePoint']").val(treeNode.code);
//                $("#" + treeDivId).find("input[name='category.section']").val(sectionNode.code);
//                $("#" + treeDivId).find("input[name='category.course']").val(courseNode.code);
                hideMenu();
//                $("#" + treeDivId).find("input[name='category.certificate']").val(certNode.code);
//                $("#" + treeDivId).find("input[name='category.profession']").val(proNode.code);
            }

            function hideMenu() {
                //$(".menuContent").fadeOut("fast");
                $('#' + treeDivId + " .zTree-content").fadeOut("fast");
                $("body").unbind("mousedown", onBodyDown);
                $('#' + treeDivId + " .zTree-btn > i").removeClass("icon-caret-up").addClass("icon-caret-down");
            }

            function showMenu() {
                /*var category = $("#" + settins.name);
                 var categoryPos = category.position();
                 $(".menuContent").css({*//*left: categoryPos.left + "px", *//*top: categoryPos.top + category.outerHeight() + "px", width: category.outerWidth() + "px"})
                 .slideDown("fast");*/
                var cityObj = $('#' + treeDivId + " .zTree-input");
                var cityPosition = $('#' + treeDivId).position();
                $('#' + treeDivId + " .zTree-content").css({top:cityObj.outerHeight() + "px"}).slideDown("fast");
                $("body").bind("mousedown", onBodyDown);
                $('#' + treeDivId + " .zTree-btn > i").removeClass("icon-caret-down").addClass("icon-caret-up");
            }

            function onBodyDown(event) {
                // var zTreeId = "#selectZtree";
                if (!(event.target.className == "zTree-btn" || event.target.className == "zTree-input" || event.target.className == "zTree-content" || $(event.target).parents('#' + treeDivId + " .zTree-content").length>0)) {
                    hideMenu();
                }
            }

            $(document).ready(function () {
                $.fn.zTree.init($("#" + treeId), setting);
                $("#" + treeDivId + " .zTree-btn,.zTree-input").bind("click", function(){
                    if($("#" + treeDivId + " .zTree-btn > i").hasClass("icon-caret-up")) {
                        hideMenu();
                    } else {
                        showMenu();
                    }
                });
            });
        }

        appendTo.append(dialog);

        dialog.modal({
            backdrop: options.backdrop,
            keyboard: false,
            show: false
        });

        if (options.show) {
            dialog.modal("show");
        }
        return dialog;
    };

    exports.setDefaults = function (values) {
        $.extend(defaults, values);
    };

    exports.init = function (_$) {
        window.Uploader = init(_$ || $);
    };
    return exports;
}(window.jQuery));