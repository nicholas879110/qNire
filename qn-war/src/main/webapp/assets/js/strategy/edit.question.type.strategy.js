jQuery(function ($) {

    $("#qtype-buttons .btn").click(function(){
        var qtype=$(this).val();
        //alert(qtype);
//           var giCount=3;
        var rownum=$("#operate-qtsdList tbody tr").length;

        var  tr='<tr id="row_'+rownum+'" index="'+rownum+'">'+
            "<td><span name=\"questionTypeCode\">"+qtype+"</span></td>"+
            "<td><input type=\"text\" class=\"form-control\" name='title'/></td>"+
            "<td><input type=\"text\" class=\"form-control\" name='score'/ ></td>"+
            "<td><input type=\"text\" class=\"form-control\" name='easy'/ ></td>"+
            "<td><input type=\"text\" class=\"form-control\" name='normal'/></td>"+
            "<td><input type=\"text\" class=\"form-control\" name='hard'/></td>"+
            "<td><span></span></td>"+
            "<td>" +
            '<button class="btn btn-sm" type="button" onclick="upDom(this)"> 上移</button>'+
            '<button class="btn btn-sm" type="button" onclick="downDom(this)"> 下移</button>'+
            '<button class="btn btn-sm" type="button" onclick="removeDom(this)"> 删除</button>'+
//                   '<button class="btn btn-sm" type="button" onclick="assign(this)"> 配置难易</button>'+
            "</td>"+
            "</tr>";
        //$("<tr><td>插入3</td><td>插入</td><td>插入</td><td>插入</td></tr>").insertAfter($("#operate-qtsdList tbody tr:eq(1)"));
        $("#operate-qtsdList tbody").append(tr);
    })


    /**
     * 保存策略详细
     */
    $("#save-qts-button").click(function(){
        var $form_base=$("#add-qts-form");
        var qtsName=$form_base.find("input[name=name]").val();
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
            detail.title=$(dom).find("td input[name=title]").val();
            var score=$(dom).find("td input[name=score]").val();
            if(!score||$.trim(score)==''){
                bootBoxWarning("题型分数不能为空!");
                flag=false;
                return false;
            }
            if(!validNum(score)){
                bootBoxWarning("题型分数只能位数字!");
                flag=false;
                return false;
            }
            detail.score=score;
            detail.easyCount=$(dom).find("td input[name=easy]").val();
            detail.normalCount=$(dom).find("td input[name=normal]").val();
            detail.hardCount=$(dom).find("td input[name=hard]").val();
            detail.questionTypeCode=$(dom).find("td span[name=questionTypeCode]").text();
            details.push(detail);
        });
        if(flag){
            var data={
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
                    if(data.type==="success"){
                        alert(data.msg,"成功！");
                    }else{
                        alert(data.msg,"错误！");
                    }
                }
            });
        }
    });

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
    $(dom).parent().parent().remove();
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

function validNum(val){
    if(/^\d+$/.test(val)){
        return true;
    }
    return false;
}