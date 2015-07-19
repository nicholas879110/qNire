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
            Long Video Managing
            <small class="pull-right">
                <button class="btn btn-minier btn-info" type="button" id="upload-btn">Upload</button>
            </small>
        </h1>
    </div>

    <div class="col-xs-12 table-responsive">
        <table id="lvList" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>

<div id="dialog-file-operation" class="hide">
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
                <input class="input-small" id="video-file" type="file" name="file">
            </div>
        </div>

    </form>
</div>

<script type="text/javascript">
    jQuery(function ($) {
        $("#lvList").dataTable({
            "sAjaxSource": getContentPath() + "/lv/pager.do",
            "aoColumns": [
                { "sWidth": "15%", "sTitle": "name", "sClass": "center", "mData": "name", "bSortable": false },
                { "sWidth": "12%", "sTitle": "ch", "sClass": "center", "mData": "ch", "bSortable": false },
                { "sWidth": "15%", "sTitle": "en", "sClass": "center", "mData": "en", "bSortable": false },
                { "sWidth": "12%", "sTitle": "url", "sClass": "center", "mData": "url", "bSortable": false },
                { "sWidth": "18%", "sTitle": "head", "sClass": "center", "mData": "firstFrame", "bSortable": false },
                { "sWidth": "13%", "sTitle": "operate", "sClass": "center", "mData": "id", "bSortable": false  }
            ],
            "aaSorting": [],
            "aLengthMenu": [ 10, 20, 30 ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                var operation = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">'
                        + '<a href="javascript:void(0)" onclick="updateVideo(this)" class="blue" title="edit"><i class="icon-edit bigger-130"></i></a>'
                        + '<a href="javascript:void(0)" onclick="deleteVideo(this)" class="red" title="delete"><i class="icon-remove bigger-130"></i></a>'
                        + '<a href="javascript:void(0)" onclick="playVideo(this);" class="yellow" title="play"><i class=" icon-facetime-video bigger-130"></i></a>'
                        + "</div>";
                $('td:eq(5)', nRow).html(operation);
            },
            "fnServerParams": function (aoData) {
            }
        });


        $("#video-file").ace_file_input({
            no_file: 'Please Select File',
            btn_choose: 'Select',
            btn_change: 'ReSelect',
            droppable: false,
            onchange: null,
            thumbnail: false,//| true | large
            whitelist: 'mp4',
            before_change: function (files, dropped) {
                var file = files[0];
                if (typeof file == "string") {//files is just a file name here (in browsers that don't support FileReader API)
                    if (!(/\.(mp4)$/i).test(file)) {
                        bootBoxWarning('Please Select mp4 Video!');
                        return false;
                    }
                }
                else {
                    var type = $.trim(file.type);
                    if (( type.length > 0 && !(/^video\/(mp4)$/i).test(type) )
                            || ( type.length == 0 && !(/\.(mp4)$/i).test(file.name) )//for android's default browser!
                            ) {
                        alert('Please Select mp4 Video!');
                        return false;
                    }

                    /*if( file.size > 1100000 ) {//~100Kb
                     alert('文件大小不能超过 1M!');
                     return false;
                     }*/
                }

                return true;
            }
            //blacklist:'exe|php'
            //onchange:''
        });


        $("#upload-btn").click(function () {
            var dialog = $("#dialog-file-operation").removeClass('hide').dialog({
                modal: true,
                width: 470,
                title: "<div class='widget-header widget-header-small'><h4 class='smaller'>Upload File</h4></div>",
                title_html: true,
                open: function (event, ui) {
                    var $form = $('#uploadForm');
                    var file_input = $form.find('input[type=file]');
                    file_input.ace_file_input('reset_input');
                    $form.get(0).reset();
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
                            $.ajax({
                                url: "${ctx}/lv/upload.do",
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
                                }
                            });
                            dialog.dialog("close");
                        }
                    }
                ]
            });
        })
    })

    function updateVideo(dom) {
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
        bootBoxConfirm("confirm delete this video?", function (result) {
            if(result){
                $.ajax({
                    url: "${ctx}/video/delete.do",
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
    }
</script>