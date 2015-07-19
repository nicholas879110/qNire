<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../commons/tag.jsp" %>
<div class="row">
    <div class="col-xs-8 col-xs-offset-2">
        <div class="col-xs-12">
            <h4 class="pull-left" id="area-title">添加用户</h4>
            <button type="button" class="btn btn-sm btn-primary pull-right" id="back-btn">返回</button>
        </div>
        <div class="col-xs-12 hr hr-dotted"></div>
        <div class="col-xs-12">
            <form class="form-horizontal" id="validation-form">
                <input type="hidden" id="userId" name="id" value="${account.id}"/>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="username">用户名称：</label>
                    <div class="col-sm-9">
                        <div class="clearfix">
                            <input type="text" id="username" name="username" class="col-xs-12 col-sm-8" value="${account.username}"/>
                        </div>
                    </div>
                </div>

                <div class="space-2"></div>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="email">邮箱地址：</label>
                    <div class="col-sm-9">
                        <div class="clearfix">
                            <input type="text" id="email" name="email" class="col-xs-12 col-sm-8" value="${account.email}"/>
                        </div>
                    </div>
                </div>

                <div class="space-2 ds"></div>

                <div class="form-group ds">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="accountStatus">用户状态:</label>
                    <div class="col-sm-9">
                        <div class="clearfix">
                            <select id="accountStatus" name="status" class="custom-form-control col-xs-12 col-sm-8" style="color: #141A1B">
                                <c:forEach items="${accountStatus}" var="as" end="1">
                                    <option value="${as.code}" <c:if test="${as.code==account.status}">selected="selected"</c:if>>${as.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="space-2"></div>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="userRole">用户角色：</label>
                    <div class="col-sm-9">
                        <div class="clearfix col-sm-8" style="padding: 0;">
                            <ul id="userRole" class="ztree"></ul>
                        </div>
                    </div>
                </div>

                <div class="space-2"></div>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="treeDemo">角色权限：</label>
                    <div class="col-sm-9">
                        <div class="clearfix col-sm-8" style="padding: 0;">
                            <ul id="treeDemo" class="ztree"></ul>
                        </div>
                    </div>
                </div>

                <div class="space-2"></div>

                <div class="hr hr-dotted ss"></div>

                <div class="form-group ss">
                    <div class="col-xs-12 col-sm-4 col-sm-offset-3">
                        <input type="button" id="submit-btn" class="btn btn-sm btn-success" value="保存" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript" src="${ctx}/assets/js/system/user.js"></script>
<script type="text/javascript">
    var zNodes = ${roles}, authNodes = ${auth};
    $(document).ready(function(){
        authTree = $.fn.zTree.init($("#treeDemo"), setting, authNodes);
        setting.callback = {onCheck: roleOnClick};
        treeObj = $.fn.zTree.init($("#userRole"), setting, zNodes);
        roleOnClick();
    });
</script>

