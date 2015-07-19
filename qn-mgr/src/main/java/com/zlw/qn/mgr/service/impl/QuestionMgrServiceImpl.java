package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.dao.QuestionMgrDao;
import com.zlw.qn.mgr.domain.Question;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.mgr.domain.Tag;
import com.zlw.qn.mgr.service.QuestionMgrService;
import com.zlw.qn.model.MyQuestion;
import com.zlw.qn.model.MyQuestionType;
import com.zlw.qn.model.MyTag;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

;

/**
 * Created by YT on 2015/7/19.
 */
@Service("questionMgrService")
public class QuestionMgrServiceImpl implements QuestionMgrService {

    private static final Integer NOTEXPORT = 0;//未发布
    private static final Integer EXPORT = 1;//发布

    @Autowired
    private QuestionMgrDao questionMgrDao;

    @Override
    public Pager pager(PagerQuery pagerQuery, String qtype, String tag,String keyword) throws Exception {
        Criteria criteria = questionMgrDao.getCriteria(MyQuestion.class);
        criteria.createAlias("myTagByTagId", "myTagByTagId", JoinType.LEFT_OUTER_JOIN);
        criteria.createAlias("myQuestionTypeByQtype","myQuestionTypeByQtype", JoinType.LEFT_OUTER_JOIN);

        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("title").as("title"));
        projectionList.add(Projections.property("myQuestionTypeByQtype.name").as("qtypeTile"));
        projectionList.add(Projections.property("status").as("status"));
        projectionList.add(Projections.property("keword").as("keyword"));
        projectionList.add(Projections.property("myTagByTagId.tagName").as("tagIdTitle"));

        if(StringUtils.isNotBlank(qtype)){
            criteria.add(Restrictions.eq("qtype",Integer.valueOf(qtype)));
        }
        if(StringUtils.isNotBlank(tag)){
            criteria.add(Restrictions.eq("tagId",Integer.valueOf(tag)));
        }
        if(StringUtils.isNotBlank(keyword)){
            criteria.add(Restrictions.eq("keword",keyword));
        }
        Pager<Question> pager = questionMgrDao.pagerData(projectionList, Question.class, criteria, pagerQuery);
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
    public void deleteQue(String pk) {
        if(StringUtils.isNotBlank(pk)){
            questionMgrDao.delete(MyQuestion.class,Integer.valueOf(pk));
        }
    }

    @Override
    public void deleteQues(String pks) {
        Assert.notNull(pks, "pks can not be null");
        Assert.hasLength(pks, "pks must has length");
        for (String pk : StringUtils.split(pks, ",")) {
            deleteQue(pk);
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

    @Override
    public void exportQue(String pk) {
        if(StringUtils.isNotBlank(pk)){
            MyQuestion myQuestion = questionMgrDao.get(MyQuestion.class,Integer.valueOf(pk));
            myQuestion.setStatus(EXPORT);
            questionMgrDao.update(myQuestion);
        }
    }

    @Override
    public void exportQues(String pks) {
        Assert.notNull(pks, "pks can not be null");
        Assert.hasLength(pks, "pks must has length");
        for (String pk : StringUtils.split(pks, ",")) {
            exportQue(pk);
        }
    }

    @Override
    public List<Tag> getTagList() {
        Criteria criteria = questionMgrDao.getCriteria(MyTag.class);
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("tagName").as("tagName"));
        criteria.setProjection(projectionList);
        criteria.setResultTransformer(Transformers.aliasToBean(Tag.class));
        return criteria.list();
    }

    @Override
    public List<QusetionType> getQusetionTypeList() {
        Criteria criteria = questionMgrDao.getCriteria(MyQuestionType.class);
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        criteria.setProjection(projectionList);
        criteria.setResultTransformer(Transformers.aliasToBean(QusetionType.class));
        return criteria.list();
    }
}
