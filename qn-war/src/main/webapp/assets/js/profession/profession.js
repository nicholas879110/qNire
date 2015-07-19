(jQuery)(function ($) {

    loadProfessionTree();
    $("#add-profession").click(function(){
        $('#edit-profession-data-form').submit();
    })
    var addSetting = {
        rules: {
            name: {
                required: true
            }
        },
        messages: {
            name: {
                required: "名称不能为空"
            }
        },
        submitHandler: function (form) {
            addNewProfession(null,null);
        }
    }
    validForm("#edit-profession-data-form",addSetting);


})

function addNewProfession(pId,pType) {
    var dialogTitle="新增";
    if(pType==null){
        dialogTitle+="职业";
        //修改label名称
        $("#edit-profession-data-form").find("label[for=name]").text("职业名称");
        $("#edit-profession-data-form").find("label[for=definition]").text("职业定义");
        $("#edit-profession-data-form").find("label[for=descn]").text("职业描述");
    }else if(pType=Constant.ProfessionDataType.Profession){
        dialogTitle+="工种";
        $("#edit-profession-data-form").find("label[for=name]").text("工种名称");
        $("#edit-profession-data-form").find("label[for=definition]").text("工种定义");
        $("#edit-profession-data-form").find("label[for=descn]").text("工种描述");
    }

    var dialog = $("#dialog-profession").removeClass('hide').dialog({
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>"+dialogTitle+"</h4></div>",
        title_html: true,
        width:500,
        open: function (event, ui) {
            $("#edit-profession-data-form").resetForm();
            $('#edit-profession-data-form').find("input[name=pId]").attr("value",pId==null?'':pId);
            $('#edit-profession-data-form').find("input[name=pType]").attr("value",pType==null?'':pType);
            $('#edit-profession-data-form').find("input[name=id]").attr("value","");
            $('#edit-profession-data-form').find("input[name=type]").attr("value","");
        },
        close: function (event, ui) {
//            $("#edit-profession-data-form").resetForm();
            $( this ).dialog( "destroy" );
            $("#dialog-profession").addClass('hide')
        },
        buttons: [
            {
                text: "取消",
                "class": "btn btn-xs",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "保存",
                "class": "btn btn-primary btn-xs",
                click: function () {
                    var $form = $('#edit-profession-data-form');
                    if(!$form.valid()) return;
                    var fd = new FormData($form.get(0));
                    $.ajax({
                        url: getContentPath() + "/pf/deal/pf",
                        type: $form.attr('method'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: fd,
                        success: function (data, textStatus, jqXHR) {
                            if (data.code==0) {
                                //同步树直接操作树节点
                                var result=data.result;
                                var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                                if(result.type==Constant.ProfessionDataType.Profession){
                                    treeObj.addNodes(null,result);
                                    bootBoxSuccess("添加职业成功");
                                }else if(result.type==Constant.ProfessionDataType.ProfessionJob){
                                    var  parentNode= treeObj.getSelectedNodes()[0];
                                    treeObj.addNodes(parentNode,result);
                                    bootBoxSuccess("添加工种成功");
                                }


                            } else {
                                bootBoxError(data.msg);
                            }
                        }
                    });
                    dialog.dialog("close");
                }
            }
        ]
    });
}

function loadProfessionTree() {
    var setting = {

        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeOnClick
        },
        view:{
            showLine:false
        }
    };

    startLoading();
    $.ajax({
        url: getContentPath() + '/pf/query/all',
        type: 'post',
        dataType: "json",
        data: {},
        success: function (data, textStatus, jqXHR) {
            $.fn.zTree.init($("#profession_tree"), setting, data);
            endLoading();
        }
    });


}

