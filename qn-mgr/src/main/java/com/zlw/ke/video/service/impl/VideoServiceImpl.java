package com.zlw.ke.video.service.impl;

import com.zlw.ke.commons.ffmpeg.FfmpegUtil;
import com.zlw.ke.framework.page.Pager;
import com.zlw.ke.framework.page.PagerQuery;
import com.zlw.ke.framework.utils.CustomizedPropertyConfig;
import com.zlw.ke.model.SysUser;
import com.zlw.ke.model.Unit;
import com.zlw.ke.model.Video;
import com.zlw.ke.security.util.UserUtil;
import com.zlw.ke.video.dao.VideoDao;
import com.zlw.ke.video.domain.VideoDomain;
import com.zlw.ke.video.service.UnitService;
import com.zlw.ke.video.service.VideoService;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: VideoServiceImpl <br>
 * Create DateTime: 14-11-17 下午10:43 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Service("videoService")
public class VideoServiceImpl implements VideoService {


    private static final String SOURCE_FOLDER = "/VIDEO_FILE";
    @Autowired
    private VideoDao videoDao;
    @Autowired
    private ServletContext context;
    @Autowired
    private UnitService unitService;

    @Override
    public List<VideoDomain> list(String userId,String unitId, Byte aLong) {

        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("url").as("url"));
        projectionList.add(Projections.property("firstFrame").as("firstFrame"));
        projectionList.add(Projections.property("unit.id").as("unitId"));
        projectionList.add(Projections.property("en").as("en"));
        projectionList.add(Projections.property("ch").as("ch"));
        projectionList.add(Projections.property("length").as("length"));
        Criteria criteria = videoDao.getCriteria(Video.class);
        if (StringUtils.isNotBlank(unitId)) {
            criteria.add(Restrictions.eq("unit.id", unitId));
        }
        if (StringUtils.isNotBlank(userId)) {
            criteria.createAlias("createUser","createUser");
            criteria.add(Restrictions.eq("createUser.username", userId));
        }

        criteria.add(Restrictions.eq("isLong", aLong));
        List<VideoDomain> list=videoDao.listCriteria(criteria, projectionList, VideoDomain.class);
        for(VideoDomain domain:list){
            domain.setFirstFrame((String) CustomizedPropertyConfig.get("server_url")+domain.getFirstFrame());
            domain.setUrl((String) CustomizedPropertyConfig.get("server_url")+domain.getUrl());
        }

