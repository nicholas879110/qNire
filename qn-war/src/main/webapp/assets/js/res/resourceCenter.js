/**
 * Created by wksc007 on 2014/10/11.
 *  资源中心
 */
$(function () {
    var certificate= "";
    var course= "";
    var size="7";
    //搜索框
    var searchBox = "<ul><li class=\"border-bottom\"><span class=\"input-icon middle margin-right-5\">" +
        "<i class=\"icon-search\"></i><input type=\"text\" placeholder=\"录入关键词搜索课件\" class=\"nav-search-input\" name=\"searchValue\">" +
        "</span><a href=\"#\" class=\"btn btn-primary btn-sm middle\">搜索</a></li></ul>"
    //加载证书数据
    function updateCertificate(category) {
        $.ajax({
            url:getContentPath()+"/resource/center/certificate.do",
            type:"POST",
            data: {category:category},
            dataType:"json",
            success:function(data){
                showCertificate(data);
                certificate=data;
            }
        });
    };

    //类别点击事件
    $("#resource").on('click', '.search-row a[data-type=category]', function (e) {
        $(".search-row-bd").find(".search-row-con").eq(1).find(".border-bottom").remove();
        if($(this).text()==Constant.ProfessionCategory.cert.name) {
            $(".search-row-hd").eq(1).text("证书");
            updateCertificate(Constant.ProfessionCategory.cert.code);
        }
        else if($(this).text()==Constant.ProfessionCategory.jobTitle.name) {
            $(".search-row-hd").eq(1).text("职称");
            updateCertificate(Constant.ProfessionCategory.jobTitle.code);
        }
        //控制 .search-box div的底边框属性
        if (!$(this).hasClass('all')){
            $(".search-box").eq(2).css("border-bottom","");
        }
    });

    //显示证书
    function showCertificate(data,type){
        $(".search-row-bd").find(".search-row-con").eq(1).parent().find("search-row-more").remove();
        if(data.length>size) {
            $(".search-row-bd").find(".search-row-con").eq(1).parent().before("<div class=\"search-row-more\"><a href=\"#\" class=\"more\">展开更多 <i class=\"icon-angle-down\"></i></a></div>");
            var html="";
            for(var i=0;i<size;i++)
                html+="<span class=\"border-bottom\"><a class=\"tab\" data-type=\"certificate\" data-count=\'"+data[i].count+"\' data-id=\'"+data[i].key+"\' data-level=\'"+data[i].level+"\' href=\"#\">"+data[i].value+"</a></span>";
            $(".search-row-bd").find(".search-row-con").eq(1).append(html);
        }
        else {
            var html = "";
            for (var i = 0; i < data.length; i++)
                html += "<span class=\"border-bottom\"><a class=\"tab\" data-type=\"certificate\" data-count=\'"+data[i].count+"\' data-id=\'" + data[i].key + "\' data-level=\'"+data[i].level+"\' href=\"#\">" + data[i].value + "</a></span>";
            $(".search-row-bd").find(".search-row-con").eq(1).append(html);
        }
        $("#resource").find(".search-row").eq(1).show();
    }

    //全局点击事件，活动标签切换
    $(".search-box:not(.search-cond) ").on('click', 'a:not(.more)', function (e) {
        var brother = $(this).parents('.search-box').index();
        //下层显示移除
        removeNextCondition($(this));
        //原有搜索条件移除
        removeSearch();
        $(this).parents('.search-row').find('a').removeClass('on');
        if (!$(this).hasClass('all'))
            $(this).addClass('on');
        $("#resource").find(".search-cond").hide();
//        if (!$(this).hasClass('all') || ($(this).hasClass('all') && (brother=='1') || brother=='2')){
            $("#resource").find(".search-cond").show();
            showSearch();
            getCondition($(".search-box.search-cond").find("a.tab"));
            _freshTable();
//        }
        //控制 .search-box div的底边框属性
        if ($(this).hasClass('all') &&  brother!='2'){
            $(".search-box").eq(2).css("border-bottom","");
        }
    })

    //证书(或职称)点击事件
    $("#resource").on('click', '.search-row a[data-type=certificate]', function (e) {
        $(".search-row-bd").find(".search-row-con").eq(2).find(".border-bottom").remove();
        var html="";
        //证书
        var count = parseInt($(this).attr("data-count"));
        var rank = parseInt($(this).attr("data-level"));
        if(rank>0) {
            switch (rank) {
                case 1 :
                    html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='1' data-type='rank' href=\"#\">初级</a></span>";
                    break;
                case 2 :
                    html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='2' data-type='rank' href=\"#\">中级</a></span>";
                    break;
                case 3 :
                    html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='3' data-type='rank' href=\"#\">高级</a></span>";
                    break;
                case 4 :
                    html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='4' data-type='rank' href=\"#\">技师</a></span>";
                    break;
                case 5 :
                    html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='5' data-type='rank' href=\"#\">高级技师</a></span>";
                    break;
                default :
                    break;
            }
        }
        else if(count>0) {
            for (var i = 1; i <= count; i++) {
                switch (i) {
                    case 1 :
                        html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='1' data-type='rank' href=\"#\">初级</a></span>";
                        break;
                    case 2 :
                        html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='2' data-type='rank' href=\"#\">中级</a></span>";
                        break;
                    case 3 :
                        html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='3' data-type='rank' href=\"#\">高级</a></span>";
                        break;
                    case 4 :
                        html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='4' data-type='rank' href=\"#\">技师</a></span>";
                        break;
                    case 5 :
                        html += "<span class=\"border-bottom\"><a class=\"tab\" data-id='5' data-type='rank' href=\"#\">高级技师</a></span>";
                        break;
                    default :
                        break;
                }
            }
        }
        var rank = parseInt($(this).attr("data-level"));
        $(".search-row-bd").find(".search-row-con").eq(2).append(html);
        $("#resource").find(".search-row").eq(2).show();
        //控制 .search-box div的底边框属性
        if (!$(this).hasClass('all')){
            $(".search-box").eq(2).css("border-bottom","");
        }
    })


//    //职称点击事件
//    $("#resource").on('click', '.search-row a[data-type=professional]', function (e) {
//        $(".search-row-bd").find(".search-row-con").eq(2).find(".border-bottom").remove();
//        var html="";
//        var rank = parseInt($(this).attr("data-level"));
//            switch (rank) {
//                case 1 :
//                    html+="<span class=\"border-bottom\"><a class=\"tab\" data-id='1' data-type='rank' href=\"#\">初级</a></span>";
//                    break;
//                case 2 :
//                    html+="<span class=\"border-bottom\"><a class=\"tab\" data-id='2' data-type='rank' href=\"#\">中级</a></span>";
//                    break;
//                case 3 :
//                    html+="<span class=\"border-bottom\"><a class=\"tab\" data-id='3' data-type='rank' href=\"#\">高级</a></span>";
//                    break;
//                case 4 :
//                    html+="<span class=\"border-bottom\"><a class=\"tab\" data-id='4' data-type='rank' href=\"#\">技师</a></span>";
//                    break;
//                case 5 :
//                    html+="<span class=\"border-bottom\"><a class=\"tab\" data-id='5' data-type='rank' href=\"#\">高级技师</a></span>";
//                    break;
//                default :
//                    break;
//            }
//        $(".search-row-bd").find(".search-row-con").eq(2).append(html);
//        $("#resource").find(".search-row").eq(2).show();
//        //控制 .search-box div的底边框属性
//        if (!$(this).hasClass('all')){
//            $(".search-box").eq(2).css("border-bottom","");
//        }
//    })

    //等级点击事件
    $("#resource").on('click', '.search-row a[data-type=rank]', function (e) {
        $(".search-row-bd").find(".search-row-con").eq(3).find(".border-bottom").remove();
        $(".search-box").eq(2).css("border-bottom","1px solid #c5d0dc");
        var cerName=$(".search-row-bd").find(".search-row-con").eq(1).find("a.tab.on").text();
        var rank=$(this).attr("data-id");
        //加载课程数据
        $.ajax({
            url:getContentPath()+"/resource/center/course.do",
            type:"POST",
            data: {cerName:cerName,rank:rank},
            dataType:"json",
            success:function(data){
                showCourse(data);
                course=data;
            }
        });
    })


    //显示课程
    function showCourse(data){
        $(".search-row-bd").find(".search-row-con").eq(3).parent().find("search-row-more").remove();
        var html="";
        if(data.length>size) {
            $(".search-row-bd").find(".search-row-con").eq(3).parent().before("<div class=\"search-row-more\"><a href=\"#\" class=\"more\">展开更多 <i class=\"icon-angle-down\"></i></a></div>");
            for(var i=0;i<size;i++)
                html+="<span class=\"border-bottom\"><a class=\"tab\" data-type='course' data-id=\'"+data[i].id+"\' href=\"#\">"+data[i].name+"</a></span>";
            $(".search-row-bd").find(".search-row-con").eq(3).append(html);
            $("#resource").find(".search-row").eq(3).show();
        }
        else {
            for (var i = 0; i < data.length; i++)
                html += "<span class=\"border-bottom\"><a class=\"tab\" data-type='course' data-id=\'" + data[i].id + "\' href=\"#\">" + data[i].name + "</a></span>";
            $(".search-row-bd").find(".search-row-con").eq(3).append(html);
        }
        $("#resource").find(".search-row").eq(3).show();
    }

    //课程点击事件
    $("#resource").on('click', '.search-row a[data-type=course]', function (e) {
        $(".search-row-bd").find(".search-row-con").eq(4).find(".border-bottom").remove();
        var id=$(this).attr("data-id");
        //加载章节数据
        $.ajax({
            url:getContentPath()+"/resource/center/query.do",
            type:"POST",
            data: {id:id,type:'section'},
            dataType:"json",
            success:function(data){
                showSection(data);
            }
        });
    })


    //显示章节
    function showSection(data){
        var html="";
        for(var i=0;i<data.length;i++)
            html+="<span class=\"border-bottom\"><a class=\"tab\" data-type='section' data-id=\'"+data[i].id+"\' href=\"#\">"+data[i].name+"</a></span>";
        $(".search-row-bd").find(".search-row-con").eq(4).append(html);
        $("#resource").find(".search-row").eq(4).show();
    }

    //章节点击事件
    $("#resource").on('click', '.search-row a[data-type=section]', function (e) {
        $(".search-row-bd").find(".search-row-con").eq(5).find(".border-bottom").remove();
        var id=$(this).attr("data-id");
        //加载课程数据
        $.ajax({
            url:getContentPath()+"/resource/center/query.do",
            type:"POST",
            data: {id:id,type:'knowledge'},
            dataType:"json",
            success:function(data){
                showKnowledge(data);
            }
        });
    })


    //显示知识点
    function showKnowledge(data){
        var html="";
        $(".search-row-bd").find(".search-row-con").eq(5).append(html);
        for(var i=0;i<data.length;i++)
            html+="<span class=\"border-bottom\"><a class=\"tab\" data-type='knowledge' data-id=\'"+data[i].id+"\' href=\"#\">"+data[i].name+"</a></span>";
        $(".search-row-bd").find(".search-row-con").eq(5).append(html);
        $("#resource").find(".search-row").eq(5).show();
    }

    //搜索条件显示
    function showSearch() {
        var html = "";
        $("#resource").find('a.on:not(.more):not([all])').each(function (i, v) {
            html+="<li class=\"border-bottom\"><a class=\"tab\" href=\"#\" data-id="+$(this).attr("data-id")+">"+$(this).text()+"</a></li>";
        });
        $(".search-row-bd").last().find("ul").eq(0).append(html);
        $("#resource").find(".search-row").eq(6).show();
    }
    //搜索条件移除
    function removeSearch() {
        $(".search-row-bd").last().find("ul").eq(0).find("li").remove();
    }

    //下层显示移除
    function removeNextCondition(level) {
        /**
         * 页面中有连个 .search-box div中有 .search-row class属性，为了使 .search-row小标统一
         * 所以brother是用来做统一下标时判断使用的
         */
        var brother = level.parents('.search-box').index();
        var index ="";
        if(brother=='0')
            index = level.parents('.search-row').index();
        else if(brother=='1')
            index = parseInt(level.parents('.search-row').index())+1;
        else if(brother=='2')
            index = parseInt(level.parents('.search-row').index())+3;
        //清除下层div的内容
        $('#resource .search-row:gt(' + index + ')').find(".border-bottom").remove();
        //搜索框添加
        $(".search-row-bd").last().find("ul").eq(0).after(searchBox);
        //隐藏下层div的样式
        $('#resource .search-row:gt(' + index + ')').hide();
    }

    //点击更多
    $("#resource").on('click', '.search-row-more .more', function (e) {
        var brother = $(this).parents('.search-box').index();
        var html="";
        if ($(this).find('i').hasClass('icon-angle-down')) {
            if(brother=="1") {
                for (var i = size; i < certificate.length; i++)
                    html += "<span class=\"border-bottom\"><a class=\"tab\" data-type='certificate' data-id=\'" + certificate[i].key + "\' data-level=\'"+certificate[i].level+"\' href=\"#\">" + certificate[i].value + "</a></span>";
                $(this).parent().parent().find(".search-row-con").append(html);
            }
            else if(brother=="2")
            {
                for (var i = size; i < course.length; i++)
                    html += "<span class=\"border-bottom\"><a class=\"tab\" data-type='course' data-id=\'" + course[i].id + "\' href=\"#\">" + course[i].name + "</a></span>";
                $(this).parent().parent().find(".search-row-con").append(html);
            }
            $(this).html('收起<i class="icon-angle-up"></i>');
        } else { // 收起
            $(this).html('展开更多<i class="icon-angle-down"></i>');
            $(this).parent().parent().find(".search-row-con").find(".border-bottom:gt("+(parseInt(size)-1)+")").remove();
        }
    })
    //获取搜索条件
    function getCondition(data) {
        var value = [];
        for (var i = 0; i < data.length; i++) {
            value.push($(data[i]).attr("data-id"));
        }
        $("#searchCondition").val(value.join(","));
    }


    //表格显示
    $("#data-table").dataTable({
        "sAjaxSource": getContentPath() + "/resource/center/page",
        "aoColumns": [
            { "sWidth": "3%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "id", "bSortable": false },
            { "sWidth": "13%", "sTitle": "名称", "sClass": "left", "mData": "name", "bSortable": false },
            { "sWidth": "5%", "sTitle": "类型", "sClass": "center", "mData": "saveFileTypeName", "bSortable": false },
            { "sWidth": "8%", "sTitle": "状态", "sClass": "center", "mData": "auditResultName", "bSortable": true, "asSorting": [ 'asc', 'desc' ], "sName": "auditResult" },
            { "sWidth": "7%", "sTitle": "上传人", "sClass": "center", "mData": "uploadUserName", "bSortable": false },
            { "sWidth": "15%", "sTitle": "上传时间", "sClass": "right", "mData": "uploadTime", "bSortable": true, "asSorting": [ 'asc', 'desc' ], "sName": "uploadTime" },
            { "sWidth": "7%", "sTitle": "审核人", "sClass": "center", "mData": "auditUserName", "bSortable": false },
            { "sWidth": "15%", "sTitle": "审核时间", "sClass": "right", "mData": "auditTime", "bSortable": false },
            { "sWidth": "15%", "sTitle": "操作", "sClass": "left", "mData": null, "bSortable": false }
        ],
        "aaSorting": [],
        "aLengthMenu": [ 10, 20, 30 ],
        "bProcessing": true,
        "bFilter": false,
        "bServerSide": true,
        "bAutoWidth": false,
        "fnServerParams": function (aoData) {
            var queryParameters = $("#resource").serializeArray();
            $(queryParameters).each(function (i, v) {
                    aoData.push(v);
                }
            );
        },
        "aoColumnDefs": [
            { "sClass": "rowcheckbox", "aTargets": [ 0 ] }
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var id = aData["id"];
            var inputHtml = "<input type='checkbox' class='ace' name='chkItem' value='" + id + "'/><span class=\"lbl\"></span>";
            $('td:eq(0)', nRow).html(inputHtml);

            var nameUrl = "<a href='#'>" + aData['name'] + "</a>";
            var auditLink = "";
            var delLink = "";
            var viewLink = "";
            var status = aData['auditResult'];
            switch (status) {
                case Constant.Resource.STATUS.NOT_AUDIT :
                    auditLink = '<a class="btn btn-xs btn-success" onclick="_audit(\'' + aData['id'] + '\')" type="button">审核</a>';
                    delLink = '<input class="btn btn-xs btn-danger" onclick="_remove(\'' + aData['id'] + '\')" type="button" value="删除"/>';
                    nameUrl = aData['name'];
                    break;
                case Constant.Resource.STATUS.AUDIT_NOT_PASS :
                    auditLink = '<a class="btn btn-xs btn-success" onclick="_audit(\'' + aData['id'] + '\')" type="button">审核</a>';
                    delLink = '<input class="btn btn-xs btn-danger" onclick="_remove(\'' + aData['id'] + '\')" type="button" value="删除"/>';
                    break;
                case Constant.Resource.STATUS.AUDIT_PASS :
                    delLink = '<input class="btn btn-xs btn-danger" onclick="_remove(\'' + aData['id'] + '\')" type="button" value="删除"/>';
                    nameUrl = '<a target="_blank" href="' + getContentPath() + '/res/show?id=' + aData['id'] + '">' + aData['name'] + '</a>';
                    break;
                default :
                    break;
            }
            $("td:eq(1)", nRow).html(nameUrl);
            $("td:eq(8)", nRow).html(auditLink + delLink);
        }
    })


    $(".search-box.search-cond").on('click', 'a.btn', function (e) {
        getCondition($(".search-box.search-cond").find("a.tab"));
        _freshTable();
    });

    $('#batch-del-btn').on('click', function () {
        _batchRemove();
    });

    $('.date-picker').datepicker({autoclose: true}).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });

    $('#upload-btn').on('click', function () {
        window.Uploader.uploadWizard();
    });

    $('.date-picker').datepicker({autoclose: true}).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });
})

