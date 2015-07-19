jQuery(function ($) {


    calculateOnlineTime();

    loadPersonalMsg();

    loadCurrentPersonalPros();


    $("#proTabs").on('click', 'li a', function () {
        var proId = $(this).attr("id").substring(4);

        loadStudyingCerts(proId);
    })

    $('#userHead').ace_file_input({
        style: 'well',
        btn_choose: '请选择头像文件',
        btn_change: null,
        no_icon: 'icon-cloud-upload',
        droppable: false,
        thumbnail: 'small'//large | fit
        //,icon_remove:null//set null, to hide remove/reset button
        , before_change: function (files, dropped) {
            var file = files[0];
            if (typeof file == "string") {//files is just a file name here (in browsers that don't support FileReader API)
                if (!(/\.(jpe?g|png|gif)$/i).test(file)) {
                    alert('请选择图片文件!');
                    return false;
                }
            }
            else {
                var type = $.trim(file.type);
                if (( type.length > 0 && !(/^image\/(jpe?g|png|gif)$/i).test(type) )
                    || ( type.length == 0 && !(/\.(jpe?g|png|gif)$/i).test(file.name) )//for android's default browser!
                    ) {
                    alert('请选择图片文件!');
                    return false;
                }

                if (file.size > 1100000) {//~100Kb
                    alert('文件大小不能超过 1M!');
                    return false;
                }
            }

            return true;
        }
        /**,before_remove : function() {
						return true;
					}*/,
        preview_error: function (filename, error_code) {

        }

    });

    $("#user-pwd-href").click(function () {
        switchPage("/u/stu/pwd/edit")
    });

    $("#mail-edit-href").click(function () {
        switchPage("/u/stu/mail/edit")
    });

    $("#info-edit-href").click(function () {
        switchPage("/u/stu/info/edit")
    });

    $("#info-cert-href").click(function () {
        switchPage("/u/stu/cert")
    });

})


/**
 * 修改个人头像
 */
function editPersonalPic() {

}

var ss = 0, mm = 0, hh = 0;
function calculateOnlineTime() {
    /*
     $.ajax({
     url: getContentPath() + "/portal/load/online/time",
     type: 'post',
     dataType: 'json',
     data: {
     },
     success: function (data, textStatus, jqXHR) {
     if (data.code==0) {
     $("#onlineTime").text(convertTime(data.result))  ;
     }
     endLoading();
     },
     error:function(XMLHttpRequest, textStatus, errorThrown){

     }
     });*/
    var startTime = $("input[name=onlineTime]").val();
    if (startTime) {
        $("#onlineTime").text(convertTime((new Date().getTime() - startTime) / 1000));
    } else {
//         startTime=new Date();
//         $("#onlineTime").text(convertTime((new Date().getTime()-startTime)/1000));
    }


    setTimeout("calculateOnlineTime()", 1000); //每一秒钟执行一次函数自身
}

function convertTime(etime) {
    var h = Math.floor(etime / 3600); //时
    var m = Math.floor(etime / 60) % 60;//分
    var s = Math.floor(etime % 60);//秒

    var hstr = h.toString().length < 2 ? "0" + h.toString() : h; //1显示01
    var mstr = m.toString().length < 2 ? "0" + m.toString() : m; //1显示01
    var sstr = s.toString().length < 2 ? "0" + s.toString() : s; //1显示01
    return  hstr + ":" + mstr + ":" + sstr;
}


function loadPersonalMsg() {
    $.ajax({
        url: getContentPath() + "/u/load/person/msg",
        type: 'post',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code == 0) {
                $("#personMsg").text("您已经连续" + data.result + "天未在线学习了");
            } else {
            }
            endLoading();
        }
    });
}


function loadCurrentPersonalPros() {
    startLoading("正在加载个人职业工种数据", 1);
    $.ajax({
        url: getContentPath() + "/stuCert/ot/current/pros",
        type: 'get',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code == 0) {
                generateStudyingProsHtml(data);
            } else {
            }
            endLoading();
        }
    });
}


function generateStudyingProsHtml(data) {
    var proTab = '<li>\
            <a data-toggle="tab"  id="tab_{id}">{proName}</a>\
      </li>';
    var html = "";

    var rs = data.result;
    if (rs) {
        $.each(rs, function (index, item) {
            html += proTab.replaceAll("{id}", item.proId).replace("{proName}", item.proName);
            if (index == 0) {
                loadStudyingCerts(item.proId)
            }
        })
        $("#proTabs").html(html);
    }
}


