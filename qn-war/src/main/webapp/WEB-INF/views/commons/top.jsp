<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/8/5
  Time: 11:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="tag.jsp" %>
<div class="topNav">
    <div class="navbar-container container">
        <div class="navbar-header pull-right">
            <ul class="nav ace-nav">
                <li>
                    <a href="${ctx}/u/info/show">
                        <sec:authentication property="principal.username"/>
                    </a>
                </li>
                <li>
                    <a href="#">
                        消息
                    </a>
                </li>
                <li>
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                        设置<i class="icon-caret-down"></i>
                    </a>
                    <ul class="pull-left dropdown-menu dropdown-caret dropdown-close">
                        <%-- <li>
                             <a href="#">
                                 修改密码
                             </a>
                         </li>--%>
                        <li>
                            <a href="javascript:void(0)" onclick="modifyPassd()">
                                修改密码
                            </a>
                        </li>

                        <li class="divider"></li>


                    </ul>
                </li>
                <li>
                    <a href="${ctx}/j_spring_security_logout">
                        退出
                    </a>
                </li>
            </ul>
            <!-- /.ace-nav -->
        </div>
        <!-- /.navbar-header -->
    </div>
    <!-- /.container -->
</div>
<div class="train-banner">
    <div class="container">
        <h1 class="navbar-logo">
            <a href="#" class="">
                <i class="icon-leaf"></i>
                Child English Manage System
            </a><!-- /.brand -->
        </h1><!-- /.navbar-header -->
    </div>
    <!-- /.container -->
</div>

<div id="dialog-edit-operation" class="hide">
    <form id="passForm" method="post" enctype="multipart/form-data" class="form-horizontal">


        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">old password:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="password" name="oldPassd">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">new password:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="password" name="newPassd">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">repeat new password:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="password" name="reNewPassd">
            </div>
        </div>

    </form>
</div>

<script>

    jQuery(function ($) {
        Validator.validate($("#passForm"), {
            rules: {
                "oldPassd": {
                    required: true
                }, "newPassd": {
                    required: true,
                    equalTo: "#reNewPassd"
                }, "reNewPassd": {
                    required: true,
                    equalTo: "#newPassd"
                }
            },
            messages: {
                "oldPassd": {
                    required: "old password can not be null"
                }, "newPassd": {
                    required: "new password can not be null",
                    equalTo: "two password are not equal"
                }, "reNewPassd": {
                    required: "comfirm password can not be null",
                    equalTo: "two password are not equal"
                }
            }
        })
    })

    function modifyPassd() {
        var dialog = $("#dialog-edit-operation").removeClass('hide').dialog({
            modal: true,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>Priviledge Setting</h4></div>",
            title_html: true,
            height: 300,
            width: 350,
            open: function (event, ui) {
                $("#passForm").resetForm();
            },
            close: function (event, ui) {
//            $("#edit-profession-data-form").resetForm();
                $(this).dialog("destroy");
                $("#dialog-edit-operation").addClass('hide')
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
                        var $form = $('#teaForm');
                        var fd = new FormData($form.get(0));
                        if ($form.isValid())
                            $.ajax({
                                url: "${ctx}/user/modifyPassd.do",
                                type: $form.attr('method'),
                                processData: false,
                                contentType: false,
                                dataType: 'json',
                                data: fd,
                                success: function (data, textStatus, jqXHR) {
                                    if (data.code == 0) {
                                        //$('#teaList').dataTable().fnClearTable();
                                        bootBoxSuccess(data.msg);
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
</script>

