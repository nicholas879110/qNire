////////////////////////////////////////////////////////////
// Copyright (C) 2014-2015 云扬科技.
// 版本说明           V1.0.0
// 开发者             zhangliewei@gogighedu.com
// 创建时间           2014.08.01
// 文件描述           题库管理界面
////////////////////////////////////////////////////////////
var CustomPager = {
    iTotal: 0, //总记录数
    pageNo: 0,//当前页面
    iDisplayLength: 10,//每页显示记录数
    getCurrentDispalyStart: function () {
        return (this.pageNo-1) * this.iDisplayLength;
    }
}

jQuery(function ($) {

    /* var settingCustom = {
     id: 'pId',
     name: 'parentCategoryName',
     treeId: 'category-tree',
     divId:'select-zTree'
     }
     TreeLoader.loadCategoryTree(settingCustom);*/

    pagerQuestionList();
    $("#add-question").click(function () {
        switchPage("/question/add");
    })


    $('textarea').autosize({append: "\n"});


    $("#search-button").click(function(){
        CustomPager.pageNo=0;
        pagerQuestionList();
    })


});



function pagerQuestionList() {
    //查询参数
    if(CustomPager.pageNo==0){
        CustomPager.pageNo+=1;
    }

    $.ajax({
         url: getContentPath()+'/question/ql',
         type: 'post',
         dataType: "json",
         data: {
             iDisplayStart:CustomPager.getCurrentDispalyStart(),
             iDisplayLength:CustomPager.iDisplayLength,
         //查询参数
             title:$("#search-form input[name=title]").val(),
             questionTypeCode:$("#search-form select[name=questionTypeCode]").children('option:selected').val(),
             level:$("#search-form select[name=level]").children('option:selected').val()
         },
         success: function (data, textStatus, jqXHR) {
             //console.dir(data);
             if(data&&data.iTotalRecords){
                var totalPage=getTotalPage(data.iTotalRecords,CustomPager.iDisplayLength);
                generatePageData(data.aaData);
                CustomPager.pageNo=generatePageHtml(CustomPager.pageNo,totalPage,data.iTotalRecords);
             }
         }
     });
}


function getTotalPage(iTotal,iDisPlayLength){
    if(iDisPlayLength!=0){
        return Math.floor(iTotal/iDisPlayLength)+1;
    }
    return 1;
}

function generatePageHtml(pageNo, totalPage, totalRecords) {
    //生成分页
    //有些参数是可选的，比如lang，若不传有默认值
//    alert(pageNo);
//    alert(totalPage);
//    $("#kkpager").html("")
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        mode: 'click',
        //链接前部
        //hrefFormer: 'pager_test',
        //链接尾部
        //hrefLatter: '.html',
//        getLink: function (n) {
//            return this.hrefFormer + this.hrefLatter + "?pno=" + n;
//        }
        click: function (n) {
            //这里可以做自已的处理
            //...
            //处理完后可以手动条用selectPage进行页码选中切换
            CustomPager.pageNo = n;
            pagerQuestionList();
            this.selectPage(n);
        },
        //getHref是在click模式下链接算法，一般不需要配置，默认代码如下
        getHref: function (n) {
            return '#';
        }
        /*
         ,lang : {
         firstPageText : '首页',
         lastPageText : '尾页',
         prePageText : '上一页',
         nextPageText : '下一页',
         totalPageBeforeText : '共',
         totalPageAfterText : '页',
         totalRecordsAfterText : '条数据',
         gopageBeforeText : '转到',
         gopageButtonOkText : '确定',
         gopageAfterText : '页',
         buttonTipBeforeText : '第',
         buttonTipAfterText : '页'
         }*/
        //,
        //mode : 'click',//默认值是link，可选link或者click
        //click : function(n){
        // this.selectPage(n);
        // return false;
        //}
    });
    return pageNo;
}

/**
 * 将分页查询后的数据拼接至页面
 * @param data
 */
function  generatePageData(data){
    var questionList="";
    //console.dir(questionList);
    $(data).each(function(i,item) {
        var level=item.level;
        var levelName="";
        switch (level){
            case Constant.QtypeLevel.Simple:
                levelName=Constant.QtypeLevel.SimpleName;
                break;
            case Constant.QtypeLevel.Normal:
                levelName=Constant.QtypeLevel.NormalName;
                break;
            case Constant.QtypeLevel.Hard:
                levelName=Constant.QtypeLevel.HardName;
                break;
            default :break;
        }
        var testDiv=questionDiv.replace("{id}",item.id).replace("{qtype}",item.questionTypeName).replace("{title}",item.title)
            .replace("{content}",item.content) .replace("{level}",levelName).replace("{answer}",item.answer)
            .replace("{analysis}",item.analysis).replace("{modifyTime}",item.modifyTime)
            .replace("{fkModifyUserName}",item.fkModifyUserName).replaceAll("\n","<br>")
            .replace("{knowledge}",item.kpName);
        questionList+=testDiv;
    });
//    console.dir(questionList);
//    console.log(questionList.toString());
   $("#questionList").html(questionList);


}

var questionDiv="<div class=\"test-list\">\
        <span class=\"box-tag\"><a href=\"javascript:void(0);\" onclick=\"updateQuestion('{id}')\" class=\"label label-success\">编缉</a><a href=\"javascript:void(0);\" onclick=\"delQuestion('{id}')\" class=\"label label-danger\">删除</a></span>\
        <div class=\"test-cont\">\
            <h5><span class=\"red\">【{qtype}】</span>{title}</h5>\
            {content}\
        </div>\
        <hr class=\"hr-10\" style=\"margin-top:17px;\">\
            <div class=\"test-summary\">\
                <table>\
                    <tr><th width=\"65\">难  度：</th><td><span class=\"red\">{level}</span></td></tr>\
                    <tr><th>答  案：</th><td><sapn class=\"orange\">{answer}</sapn></td></tr>\
                    <tr><th>试题解析：</th><td>{analysis}</td></tr>\
                    <tr><th>知识点：</th><td>{knowledge}</td></tr>\
                </table>\
            </div>\
            <hr class=\"hr-10\" style=\"margin-bottom:17px;\">\
                <div class=\"test-summary\">\
                    <p>创建时间：<srong class=\"green\">{modifyTime}</srong></p>\
                    <p>创建人：<srong class=\"green\">{fkModifyUserName}</srong></p>\
                </div>\
            </div>";
            /*<!--<p>状态：<srong class=\"green\">启用</srong></p>-->*/



function StringBuffer() {
    this._strs = new Array;
}
StringBuffer.prototype.append = function (str) {
    this._strs.push(str);
}
StringBuffer.prototype.toString = function() {
    this._strs.join("");
}


function delQuestion(qid){
    $.ajax({
        url: getContentPath()+'/question/del/'+qid,
        type: 'post',
        dataType: "json",
        data: {
//            iDisplayStart:CustomPager.getCurrentDispalyStart(),
//            iDisplayLength:CustomPager.iDisplayLength
            //查询参数
        },
        success: function (data, textStatus, jqXHR) {
            //console.dir(data);
            if(data.type="success"){
                switchPage("/question/init")
            }
        }
    });
}

function updateQuestion(id){
    switchPage("/question/ei/"+id);
}