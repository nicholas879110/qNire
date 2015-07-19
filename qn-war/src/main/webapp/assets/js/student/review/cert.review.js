jQuery(function($){
    loadCurrentPersonalPros();

    $("#proTabs").on('click', 'li a', function(){
        var proId=$(this).attr("id").substring(4);
        loadCertResult(proId);
    })
})


function loadCurrentPersonalPros(){
    startLoading("正在加载个人职业工种数据",1);
    $.ajax({
        url: getContentPath() + "/stuCert/ot/current/pros/"+"",
        type: 'get',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
                generateStudyingProsHtml(data);
            } else {
            }
            endLoading();
        }
    });
}


function generateStudyingProsHtml(data){
    var proTab= '<li>\
            <a data-toggle="tab"  id="tab_{id}">{proName}</a>\
      </li>';
    var html="";

    var rs=data.result;
    if(rs){
        $.each(rs,function(index,item){
            html+= proTab.replaceAll("{id}",item.proId).replace("{proName}",item.proName);
            if(index==0){
                loadCertResult(item.proId)
            }
        })
        $("#proTabs").html(html);
    }
}






function loadCertResult(proId){

    startLoading("正在加载个人证书(职称)成绩",1);
    $.ajax({
        url: getContentPath() + "/certReview/ot/cert/result/"+proId,
        type: 'get',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
                generateCertResultHtml(data);
            } else {
            }
            endLoading();
        }
    });
}

function loadStudyingCerts(proId){

    startLoading("正在加载个人证书(职称)课程数据",1);
    $.ajax({
        url: getContentPath() + "/stuCert/ot/current/certs/"+proId,
        type: 'get',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
                generateStudyingCertsHtml(data);
            } else {
            }
            endLoading();
        }
    });
}


var pieHtml='<div class="easypiechart">\
    <div class="label">{order}</div>\
    <div class="easy-pie-chart percentage" data-percent="{percent}" data-color="{color}">\
        <span class="percent">{score}</span>\
    </div>\
    <div class="space-8"></div>\
    {time}\
</div>';

