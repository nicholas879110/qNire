/**
 * 2014-7-30 14:59:13 将验证框架提到validator.js中.
 */
(function ($) {
    $.serializeJson = function (id) {
        var serializeObj = {};
        var array = $(id).serializeArray();
        $(array).each(function () {
                if (this.value != null && this.value != "") {
                    if (serializeObj[this.name]) {
                        serializeObj[this.name] += ',' + this.value;
//                    if ($.isArray(serializeObj[this.name])) {
//                        serializeObj[this.name].push(this.value);
//                    } else {
//                        serializeObj[this.name] = [serializeObj[this.name], this.value];
//                    }
                    } else {
                        serializeObj[this.name] = this.value;
                    }
                }
            }
        );
        return serializeObj;
    };

    /**
     * 添加仅数字最多6位验证方法
     */
    $.validator.addMethod("studyNumber", function (value, element, params) {
        var reg = /^([0-9]{1,6})$/;
        if (reg.test(value) || value == "") {
            return true;
        }
        return false;

    }, "您的输入有误");

    $.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
        _title: function(title) {
            var $title = this.options.title || '&nbsp;'
            if( ("title_html" in this.options) && this.options.title_html == true )
                title.html($title);
            else title.text($title);
        }
    }));

})(jQuery);

/**
 * 设置inputlimiter默认配置
 */
$.extend($.fn.inputlimiter.defaults, {
    remText: '还可输入%n个字符，',
    limitText: '最多可输入%n个字符。'
});

/**
 * 设置mask默认验证规则配置
 */
$.extend($.mask.definitions, {
    '2': "[3|4|5|7|8]",
    '8': "[0-9|X|x]"
});

/**
 * 设置datepicker默认配置
 */
$.extend($.fn.datepicker.defaults, {
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    endDate: new Date(),
    todayBtn: 'linked',
    autoclose: true
});

/**
 * 设置select2默认配置
 */
$.extend($.fn.select2.defaults, {
    dropdownAutoWidth: true,
    allowClear: true,
    dropdownCssClass: "bigdrop"
});

/**
 * String replaceAll
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2); //g全局
};

/**
 * 格式化String
 * 例如:
 *   例1: var str = "a={0},b={1}";
 *        var a = aa;
 *        var b = bb;
 *        str.format(a, b);
 *        输出：a=aa,b=bb
 *   例2：var str = "a={a},b={b},c={c.a}";
 *        var data = {"a":"aa", "b":"bb", "c":{"a":"ca","b":"cb"}};
 *        str.format(data);
 *        输出：a=aa,b=bb,c=ca
 *   例3：var str = "a={a}";
 *        str.format();
 *        输出：a={a}
 *
 * @returns {string}
 */
String.prototype.format = function () {
    var args = arguments;
    if (args.length > 0) {
        if (args.length == 1 && args[0] instanceof Object) {
            args = args[0];
            return this.replace(/\{((\w+)(\.\w+)*)\}/g,
                function (m, i) {
                    return _replaceJSONParam(args, i);
                });
        } else {
            return this.replace(/\{(\d+)\}/g,
                function (m, i) {
                    return args[i];
                });
        }
    } else {
        return this.toString();
    }
};

/**
 * 迭代替换字符串模板中的JSON参数值
 * @param args JSON对象
 * @param i JSON参数名称
 * @returns {*} JSON参数名称对应值
 * @private
 */
function _replaceJSONParam(args, i) {
    var indexArray = i.split(".");
    if (indexArray.length == 1) {
        return args[indexArray[0]];
    } else {
        return _replaceJSONParam(args[indexArray[0]], i.substring(i.indexOf(".") + 1, i.length));
    }
}

/**
 * 装载查询表单参数
 * @param aoData dataTables默认查询参数
 * @param queryFormId 查询表单ID
 */
function setupQueryParameter(aoData, queryFormId) {
    var queryParameters = $(queryFormId).serializeArray();
    $(queryParameters).each(function (i, v) {
            aoData.push(v);
    });
}

/**
 * 注册resetForm插件
 */
