package com.zlw.qn.portal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: PortalController <br>
 * Create DateTime: 14-11-17 下午10:19 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("/portal")
public class PortalController {


    /**
     *  主页初始化
     * @return
     */
    @RequestMapping(value = "main")
    public ModelAndView initView(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/portal/main");
        return mav;
    }
}
