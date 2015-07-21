package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.dao.QuestionMgrDao;
import com.zlw.qn.mgr.domain.*;
import com.zlw.qn.mgr.service.QuestionMgrService;
import com.zlw.qn.model.MyQuestion;
import com.zlw.qn.model.MyQuestionOption;
import com.zlw.qn.model.MyQuestionType;
import com.zlw.qn.model.MyTag;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public Pager pager(PagerQuery pagerQuery, String qtype, String[] tags,String keyword) throws Exception {
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
        if(tags != null){
            if(tags.length > 0){
                Integer[] ia=new Integer[tags.length];
                for(int i=0;i<tags.length;i++){
                    ia[i]=Integer.parseInt(tags[i]);
                }
                criteria.add(Restrictions.in("tagId", ia));
            }
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
            MyQuestion myQuestion = questionMgrDao.get(MyQuestion.class,Integer.valueOf(pk));
            if(myQuestion.getMyQuestionOptions() != null){
                if(myQuestion.getMyQuestionOptions().size() > 0){
                   for(MyQuestionOption myQuestionOption:myQuestion.getMyQuestionOptions()){
                       questionMgrDao.delete(myQuestionOption);
                   }
                }
            }
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
    @Transactional
    public void updateExportQue(String pk) {
        if(StringUtils.isNotBlank(pk)){
            MyQuestion myQuestion = questionMgrDao.get(MyQuestion.class,Integer.valueOf(pk));
            myQuestion.setStatus(EXPORT);
            questionMgrDao.saveOrUpdate(myQuestion);
        }
    }

    @Override
    public void updateExportQues(String pks) {
        Assert.notNull(pks, "pks can not be null");
        Assert.hasLength(pks, "pks must has length");
        for (String pk : StringUtils.split(pks, ",")) {
            updateExportQue(pk);
        }
    }

    @Override
    public List<Tag> getTagList() {
        Criteria criteria = questionMgrDao.getCriteria(MyTag.class);
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("tagName").as("tagName"));
        projectionList.add(Projections.property("tagImgPath").as("tagImgPath"));
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

    @Override
    public void saveDomain(QnQuestionDomain domain) {
        MyQuestion myQuestion = new MyQuestion();
        myQuestion.setTitle(domain.getTitle());
        myQuestion.setIns(domain.getIns());
        myQuestion.setQtype(domain.getQtype());
        myQuestion.setStatus(new Integer(0));
        if(domain.getTags() != null){
            if(domain.getTags().length > 0){
                Integer tag = Integer.valueOf(domain.getTags()[0]);
                myQuestion.setTagId(tag);
            }
        }
        if(domain.getOptions() != null){
            if(domain.getOptions().size() > 0){
                Set<MyQuestionOption> myQuestionOptions = new HashSet<MyQuestionOption>();
                for (QnQuestionOptionDomain qnQuestionOptionDomain:domain.getOptions()){
                    if(StringUtils.isNotBlank(qnQuestionOptionDomain.getAnswer())){
                        MyQuestionOption myQuestionOption = new MyQuestionOption();
                        myQuestionOption.setAnswer(qnQuestionOptionDomain.getAnswer());
                        myQuestionOptions.add(myQuestionOption);
                    }
                }
                myQuestion.setMyQuestionOptions(myQuestionOptions);
            }
        }
        questionMgrDao.save(myQuestion);
        for(MyQuestionOption myQuestionOption:myQuestion.getMyQuestionOptions()){
            myQuestionOption.setQuesId(myQuestion.getId());
            questionMgrDao.save(myQuestionOption);
        }
    }

    @Override
    public MyQuestion useMyQuestionById(String id) {
        return questionMgrDao.get(MyQuestion.class,Integer.valueOf(id));
    }
}
