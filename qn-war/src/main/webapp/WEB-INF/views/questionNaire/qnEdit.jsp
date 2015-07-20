<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<div class="row">
    <div class="page-header">
        <h1>
            问卷编辑
        </h1>
    </div>

    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <form action="/qn/save.action" class="form-horizontal form-border" method="post" id="qnAddFrom">


            <input type="text" hidden="true" name="id" value="${niare.id}"/>

            <div class="form-group no-margin-left no-margin-right">
                <label class="col-sm-3 control-label col-xs-12  no-padding">标题:</label>

                <div class=" col-xs-12 col-sm-9">
                    <input class="form-control" type="text" name="name" value="${niare.name}">
                </div>
            </div>

            <div class="form-group no-margin-left no-margin-right">
                <label class="col-sm-3 control-label col-xs-12  no-padding">描述:</label>

                <div class=" col-xs-12 col-sm-9">
                    <textarea class="form-control" type="text" name="desp">${niare.desp}</textarea>
                </div>
            </div>

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
    $(function(){
        $("#save-btn").click(function(){
            var $form = $('#qnAddFrom');
            var fd = new FormData($form.get(0));
            $.ajax({
                url: "${ctx}/qn/update.do",
                type: $form.attr('method'),
                processData: false,
                contentType: false,
                dataType: 'json',
                data: fd,
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
            switchPage("/qn/init.do")
        })
    })

</script>

