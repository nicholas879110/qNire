<%@ page language="java"  contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>登录窗口</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/login.css" type="text/css" media="screen" />
<style type="text/css">
	.errorhide{display:none;}
	.error{color:red;padding: 5px 20px 0px 20px;}
</style>
<script type="text/javascript">
	function keyDown(event) {
		if (event.keyCode == 13) {
			event.returnValue = false;
			event.cancel = true;
			Form.loginBtn.click();
		}
	}
</script>
</head>
<body id="splash" onkeydown="keyDown(event)">
	
	<div id="" class="login ">
         <div class="model-logo"></div>
		<div class="modal-header">

			<h3>登录</h3>
		</div>
		<div class="error${param.error==true?'':'hide'} ">
			登陆失败:
				${sessionScope['SPRING_SECURITY_LAST_EXCEPTION'].message=="Bad credentials"?"用户名或密码错误！":""} 
		</div>
		<form name="Form" method="post" action="${pageContext.request.contextPath}/j_spring_security_check">
			<div class="modal-body clearfix">
				<fieldset>
					<div class="control-group form-field clearfix">
						<label for="j_username">用户名</label> <span class="help-block"></span>
						<div class="input">
							<input type="text" id="j_username" name="j_username" value="admin" />
						</div>
					</div>

					<div class="control-group form-field clearfix">
						<label for="j_password">密码</label> <span class="help-block"></span>
						<div class="input">
							<input type="password" id="j_password" name="j_password" value="123456" />
						</div>
					</div>
					
				</fieldset>

			</div>
			<div class="modal-footer">
				<button type="submit" name="loginBtn" class="btn btn-primary pull-right">登入</button>
			</div>

		</form>
	</div>
	
	<div id="footer"></div>
</body>

</html>
