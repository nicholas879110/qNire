package com.zlw.qn.user.service;

import com.zlw.qn.model.SysUser;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: UserService <br>
 * Create DateTime: 14-11-17 下午8:28 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public interface UserService {

    SysUser queryUserByLoginName(String username);

    SysUser queryUserById(String id);


    void updateUser(String userId, String newPassd);
}
