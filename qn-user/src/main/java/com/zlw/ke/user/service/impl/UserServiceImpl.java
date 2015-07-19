package com.zlw.ke.user.service.impl;

import com.zlw.ke.model.SysUser;
import com.zlw.ke.user.dao.UserDao;
import com.zlw.ke.user.service.UserService;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.DistinctRootEntityResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: UserServiceImpl <br>
 * Create DateTime: 14-11-17 下午10:10 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private Md5PasswordEncoder passwordEncoder;

    @Override
    public SysUser queryUserByLoginName(String username) {
        Criteria criteria=userDao.getCriteria(SysUser.class);
        criteria.add(Restrictions.eq("username",username));
        criteria.setFetchMode("priviledges", FetchMode.JOIN);
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return userDao.getUniqueResult(criteria);
    }

    @Override
    public SysUser queryUserById(String id) {
        return userDao.get(SysUser.class,id);
    }

    @Override
    public void updateUser(String userId, String newPassd) {
        SysUser user=queryUserById(userId);
        user.setPassword(passwordEncoder.encodePassword(newPassd,user.getUsername()));
        userDao.update(user);
    }
}
