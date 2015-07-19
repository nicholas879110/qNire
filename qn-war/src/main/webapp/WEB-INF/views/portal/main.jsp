<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../commons/tag.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <%@ include file="../commons/head.jsp" %>
</head>
<body>
<%@ include file="../commons/top.jsp"%>
<div class="main-container container" id="main-container">
    <script type="text/javascript">
        try{ace.settings.check('main-container' , 'fixed')}catch(e){}
    </script>

    <div class="main-container-inner" id="main-container-inner">
        <%@ include file="../commons/left.jsp" %>
        <div class="main-content">
            <div id="page-content" class="page-content">

            </div>
            <!-- /.page-content -->
        </div>
        <!-- /.main-content -->
    </div><!-- /.main-container-inner -->
</div><!-- /.main-container -->
<%@ include file="../commons/bottom.jsp" %>
<!-- inline scripts related to this page -->
<script type="text/javascript">
    jQuery(function($) {
        //加载主页
        <%--$("#page-content").load("${ctx}/portal/home");--%>
    });
</script>
</body>
</html>