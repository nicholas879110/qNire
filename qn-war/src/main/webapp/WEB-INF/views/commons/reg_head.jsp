<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/8/5
  Time: 11:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%
    request.getSession().setAttribute("systemName", "通管局继续教育管理系统");
%>
<sec:authentication property="principal" var="loginUser"/>
<script type="text/javascript">
    <%-- 获取请求项目名称 --%>
    var ctx = '<%=request.getContextPath()%>';
</script>
<meta charset="utf-8"/>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<%-- 让IE运行最新的兼容模式 --%>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<%--pragma与no-cache用于定义页面缓存，这里定义不缓存页面，也无法脱机浏览--%>
<meta http-equiv="Cache-Control" content="no-store"/>
<meta http-equiv="Pragma" content="no-cache"/>
<title></title>

<%-- basic styles --%>
<link rel="stylesheet" href="${ctx}/asset-libs/css/bootstrap.min.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/font-awesome.min.css" />

<!--[if IE 7]>
<link rel="stylesheet" href="${ctx}/asset-libs/css/font-awesome-ie7.min.css" />
<![endif]-->

<%-- page specific plugin styles --%>
<link rel="stylesheet" href="${ctx}/asset-libs/css/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/datepicker.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/bootstrap-timepicker.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/daterangepicker.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/bootstrap-datetimepicker.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/select2.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/select2-bootstrap.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/chosen.css"/>
<link rel="stylesheet" href="${ctx}/asset-libs/css/zTree/zTree.css" type="text/css">


<!--exam-training  custom css-->
<link rel="stylesheet" href="${ctx}/assets/css/loading.css"/>
<link rel="stylesheet" href="${ctx}/assets/css/custom-icon.css"/>

<%-- fonts --%>
<link rel="stylesheet" href="${ctx}/asset-libs/css/ace-fonts.css" />
<%--<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />--%>

<%-- ace styles --%>
<link rel="stylesheet" href="${ctx}/asset-libs/css/ace.css" />
<link rel="stylesheet" href="${ctx}/asset-libs/css/ace-skins.min.css" />

<!--[if lte IE 8]>
<link rel="stylesheet" href="${ctx}/asset-libs/css/ace-ie.min.css" />
<![endif]-->

<link rel="stylesheet" href="${ctx}/assets/css/ce.css" />

<%-- ace settings handler --%>
<script src="${ctx}/asset-libs/js/ace-extra.min.js"></script>

<%-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries --%>
<!--[if lt IE 9]>
<script src="${ctx}/asset-libs/js/html5shiv.js"></script>
<script src="${ctx}/asset-libs/js/respond.min.js"></script>
<![endif]-->