<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-11-17
  Time: 下午10:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="../commons/tag.jsp" %>
<div class="row">
    <div class="page-header">
        <h1>
            Video Managing
            <small class="pull-right">
                <button class="btn btn-minier btn-info" type="button" id="upload-btn">Upload</button>
            </small>
        </h1>
    </div>
    <div class="col-xs-12">

        <div class="row-fluid">
            <ul class="ace-thumbnails">

                <c:forEach items="${videos}" var="item">
                    <li>
                        <a href="javascript:void (0)"   onclick="playVideo('${item.url}')" >
                            <img src="${item.firstFrame}" width="150" height="150"/>
                        </a>

                        <div class="tools">
                            <a href="javascript:void(0)" onclick="updateVideo('${item.id}','${item.ch}','${item.en}')">
                                <i class="icon-edit"></i>
                            </a>
                            <a href="javascript:void(0)" onclick="deleteVideo('${item.id}')">
                                <i class="icon-remove red"></i>
                            </a>
                        </div>
                    </li>
                </c:forEach>
            </ul>
        </div>
        <!-- PAGE CONTENT ENDS -->
    </div>
    <!-- /.col -->
</div>
<!-- /.row -->

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
        var colorbox_params = {
            reposition: true,
            scalePhotos: true,
            scrolling: false,
            previous: '<i class="icon-arrow-left"></i>',
            next: '<i class="icon-arrow-right"></i>',
            close: '&times;',
            current: '{current} of {total}',
            maxWidth: '100%',
            maxHeight: '100%',
            onOpen: function () {
                document.body.style.overflow = 'hidden';
            },
            onClosed: function () {
                document.body.style.overflow = 'auto';
            },
            onComplete: function () {
                $.colorbox.resize();
            }
        };

        $('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);
        $("#cboxLoadingGraphic").append("<i class='icon-spinner orange'></i>");//let's add a custom loading icon

        /**$(window).on('resize.colorbox', function() {
		try {
			//this function has been changed in recent versions of colorbox, so it won't work
			$.fn.colorbox.load();//to redraw the current frame
		} catch(e){}
	});*/
        $("#video-file").ace_file_input({
            no_file: 'Please Select File',
            btn_choose: 'Select',
            btn_change: 'ReSelect',
            droppable: false,
            onchange: null,
            thumbnail: false,//| true | large
            whitelist:'mp4',
            before_change: function(files, dropped) {
                var file = files[0];
                if(typeof file == "string") {//files is just a file name here (in browsers that don't support FileReader API)
                    if(! (/\.(mp4)$/i).test(file) ) {
                        bootBoxWarning('Please Select mp4 Video!');
                        return false;
                    }
                }
                else {
                    var type = $.trim(file.type);
                    if( ( type.length > 0 && ! (/^video\/(mp4)$/i).test(type) )
                            || ( type.length == 0 && ! (/\.(mp4)$/i).test(file.name) )//for android's default browser!
                            ) {
                        bootBoxWarning('Please Select mp4 Video!');
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
                    /*{
                        text:"Add Item",
                        'class':"btn btn-xs",
                        click:function(){
                            var $form = $('#uploadForm');
                            $form.find("input[type=text]:last").after("<input type='text'name='ch'>")
                        }
                    }  ,*/
                    {
                        text: "Save",
                        "class": "btn btn-primary btn-xs",
                        click: function () {
                            var $form = $('#uploadForm');
                            var fd = new FormData($form.get(0));
                            fd.append("unitId", '${unitId}');
                            startLoading("正在上传中......");
                            $.ajax({
                                url: "${ctx}/video/upload.do",
                                type: $form.attr('method'),
                                processData: false,
                                contentType: false,
                                dataType: 'json',
                                data: fd,
                                success: function (data, textStatus, jqXHR) {
                                    if (data.code == 0) {
                                        switchPage("/video/init.do", {
                                            unitId: '${unitId}'
                                        })
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
        })
    })

    function updateVideo(id, ch, en) {
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
                $form.find("input[name=id]").attr("value", id);
                $form.find("input[name=ch]").attr("value", ch);
                $form.find("input[name=en]").attr("value", en);
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
                            url: "${ctx}/video/update.do",
                            type: $form.attr('method'),
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    switchPage("/video/init.do", {
                                        unitId: '${unitId}'
                                    })
                                } else {
                                    bootBoxError(data.msg, "error！");
                                }
                            }
                        });
                        dialog = $("#dialog-file-operation").addClass('hide')
                        dialog.dialog("close");
                    }
                }
            ]
        });
    }

    function deleteVideo(id) {
        bootBoxConfirm("confirm delete this video?", function (result) {
            if(result){
                $.ajax({
                    url: "${ctx}/video/delete.do",
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data.code == 0) {
                            switchPage("/video/init.do", {
                                unitId: '${unitId}'
                            })
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

function playVideo(url){
    window.open(url)
}
</script>