function zTreeOnClick(event, treeId, treeNode) {
    var nodeType = treeNode.type;
    var tempButtons = "";
    var recorsHtml="";
    switch (nodeType) {
        case Constant.ProfessionDataType.Industry:
            recorsHtml=detailRecordHtml.replace("{labelName}","行业名称").replace("{labelContent}",treeNode.name);
            break;
        case Constant.ProfessionDataType.BigCategory:
            recorsHtml+=detailRecordHtml.replace("{labelName}","行业").replace("{labelContent}",treeNode.getParentNode().name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","大类").replace("{labelContent}",treeNode.name);
            break;
        case Constant.ProfessionDataType.MidCategory:
            recorsHtml+=detailRecordHtml.replace("{labelName}","行业").replace("{labelContent}",treeNode.getParentNode().getParentNode().name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","大类").replace("{labelContent}",treeNode.getParentNode().name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","中类").replace("{labelContent}",treeNode.name);
            break;
        case Constant.ProfessionDataType.SmallCategory:
            //小类下可以维护职业
            recorsHtml+=detailRecordHtml.replace("{labelName}","行业").replace("{labelContent}",treeNode.getParentNode().getParentNode().getParentNode().name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","大类").replace("{labelContent}",treeNode.getParentNode().getParentNode().name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","中类").replace("{labelContent}",treeNode.getParentNode().name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","小类").replace("{labelContent}",treeNode.name);
            tempButtons = '<a href=\"javascript:void(0);\" class=\"label label-danger\" onclick=\"addNewProfession(\'' + treeNode.id + '\',\'' + treeNode.type + '\')\">新增职业</a>';
            break;
        case Constant.ProfessionDataType.Profession:
            recorsHtml+=detailRecordHtml.replace("{labelName}","职业名称").replace("{labelContent}",treeNode.name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","职业定义").replace("{labelContent}",treeNode.definition);
            recorsHtml+=detailRecordHtml.replace("{labelName}","职业描述").replace("{labelContent}",treeNode.descn);

            tempButtons = '<a href=\"javascript:void(0);\"  class=\"label label-success\" onclick=\"editProfessionData(\'' + treeNode.id + '\',\'' + treeNode.type + '\')\">编缉</a><br>\
                         <a href=\"javascript:void(0);\" class=\"label label-danger\" onclick=\"deleteProfessionData(\'' + treeNode.id + '\',\'' + treeNode.type + '\')\">删除</a><br>\
                         <a href=\"javascript:void(0);\" class=\"label label-danger\" onclick=\"addNewProfession(\'' + treeNode.id + '\',\'' + treeNode.type + '\')\">新增工种</a>';
            break;
        case Constant.ProfessionDataType.ProfessionJob:
            recorsHtml+=detailRecordHtml.replace("{labelName}","职业").replace("{labelContent}",treeNode.getParentNode().name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","工种名称").replace("{labelContent}",treeNode.name);
            recorsHtml+=detailRecordHtml.replace("{labelName}","工种定义").replace("{labelContent}",treeNode.definition);
            recorsHtml+=detailRecordHtml.replace("{labelName}","工种描述").replace("{labelContent}",treeNode.descn);

            tempButtons = '<a href=\"javascript:void(0);\"  class=\"label label-success\" onclick=\"editProfessionData(\'' + treeNode.id + '\',\'' + treeNode.type + '\')\">编缉</a><br>\
                        <a href=\"javascript:void(0);\" class=\"label label-danger\" onclick=\"deleteProfessionData(\'' + treeNode.id + '\',\'' + treeNode.type + '\')\">删除</a>';
            break;
    }
    $("#nodeDetail").html(detailHtml.replace("{buttons}",tempButtons).replace("{records}",recorsHtml));
}


var detailRecordHtml='<div class="form-group">\
    <label class="control-label col-sm-3 col-xs-12  no-padding-right">{labelName}：</label>\
    <label class="col-sm-5">{labelContent}</label>\
</div>';

var detailHtml = '<form class="form-horizontal" id="form-detail" >\
        <div class=\"box-tag\">\
           {buttons}\
        </div>\
        {records}\
    </form>';



function editProfessionData(id, type) {

    var dialogTitle="新增";
    if(type==Constant.ProfessionDataType.Profession){
        dialogTitle+="职业";
        //修改label名称
        $("#edit-profession-data-form").find("label[for=name]").text("职业名称");
        $("#edit-profession-data-form").find("label[for=definition]").text("职业定义");
        $("#edit-profession-data-form").find("label[for=descn]").text("职业描述");
    }else if(type=Constant.ProfessionDataType.ProfessionJob){
        dialogTitle+="工种";
        $("#edit-profession-data-form").find("label[for=name]").text("工种名称");
        $("#edit-profession-data-form").find("label[for=definition]").text("工种定义");
        $("#edit-profession-data-form").find("label[for=descn]").text("工种描述");
    }
    var dialog = $("#dialog-profession").removeClass('hide').dialog({
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>"+dialogTitle+"</h4></div>",
        title_html: true,
        width:500,
        open: function (event, ui) {
            var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
            var  node= treeObj.getSelectedNodes()[0];
            $('#edit-profession-data-form')[0].reset();
            $('#edit-profession-data-form').find("input[name=id]").attr("value",id);
            $('#edit-profession-data-form').find("input[name=type]").attr("value",type);
            $('#edit-profession-data-form').find("input[name=pId]").attr("value","");
            $('#edit-profession-data-form').find("input[name=pType]").attr("value","");
            $('#edit-profession-data-form').find("input[name=name]").val(node.name);
            $('#edit-profession-data-form').find("textarea[name=definition]").val(node.definition);
            $('#edit-profession-data-form').find("textarea[name=descn]").val(node.descn);
        },
        close: function (event, ui) {
            $('#edit-profession-data-form')[0].reset();
            $( this ).dialog( "destroy" );
        },
        buttons: [
            {
                text: "取消",
                "class": "btn btn-xs",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "保存",
                "class": "btn btn-primary btn-xs",
                click: function () {
                    var $form = $('#edit-profession-data-form');
                    if(!$form.valid()) return;
                    var fd = new FormData($form.get(0));
                    $.ajax({
                        url: getContentPath() + "/pf/deal/pf",
                        type: $form.attr('method'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: fd,
                        success: function (data, textStatus, jqXHR) {
                            if (data.code==0) {
                                //同步树直接操作树节点
                                var result=data.result;
                                var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                                var  node= treeObj.getSelectedNodes()[0];
                                node.name=result.name;
                                node.definition=result.definition;
                                node.desc=result.descn;
                                treeObj.updateNode(node);
                                bootBoxSuccess(data.msg);
                            } else {
                                bootBoxError(data.msg);
                            }
                        }
                    });
                    dialog.dialog("close");
                }
            }
        ]
    });
}

function deleteProfessionData(id, type) {
    startLoading();
    ajax(getContentPath() + "/pf/delete/pf", {
            id: id,
            type: type
        },
        function (data) {
            if(data.code==0){
                var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                var  node= treeObj.getSelectedNodes()[0];
                treeObj.removeNode(node);
                endLoading();
                bootBoxSuccess(data.msg);
                $("#nodeDetail").html("暂无节点数据")
            }else{
                bootBoxError(data.msg);
            }


        }
    )
}