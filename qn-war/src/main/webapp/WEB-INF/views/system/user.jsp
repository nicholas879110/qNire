<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="row">
    <div class="col-xs-12">
        <%-- 查询条件form --%>
        <form class="form-inline" id="query-form">
            <div class="form-group margin-right-20">
                <div class="clearfix">
                    <label class="control-label">用户名：</label>
                    <input type="text" class="input-medium" name="username">
                </div>
            </div>

            <%--<div class="form-group margin-right-20">
                <div class="clearfix">
                    <label class="control-label">用户类型：</label>
                    <select class="input-medium custom-height" name="userType">
                        <option value="" style="padding: 3px 4px;">全部</option>
                        <option value="2">学员</option>
                        <option value="1">教职员</option>
                        <option value="3">管理员</option>
                        <option value="4">局方</option>
                        <option value="0">其他</option>
                    </select>
                </div>
            </div>

            <div class="form-group margin-right-20">
                <div class="clearfix">
                    <label class="control-label">姓名：</label>
                    <input type="text" class="input-medium" name="userTrueName">
                </div>
            </div>--%>
        </form>
    </div>

    <div class="col-xs-12" style="margin-top: 10px;">
        <sec:authorize ifAnyGranted="ROLE_USER_ADD">
            <input class="btn btn-sm btn-primary pull-left custom-btn" id="add-btn" type="button" value="添加"/>
        </sec:authorize>
        <sec:authorize ifAnyGranted="ROLE_USER_DELETE">
            <input class="btn btn-sm btn-danger pull-left" id="batch-del-btn" type="button" value="批量删除"/>
        </sec:authorize>
        <input class="btn btn-sm btn-success pull-right" id="search-btn" type="button" value="查询"/>
    </div>

    <div class="col-xs-12 hr hr-dotted"></div>

    <div class="col-xs-12 table-responsive">
        <table id="user-table" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>
<script type="text/javascript" src="${ctx}/assets/js/system/user.js"></script>
