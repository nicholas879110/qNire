jQuery(function ($) {

    $("#qtype-buttons .btn").click(function(){
           var qtype=$(this).val();
           var rownum=$("#operate-qtsdList tbody tr").length;
           var qtypeName="";
            switch (qtype){
                case Constant.QuestionType.FillBlank:
                    qtypeName=Constant.QuestionType.FillBlankName;
                    break;
                case Constant.QuestionType.SingleSelect:
                    qtypeName=Constant.QuestionType.SingleSelectName;
                    break;
                case Constant.QuestionType.MultiSelect:
                    qtypeName=Constant.QuestionType.MultiSelectName;
                    break;
                case Constant.QuestionType.Jduge:
                    qtypeName=Constant.QuestionType.JdugeName;
                    break;
                case Constant.QuestionType.QuestionAnswer:
                    qtypeName=Constant.QuestionType.QuestionAnswerName;
                    break;
                default :break;
            }
           if(!validHasQuestionType(qtype)){
           var  tr='<tr id="row_'+rownum+'" index="'+rownum+'">'+
               "<td><span name=\"detailId\" class='hide'></span><span name=\"questionTypeCode\" class='hide'>"+qtype+"</span><span>"+qtypeName+"</span></td>"+
               "<td><input type=\"text\" class=\"form-control\" name='title'/></td>"+
               "<td><input type=\"text\" class=\"form-control\" name='score'onblur='calculateScore(this)' onkeyup='validInputNum(this)'/ ></td>"+
               "<td><input type=\"text\" class=\"form-control\" name='easy'onblur='calculateRowTotal(this);calculateScore(this)'/ onkeyup='validInputNum(this)'></td>"+
               "<td><input type=\"text\" class=\"form-control\" name='normal' onblur='calculateRowTotal(this);calculateScore(this)'onkeyup='validInputNum(this)'/></td>"+
               "<td><input type=\"text\" class=\"form-control\" name='hard' onblur='calculateRowTotal(this);calculateScore(this)' onkeyup='validInputNum(this)'/></td>"+
               "<td><span name=\"rowTotal\"></span></td>"+
               "<td>" +
                   '<button class="btn btn-sm" type="button" onclick="upDom(this)">上移</button>'+
                   '<button class="btn btn-sm" type="button" onclick="downDom(this)">下移</button>'+
                   '<button class="btn btn-sm" type="button" onclick="removeDom(this)">删除</button>'+
//                   '<button class="btn btn-sm" type="button" onclick="assign(this)"> 配置难易</button>'+
               "</td>"+
               "</tr>";
           //$("<tr><td>插入3</td><td>插入</td><td>插入</td><td>插入</td></tr>").insertAfter($("#operate-qtsdList tbody tr:eq(1)"));
           $("#operate-qtsdList tbody").append(tr);
           }else{
              bootBoxWarning("题型分布策略中每种题型只能有一种")
           }
    })


    /**
     * 保存策略详细
     */
    $("#save-qts-button").click(function(){
        var $form_base=$("#add-qts-form");
        var qtsName=$form_base.find("input[name=name]").val();
        var qtsId=$form_base.find("input[name=id]").val();
        if(!qtsName||$.trim(qtsName)==''){
            bootBoxWarning("策略名称不能为空!");
            return;
        }
        var detailRows=$("#operate-qtsdList tbody tr");
        var details=[];
        var flag=true;
        $.each(detailRows,function(index,dom){
            var detail=new Object();
            detail.order=index;
            detail.id=$(dom).find("td span[name=detailId]").text();
            detail.title=$(dom).find("td input[name=title]").val();
            var score=$(dom).find("td input[name=score]").val();
            if(!score||$.trim(score)==''){
                bootBoxWarning("第"+(index+1)+"题型分数不能为空!");
                flag=false;
                return false;
            }
            if(!validNum(score)){
                bootBoxWarning("第"+(index+1)+"题型分数只能位数字!");
                flag=false;
                return false;
            }
            detail.score=score;


            var easyCount=$(dom).find("td input[name=easy]").val();
            if(!easyCount||$.trim(easyCount)==''){
                bootBoxWarning("第"+(index+1)+"简单题目道数不能为空!");
                flag=false;
                return false;
            }
            if(!validNum(easyCount)){
                bootBoxWarning("第"+(index+1)+"简单题目道数只能位数字!");
                flag=false;
                return false;
            }
            detail.easyCount=easyCount;

            var normalCount=$(dom).find("td input[name=normal]").val();
            if(!normalCount||$.trim(normalCount)==''){
                bootBoxWarning("第"+(index+1)+"普通题目道数不能为空!");
                flag=false;
                return false;
            }
            if(!validNum(normalCount)){
                bootBoxWarning("第"+(index+1)+"普通题目道数只能位数字!");
                flag=false;
                return false;
            }
            detail.normalCount=normalCount;

            var hardCount=$(dom).find("td input[name=hard]").val();
            if(!hardCount||$.trim(hardCount)==''){
                bootBoxWarning("第"+(index+1)+"普通题目道数不能为空!");
                flag=false;
                return false;
            }
            if(!validNum(hardCount)){
                bootBoxWarning("第"+(index+1)+"普通题目道数只能位数字!");
                flag=false;
                return false;
            }
            detail.hardCount=hardCount;
            detail.questionTypeCode=$(dom).find("td span[name=questionTypeCode]").text();
            details.push(detail);
        });
        if(flag){
            var data={
                id:qtsId,
                name:qtsName,
                totalScore:$form_base.find("input[name=totalScore]").val(),
                passScore:$form_base.find("input[name=passScore]").val(),
                qtStrategyDetailList:details
            }
            $.ajax({
                url : getContentPath()+"/qts/save",
                type : 'post',
                dataType : 'json',
                contentType:'application/json',
                data : JSON.stringify(data),
                success: function (data, textStatus, jqXHR) {
                    if(data.code===0){
                        //bootBoxSuccess(data.msg);
                        switchPage("/qts/init");
                    }else{
                        bootBoxError(data.msg);
                    }
                }
            });
        }
    });

    $("#back").click(function(){
        back();
    })

});


