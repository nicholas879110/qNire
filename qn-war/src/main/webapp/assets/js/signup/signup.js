jQuery(function ($) {

    var oTable1 = $('#signup-table').dataTable({
        "bServerSide": true,
        "sServerMethod": "POST",
        "sAjaxSource": getContentPath() + "/signup/page",
        "aoColumns": [
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "单位",
                "mData": "company"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "证件类型",
                "mData": "cardType"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "证件号码",
                "mData": "cardNum"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "姓名",
                "mData": "name"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "sTitle": "职业",
                "mData": "profession"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "sTitle": "工种",
                "mData": "job"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "sTitle": "申报级别",
                "mData": "applyLevel"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "sTitle": "考生来源",
                "mData": "stuSourceType"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "sTitle": "电话",
                "mData": "tel"
            },
            {
                "sWidth": "15%",
                "bSortable": false,
                "mData": "id"
            }
        ],
        "fnServerParams": function (aoData) {
            var applyTime=$("input[name=applyTime]").val();
            console.log(applyTime);
            var name=$("input[name=name]").val();
            var tel=$("input[name=tel]").val();
            aoData.push({
             "name": "applyTimeQ",
             "value": applyTime
             },{
                name:"name",
                value:name
            },{
                name:"tel",
                value:tel
            });
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var cardType=aData["cardType"];
            $('td:eq(1)', nRow).html("<span>"+revertCardType(cardType)+"</span>");

            var applyLevel=aData["applyLevel"];
            $('td:eq(6)', nRow).html("<span>"+revertLevel(applyLevel)+"</span>");

            var id=aData["id"];
            var operation = '<div class="action-buttons">' +
                '<a href="javascript:void(0)" onclick="switchToDetailView(this);" class="btn btn-sm btn-info"> 详细</a></div>' ;

            $('td:eq(9)', nRow).html(operation);
        }
    });

    function revertCardType(cardType){
        switch (cardType){
            case Constant.CertificateType.IDENTITY_CARD:
                cardType="身份证";
                break;
            case  Constant.CertificateType.OFFICER_CARD:
                cardType="军官证";
                break;
            default :cardType="其他";
        }
        return cardType;
    }

    function revertLevel(level){
        var levelName="";
        switch (level) {
            case Constant.CertficateLevel.Lower:
                levelName = Constant.CertficateLevel.LowerName;
                break;
            case Constant.CertficateLevel.Middler:
                levelName = Constant.CertficateLevel.MiddlerName;
                break;
            case Constant.CertficateLevel.Higher:
                levelName = Constant.CertficateLevel.HigherName;
                break;
            case Constant.CertficateLevel.Bester:
                levelName = Constant.CertficateLevel.BesterName;
                break;
            case Constant.CertficateLevel.Super:
                levelName = Constant.CertficateLevel.SuperName;
                break;
            default :
                break;
        }
        return levelName;
    }

    $('#signip-date').daterangepicker({
        format:'YYYY-MM-DD',
        separator:'至',
        locale:{
        applyLabel: '确认',
        cancelLabel: '取消',
        fromLabel: '从',
        toLabel: '至',
        weekLabel: '周',
        customRangeLabel: '自定义范围'
    }});



    $("#batch-ep-btn-0").click(function(){
        //条件
        var applyTime=$("input[name=applyTime]").val();
        var name=$("input[name=name]").val();
        var tel=$("input[name=tel]").val();
        window.location.href = getContentPath() + "/signup/exportExcel?applyTimeQ="+applyTime+"&name="+name+"&tel="+tel+"&type="+Constant.ProfessionCategory.jobTitle.code;
    })

    $("#batch-ep-btn-1").click(function(){
        //条件
        var applyTime=$("input[name=applyTime]").val();
        var name=$("input[name=name]").val();
        var tel=$("input[name=tel]").val();
        window.location.href = getContentPath() + "/signup/exportExcel?applyTimeQ="+applyTime+"&name="+name+"&tel="+tel+"&type="+Constant.ProfessionCategory.cert.code;
    })

    $("#search-btn").click(function(e){
        var oSettings = $('#signup-table').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#signup-table').dataTable().fnClearTable();
    })
})


function switchToDetailView(dom){
    var sData = $('#signup-table').dataTable().fnGetData($(dom).parents("#signup-table tr").get(0));
   switchPage("/signup/detail?id="+sData["id"])
}

