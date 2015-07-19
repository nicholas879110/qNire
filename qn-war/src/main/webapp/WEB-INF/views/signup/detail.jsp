<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-10-17
  Time: 下午2:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="row ">
<div class="col-xs-12">
<!-- PAGE CONTENT BEGINS -->
<div class="tab-content">

    <div class="header">
        <strong>报名详细信息表</strong>
        <div class="pull-right">
            <a class="btn btn-info btn-sm" href="#" id="back">返回</a>
        </div>
    </div>

    <table class="table table-bordered table-hover">
        <tr>
            <td colspan="6"><h5 class="no-margin blue">基本信息:</h5></td>
        </tr>
        <tr>
            <td align="right" width="14%">姓名:</td>
            <td width="20%">${detail.name}</td>
            <td align="right" width="14%">性别:</td>
            <td width="20%">${detail.sex}</td>
            <td align="right" width="14%">民族:</td>
            <td>${detail.nation}</td>
        </tr>
        <tr>
            <td align="right">出生日期:</td>
            <td>${detail.birthDate}</td>
            <td align="right">政治面貌:</td>
            <td>${detail.policitalStatus}</td>
            <td align="right">文化程度:</td>
            <td><span id="education">${detail.education}</span></td>
        </tr>
        <tr>
            <td align="right">证件类型:</td>

            <td><span id="cardType">${detail.cardType}</span></td>
            <td align="right">职业:</td>
            <td>${detail.profession}</td>
            <td align="right">工种:</td>
            <td>${detail.job}</td>
        </tr>
        <tr>
            <td align="right">证件号码:</td>
            <td colspan="3">${detail.cardNum}</td>
            <td align="right">电话:</td>
            <td>${detail.tel}</td>
        </tr>
        <tr>
            <td align="right">地址:</td>
            <td colspan="3">${detail.address}</td>
            <td align="right">邮编:</td>
            <td>${detail.comPostcode}</td>
        </tr>
        <tr>
            <td colspan="6"><h5 class="no-margin blue">报考信息:</h5></td>
        </tr>
        <tr>
            <td align="right">原职业:</td>
            <td>${detail.oldJob}</td>
            <td align="right">原工种:</td>
            <td>${detail.oldJob}</td>
            <td align="right">原技术等级:</td>
            <td>${detail.oldLevel}</td>
        </tr>
        <tr>
            <td align="right">原证书编号:</td>
            <td colspan="3">${detail.oldCertofocateNum}</td>
            <td align="right">考生来源:</td>
            <td>${detail.stuSourceType}</td>
        </tr>
        <tr>
        </tr>
        <tr>
            <td align="right">申报条件:</td>
            <td colspan="3">${detail.applyLevel}</td>
            <td align="right">申报级别:</td>
            <td colspan="5">${detail.applyLevel}</td>
        </tr>
        <tr>
            <td colspan="6"><h5 class="no-margin blue">工作经历:</h5></td>
        </tr>
        <tr>
            <td colspan="6">${detail.workExperience}</td>
        </tr>
        <%--<tr>
            <td colspan="6">2</td>
        </tr>
        <tr>
            <td colspan="6">3</td>
        </tr>--%>
    </table>

</div>
<!-- PAGE CONTENT ENDS -->
</div>
<!-- /.col -->
</div>
<!-- /.row -->

<!-- page specific plugin scripts -->


<!-- inline scripts related to this page -->
<script type="text/javascript">
    jQuery(function ($) {

		$("#back").click(function(){
            switchPage("/signup/init")
        });
        $("#education").html(Constant.EducationLevel.decideEducationLevelTypeName($("#education").html()));
        $("#cardType").html(Constant.CertificateType.decideCertificateTypeName($("#cardType").html()));
    })
</script>



