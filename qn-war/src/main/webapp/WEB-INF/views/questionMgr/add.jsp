<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="row">
    <div class="page-header">
        <h1>
            题目新增
        </h1>
    </div>

    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <form action="/questionMgr/save.action" class="form-horizontal form-border" method="post" id="ddFrom">

            <%-- <input type="text" hidden="true" name="id"/>--%>

            <div class="form-group no-margin-left no-margin-right">
                <label class="col-sm-3 control-label col-xs-12  no-padding">题型:</label>
                <div class=" col-xs-12 col-sm-9">
                    <select id="types" name="qtype" class="col-xs-3">
                        <c:forEach items="${types }" var="type">
                            <option value="${type.id }">${type.name }</option>
                        </c:forEach>
                    </select>
                </div>

            </div>
            <div class="form-group no-margin-left no-margin-right">
                <label class="col-sm-3 control-label col-xs-12  no-padding">标签:</label>

                <div class=" col-xs-12 col-sm-9">
                    <c:forEach items="${tags }" var="tagV">
                        <div class="col-xs-3">
                            <input type="checkbox" value="${tagV.id }">${tagV.tagName }
                        </div>
                    </c:forEach>
                    <input class=" col-xs-3" type="text" name="keyword">
                </div>
            </div>
            <div class="form-group no-margin-left no-margin-right">
                <label class="col-sm-3 control-label col-xs-12  no-padding">问题:</label>

                <div class=" col-xs-12 col-sm-9">
                    <textarea class="form-control" type="text" name="title"></textarea>
                </div>
            </div>
            <input type="hidden" name="keyword">

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
<script type="text/javascript">
    $(function () {
        $("#save-btn").click(function () {

            var $form = $('#ddFrom');
            var fd = new FormData($form.get(0));
            $.ajax({
                url: getContentPath() + "/questionTypeMgr/save.do",
                type: $form.attr('method'),
                processData: false,
                contentType: false,
                dataType: 'json',
                data: fd,
                success: function (data, textStatus, jqXHR) {
                    console.log(data.code)
                    if (data.code == 0) {
                        console.log(data.msg)
                        bootBoxSuccess(data.msg);
                        console.log(data.msg)
                    } else {
                        bootBoxError(data.msg, "error！");
                    }
                }
            });
        })

        $("#back-btn").click(function () {
            switchPage("/questionTypeMgr/init.do")
        })
    })

</script>

