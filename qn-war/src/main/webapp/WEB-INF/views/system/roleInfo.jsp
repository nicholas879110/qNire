<%--
  Created by IntelliJ IDEA.
  User: danjiaxin
  Date: 2014/8/7
  Time: 14:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="../commons/tag.jsp" %>
<div class="row">
    <div class="col-xs-8 col-xs-offset-2">
        <div class="col-xs-12">
            <h4 class="pull-left" id="area-title">角色信息</h4>
            <button type="button" class="btn btn-sm btn-primary pull-right" id="back-btn">返回</button>
        </div>
        <div class="col-xs-12 hr hr-dotted"></div>
        <div class="col-xs-12">
            <form class="form-horizontal" id="validation-form">
                <input type="hidden" id="roleId" name="id" value="${role.id}"/>
                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="roleName">角色名称：</label>
                    <div class="col-sm-9">
                        <div class="clearfix">
                            <input type="text" id="roleName" name="name" class="col-xs-12 col-sm-8" value="${role.name}"/>
                        </div>
                    </div>
                </div>

                <div class="space-2"></div>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="remark">备注：</label>
                    <div class="col-sm-9">
                        <div class="clearfix">
                            <textarea class="col-sm-8" name="remark" id="remark">${role.remark}</textarea>
                        </div>
                    </div>
                </div>

                <div class="space-2"></div>

                <div class="form-group">
                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="treeDemo">权限：</label>
                    <div class="col-sm-9">
                        <div class="clearfix col-sm-8" style="padding: 0;">
                            <ul id="treeDemo" name="treeDemo" class="ztree"></ul>
                        </div>
                    </div>
                </div>

                <div class="space-2"></div>

                <div class="hr hr-dotted ds"></div>

                <div class="form-group ds">
                    <div class="col-xs-12 col-sm-4 col-sm-offset-3">
                        <input type="button" id="submit-btn" class="btn btn-sm btn-success" value="保存" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript" src="${ctx}/assets/js/system/role.js"></script>
<script type="text/javascript">
    var zNodes = ${auth};
    $(document).ready(function(){
        treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    });
</script>
