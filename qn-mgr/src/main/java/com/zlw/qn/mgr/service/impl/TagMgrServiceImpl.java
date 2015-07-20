package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.dao.TagMgrDao;
import com.zlw.qn.mgr.domain.Tag;
import com.zlw.qn.mgr.service.TagMgrService;
import com.zlw.qn.model.MyTag;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;

/**
 * Created by YT on 2015/7/19.
 */
@Service("tagMgrService")
public class TagMgrServiceImpl implements TagMgrService{

    @Autowired
    private TagMgrDao tagMgrDao;

    @Override
    public Pager pager(PagerQuery pagerQuery) throws Exception {
        Criteria criteria = tagMgrDao.getCriteria(MyTag.class);
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("tagName").as("tagName"));
        projectionList.add(Projections.property("tagImgPath").as("tagImgPath"));
        Pager<Tag> pager = tagMgrDao.pagerData(projectionList, Tag.class, criteria, pagerQuery);
        return pager;
    }

    @Override
    public void deleteTag(String pk) {
        if(StringUtils.isNotBlank(pk)){
            MyTag myTag = tagMgrDao.get(MyTag.class,Integer.valueOf(pk));
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String path = request.getSession().getServletContext().getRealPath("/")+"img_save_path";
            File file = new File(path+"/"+myTag.getTagImgPath());
            file.delete();
            tagMgrDao.delete(myTag);
        }
    }

    @Override
    public void deleteTags(String pks) {
        Assert.notNull(pks, "pks can not be null");
        Assert.hasLength(pks, "pks must has length");
        for (String pk : StringUtils.split(pks, ",")) {
            deleteTag(pk);
        }
    }

    @Override
    public MyTag getMyTagById(String id) {
        if(StringUtils.isNotBlank(id)){
            return tagMgrDao.get(MyTag.class,Integer.valueOf(id));
        }
        return new MyTag();
    }

    @Override
    public void updateTag(Tag domain) {
        MyTag myTag = tagMgrDao.get(MyTag.class,domain.getId());
        myTag.setTagName(domain.getTagName());
        if(StringUtils.isNotBlank(domain.getTagImgPath())){
            myTag.setTagImgPath(domain.getTagImgPath());
        }
        tagMgrDao.update(myTag);
    }

    @Override
    public void saveTag(Tag domain) {
        MyTag myTag = new MyTag();
        myTag.setTagName(domain.getTagName());
        myTag.setTagImgPath(domain.getTagImgPath());
        tagMgrDao.save(myTag);
    }

    @Override
    public void saveFileFromInputStream(InputStream stream, String path, String time,String filename) throws IOException {
        File file = new File(path+File.separator+time);
        if(!file.exists()) {
            file.mkdirs();
        }
        FileOutputStream fs = new FileOutputStream(path + File.separator + filename);
        byte[] buffer = new byte[1024 * 1024];
        int bytesum = 0;
        int byteread = 0;
        while ((byteread = stream.read(buffer)) != -1) {
            bytesum += byteread;
            fs.write(buffer, 0, byteread);
            fs.flush();
        }
        fs.close();
        stream.close();
    }

    @Override
    public void deleteTagImg(Integer id) throws Exception{
        if(id != null){
            MyTag myTag = tagMgrDao.get(MyTag.class,id);
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String path = request.getSession().getServletContext().getRealPath("/")+"img_save_path";
            File file = new File(path+"/"+myTag.getTagImgPath());
            file.delete();
        }
    }
}
