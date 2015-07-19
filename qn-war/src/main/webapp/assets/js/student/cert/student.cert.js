

jQuery(function ($) {

    var size="7";

    var upload_in_progress = false;
    $('#frontCover').ace_file_input({
        no_file: '选择文件',
        btn_choose: '选择',
        btn_change: '重选',
        droppable: false,
        onchange: null,
        thumbnail: false,
        //thumbnail:'large'
        before_remove: function () {
            if (upload_in_progress)
                return false;//if we are in the middle of uploading a file, don't allow resetting file input
            return true;
        },
        before_change: function (files, dropped) {
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
    });

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

    //加载证书数据
    function updateCertificate(category) {
        $.ajax({
            url:getContentPath()+"/stuCert/queryJob",
            type:"POST",
            data: {category:category},
            dataType:"json",
            success:function(data){
                showCertificate(data.result);
            }
        });
    };



})


//显示证书
var CertClickDom;
function showCertificate(data){

    $(".search-row-bd").find(".search-row-con").eq(1).parent().find("search-row-more").remove();
    var html = "";
    for (var i = 0; i < data.length; i++)
        html += '<span class="border-bottom"><a class="tab" data-type="certificate" data-ceType="'+data[i].type+'" data-id="' + data[i].key + '" href="#">'+ data[i].value + '</a></span>';
    $(".search-row-bd").find(".search-row-con").eq(1).append(html);
    $("#resource").find(".search-row").eq(1).show();
    //绑定事件
    $("#certInfo").find("a.tab").click(function(){
        startLoading("正在加载");
        CertClickDom=this;
        $.ajax({
            url: getContentPath() + "/stuCert/queryCert",
            type: 'post',
            dataType: 'json',
            data: {
                id: $(this).attr("data-id"),
                type: $(this).attr("data-ceType")
            },
            success: function (data) {
                if (data.code == 0) {
                    var details = generateDetailHtml(data);
                    $("#certDetail").html(details);
                } else {
                    bootBoxError(data.msg);
                }
                endLoading();
            }
        });
    })
}


var certDetail ='<div class="cardInfo-list">\
                    <img src="{certCover}">\
                    <div class="cardInfo-con">\
                        <h6 class="tit">{certName}（{certLevel}）</h6>\
                        <p class="txt"><span class="color444">介绍：{certDescn}</span></p>\
                        <div class="info">{operation}课时：<span class="blue">{studyHour}</span> 课时</div>\
                    </div>\
                </div>';

var certOperation='<a class="btn btn-primary btn-xs pull-right" href="#" onclick="followCert(this,\'{certCode}\')">去报名</a>';

var canSign=true;


function generateDetailHtml(data) {
    var details = "";
    if (data.result.length <= 0) {
        details = "<span class='red margin-10'><strong>暂无绑定证书(职称)!</span></strong>";
        return details;
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
                levelName = Constant.CertficateLevel.SuperName;
                break;
            default :
                break;
        }
        var userCertStatus=item.userCertStatus;
        var operationHtml="";
        if(userCertStatus==Constant.UserCertificateStatus.GET.code){
            operationHtml='<a class="btn btn-primary btn-xs pull-right" href="#" onclick="cancelFollow(this,\'{certCode}\')">取消报名</a>'.replace("{certCode}",item.certId);
        }else if(userCertStatus==Constant.UserCertificateStatus.SIGN_UP.code){
            operationHtml='<span class="pull-right green">已报名</span>';
            canSign=false;
        }else{
            operationHtml=certOperation.replace("{certCode}",item.certId);
        }
        details += certDetail.replace("{certName}", item.certName).replace("{certDescn}", item.certProfile)
            .replace("{certLevel}", levelName).replace("{certCover}", getContentPath() + item.certFrontCover)
            .replace("{certCode}", item.certId).replace("{studyHour}",item.studyHour).replace("{operation}",operationHtml);

    })

    return details;
}





function followCert(dom, certCode) {
    //报名证书需要补全个人信息
    if(!canSign){
        bootBoxWarning("该等级证书(职称)下有未完成证书，暂时不能报名");
        return;
    }
    switchPage("/stuCert/complete/person/info", {
        certCode: certCode
    });
}

function cancelFollow(dom,certCode){
    $.ajax({
        url: getContentPath() + "/stuCert/cancel/follow",
        type: 'post',
        dataType: 'json',
        data: {
           certId:certCode
        },
        success: function (data) {
            if (data.code == 0) {
                $(CertClickDom).trigger("click");
                bootBoxSuccess(data.msg);
            } else {
                bootBoxError(data.msg);
            }
            endLoading();
        }
    });
}

var lastValue = "", nodeList = [], fontCss = {};



function filter(node) {
    return !node.isParent && node.isFirstNode;
}
