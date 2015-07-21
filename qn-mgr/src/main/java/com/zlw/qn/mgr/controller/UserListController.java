package com.zlw.qn.mgr.controller;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QuestionNiareDomain;
import com.zlw.qn.mgr.domain.UserDomain;
import com.zlw.qn.mgr.domain.VideoDomain;
import com.zlw.qn.mgr.service.UserListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserListController <br>
 * Create DateTime: 15-7-20 下午10:41 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("user")
public class UserListController {

    @Autowired
    private UserListService userListService;



    @RequestMapping(value = "init")
    public ModelAndView init(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/userList/userList");
        return mav;
    }

    @RequestMapping(value = "count")
    public ModelAndView count(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/userList/pieQues");
        return mav;
    }

    @ResponseBody
    @RequestMapping(value = "/pager")
    public Pager<UserDomain> pager(PagerQuery pagerQuery) {
        Pager<UserDomain> pager = null;
        try {
            pager = userListService.pager(pagerQuery);
        } catch (Exception e) {
            pager = new Pager<UserDomain>();
        }
        return pager;
    }
}
