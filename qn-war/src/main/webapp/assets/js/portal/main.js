$.ajaxSetup({
    cache: false,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status == 200) {
            if (XMLHttpRequest.responseText) {
                if (XMLHttpRequest.responseText.indexOf("<title>强制下线</title>") != -1) {
                    bootBoxError("您的帐号已被强制下线，如果不是您自己的操作，请重新登录并修改您的登录密码！", function() {
                        top.location = getContentPath() + "/portal/login.do";
                    });
                } else if (XMLHttpRequest.responseText.indexOf("<title>登录超时</title>") != -1) {
                    bootBoxError("登录超时，请重新登录！", function() {
                        top.location = getContentPath() + "/portal/login.do";
                    });
                } else {
                    bootBoxError("服务器异常，请联系维护人员！");
                }
            }
        } else if (XMLHttpRequest.status == 403 || XMLHttpRequest.status == 405) {
            bootBoxError("您无权限访问当前请求！", function() {
                top.location = getContentPath() + "/portal/login.do";
            });
        } else {
            bootBoxError("服务器异常，请联系维护人员！");
        }
    }
});

$(function () {
    $( "ul.nav-list  a" ).bind("click",function() {
        var aDom = $(this);
//        alert(aDom.attr("view"));
        if (aDom.attr("view")) {
            switch_Active(aDom);
        }
    });
//    $("ul.nav-list a:first").click();

    function switch_Active(aDom) {
        $("ul.nav-list li").removeClass("open active");
        $("ul.nav-list ul[class='submenu']").hide();
        if (aDom.parents("ul[class='submenu']")) {
            aDom.parents("ul[class='submenu']").show().parent("li").addClass("open active");
        } else {
            aDom.parent("li").addClass("open");
        }
        aDom.parent("li").addClass("active");
//        if (aDom.attr("view") == "/res/man") {
//            location.href = getContentPath()+aDom.attr("view");
//        }
        $("#page-content").load(getContentPath()+aDom.attr("view"));
    }

    $("ul.list-unstyled a").click(function () {
        var aDom = $(this);
        var href = aDom.attr("href");
        if (href && href.length > 1) {
            switchActive(aDom);
            removeElements();
            var url = getContentPath() + href.replace("#", "/");
            /*
            var firstBreadText = $.trim(aDom.parents("ul[class='submenu']").prev("a").children(".menu-text").text());
            var secondBreadText = $.trim(aDom.children(".menu-text").text());
            breadcrumbs.children("li:not(:first)").remove();
            breadcrumbs.append('<li class="active">' + firstBreadText + '</li> <li class="active">' + secondBreadText + '</li>');
             */
            try {
                $("#page-content").load(url);
            } catch (e) {
                console.debug(e);
            }
        }
    });




    /**
     * 切换选中状态
     * @param aDom 导航的a标签节点
     */
    function switchActive(aDom) {
        $("ul.list-unstyled li").removeClass("open active");
        /*$("ul.nav-list ul[class='submenu']").hide();

        if (aDom.parents("ul[class='submenu']")) {
            aDom.parents("ul[class='submenu']").show().parent("li").addClass("open active");
        } else {
            aDom.parent("li").addClass("open");
        }*/
        aDom.parent("li").addClass("active");
    }

    /**
     * 移除无用元素
     */
    function removeElements() {
        $(".custom-select2").each(function (i, v) {
            $(this).select2("destroy");
        });
        $(".custom-datePicker").each(function (i, v) {
            $(this).datepicker("remove");
        });
        $(".custom-dateRangerPicker").each(function (i, v) {
            $(this).data("daterangepicker").remove();
        });
    }

    if (location.href.indexOf("#") != -1) {
        var a_href = location.href.split("#");
        var a_tag = $("ul.nav-list a[href='#" + a_href[1] + "']");
        if (a_tag.parents("ul").prev("a")) {
            a_tag.parents("ul").prev("a").click();
        }
        a_tag.click();
    } else {
        try {
//            $("#page-content").load(getContentPath() + '/portal/home.do');
        } catch (e) {
            console.debug(e);
        }
    }

    var flag_status = true;
    /**
     * 控制首页顶部收起或展开
     */
    $('#navbarCollapse-dropdown').click(function () {
        var o = $(this).find('i');
        if (flag_status) {
            o.removeClass('icon-double-angle-down');
            o.addClass('icon-double-angle-up');
            $('body').addClass('navbar-dropdown');
        } else {
            o.removeClass('icon-double-angle-up');
            o.addClass('icon-double-angle-down');
            $('body').removeClass('navbar-dropdown');
        }
        flag_status = !flag_status;
    });
});

/**
 * 验证权限是否存在
 * @param authCode 权限功能码
 * @returns {boolean} true:存在；false：不存在
 */
function validAuthCode(authCode) {
    return CURR_USER_AUTH_CODE.indexOf(authCode + ",") != -1;
}


/**
 * 页面跳转实现方法，带参数
 * @param action
 * @param args
 */
function switchPage(action, args, callback) {
    if (typeof args == "function") {
        $("#page-content").load(getContentPath() + action, {}, args);
    } else {
        if (typeof callback != "function") {
            callback = function() {};
        }
        $("#page-content").load(getContentPath() + action, args, callback);
    }

}

jQuery.extend({
    /**
     * post提交返回json
     * @param url
     * @param data
     * @param callback
     */
    postJSON: function( url, data, callback ) {
        var type = typeof callback;
        jQuery.post( getContentPath() + url, data, function(data) {
            if (data.code == 0) {
                bootBoxSuccess(data.msg, function () {
                    if (type == "string") {
                        switchPage(callback);
                    } else if(type == "function") {
                        callback(data);
                    }
                });
            } else if (data.code == 1) {
                bootBoxError(data.msg, function() {
                    callback(data);
                });
            } else if (data.code == 3) {
                bootBoxWarning(data.msg, function() {
                    callback(data);
                });
            } else {
                bootBoxConfirm(data.msg, function() {
                    callback(data);
                });
            }
        }, "json" );
    },
    /**
     * 更具不同的返回结果处理，弹出不过的窗口
     * @param data 返回结果
     * @param callback 成立函数
     */
    disposeData: function(data, callback) {
        if (data.code == 0) {
            bootBoxSuccess(data.msg, function () {
                callback(data);
            });
        } else if (data.code == 1) {
            bootBoxError(data.msg, function() {
                callback(data);
            });
        } else if (data.code == 3) {
            bootBoxWarning(data.msg, function() {
                callback(data);
            });
        } else {
            bootBoxConfirm(data.msg, function() {
                callback(data);
            });
        }
    }
});