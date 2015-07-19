/**
 * 角色管理
 *
 * @author danjiaxin
 */
$(function () {
    /**
     * 表格ID
     * @type {string}
     */
    var dataTableId = "#data-table";

    /**
     * 验证表单ID
     * @type {string}
     */
    var validFormId = "#validation-form";

    /**
     * 人员名单表格ID
     * @type {string}
     */
    var editUserDataTableId = "#edit-user-data-table";

    /**
     * 表格加载
     * @type {*|jQuery}
     */
    $(dataTableId).dataTable({
        "sAjaxSource": getContentPath() + "/r/pager.do",
        "aoColumns": [
            { "sWidth": "7%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "id", "bSortable": false },
            { "sWidth": "12%", "sTitle": "角色名称", "sClass": "center", "mData": "roleName", "bSortable": false },
//            { "sWidth": "5%", "sTitle": "引用人数", "sClass": "center", "mData": "userCount", "bSortable": false },
            { "sWidth": "12%", "sTitle": "创建者", "sClass": "center", "mData": "createrName", "bSortable": false },
            { "sWidth": "12%", "sTitle": "创建时间", "sClass": "center", "mData": "createTime", "bSortable": false },
            { "sWidth": "12%", "sTitle": "修改者", "sClass": "center", "mData": "operatorName", "bSortable": false },
            { "sWidth": "12%", "sTitle": "修改时间", "sClass": "center", "mData": "operateTime", "bSortable": false },
            { "sWidth": "20%", "sTitle": "备注", "sClass": "center", "mData": "remark", "bSortable": false },
            { "sWidth": "13%", "sTitle": "操作", "sClass": "center", "mData": "id", "bSortable": false }
        ],
        "aLengthMenu": [ 10, 20, 30 ],
        "aaSorting": [],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            /*// 引用人数
            var userCountLink = "<button type='button' class='btn btn-sm btn-link user-count-btn'>" + aData['userCount'] + "</button>";
            $('td:eq(2)', nRow).html(userCountLink);
            // 引用人数点击事件
            $('td:eq(2)', nRow).find(".user-count-btn").click(function () {
                $("#edit-user-title").text(aData['roleName'] + "人员名单");
                $("#edit-user-roleId").val(aData['id']);
                $("#edit-user-userName").val("");
                $("#show-area").addClass("hide");
                $("#edit-user-area").removeClass("hide");
                initEditUserDataTable();
            });*/
            var btnDivHTML = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
            var btnDivHTMLEnd = '</div>';
            var showAuthLink = '<a class="light-blue show-auth-btn" title="查看权限" href="javascript:void(0);"><i class="icon-zoom-in bigger-130"></i></a>';
            var updateLink = '<a class="green edit-btn" title="修改" href="javascript:void(0);"><i class="icon-edit bigger-130"></i></a>';
            var delLink = '<a class="red del-btn" title="删除" href="javascript:void(0);"><i class="icon-trash bigger-130"></i></a>';
            var saveAsLink = '<a class="grey save-as-btn" title="另存为新角色" href="javascript:void(0);"><i class="icon-copy bigger-130"></i></a>';
            var id = aData["id"];
            var inputHtml = "<input type='checkbox' class='ace' name='roleId' value='" + id + "'/><span class=\"lbl\"></span>";
            var btnHTML = "";
            if (aData["roleName"] == '系统管理员') {
                $('td:first', nRow).html('');
                if (validAuthCode('ROLE_ROLE_ADD')) {
                    btnHTML += saveAsLink;
                }
            } else {
                $('td:first', nRow).html(inputHtml);
                if (validAuthCode('ROLE_ROLE_UPDATE')) {
                    btnHTML += updateLink;
                }
                if (validAuthCode('ROLE_ROLE_DELETE')) {
                    btnHTML += delLink;
                }
                if (validAuthCode('ROLE_ROLE_ADD')) {
                    btnHTML += saveAsLink;
                }
            }
            $("td:last", nRow).html(btnDivHTML + showAuthLink + btnHTML + btnDivHTMLEnd);
            // 查看权限
            $('td:last', nRow).find(".show-auth-btn").click(function () {
                switchPage("/r/info", {id : id}, function() {
                    var nodes = treeObj.getNodes();
                    for (var i=0, l=nodes.length; i < l; i++) {
                        treeObj.setChkDisabled(nodes[i], true, false, true);
                    }
                    $("#roleName,#remark").attr("disabled", "disabled");
                    $(".ds").hide();
                });
            });
            // 修改
            $('td:last', nRow).find(".edit-btn").click(function () {
                switchPage("/r/info", {id : id}, function() {
                    $("#roleName").attr("disabled", "disabled");
                });
            });
            // 删除
            $('td:last', nRow).find(".del-btn").click(function () {
                bootBoxConfirm("您确认要删除勾选的角色么？", function (isConfirm) {
                    if (isConfirm) {
                        $.postJSON("/r/delete", {"roleId": aData["id"]}, function() {
                            $("#search-btn").click();
                        });
                    }
                });
            });
            // 另存为新角色
            $('td:last', nRow).find(".save-as-btn").click(function () {
                switchPage("/r/info", {id : id}, function() {
                    $("#area-title").text("另存为新角色");
                    $("#roleId").val("");
                    $("#roleName").val($("#roleName").val()+"_1");
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
     * 人员名单返回按钮点击事件
     */
    $("#edit-user-back-btn").click(function () {
        $(editUserDataTableId).dataTable().fnDestroy();
        switchShowArea();
    });

    /**
     * 添加按钮点击事件
     */
    $("#add-btn").click(function () {
        switchPage("/r/info");
    });

    /**
     * 返回按钮点击事件
     */
    $("#back-btn").click(function () {
        switchPage("/r/index");
    });

    /**
     * 批量删除按钮点击事件
     */
    $("#batch-del-btn").click(function () {
        var chkItems = $("input[name='roleId']:checked");
        if (chkItems.length > 0) {
            bootBoxConfirm("您确认要删除勾选的角色么？", function (isConfirm) {
                if (isConfirm) {
                    $.postJSON("/r/delete", chkItems.serialize(), function() {
                        $("#search-btn").click();
                    });
                }
            });
        } else {
            bootBoxWarning("请至少勾选一个用户！");
        }
    });

    /**
     * 初始化人员名单表格
     */
    function initEditUserDataTable() {
        /**
         * 人员名单表格加载
         * @type {*|jQuery}
         */
        $(editUserDataTableId).dataTable({
            "sAjaxSource": getContentPath() + "/user/pagerUserOfRole.do",
            "aoColumns": [
                { "sWidth": "5%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "id", "bSortable": false },
                { "sWidth": "13%", "sTitle": "用户名", "sClass": "center", "mData": "userName", "bSortable": false },
                { "sWidth": "12%", "sTitle": "用户类型", "sClass": "center", "mData": "userTypeFormat", "bSortable": false },
                { "sWidth": "13%", "sTitle": "姓名", "sClass": "center", "mData": "userTrueName", "bSortable": false },
                { "sWidth": "13%", "sTitle": "创建者", "sClass": "center", "mData": "createrName", "bSortable": false },
                { "sWidth": "13%", "sTitle": "创建时间", "sClass": "center", "mData": "createTime", "bSortable": false },
                { "sWidth": "13%", "sTitle": "修改者", "sClass": "center", "mData": "operatorName", "bSortable": false },
                { "sWidth": "13%", "sTitle": "修改时间", "sClass": "center", "mData": "operateTime", "bSortable": false },
                { "sWidth": "5%", "sTitle": "操作", "sClass": "center", "mData": "id", "bSortable": false }
            ],
            "aLengthMenu": [ 10, 20, 30 ],
            "aaSorting": [],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:not(:first,:last)', nRow).addClass("td_v_middle");

                var createrTip = aData["createrTip"];
                $('td:eq(4)', nRow).attr("title", createrTip);

                var operatorTip = aData["operatorTip"];
                $('td:eq(6)', nRow).attr("title", operatorTip);

                var btnDivHTML = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
                var btnDivHTMLEnd = '</div>';

                var delLink = '<a class="red edit-user-del-btn" title="移除" href="javascript:void(0);"><i class="icon-trash bigger-130"></i></a>';

                var identifier = aData["identifier"];

                var id = aData["id"];
                var inputHtml = "<input type='checkbox' class='ace' name='userId' value='" + id + "'/><span class=\"lbl\"></span>";

                if (identifier == 0) { // 可移除
                    $('td:eq(0)', nRow).html(inputHtml);
                    if (validAuthCode(ROLE_AUTH_ENUM.ROLE_ROLE_UPDATE)) {
                        $('td:eq(8)', nRow).html(btnDivHTML + delLink + btnDivHTMLEnd);
                    } else {
                        $('td:eq(8)', nRow).html("");
                    }
                } else {
                    $('td:eq(0)', nRow).html("");
                    $('td:eq(8)', nRow).html("");
                }

                // 移除
                $('td:eq(8)', nRow).find(".edit-user-del-btn").click(function () {
                    bootBoxConfirm("您确认要移除当前用户么？<br />注：当前操作不会删除用户，只会断开用户与角色的关系", function (isConfirm) {
                        if (isConfirm) {
                            $.ajax({
                                url: getContentPath() + "/role/removeUser.do",
                                type: "post",
                                data: {
                                    "roleId": $("#edit-user-roleId").val(),
                                    "userId": aData['id']
                                },
                                dataType: 'json',
                                success: function (data) {
                                    if (data.code == CODE_ENUM.ERROR) {
                                        bootBoxError(data.msg);
                                    } else {
                                        bootBoxSuccess(data.msg, function () {
                                            $("#edit-user-search-btn").click();
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
            },
            "fnServerParams": function (aoData) {
                setupQueryParameter(aoData, "#edit-user-query-form");
            }
        });
    }

    /**
     * 人员名单查询按钮点击事件
     */
    $("#edit-user-search-btn").click(function () {
        var oSettings = $(editUserDataTableId).dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $(editUserDataTableId).dataTable().fnClearTable();
    });

    /**
     * 人员名单批量移除按钮点击事件
     */
    $("#edit-user-batch-del-btn").click(function () {
        var chkItems = $("input[name='userId']:checked");
        if (chkItems.length <= 0) {
            bootBoxWarning("请至少勾选一个用户！");
            return;
        }

        var data = $(chkItems).serializeArray();
        data.push({
            "name": "roleId",
            "value": $("#edit-user-roleId").val()
        });

        bootBoxConfirm("您确认要移除勾选的用户么？<br />注：当前操作不会删除用户，只会断开用户与角色的关系", function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    url: getContentPath() + "/role/removeUser.do",
                    type: "post",
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == CODE_ENUM.ERROR) {
                            bootBoxError(data.msg);
                        } else {
                            bootBoxSuccess(data.msg, function () {
                                $("#edit-user-search-btn").click();
                            });
                        }
                    }
                });
            }
        });
    });
    Validator.validate(validFormId, {
        rules : {
            name : {
                required: true,
                maxlength: 20,
                remote: {
                    url: getContentPath() + "/r/crn",
                    type: "post",
                    dataType: "json",
                    data: {
                        name: function () {
                            return $.trim($("#roleName").val());
                        }
                    }
                }
            },
            remark : {
                maxlength : 100
            }
        },
        messages : {
            name: {
                required: "角色名称不能为空",
                maxlength: "角色名称长度不能大于20个字符",
                remote: "角色名称已经存在"
            },
            remark : {
                maxlength: "角色备注长度不能大于100个字符"
            }
        },
        submitHandler : function(form) {
            var nodes = treeObj.getCheckedNodes(true);
            var param = $(validFormId).serialize();
            for (var i = 0; i < nodes.length; i++) {
                param += "&authId="+nodes[i].id;
            }
            if ($("#roleId").val()=="") {
                $.postJSON("/r/save", param, function(data) {
                    if (data.code == 0) {
                        switchPage("/r/index");
                    }
                });
            } else {
                $.postJSON("/r/update", param, function(data) {
                    if (data.code == 0) {
                        switchPage("/r/index");
                    }
                });
            }
        }
    });
});
var treeObj, setting = {
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