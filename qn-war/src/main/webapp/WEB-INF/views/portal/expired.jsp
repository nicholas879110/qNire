<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>强制下线</title>
</head>
<body>
<script type="text/javascript">
    if (window.jQuery && bootbox) {
        bootBoxError("您的帐号已被强制下线，如果不是您自己的操作，请重新登录并修改您的登录密码！", function() {
            top.location = "${ctx}/portal/login";
        });
    } else {
        alert("您的帐号已被强制下线，如果不是您自己的操作，请重新登录并修改您的登录密码！");
        location = "${ctx}/portal/login";
    }
</script>
</body>
</html>