        return list;
    }

    @Override
    public void saveVideo(String unitId, String ch, String en, MultipartFile file, Byte aLong) {

        SysUser sysUser = UserUtil.getUser().getSysUser();

        String srcFolderPath = context.getRealPath(SOURCE_FOLDER) + "/" + sysUser.getUsername();
        File srcFolder = new File(srcFolderPath);
        if (!srcFolder.exists()) {
            srcFolder.mkdirs();
        }

        // 上传文件名
        String fileName = file.getOriginalFilename();
        String filePath = srcFolderPath + "/" + fileName;
        File temp = new File(filePath);
        try {
            if (!temp.exists()) {
                temp.createNewFile();
            }
            FileOutputStream fos = new FileOutputStream(temp);
            IOUtils.copyLarge(file.getInputStream(), fos);
            fos.close();
            //视频截图
//            filePath = unifyFilePath(objectFile.getAbsolutePath());
            String imageFilePath = StringUtils.substringBeforeLast(filePath, ".") + ".png";
            FfmpegUtil.CatchImg(filePath, imageFilePath);
//            File imgeFile = new File(imageFilePath);
//            BufferedImage imgFile = ImageIO.read(new FileInputStream(imgeFile));
//            ppObject.setXtype(xtype);
//            ppObject.setWidth(imgFile.getWidth());
//            ppObject.setHeight(imgFile.getHeight());
//            ppObject.setFileName(objectFile.getName());
//            ppObject.setUrl(resourceFolder + "/" + objectFile.getName());
//
//            filePath = unifyFilePath(imgeFile.getAbsolutePath());
//            filePath = StringUtils.substringAfter(filePath, wksc.web.extjs.Programme.IDE_PREVIEW);
//            ppObject.setFilePath(wksc.web.extjs.Programme.IDE_PREVIEW + filePath);
            Video video = new Video();
            video.setName(StringUtils.substringBefore(fileName,"."));
            video.setCh(ch);
            video.setEn(en);
            video.setLength(file.getSize());
            if (StringUtils.isNotBlank(unitId)) {
                Unit unit = unitService.queryUnit(unitId);
                video.setUnit(unit);
            }
            video.setCreateUser(UserUtil.getUser().getSysUser());
            video.setIsLong(aLong);
            video.setUrl(SOURCE_FOLDER + "/" + sysUser.getUsername() + "/" + fileName);
            video.setFirstFrame(SOURCE_FOLDER + "/" + sysUser.getUsername() + "/" + StringUtils.substringBeforeLast(fileName, ".") + ".png");
            videoDao.save(video);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    @Override
    public void updateVideo(String videoId, String ch, String en, MultipartFile file) {
        SysUser sysUser = UserUtil.getUser().getSysUser();

        Video video = videoDao.get(Video.class, videoId);
        try {
            if (!file.isEmpty()) {
                String srcFolderPath = context.getRealPath(SOURCE_FOLDER) + "/" + sysUser.getUsername();
                File srcFolder = new File(srcFolderPath);
                if (!srcFolder.exists()) {
                    srcFolder.mkdirs();
                }

                // 上传文件名
                String fileName = file.getOriginalFilename();
                String filePath = srcFolderPath + "/" + fileName;
                File temp = new File(filePath);
                if (!temp.exists()) {
                    temp.createNewFile();
                }
                FileOutputStream fos = new FileOutputStream(temp);
                IOUtils.copyLarge(file.getInputStream(), fos);
                fos.close();
                //视频截图
//            filePath = unifyFilePath(objectFile.getAbsolutePath());
                String imageFilePath = StringUtils.substringBeforeLast(filePath, ".") + ".png";
                FfmpegUtil.CatchImg(filePath, imageFilePath);
                video.setName(fileName);
                video.setUrl(SOURCE_FOLDER + "/" + sysUser.getUsername() + "/" + fileName);
                video.setFirstFrame(SOURCE_FOLDER + "/" + sysUser.getUsername() + "/" + StringUtils.substringBeforeLast(fileName, ".") + ".png");
            }

//            File imgeFile = new File(imageFilePath);
//            BufferedImage imgFile = ImageIO.read(new FileInputStream(imgeFile));
//            ppObject.setXtype(xtype);
//            ppObject.setWidth(imgFile.getWidth());
//            ppObject.setHeight(imgFile.getHeight());
//            ppObject.setFileName(objectFile.getName());
//            ppObject.setUrl(resourceFolder + "/" + objectFile.getName());
//
//            filePath = unifyFilePath(imgeFile.getAbsolutePath());
//            filePath = StringUtils.substringAfter(filePath, wksc.web.extjs.Programme.IDE_PREVIEW);
//            ppObject.setFilePath(wksc.web.extjs.Programme.IDE_PREVIEW + filePath);


            video.setCh(ch);
            video.setEn(en);
            videoDao.update(video);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteVideo(String videoId) {
        Video video = videoDao.get(Video.class, videoId);
        if (video != null) {
           /* File videoFile=new File(context.getRealPath("/")+video.getUrl());
            if(videoFile.exists()){
                videoFile.delete();
            }

            File head=new File(context.getRealPath("/")+video.getFirstFrame());

            if(head.exists()){
                head.delete();
            }*/
            videoDao.delete(video);
        }
    }

    @Override
    public Pager<VideoDomain> pager(PagerQuery pagerQuery, Byte aLong) {
        String userId=UserUtil.getUser().getSysUser().getId();
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("url").as("url"));
        projectionList.add(Projections.property("firstFrame").as("firstFrame"));
        projectionList.add(Projections.property("unit.id").as("unitId"));
        projectionList.add(Projections.property("en").as("en"));
        projectionList.add(Projections.property("ch").as("ch"));
        Criteria criteria = videoDao.getCriteria(Video.class);
        criteria.add(Restrictions.eq("isLong", aLong));
        criteria.createAlias("createUser", "createUser");
        criteria.add(Restrictions.eq("createUser.id",userId));
        Pager<VideoDomain> pager = videoDao.pagerData(projectionList, VideoDomain.class, criteria, pagerQuery);
        return pager;
    }

    @Override
    public Video queryVideo(String id) {
        return videoDao.get(Video.class,id);
    }
}
