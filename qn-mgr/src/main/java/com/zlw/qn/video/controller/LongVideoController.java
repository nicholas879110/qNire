package com.zlw.qn.video.controller;

import com.zlw.qn.framework.message.BaseMessage;
import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.user.service.UserService;
import com.zlw.qn.video.domain.VideoDomain;
import com.zlw.qn.video.service.VideoService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: LongVideoController <br>
 * Create DateTime: 14-11-20 下午11:05 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("/lv")
public class LongVideoController {

    private static final Byte LONG=1;

    @Autowired
    private VideoService videoService;

    @Autowired
    private UserService userService;

    @Autowired
    private ServletContext context;

    @RequestMapping(value = "init")
    public ModelAndView init(){
        ModelAndView mav=new ModelAndView();
        mav.setViewName("/lv/lv");
        return mav;
    }

    /**
     * 分页查询用户信息
     *
     * @return 用户信息
     */
    @ResponseBody
    @RequestMapping(value = "/pager")
    public Pager<VideoDomain> pager(PagerQuery pagerQuery) {
        Pager<VideoDomain> pager = null;
        try {
            pager = videoService.pager(pagerQuery,LONG);
        } catch (Exception e) {
            pager = new Pager<VideoDomain>();
        }
        return pager;
    }



    @RequestMapping(value = "upload")
    @ResponseBody
    public BaseMessage upload(String ch,String en,@RequestParam MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
        BaseMessage msg=null;
        try {
            videoService.saveVideo(null,ch,en,file,LONG);
            msg=BaseMessage.successMsg("upload success");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("upload error");
        }
        return msg;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public BaseMessage update(String id,String ch,String en,@RequestParam  MultipartFile file,HttpServletRequest request, HttpServletResponse response) {
        BaseMessage msg=null;
        try {
            videoService.updateVideo(id,ch,en,file);
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
            videoService.deleteVideo(id);
            msg=BaseMessage.successMsg("update success");
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("update error");
        }
        return msg;
    }


    @RequestMapping(value = "list")
    @ResponseBody
    public BaseMessage list(String userId) {
        BaseMessage msg=null;
        if(StringUtils.isBlank(userId)){
            msg=BaseMessage.errorMsg("userId is null");
            return msg;
        }
        try {
            List<VideoDomain> videos=videoService.list(userId,null,LONG);
            msg=BaseMessage.successMsg("success",videos);
        } catch (Exception e) {
            e.printStackTrace();
            msg=BaseMessage.errorMsg("error");
        }
        return msg;
    }
}
