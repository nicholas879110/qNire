package com.zlw.qn.mgr.controller;

import com.zlw.qn.framework.message.BaseMessage;
import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.Tag;
import com.zlw.qn.mgr.service.TagMgrService;
import com.zlw.qn.model.MyTag;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;

/**
 * Created by YT on 2015/7/19.
 */
@Controller
@RequestMapping("/tagMgr")
public class TagMgrController {

    private static final Logger LOG = LoggerFactory.getLogger(UnitController.class);

   @Autowired
    private TagMgrService tagMgrService;

    @RequestMapping(value = "init")
    public ModelAndView init() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/tagMgr/tagMgr");
        return mav;
    }

    @RequestMapping(value = "addInit")
    public ModelAndView addInit() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/tagMgr/add");
        return mav;
    }

    @RequestMapping(value = "updateInit")
    public ModelAndView updateInit(String id) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/tagMgr/update");
        MyTag myTag = tagMgrService.getMyTagById(id);
        mav.addObject("tag", myTag);
        return mav;
    }

    @RequestMapping(value = "save")
    @ResponseBody
    public BaseMessage save(Tag domain, HttpServletRequest request, HttpServletResponse response) {
        BaseMessage msg = null;
        try {
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile imgFile = multipartRequest.getFile("tagImg");
            String path = request.getSession().getServletContext().getRealPath("/")+"img_save_path";

            Calendar calendar = Calendar.getInstance();
            Long time = calendar.getTimeInMillis();
            String fileName = time.toString()+"/"+imgFile.getOriginalFilename();
            if (imgFile.getSize() > 0) {
                tagMgrService.saveFileFromInputStream(imgFile.getInputStream(), path,time.toString() ,fileName);
            }
            if(StringUtils.isNotBlank(imgFile.getOriginalFilename())){
                domain.setTagImgPath(fileName);
            }
            tagMgrService.saveTag(domain);
            msg = BaseMessage.successMsg("新增成功");
        } catch (Exception e) {
            LOG.error("新增标签类型失败");
            msg = BaseMessage.errorMsg("新增失败");
        }
        return msg;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public BaseMessage update(Tag domain,HttpServletRequest request, HttpServletResponse response) {
        BaseMessage msg = null;
        try {
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            MultipartFile imgFile = multipartRequest.getFile("tagImg");
            String path = request.getSession().getServletContext().getRealPath("/")+"img_save_path";
            Calendar calendar = Calendar.getInstance();
            Long time = calendar.getTimeInMillis();
            String fileName = time.toString()+"/"+imgFile.getOriginalFilename();
            if (imgFile.getSize() > 0) {
                tagMgrService.saveFileFromInputStream(imgFile.getInputStream(), path, time.toString(),fileName);
            }
            if(StringUtils.isNotBlank(imgFile.getOriginalFilename())){
                domain.setTagImgPath(fileName);
                tagMgrService.deleteTagImg(domain.getId());
            }
            tagMgrService.updateTag(domain);
            msg = BaseMessage.successMsg("修改成功");
        } catch (Exception e) {
            LOG.error("修改标签失败");
            msg = BaseMessage.errorMsg("修改失败");
        }
        return msg;
    }

    @RequestMapping(value = "queryTags")
    @ResponseBody
    public Pager<Tag> Pager(PagerQuery pagerQuery) {
        Pager<Tag> pager = null;
        try {
            pager = tagMgrService.pager(pagerQuery);
        } catch (Exception e) {
            pager = new Pager<Tag>();
            LOG.error("查询标签出错");
        }
        return pager;
    }

    @RequestMapping(value = "deleteTags")
    @ResponseBody
    public BaseMessage deleteTypes(String pks, HttpServletResponse response, HttpServletRequest request) {
        BaseMessage msg = null;
        try {
            tagMgrService.deleteTags(pks);
            msg = BaseMessage.successMsg("删除成功");
        } catch (Exception e) {
            LOG.error("删除失败");
            msg = BaseMessage.successMsg("删除失败");
        }
        return msg;
    }
}
