<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>访问拒绝</title>
</head>
<body>
<script type="text/javascript">
    if (window.jQuery && bootbox) {
        bootBoxError("你无权限访问当前请求！", function() {
            top.location = "${ctx}/portal/login";
        });
    } else {
        alert("你无权限访问当前请求！");
        location = "${ctx}/portal/login";
    }
</script>
</body>
</html>