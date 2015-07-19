package com.zlw.qn.mgr.controller;

import com.zlw.qn.framework.message.BaseMessage;
import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.mgr.service.QuestionTypeMgrService;
import com.zlw.qn.model.MyQuestionType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by YT on 2015/7/19.
 */
@Controller
@RequestMapping("/questionTypeMgr")
public class QuestionTypeMgrController {

    private static  final Logger LOG= LoggerFactory.getLogger(QuestionTypeMgrController.class);

    @Autowired
    private QuestionTypeMgrService questionTypeMgrService;

    @RequestMapping(value = "init")
    public ModelAndView init(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionTypeMgr/questionTypeMgr");
        return mav;
    }

    @RequestMapping(value = "addInit")
    public ModelAndView addInit(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionTypeMgr/add");
        return mav;
    }

    @RequestMapping(value = "updateInit")
    public ModelAndView updateInit(String id){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionTypeMgr/update");
        MyQuestionType myQuestionType = questionTypeMgrService.getMyQuestionTypeById(id);
        mav.addObject("type",myQuestionType);
        return mav;
    }

    @RequestMapping(value = "save")
    @ResponseBody
    public BaseMessage save(QusetionType domain){
        BaseMessage msg=null;
        try {
            questionTypeMgrService.saveType(domain);
            msg=BaseMessage.successMsg("新增成功");
        } catch (Exception e) {
            LOG.error("新增题库类型失败");
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public BaseMessage update(QusetionType domain){
        BaseMessage msg=null;
        try {
            questionTypeMgrService.updateType(domain);
            msg=BaseMessage.successMsg("修改成功");
        } catch (Exception e) {
            LOG.error("修改题库类型失败");
            msg=BaseMessage.errorMsg("修改失败");
        }
        return msg;
    }

    @RequestMapping(value = "queryTypes")
    @ResponseBody
    public Pager<QusetionType> pager(PagerQuery pagerQuery) {
        Pager<QusetionType> pager = null;
        try {
            pager = questionTypeMgrService.typePager(pagerQuery);
        } catch (Exception e) {
            pager =new Pager<QusetionType>();
            LOG.error("查询问题类型出错");
        }
        return pager;
    }

    @RequestMapping(value = "deleteTypes")
    @ResponseBody
    public BaseMessage deleteTypes(String pks,HttpServletResponse response,HttpServletRequest request) {
        BaseMessage msg=null;
        try {
            questionTypeMgrService.deleteTypes(pks);
            msg = BaseMessage.successMsg("删除成功");
        }
        catch (Exception e) {
            LOG.error("删除失败");
            msg = BaseMessage.successMsg("删除失败");
        }
        return msg;
    }
}
