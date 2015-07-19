package com.zlw.qn.framework.interceptors;


import com.zlw.qn.framework.consts.BaseSystemConst;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 应用程序path拦截器，为所有资源加上path
 *
 * @author dendy
 */
public class ContextPathInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        request.getSession()
                .getServletContext()
                .setAttribute(BaseSystemConst.SYSTEM_CONTEXT_PATH_KEY, request.getContextPath());

        return super.preHandle(request, response, handler);
    }
}
