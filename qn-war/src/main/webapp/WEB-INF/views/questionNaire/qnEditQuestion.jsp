<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<div class="row">
    <div class="page-header">
        <h1>
            编辑问题
        </h1>
    </div>

    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <form action="/qn/save.action" class="form-horizontal form-border" method="post" id="qnAddFrom">

            <input type="hidden" name="niareId" value="${niareId}">
            <input type="hidden" name="sOrder" value="${ques.sOrder}">
            <input type="hidden" name="id" value="${ques.id}">
            <table class="table table-striped table-bordered table-hover center">
                <tr width="30%">
                    <td>
                        题型
                    </td>
                    <td>
                        <select class="form-control"  name="qtype" disabled>
                            <option value="0">单选题</option>
                            <option value="1">单选题</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>
                        编号
                    </td>
                    <td>
                        <input class="form-control" type="text" name="sn" value="${ques.sn}">
                    </td>
                </tr>

                <tr>
                    <td>
                        标题
                    </td>
                    <td>
                        <input class="form-control" type="text" name="title" value="${ques.title}">
                    </td>
                </tr>

                <tr>
                    <td>
                        提示
                    </td>
                    <td>
                        <input class="form-control" type="text" name="ins" value="${ques.ins}">
                    </td>
                </tr>

                <tr>
                    <td>
                        选项
                    </td>
                    <td id="optionTd">

                        <c:forEach items="${ques.options}" var="opt" varStatus="sts">

                            <div class="form-group">

                                <div class="col-sm-9">
                                    <input type="hidden" value="${opt.id}" name="options[${sts.index}].id">
                                    <input type="text" value="${opt.answer}" id="form-field-2" placeholder="选项1" class="col-xs-10 col-sm-5"name="options[${sts.index}].answer" />
                                                <span class="help-inline col-xs-12 col-sm-7">
                                                    <span class="middle">
                                                            <a href="javascript:void(0)" onclick="deleteOption(this,'${opt.id}','${ques.id}','${niareId}')">删除</a>
                                                    </span>
                                                </span>
                                </div>
                            </div>
                        </c:forEach>

                        <div id="operationDiv" class="col-xs-12 col-sm-9 align-left">
                            <a href="javascript:void(0)" onclick="appendOption(this)">增加</a>
                            <%--<a href="javascript:void(0)" onclick="selectOption(this)">从库中选择</a>
                            <a href="javascript:void(0)" onclick="appendOption(this)">从问卷中复制</a>
                            <a href="javascript:void(0)" onclick="appendOption(this)">从剪贴板粘贴</a>--%>
                        </div>
                    </td>
                </tr>
            </table>


            <div class="col-xs-12 center">
                <div class="space-16"></div>
                <a id="save-btn" href="javaScript:void(0);" class="btn btn-primary btn-rounded">保存</a>
                <a id="back-btn" href="javaScript:void(0);" class="btn btn-primary btn-rounded">返回</a>
            </div>
        </form>
        <!-- PAGE CONTENT ENDS -->
    </div>
    <!-- /.col -->
</div>
<!-- /.row -->

<div id="dialog-select" class="hide">
    <form id="opt-data-form" class="form-horizontal" role="form" method="post" enctype="multipart/form-data" style="">
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
    $(function(){
        $("#save-btn").click(function(){
            var $form = $('#qnAddFrom');
            //var fd = new FormData($form.get(0));
            $.ajax({
                url: "${ctx}/qn/updateQuestion.do",
                type: $form.attr('method'),
//                processData: false,
//                contentType: false,
                dataType: 'json',
                data: $form.serialize(),
                success: function (data, textStatus, jqXHR) {
                    if (data.code == 0) {
                        bootBoxSuccess(data.msg);
                    } else {
                        bootBoxError(data.msg, "error！");
                    }
                }
            });
        })

        $("#back-btn").click(function(){
            switchPage("/qn/editConntent.do",{
                id:'${niareId}'
            })
        })
    })

    function deleteOption(dom){
        $(dom).parents(".form-group").remove();
        sort();
    }

    function sort(){
        var rows=$("#optionTd").find(".form-group");

        $.each(rows,function(index,tr){
            $(tr).find("input:first").attr("name","options["+index+"].answer");
        })
    }


    function deleteOption(dom,optionId,questionId,niareId){
        $.ajax({
            url: "${ctx}/qn/removeQuestionOption.do",
            type: 'post',
            dataType: 'json',
            data: {
                optionId:optionId,
                questionId:questionId,
                niareId:niareId
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 0) {
                    $(dom).parents(".form-group").remove();
                    sort();
                } else {
                    bootBoxError(data.msg, "error！");
                }
            }
        });

    }


    var optionTpm= "<div class=\"form-group\">\
            <div class=\"col-sm-9\">\
            <input type=\"text\"  placeholder=\"选项{sn}\" class=\"col-xs-10 col-sm-5\" name=\"options[{index}].answer\" />\
            <span class=\"help-inline col-xs-12 col-sm-7\">\
                <span class=\"left\">\
                    <a href=\"javascript:void(0)\" onclick=\"deleteOption(this)\">删除</a>\
                </span>\
            </span>\
        </div>\
    </div>";
    function appendOption(){
        var rows=$("#optionTd").find(".form-group").length;
        console.log(optionTpm);
        console.log()
        //$("#operationDiv").insertBefore(optionTpm.replace("{sn}",rows+1).replace("{index}",rows));
        $("#operationDiv").before(optionTpm.replace("{sn}",rows+1).replace("{index}",rows));
    }

    function selectOption(){

    }

</script>