function upDom(dom){
    //var sData = $('#operate-qtsdList').dataTable().fnGetData($(dom).parents("#questionList tbody tr").get(0));
//    var index=$('#operate-qtsdList').dataTable().fnGetPosition($(dom).parents("#operate-qtsdList tbody tr").get(0))
//    var nNodes = $('#operate-qtsdList').dataTable().fnGetNodes(index);
//
////    var currentRow=$('table:first tbody tr:eq('+index+')');
////    //要添加的行的id
////    //var addRowID=currentRowID+1;
////    var str = "<tr id = '"+12321+"'><td>"+3213+"</td><td>row"+321321+"</td>"+
////        "<td><input id= '"+3213+"' type='button' value='添加行' onclick='addRowByID(this.id);' /></td></tr>";
////    //当前行之后插入一行
////    currentRow.after(str);
//
////    $('#operate-qtsdList').dataTable().fnCreatedRow();
//    $('#operate-qtsdList').dataTable().fnAddDataInRowIndex([
//        "dsajdskas",
//        "dsajdska",
//        "",
//        "",
//        "",
//        "" ],true,1);
//
//    if(index==0){
//        alert("第一行不能上移");
//        return ;
//    }else{
////        $('#operate-qtsdList').dataTable().fnDeleteRow( index);
//        index=index-1;
//        var nNodes0 = $('#operate-qtsdList').dataTable().fnGetNodes(index);
//        console.dir(nNodes);
//        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
//        console.dir($(nNodes0).html());
//        //$('#operate-qtsdList').dataTable().fnSort( [ [0,'asc'], [1,'asc'] ] );
//        //nNodes0[0].insertBefore(nNodes);
//    }

//    var new_line = $('#example').dataTable().fnAddData();
//    var newTr = $('#example').dataTable().fnSettings().aoData[new_line[0]].nTr;
    //$(dom).parent().parent().remove();
    var row=$(dom).parent().parent();
    //var rownum=row.attr("index");
    var pre=row.prev();//获取前一兄弟节点
//    console.dir(pre);
    if(pre.length!=0){
        row.insertBefore(pre);
    }else{
        alert("第一行不能上移");
    }
}

function downDom(dom){
    var row=$(dom).parent().parent();
    //var rownum=row.attr("index");
    var nex=row.next();//获取前一兄弟节点
    if(nex.length!=0){
        row.insertAfter(nex);
    }else{
        alert("最后一行不能下移");
    }
}

function removeDom(dom){
    var row=$(dom).parent().parent();
    var detailId=row.find("td span[name=detailId]").text();
    if(!($.trim(detailId)=="")){
        $.ajax({
            url : getContentPath()+"/qts/dd",
            type : 'post',
            dataType : 'json',
            data : {
                id:detailId
            },
            success: function (data, textStatus, jqXHR) {
                if(data.code!=0){
                    bootBoxError(data)
                }else if(data.code==0){
                    $(dom).parent().parent().remove();
                }
            }
        });
    }else{
        $(dom).parent().parent().remove();
    }

}

