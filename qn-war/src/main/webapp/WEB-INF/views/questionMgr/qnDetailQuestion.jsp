<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="row">
    <div class="page-header">
        <h1>
            新建问题
        </h1>
    </div>

    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <form action="/qn/save.action" class="form-horizontal form-border" method="post" id="qnAddFrom">

            <%--<input type="hidden" name="niareId" value="${niareId}">--%>
            <%--<input type="hidden" name="sOrder" value="${sOrder}">--%>

            <table class="table table-striped table-bordered table-hover center">
                <tr width="30%">
                    <td>
                        题型
                    </td>
                    <td>
                        <input type="text" disabled="disabled" value="${types.name}">
                    </td>
                </tr>
                <tr width="30%">
                    <td>
                        标签
                    </td>
                    <td class="align-left">
                        <c:forEach items="${tags }" var="tagV" varStatus="status">
                            <input name="tags" type="checkbox" value="${tagV.id }">${tagV.tagName }<img
                                src="${ctx}/img_save_path/${tagV.tagImgPath }" width="25px" height="20px">
                        </c:forEach>
                    </td>
                </tr>
                <tr>
                    <td>
                        编号
                    </td>
                    <td>
                        <input class="form-control" type="text" name="sn" disabled="disabled" value="">
                    </td>
                </tr>

                <tr>
                    <td>
                        标题
                    </td>
                    <td>
                        <input class="form-control" type="text" name="title" disabled="disabled" value="${myQuestion.title}">
                    </td>
                </tr>

                <tr>
                    <td>
                        提示
                    </td>
                    <td>
                        <input class="form-control" type="text" name="ins" value="${myQuestion.ins}">
                    </td>
                </tr>

                <tr>
                    <td>
                        选项
                    </td>
                    <td id="optionTd">
                        <c:forEach items="${options }" var="option" varStatus="status">
                        <div class="form-group">
                            <%--<label class="col-sm-3 control-label no-padding-right" for="form-field-2"> Password Field </label>--%>

                            <div class="col-sm-9">
                                <input type="text" id="form-field-2" placeholder="选项${status.index+1}" class="col-xs-10 col-sm-5"
                                       disabled="disabled" value="${option.answer}"/>
                            </div>
                        </div>
                        </c:forEach>
                    </td>
                </tr>
            </table>
            <input id="tagName" type="hidden" value="${tag.tagName}">

            <div class="col-xs-12 center">
                <div class="space-16"></div>
                <a id="back-btn" href="javaScript:void(0);" class="btn btn-primary btn-rounded">返回</a>
            </div>
        </form>
        <!-- PAGE CONTENT ENDS -->
    </div>
    <!-- /.col -->
</div>
<!-- /.row -->


<script type="text/javascript">
    $(function () {

        $("input[name='checkbox1']").each(function(){
            if($(this).val() == $("#tagName").val()){
                $(this).attr("checked",true);
            }
        });

        $("#back-btn").click(function () {
            switchPage("/questionMgr/init.do")
        })
    })

</script>

