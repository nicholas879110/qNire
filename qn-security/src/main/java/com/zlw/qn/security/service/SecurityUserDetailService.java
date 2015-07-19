package com.zlw.qn.security.service;

import com.zlw.qn.model.Priviledge;
import com.zlw.qn.model.SysUser;
import com.zlw.qn.security.entity.SessionUser;
import com.zlw.qn.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: SecurityUserDetailService <br>
 * Create DateTime: 14-11-17 下午8:27 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Service("securityUserDetailService")
public class SecurityUserDetailService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (username == null || "".equals(username))
            throw new UsernameNotFoundException("the login username must not be null");
        SysUser user = userService.queryUserByLoginName(username);
        if (user == null)
            throw new UsernameNotFoundException("Bad credentials");
       /* if (!Constant.AccountStatus.ACTIVE.getCode().equals(account.getStatus()))
            throw new UsernameNotFoundException("users are prohibited from");*/
        List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        for(Priviledge priviledge:user.getPriviledges()){
            grantedAuthorities.add(new SimpleGrantedAuthority(priviledge.getCode()));
        }
        return new SessionUser(user, grantedAuthorities);
    }
}
