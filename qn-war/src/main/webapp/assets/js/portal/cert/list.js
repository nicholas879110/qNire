/**
 * 实名认证.
 * Created by Dendy on 2014/8/5.
 */
var dataTableId = "#cert-table";
$(function () {
    /**
     * 表格加载
     */
    $(dataTableId).dataTable({
        "sAjaxSource": getContentPath() + "/u/cert/page",
        "aoColumns": [
            { "sWidth": "20%", "sTitle": "申请人", "sClass": "center", "mData": "applyUserName", "bSortable": false },
            { "sWidth": "20%", "sTitle": "申请时间", "sClass": "center", "mData": "applyTime", "bSortable": true, "asSorting": [ 'asc', 'desc' ], "sName": "applyTime" },
            { "sWidth": "15%", "sTitle": "审核状态", "sClass": "center", "mData": "applyResultName", "bSortable": true, "asSorting": [ 'desc', 'asc' ], "sName": "applyResult"},
            { "sWidth": "30%", "sTitle": "审核意见", "sClass": "left", "mData": "auditOpinion", "bSortable": false},
            { "sWidth": "15%", "sTitle": "操作", "sClass": "center", "mData": null, "bSortable": false }
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
            var id = aData["applyUserId"];
            var auditLink = "";
            var status = aData['applyResult'];
            switch (status) {
                case Constant.CertificateStatus.NOT_AUDIT :
                    auditLink = '<a href="' + getContentPath() + '/u/cert/audit?id=' + id + '&certId=' + aData['id'] + '" class="btn btn-xs btn-success">审核</a>';
                    break;
                case Constant.CertificateStatus.PASS :
//                    auditLink = '<a class="btn btn-xs btn-success" onclick="_audit(\'' + aData['id'] + '\')" type="button">审核</a>';
                    break;
                case Constant.CertificateStatus.NOT_PASS :
//                    auditLink = '<input class="btn btn-xs btn-danger" onclick="_remove(\'' + id + '\')" type="button" value="删除"/>';
                    break;
                default :
                    break;
            }
            $("td:eq(4)", nRow).html(auditLink);
        }
    })

    $('#search-btn').on('click', function () {
        _freshTable();
    });

    $('.date-picker').datepicker({autoclose: true}).next().on(ace.click_event, function () {
        $(this).prev().focus();
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