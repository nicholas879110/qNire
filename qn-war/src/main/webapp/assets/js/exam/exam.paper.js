if(window.localStorage){

} else{
    bootBoxWarning("你的浏览器不支持Html5缓存");
}

/**
 *questionId对应的值即为answer
 * @type {{examId: string, answers: {questionId: string}}}
 */
var examPaper={
    paperId:'',
    answers:[
//        {
//            id:"",
//            type:"",
//            answer:""
//        }
    ]
}

function getUserAnswerInArray(id,answers){
    var temp=null;
    if(!id|| $.trim(id)==""){
        return null;
    }
    $.each(answers,function(index,item){
        if(item.id==id){
            temp=item;
            return false;
        }
    })
    return temp;
}

jQuery(function ($) {
    var paperId=$("#examPaperId").val();
    examPaper.paperId=paperId;
    var examStatus=$("#examStatus").val();//只有还在继续考试（考试中才能加在本地数据）
    if(window.localStorage){
        var obj=window.localStorage.getItem("examPaper");

        if (obj){
            var localExamPager=JSON.parse(obj);
//            console.dir(localExamPager);
            if(localExamPager.paperId===paperId){
                $.each(localExamPager.answers,function(index,item){
                    var questionType=item.type;
                    switch (questionType){
                        case Constant.QuestionType.SingleSelect:
                            var dom=  $(".test-list .question-answer input[name=answer-input-"+item.id+"]");
                            if(dom){
                                $(".test-list .question-answer input[name=answer-input-"+item.id+"][value="+item.answer+"]").attr("checked", true);
                            }
                            break;
                        case Constant.QuestionType.MultiSelect:
                            var dom=  $(".test-list .question-answer input[name=answer-input-"+item.id+"]");
                            if(dom){
                                var answer=item.answer;
                                var tempAnswers=answer.split(",");
                                $.each(tempAnswers,function(index,value){
                                    $(".test-list .question-answer input[name=answer-input-"+item.id+"][value="+value+"]").attr("checked", true);
                                })
                            }
                            break;
                        case Constant.QuestionType.Jduge:
                            var dom=  $(".test-list .question-answer input[name=answer-input-"+item.id+"]");
                            if(dom){
                                $(".test-list .question-answer input[name=answer-input-"+item.id+"][value="+item.answer+"]").attr("checked", true);
                            }
                            break;
                        case Constant.QuestionType.FillBlank:
                        case Constant.QuestionType.QuestionAnswer:
                            var dom=  $(".test-list .question-answer textarea[name=answer-input-"+item.id+"]");
                            if(dom){
                                $(".test-list .question-answer textarea[name=answer-input-"+item.id+"]").val(item.answer)
                            }
                            break;
                        default :break;
                    }

                })
            }
        }
    }


    $(".test-list .question-answer input[type=radio]").click(function(){
        var answer=$(this).parent().find("input:checked").val();
        var questionId= $(this).attr("name").substr(13);
        var answers=examPaper.answers;
        var type=$(this).parent().parent().parent().find("input[name=questionType]").val();
        var obj=getUserAnswerInArray(questionId,answers);
//        console.dir(obj);
//        console.dir(window.localStorage.examPaper);
        if(window.localStorage){
            if(obj==null){
                answers.push({
                    id:questionId,
                    type:type,
                    answer:answer
                })
            }else{
                obj.id=questionId;
                obj.type=type;
                obj.answer=answer;
            }
        }
        window.localStorage.examPaper=JSON.stringify(examPaper);
    })

    $(".test-list .question-answer input[type=checkbox]").click(function(){
        var tempAnswers=[];
        var boxs=$(this).parent().parent().find("input[type=checkbox]:checked");
        $(boxs).each(function(index,obj){
            tempAnswers.push($(this).val());
        })
        var answer=tempAnswers.join(",");
        var questionId= $(this).attr("name").substr(13);
        var answers=examPaper.answers;
        var type=$(this).parent().parent().parent().find("input[name=questionType]").val();
        var obj=getUserAnswerInArray(questionId,answers);
        if(window.localStorage){
            if(obj==null){
                examPaper.answers.push({
                    id:questionId,
                    type:type,
                    answer:answer
                })
            }else{
                obj.id=questionId;
                obj.type=type;
                obj.answer=answer;
            }
        }
        localStorage.examPaper=JSON.stringify(examPaper);

    })

    $(".test-list .question-answer textarea").on("blur",function(){
        var answer=$(this).val();
        var questionId= $(this).attr("name").substr(13);
        var answers=examPaper.answers;
        var type=$(this).parent().parent().parent().find("input[name=questionType]").val();
        var obj=getUserAnswerInArray(questionId,answers);
        if(window.localStorage){
            if(obj==null){
                answers.push({
                    id:questionId,
                    type:type,
                    answer:answer
                })
            }else{
                obj.id=questionId;
                obj.type=type;
                obj.answer=answer;
            }
        }
        window.localStorage.examPaper=JSON.stringify(examPaper);
    })

    var certCode=$("input[name=certCode]").val();
    var testType=$("input[name=testType]").val();
    var examContentType=$("input[name=examContentType]").val();


//    doObtainQuestions(certCode,testType,examContentType);

    $("#submitExam").click(function(){
        var paperId=$("input[name=examPaperId]").val();
        var answers=[];
        var noAnswers=[];
        $(".test-list").each(function(index, obj){
            //题目类型
            var questionType= $(obj).find("input[name=questionType]").val()
            var questionId= $(obj).find("input[name=questionId]").val();
            var questionNum=$(obj).parent().find(".panel-heading span").text()+"  "+$(obj).find(".test-cont .test-tit span").text();
            var temp=new Object();
            temp.id=questionId;
            var answer="";
            switch (questionType){
                case Constant.QuestionType.SingleSelect:

                    if( $(obj).find(".question-answer input[type='radio']:checked").val()){
                        answer= $(obj).find(".question-answer input[type='radio']:checked").val();
                    }

                    break;
                case Constant.QuestionType.MultiSelect:
                    var tempAnswers=[];
                    var boxs=$(obj).find(".question-answer input[type='checkbox']:checked");
                    $(boxs).each(function(index,obj){
                        tempAnswers.push($(this).val());
                    })
                    answer=tempAnswers.join(",");
                    break;
                case Constant.QuestionType.Jduge:
                    answer=$(obj).find('.question-answer input:radio:checked').val();
                    break;
                case Constant.QuestionType.FillBlank:
                    answer=$(obj).find('.question-answer textarea[name=answer-input]').val();
                    break;
                case Constant.QuestionType.QuestionAnswer:
                    answer=$(obj).find('.question-answer textarea[name=answer-input]').val();
                    break;
                default :break;
            }
            if(!answer|| $.trim(answer)==""){
                        noAnswers.push(questionNum);
            }
            temp.userAnswer=answer;
            answers.push(temp);

        });

        var examResult={
            certCode:certCode,
            paperId:paperId,
            paperResultDetails:answers
        }

        if(noAnswers.length>0){
            bootBoxConfirm("您有<br>"+noAnswers.join("<br>")+"<br>题未完成，是否确认提交?",function(p){
                if(p){
                    doAjaxSubmit(examResult);
                }
            })
        }else{
            doAjaxSubmit(examResult);
        }
    });


    $("#checkExam").click(function(){
        var noAnswers=[];
        $(".test-list").each(function(index, obj){
            //题目类型
            var questionType= $(obj).find("input[name=questionType]").val()
            var questionId= $(obj).find("input[name=questionId]").val();
            var questionNum=$(obj).parent().find(".panel-heading span").text()+"  "+$(obj).find(".test-cont .test-tit span").text();
            var answer="";
            switch (questionType){
                case Constant.QuestionType.SingleSelect:
                    if( $(obj).find(".question-answer input[type='radio']:checked").val()){
                        answer= $(obj).find(".question-answer input[type='radio']:checked").val();
                    }
                    break;
                case Constant.QuestionType.MultiSelect:
                    var tempAnswers=[];
                    var boxs=$(obj).find(".question-answer input[type='checkbox']:checked");
                    $(boxs).each(function(index,obj){
                        tempAnswers.push($(this).val());
                    })
                    answer=tempAnswers.join(",");
                    break;
                case Constant.QuestionType.Jduge:
                    answer=$(obj).find('.question-answer input:radio:checked').val();
                    break;
                case Constant.QuestionType.FillBlank:
                    answer=$(obj).find('.question-answer textarea[name=answer-input]').val();
                    break;
                case Constant.QuestionType.QuestionAnswer:
                    answer=$(obj).find('#question-answer textarea[name=answer-input]').val();
                    break;
                default :break;
            }
            if(!answer|| $.trim(answer)==""){
                noAnswers.push(questionNum);
            }

        });
        if(noAnswers.length>0){
            bootBoxSuccess("您有<br>"+noAnswers.join("<br>")+"<br>题未完成")
        }else{
            bootBoxSuccess("所有题目已全部完成");
        }
    })



})


