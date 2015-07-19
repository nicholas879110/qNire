<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<div class="row">
    <div class="page-header">
        <h1>
            新建问题
        </h1>
    </div>

    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <form action="/qn/save.action" class="form-horizontal form-border" method="post" id="qnAddFrom">

            <input type="hidden" name="niareId" value="${niareId}">

            <table class="table table-striped table-bordered table-hover center">
                <tr width="30%">
                    <td>
                        题型
                    </td>
                    <td>
                        <select class="form-control"  name="qtype">
                            <option value="0">单选题</option>
                            <option value="1">单选题</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>
                        顺序
                    </td>
                    <td>
                        <input class="form-control" type="text" name="sOrder">
                    </td>
                </tr>

                <tr>
                    <td>
                        编号
                    </td>
                    <td>
                        <input class="form-control" type="text" name="sn">
                    </td>
                </tr>

                <tr>
                    <td>
                        标题
                    </td>
                    <td>
                        <input class="form-control" type="text" name="title">
                    </td>
                </tr>

                <tr>
                    <td>
                        提示
                    </td>
                    <td>
                        <input class="form-control" type="text" name="ins">
                    </td>
                </tr>

                <tr>
                    <td>
                        选项
                    </td>
                    <td>
                        <input class="form-control" type="text" name="options[0].answer" value="选项1">
                        <input class="form-control" type="text" name="options[1].answer" value="选项2">
                        <div class=" col-xs-12 col-sm-9">
                            <a href="">插入题目</a>
                            <a href=">">编辑题目</a>
                            <a onclick="" href="#">删除题目</a>
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
<script type="text/javascript">
    $(function(){
        $("#save-btn").click(function(){
            var $form = $('#qnAddFrom');
            //var fd = new FormData($form.get(0));
            $.ajax({
                url: "${ctx}/qn/saveQuestion.do",
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

</script>

