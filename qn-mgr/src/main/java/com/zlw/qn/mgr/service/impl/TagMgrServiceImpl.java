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

        Pager<Tag> pager = tagMgrDao.pagerData(projectionList, Tag.class, criteria, pagerQuery);
        return pager;
    }

    @Override
    public void deleteTag(String pk) {
        if(StringUtils.isNotBlank(pk)){
            tagMgrDao.delete(MyTag.class,Integer.valueOf(pk));
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
        MyTag myTag = new MyTag();
        myTag.setId(domain.getId());
        myTag.setTagName(domain.getTagName());
        tagMgrDao.update(myTag);
    }

    @Override
    public void saveTag(Tag domain) {
        MyTag myTag = new MyTag();
        myTag.setTagName(domain.getTagName());
        tagMgrDao.save(myTag);
    }
}
