package com.zlw.qn.mgr.controller;

import com.zlw.qn.framework.message.BaseMessage;
import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QnQuestionDomain;
import com.zlw.qn.mgr.domain.Question;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.mgr.domain.Tag;
import com.zlw.qn.mgr.service.QuestionMgrService;
import com.zlw.qn.model.MyQuestion;
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
import java.util.List;

/**
 * Created by YT on 2015/7/19.
 */
@Controller
@RequestMapping("/questionMgr")
public class QuestionMgrController {

    private static  final Logger LOG= LoggerFactory.getLogger(UnitController.class);

    @Autowired
    private QuestionMgrService questionMgrService;

    @RequestMapping(value = "init")
    public ModelAndView init(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionMgr/questionMgr");
        List<Tag> tagsList = questionMgrService.getTagList();
        List<QusetionType> typeList = questionMgrService.getQusetionTypeList();
        mav.addObject("tags",tagsList);
        mav.addObject("types",typeList);
        return mav;
    }
    @RequestMapping(value = "count")
    public ModelAndView count(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionMgr/pieQues");

        return mav;
    }



    @RequestMapping(value = "detailInit")
    public ModelAndView detailInit(String id){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionMgr/qnDetailQuestion");
        List<Tag> tagsList = questionMgrService.getTagList();
        MyQuestion myQuestion = questionMgrService.useMyQuestionById(id);
        mav.addObject("tags",tagsList);
        mav.addObject("tag",myQuestion.getMyTagByTagId());
        mav.addObject("options",myQuestion.getMyQuestionOptions());
        mav.addObject("myQuestion",myQuestion);
        mav.addObject("types",myQuestion.getMyQuestionTypeByQtype());
        return mav;
    }

    @RequestMapping(value = "addInit")
    public ModelAndView addInit(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionMgr/qnAddQuestion");
        List<Tag> tagsList = questionMgrService.getTagList();
        List<QusetionType> typeList = questionMgrService.getQusetionTypeList();
        mav.addObject("tags",tagsList);
        mav.addObject("types",typeList);
        return mav;
    }

    @RequestMapping(value = "updateInit")
    public ModelAndView updateInit(String id){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/questionMgr/update");
        MyQuestionType myQuestionType = questionMgrService.getMyQuestionTypeById(id);
        mav.addObject("type",myQuestionType);
        return mav;
    }

    @RequestMapping(value = "save")
    @ResponseBody
    public BaseMessage save(QnQuestionDomain domain){
        BaseMessage msg=null;
        try {
            questionMgrService.saveDomain(domain);
            msg=BaseMessage.successMsg("新增成功");
        } catch (Exception e) {
            LOG.error("新增题目失败");
            msg=BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public BaseMessage update(QusetionType domain){
        BaseMessage msg=null;
        try {
            questionMgrService.updateType(domain);
            msg=BaseMessage.successMsg("修改成功");
        } catch (Exception e) {
            LOG.error("修改题库类型失败");
            msg=BaseMessage.errorMsg("修改失败");
        }
        return msg;
    }

    @RequestMapping(value = "queryques")
    @ResponseBody
    public Pager<Question> Pager(PagerQuery pagerQuery,String[] tags,String qtype,String keyword) {
        Pager<Question> pager = null;
        try {
            pager = questionMgrService.pager(pagerQuery,qtype,tags,keyword);
        } catch (Exception e) {
            pager =new Pager<Question>();
            e.printStackTrace();
            LOG.error("查询问题类型出错");
        }
        return pager;
    }

    @RequestMapping(value = "deleteQues")
    @ResponseBody
    public BaseMessage deleteQues(String pks,HttpServletResponse response,HttpServletRequest request) {
        BaseMessage msg=null;
        try {
            questionMgrService.deleteQues(pks);
            msg = BaseMessage.successMsg("删除成功");
        }
        catch (Exception e) {
            LOG.error("删除失败");
            msg = BaseMessage.errorMsg("删除失败");
        }
        return msg;
    }

    @RequestMapping(value = "exportQues")
    @ResponseBody
    public BaseMessage exportQues(String pks,HttpServletResponse response,HttpServletRequest request) {
        BaseMessage msg=null;
        try {
            questionMgrService.updateExportQues(pks);
            msg = BaseMessage.successMsg("发布成功");
        }
        catch (Exception e) {
            LOG.error("批量发布失败");
            msg = BaseMessage.successMsg("发布失败");
        }
        return msg;
    }
}