function doObtainQuestions(certCode,testType,examContentType){
    $.ajax({
        url: getContentPath()+'/exam/do/doTest',
        type: 'post',
        dataType: "json",
        data: {
            certCode:certCode,
            testType:testType,
            examContentType:examContentType
        },
        success: function (data, textStatus, jqXHR) {
            if(data.code==0){
                generateExamHtml(data.result);
            }else{
                bootBoxError(data.msg)
            }
        }
    });

}

function generateExamHtml(data){

    if(data){
        console.dir(data)
        if(data.status==0){
            bootBoxWarning("考试策略未发布，请联系管理员");
            return;
        }
        if(data.status==1){
            bootBoxWarning("考试策略分布策略未发布，请联系管理员");
            return;
        }
        if(data.status==2){
            bootBoxWarning("题库未能抽取到题目，请联系管理员");
            return;
        }
        var html="";
        var bigQuestions=data.questionList;
        if(bigQuestions&&bigQuestions.length>0){
            var bigquestion_html="";
            $.each(bigQuestions,function(index,item){
                var order=item.order;
                var questions=item.questions;
                var questionTypeCode=item.questionTypeCode;
                var question_html="";

                if(questions&&questions.length>0){
                    $.each(questions,function(qIndex,qItem){
                        var questionType=qItem.questionType;
                        var answerInput="";
                        var answerHead="";
                        switch (questionType){
                            case Constant.QuestionType.SingleSelect:
                                answerInput=generateSingleSelectHtml(qItem.optionCount,qItem.id);
                                answerHead=Constant.AnswerHead.SelectAnswer;
                                break;
                            case Constant.QuestionType.MultiSelect:
                                answerInput=generateMultiSelectHtml(qItem.optionCount)
                                answerHead=Constant.AnswerHead.SelectAnswer;
                                break;
                            case Constant.QuestionType.Jduge:
                                answerInput=generateJdugeHtml();
                                answerHead=Constant.AnswerHead.SelectAnswer;
                                break;
                            case Constant.QuestionType.FillBlank:
                                answerInput=generateTextAreaHtml();
                                answerHead=Constant.AnswerHead.FillAnswer;
                                break;
                            case Constant.QuestionType.QuestionAnswer:
                                answerInput=generateTextAreaHtml();
                                answerHead=Constant.AnswerHead.FillAnswer;
                                break;
                            default :break;
                        }

                        question_html+=questionHtml.replace("{questionType}",qItem.questionType).replace("{questionId}",qItem.id)
                            .replace("{questionTitle}","<span>第"+(qIndex+1)+"题</span>："+qItem.title).replace("{questionContent}",qItem.content)
                            .replace("{answerHead}",answerHead).replace("{optionContent}",answerInput).replaceAll("\n","<br>");
                    });
                    bigquestion_html+=bigQuestionHtml.replace("{bigQuestionHead}",questionHeadHtml.replace("{qtName}","<span>第"+(index+1)+"部分</span>&nbsp&nbsp&nbsp&nbsp"+Constant.QuestionType.decideQuestionTypeName(questionTypeCode)))
                        .replace("{bigQuestionContent}",question_html);
                }
            })

            $("#questionList").html(bigquestion_html);
            $("input[name=examPaperId]").val(data.id);
        }
    }


}

