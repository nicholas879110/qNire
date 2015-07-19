<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-10-14
  Time: 下午6:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../commons/tag.jsp"%>

<div class="row">
    <div class="col-xs-12">
        <h3 class="header bolder">
            <span>报名列表</span>
        </h3>
        <%-- 查询条件form --%>
        <form class="form-horizontal" id="query-form">
            <div class="form-group">
                <label class="col-sm-1 control-label no-padding-right">姓名：</label>
                <div class="col-sm-2">
                    <input type="text" class="col-xs-12" name="name">
                </div>
                <label class="col-sm-1 control-label no-padding-right">报名时间：</label>
                <div class=" clearfix input-group col-xs-12 col-sm-3 ">
                    <span class="input-group-addon"> <i
                            class="icon-calendar bigger-110"></i>
                    </span> <input class="form-control daterangepicker_input"  type="text" name="applyTime"
                                   id="signip-date" />
                </div>
                <label class="col-sm-1 control-label no-padding-right">电话：</label>
                <div class="col-sm-2">
                    <input type="text" class="col-xs-12" name="tel">
                </div>
            </div>
        </form>
    </div>

    <div class="col-xs-12">
        <input class="btn btn-sm btn-success " id="search-btn" type="button" value="查询"/>
        <input class="btn btn-sm btn-info " id="batch-ep-btn-0" type="button" value="职称系列导出"/>
        <input class="btn btn-sm btn-info " id="batch-ep-btn-1" type="button" value="证书系列导出"/>
    </div>

    <div class="col-xs-12 hr hr-dotted"></div>
    <div class="col-xs-12 table-responsive">
        <table id="signup-table" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>

<script type="text/javascript" src="${ctx}/assets/js/signup/signup.js"></script>
