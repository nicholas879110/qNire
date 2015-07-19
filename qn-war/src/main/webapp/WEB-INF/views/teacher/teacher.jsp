<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-12-8
  Time: 下午9:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <div class="page-header">
        <h1>
            Teacher Managing
            <small class="pull-right">
                <button class="btn btn-minier btn-info" type="button" id="add-btn">Add</button>
            </small>
        </h1>
    </div>

    <div class="col-xs-12 table-responsive">
        <table id="teaList" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>

<div id="dialog-tea-operation" class="hide">
    <form id="teaForm" method="post" enctype="multipart/form-data" class="form-horizontal">
        <input type="text" hidden="true" name="id"/>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">UserName:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="username">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">Name:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="name">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">TelNum:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="telNum">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">Email:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="email">
            </div>
        </div>

    </form>
</div>


<div id="dialog-author" class="hide">
    <ul id="auth-tree" class="ztree col-sm-7" style="height: 400px;width:300px;"></ul>
</div>

<script type="text/javascript">
jQuery(function ($) {
    $("#teaList").dataTable({
        "sAjaxSource": getContentPath() + "/tea/pager.do",
        "aoColumns": [
            { "sWidth": "15%", "sTitle": "name", "sClass": "center", "mData": "name", "bSortable": false },
            { "sWidth": "12%", "sTitle": "username", "sClass": "center", "mData": "username", "bSortable": false },
            { "sWidth": "15%", "sTitle": "telNum", "sClass": "center", "mData": "telNum", "bSortable": false },
            { "sWidth": "12%", "sTitle": "email", "sClass": "center", "mData": "email", "bSortable": false },
            { "sWidth": "13%", "sTitle": "operate", "sClass": "center", "mData": "id", "bSortable": false  }
        ],
        "aaSorting": [],
        "aLengthMenu": [ 10, 20, 30 ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var operation = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
                    + '<a href="javascript:void(0)" onclick="updateTea(this)" class="blue" title="edit"><i class="icon-edit bigger-130"></i></a>'
                    + '<a href="javascript:void(0)" onclick="deleteTea(this)" class="red" title="delete"><i class="icon-remove bigger-130"></i></a>'
                    + '<a href="javascript:void(0)" onclick="setPriviledge(this);" class="yellow" title="setting"><i class="icon-certificate bigger-130"></i></a>'
                    + "</div>";
            $('td:eq(4)', nRow).html(operation);
        },
        "fnServerParams": function (aoData) {
        }
    });


    $("#add-btn").click(function () {
        var dialog = $("#dialog-tea-operation").removeClass('hide').dialog({
            modal: true,
            width: 470,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'>Add Teacher</h4></div>",
            title_html: true,
            open: function (event, ui) {
                var $form = $('#teaForm');
                $form.get(0).reset();
            },
            close: function (event, ui) {
                var $form = $('#teaForm');
                $form.get(0).reset();
                $(this).dialog("destroy");
                $("#dialog-tea-operation").addClass('hide')
            },
            buttons: [
                {
                    text: "Cancel",
                    "class": "btn btn-xs",
                    click: function () {
                        dialog.dialog("close");
                        //$("#dialog-tea-operation").addClass('hide')
                    }
                },
                {
                    text: "Save",
                    "class": "btn btn-primary btn-xs",
                    click: function () {
                        var $form = $('#teaForm');
                        var fd = new FormData($form.get(0));
                        $.ajax({
                            url: "${ctx}/tea/add.do",
                            type: $form.attr('method'),
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    $('#teaList').dataTable().fnClearTable();
                                } else {
                                    bootBoxError(data.msg, "error！");
                                }
                            }
                        });
                        dialog.dialog("close");
                        //$("#dialog-tea-operation").addClass('hide')
                    }
                }
            ]
        });
    })
})

function updateTea(dom) {
    var sData = $('#teaList').dataTable().fnGetData($(dom).parents("#teaList tr").get(0));
    var dialog = $("#dialog-tea-operation").removeClass('hide').dialog({
        modal: true,
        width: 470,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'>Edit Teacher</h4></div>",
        title_html: true,
        open: function (event, ui) {
            var $form = $('#teaForm');
            $form.get(0).reset();
            $form.find("input[name=id]").attr("value", sData['id']);
            $form.find("input[name=username]").attr("value", sData['username']);
            $form.find("input[name=name]").attr("value", sData['name']);
            $form.find("input[name=telNum]").attr("value", sData['telNum']);
            $form.find("input[name=email]").attr("value", sData['email']);
        },
        close: function (event, ui) {
            var $form = $('#teaForm');
            $form.get(0).reset();
            dialog.dialog("destroy");
            $("#dialog-tea-operation").addClass('hide')
        },
        buttons: [
            {
                text: "Cancel",
                "class": "btn btn-xs",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "Save",
                "class": "btn btn-primary btn-xs",
                click: function () {
                    var $form = $('#teaForm');
                    var fd = new FormData($form.get(0));
                    $.ajax({
                        url: "${ctx}/tea/update.do",
                        type: $form.attr('method'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: fd,
                        success: function (data, textStatus, jqXHR) {
                            if (data.code == 0) {
                                $('#teaList').dataTable().fnClearTable();
                            } else {
                                bootBoxError(data.msg, "error！");
                            }
                        }
                    });

                    dialog.dialog("close");
                }
            }
        ]
    });
}

function deleteTea(dom) {
    var sData = $('#teaList').dataTable().fnGetData($(dom).parents("#teaList tr").get(0))
    bootBoxConfirm("confirm delete this mgr?", function (result) {
        if(result){

            $.ajax({
                url: "${ctx}/tea/delete.do",
                type: 'post',
                data: {
                    id: sData['id']
                },
                success: function (data, textStatus, jqXHR) {
                    if (data.code == 0) {
                        $('#teaList').dataTable().fnClearTable();
                    } else {
                        bootBoxError("delete error!")
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    bootBoxError("The server is error,please contact the administrator!");
                }
            });

        }
    })
}

var setting2 = {
    view: {
        selectedMulti: false,
        showLine: true
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};

function setPriviledge(dom) {
    var sData = $('#teaList').dataTable().fnGetData($(dom).parents("#teaList tr").get(0));
    var id = sData["id"];

    //加载权限
    $.ajax({
        type: "post",
        url: getContentPath() + "/tea/showPris.do",
        data: {
            id: id
        },
        success: function (data, textStatus, jqXHR) {
            $.fn.zTree.init($("#auth-tree"), setting2, data.result)
            $.fn.zTree.getZTreeObj("auth-tree").expandAll(true);
        }
    })



    var dialog = $("#dialog-author").removeClass('hide').dialog({
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Priviledge Setting</h4></div>",
        title_html: true,
        height: 300,
        width: 350,
        open: function (event, ui) {
            //$("#edit-user-data-form").resetForm();
        },
        close: function (event, ui) {
//            $("#edit-profession-data-form").resetForm();
            $(this).dialog("destroy");
            $("#dialog-author").addClass('hide')
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

                    var authTree = $.fn.zTree.getZTreeObj("auth-tree");
                    var authNodes = authTree.getCheckedNodes(true);
                    var priIds = [];
                    $.each(authNodes, function (index, item) {
                        priIds.push(item.id);
                    })
                    $.ajax({
                        type: "post",
                        url: getContentPath() + "/tea/setPri.do",
                        data: {
                            priIds: priIds.join(","),
                            id: id
                        },
                        success: function (data, textStatus, jqXHR) {
                            bootBoxSuccess(data.msg)
                        }
                    })
                    dialog.dialog("close");
                }
            }
        ]
    });
}
</script>