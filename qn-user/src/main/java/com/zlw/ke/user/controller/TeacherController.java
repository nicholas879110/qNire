package com.zlw.ke.user.controller;

import com.zlw.ke.framework.message.BaseMessage;
import com.zlw.ke.framework.page.Pager;
import com.zlw.ke.framework.page.PagerQuery;
import com.zlw.ke.model.Priviledge;
import com.zlw.ke.user.domain.PriviledgeDomain;
import com.zlw.ke.user.domain.TeacherDomain;
import com.zlw.ke.user.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: TeacherController <br>
 * Create DateTime: 14-12-8 下午9:03 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("/tea")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @RequestMapping(value = "init")
    public ModelAndView initView(){
        ModelAndView mav=new ModelAndView();
        //List<TeacherDomain> videos=teacherService.list(domain,query);
//        mav.addObject("videos",videos);
        mav.setViewName("/teacher/teacher");
        return mav;
    }

    @ResponseBody
    @RequestMapping(value = "/pager")
    public Pager<TeacherDomain> pager(TeacherDomain domain,PagerQuery  query) {
        Pager<TeacherDomain> pager = null;
        try {
            pager = teacherService.pager(domain,query);
        } catch (Exception e) {
            pager = new Pager<TeacherDomain>();
        }
        return pager;
    }

    @RequestMapping(value = "add")
    @ResponseBody
    public BaseMessage add(TeacherDomain domain) {
        BaseMessage msg=null;
        try {
            teacherService.saveTeacher(domain);
            msg=BaseMessage.successMsg("add success");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("add error");
        }
        return msg;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public BaseMessage update(TeacherDomain domain) {
        BaseMessage msg=null;
        try {
            teacherService.updateTeacher(domain);
            msg=BaseMessage.successMsg("update success");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("update error");
        }
        return msg;
    }


    @RequestMapping(value = "delete")
    @ResponseBody
    public BaseMessage delete(String id) {
        BaseMessage msg=null;
        try {
            teacherService.deleteTeacher(id);
            msg=BaseMessage.successMsg("delete success");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("delete error");
        }
        return msg;
    }


    @RequestMapping(value = "setPri")
    @ResponseBody
    public BaseMessage setPriviledge(String id,String priIds) {
        BaseMessage msg=null;
        try {
            teacherService.setPriviledge(id, priIds);
            msg=BaseMessage.successMsg("set priviledge success");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("set priviledge error");
        }
        return msg;
    }


    @RequestMapping(value = "showPris")
    @ResponseBody
    public BaseMessage showPris(String id) {
        BaseMessage msg=null;
        try {
            List<PriviledgeDomain> list=teacherService.showPris(id);
            msg=BaseMessage.successMsg("get priviledge data success",list);
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("get priviledge data error");
        }
        return msg;
    }

    @RequestMapping(value = "list",method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage list() {
        BaseMessage msg=null;
        try {
            List<TeacherDomain> list=teacherService.list();
            msg=BaseMessage.successMsg("get teacher data success",list);
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("get teacher data error");
        }
        return msg;
    }



}