function loadStudyingCerts(proId) {

    startLoading("正在加载个人证书(职称)课程数据", 1);
    $.ajax({
        url: getContentPath() + "/stuCert/ot/current/certs/" + proId,
        type: 'get',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code == 0) {
                generateStudyingCertsHtml(data);
            } else {
            }
            endLoading();
        }
    });
}


function generateStudyingCertsHtml(data) {
    var pathHtml = '<ul class="wizard-steps" >{content}</ul>';
    var content = "";
    var levels = 0;
    if (data.result) {
        if (data.result.length == 0) {
            $("#certs").html("<strong class='red'>您没有任何正在学习的证书(职称)，请先报名</strong>");
            return;
        }
        $.each(data.result, function (index, item) {
            var level = item.certLevel;
            var levelName = "";
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
            if (item.isCurrent == true) {
                //展示当前的进度
                levels = item.certLevel;
                if (levelName.length > 2) {
                    content += "<li class=\"active\"><span class=\"step small\">" + levelName + "</span></li>";
                } else {
                    content += "<li class=\"active\"><span class=\"step\">" + levelName + "</span></li>";
                }
                $("#certs").html('<h6>证书(职称)：' + item.certName + "(" + levelName.replaceAll("<(\S*?)[^>]*>", "") + ")" + '</h6>');
                $("#cert-progress").attr("data-percent", item.progress + "%").html('<div  class="progress-bar" style="width:' + item.progress + '%"></div>');
                $("#cert-hour").html(item.sumHour + "/" + item.studyHour + "学时");
                $("#cert-study").html('<a target="_blank" href="' + getContentPath() + "/stuCourse/continue/cert/study/" + item.certId + '" class="btn btn-radius btn-success">开始学习</a>');
                //展示当前证书课程
                loadCurrentPersonalCertContent(item.certId, item.extraUrl);
            } else if (item.isCompleted) {
                if (levelName.length > 2) {
                    content += "<li class=\"complete\"><span class=\"step small\">" + levelName + "</span></li>";
                } else {
                    content += "<li class=\"complete\"><span class=\"step\">" + levelName + "</span></li>";
                }
            } else {
                if (levels == 0 || level < levels) {
                    if (levelName.length > 2) {
                        content += "<li class=\"complete\"><span class=\"step small\">" + levelName + "</span></li>";
                    } else {
                        content += "<li class=\"complete\"><span class=\"step\">" + levelName + "</span></li>";
                    }
                } else {
                    if (levelName.length > 2) {
                        content += "<li><span class=\"step small\">" + levelName + "</span></li>";
                    } else {
                        content += "<li><span class=\"step\">" + levelName + "</span></li>";
                    }
                }
            }
        })
        pathHtml = pathHtml.replace("{content}", content);
        $("#cert-path").html(pathHtml);
    }


}

function loadCurrentPersonalCertContent(certId, extraUrl) {
    var html = '<li class="active">\
        <a data-toggle="tab" href="javascript:void(0)" onclick="loadCurrentPersonalCourse(\'{certId}\')">课程</a>\
    </li>\
    <li >\
        <a data-toggle="tab" href="javascript:void(0)" onclick="loadCurrentPersonalCertOutLine(\'{certId}\',\'{extraUrl}\')">大纲</a>\
    </li>';
    $("#certContent").html(html.replaceAll("{certId}", certId).replace("{extraUrl}", extraUrl));
    loadCurrentPersonalCourse(certId);
}


function loadCurrentPersonalCourse(certId) {
    startLoading("正在加载个人证书(职称)课程数据", 1);
    $.ajax({
        url: getContentPath() + "/stuCourse/ot/cert/course/" + certId,
        type: 'get',
        dataType: 'json',
        data: {
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code == 0) {
                generateStudyingCourseHtml(data, certId);
            } else {
            }
            endLoading();
        }
    });
}

function loadCurrentPersonalCertOutLine(certId, extraUrl) {
    if (extraUrl && !$.trim(extraUrl) == "") {
        $("#cert-tab-content").removeClass("no-content").load(getContentPath() + extraUrl);
    } else {
        $("#cert-tab-content").addClass("no-content").html("<span><i class='icon-info-sign bigger-110 blue'></i>证书(职称)暂无大纲</span>");
    }

}

