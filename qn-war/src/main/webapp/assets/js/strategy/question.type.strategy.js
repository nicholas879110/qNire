jQuery(function ($) {


    var oTable1 = $('#qtypeList').dataTable({
        "bServerSide": true,
        "sServerMethod": "POST",
        "sAjaxSource": getContentPath()+"/qts/qtsl",
        "aoColumns": [
            {
                "sWidth" : "5%",
                "bSortable" : false,
                "mData" : "id"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "策略名称",
                "mData": "name"
            },{
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "总分",
                "mData": "totalScore"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "及格分",
                "mData": "passScore"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "sTitle": "创建人 ",
                "mData": "fkModifyUserName"
            },
            {
                "sWidth": "20%",
                "bSortable": false,
                "sTitle": "创建时间",
                "mData": "modifyTime"
            }, {
                "sWidth": "20%",
                "bSortable": false,
                "sTitle": "操作",
                "mData": "id"
            }
        ],
        "aoColumnDefs": [
            { "sClass": "rowcheckbox", "aTargets": [ 0 ] }
        ],
        "fnServerParams": function (aoData) {
            var queryParameters = $("#search-form").serializeArray();
            $(queryParameters).each(function (i, v) {
                    aoData.push(v);
                }
            );
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var qtsId = aData["id"];
            $('td:eq(0)', nRow).html('<div class="center"><input type="checkbox" class="ace" value="' + qtsId + '" /><span style="width:0px;" class="lbl"></span></div>');

            var operation = '<div class="action-buttons">' +
                '<a href="javascript:void(0)" onclick="switchToDetailView(this);" class="btn btn-sm btn-info"> 查看</a>' +
                '<a href="javascript:void(0)" onclick="updateQTypeStrategy(this)" class="btn btn-sm btn-primary">修改</a>' +
                '<a href="javascript:void(0)" onclick="deleteQTypeStrategy(this)" class="btn btn-sm btn-danger">删除</a>'+
                '</div>';

            $('td:eq(6)', nRow).html(operation);
        },
        "fnDrawCallback": function (oSettings) {
            //取消第一列class="selectrow"的checkbox框选中状态
            $("#qtypeList th input:checkbox").removeAttr("checked");
            $("#qtypeList .rowcheckbox").show();
            /*  if($("#stafflist-table-switch").attr("edit")=="false"){
             $("#stafflist-table .rowcheckbox").hide();
             }else{
             $("#stafflist-table .rowcheckbox").show();
             } */
        },
        "fnInitComplete": function (oSettings, json) {
            $('#qtypeList th input:checkbox').on('click', function () {
                var that = this;
                $(this).closest('table').find('tr > td:first-child input:checkbox')
                    .each(function () {
                        this.checked = that.checked;
                        $(this).closest('tr').toggleClass('selected');
                    });
            });
        }
    });

    $("#add-qtype-strategy").click(function () {
        switchPage("/qts/ai");
    })


    /**
     * 批量删除
     */
    $("#batch-delete-button").click(function(){
        var checkedAr = $('#qtypeList td.rowcheckbox').find(":checked");
        if (checkedAr.size() == 0) {
            alert("请至少选中一行数据！");
            return;
        }
        if (checkedAr) {
            var ids = [];
            $.each(checkedAr, function (index, obj) {
                var sData = $('#qtypeList').dataTable().fnGetData($(obj).parents('#qtypeList tr').get(0));
                ids.push(sData.id);
            });
            $.ajax({
                url: getContentPath()+'/qts/bd',
                type: 'post',
                dataType: "json",
                data: {
                    "ids": ids.join(",")
                },
                success: function (data, textStatus, jqXHR) {
                    if (data.code==0) {
                        $('#qtypeList').dataTable().fnClearTable();
                    } else {
                        bootBoxError(data.msg);
                    }
                }
            });
        }
    })


    /**
     * 查询
     */
    $("#search-button").click(function(){
        var oSettings = $('#qtypeList').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#qtypeList').dataTable().fnClearTable();
    })
});

function switchToDetailView(dom){
    var sData = $('#qtypeList').dataTable().fnGetData($(dom).parents("#qtypeList tbody tr").get(0));
    if (sData) {
        switchPage("/qts/qtsd/"+sData["id"]);
    }
}

function updateQTypeStrategy(dom){
    var sData = $('#qtypeList').dataTable().fnGetData($(dom).parents("#qtypeList tr").get(0));
    if (sData) {
        switchPage("/qts/ei/"+sData["id"]);
    }
}

function deleteQTypeStrategy(dom){
    var sData = $('#qtypeList').dataTable().fnGetData($(dom).parents("#qtypeList tr").get(0));
    if (sData) {
        $.ajax({
            url: getContentPath()+'/qts/bd',
            type: 'post',
            dataType: "json",
            data: {
                "ids": sData["id"]
            },
            success: function (data, textStatus, jqXHR) {

                if (data.code === 0) {
                    $('#qtypeList').dataTable().fnClearTable();
                } else {
                    alert(data.msg);
                }
            }
        });
    }
}


