/**
 * Created by Dendy on 2014/5/21.
 */
$(function () {

    var code = [
        '今天应做的事没有做，明天再早也是耽误了。',
        '读书破万卷，下笔如有神。',
        '路漫漫其修远兮,吾将上下而求索。',
        '千淘万漉虽辛苦，吹尽狂沙始到金。',
        '谦虚使人进步，骄傲使人落后。',
        '玉不琢不成器，人不学不明理。',
        '学而时习之，不亦悦乎？',
        '滚滚长江东逝水,浪花淘尽英雄。',
        '海阔凭鱼跃,天高任鸟飞。',
        '君子之交淡若水,小人之交甘若醴。'
    ];

    if (!subType) {
        $('.test-summary,#qqSubmit').hide();
    }
    var time=0; //1s
    var tem = 0;
    var certId=$("input[name=certId]").val();
    var kpId=$("input[name=kpId]").val();
    loadResource(certId,kpId);


    $("ul.video li a").bind("click",function(){
        $("ul.video li.active").removeClass("active");
        $(this).parent().addClass("active");
        var kpId=$(this).attr("value");
        loadResource(certId,kpId);
    });

    $("#testOnlineImage").on("hide.bs.modal", function() {
        int = setInterval(countTime,1000);
        if (!subType) {
            plays.play();
            $('.test-summary,#qqSubmit').hide();
        }
    });

    if (subType) {
        $("#testOnlineImage").on("show.bs.modal", function() {
            $('.modal-body').html(code[Math.floor(Math.random()*10)]);
        });
    }

    //提交学时按钮事件
    $("#submitHour").click(function(){
        if (!subType) {
            plays.pause();
        }
        window.clearInterval(int);
        subTime(time, null, false);
    });

    //验证是否在线提交学时
    function checkExits() {
        window.clearInterval(int);
        if (Constant.Resource.FILE_TYPE.DOC == ConstantResourceFILE_TYPEDOC) {
            exitViewScreen();
        }else{
            plays.pause();
            exitPlayScree();
        }
        if(subType){
            $("#testOnlineImage").modal("show");
            $("#online-image").click();
        }else{
            $.post(getContentPath()+"/exam/do/qq",{knowledgeId:kpId},function(data){
                if (data.code == 0 && data.result != "") {
                    data = data.result;
                    var option = data.content;
                    var sqq = '<h5>问题：<span>'+data.title+'</span></h5>';
                    if (option.indexOf('\n') != -1) {
                        option = option.split('\n');
                    } else {
                        option = option.split(' ');
                    }
                    for (var i = 0; i < option.length; i++) {
                        sqq += '<p class="test-text"><label><input onclick="test_test()" name="form-field-radio" type="radio" class="ace"><span class="lbl"> '+option[i]+'</span></label></p>';
                    }
                    $('.test-cont').html(sqq);
                    $('.test-summary p span').html(data.answer);
                    $('.clearfx p').html(data.analysis);
                } else {
                    $("#sqq").html("题库没题");
                    $("#testOnlineImage").modal("show");
                }
            }, "json");
        }
    }

    $("#qqSubmit").click(function(){
        subTime(time, null, false);
    });

    /**
     * 提交学时方法
     * @param time 时间
     * @param code 待验证值
     * @param subType 验证类型 true-验证码 false-试题
     */
    function subTime(time,code,subType){
        tem = time;
        $.ajax({
            url: getContentPath() + "/stuCert/study/count",
            type: 'post',
            dataType: 'json',
            data: {
                type:Constant.ProfessionType.CERTIFICATE,
                certId:certId,
                time:time,
                pageMark:pageMark,
                pageTime:pageTime,
                code:code
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code == 0) {
                    bootBoxSuccess("提交学时成功", function() {
                        $("#submitHour").attr("disabled", "disabled");
                        $("#testOnlineImage").modal("hide");
                        pageTime = data.result;
                    });
                }else{
                    bootBoxError(data.msg,function(){
                        if(subType){
                            $("#online-image").click();
                        }else{
                            $("#testOnlineImage").modal("hide");
                        }
                    });
                }
                endLoading();
            }
        });
    }

    //刷新验证码
    $("#online-image").click(function(){
        $("#validateCode").val("");
        $(this).find('img').attr("src", getContentPath() + "/captcha/image?" + Math.floor(Math.random() * 100)).fadeIn();
    });

    //提交验证码
    $("#imageSub").click(function(){
//        var code = $("#validateCode").val();
//        if(!code){
//            bootBoxWarning("请输入验证码");
//            return;
//        }
        subTime(time,code,true);
    });

    function countTime(){
        time++;
        if (document.getElementById("studyTimes") != null) {
            $("#studyTimes").html(Math.floor(time/60));
            if (tem + 60 < time) {
                $("#submitHour").removeAttr("disabled");
            }
        } else {
            window.clearInterval(int);
        }
        if(time%onlineTime == 0){
            if (subType) {
                if($("#testOnlineImage").css("display") == "none"){
                    checkExits();
                }
            } else {
                if($("#testOnlineImage").css("display") == "none"){
                    $("#testOnlineImage").modal("show");
                    checkExits();
                }
            }
        }
    }
    var int=setInterval(countTime,1000);
});

function test_test() {
    $('.test-summary,#qqSubmit').show();
}
function exitViewScreen(){
    $FlexPaper('documentViewer').fullScreenTest();
}
function exitPlayScree(){
    plays.fullScreen();
}

var ConstantResourceFILE_TYPEDOC;

