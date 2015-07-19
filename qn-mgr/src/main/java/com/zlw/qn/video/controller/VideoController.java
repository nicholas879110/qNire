package com.zlw.qn.video.controller;

import com.zlw.qn.framework.message.BaseMessage;
import com.zlw.qn.model.Video;
import com.zlw.qn.user.service.UserService;
import com.zlw.qn.video.domain.VideoDomain;
import com.zlw.qn.video.helper.VideoPlayOrderHelper;
import com.zlw.qn.video.service.VideoService;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.io.*;
import java.util.List;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: VideoController <br>
 * Create DateTime: 14-11-15 下午4:01 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Controller
@RequestMapping("/video")
public class VideoController {

    private static final Logger LOG = LoggerFactory.getLogger(VideoController.class);
    private static final String SOURCE_FOLDER = "/VIDEO_FILE";
    private static final Byte SHORT = 0;
    @Autowired
    private VideoService videoService;
    @Autowired
    private UserService userService;
    @Autowired
    private ServletContext context;

    @RequestMapping(value = "init")
    public ModelAndView initView(String unitId) {
        ModelAndView mav = new ModelAndView();
        List<VideoDomain> videos = videoService.list(null, unitId, SHORT);
        mav.addObject("videos", videos);
        mav.addObject("unitId", unitId);
        mav.setViewName("/video/video");
        return mav;
    }

    @RequestMapping(value = "upload")
    @ResponseBody
    public BaseMessage upload(String unitId, String ch, String en, @RequestParam MultipartFile file, HttpServletRequest request, HttpServletResponse response) {
        BaseMessage msg = null;
        try {
            videoService.saveVideo(unitId, ch, en, file, SHORT);
            msg = BaseMessage.successMsg("upload success");
        } catch (Exception e) {
            e.printStackTrace();
            msg = BaseMessage.errorMsg("upload error");
        }
        return msg;
    }

    @RequestMapping(value = "update")
    @ResponseBody
    public BaseMessage update(String id, String ch, String en, @RequestParam MultipartFile file, HttpServletRequest request, HttpServletResponse response) {
        BaseMessage msg = null;
        try {
            videoService.updateVideo(id, ch, en, file);
            msg = BaseMessage.successMsg("update success");
        } catch (Exception e) {
            e.printStackTrace();
            msg = BaseMessage.errorMsg("update error");
        }
        return msg;
    }

    @RequestMapping(value = "delete")
    @ResponseBody
    public BaseMessage delete(String id) {
        BaseMessage msg = null;
        try {
            videoService.deleteVideo(id);
            msg = BaseMessage.successMsg("update success");
        } catch (Exception e) {
            e.printStackTrace();
            msg = BaseMessage.errorMsg("update error");
        }
        return msg;
    }

    @RequestMapping(value = "list")
    @ResponseBody
    public BaseMessage list(String unitId) {
        BaseMessage msg = null;
        if (StringUtils.isBlank(unitId)) {
            msg = BaseMessage.errorMsg("unitId is null");
            return msg;
        }
        try {
            List<VideoDomain> videos = videoService.list(null, unitId, SHORT);
            VideoPlayOrderHelper.sortAscVideos(videos);
            msg = BaseMessage.successMsg("success", videos);
        } catch (Exception e) {
            e.printStackTrace();
            msg = BaseMessage.errorMsg("error");
        }
        return msg;
    }

    @RequestMapping(value = "download")
    public void download(String id, HttpServletRequest request, HttpServletResponse response) {
        BaseMessage msg = null;
        if (StringUtils.isBlank(id)) {
            return;
        }
        Video video = videoService.queryVideo(id);
        String path = video.getUrl();
        String srcFolderPath = context.getRealPath("/") + path;
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(new File(srcFolderPath));
            // 设置响应头和保存文件名
//            response.setContentType("APPLICATION/OCTET-STREAM");
            response.addHeader("Content-Length", new File(srcFolderPath).length() + "");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + video.getName() + ".mp4" + "\"");// 写出流信息
            int b = 0;
            try {
                OutputStream out = response.getOutputStream();
                while ((b = fis.read()) != -1) {
                    out.write(b);
                }
                out.close();
                out.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
