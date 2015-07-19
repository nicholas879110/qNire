<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<div class="row">
    <div class="page-header">
        <h1>
            类型新增
        </h1>
    </div>

    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <form action="/questionTypeMgr/save.action" class="form-horizontal form-border" method="post" id="ddFrom">


           <%-- <input type="text" hidden="true" name="id"/>--%>

            <div class="form-group no-margin-left no-margin-right">
                <label class="col-sm-3 control-label col-xs-12  no-padding">类型:</label>

                <div class=" col-xs-12 col-sm-9">
                    <input class="form-control" type="text" name="name">
                </div>
            </div>

            <div class="form-group no-margin-left no-margin-right">
                <label class="col-sm-3 control-label col-xs-12  no-padding">类型代码:</label>

                <div class=" col-xs-12 col-sm-9">
                    <input class="form-control" type="text" name="code">
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
            var $form = $('#ddFrom');
            var fd = new FormData($form.get(0));
            $.ajax({
                url: getContentPath()+"/questionTypeMgr/save.do",
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

        $("#back-btn").click(function(){
            switchPage("/questionTypeMgr/init.do")
        })
    })

</script>