/**
 * 查询
 */
function _query() {
    _freshTable();
}

/**
 * 刷新表格数据
 * @private
 */
function _freshTable() {
    // 查询时，要从第一条开始
    var oSettings = $("#data-table").dataTable().fnSettings();
    oSettings._iDisplayStart = 0;
    $("#data-table").dataTable().fnClearTable();
}

/**
 * 单个删除
 * @param id
 * @private
 */
function _remove(id) {
    bootBoxConfirm('确实删除当前资源？', function (p) {
            if (!p) return;
            ajax(getContentPath() + "/res/r", {id: id}, function (data) {
                if (data.type == CODE_ENUM.ERROR) {
                    bootBoxError(data.msg);
                } else {
                    bootBoxSuccess(data.msg, function () {
                        _freshTable();
                    });
                }
            }, function (data) {
                bootBoxError(data.msg);
            });
        }
    );
}

/**
 * 批量删除
 * @private
 */
function _batchRemove() {
    var chkItems = $("input[name='chkItem']:checked");
    if (!chkItems || chkItems.length == 0)
        bootBoxWarning("未选择任何数据！");
    else {
        bootBoxConfirm('删除当前选择的资源后，无法恢复，确定删除？', function (p) {
            if (!p) return;
            var ids = [];
            for (var i = 0; i < chkItems.length; i++) {
                ids.push({ name: "ids", value: $(chkItems[i]).val()});
            }
            ajax(getContentPath() + "/res/ra", ids, function (data) {
                if (data.type == CODE_ENUM.ERROR) {
                    bootBoxError(data.msg);
                } else {
                    bootBoxSuccess(data.msg, function () {
                        _freshTable();
                    });
                }
            }, function (data) {
                bootBoxError(data.msg);
            });
        });
    }
}

/**
 * 审核
 * @param id
 * @private
 */
function _audit(id) {
    var auditUrl = "/res/2audit?id=" + id;
    top.location.href = getContentPath() + auditUrl;
}