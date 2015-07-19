<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>登录超时</title>
</head>
<body>
<script type="text/javascript">
    if (window.jQuery && bootbox) {
        bootBoxError("登录超时，请重新登录！", function() {
            top.location = "${ctx}/portal/login";
        });
    } else {
        alert("登录超时，请重新登录！");
        location = "${ctx}/portal/login";
    }
</script>
</body>
</html>