/**
 * Created by danjiaxin on 2014/8/26.
 */
var courseTree, courseNode = null, cnn, newNodeCount = 0, courseObj, setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        drag: {
            isCopy: false,
            isMove: false
        },
        removeTitle: "删除",
        renameTitle: "重命名"
    },
    view: {
        addHoverDom: function (treeId, treeNode) {
            if (treeNode.url == "3")
                return false;
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
            var addStr = "<span class='button add' id='addBtn_"+treeNode.tId+"' title='"+tit(treeNode.url)+"'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_"+treeNode.tId);
            if (btn) btn.bind("click", function(){
                newNodeCount++;
                var newNode=courseTree.addNodes(treeNode, {id:newNodeCount, pId:treeNode.id, name:"",url:parseInt(treeNode.url)+1+""});
                courseTree.editName(courseTree.getNodeByParam("id", newNodeCount, null));
            });
        },
        removeHoverDom: function (treeId, treeNode) {
            $("#addBtn_"+treeNode.tId).unbind().remove();
        },
        selectedMulti: false,
        showLine: false
    },
    callback: {
        beforeRemove: function(treeId, treeNode) {
            if (typeof treeNode.children == "undefined" || treeNode.children == "") {
                bootBoxConfirm("确认删除\""+treeNode.name+"\"吗？", function (isConfirm) {
                    if (isConfirm) {
                        $.postJSON("/"+del(treeNode.url)+"/delete", {id : treeNode.id}, function(data) {
                            if (data.code == 0) {
                                courseTree.removeNode(treeNode);
                            }
                        });
                    }
                });
            } else {
                bootBoxWarning("请先删除子节点！");
            }
            return false;
        },
        beforeRename: function(treeId, treeNode, newName, isCancel) {
            newName = $.trim(newName);
            var oldName = $.trim(treeNode.name);
            treeNode.name = oldName;
//            if (newName.length < 1) {
//                bootBoxWarning("请输入名称");
//                return false;
//            }
            if (treeNode.url == "1") {
                courseNode = treeNode;
                cnn = treeNode.name;
                if (courseObj != null) {
                    $('#myModal').modal('show');
                    $("#courseId").val(treeNode.id);
                    $("#courseName").val(newName);
                    $("#courseDesc").val(courseObj.courseDesc);
                    $("#courseFunctionCode").val(courseObj.courseFunctionCode);
                } else {
                    $.post(getContentPath()+"/course/course",{id:treeNode.id},function(data){
                        if (data.code == 0) {
                            courseObj = data.result;
                            $('#myModal').modal('show');
                            $("#courseId").val(treeNode.id);
                            $("#courseName").val(newName);
                            $("#courseDesc").val(courseObj.courseDesc);
                            $("#courseFunctionCode").val(courseObj.courseFunctionCode);
                        } else {
                            bootBoxError("不存在该课程");
                        }
                    },"json");
                }
            } else {
                if (oldName != newName) {
                    if (treeNode.url == "2") {
                        if (typeof treeNode.id == "number") {
                            $.postJSON("/section/save",{name:$.trim(newName),id:treeNode.getParentNode().id},function(data) {
                                if (data.code == 0) {
                                    treeNode.name = data.result.secName;
                                    treeNode.id = data.result.secId;
                                    courseTree.updateNode(treeNode);
                                } else {
                                    courseTree.editName(treeNode);
                                }
                            });
                        } else {
                            $.postJSON("/section/update",{secId:treeNode.id,secName:$.trim(newName),id:treeNode.getParentNode().id},function(data) {
                                if (data.code == 0) {
                                    treeNode.name = data.result.secName;
                                    courseTree.updateNode(treeNode);
                                } else {
                                    courseTree.editName(treeNode);
                                }
                            });
                        }
                    } else if(treeNode.url == "3") {
                        if (typeof treeNode.id == "number") {
                            $.postJSON("/knowledge/save",{name:$.trim(newName),id:treeNode.getParentNode().id},function(data) {
                                if (data.code == 0) {
                                    treeNode.name = data.result.kpName;
                                    treeNode.id = data.result.kpId;
                                    courseTree.updateNode(treeNode);
                                } else {
                                    courseTree.editName(treeNode);
                                }
                            });
                        } else {
                            $.postJSON("/section/update",{kpId:treeNode.id,kpName:$.trim(newName),id:treeNode.getParentNode().id},function(data) {
                                if (data.code == 0) {
                                    treeNode.name = data.result.secName;
                                    courseTree.updateNode(treeNode);
                                } else {
                                    courseTree.editName(treeNode);
                                }
                            });
                        }
                    }
                }
            }
            return true;
        },
        onRename: function(event, treeId, treeNode, isCancel)  {
            if (treeNode.name == "") {
                courseTree.removeNode(treeNode);
            }
        },
        onClick: function(event, treeId, treeNode) {
            if (treeNode.url == "1") {
                $.post(getContentPath()+"/course/course",{id:treeNode.id},function(data){
                    if (data.code == 0) {
                        $("#showCourse").show();
                        courseObj = data.result;
                        $("#couName").html(courseObj.courseName);
                        $("#couFc").html(courseObj.courseId);
                        $("#couDesc").html(courseObj.courseDesc);
                        $("#couDate").html(courseObj.courseCreateDate);
                        if (courseObj.courseFrontCover) {
                            $("#couImg").html('<img width="250px" src="'+courseObj.courseFrontCover+'"/>');
                        } else {
                            $("#couImg").html("请上传课程图片");
                        }
                    } else {
                        bootBoxError(data.msg, function() {
                            bootBoxError("不存在该课程");
                        });
                    }
                }, "json");
            } else {
                $("#showCourse").hide();
            }
        }
    }
};

