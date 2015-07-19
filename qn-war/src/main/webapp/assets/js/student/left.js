jQuery(function($){

    loadPersonalInfo();
    loadPersonalCerts();

    $("#cardAdmin").click(function(){
        var aDom = $(this);
        var href = aDom.attr("href");
        var url = getContentPath() + href.replace("#", "/");
        $("#page-content").load(url);
    });

    /**
    * 加载个人信息
    */
    function loadPersonalInfo() {
        startLoading("正在加载个人信息");
        $.ajax({
            url: getContentPath() + "/u/load/info",
            type: 'post',
            dataType: 'json',
            data: {},
            success: function (data, textStatus, jqXHR) {
                if (data.code == 0) {
                    generatePersonalInfo(data.result);
                }
                endLoading();
            }
        });
    }

    function loadPersonalCerts(){
        startLoading("正在加载个人证书(职称)",1);
        $.ajax({
            url: getContentPath() + "/stuCert/ot/certs",
            type: 'get',
            dataType: 'json',
            data: {
            },
            success: function (data, textStatus, jqXHR) {
                if (data.code==0) {
                    generatePersonCertsHtml(data);
                } else {
                }
                endLoading();
            }
        });
    }

    function generatePersonCertsHtml(data){
        var record='<li><a href="#{certId}">{certName}<span class="blue">({certLevel})</span></a></li>';
        var rs=data.result;
        var html="";

        $.each(rs,function(index,item){
            var level=item.certLevel;
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
                    levelName = Constant.CertficateLevel.SuperName;
                    break;
                default :
                    break;
            }
            html+=record.replace("{certId}",item.certId).replace("{certName}",item.certName).replace("{certLevel}",levelName);
        })
        $("#personCerts").html(html);

    }


    function generatePersonalInfo(info) {
        var personInfo ='<span class="profile-picture">\
                          <img src="{url}" alt="头像">\
                        </span>\
                        <div class="name" >\
                            <div style="margin-left: 70px;margin-top:25px;">{realName}</div>\
                        </div>';
        if(info.headUrl&& $.trim(info.headUrl)!=""){
            personInfo=personInfo.replace("{url}", getContentPath() + info.headUrl);
        }else{
            personInfo=personInfo.replace("{url}", getContentPath() + "/assets/images/gallery/thumb-2.jpg");
        }
        personInfo=personInfo.replace("{realName}", info.username);

        $("#personalInfo").html(personInfo);
    }

});