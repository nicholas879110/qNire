package com.zlw.qn.security.util;

import com.zlw.qn.model.SysUser;
import com.zlw.qn.security.entity.SessionUser;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: UserUtil <br>
 * Create DateTime: 14-11-15 下午3:44 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Component
public class UserUtil {

    private UserUtil(){}

    private String userId;
    private SysUser sysUser;

    /**
     * 获取当前登录用户信息
     *
     * @return 当前登录用户信息
     */
    public static SessionUser getUser() {
        SessionUser user = (SessionUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user;
    }
}
