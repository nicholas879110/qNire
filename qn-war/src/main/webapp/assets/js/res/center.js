/**
 * Created by Dendy on 2014/5/21.
 */

/**
 * 排序字段
 * @type {string}
 */
var sColumns = "uploadTime"; // 默认按照上传时间排序
$(function () {
    page(1);

    $('#order-default').on('click', function (e) {
        e.preventDefault();
        sColumns = "id";
        page(1);
    });

    $('#order-upload-time').on('click', function (e) {
        e.preventDefault();
        sColumns = "uploadTime";
        page(1);
    });

    $('#order-view-count').on('click', function (e) {
        e.preventDefault();
        sColumns = "viewCnt";
        page(1);
    });

    $('#publish-res-btn').on('click', function (e) {
        Uploader.uploadWizard();
    });
});

/**
 * 列表模板
 * @type {string}
 */
var listTemplate =
    "<li>" +
    "<h4>" +
    "<a target='_blank' href='" + getContentPath() + "/res/show?id=${cw.id}' class=\"blue no-hover\">" +
    "<img src='${icon}'> ${cw.name}" +
    "</a>" +
    "<small class=\"pull-right\">${cw.uplodTime}</small>" +
    "</h4>" +
    "<p class=\"infobox-grey\">" +
    "<span class=\"margin-right-10\">上传人：${cw.uploadUser}</span>" +
    "<span class=\"margin-right-10\">文件类型：${cw.srcFileTypeText}</span>" +
    "<span class=\"margin-right-10\">文件大小：${cw.fileSize}</span>" +
    "<span class=\"margin-right-10\">浏览次数：${cw.viewCnt}</span>" +
    "</p>" +
    "<p class=\"infobox-grey\">资源描述：${cw.comment}</p>" +
    "</li>";

/**
 * 分页工具栏模板
 * @type {string}
 */
var pageTemplate = '<span><a href="javascript:page(1);" tag="s" class="page_btn page-btn-disabled">首&nbsp;页</a>'
    + '<a href="javascript:page(${prePage});" tag="s" class="page_btn page-btn-disabled">上一页</a>'
    + '<i>&nbsp;...&nbsp;</i>'
    + '<a href="javascript:page(${curPage});" class="h active">${curPage}</a>'
    + '<i>&nbsp;...&nbsp;</i>'
    + '<a href="javascript:page(${nextPage});" tag="e" class="page_btn">下一页</a>'
    + '<a href="javascript:page(${totalPage});" tag="e" class="page_btn">尾&nbsp;页</a>'
    + '</span>';

var pageItemTemplate = '<a href="javascript:page(${curPage});" class="h">${curPage}</a>';

//分页需要传递的参数
//iDisplayLength	10 每一页显示条数
//iDisplayStart	0 开始记录数
//分页返回的参数
//iTotalRecords 3 总记录数
//iTotalDisplayRecords 3 总的显示条数

/**
 * 每一页显示条数
 * @type {number}
 */
var PAGE_NUM = 10;
/**
 * 最大页数，超过最大页数则会显示省略号，以隐藏不显示的页面
 * @type {number}
 */
var MAX_PAGE_SIZE = 7;

/**
 * 分页函数
 * @param curPage
 */
function page(curPage) {
    if (curPage <= 0)
        return;
    // 开始记录数
    var start = (curPage - 1) * PAGE_NUM;
    var url = getContentPath() + '/res/page';
    // TODO 需要带上查询条件,暂时不处理
    var args =
    {
        'iDisplayLength': PAGE_NUM, 'iDisplayStart': start,
        'status': Constant.Resource.STATUS.AUDIT_PASS,
        'querySubs': true, // 2014-8-4 12:21:43 去掉勾选项，默认直接查询子节点的资源
        'iSortingCols': 1, // 同时的排序列数，1列
        'sColumns': sColumns, // 按照上传时间或浏览次数排序
        'iSortCol_0': 0,  // 只有一个字段排序，设置为0
        'sSortDir_0': 'desc' // 降序排列
    };
    var callback = function (data) {
        if (data.type == 'error') {
            bootBoxError(data.msg);
        } else {
            _loadData(data);
            _loadPage(data, curPage);
        }
    }
    var errorCallBack = function (data) {
        bootBoxError(data.msg);
    }
    ajax(url, args, callback, errorCallBack);
}

/**
 * 加载分页工具栏数据
 * @param data
 * @param curPage
 * @private
 */
