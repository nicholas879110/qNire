package com.zlw.qn.user.controller;

import com.zlw.qn.framework.message.BaseMessage;
import com.zlw.qn.model.SysUser;
import com.zlw.qn.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserController <br>
 * Create DateTime: 15-2-10 下午10:48 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private Md5PasswordEncoder passwordEncoder;


    @RequestMapping(value = "modifyPassd",method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage modifyPassd(String userId,String oldPassd,String newPassd) {
        BaseMessage msg=null;
        try {
            SysUser user=userService.queryUserById(userId);
            if(!user.getPassword().equalsIgnoreCase(passwordEncoder.encodePassword("123456",user.getUsername()))){
                msg=BaseMessage.errorMsg("the origin password is not right!");
                return msg;
            }
            //user.setPassword(passwordEncoder.encodePassword(newPassd,user.getUsername()));
            userService.updateUser(userId,newPassd);
            msg=BaseMessage.successMsg("modify success");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("modify failure");
        }
        return msg;
    }
}
