<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-11-17
  Time: 下午10:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="../commons/tag.jsp" %>
<div class="row">
    <div class="page-header">
        <h1>
            Unit Managing
            <small class="pull-right">
                <button class="btn btn-minier btn-info" type="button" id="add" class="pull-right">New Unit</button>
            </small>
        </h1>
    </div>
    <div class="col-xs-12">

    </div>
    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <table class="table table-bordered table-responsive table-striped">
            <%--<caption>我的标题</caption>--%>
            <%--<thead class="table-header">
            <tr>
                <th colspan="4">飞行准备科目</th>
            </tr>
            </thead>--%>
            <tbody>
            <c:if test="${!empty units}">
                <c:forEach var="item" items="${units}" varStatus="unitStatus">
                    <c:choose>
                        <c:when test="${unitStatus.index%4==0}">
                            <tr>
                            <td colspan="1">
                                <a style="text-decoration:underline;" href="javascript:void(0)"
                                   onclick="switchToResource('${item.id}','${item.name}')">${item.name}</a>
                                <a href="javascript:void(0)" onclick="deleteUnit('${item.id}')" class="red pull-right"
                                   title="delete"><i class="icon-remove bigger-130"></i></a>
                                <a href="javascript:void(0)" onclick="updateUnit('${item.id}','${item.name}')"
                                   class="blue pull-right margin-10" title="edit"><i class="icon-edit bigger-130"></i></a>

                            </td>
                            <c:if test="${unitStatus.index==(fn:length(units)-1)}">
                                </tr>
                            </c:if>
                        </c:when>

                        <c:when test="${unitStatus.index%4==1||unitStatus.index%4==2}">

                            <td colspan="1">
                                <a style="text-decoration:underline;" href="javascript:void(0)"
                                   onclick="switchToResource('${item.id}','${item.name}')">${item.name}</a>
                                <a href="javascript:void(0)" onclick="deleteUnit('${item.id}')" class="red pull-right"
                                   title="delete"><i class="icon-remove bigger-130"></i></a>
                                <a href="javascript:void(0)" onclick="updateUnit('${item.id}','${item.name}')"
                                   class="blue pull-right margin-10" title="edit"><i class="icon-edit bigger-130"></i></a>
                                &nbsp;&nbsp;
                            </td>
                            <c:if test="${unitStatus.index==(fn:length(units)-1)}">
                                </tr>
                            </c:if>
                        </c:when>
                        <c:otherwise>  <%--==3--%>
                            <td colspan="1">
                                <a style="text-decoration:underline;" href="javascript:void(0)"
                                   onclick="switchToResource('${item.id}','${item.name}')">${item.name}</a>
                                <a href="javascript:void(0)" onclick="deleteUnit('${item.id}')" class="red pull-right"
                                   title="delete"><i class="icon-remove bigger-130"></i></a>
                                <a href="javascript:void(0)" onclick="updateUnit('${item.id}','${item.name}')"
                                   class="blue pull-right margin-10" title="edit"><i class="icon-edit bigger-130"></i></a>
                            </td>
                            </tr>
                        </c:otherwise>

                    </c:choose>
                </c:forEach>
            </c:if>
            </tbody>
        </table>
        <!-- PAGE CONTENT ENDS -->
    </div>
    <!-- /.col -->
</div>
<!-- /.row -->


<div id="dialog-unit" class="hide">
    <form id="unit-data-form" class="form-horizontal" role="form" method="post" enctype="multipart/form-data" style="">
        <input type="text" name="id" value="" hidden="true">

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding-right" for="name">name:</label>
            <div class="col-xs-12 col-sm-9">
                <input id="name" type="text" class="form-control" name="name">
            </div>
        </div>
    </form>

</div>

<script type="text/javascript">
    jQuery(function ($) {

        $("#add").click(function () {
            var dialog = $("#dialog-unit").removeClass('hide').dialog({
                modal: true,
                title: "<div class='widget-header widget-header-small'><h4 class='smaller'>new unit</h4></div>",
                title_html: true,
                open: function (event, ui) {
                    $('#unit-data-form')[0].reset();
                },
                close: function (event, ui) {
                    $('#unit-data-form')[0].reset();
                    dialog.dialog("destroy");
                    $("#dialog-unit").addClass('hide')
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
                            var $form = $('#unit-data-form');
                            var fd = new FormData($form.get(0));
                            $.ajax({
                                url: "${ctx}/unit/add.do",
                                type: $form.attr('method'),
                                processData: false,
                                contentType: false,
                                dataType: 'json',
                                data: fd,
                                success: function (data, textStatus, jqXHR) {
                                    if (data.code == 0) {
                                        switchPage("/unit/init.do")
                                    } else {
                                        bootBoxError("add error!")
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    bootBoxError("The server is error,please contact the administrator!");
                                }
                            });
                            dialog.dialog("close");
                        }
                    }
                ]
            });
        })

    })

    function switchToResource(id, name) {
        switchPage("/mgr/init.do", {unitId: id})
    }

    function updateUnit(id, name) {


        var dialog = $("#dialog-unit").removeClass('hide').dialog({
            modal: true,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'>edit unit</h4></div>",
            title_html: true,
            open: function (event, ui) {
                $('#unit-data-form').find("input[name=id]").attr("value",id);
                $('#unit-data-form').find("input[name=name]").attr("value",name);
                $('#unit-data-form')[0].reset();
            },
            close: function (event, ui) {
                $('#unit-data-form')[0].reset();
                dialog.dialog("destroy");
                $("#dialog-unit").addClass('hide')
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
                        var $form = $('#unit-data-form');
                        var fd = new FormData($form.get(0));
                        $.ajax({
                            url: "${ctx}/unit/update.do",
                            type: $form.attr('method'),
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    switchPage("/unit/init.do")
                                } else {
                                    bootBoxError("add error!")
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                bootBoxError("The server is error,please contact the administrator!");
                            }
                        });
                        dialog.dialog("close");
                    }
                }
            ]
        });
    }

    function deleteUnit(id) {
        bootBoxConfirm("this will delete all videos in this unit,continue delete this unit?", function (result) {
            if(result){
                $.ajax({
                    url: "${ctx}/unit/delete.do",
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data.code == 0) {
                            switchPage("/unit/init.do")
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
</script>