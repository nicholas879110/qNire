(jQuery)(function($){

    loadProfessionTree();
    //清空文件上传框
    function clearFileInput(file){
        var form=document.createElement('form');
        document.body.appendChild(form);
        //记住file在旧表单中的的位置
        var pos=file.nextSibling;
        form.appendChild(file);
        form.reset();
        pos.parentNode.insertBefore(file,pos);
        document.body.removeChild(form);
    }

    $("#add-profession-cert").click(function(){
        $('#edit-profession-cert-form').submit();
    })
    var addSetting = {
        rules: {
            certName: {
                required: true
            },
            studyTime: {
                required:true,
                studyNumber: true
            }/*,
            certLevel:{
                required:true,
                remote: {
                    url: getContentPath() + "/pf/cert/level/valid",
                    type: "post",
                    dataType: "json",
                    data: {
                        certLevel: function () {
                            return $("select[name=certLevel]").val();
                        },
                        id:function(){
                            var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                            var  node= treeObj.getSelectedNodes()[0];
                            return node.id;
                        },
                        type:function(){
                            var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                            var  node= treeObj.getSelectedNodes()[0];
                            return node.type
                        }
                    }
                }
            }*//*,
            frontCover: {
                required: true
            }*/
        },
        messages: {
            certName: {
                required: "名称不能为空"
            },
            studyTime: {
                required: "不能为空",
                studyNumber:"学时只能为数字"
            }/*,
            certLevel:{
                required:"证书等级不能为空",
                remote:"该职业下已有该等级证书"
            }*//*,
            frontCover: {
                required: "请选择文件"
            }*/
        },
        submitHandler: function (form) {
            addProfessionCert();
        }
    }
    var addValidate = validForm("#edit-profession-cert-form",addSetting);

    function addProfessionCert() {

        var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
        var  nodes= treeObj.getCheckedNodes(true);
        if(nodes&&nodes.length==0){
            bootBoxWarning("请先勾选职业或工种节点才能添加证书(职称)!");
            return;
        }
        var node=nodes[0];
        var id=node.id;
        var type=node.type;
        $("#proName").text(node.name);

        //验证certlevel
        $('#edit-profession-cert-form [name=certLevel]').rules("add", {
            required: true,
            remote: {
                url: getContentPath() + "/pf/cert/level/valid",
                type: "post",
                dataType: "json",
                data: {
                    certLevel: function () {
                        return $("select[name=certLevel]").val();
                    },
                    id:function(){
                        var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                        var  node= treeObj.getSelectedNodes()[0];
                        return node.id;
                    },
                    type:function(){
                        var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                        var  node= treeObj.getSelectedNodes()[0];
                        return node.type
                    },
                    certType:function(){
                        return $('#edit-profession-cert-form').find("select[name=type]").val();
                    }
                }
            },
            messages: {
                required: "等级不能为空",
                remote:"该职业下已有该等级"
            }
        });

        var dialog = $("#dialog-profession-cert").removeClass('hide').dialog({
            modal: true,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>证书(职称)维护</h4></div>",
            title_html: true,
            width:500,
            open: function (event, ui) {
                var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                var  node= treeObj.getSelectedNodes()[0];
                //清除原有的file路径
                $("#edit-profession-cert-form").find(".icon-remove").click();
                addValidate.resetForm();
//                $("#edit-profession-cert-form").find("div :last").append(" <input class=\"input-small\" id=\"frontCover\" type=\"file\"  name=\"frontCover\">");
                $('#edit-profession-cert-form').find("input[name=proId]").attr("value",id);
                $('#edit-profession-cert-form').find("input[name=proType]").attr("value",type);
                $('#edit-profession-cert-form').find("select[name=type]").attr("value","dataType.cert");
                levelChange("dataType.cert");
            },
            close: function (event, ui) {
                addValidate.resetForm();
                $("#dialog-profession-cert").addClass('hide')
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
                        var $form = $('#edit-profession-cert-form');
                    if(!$form.valid()) return;
//                    var ks = $.trim($("#studyTime").val());
//                    if(!/[0-9]{1,5}/.test(ks)) {
//                        bootBoxWarning("课时是不大于六位数的正整数");
//                        return;
//                    }
//                    var file_input = $form.find('input[type=file]');
//                    if (!file_input.data('ace_input_files')){
//                        bootBoxWarning("如果未选择封面将会使用系统默认等级封面!")
//                    }
                        var fd = new FormData($form.get(0));
                        $.ajax({
                            url: getContentPath() + "/pf/relate/cert",
                            type: $form.attr('method'),
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            success: function (data, textStatus, jqXHR) {
                                if (data.code==0) {
                                    var details = generateDetailHtml(data);
                                    $("#certDetail").html(details);
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

    //动态添加的元素事件绑定
    $("#certDetail").on("click",".label-success",function(){
           editCert(this,$(this).attr("data-id"));
    });

    function editCert(dom,certCode){

        $('#edit-profession-cert-form [name=certLevel]').rules("remove");
        $('#edit-profession-cert-form [name=certLevel]').parents('.form-group').removeClass('has-error');
        $('#edit-profession-cert-form [name=certLevel]').parents('.form-group').find('.help-block').remove();

        var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
        var  nodes= treeObj.getSelectedNodes();
        var node=nodes[0];
        var id=node.id;
        var type=node.type;
        $("#proName").text(node.name);
        var certName=$(dom).parent().parent().find("p:eq(0) span").text();
        var certLevel=$(dom).parent().parent().find("input[name=level]").val();
        var certDescn=$(dom).parent().parent().find("p:eq(2) span").text();
        var studyTime=$(dom).parent().parent().find("p:eq(3) span" ).text();
        var imgPath=$(dom).parent().parent().parent().find("img").attr("src");
        var pointPath=$(dom).parent().parent().find("input[name=certPoint]").val();
        var certType = $(dom).parent().parent().find("input[name=type]").val()
        //路径为空时时，去掉项目路径 "/ce"
        if(pointPath.indexOf(".")==-1)
            pointPath="";
//    console.dir($(dom));

        var dialog = $("#dialog-profession-cert").removeClass('hide').dialog({
            modal: true,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>编辑证书(职称)</h4></div>",
            title_html: true,
            width:500,
            open: function (event, ui) {
                //清除原有的file路径
                $("#edit-profession-cert-form").find(".icon-remove").click();
                addValidate.resetForm();
                $('#edit-profession-cert-form').find("input[name=certId]").attr("value",certCode);
                $('#edit-profession-cert-form').find("input[name=proId]").attr("value",id);
                $('#edit-profession-cert-form').find("input[name=proType]").attr("value",type);
                $('#edit-profession-cert-form').find("input[name=certName]").val(certName);
                $('#edit-profession-cert-form').find("input[name=certDescn]").val(certDescn);
                $('#edit-profession-cert-form').find("input[name=studyTime]").val(studyTime);
                $('#edit-profession-cert-form').find(".ace-file-input .file-name").attr("data-title",imgPath);
                $('#edit-profession-cert-form').find(".ace-file-input .file-name").eq(1).attr("data-title",pointPath);
                $('#edit-profession-cert-form').find("select[name=type]").val(certType);
                levelChange(certType);
                $('#edit-profession-cert-form').find("select[name=certLevel]").val(certLevel);
            },
            close: function (event, ui) {
                addValidate.resetForm();
                $("#dialog-profession-cert").addClass('hide')
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
                        var $form = $('#edit-profession-cert-form');
                        if(!$form.valid()) return;
                        var fd = new FormData($form.get(0));
                        $.ajax({
                            url: getContentPath() + "/pf/cert/edit",
                            type: $form.attr('method'),
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            success: function (data, textStatus, jqXHR) {
                                if (data.code==0) {
                                    var details = generateDetailHtml(data);
                                    $("#certDetail").html(details);
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

    var upload_in_progress = false;
    $('#frontCover').ace_file_input({
        no_file : '选择文件',
        btn_choose : '选择',
        btn_change : '重选',
        droppable : false,
        onchange : null,
        thumbnail : false,
//        thumbnail:'large',
        before_remove: function() {
            if(upload_in_progress)
                return false;//if we are in the middle of uploading a file, don't allow resetting file input
            return true;
        },
        before_change: function(files, dropped) {
            var file = files[0];
            if(typeof file == "string") {//files is just a file name here (in browsers that don't support FileReader API)
                if(! (/\.(jpe?g|png|gif)$/i).test(file) ) {
                    alert('请选择图片文件!');
                    return false;
                }
            }
            else {
                var type = $.trim(file.type);
                if( ( type.length > 0 && ! (/^image\/(jpe?g|png|gif)$/i).test(type) )
                    || ( type.length == 0 && ! (/\.(jpe?g|png|gif)$/i).test(file.name) )//for android's default browser!
                    ) {
                    alert('请选择图片文件!');
                    return false;
                }

                if( file.size > 1100000 ) {//~100Kb
                    alert('文件大小不能超过 1M!');
                    return false;
                }
            }

            return true;
        }
    });

    $('#outline').ace_file_input({
        no_file : '选择文件',
        btn_choose : '选择',
        btn_change : '重选',
        droppable : false,
        onchange : null,
        thumbnail : false,
//        thumbnail:'large',
        before_remove: function() {
            if(upload_in_progress)
                return false;//if we are in the middle of uploading a file, don't allow resetting file input
            return true;
        },
        before_change: function(files, dropped) {
            var file = files[0];
            if(typeof file == "string") {//files is just a file name here (in browsers that don't support FileReader API)
                if(! (/\.(htm|html)$/i).test(file) ) {
                    alert('请选择html文件!');
                    return false;
                }
            }
            else {
                var type = $.trim(file.type);
                if(
                     ( type.length == 0 && ! (/\.(htm|html)$/i).test(file.name) )//for android's default browser!
                    ) {
                    alert('请选择html文件!');
                    return false;
                }

                if( file.size > 2100000 ) {//~100Kb
                    alert('文件太大!');
                    return false;
                }
            }

            return true;
        }
    });

    $('#edit-profession-cert-form').find("select[name=type]").change(function(){
        levelChange($(this).val());
    })

    function levelChange(type){
        if(type == "dataType.cert"){
            $("#levelDiv label").html("证书等级：");
            $("#levelDiv select").attr("data-placeholder","请选择证书等级");
            var op ='<option value="">请选择</option>'+
                    '<option value="1">初级</option>'+
                    '<option value="2">中级</option>'+
                    '<option value="3">高级</option>'+
                    '<option value="4">技师</option>'+
                    '<option value="5">高级技师</option>';
            $("#levelDiv select").empty();
            $("#levelDiv select").append(op);
        }else{
            $("#levelDiv label").html("职称等级：");
            $("#levelDiv select").attr("data-placeholder","请选择职称等级");
            var op ='<option value="">请选择</option>'+
                '<option value="1">初级</option>'+
                '<option value="2">中级</option>'+
                '<option value="3">高级</option>';
            $("#levelDiv select").empty();
            $("#levelDiv select").append(op);
        }

        //验证certlevel
        $('#edit-profession-cert-form [name=certLevel]').rules("add", {
            required: true,
            remote: {
                url: getContentPath() + "/pf/cert/level/valid",
                type: "post",
                dataType: "json",
                data: {
                    certLevel: function () {
                        return $("select[name=certLevel]").val();
                    },
                    id:function(){
                        var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                        var  node= treeObj.getSelectedNodes()[0];
                        return node.id;
                    },
                    type:function(){
                        var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
                        var  node= treeObj.getSelectedNodes()[0];
                        return node.type
                    },
                    certType:function(){
                        return $('#edit-profession-cert-form').find("select[name=type]").val();
                    }
                }
            },
            messages: {
                required: "证书等级不能为空",
                remote:"该职业下已有该等级证书"
            }
        });

    }

})

function loadProfessionTree() {
    startLoading();
    $.ajax({
        url: getContentPath() + '/pf/query/all',
        type: 'post',
        dataType: "json",
        data: {},
        success: function (data, textStatus, jqXHR) {
            initLoadTree(data);
            endLoading();
        }
    });


}


function initLoadTree(data){
    var setting = {
        check: {
            enable: true,
            chkStyle: "radio",
            radioType: "all"
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeOnClick,
            onAsyncSuccess:zTreeAsyncSuccess
        },
        view:{
            showLine:false
        }
    };
    $.fn.zTree.init($("#profession_tree"), setting, data);
    var treeObj = $.fn.zTree.getZTreeObj("profession_tree");
    var nodes = treeObj.getNodes();
    for (var i=0, l=nodes.length; i<l; i++) {
        if(nodes[i].isParent){
            nodes[i].nocheck = true;
            treeObj.updateNode(nodes[i]);
        }
    }
}

var certDetail='<div class="row">\
       <div class="col-xs-4">\
          <img src="{certCover}" style="width: 100px;height: 130px">\
        </div>\
        <div class="col-xs-8">\
            <span class="box-tag">\
                <a href="javascript:void(0);" onclick="removeCert(this,\'{certCode}\')" class="label label-danger">移除</a><br>\
                <a href="javascript:void(0);"  data-id="{certCode}" class="label label-success">编辑</a>\
            </span>\
            <input type="text" hidden="true" name="level" value="{level}">\
            <input type="text" hidden="true" name="type" value="{type}">\
            <input type="text" hidden="true" name="certPoint" value="{certPoint}">\
            <p>证书(职称)名字：<span>{certName}</span></p>\
            <p>证书(职称)等级：<span>{certLevel}</span></p>\
            <p>证书(职称)介绍：<span>{certDescn}<span></p>\
            <p>课时：<span>{studyTime}</span></p>\
        </div>\
    </div>\
    <hr>';

function zTreeOnClick(event, treeId, treeNode) {
    var nodeType = treeNode.type;
    var tempButtons = "";
    var recorsHtml="";
    startLoading("正在加载");
    $.ajax({
        url: getContentPath() + "/pf/relate/cert/query",
        type: 'post',
        dataType: 'json',
        data: {
            id:treeNode.id,
            type:treeNode.type
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
                var details = generateDetailHtml(data);
                $("#certDetail").html(details);
            } else {
                bootBoxError(data.msg);
            }
            endLoading();
        }
    });
}

function generateDetailHtml(data) {
    var details = "";
    if(data.result.length<=0){
        details="暂无绑定证书(职称)!";
        return details;
    }
    $.each(data.result, function (index, item) {
        var level = item.certLevel;
        var levelName = "";
        switch (level) {
            case Constant.CertficateLevel.Lower:
                levelName = Constant.CertficateLevel.LowerName;
                break;
            case Constant.CertficateLevel.Middler:
                levelName = Constant.CertficateLevel.MiddlerName;
                break;
            case Constant.CertficateLevel.Higher:
                levelName = Constant.CertficateLevel.HigherName;
                break;
            case Constant.CertficateLevel.Bester:
                levelName = Constant.CertficateLevel.BesterName;
                break;
            case Constant.CertficateLevel.Super:
                levelName = Constant.CertficateLevel.SuperName;
                break;
            default :
                break;
        }
        details += certDetail.replace("{certName}", item.certName).replace("{certDescn}", item.acceptStandard)
            .replace("{certLevel}", levelName).replace("{studyTime}", item.studyTime).replace("{certPoint}",getContentPath()
                +item.extraUrl).replace("{certCover}",getContentPath()+item.certFrontCover).replaceAll("{certCode}",
                item.certId).replace("{level}",level).replace("{type}",item.type);
    })

    return details;
}

function zTreeAsyncSuccess(event, treeId, treeNode, msg){
}

function removeCert(dom,certCode){
    var  treeObj = $.fn.zTree.getZTreeObj("profession_tree");
    var  node= treeObj.getSelectedNodes()[0];
    var id=node.id;
    var type=node.type;
    startLoading("正在处理");
    $.ajax({
        url: getContentPath() + "/pf/remove/cert",
        type: 'post',
        dataType: 'json',
        data: {
            id:id,
            type:type,
            certCode:certCode
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
                var details = generateDetailHtml(data);
                $("#certDetail").html(details);
                bootBoxSuccess(data.msg);
            } else {
                bootBoxError(data.msg);
            }
            endLoading();
        }
    });
}
