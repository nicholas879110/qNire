package com.zlw.qn.commons.db;

import org.apache.commons.lang.StringUtils;

/**
 * SQL参数处理工具类
 *
 * @author ChengJianLong
 */
public class SqlUtils {
    /**
     * 格式化like语句参数
     *
     * @param param 查询参数
     *
     * @return 格式化后的查询参数
     */
    public static String formatLikeParam(String param) {
        if (StringUtils.isNotBlank(param)) {
            return param.replaceAll("([\\\\])", "$1$1").replaceAll("([_%＿％])", "\\\\$1");
        }
        return param;
    }
}
