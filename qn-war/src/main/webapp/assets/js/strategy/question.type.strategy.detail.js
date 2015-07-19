jQuery(function ($) {


    var oTable1 = $('#qtypeDetailList').dataTable({
        "bServerSide": true,
        "bPaginate":false,
        //"bSort":false, 是否开启各列排序功能
        "sServerMethod": "POST",
        "sAjaxSource": getContentPath()+"/qts/qtsdList",
        "aaSorting": [[ 0, "asc" ]],
        "aoColumns": [
            {
                "sWidth" : "5%",
                "bSortable" : false,
                "sTitle": "排序",
                "mData" : "order"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "题型",
                "mData": "questionTypeName"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "标题",
                "mData": "title"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "sTitle": "简单",
                "mData": "easyCount"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "普通",
                "mData": "normalCount"
            }, {
                "sWidth": "20%",
                "bSortable": false,
                "sTitle": "困难",
                "mData": "hardCount"
            },
            {
                "sWidth": "20%",
                "bSortable": false,
                "sTitle": "每题分数",
                "mData": "score"
            }
        ],
        "aoColumnDefs": [
//            { "sClass": "rowcheckbox", "aTargets": [ 0 ] }
        ],
        "fnServerParams": function (aoData) {
            aoData.push({
                "name" : "qtsId",
                "value" :$("#qtsId").val()
            });
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
//            var qtsId = aData["id"];
//            $('td:eq(0)', nRow).html('<div class="center"><input type="checkbox" class="ace" value="' + qtsId + '" /><span style="width:0px;" class="lbl"></span></div>');
        },
        "fnDrawCallback": function (oSettings) {

        },
        "fnInitComplete": function (oSettings, json) {

        }
    });
});