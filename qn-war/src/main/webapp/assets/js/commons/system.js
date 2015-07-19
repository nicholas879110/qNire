/**
 * 存放系统相关的字段或方法，不依赖任何第三方js.
 *
 * Created by Dendy on 2014/8/11.
 */

/**
 * 操作返回码
 * @type {{SUCCESS: number, ERROR: number, INFO: number, WARN: number}}
 */
var CODE_ENUM = {"SUCCESS": 0, "ERROR": 1, "INFO": 2, "WARN": 3};

/**
 * 获取系统路径
 * @returns {string} 系统路径
 */
function getContentPath() {
    if (ctx == undefined) {
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var path = pathName.substr(0, index + 1);
        return path;
    } else return ctx;
}