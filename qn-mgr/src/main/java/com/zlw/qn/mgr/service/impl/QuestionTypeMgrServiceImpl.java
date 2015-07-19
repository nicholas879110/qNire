package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.dao.QuestionMgrDao;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.mgr.service.QuestionTypeMgrService;
import com.zlw.qn.model.MyQuestion;
import com.zlw.qn.model.MyQuestionType;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

;

/**
 * Created by YT on 2015/7/19.
 */
@Service("questionTypeMgrService")
public class QuestionTypeMgrServiceImpl implements QuestionTypeMgrService {

    @Autowired
    private QuestionMgrDao questionMgrDao;

    @Override
    public Pager typePager(PagerQuery pagerQuery) throws Exception {
        Criteria criteria = questionMgrDao.getCriteria(MyQuestionType.class);
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("code").as("code"));

        Pager<QusetionType> pager = questionMgrDao.pagerData(projectionList, QusetionType.class, criteria, pagerQuery);
        return pager;
    }

    @Override
    public void insertQuestion(MyQuestion myQuestion) {
        questionMgrDao.save(myQuestion);
    }

    @Override
    public void updateQuestion(MyQuestion myQuestion) {
        questionMgrDao.update(myQuestion);
    }

    @Override
    public void deleteQuestion(Integer id) {
        questionMgrDao.delete(MyQuestion.class,id);
    }

    @Override
    public void deleteType(String pk) {
        if(StringUtils.isNotBlank(pk)){
            questionMgrDao.delete(MyQuestionType.class,Integer.valueOf(pk));
        }
    }

    @Override
    public void deleteTypes(String pks) {
        Assert.notNull(pks, "pks can not be null");
        Assert.hasLength(pks, "pks must has length");
        for (String pk : StringUtils.split(pks, ",")) {
            deleteType(pk);
        }
    }

    @Override
    public void saveType(QusetionType domain) {
        MyQuestionType myQuestionType = new MyQuestionType();
        myQuestionType.setCode(domain.getCode());
        myQuestionType.setName(domain.getName());
        questionMgrDao.save(myQuestionType);
    }

    @Override
    public void updateType(QusetionType domain) {
        MyQuestionType myQuestionType = new MyQuestionType();
        myQuestionType.setId(domain.getId());
        myQuestionType.setCode(domain.getCode());
        myQuestionType.setName(domain.getName());
        questionMgrDao.update(myQuestionType);
    }

    @Override
    public MyQuestionType getMyQuestionTypeById(String id) {
        if(StringUtils.isNotBlank(id)){
            return questionMgrDao.get(MyQuestionType.class,Integer.valueOf(id));
        }
        return new MyQuestionType();
    }
}