/**
 * 生成课程html
 * @param data Map<String,List<Course>> key作为课程分类 ，list为分类下课程
 */
function generateStudyingCourseHtml(data, certId) {
    var html = '<table class="table center">\
        <thead>\
            <tr>\
                <th width="15%">课程分类</th>\
                <th width="15%">课程名称</th>\
                <th width="15%">讲师</th>\
                <th width="15%">进度</th>\
                <th width="15%"></th>\
            </tr>\
        </thead>\
        <tbody>{content}</tbody>\
    </table>';

//    $("#cert-course tbody").empty();
    if ($.isEmptyObject(data.result)) {
        $("#cert-tab-content").addClass("no-content").html("<span><i class='icon-info-sign bigger-110 blue'></i>证书(职称)暂无课程</span>");
        return;
    }
    if (data.result) {
        $("#cert-tab-content").removeClass("no-content");
        var cateHtml = "";
        $.each(data.result, function (key, value) {
            var rowL = value.length;


            $.each(value, function (index, item) {
                if (index == 0) {
                    var tr = "<tr>";
                    tr += "<th rowspan='" + value.length + "'>" + key + "</th>";
                    tr += "<td>" + item.courseName + "</td>";
                    tr += "<td>" + item.teacherName + "</td>";
                    if (item.progress < 100) {
                        tr += "<td class='blue'>" + item.progress + "%</td>";
                        tr += "<td><a class='btn btn-sm btn-minier btn-primary' target='_blank' href='"
                            + getContentPath() + "/stuCourse/info/" + certId + "/" + item.courseId
                            + "'>开始学习</a>"
                            + "</td>";
                    } else if (item.progress == 100) {
                        tr += "<td class='green'>" + item.progress + "%</td>";
                        tr += "<td><a class='btn btn-sm btn-minier btn-success' target='_blank' href='"
                            + getContentPath() + "/stuCourse/info/" + certId + "/" + item.courseId
                            + "'>开始学习</a>"
                            + "</td>";
                    }
                    tr += "</tr>"
                    cateHtml += tr;
                } else {
                    var tr = "<tr>";
                    tr += "<td>" + item.courseName + "</td>";
                    tr += "<td>" + item.teacherName + "</td>";
                    if (item.progress < 100) {
                        tr += "<td class='blue'>" + item.progress + "%</td>";
                        tr += "<td><a class='btn btn-sm btn-minier btn-primary' target='_blank' href='"
                            + getContentPath() + "/stuCourse/info/" + certId + "/" + item.courseId
                            + "'>开始学习</a>"
                            + "</td>";
                    } else if (item.progress == 100) {
                        tr += "<td class='green'>" + item.progress + "%</td>";
                        tr += "<td><a class='btn btn-sm btn-minier btn-success' target='_blank' href='"
                            + getContentPath() + "/stuCourse/info/" + certId + "/" + item.courseId
                            + "'>开始学习</a>"
                            + "</td>";
                    }
                    tr += "</tr>"
                    cateHtml += tr;
                }

            })
            $("#cert-tab-content").html(html.replace("{content}", cateHtml));
        })
    }
}

function calProgress(progress) {
    if (progress < 100) {

    } else {

    }
}

function showUploadUserHeadFrom() {
    var dialog = $("#user-head").removeClass('hide').dialog({
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>头像上传</h4></div>",
        title_html: true,
        width: 500,
        height: 260,
        open: function (event, ui) {

        },
        close: function (event, ui) {
        },
        buttons: [
            {
                text: "取消",
                "class": "btn btn-xs",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "保存",
                "class": "btn btn-primary btn-xs",
                click: function () {
                    var $form = $('#user-head-form');
                    if (!$form.valid()) return;
                    var fd = new FormData($form.get(0));
                    $.ajax({
                        url: getContentPath() + "/u/upload/head",
                        type: $form.attr('method'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: fd,
                        success: function (data, textStatus, jqXHR) {
                            if (data.code == 0) {
                                bootBoxSuccess(data.msg);
                            } else {
                                bootBoxError(data.msg);
                            }
                        }
                    });
                    dialog.dialog("close");
                }
            }
        ]
    });
}


