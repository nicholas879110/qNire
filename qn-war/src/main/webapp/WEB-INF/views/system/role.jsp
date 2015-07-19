<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="row">
    <%-- 查询条件form --%>
    <div class="col-xs-12">
        <form class="form-inline" id="query-form">
            <div class="form-group margin-right-20">
                <div class="clearfix">
                    <label class="control-label">角色名称：</label>
                    <input type="text" class="input-medium" name="roleName" />
                </div>
            </div>
        </form>
    </div>

    <div class="col-xs-12" style="margin-top: 10px;">
        <sec:authorize ifAnyGranted="ROLE_ROLE_ADD">
            <input class="btn btn-sm btn-primary pull-left custom-btn" id="add-btn" type="button" value="添加"/>
        </sec:authorize>
        <sec:authorize ifAnyGranted="ROLE_ROLE_DELETE">
            <input class="btn btn-sm btn-danger pull-left" id="batch-del-btn" type="button" value="批量删除"/>
        </sec:authorize>
        <input class="btn btn-sm btn-success pull-right" id="search-btn" type="button" value="查询"/>
    </div>

    <div class="col-xs-12 hr hr-dotted"></div>

    <div class="col-xs-12 table-responsive">
        <table id="data-table" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>

<div class="row hide" id="edit-user-area">
    <div class="col-xs-12">
        <h4 class="pull-left" id="edit-user-title">人员名单</h4>
        <button type="button" class="btn btn-sm btn-primary pull-right" id="edit-user-back-btn">返回</button>
    </div>
    <div class="col-xs-12 hr hr-dotted"></div>
    <div class="col-xs-12">
        <form class="form-horizontal" id="edit-user-query-form">
            <div class="form-group">
                <label class="col-xs-12 col-sm-1 control-label no-padding-right">姓名：</label>
                <div class="col-xs-12 col-sm-2">
                    <input type="hidden" name="roleId" id="edit-user-roleId" />
                    <input type="text" class="col-xs-12" name="userName" id="edit-user-userName" />
                </div>
            </div>
        </form>
    </div>
    <div class="col-xs-12">
        <input class="btn btn-sm btn-danger pull-left" id="edit-user-batch-del-btn" type="button" value="批量移除"/>
        <input class="btn btn-sm btn-success pull-right" id="edit-user-search-btn" type="button" value="查询"/>
    </div>
    <div class="col-xs-12 hr hr-dotted"></div>
    <div class="col-xs-12 table-responsive">
        <table id="edit-user-data-table" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>
<script type="text/javascript" src="${ctx}/assets/js/system/role.js"></script>