function generateCertResultHtml(data){
    var result=data.result;
    if(result){
        /**
         * 1、考试还未发布，联系管理员
         * 2、学时未满，不能考试
         * 3、第一次考试，开始考试
         * 4、考试结果未通过，补考
         * 5、考试结果通过、申请复审
         * 6、考试次数已满、不能再次考试，重新学习
         */

        /**
         * 生成证书信息
         * @type {certLevel}
         */
        var level=result.certLevel;
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
                levelName = Constant.CertficateLevel.SuperHTMLName;
                break;
            default :
                break;
        }
        $("#certInfo").html('证书(职称)：'+result.certName+"("+levelName.replaceAll("<(\S*?)[^>]*>","")+")");
        /**********************************************/

        $("#reviewStatus").empty();
         if(result.bipCode==Constant.ReviewResultStatus.StudyTimeLeft.code){
            $("#reviewStatus").html("<span><i class='icon-info-sign bigger-110 blue'></i>"+result.msg+"</span>");
             clearReviewRecord();
            $("#reviewExam").addClass("hide");
         }else if(result.bipCode==Constant.ReviewResultStatus.ExamNotPublised.code){
            $("#reviewStatus").html("<span><i class='icon-info-sign bigger-110 blue'></i>"+result.msg+"</span>");
             clearReviewRecord();
             $("#reviewExam").addClass("hide");
         }else{
             //加载复审成绩
             $("#reviewExam").removeClass("hide");
             loadReviewRecord(result.certId);
             //复审最终结果
             $("#practiceResults").empty();
             $("#theoryResults").empty();
             $("#theoryOper").empty();
             $("#practiceOper").empty();
             $("#theoryStatus").empty();
             $("#practiceStatus").empty();
             var flag=true;
             $.each(result.details,function(index0,item0){
                 if(item0.type==Constant.ExamContentType.PracticeExam.code){

                     /*if(item0.records.length==0){
                         $("#practiceOper").html(
                                 "<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>"
                                 +"<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CustomExam
                                 +"'>开始考试</a>"
                         );
                         $("#practiceResults").html('<div class="title"><div class="font-sun">考试成绩  暂无</div></div>')
                     }else{*/
                         if(item0.status==3){
                             $("#practiceOper").html("<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>");
                             $("#practiceStatus").text("考试次数已用完");
                             flag=false;
                         }else if(item0.status==0){
                             if(item0.records.length==0){
                                 $("#practiceOper").html(
                                     "<a target='_blank' class='btn btn-primary btn-minier' href='"
                                         +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                         +"'>模拟考试</a>"
                                         +"<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                         +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CustomExam
                                         +"'>开始考试</a>"
                                 );
                                 $("#practiceResults").html('<div class="title"><div class="font-sun">考试成绩  暂无</div></div>')
                             }else{
                             $("#practiceOper").html("<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>"
                                 +"<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CustomExam
                                 +"'>补考</a>");
                             }
                             flag=false;
                         }else if(item0.status==1){
                             $("#practiceOper").html("<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>");
                             $("#practiceStatus").text("已通过");
                         }else if(item0.status==4){
                             $("#practiceOper").html("<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>");
                             $("#practiceStatus").text("考试未发布，请练习管理员");
                         }
                         //详细成绩
                         var detail='<div class="title"><div class="font-sun">考试成绩</div></div>';
                         $.each(item0.records,function(index,item){
                             detail+=pieHtml.replace("{order}",index+1).replace("{percent}",item.percent).replace("{color}",calculateRowResult(item.status))
                                 .replace("{score}",item.score).replace("{time}",item.examTime);
                         });
                         $("#practiceResults").html(detail);
//                     }
                 }else if(item0.type==Constant.ExamContentType.TheoryExam.code){

                     /*if(item0.records.length==0){
                         $("#theoryOper").html(
                             "<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>"
                                 +"<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CustomExam
                                 +"'>开始考试</a>"
                         );
                         $("#theoryResults").html('<div class="title"><div class="font-sun">考试成绩  暂无</div></div>')
                     }else{*/
                         if(item0.status==3){
                             $("#theoryOper").html("<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>");
                             $("#theoryStatus").text("考试次数已用完");
                             flag=false;
                         }else if(item0.status==0){
                             if(item0.records.length==0){
                                 $("#theoryOper").html(
                                     "<a target='_blank' class='btn btn-primary btn-minier' href='"
                                         +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                         +"'>模拟考试</a>"
                                         +"<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                         +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CustomExam
                                         +"'>开始考试</a>"
                                 );
                                 $("#theoryResults").html('<div class="title"><div class="font-sun">考试成绩  暂无</div></div>')
                             }else{
                             $("#theoryOper").html("<a target='_blank' class='btn btn-primary btn-minier'  href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>"
                                 +"<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CustomExam
                                 +"'>补考</a>");
                             }
                             flag=false;
                         }else if(item0.status==1){
                             $("#theoryOper").html("<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>");
                             $("#theoryStatus").text("已通过");
                         }else if(item0.status==4){
                             $("#theoryOper").html("<a target='_blank' class='btn btn-primary btn-minier' href='"
                                 +getContentPath()+'/exam/do/init?testCode='+result.certId+"&examContentType="+item0.type+"&testType="+Constant.TestType.CertficatePractice
                                 +"'>模拟考试</a>");
                             $("#theoryStatus").text("考试未发布，请练习管理员");
                         }
                         //详细成绩
                         var detail='<div class="title"><div class="font-sun">考试成绩</div></div>';
                         $.each(item0.records,function(index,item){
                             detail+=pieHtml.replace("{order}",index+1).replace("{percent}",item.percent).replace("{color}",calculateRowResult(item.status))
                                 .replace("{score}",item.score).replace("{time}",item.examTime);
                         });
                         $("#theoryResults").html(detail);

//                     }
                 }
             })
         }

        $('.easy-pie-chart.percentage').each(function(){
            var barColor = $(this).data('color') || '#555';
            var trackColor = '#E2E2E2';
            var size = parseInt($(this).data('size')) || 72;
            $(this).easyPieChart({
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: false,
                lineCap: 'butt',
                lineWidth: parseInt(size/10),
                animate:false,
                size: size
            }).css('color', barColor);
        });
    }
}


function calculateRowResult(status){
    var flag="";
    if(status==0){
        flag="#e86666";
    }else if(status==1){
        flag="#3bb44a"
    }
    return flag;
}



function loadReviewRecord(certId){
    startLoading("正在加载个人证书(职称)课程数据",1);
    $.ajax({
        url: getContentPath() + "/certReview/ot/cert/review/record/"+certId,
        type: 'get',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
                generateReviewRecordHtml(data.result);
            } else {
            }
            endLoading();
        }
    });
}

function generateReviewRecordHtml(data){
    if(data){
      $("#practiceScore").text(data.scorePractice);
      $("#theoryScore").text(data.scoreTheory);
      $("#oper").html("<a href='"+getContentPath()+"/checkGrade/eCertificate/"+data.id+"' target='_blank'><i class='icon-print bigger-120'></i> 打印成绩单</a>");
      /*
      var tr="<tr>";
        tr+="<td>"+data.scoreTheory+"</td>"
        tr+="<td>"++"</td>"
        tr+="<td><a href='"+getContentPath()+"/checkGrade/eCertificate/"+data.id+"' target='_blank'>详情</a></td>"
        tr+="</tr>"
        $("#reviewResult tbody").empty();
        $("#reviewResult tbody").append(tr);*/

        if(data.scoreReview==Constant.ExamResultStatus.ExamResultPassed){
            $("#reviewResult").html( '<div class="aduit aduit-succ"></div>');
        }else if(data.scoreReview==Constant.ExamResultStatus.ExamResultNoPassed){
            $("#reviewResult").html( '<div class="aduit aduit-danger"></div>');
        }
    }
}

function clearReviewRecord(){
    $("#practiceScore").text("");
    $("#theoryScore").text("");
    $("#oper").html("");
    $("#reviewResult").html("");
}