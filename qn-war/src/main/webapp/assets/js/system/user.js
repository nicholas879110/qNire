/**
 * 用户管理
 *
 * @author danjiaxin
 */
$(function () {
    /**
     * 表格ID
     * @type {string}
     */
    var dataTableId = "#user-table";
    /**
     * 验证表单ID
     * @type {string}
     */
    var validFormId = "#validation-form";
    /**
     * 表格加载
     */
    $(dataTableId).dataTable({
        "sAjaxSource": getContentPath() + "/u/pager.do",
        "aoColumns": [
            { "sWidth": "3%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "id", "bSortable": false },
            { "sWidth": "15%", "sTitle": "用户名", "sClass": "center", "mData": "username", "bSortable": false },
            { "sWidth": "12%", "sTitle": "注册时间", "sClass": "center", "mData": "registerTime", "bSortable": false },
            { "sWidth": "15%", "sTitle": "修改用户", "sClass": "center", "mData": "updateUser", "bSortable": false },
            { "sWidth": "12%", "sTitle": "修改时间", "sClass": "center", "mData": "updateTime", "bSortable": false },
            { "sWidth": "18%", "sTitle": "邮箱地址", "sClass": "center", "mData": "email", "bSortable": false },
            { "sWidth": "12%", "sTitle": "用户状态", "sClass": "center", "mData": "status", "bSortable": false },
            { "sWidth": "13%", "sTitle": "操作", "sClass": "center", "mData": "id", "bSortable": false  }
        ],
        "aaSorting": [],
        "aLengthMenu": [ 10, 20, 30 ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var btnDivHTML = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
            var btnDivHTMLEnd = '</div>';
            var showAuthLink = '<a class="light-blue show-auth-btn" title="查看权限" href="javascript:void(0);"><i class="icon-zoom-in bigger-130"></i></a>';
            var updateLink = '<a class="green edit-btn" title="修改" href="javascript:void(0);"><i class="icon-edit bigger-130"></i></a>';
            var delLink = '<a class="red del-btn" title="删除" href="javascript:void(0);"><i class="icon-trash bigger-130"></i></a>';
            var resetPwdLink = '<a class="blue reset-pwd-btn" title="重置密码" href="javascript:void(0);"><i class="icon-refresh bigger-130"></i></a>';
            var id = aData["id"];
            var inputHtml = "<input type='checkbox' class='ace' name='userId' value='" + id + "'/><span class=\"lbl\"></span>";
            var btnHTML = "";
            if (aData["username"] == 'admin') {
                $('td:first', nRow).html('');
                if (validAuthCode('ROLE_USER_RESET_PWD')) {
                    btnHTML += resetPwdLink;
                }
            } else {
                $('td:first', nRow).html(inputHtml);
                if (validAuthCode('ROLE_USER_UPDATE')) {
                    btnHTML += updateLink;
                }
                if (validAuthCode('ROLE_USER_DELETE')) {
                    btnHTML += delLink;
                }
                if (validAuthCode('ROLE_USER_RESET_PWD')) {
                    btnHTML += resetPwdLink;
                }
            }
            $("td:last", nRow).html(btnDivHTML + showAuthLink + btnHTML + btnDivHTMLEnd);
            // 查看权限
            $('td:last', nRow).find(".show-auth-btn").click(function () {
                switchPage("/u/info", {id : id}, function() {
                    $("#username,#email,#accountStatus").attr("disabled", "disabled");
                    $(".ss").hide();
                    var nodes = treeObj.getNodes();
                    for (var i=0, l=nodes.length; i < l; i++) {
                        treeObj.setChkDisabled(nodes[i], true, false, true);
                    }
                });
            });
            // 修改
            $('td:last', nRow).find(".edit-btn").click(function () {
                switchPage("/u/info", {id : id}, function() {
                    $("#username,#email").attr("disabled", "disabled");
                });
            });
            // 删除
            $('td:last', nRow).find(".del-btn").click(function () {
                bootBoxConfirm("您确认要删除当前用户么？", function (isConfirm) {
                    if (isConfirm) {
                        $.postJSON("/u/delete", {"userId": aData["id"]}, function() {
                            $("#search-btn").click();
                        });
                    }
                });
            });
            // 重置密码
            $('td:last', nRow).find(".reset-pwd-btn").click(function () {
                bootBoxConfirm("您确认要重置当前用户的密码么？", function (isConfirm) {
                    if (isConfirm) {
                        $.postJSON("/u/resetPwd", {id : id}, function() {});
                    }
                });
            });
        },
        "fnServerParams": function (aoData) {
            setupQueryParameter(aoData, "#query-form");
        }
    });
    /**
     * 查询按钮点击事件
     */
    $("#search-btn").click(function () {
        var oSettings = $(dataTableId).dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $(dataTableId).dataTable().fnClearTable();
    });
    /**
     * 保存按钮点击事件
     */
    $("#submit-btn").click(function () {
        $(validFormId).submit();
    });
    /**
     * 批量删除按钮点击事件
     */
    $("#batch-del-btn").click(function () {
        var chkItems = $("input[name='userId']:checked");
        if (chkItems.length > 0) {
            bootBoxConfirm("您确认要删除勾选的用户么？", function (isConfirm) {
                if (isConfirm) {
                    $.postJSON("/u/delete", chkItems.serialize(), function() {
                        $("#search-btn").click();
                    });
                }
            });
        } else {
            bootBoxWarning("请至少勾选一个用户！");
        }
    });
    /**
     * 添加按钮点击事件
     */
    $("#add-btn").click(function () {
        switchPage("/u/info", function() {
            $(".ds").hide();
        });
    });
    /**
     * 返回按钮点击事件
     */
    $("#back-btn").click(function () {
        switchPage("/u/index");
    });
    Validator.validate(validFormId, {
        rules : {
            username : {
                required: true,
                maxlength: 16,
                username: true,
                remote: {
                    url: getContentPath() + "/u/crn",
                    type: "post",
                    dataType: "json",
                    data: {
                        name: function () {
                            return $.trim($("#username").val());
                        }
                    }
                }
            },
            email : {
                email : true
            }
        },
        messages : {
            username: {
                required: "用户名不能为空",
                maxlength: "用户名长度不能大于16个字符",
                username: "用户名必须为字母、数字、下划线的组合，且第一个字符必须为字母",
                remote: "用户名已经存在"
            },
            email : {
                email: "请输入正确的邮箱"
            }
        },
        submitHandler : function(form) {
            var nodes = treeObj.getCheckedNodes(true);
            var param = $(validFormId).serialize();
            for (var i = 0; i < nodes.length; i++) {
                param += "&roleId="+nodes[i].id;
            }
            if ($("#userId").val()=="") {
                $.postJSON("/u/save", param, function(data) {
                    if (data.code == 0) {
                        switchPage("/u/index");
                    }
                });
            } else {
                $.postJSON("/u/update", param, function(data) {
                    if (data.code == 0) {
                        switchPage("/u/index");
                    }
                });
            }
        }
    });
});
var treeObj, authTree, setting = {
    view: {
        showIcon: false,
        showLine: false
    },
    check: {
        enable: true,
        chkboxType: { "Y": "p", "N": "ps" }
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};
function roleOnClick(event, treeId, treeNode) {
    var nodes = authTree.getNodes();
    for (var i=0, l=nodes.length; i < l; i++) {
        authTree.setChkDisabled(nodes[i], false, false, true);
    }
    nodes = treeObj.getCheckedNodes(true);
    if (nodes.length == 0) {
        authTree.checkAllNodes(false);
        nodes = authTree.getNodes();
        for (var i=0, l=nodes.length; i < l; i++) {
            authTree.setChkDisabled(nodes[i], true, false, true);
        }
    } else {
        var param = "";
        for (var i = 0; i < nodes.length; i++) {
            param += "&roleId="+nodes[i].id;
        }
        $.post(getContentPath() + "/u/getAuthByRoleId", param.substring(1), function(data) {
            authTree.checkAllNodes(false);
            if (data.code == 0) {
                data = data.result;
                for (var i = 0 ; i < data.length; i++) {
                    authTree.checkNode(authTree.getNodeByParam("id", data[i], null), true, true, false);
                }
            }
            var nodes = authTree.getNodes();
            for (var i=0, l=nodes.length; i < l; i++) {
                authTree.setChkDisabled(nodes[i], true, false, true);
            }
        }, "json");
    }
}