package com.zlw.ke.video.controller;

import com.zlw.ke.framework.message.BaseMessage;
import com.zlw.ke.model.Unit;
import com.zlw.ke.security.util.UserUtil;
import com.zlw.ke.video.domain.UnitDomain;
import com.zlw.ke.video.service.UnitService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: com.zlw.ke.video.controller.UnitController <br>
 * Create DateTime: 14-11-15 下午3:23 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("/unit")
public class UnitController {

    private static  final  Logger LOG= LoggerFactory.getLogger(UnitController.class);

    @Autowired
    private UnitService unitService;

    @RequestMapping(value = "init")
    public ModelAndView initView(){
        ModelAndView mav=new ModelAndView();
        String userId= UserUtil.getUser().getSysUser().getId();
        List<UnitDomain> units=unitService.list(userId);
        mav.addObject("units",units);
        mav.setViewName("unit/unit");
        return mav;
    }

    @RequestMapping(value = "add",method= RequestMethod.POST)
    @ResponseBody
    public BaseMessage add(UnitDomain entity) {
        BaseMessage rs=null;
        try {
            unitService.save(entity);
            rs=BaseMessage.successMsg("保存单元成功！");
        } catch (Exception e) {
            e.printStackTrace();
            rs=BaseMessage.errorMsg(e.getMessage());
        }
        return rs;
    }

    @RequestMapping(value = "update",method=RequestMethod.POST)
    @ResponseBody
    public BaseMessage update(UnitDomain entity) {
        BaseMessage rs=null;
        try {
            unitService.update(entity);
            rs=BaseMessage.successMsg("更新成功！");
        } catch (Exception e) {
            e.printStackTrace();
            rs=BaseMessage.errorMsg(e.getMessage());
        }
        return rs;
    }

    @RequestMapping(value = "delete",method=RequestMethod.POST)
    @ResponseBody
    public BaseMessage delete(String id) {
        BaseMessage rs=null;
        try {
            unitService.delete(id);
            rs=BaseMessage.successMsg("删除单元成功！");
        } catch (Exception e) {
            e.printStackTrace();
            rs=BaseMessage.errorMsg(e.getMessage());
        }
        return rs;
    }

    @RequestMapping(value = "batchDelate",method=RequestMethod.POST)
    @ResponseBody
    public BaseMessage bDelete(String ids) {
        BaseMessage rs=null;
        try {
            unitService.batchDelate(ids);
            rs=BaseMessage.successMsg("删除单元成功！");
        } catch (Exception e) {
            e.printStackTrace();
            rs=BaseMessage.errorMsg(e.getMessage());
        }
        return rs;
    }


    @RequestMapping(value = "list")
    @ResponseBody
    public BaseMessage list(String userId) {
        BaseMessage rs=null;
        if(StringUtils.isBlank(userId)){
            rs=BaseMessage.errorMsg("userId is null");
            return  rs;
        }
        try {
            List<UnitDomain> list= unitService.listUnits(userId);
            rs=BaseMessage.successMsg("success",list);
        } catch (Exception e) {
            e.printStackTrace();
            rs=BaseMessage.errorMsg(e.getMessage());
        }
        return rs;
    }


}
