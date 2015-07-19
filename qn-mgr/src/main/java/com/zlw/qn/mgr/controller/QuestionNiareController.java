package com.zlw.qn.mgr.controller;

import com.zlw.qn.framework.message.BaseMessage;
import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QnQuestionDomain;
import com.zlw.qn.mgr.domain.QuestionNiareDomain;
import com.zlw.qn.mgr.service.QuestionNiareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: QuestionNiareController <br>
 * Create DateTime: 15-7-19 下午2:45 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("/qn")
public class QuestionNiareController {


    @Autowired
    private QuestionNiareService questionNiareService;



    @RequestMapping(value = "init")
    public ModelAndView init(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionNaire/qnList");
        return mav;
    }

    @ResponseBody
    @RequestMapping(value = "/pager")
    public Pager<QuestionNiareDomain> pager(PagerQuery pagerQuery) {
        Pager<QuestionNiareDomain> pager = null;
        try {
            pager = questionNiareService.pager(pagerQuery);
        } catch (Exception e) {
            e.printStackTrace();
            pager = new Pager<QuestionNiareDomain>();
        }
        return pager;
    }



    @RequestMapping(value = "add")
    public ModelAndView add(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionNaire/qnAdd");
        return mav;
    }


    @RequestMapping(value = "save")
    @ResponseBody
    public BaseMessage save(QuestionNiareDomain domain) {
        BaseMessage msg=null;
        try {
            questionNiareService.save(domain);
            msg=BaseMessage.successMsg("新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }

    @RequestMapping(value = "edit")
    public ModelAndView edit(Integer id){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionNaire/qnEdit");
        return mav;
    }


    @RequestMapping(value = "update")
     @ResponseBody
     public BaseMessage update(QuestionNiareDomain domain) {
        BaseMessage msg=null;
        try {
            questionNiareService.update(domain);
            msg=BaseMessage.successMsg("新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }


    @RequestMapping(value = "delete")
    @ResponseBody
    public BaseMessage delete(Integer id) {
        BaseMessage msg=null;
        try {
            questionNiareService.delete(id);
            msg=BaseMessage.successMsg("删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }


    @RequestMapping(value = "deploy")
    @ResponseBody
    public BaseMessage deploy(Integer id) {
        BaseMessage msg=null;
        try {
            questionNiareService.deploy(id);
            msg=BaseMessage.successMsg("发布成功");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }


    @RequestMapping(value = "cancelDeploy")
    @ResponseBody
    public BaseMessage cancelDeploy(Integer id) {
        BaseMessage msg=null;
        try {
            questionNiareService.cancelDeploy(id);
            msg=BaseMessage.successMsg("发布成功");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }

    @RequestMapping(value = "preview")
    public ModelAndView preview(Integer id){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionNaire/qnAdd");
        return mav;
    }


    @RequestMapping(value = "count")
    public ModelAndView count(Integer id){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionNaire/qnAdd");
        return mav;
    }


    @RequestMapping(value = "editConntent")
    public ModelAndView editConntent(Integer id){
        ModelAndView mav=new ModelAndView();
        QuestionNiareDomain domain=questionNiareService.queryDomain(id);
        mav.addObject("niare",domain);
        mav.setViewName("/questionNaire/qnEditContent");
        return mav;
    }


    @RequestMapping(value = "addQuestionInit")
    public ModelAndView addQuestionInit(Integer id){
        ModelAndView mav=new ModelAndView();
//        QuestionNiareDomain domain=questionNiareService.queryDomain(id);
        mav.addObject("niareId",id);
        mav.setViewName("/questionNaire/qnAddQuestion");
        return mav;
    }




    @RequestMapping(value = "saveQuestion")
    @ResponseBody
    public BaseMessage saveQuestion(Integer niareId,QnQuestionDomain questionDomain) {
        BaseMessage msg=null;
        try {
            questionNiareService.saveQuestion(niareId,questionDomain);
            msg=BaseMessage.successMsg("保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }

}