function del(type) {
    if (type == 1)
        return "course";
    else if (type == 2)
        return "section";
    else if (type == 3)
        return "knowledge";
}
function tit(type) {
    if (type == 1) {
        return "新增章节";
    } else if(type == 2) {
        return "新增知识点";
    }
}
$(document).ready(function() {
    courseTree = $.fn.zTree.init($("#courseTree"), setting, zNodes);
    $('#myModal').on('hide.bs.modal', function (e) {
//        console.log(courseNode);
        if($.trim($("#courseId").val()) != "" && courseNode != null) {
            courseNode.name = cnn;
            courseTree.updateNode(courseNode);
        }
        $("#courseId,#courseName").val("");
        $("#courseDesc").val("");
        $("#courseFunctionCode").val(courseFunctionCode);
        $("#courseFrontCoverFile").nextAll("a").click();
        courseNode = null;
    });
    Validator.validate("#course", {
        rules : {
            courseName : {
                required: true,
                maxlength: 32,
                remote: {
                    url: getContentPath() + "/course/ccn",
                    type: "post",
                    dataType: "json",
                    data: {
                        name: function() {
                            return $.trim($("#courseName").val());
                        },
                        id: function() {
                            return $("#courseId").val();
                        }
                    }
                }
            },
            courseDesc : {
                maxlength : 100
            }
        },
        messages : {
            courseName: {
                required: "课程名称不能为空",
                maxlength: "课程名称长度不能大于50个字符",
                remote: "课程已经存在"
            },
            courseDesc : {
                maxlength: "课程备注长度不能大于100个字符"
            }
        },
        submitHandler : function(form) {
            var cid = $("#courseId").val()=="";
            $(form).ajaxSubmit({
                url: getContentPath()+"/course/"+(cid?"save":"update"),
                type:'post',
                success : function (data) {
                    $.disposeData(data, function(data) {
                        if (data.code == 0) {
                            if (cid) {
                                courseTree.addNodes(null, {id:data.result.courseId,name:data.result.courseName,pId:0,url:"1"});
                                $("#"+courseTree.getNodeByParam("id", data.result.courseId, null).tId+"_span").click();
                            } else {
                                courseNode.name = data.result.courseName;
                                courseTree.updateNode(courseNode);
                                $("#"+courseNode.tId+"_span").click();
                            }
                            courseNode = null;
                            $('#myModal').modal('hide');
                        }
                    });
                }
            });
        }
    });
});
var SUPPORT_FILE_SUFFIX = /\.(jpe?g|png|gif)$/i;
var SUPPORT_FILE_TYPE = /(image)/i;
var SUPPORT_FILE_MAX_SIZE = 200; // 最大支持100KB的图片上传
$('#courseFrontCoverFile').ace_file_input({
    no_file: '未选择任何图片文件',
    btn_choose: '选择图片文件',
    btn_change: '',
    no_icon: 'icon-picture',
    droppable: false,  // 是否可以直接拖入文件
    thumbnail: 'large', // large, fit, small, true, false —— 压缩并预览
    style: 'well',  // 'well', false —— 显示效果，well支持预览，并支持多个文件上传
    preview_error: null,
    before_remove: function () {
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
