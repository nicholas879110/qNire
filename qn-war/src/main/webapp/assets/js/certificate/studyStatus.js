/**
 * Created by wksc007 on 2014/9/17.
 * 证书学习状态查看
 */
$(function () {
    $("#data-table").dataTable({
        "sAjaxSource": getContentPath() + "/certificate/studyStatus/page.do",
        "aoColumns": [
//            { "sWidth": "4%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "id", "bSortable": false },
            { "sWidth": "9%", "sTitle": "名称", "sClass": "center", "mData": "certificateName", "bSortable": false },
            { "sWidth": "9%", "sTitle": "等级", "sClass": "center", "mData": "certificateLevel", "bSortable": false },
            { "sWidth": "9%", "sTitle": "用户名", "sClass": "center", "mData": "userName", "bSortable": false },
//            { "sWidth": "9%", "sTitle": "状态", "sClass": "center", "mData": "status", "bSortable": false },
            { "sWidth": "10%", "sTitle": "总学时", "sClass": "center", "mData": "totalHour", "bSortable": false },
            { "sWidth": "9%", "sTitle": "总进度", "sClass": "center", "mData": "progressPercent", "bSortable": false },
            { "sWidth": "13%", "sTitle": "上次登录时间", "sClass": "center", "mData": "lastLoginTime", "bSortable": false }
        ],
        "aLengthMenu": [ 10, 20, 30 ],
        "aaSorting": [],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:not(:first,:last)', nRow).addClass("td_v_middle");
            $('td:eq(1)', nRow).html(rankNameShow(aData["certificateLevel"]));
//            $('td:eq(3)', nRow).html(statusShow(aData["status"]));
            var hour=parseFloat(aData["totalHour"])/3600;
            $('td:eq(3)', nRow).html(hour.toString().substring(0, hour.toString().indexOf(".")+3));
            //用百分号显示进度
            var percent = aData["progressPercent"]+"%";
            var htmlProgress = "<div style='margin-bottom:-20px;'><div class=\"progress progress-small progress-striped\" " +
                "data-percent="+percent+"><div class=\"progress-bar progress-bar-success\" style=\"width: "+percent+"\"></div></div></div>";
            $('td:eq(4)', nRow).html(htmlProgress);
        },
        "fnServerParams": function (aoData) {
            setupQueryParameter(aoData, "#query-form");
        }
    });
    //查询
    $("#query-studyStatus").click(function(){
        var oSettings = $('#data-table').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#data-table').dataTable().fnClearTable();
    });
    //根据选取的证书级联证书的等级
    $("select[name='certificateId']").change(function (e) {
        $("#certificateLevel").children().remove();
        var level="<option value=\"\">--全部--</option>";
        if(this.value==""){
            $("#certificateLevel").append(level);
            return;
        }
//            certificateRank(this.value);
        var certificateCount = $(this).find("option:selected").attr("data-id");
        for(var i=1;i<=certificateCount;i++){
            switch (i) {
                case Constant.CertficateLevel.Lower :
                    level += "<option value=\"1\">" + Constant.CertficateLevel.LowerName + "</option>";
                    break;
                case Constant.CertficateLevel.Middler :
                    level += "<option value=\"2\">" + Constant.CertficateLevel.MiddlerName + "</option>";
                    break;
                case Constant.CertficateLevel.Higher :
                    level += "<option value=\"3\">" + Constant.CertficateLevel.HigherName + "</option>";
                    break;
                case Constant.CertficateLevel.Bester :
                    level += "<option value=\"4\">" + Constant.CertficateLevel.BesterName + "</option>";
                    break;
                case Constant.CertficateLevel.Super :
                    level += "<option value=\"5\">" + Constant.CertficateLevel.SuperName + "</option>";
                    break;
                default :
                    break;
            }
        }
        $("#certificateLevel").append(level);
    })
    //证书等级显示重定义
    function rankNameShow(rankId){
        var rankName="";
        switch(rankId){
            case Constant.CertficateLevel.Lower :
                rankName= Constant.CertficateLevel.LowerName;
                break;
            case Constant.CertficateLevel.Middler :
                rankName= Constant.CertficateLevel.MiddlerName;
                break;
            case Constant.CertficateLevel.Higher :
                rankName= Constant.CertficateLevel.HigherName;
                break;
            case Constant.CertficateLevel.Bester :
                rankName= Constant.CertficateLevel.BesterName;
                break;
            case Constant.CertficateLevel.Super :
                rankName= Constant.CertficateLevel.SuperName;
                break;
            default :
                break;
        }
        return rankName;
    }
//    //证书状态显示重定义
//    function statusShow(status){
//        var value="";
//        switch(status){
//            case Constant.UserCertificateStatus.CANCEL.code :
//                value= Constant.UserCertificateStatus.CANCEL.name;
//                break;
//            case Constant.UserCertificateStatus.SIGN_UP.code :
//                value= Constant.UserCertificateStatus.SIGN_UP.name;
//                break;
//            case Constant.UserCertificateStatus.GET.code :
//                value= Constant.UserCertificateStatus.GET.name;
//                break;
//            default :
//                break;
//        }
//        return value;
//    }
});
