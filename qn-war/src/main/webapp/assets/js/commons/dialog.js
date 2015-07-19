/**
 * dialog.js，based on jquery and bootbox.js/bootbox.min.js.
 * Extract from jqury.wksc-util.js because of too many reference.
 * Now if you want to use dialog only, you could list bootbox.js/bootbox.min.js and
 * this file. You must list jquery first basically.
 *
 * Created by Dendy on 2014/8/11.
 */

/**
 * 设置bootbox的默认配置
 */
bootbox.setDefaults({
    locale: "zh_CN"
});

/**
 * 成功信息对话框
 * @param message 成功信息
 * @param callback 点击确定后的回调函数
 */
function bootBoxSuccess(message, callback) {
    var options = {
        message: message,
        title: "成功信息",
        buttons: {
            ok: {
                label: "关闭",
                className: "btn-sm btn-success"
            }
        }
    };

    if (callback && $.isFunction(callback)) {
        options.callback = callback;
    }

    bootbox.alert(options);
}
function bootBoxInitData(message, callback) {
    var options = {
        message: message,
        title: "数据导入中",
        buttons: {
            ok: {
                label: "关闭",
                className: "btn-sm btn-success"
            }
        }
    };

    if (callback && $.isFunction(callback)) {
        options.callback = callback;
    }

    bootbox.alert(options);
}

/**
 * 失败信息对话框
 * @param message 失败信息
 * @param callback 点击确定后的回调函数
 */
function bootBoxError(message, callback) {
    var options = {
        message: message,
        title: "失败信息",
        buttons: {
            ok: {
                label: "关闭",
                className: "btn-sm btn-danger"
            }
        }
    };

    if (callback && $.isFunction(callback)) {
        options.callback = callback;
    }

    bootbox.alert(options);
}

/**
 * 警告信息对话框
 * @param message 警告信息
 * @param callback 点击确定后的回调函数
 */
function bootBoxWarning(message, callback) {
    var options = {
        message: message,
        title: "警告信息",
        buttons: {
            ok: {
                label: "关闭",
                className: "btn-sm btn-warning"
            }
        }
    };

    if (callback && $.isFunction(callback)) {
        options.callback = callback;
    }

    bootbox.alert(options);
}

/**
 * 确认信息对话框
 * @param message 确认信息
 * @param callback 点击确定后的回调函数
 */
function bootBoxConfirm(message, callback) {
    var options = {
        message: message,
        title: "确认信息",
        buttons: {
            cancel: {
                className: "btn-sm btn-default"
            },
            confirm: {
                className: "btn-sm btn-primary"
            }
        }
    };

    if (callback && $.isFunction(callback)) {
        options.callback = callback;
    }

    bootbox.confirm(options);
}

/**
 * 自定义信息对话框
 * @param options 对话框参数
 */
function bootBoxDialog(options) {
    bootbox.dialog(options);
}