function loadResource(certId,kpId){

    $.ajax({
        url: getContentPath() + "/stuCourse/resource/play",
        type: 'post',
        dataType: 'json',
        data: {
            type:Constant.ProfessionType.CERTIFICATE,
            certId:certId,
            kpId:kpId
        },
        success: function (data, textStatus, jqXHR) {
            if (data.code==0) {
               if(data.result){
                   var res=data.result;
                   $("#study_time_div").show();
                   relateResourceDom(res);
                   ConstantResourceFILE_TYPEDOC = res.fileMediaType;
                   if (res.fileMediaTypeName == '视频') {
                       subType = false;
                   } else {
                       subType = true;
                   }
               }
            }else if(data.code==3){
                $("#resourceDisplay").html(
                        '<img src="'+getContentPath()+'/file/img/study_404.png" style="height:600px;" title="404 NOT FOUND RESOURCE" />'
                );
                //赋值 视频详细说明
                $("#resName").html("");
                $("#srcFileType").html("");
                $("#fileSizeText").html("");
                $("#uploadUserName").html("");
                $("#uploadTime").html("");
                $("#study_time_div").hide();

            }else{
                bootBoxError(data.msg);
            }
            endLoading();
        }
    });
}

function relateResourceDom(res){
    var fileUrl = res.savePath;
    var fileMediaType = res.fileMediaType;
    //资源信息


    //判断资源类型
    var logo = ""; //getContentPath() + "/JarisFLVPlayer-v2.0.15b/img/logo-color.png";
    var logoUrl = "";
    var poster = getContentPath() + "/file/img/" /*+ (isVideo ? "video.png" : "audio.png");*/
    var type ="";
//    console.dir(res);

    switch (fileMediaType){
        case Constant.Resource.FILE_TYPE.VIDEO:
        case Constant.Resource.FILE_TYPE.AUDIO:
            if(fileMediaType==Constant.Resource.FILE_TYPE.VIDEO){
                poster+="video.jpg";
                type="video";
            }else if(fileMediaType==Constant.Resource.FILE_TYPE.AUDIO){
                poster+="audio.jpg";
                type="audio";
            }
            var player = getContentPath() + "/asset-libs/JarisFLVPlayer-v2.0.15b/bin/JarisFLVPlayer.swf";
            $("#resourceDisplay").empty();
            $("#resourceDisplay").html(
                '<object id="videoPlayer" width="100%" height="600" type="application/x-shockwave-flash" data="'+player+'">'+
                    '<param name="menu" value="false">'+
                    '<param name="scale" value="noScale">'+
                    '<param name="allowFullscreen" value="true">'+
                    '<param name="allowScriptAccess" value="always">'+
                    '<param name="bgcolor" value="#000000">'+
                    '<param name="quality" value="high">'+
                    '<param name="wmode" value="opaque">'+
                    '<param name="flashvars" value="'+
                        'source='+fileUrl+
                        '&type='+type+
                        '&streamtype=file' +
                        '&server=' +
                        '&duration=52' +
                        '&poster='+poster+
                        '&autostart=true' +
                        '&logo='+logo+
                        '&logoposition=top left' +
                        '&logoalpha=30' +
                        '&logowidth=130' +
                        '&logolink='+logoUrl+
                        '&hardwarescaling=false' +
                        '&darkcolor=000000' +
                        '&brightcolor=4c4c4c' +
                        '&controlcolor=FFFFFF' +
                        '&hovercolor=67A8C1' +
                        '&controltype=1&jsapi=1">'+
               '</object>'
            )
            plays = new JarisFLVPlayer("videoPlayer");
            //赋值 视频详细说明
            $("#resName").html(res.name);
            $("#srcFileType").html(res.saveFileTypeName);
            $("#fileSizeText").html(res.fileSizeText);
            $("#uploadUserName").html(res.uploadUserName);
            $("#uploadTime").html(res.uploadTime);
            break;
        case Constant.Resource.FILE_TYPE.DOC:
            $("#resourceDisplay").empty();
            $("#resourceDisplay").html(
                '<div id="documentViewer" class="flexpaper_viewer " style="height:600px;width:635px;"></div>'
            )
            $('#documentViewer').FlexPaperViewer(
                {config: {
                    SwfFile: fileUrl,
                    Scale: 0.6,
                    ZoomTransition: 'easeOut',
                    ZoomTime: 0.5,
                    ZoomInterval: 0.2,
                    FitPageOnLoad: true,
                    FitWidthOnLoad: true,
                    FullScreenAsMaxWindow: false,
                    ProgressiveLoading: false,
                    MinZoomSize: 0.2,
                    MaxZoomSize: 5,
                    SearchMatchAll: false,
                    InitViewMode: 'Portrait',
                    ViewModeToolsVisible: false,
                    ZoomToolsVisible: false,
                    NavToolsVisible: false,
                    CursorToolsVisible: false,
                    SearchToolsVisible: false,
                    PrintPaperAsBitmap:true,
                    localeChain: 'en_US',
                    jsDirectory: getContentPath() + "/asset-libs/FlexPaper/js/", /*设置FlexPaper的js文件目录，包含FlexPaperVier.swf文件，否则默认在flex目录下.*/
                    cssDirectory: getContentPath() + "/asset-libs/FlexPaper/css/"
                }}
            );

            $("#documentViewer [name='wmode']").attr("value","transparent");
            $("#documentViewer embed").attr("wmode","transparent");
           // $("#resourceDisplay").append(resInfo);
            //赋值 视频详细说明
            $("#resName").html(res.name);
            $("#srcFileType").html(res.saveFileTypeName);
            $("#fileSizeText").html(res.fileSizeText);
            $("#uploadUserName").html(res.uploadUserName);
            $("#uploadTime").html(res.uploadTime);

            break;
    }
}