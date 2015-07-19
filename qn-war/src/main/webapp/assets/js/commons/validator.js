/**
 * validator.js，based on jquery and jquery.validate.js.
 * Extract from jqury.wksc-util.js because of too many reference.
 * Now if you want to use validation function only, you could list
 * jquery.validate.js/jquery.validate.min.js and validator.js. You
 * must list jquery first basically.
 *
 * Created by Dendy on 2014/5/24.
 */

var Validator = {};

/**
 * 自定义验证规则，select下拉选择必需选择，且value必须有值
 */
jQuery.validator.addMethod("selected", function (value, element) {
    return $(element).attr("value") != "";  //option有value属性值
}, "该项必须选择.");

/**
 * 不等于某一字段的值
 */
jQuery.validator.addMethod("notEqualsTo", function (value, element, param) {
    return $(element).val() != $(param).val();
}, "两次输入的值不能相同.");


jQuery.validator.addMethod("notNull", function (value, element, param) {
    return $(element).val() != $(param).val();
}, "不能为空.");

/**
 * 输入的内容必须全为字母
 */
jQuery.validator.addMethod("word", function (value, element) {
    var chrnum = /^([a-zA-Z]+)$/;
    return this.optional(element) || (chrnum.test(value));
}, "内容必须全部为字母");

/**
 * 内容必须全部为中文
 */
jQuery.validator.addMethod("chinese", function (value, element) {
    var chinese = /^[\u4e00-\u9fa5]+$/;
    return this.optional(element) || (chinese.test(value));
}, "只能输入中文");

/**
 * 简单字符串验证规则:字母数字下划线
 */
jQuery.validator.addMethod("simpleString", function (value, element) {
    var pwd = /^\w+$/;
    return this.optional(element) || (pwd.test(value));
}, "格式不正确");

/**
 * 数字字符串验证规则:只能为数字
 */
jQuery.validator.addMethod("simpleAlpha", function (value, element) {
    var rgx = /^\d+$/;
    return this.optional(element) || (rgx.test(value));
}, "只能为数字");

/**
 * 用户名验证规则:字母数字下划线且首字符只能为字母
 */
jQuery.validator.addMethod("username", function (value, element) {
    var pwd = /^[a-zA-Z]\w+$/;
    return this.optional(element) || (pwd.test(value));
}, "格式不正确");

/**
 * 文件大小验证
 */
jQuery.validator.addMethod('filesize', function (value, element, param) {
    var size = 0;
    if (value != "") {
        // IE
        if ($.browser.msie) {
            var myFSO = new ActiveXObject("Scripting.FileSystemObject");
            var filepath = value;
            var thefile = myFSO.GetFile(filepath);
            size = thefile.size / 1024;
        } else {
            size = element.files[0].size / 1024;
        }
    }
    return this.optional(element) || (size <= param);
});

jQuery.validator.addMethod("idCard", function (value, element, params) {
    return idCardValidate(value);
}, "请正确输入身份证号码");

//~ 验证身份证规则 ======================================================================================================
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
function idCardValidate(idCard) {
    idCard = $.trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和
    }
    valCodePosition = sum % 11;                // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (temp_date.getYear() != parseFloat(year)
        || temp_date.getMonth() != parseFloat(month) - 1
        || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/**
 * 通过身份证判断是男是女
 * @param idCard 15/18位身份证号码
 * @return 'female'-女、'male'-男
 */
function maleOrFemalByIdCard(idCard) {
    idCard = $.trim(idCard.replace(/ /g, ""));        // 对身份证号码做处理。包括字符间有空格。
    if (idCard.length == 15) {
        if (idCard.substring(14, 15) % 2 == 0) {
            return 'female';
        } else {
            return 'male';
        }
    } else if (idCard.length == 18) {
        if (idCard.substring(14, 17) % 2 == 0) {
            return 'female';
        } else {
            return 'male';
        }
    } else {
        return null;
    }
}

/**
 * 添加联系电话验证方法
 */
jQuery.validator.addMethod("phoneNum", function (value, element, params) {
    var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (reg.test(value) || value == "") {
        return true;
    }
    return false;
}, "请输入正确联系方式,固定电话需要添加区号：xxx-xxxxxx");

/**
 * 添加拼音证验证方法
 */
jQuery.validator.addMethod("pinyin", function (value, element, params) {
    var reg = /^[\A-Za-z]{1,30}$/;
    if (reg.test(value) || value == "") {
        return true;
    }
    return false;
}, "请输入正确身拼音");

/**
 * 添加经纬度验证方法
 */
jQuery.validator.addMethod("losize", function (value, element, params) {
    var reg = /^(\d+)\.(\d+)$/g;
    if ((reg.test(value) && (RegExp.$1 >= -180 && RegExp.$1 <= 180)) || value == "") {
        return true;
    }
    return false;
}, "请输入正确身经度");

/**
 * 添加经度验证方法
 */
jQuery.validator.addMethod("lasize", function (value, element, params) {
    var reg = /^(\d+)\.(\d+)$/g;
    if ((reg.test(value) && (RegExp.$1 >= -90 && RegExp.$1 <= 90)) || value == "") {
        return true;
    }
    return false;
}, "请输入正确身纬度");

/**
 * 表单验证方法
 *
 * @param form 表单对应的jquery对象
 * @param setting 表单验证规则设置
 * @returns {*|jQuery} 表单对象
 */
Validator.validate = function (form, setting) {
    var defaultSetting = {
        errorElement: 'div',
        errorClass: 'help-block red',
        focusInvalid: false, //焦点无效
        rules: {},
        messages: {},
        invalidHandler: function (event, validator) { //display error alert on form submit
            $('.alert-danger', form).show();
        },
        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },
        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error').addClass('has-success');
            $(e).remove();
        },
        errorPlacement: function (error, element) {
//            if (element.is(':checkbox') || element.is(':radio')) {
//                var controls = element.closest('div[class*="col-"]');
//                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
//                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
//            }
//            else if (element.is('.select2')) {
//                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
//            }
//            else if (element.is('.chosen-select')) {
//                error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
//            }
//            else error.insertAfter(element.parent());
            error.insertAfter(element.parent());
        },
        submitHandler: function (form) {
        }
    };

    var mergeSetting = {};
    if (setting) {
        $.extend(true, mergeSetting, defaultSetting, setting);
    } else {
        $.extend(true, mergeSetting, defaultSetting);
    }
    return $(form).validate(mergeSetting);
}