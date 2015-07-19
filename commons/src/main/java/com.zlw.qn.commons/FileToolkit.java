package com.zlw.qn.commons;

import org.springframework.web.context.ContextLoader;

import javax.servlet.http.HttpServletRequest;

/**
 * web容器文件路径工具类
 * Created by yl on 14-9-10.
 */
public class FileToolkit {
    /**
     * 获取web容器根目录
     *
     * @return
     */
    public static String getWebRootPath() {
        return ContextLoader.getCurrentWebApplicationContext().getServletContext().getRealPath("/");
    }

    /**
     * http://localhost:8080/ce/
     *
     * @param req
     * @return
     */
    public static String getProjectURL(HttpServletRequest req) {
//        String str = req.getHeader("Referer");
        //获取当前访问ip地址，返回localhost,ip地址，域名（未测试）
        return req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + req.getContextPath() + "/";

    }

    /**
     * 提供保存入库的路径分隔符，win和linux统一
     *
     * @return
     */
    public static String getSeparatorForURL() {
        return "/";
    }
}