var questionHeadHtml='<div class="panel-heading">\
    <h5 class="panel-title">{qtName}</h5>\
</div>';

var bigQuestionHtml='<div class="panel panel-default">{bigQuestionHead}{bigQuestionContent}</div>';

var questionHtml=' <div class="test-list">\
    <div class="test-cont">\
        <h5 class="test-tit">{questionTitle}</h5>\
        <input type="text" hidden="true" name="questionType" value="{questionType}">\
        <input type="text" hidden="true" name="questionId" value="{questionId}">\
        <p class="test-text">{questionContent}</p>\
    </div>\
    <div class="test-bottom bg bolder question-answer">\
        <srong class="grey">{answerHead}:</srong>\
        {optionContent}\
    </div>\
</div>';

/*var optionHtml='<label class="margin-right-20">\
    <input name="form-field-radio" type="radio" class="ace">\
        <span class="lbl">{option}</span>\
    </label>';*/


function generateSingleSelectHtml(optionCount,id){
    var singleSelectHtml="";
    var startOption="A";
    var startOptionCode=65;
    for(var i=0;i<optionCount;i++){
        var temp="<label class=\"margin-right-20\"><input name=\"answer-input-"+id+ "\" type=\"radio\" class=\"ace\" value=\""+String.fromCharCode(startOptionCode+i)+"\"/><span class=\"lbl\">"+String.fromCharCode(startOptionCode+i)+"</span></label>"
        singleSelectHtml+=(temp);
    }
    return singleSelectHtml;
}