//function assign(dom){
//    var rowId=$(dom).parent().parent().attr("id");
//    if (rowId) {
//        //根据文件Id查询会议文件对象再更新
//        var dialog = $( "#dialog-assign-qty-count" ).removeClass('hide').dialog({
//            modal: true,
//            width:670,
//            title: "<div class='widget-header widget-header-small'><h4 class='smaller'>配置题型难易数量</h4></div>",
//            title_html: true,
//            open: function( event, ui ) {
//                var $form = $('#assign-qty-count-form');
//                $form.find("input[name=rowId]").val(rowId);
//            },
//            close: function( event, ui ) {
//                $('#assign-qty-count-form')[0].reset();
//                dialog.dialog("destroy");
//            },
//            buttons: [ {
//                text: "取消",
//                "class" : "btn btn-xs",
//                click: function() {
//                    $( this ).dialog( "close" );
//                }
//            },
//                {
//                    text: "确认",
//                    "class" : "btn btn-primary btn-xs",
//                    click: function() {
//                        var $form = $('#assign-qty-count-form');
//                        var rowId=$form.find("input[name=rowId]").val();
//                        var $form.find("input[name=rowId]").val(rowId);
//                        $form.find("input[name=rowId]").val(rowId);
////                        $.ajax({
////                            url : "${ctx}/mtAgenda/updateAgenda.do",
////                            type : $form.attr('method'),
////                            processData : false,
////                            contentType : false,
////                            dataType : 'json',
////                            data : fd,
////                            success: function (data, textStatus, jqXHR) {
////                                if(data.is){
////                                    $('#agendaList').dataTable().fnClearTable();
////                                }else{
////                                    alert(data.msg,"错误！");
////                                }
////                            },
////                            error: function (jqXHR, textStatus, errorThrown) {
////                                alert("服务器异常，请联系管理员！", "错误");
////                            }
////                        });
////                        dialog.dialog("close");
//                    }
//                }
//            ]
//        });
//    }
//}


//注意input的id和tr的id要一样
 function addRowByID(currentRowID){
            //遍历每一行，找到指定id的行的位置i,然后在该行后添加新行

            $.each( $('table:first tbody tr'), function(i, tr){
                    if($(this).attr('id')==currentRowID){
                            //获取当前行
                            var currentRow=$('table:first tbody tr:eq('+i+')');
                            //要添加的行的id
                            var addRowID=currentRowID+1;
                            str = "<tr id = '"+addRowID+"'><td>"+addRowID+"</td><td>row"+addRowID+"</td>"+
                              "<td><input id= '"+addRowID+"' type='button' value='添加行' onclick='addRowByID(this.id);' /></td></tr>";
                           //当前行之后插入一行
                            currentRow.after(str);
                        }
                });
 }

function validHasQuestionType(qtype){
    var flag=false;
    $.each( $('table:first tbody tr'), function(i, tr){
        var qt=$(this).find("td span[name=questionTypeCode]").text();
        if(qt==qtype){
            flag=true;
            return false;
        }
    })
    return flag;
}

function validNum(val){
    if(/^\d+$/.test(val)){
        return true;
    }
    return false;
}

//重新计算全局分数
function calculateScore(dom){
    var detailRows=$("#operate-qtsdList tbody tr");
    var totalScore=0;
    $.each(detailRows,function(index,dom){
        var score=$(dom).find("td input[name=score]").val();
        var easyCount=$(dom).find("td input[name=easy]").val();
        var normalCount=$(dom).find("td input[name=normal]").val();
        var hardCount=$(dom).find("td input[name=hard]").val();
        if($.trim(score)==""){
            score=0;
        }
        totalScore+=parseInt(score)*(parseInt(easyCount)+parseInt(normalCount)+parseInt(hardCount));
    });
    $("#add-qts-form input[name=totalScore]").val(totalScore);
}

//计算行中简单、普通、困难题目总道数
function calculateRowTotal(dom){
    var row=$(dom).parent().parent();
    var easyCount=row.find("td input[name=easy]").val();
    var normalCount=row.find("td input[name=normal]").val();
    var hardCount=row.find("td input[name=hard]").val();
    if($.trim(easyCount)==""){
        easyCount=0;
    }
    if($.trim(normalCount)==""){
        normalCount=0;
    }
    if($.trim(hardCount)==""){
        hardCount=0;
    }
    var totalNum=parseInt(easyCount)+parseInt(normalCount)+parseInt(hardCount);
    row.find("td span[name=rowTotal]").text(totalNum);

}


function validInputNum(dom){
    var inVal=$(dom).val();
    if(!validNum(inVal)){
       bootBoxWarning("请输入数字");
       return;
    }
}

function back(){
    switchPage("/qts/init");
}