$.fn.extend({
    resetForm: function () {
        var form = $(this);
        // 重置表单数据
        form[0].reset();
        // 重置表单样式
        form.find(".form-group").removeClass("has-error has-info");
        // 重置远程验证输入框验证结果
        form.find(".form-group :text").each(function (i, v) {
            var previousValue = $(v).data("previousValue");
            if (previousValue) {
                previousValue.old = null;
            }
        });
        form.find(".form-group :file").each(function (i, v) {
            var previousValue = $(v).data("previousValue");
            if (previousValue) {
                previousValue.old = null;
            }
        });
    }
});

/**
 * 生成zTree对象
 * @param treeId zTree对象展示区域ID
 * @param setting 初始化配置
 * @param zNodes 节点数据
 */
function zTree(treeId, setting, zNodes) {
    var defaultSetting = {
        view: {
            dblClickExpand: false,
            showIcon: false,
            showLine: false
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    var mergeSetting = {};
    if (setting) {
        $.extend(true, mergeSetting, defaultSetting, setting);
    } else {
        $.extend(true, mergeSetting, defaultSetting);
    }
    $.fn.zTree.destroy(treeId);
    return $.fn.zTree.init($("#" + treeId), mergeSetting, zNodes);
}

/**
 * 通用Ztree生成函数
 * @param selectId 需要生成树的selectId
 * @param setting 生成ztree规则
 * @param zNode 数据
 */
function myTree(selectId, setting, zNode) {
    var menuContent = selectId + "menuContent";
    var treeDemo = selectId + "treeDemo";
    var tree = '<div id="' + menuContent + '" style="display:none;position:absolute;z-index: 10000"><ul id="' + treeDemo + '" class="ztree"></ul></div>';
    var tparent = $("#" + selectId).parent().parent();
    tparent.append(tree);

    var defaultSetting = {
        callback: {
            beforeClick: function (treeId, treeNode) {
                var check = (treeNode);
                return check;
            },
            onClick: function (e, treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj(treeId),
                    nodes = zTree.getSelectedNodes(),
                    v = "",
                    I = "";
                nodes.sort(function compare(a, b) {
                    return a.id - b.id;
                });
                for (var i = 0, l = nodes.length; i < l; i++) {
                    v += nodes[i].name + ",";
                    I += nodes[i].id + ",";
                }
                if (v.length > 0) v = v.substring(0, v.length - 1);
                if (I.length > 0) I = I.substring(0, I.length - 1);
                var cityObj = $("#" + selectId);
                cityObj.empty();
                cityObj.append('<option value="' + I + '" style="display:none;">' + v + '</option>');
                hideMenu();
            }
        }
    };

    $("#" + selectId).click(function () {
        this.blur();
        showMenu();
    });

    function showMenu() {
        var cityObj = $("#" + selectId);
        var cityPosition = $("#" + selectId).parent().position();
        $("#" + menuContent).css({left: cityPosition.left + "px", top: cityPosition.top + cityObj.outerHeight() + "px", width: ($("#" + selectId).outerWidth()) + "px"}).slideDown("fast");
        $("body").bind("mousedown", onBodyDown);
    }

    function hideMenu() {
        $("#" + menuContent).fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }

    function onBodyDown(event) {
        if (!(event.target.id == menuContent || $(event.target).parents("#" + menuContent).length > 0)) {
            hideMenu();
        }
    }

    var mergeSetting = {};

    if (setting) {
        $.extend(true, mergeSetting, defaultSetting, setting);
    } else {
        $.extend(true, mergeSetting, defaultSetting);
    }

    return zTree(treeDemo, mergeSetting, zNode);
}

/**
 * 默认选中树节点
 * @param treeObj 树对象
 * @param checkKey 通过什么字段被选中
 * @param checkVal 选中字段值
 */
function myTreeCheck(treeObj, checkKey, checkVal) {
    //获取需要生成树的selet id 有树对象ID截取
    var selId = treeObj.setting.treeId;
    selId = selId.substring(0, selId.length - 8);
    var node = treeObj.getNodeByParam(checkKey, checkVal);
    if (null != node) {
        $("#" + selId).empty();
        $("#" + selId).append('<option value="' + node.id + '" style="display:none;">' + node.name + '</option>');
        treeObj.selectNode(node, false);
    }
}

/**
 * 装载表单元素数据
 * @param formId 表单ID
 * @param aData 表单数据，JSON格式
 */
function setupFormElementVal(formId, aData) {
    var form = $(formId);
    var inputElements = form.find("input[name]");
    inputElements.each(function (i, v) {
        //是radio单选标签
        if ($(v).attr('type') == 'radio' || $(v).attr('type') == 'checkbox') {
            //标签值等于要修改数据对应的值，将标签设置为选中状态
            if ($(v).val() == aData[$(v).attr("name")]) {
//                $(v).attr('checked', true);
                $(v).click();
            }
        } else {
            $(v).val(aData[$(v).attr("name")]);
        }

    });
    var textareaElements = form.find("textarea[name]");
    textareaElements.each(function (i, v) {
        $(v).val(aData[$(v).attr("name")])
    });
    var selectElements = form.find("select[name]");
    selectElements.each(function (i, v) {
        $(v).val(aData[$(v).attr("name")]);
    });
}

function formatDate(dateStr, format) {
    if (!dateStr) {
        return null;
    }
    var date = new Date(dateStr);

    var o = {
        "M+": date.getMonth() + 1, // month
        "d+": date.getDate(), // day
        "h+": date.getHours(), // hour
        "m+": date.getMinutes(), // minute
        "s+": date.getSeconds(), // second
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        "S": date.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/**
 * datarangepicker中文国际化
 * @type {{applyLabel: string, cancelLabel: string, fromLabel: string, toLabel: string, weekLabel: string, customRangeLabel: string}}
 */
var dataRangePicker_local_cn = {
    applyLabel: '确定',
    cancelLabel: '取消',
    fromLabel: '开始时间',
    toLabel: '结束时间',
    weekLabel: '周',
    customRangeLabel: '时间范围'
};

/**
 * 数字+0前缀数组
 */
var _NUMBER_WITH_ZERO_PREFIX = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

/**
 * 获取+0前缀格式的数字[两位]字符串
 * 例如：0 返回 00, 1 返回 01, 11 返回 11
 * @param num 数字
 * @returns {*} 格式化后的数字字符串
 */
function getZeroPrefixNum(num) {
    if (num >= 0 && num < 10) {
        return _NUMBER_WITH_ZERO_PREFIX[num];
    } else {
        return num;
    }
}

/**
 * 将分钟数转换为格式为"时:分"的字符串
 * @param minute 分钟数
 * @return {*} 格式为"时:分"的字符串
 */
function minuteConvertHourMinute(minute) {
    if (minute && minute > 0) {
        return getZeroPrefixNum(parseInt(minute / 60)) + ":" + getZeroPrefixNum(minute % 60);
    } else {
        return "00:00";
    }
}

/**
 * 将"时:分"的字符串转换为分钟
 * 将"时.分"的字符串转换为分钟
 * @param hhmm "时:分"字符串
 * @returns {*}
 */
function hourMinuteConvertMinute(hhmm) {
    if (/^\d+:\d+$/.test(hhmm)) {
        var temp = hhmm.split(":");
        return parseInt(temp[0]) * 60 + parseInt(temp[1]);
    } else if (/^\d+.\d+$/.test(hhmm)) {
        var temp = hhmm.split(".");
        return parseInt(temp[0]) * 60 + parseInt(temp[1]) * 6;
    } else {
        return null;
    }
}

/**
 * 判断浏览器
 * @param ns 判断结果对象
 * @returns {*}
 */
function detectBrowser() {
    var ns = {};
    var ua = ns.ua = navigator.userAgent;
    ns.isWebKit = (/webkit/i).test(ua);
    ns.isMozilla = (/mozilla/i).test(ua);
    ns.isIE = "ActiveXObject" in window;
    ns.isFirefox = (/firefox/i).test(ua);
    ns.isChrome = (/chrome/i).test(ua);
    ns.isSafari = (/safari/i).test(ua) && !this.isChrome;
    ns.isMobile = (/mobile/i).test(ua);
    ns.isOpera = (/opera/i).test(ua);
    ns.isIOS = (/ios/i).test(ua);
    ns.isIpad = (/ipad/i).test(ua);
    ns.isIpod = (/ipod/i).test(ua);
    ns.isIphone = (/iphone/i).test(ua) && !this.isIpod;
    ns.isAndroid = (/android/i).test(ua);
    ns.supportStorage = "localStorage" in window;
    ns.supportOrientation = "orientation" in window;
    ns.supportDeviceMotion = "ondevicemotion" in window;
    ns.supportTouch = "ontouchstart" in window;
    ns.supportTransform3d = ('WebKitCSSMatrix' in window);
    ns.cssPrefix = ns.isWebKit ? "webkit" : ns.isFirefox ? "Moz" : ns.isOpera ? "O" : ns.isIE ? "ms" : "";
    return ns;
}

/**
 * 判断是否是移动设备
 * @returns {boolean}
 */
function detectMobile() {
    var ns = detectBrowser();
    if (ns.isIOS || ns.isIpad || ns.isIpod || ns.isIphone || ns.isAndroid || ns.isMobile) {
        return true;
    } else {
        return false;
    }
}

/**
 * 异步请求
 *
 * @author Dendy
 * @since 2013-10-29 16:48:01
 * @param url 请求url
 * @param args 请求参数
 * @param successCallback 成功后回调
 * @param erroCallback 错误后回调
 * @param tipMsg 加载框提示信息
 * @param async 是否异步请求，默认为true
 * @param showLoading 是否显示加载对话框,默认不显示
 * @param type loading样式，- 0-条形样式，1-旋转图片样式
 */
function ajax(url, args, successCallback, erroCallback, async, showLoading, tipMsg, type) {
    if (!url) {
        Error("url地址不能为空！");
        return;
    }

    if (showLoading)
        startLoading(tipMsg || "处理", type);

    if (async == undefined || async == null || async === '') {
        async = true;
    }

    var self = this;
    $.ajax({
        url: url,
        dataType: "json",
        type: "post",
        data: args || {},
        async: async,
        success: function (data) {
            try {
                successCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        },
        error: function (data) {
            try {
                erroCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        },
        complete: function (xhr, textstatus) {
            if (showLoading)
                endLoading();
        }
    });
}

/**
 * 异步提交表单
 *
 * @param form 提交的表单-dom对象
 * @param successCallback 提交成功回调
 * @param errorCallback 提交失败回调
 * @param showLoading 是否显示加载动画
 * @param tipMsg 加载动画提示信息，如"保存", "提交".
 */
function ajaxSubmitForm(form, successCallback, errorCallback, showLoading, tipMsg) {
    if (!form) {
        Error("目标form不能为空！");
        return;
    }
    if (showLoading)
        startLoading(tipMsg || "提交");

    var self = this;
    $(form).ajaxSubmit({
        dataType: 'json',
        success: function (data) {
            try {
                successCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        }, error: function (data) {
            try {
                errorCallback.call(self, data);
            } catch (e) {
//				console.log(e);
            }
        }, complete: function () {
            if (showLoading)
                endLoading();
        }
    });
}
/**
 * 通用表单验证函数
 * @param formId 表单ID
 * @param setting 验证规则
 * @returns 验证表单对象
 */
function validForm(formId, setting) {
    var defaultSetting = {
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false, //焦点无效
        rules: {},
        messages: {},
        invalidHandler: function (event, validator) { //display error alert on form submit
            $('.alert-danger', $('.login-form')).show();
        },
        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },
        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
            $(e).remove();
        },
        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('div[class*="col-"]');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            }
//            else if (element.is('.select2')) {
//                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
//            }
//            else if (element.is('.chosen-select')) {
//                error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
//            }
            else error.insertAfter(element.parent());
//            error.insertAfter(element.parent());
        },
        submitHandler: function (form) {
        },
        callback:function(data){
        }
    };

    var mergeSetting = {};

    if (setting) {
        $.extend(true, mergeSetting, defaultSetting, setting);
    } else {
        $.extend(true, mergeSetting, defaultSetting);
    }

    return $(formId).validate(mergeSetting);
}

