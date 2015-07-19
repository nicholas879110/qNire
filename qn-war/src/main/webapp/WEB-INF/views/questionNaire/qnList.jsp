<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-11-20
  Time: 下午11:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <div class="page-header">
        <h1>
            问卷管理
            <small class="">
                <button class="btn btn-minier btn-info" type="button" id="add-btn">新增</button>
                <button class="btn btn-minier btn-info" type="button" id="edit-btn">编辑</button>
                <button class="btn btn-minier btn-info" type="button" id="delete-btn">删除</button>
                <button class="btn btn-minier btn-info" type="button" id="edit-content-btn">文卷内容编辑</button>
                <button class="btn btn-minier btn-info" type="button" id="deploy-btn">发布文卷</button>
                <button class="btn btn-minier btn-info" type="button" id="cancel-btn">撤销</button>
                <button class="btn btn-minier btn-info" type="button" id="preview-btn">预览</button>
                <button class="btn btn-minier btn-info" type="button" id="count-btn">查看统计结果</button>
            </small>
        </h1>
    </div>

    <div class="col-xs-12 table-responsive">
        <table id="qnList" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>

<%--<div id="dialog-file-operation" class="hide">
    <form id="uploadForm" method="post" enctype="multipart/form-data" class="form-horizontal">
        <input type="text" hidden="true" name="id"/>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">Chinese:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="ch">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">English:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="en">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">File:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="input-small" id="mgr-file" type="file" name="file">
            </div>
        </div>

    </form>
</div>--%>

<script type="text/javascript">
    jQuery(function ($) {
        var  t=$("#qnList").dataTable({
            "sAjaxSource": getContentPath() + "/qn/pager.do",
            "columnDefs": [ {
                "searchable": false,
                "orderable": false,
                "targets": 0
            } ],
            "order": [[ 1, 'asc' ]],
            "aoColumns": [
                /*{
                    "sWidth": "5%",
                    "bSortable": false,
                    "sTitle": "序号",
                    "sClass": "center"
                },*/
                {
                    "sWidth": "5%",
                    "bSortable": false,
                    "mData": "id",
                    "sTitle": "选择",
                    "sClass": "center"
                },
                { "sWidth": "15%", "sTitle": "标题", "sClass": "center", "mData": "name", "bSortable": false },
                {
                    "sWidth": "12%", "sTitle": "状态", "sClass": "center", "mData": "status", "bSortable": false,
                    "mRender": function ( data, type, row ) {
                        if(data==0){
                            return "草稿"
                        }else if(data==1){
                            return "已发布"
                        }else
                        {
                            return "";
                        }

                    }
                },
                { "sWidth": "15%", "sTitle": "更新时间", "sClass": "center", "mData": "updateTime", "bSortable": false },
                { "sWidth": "12%", "sTitle": "发布人", "sClass": "center", "mData": "updateUser", "bSortable": false },
                { "sWidth": "13%", "sTitle": "操作", "sClass": "center", "mData": "id", "bSortable": false  }
            ],
            "aaSorting": [],
            "aLengthMenu": [ 10, 20, 30 ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(0)', nRow).html('<label><input type="radio" class="ace" name="id" value="' + aData["id"] + '" /><span style="width:0px;" class="lbl"></span></label>');
                var operation = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
                        + '<a href="javascript:void(0)" onclick="updateVideo(this)" class="blue" title="edit"><i class="icon-edit bigger-130"></i></a>'
                        + '<a href="javascript:void(0)" onclick="deleteVideo(this)" class="red" title="delete"><i class="icon-remove bigger-130"></i></a>'
                        + '<a href="javascript:void(0)" onclick="playVideo(this);" class="yellow" title="play"><i class=" icon-facetime-mgr bigger-130"></i></a>'
                        + "</div>";
                $('td:last', nRow).html(operation);
            },
            "fnServerParams": function (aoData) {

            }
        });
        /*t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();*/

        $("#add-btn").click(function () {
            switchPage("/qn/add.do")
        })


        $("#edit-btn").click(function(){
            var checkeded = $('#qnList').find("[name='id']:checked").val();
            //var sData = $('#qnList').dataTable().fnGetData($(checkeded).parents("#qnList tr").get(0));
            console.dir(checkeded);
        })


        $("#delete-btn").click(function(){
            var id= $('#qnList').find("[name='id']:checked").val();
            $.ajax({
                url: "${ctx}/qn/delete.do",
                type: 'post',
                data: {
                    id: id
                },
                success: function (data, textStatus, jqXHR) {
                    if (data.code == 0) {
                        $('#qnList').dataTable().fnClearTable();
                    } else {
                        bootBoxError("delete error!")
                    }
                }
            });
        })

        $("#edit-content-btn").click(function(){
            var id = $('#qnList').find("[name='id']:checked").val();
            //var sData = $('#qnList').dataTable().fnGetData($(checkeded).parents("#qnList tr").get(0));
//            console.dir(checkeded);
            switchPage("/qn/editConntent.do",{
                id:id
            })
        })


    })



   /* function updateVideo(dom) {
        var sData = $('#lvList').dataTable().fnGetData($(dom).parents("#lvList tr").get(0));
        var dialog = $("#dialog-file-operation").removeClass('hide').dialog({
            modal: true,
            width: 470,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'>Edit File</h4></div>",
            title_html: true,
            open: function (event, ui) {
                var $form = $('#uploadForm');
                var file_input = $form.find('input[type=file]');
                file_input.ace_file_input('reset_input');
                $form.get(0).reset();
                $form.find("input[name=id]").attr("value", sData['id']);
                $form.find("input[name=ch]").attr("value", sData['ch']);
                $form.find("input[name=en]").attr("value", sData['en']);
            },
            close: function (event, ui) {
                var $form = $('#uploadForm');
                var file_input = $form.find('input[type=file]');
                file_input.ace_file_input('reset_input');
                $form.get(0).reset();
                dialog.dialog("destroy");
                $("#dialog-file-operation").addClass('hide')
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
                        var $form = $('#uploadForm');
                        var fd = new FormData($form.get(0));
                        startLoading("正在上传中......");
                        $.ajax({
                            url: "${ctx}/lv/update.do",
                            type: $form.attr('method'),
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    $('#lvList').dataTable().fnClearTable();
                                } else {
                                    bootBoxError(data.msg, "error！");
                                }
                                endLoading();
                            }
                        });

                        dialog.dialog("close");
                    }
                }
            ]
        });
    }

    function deleteVideo(dom) {
        var sData = $('#lvList').dataTable().fnGetData($(dom).parents("#lvList tr").get(0))
        bootBoxConfirm("confirm delete this mgr?", function (result) {
            if(result){
                $.ajax({
                    url: "${ctx}/mgr/delete.do",
                    type: 'post',
                    data: {
                        id: sData['id']
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data.code == 0) {
                            $('#lvList').dataTable().fnClearTable();
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

    function playVideo(dom){
        var sData = $('#lvList').dataTable().fnGetData($(dom).parents("#lvList tr").get(0))
        window.open(getContentPath()+sData['url']);
    }*/
</script>