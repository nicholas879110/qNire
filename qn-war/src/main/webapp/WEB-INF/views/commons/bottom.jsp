<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/8/5
  Time: 11:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%--<div class="footer">
    <div class="container center">
        &copy; 版权信息
    </div>
</div>--%>
<script type="text/javascript">
    <%-- 获取请求项目名称 --%>
    var ctx = '<%=request.getContextPath()%>';
</script>
<%-- basic scripts --%>
<!--[if !IE]> -->
<script src="${ctx}/asset-libs/js/jquery-2.1.0.min.js"></script>
<!-- <![endif]-->

<!--[if IE]>
<script src="${ctx}/asset-libs/js/jquery-1.11.0.min.js"></script>
<![endif]-->

<!--[if !IE]> -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='${ctx}/asset-libs/js/jquery-2.1.0.min.js'>" + "</" + "script>");
</script>
<!-- <![endif]-->

<!--[if IE]>
<script type="text/javascript">
window.jQuery || document.write("<script src='${ctx}/asset-libs/js/jquery-1.11.0.min.js'>"+"</"+"script>");
</script>
<![endif]-->

<script type="text/javascript">
    if ("ontouchend" in document) document.write("<script src='${ctx}/asset-libs/js/jquery.mobile.custom.min.js'>" + "</" + "script>");
</script>

<script type="text/javascript" src="${ctx}/asset-libs/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/typeahead-bs2.min.js"></script>

<!--[if lte IE 8]>
<script type="text/javascript" src="${ctx}/asset-libs/js/excanvas.min.js"></script>
<![endif]-->

<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.nestable.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery-ui-1.10.3.full.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.hotkeys.min.js"></script>

<%-- form elements scripts --%>
<script type="text/javascript" src="${ctx}/asset-libs/js/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/fuelux/fuelux.spinner.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/date-time/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/date-time/locales/bootstrap-datepicker.zh-CN.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/date-time/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/date-time/moment.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/date-time/locales/moment-zh-cn.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/date-time/daterangepicker.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/bootstrap-colorpicker.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.knob.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.autosize.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.inputlimiter.1.3.1.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.maskedinput.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.form.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/bootstrap-tag.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/uncompressed/bootbox.js"></script>

<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/select2.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/select2_locale_zh-CN.js"></script>

<%-- page specific plugin scripts --%>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.dataTables.bootstrap.js"></script>

<!-- Ztree-->
<script type="text/javascript" src="${ctx}/asset-libs/js/zTree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/zTree/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/zTree/jquery.ztree.exedit-3.5.min.js"></script>

<%-- ace scripts --%>
<%--<script src="${ctx}/asset-libs/js/ace-elements.min.js"></script>--%>
<script type="text/javascript" src="${ctx}/asset-libs/js/uncompressed/ace-elements.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/ace.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/bootstrap-wysiwyg.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.colorbox-min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/ace-extra.min.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/js/jquery.wksc-util.js"></script>

<script type="text/javascript" src="${ctx}/asset-libs/js/json2.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/commons/dialog.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/commons/system.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/commons/validator.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/commons/loading.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/commons/constant.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/portal/main.js"></script>
<script type="text/javascript" src="${ctx}/asset-libs/uploadify/jquery.uploadify.js"></script>