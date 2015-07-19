jQuery(function ($) {

    $('#id-date-range-picker-1').daterangepicker().next().on(ace.click_event, function(){
        $(this).prev().focus();
    });

    var oTable1 = $('#cesList').dataTable({
        "bServerSide": true,
        "sServerMethod": "POST",
        "sAjaxSource": getContentPath()+"/ces/cesl",
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
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "考试类型",
                "mData": "examContentType"
            },
            {
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "考试日期",
                "mData": "examTime"
            },
            {
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "考试时间(分钟)",
                "mData": "examTimeLength"
            },
            {
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "考试范围",
                "mData": "certName"
            },
            {
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "组卷模式",
                "mData": "generateMode"
            },
            {
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "答题方式",
                "mData": "answerMode"
            },{
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "可重考次数",
                "mData": "repeatTimes"
            },{
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "是否显示计时",
                "mData": "isShowTime"
            },{
                "sWidth": "5%",
                "bSortable": false,
                "sTitle": "是否显示解析",
                "mData": "isShowAnalysis"
            },{
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
            var cesId = aData["id"];
            $('td:eq(0)', nRow).html('<div class="center"><input type="checkbox" class="ace" value="' + cesId + '" /><span style="width:0px;" class="lbl"></span></div>');

            var examContentType=aData["examContentType"];
            if(examContentType==Constant.ExamContentType.PracticeExam.code){
                $('td:eq(2)', nRow).html("<span>"+Constant.ExamContentType.PracticeExam.name+"</span>");
            }else if(examContentType==Constant.ExamContentType.TheoryExam.code){
                $('td:eq(2)', nRow).html("<span>"+Constant.ExamContentType.TheoryExam.name+"</span>");
            }else{
                $('td:eq(2)', nRow).html("<span></span>");
            }

            var generateMode=aData["generateMode"];
            if(generateMode==Constant.GENERATEMODE.FIXED){
                $('td:eq(6)', nRow).html("<span>"+Constant.GENERATEMODE.FIXED_NAME+"</span>");
            }else if(generateMode==Constant.GENERATEMODE.RANDOM){
                $('td:eq(6)', nRow).html("<span>"+Constant.GENERATEMODE.RANDOM_NAME+"</span>");
            }else{
                $('td:eq(6)', nRow).html("<span></span>");
            }

            var answerMode=aData["answerMode"];
            if(answerMode==Constant.ANSWERMODE.SINGLE_QUESTION){
                $('td:eq(7)', nRow).html("<span>"+Constant.ANSWERMODE.SINGLE_QUESTION_NAME+"</span>");
            }else if(answerMode==Constant.ANSWERMODE.WHOLE_TEST){
                $('td:eq(7)', nRow).html("<span>"+Constant.ANSWERMODE.WHOLE_TEST_NAME+"</span>");
            }else{
                $('td:eq(7)', nRow).html("<span></span>");
            }

            var isShowTime=aData["isShowTime"];
            if(isShowTime==Constant.SHOWMODE.SHOW_TIME){
                $('td:eq(9)', nRow).html("<span>是</span>");
            }else if(isShowTime==Constant.SHOWMODE.NOT_SHOW_TIME){
                $('td:eq(9)', nRow).html("<span>否</span>");
            }else{
                $('td:eq(9)', nRow).html("<span></span>");
            }

            var isShowAnalysis=aData["isShowAnalysis"];
            if(isShowAnalysis==Constant.SHOWMODE.SHOW_ANALYSIS){
                $('td:eq(10)', nRow).html("<span>是</span>");
            }else if(isShowAnalysis==Constant.SHOWMODE.NOT_SHOW_ANALYSIS){
                $('td:eq(10)', nRow).html("<span>否</span>");
            }else{
                $('td:eq(10)', nRow).html("<span></span>");
            }

            var operation = '<div class="action-buttons">' +
                '<a href="javascript:void(0)" onclick="switchToDetailView(this);" class="btn btn-sm btn-info">查看</a>' +
                '<a href="javascript:void(0)" onclick="updateCustomExam(this)" class="btn btn-sm btn-primary">修改</a>' +
                '<a href="javascript:void(0)" onclick="deleteCustomExam(this)" class="btn btn-sm btn-danger">删除</a>'+
                '</div>';

            $('td:eq(11)', nRow).html(operation);
        },
        "fnDrawCallback": function (oSettings) {
            //取消第一列class="selectrow"的checkbox框选中状态
            $("#cesList th input:checkbox").removeAttr("checked");
            $("#cesList .rowcheckbox").show();
            /*  if($("#stafflist-table-switch").attr("edit")=="false"){
             $("#stafflist-table .rowcheckbox").hide();
             }else{
             $("#stafflist-table .rowcheckbox").show();
             } */
        },
        "fnInitComplete": function (oSettings, json) {
            $('#cesList th input:checkbox').on('click', function () {
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
        switchPage("/ces/ai");
    })

    $("#batch-delete-button").click(function(){
        var checkedAr = $('#cesList td.rowcheckbox').find(":checked");
        if (checkedAr.size() == 0) {
            alert("请至少选中一行数据！");
            return;
        }
        if (checkedAr) {
            var ids = [];
            $.each(checkedAr, function (index, obj) {
                var sData = $('#cesList').dataTable().fnGetData($(obj).parents('#cesList tr').get(0));
                ids.push(sData.id);
            });
            $.ajax({
                url: getContentPath()+'/ces/bd',
                type: 'post',
                dataType: "json",
                data: {
                    "ids": ids.join(",")
                },
                success: function (data, textStatus, jqXHR) {
                    if (data.code==0) {
                        $('#cesList').dataTable().fnClearTable();
                    } else {
                        bootBoxError(data.msg);
                    }
                }
            });
        }
    })

    $("#search-button").click(function(){
        var oSettings = $('#cesList').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#cesList').dataTable().fnClearTable();
    })
});

function switchToDetailView(dom){
    var sData = $('#cesList').dataTable().fnGetData($(dom).parents("#cesList tbody tr").get(0));
    if (sData) {
        switchPage("/ces/di/"+sData["id"]);
    }
}

function updateCustomExam(dom){
    var sData = $('#cesList').dataTable().fnGetData($(dom).parents("#cesList tr").get(0));
    if (sData) {
        switchPage("/ces/ei/"+sData["id"]);
    }
}

function deleteCustomExam(dom){
    var sData = $('#cesList').dataTable().fnGetData($(dom).parents("#cesList tr").get(0));
    if (sData) {
        $.ajax({
            url: getContentPath()+'/ces/bd',
            type: 'post',
            dataType: "json",
            data: {
                "ids": sData["id"]
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code === 0) {
                    $('#cesList').dataTable().fnClearTable();
                } else {
                   bootBoxError(data.msg);
                }
            }
        });
    }
}