function generateMultiSelectHtml(optionCount){
    var multiSelectHtml="";
    var startOption="A";
    var startOptionCode=65;
    for(var i=0;i<optionCount;i++){
        var temp="<label class=\"margin-right-20\"><input name=\"answer-input\" type=\"checkbox\" class=\"ace\" value=\""+String.fromCharCode(startOptionCode+i)+"\"/><span class=\"lbl\">"+String.fromCharCode(startOptionCode+i)+"</span></label>"
        multiSelectHtml+=(temp);
    }
    return multiSelectHtml.toString();
}

function generateJdugeHtml(){
    var temp="<label class=\"margin-right-20\"><input name=\"answer-input\" type=\"radio\" class=\"ace\" value=\"0\"/><span class=\"lbl\">正确</span></label>"+
        "<label class=\"margin-right-20\"><input name=\"answer-input\" type=\"radio\" class=\"ace\" value=\"1\"/><span class=\"lbl\">错误</span></label>";
    return temp;
}

function generateTextAreaHtml(){
    var temp='<textarea name="answer-input" class="form-control" name="title" placeholder=""></textarea>';
    return temp;
}


function doAjaxSubmit(details){
    console.dir(details);
    $.ajax({
        url : getContentPath()+"/exam/do/submitExam",
        type : "post",
        dataType : 'json',
        contentType:'application/json',
        data : JSON.stringify(details),
        success: function (data, textStatus, jqXHR) {
            if(data.code==0){
                //取出examResultId
                /*var  examResultId=data.obj;
                switchPage("/exam/examResultPaper.do",{"examResultId":examResultId});*/
//                bootBoxSuccess(data.msg);
                clearLocalStoragy();
                var isShowAnalysis=$("#isShowAnalysis").val();
                if(isShowAnalysis==1){
                    top.location.href=getContentPath()+"/exam/do/show/analysis/"+$("#examPaperId").val();
                }else{
                    bootBoxSuccess(data.msg)
                }
            }else{
                bootBoxError(data.msg)
            }
        }
    });
}

function clearLocalStoragy(){
    var storage = window.localStorage;
    if (!storage.getItem("examPaper"))
        storage.removeItem("examPaper");
}