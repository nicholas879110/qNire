<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<div class="row">
    <div class="page-header">
        <h1>
            问卷内容编辑
        </h1>
    </div>

    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <form action="/qn/save.action" class="form-horizontal form-border" method="post" id="qnAddFrom">

           <table class="table table-striped table-bordered table-hover center">
               <tr>
                   <td colspan="2" align="center" style="font-size: 14px;">${niare.name}</td>
               </tr>
               <tr>
                   <td align="left" >${niare.desp}</td>
               </tr>
               <tr>
                   <td height="10" align="left" >
                        <span> <input type="button" name="sbmQues" onclick="newQues('${niare.id}');" value=" 新建题目 "/> </span>
                   </td>
               </tr>
               <tr>
                   <td colspan="5">
                       <form method="post" action="" name="myForm">
                           <table class="table2 table table-striped table-bordered table-hover center">
                               <c:forEach var="ques" items="${niare.questions}">
                                   <tr>
                                       <td bgcolor="#CDE2FD" colspan=4 align="left">
                                       <span>${ques.sn}.</span>${ques.title}
                                       </td>
                                   </tr>
                                   <tr>
                                        <td>
                                            <table class="table2 table table-striped table-bordered table-hover center">
                                                <c:forEach items="${ques.options}" var="opt">
                                                    <tr>

                                                        <td align="left">
                                                            <label>
                                                                <input type="radio" class="ace"/>
                                                            <span style="width:0px;" class="lbl">
                                                                </span>
                                                                    ${opt.answer}
                                                            </label>
                                                        </td>
                                                    </tr>
                                                </c:forEach>
                                                <tr>
                                                    <td align="left">
                                                        <a href="">增加</a>
                                                        <a href=">">插入</a>
                                                        <a onclick="" href="#">删除</a>
                                                        <a href="">从库中选择</a>
                                                        <a href=">">从问卷中选择</a>
                                                        <a href="">从剪贴板粘贴</a>

                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                   </tr>
                                   <tr>
                                       <td align="left">
                                           <a href="">插入题目</a>
                                           <a href=">">编辑题目</a>
                                           <a onclick="" href="#">删除题目</a>
                                       </td>
                                   </tr>
                               </c:forEach>

                           </table>
                       </form>
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
            var fd = new FormData($form.get(0));
            $.ajax({
                url: "${ctx}/qn/save.do",
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


    function newQues(id){
        switchPage("/qn/addQuestionInit.do",{
            id:id
        })
    }

</script>

