/**
 * Created by wksc007 on 2014/9/17.
 * 用户复审结果查看
 */
$(function () {
    $("#data-table").dataTable({
        "sAjaxSource": getContentPath() + "/certificate/reviewResult/page.do",
        "aoColumns": [
//            { "sWidth": "4%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "id", "bSortable": false },
            { "sWidth": "9%", "sTitle": "姓名", "sClass": "center", "mData": "userName", "bSortable": false },
            { "sWidth": "9%", "sTitle": "名称", "sClass": "center", "mData": "certificateName", "bSortable": false },
            { "sWidth": "9%", "sTitle": "等级", "sClass": "center", "mData": "certificateLevel", "bSortable": false },
            { "sWidth": "9%", "sTitle": "编号", "sClass": "center", "mData": "certificateId", "bSortable": false },
            { "sWidth": "10%", "sTitle": "理论成绩", "sClass": "center", "mData": "scoreTheory", "bSortable": false },
            { "sWidth": "9%", "sTitle": "操作成绩", "sClass": "center", "mData": "scorePractise", "bSortable": false },
            { "sWidth": "13%", "sTitle": "复核成绩", "sClass": "center", "mData": "reviewResult", "bSortable": false },
            { "sWidth": "13%", "sTitle": "考核日期", "sClass": "center", "mData": "reviewTime", "bSortable": false }
        ],
        "aLengthMenu": [ 10, 20, 30 ],
        "aaSorting": [],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:not(:first,:last)', nRow).addClass("td_v_middle");
            $('td:eq(2)', nRow).html(rankNameShow(aData["certificateLevel"]));
        },
        "fnServerParams": function (aoData) {
            setupQueryParameter(aoData, "#query-form");
        }
    });
    //查询
    $("#query-reviewResult").click(function(){
        var oSettings = $('#data-table').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#data-table').dataTable().fnClearTable();
    });
    //根据选取的证书级联证书的等级
    $("select[name='certificateName']").change(function (e) {
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
    //初始化日期控件
    $('.date-picker').datepicker({autoclose:true,endDate:""}).next().on(ace.click_event, function(){
        $(this).prev().focus();
    });
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
    var width=document.body.scrollWidth
    //判断窗口的分辨率
    if(width>1300&&width<1400)
       $("#query-form").find(".form-group").eq(3).after("<br>");
    //窗口大小改变事件
    window.onresize = function () {
        var wide=document.body.scrollWidth
        $("#query-form").find("br").remove();
        if(wide>1300&&wide<1400)
            $("#query-form").find(".form-group").eq(3).after("<br>");
    }
});
