/**
 * 实名认证.
 * Created by Dendy on 2014/8/5.
 */
var dataTableId = "#res-table";
$(function () {
    /**
     * 表格加载
     */
    $(dataTableId).dataTable({
        "sAjaxSource": getContentPath() + "/res/page",
        "aoColumns": [
            { "sWidth": "3%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "id", "bSortable": false },
            { "sWidth": "13%", "sTitle": "名称", "sClass": "left", "mData": "name", "bSortable": false },
            { "sWidth": "5%", "sTitle": "类型", "sClass": "center", "mData": "saveFileTypeName", "bSortable": false },
            { "sWidth": "8%", "sTitle": "状态", "sClass": "center", "mData": "auditResultName", "bSortable": true, "asSorting": [ 'asc', 'desc' ], "sName": "auditResult" },
            { "sWidth": "7%", "sTitle": "上传人", "sClass": "center", "mData": "uploadUserName", "bSortable": false },
            { "sWidth": "15%", "sTitle": "上传时间", "sClass": "right", "mData": "uploadTime", "bSortable": true, "asSorting": [ 'asc', 'desc' ], "sName": "uploadTime" },
            { "sWidth": "7%", "sTitle": "审核人", "sClass": "center", "mData": "auditUserName", "bSortable": false },
            { "sWidth": "15%", "sTitle": "审核时间", "sClass": "right", "mData": "auditTime", "bSortable": false },
            { "sWidth": "15%", "sTitle": "操作", "sClass": "left", "mData": null, "bSortable": false }
        ],
        "aaSorting": [],
        "aLengthMenu": [ 10, 20, 30 ],
        "bProcessing": true,
        "bFilter": false,
        "bServerSide": true,
        "bAutoWidth": false,
        "fnServerParams": function (aoData) {
            var queryParameters = $("#query-form").serializeArray();
            $(queryParameters).each(function (i, v) {
                    aoData.push(v);
                }
            );
        },
        "aoColumnDefs": [
            { "sClass": "rowcheckbox", "aTargets": [ 0 ] }
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var id = aData["id"];
            var inputHtml = "<input type='checkbox' class='ace' name='chkItem' value='" + id + "'/><span class=\"lbl\"></span>";
            $('td:eq(0)', nRow).html(inputHtml);

            var nameUrl = "<a href='#'>" + aData['name'] + "</a>";
            var auditLink = "";
            var delLink = "";
            var viewLink = "";
            var status = aData['auditResult'];
            switch (status) {
                case Constant.Resource.STATUS.NOT_AUDIT :
                    auditLink = '<a class="btn btn-xs btn-success" onclick="_audit(\'' + aData['id'] + '\')" type="button">审核</a>';
                    delLink = '<input class="btn btn-xs btn-danger" onclick="_remove(\'' + aData['id'] + '\')" type="button" value="删除"/>';
                    nameUrl = aData['name'];
                    break;
                case Constant.Resource.STATUS.AUDIT_NOT_PASS :
                    auditLink = '<a class="btn btn-xs btn-success" onclick="_audit(\'' + aData['id'] + '\')" type="button">审核</a>';
                    delLink = '<input class="btn btn-xs btn-danger" onclick="_remove(\'' + aData['id'] + '\')" type="button" value="删除"/>';
                    break;
                case Constant.Resource.STATUS.AUDIT_PASS :
                    delLink = '<input class="btn btn-xs btn-danger" onclick="_remove(\'' + aData['id'] + '\')" type="button" value="删除"/>';
                    nameUrl = '<a target="_blank" href="' + getContentPath() + '/res/show?id=' + aData['id'] + '">' + aData['name'] + '</a>';
                    break;
                default :
                    break;
            }
            $("td:eq(1)", nRow).html(nameUrl);
            $("td:eq(8)", nRow).html(auditLink + delLink);
        }
    })

    $('#search-btn').on('click', function () {
        _freshTable();
    });

    $('#batch-del-btn').on('click', function () {
        _batchRemove();
    });

    $('.date-picker').datepicker({autoclose: true}).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });

    $('#upload-btn').on('click', function () {
        window.Uploader.uploadWizard();
    });
});

/**
 * 查询
 */
function _query() {
    _freshTable();
}

/**
 * 刷新表格数据
 * @private
 */
function _freshTable() {
    // 查询时，要从第一条开始
    var oSettings = $(dataTableId).dataTable().fnSettings();
    oSettings._iDisplayStart = 0;
    $(dataTableId).dataTable().fnClearTable();
}

/**
 * 审核
 * @param id
 * @private
 */
function _audit(id) {
    var auditUrl = "/res/2audit?id=" + id;
    top.location.href = getContentPath() + auditUrl;
}

/**
 * 单个删除
 * @param id
 * @private
 */
function _remove(id) {
    bootBoxConfirm('确实删除当前资源？', function (p) {
            if (!p) return;
            ajax(getContentPath() + "/res/r", {id: id}, function (data) {
                if (data.type == CODE_ENUM.ERROR) {
                    bootBoxError(data.msg);
                } else {
                    bootBoxSuccess(data.msg, function () {
                        _freshTable();
                    });
                }
            }, function (data) {
                bootBoxError(data.msg);
            });
        }
    );
}

/**
 * 批量删除
 * @private
 */
function _batchRemove() {
    var chkItems = $("input[name='chkItem']:checked");
    if (!chkItems || chkItems.length == 0)
        bootBoxWarning("未选择任何数据！");
    else {
        bootBoxConfirm('删除当前选择的资源后，无法恢复，确定删除？', function (p) {
            if (!p) return;
            var ids = [];
            for (var i = 0; i < chkItems.length; i++) {
                ids.push({ name: "ids", value: $(chkItems[i]).val()});
            }
            ajax(getContentPath() + "/res/ra", ids, function (data) {
                if (data.type == CODE_ENUM.ERROR) {
                    bootBoxError(data.msg);
                } else {
                    bootBoxSuccess(data.msg, function () {
                        _freshTable();
                    });
                }
            }, function (data) {
                bootBoxError(data.msg);
            });
        });
    }
}