function _loadPage(data, curPage) {
    // 总记录数
    var total = data.iTotalRecords;
    // 显示的总记录数
    var totalDisplay = data.iTotalDisplayRecords;
    // 总页数(分页算法)
    var totalPage = Math.floor((total + PAGE_NUM - 1) / PAGE_NUM);
    totalPage = totalPage < curPage ? curPage : totalPage;
    // 前一页
    var prePage = curPage > 1 ? curPage - 1 : 1;
    // 下一页
    var nextPage = curPage == totalPage ? totalPage : curPage + 1;

    var pageHtml = pageTemplate.replace('${prePage}', prePage).replace('${nextPage}', nextPage)
        .replace(/\$\{totalPage\}/g, totalPage).replace(/\$\{curPage\}/g, curPage);
    $('.page').html(pageHtml);

    if (totalPage <= MAX_PAGE_SIZE) {
        $('.page').find('i').hide();
        // 顺序前增
        for (var i = 1; i < curPage; i++) {
            var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
            $(item).insertBefore($('.page').find('.active'));
        }
        // 倒叙后增
        for (var i = totalPage; i > curPage; i--) {
            var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
            $(item).insertAfter($('.page').find('.active'));
        }
    } else {
        // 中间点
        var pos = Math.floor(MAX_PAGE_SIZE / 2);
        if (curPage <= pos + 1) {
            $('.page').find('i:eq(0)').hide();
            // 顺序前增
            for (var i = 1; i < curPage; i++) {
                var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
                $(item).insertBefore($('.page').find('.active'));
            }
            // 倒叙后增
            for (var i = MAX_PAGE_SIZE; i > curPage; i--) {
                var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
                $(item).insertAfter($('.page').find('.active'));
            }
        } else if (curPage + pos >= totalPage) {
            $('.page').find('i:eq(1)').hide();
            // 顺序前增
            for (var i = curPage - MAX_PAGE_SIZE + (totalPage - curPage) + 1; i < curPage; i++) {
                var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
                $(item).insertBefore($('.page').find('.active'));
            }
            // 倒叙后增
            for (var i = totalPage; i > curPage; i--) {
                var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
                $(item).insertAfter($('.page').find('.active'));
            }
        } else {
            $('.page').find('i').show();
            // 顺序前增
            for (var i = curPage - pos; i < curPage; i++) {
                var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
                $(item).insertBefore($('.page').find('.active'));
            }
            // 倒叙后增
            for (var i = curPage + pos; i > curPage; i--) {
                var item = pageItemTemplate.replace(/\$\{curPage\}/g, i);
                $(item).insertAfter($('.page').find('.active'));
            }
        }
    }

    var btnCss = 'page-btn';
    var btnDisabledCss = 'page-btn page-btn-diabled';
    $('.page').find('a[tag=s]').removeAttr('class');
    $('.page').find('a[tag=e]').removeAttr('class');
    if (curPage > 1) {
        if (curPage < totalPage) {
            $('.page').find('a[tag=s]').addClass(btnCss);
            $('.page').find('a[tag=e]').addClass(btnCss);
        } else {
            $('.page').find('a[tag=s]').addClass(btnCss);
            $('.page').find('a[tag=e]').addClass(btnDisabledCss);
        }
    } else if (curPage == 1) {
        if (curPage < totalPage) {
            $('.page').find('a[tag=s]').addClass(btnDisabledCss);
            $('.page').find('a[tag=e]').addClass(btnCss);
        } else {
            $('.page').find('a[tag=s]').addClass(btnDisabledCss);
            $('.page').find('a[tag=e]').addClass(btnDisabledCss);
        }
    }
}

/**
 * 加载列表数据
 * @param data
 * @private
 */
function _loadData(data) {
    var listhtml = "";
    var dataArray = data.aaData;
    for (var i = 0; i < dataArray.length; i++) {
        var d = dataArray[i];
        var icon = _getIcon(d);
        var standard = d.isStandard === true ? "" : "hide";
        var temp = listTemplate.replace('${cw.id}', d.id).replace("${icon}", icon)
            .replace('${cw.name}', d.name).replace('${cw.uplodTime}', d.uploadTime)
            .replace('${cw.uploadUser}', d.uploadUserName)
            .replace('${cw.srcFileTypeText}', d.srcFileTypeName).replace('${cw.fileSize}', d.fileSizeText)
            .replace('${cw.viewCnt}', d.viewCnt)
            .replace('${cw.comment}', d.description);
        listhtml += temp;
    }
    $('.resource-list').html(listhtml);
}

function _getIcon(d) {
    var icon = "";
    switch (d.srcFileType) {
        case Constant.Resource.FILE_REAL_TYPE.WORD :
//            icon = "fa-file-word-o";
            icon = "docx.png";
            break;
        case Constant.Resource.FILE_REAL_TYPE.EXCEL :
//            icon = "fa-file-excel-o";
            icon = "xls.gif";
            break;
        case Constant.Resource.FILE_REAL_TYPE.PPT :
//            icon = "fa-file-powerpoint-o";
            icon = "ppt.gif";
            break;
        case Constant.Resource.FILE_REAL_TYPE.SWF :
//            icon = "fa-file";
            icon = "swf.gif"
            break;
        case Constant.Resource.FILE_REAL_TYPE.MP3 :
//            icon = "fa-file-audio-o";
            icon = "mp3.gif";
            break;
        case Constant.Resource.FILE_REAL_TYPE.MP4 :
            icon = "mp4.gif";
            break;
        case Constant.Resource.FILE_REAL_TYPE.FLV:
//            icon = "fa-file-video-o";
            icon = "flv.gif";
            break;
        case Constant.Resource.FILE_REAL_TYPE.PDF :
//            icon = "fa-file-pdf-o";
            icon = "pdf.gif";
            break;
        default :
//            icon = "fa-file";
            icon = "file.ico";
    }
    return getContentPath() + "/assets/images/res/" + icon;
}