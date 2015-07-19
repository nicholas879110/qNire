package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QnQuestionDomain;
import com.zlw.qn.mgr.domain.QnQuestionOptionDomain;
import com.zlw.qn.model.*;
import com.zlw.qn.security.util.UserUtil;
import com.zlw.qn.mgr.dao.QuestionNiareDao;
import com.zlw.qn.mgr.domain.QuestionNiareDomain;
import com.zlw.qn.mgr.service.QuestionNiareService;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: QuestionNiareServiceImpl <br>
 * Create DateTime: 15-7-19 下午2:47 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Service("questionNiareService")
public class QuestionNiareServiceImpl implements QuestionNiareService {

    private static final Integer QN_STATUS_DEPLOYED=1;
    private static final Integer QN_STATUS_DEPLOYING=0;//待发布

    @Autowired
    private QuestionNiareDao questionNiareDao;

    @Override
    @Transactional
    public Pager<QuestionNiareDomain> pager(PagerQuery pagerQuery) {
        String userId= UserUtil.getUser().getSysUser().getId();
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("desp").as("desp"));
        projectionList.add(Projections.property("status").as("status"));

        Criteria criteria = questionNiareDao.getCriteria(MyQuestionaire.class);
        Pager<QuestionNiareDomain> pager = questionNiareDao.pagerData(projectionList, QuestionNiareDomain.class, criteria, pagerQuery);
        return pager;
    }

    @Override
    public void save(QuestionNiareDomain domain) {

        MyQuestionaire questionaire=new MyQuestionaire();
        questionaire.setName(domain.getName());
        questionaire.setDesp(domain.getDesp());
        questionaire.setStatus(QN_STATUS_DEPLOYING);
        questionNiareDao.save(questionaire);
    }

    @Override
    public void update(QuestionNiareDomain domain) {

        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class, domain.getId());
        questionaire.setName(domain.getName());
        questionaire.setDesp(domain.getDesp());
        questionaire.setStatus(QN_STATUS_DEPLOYING);
        questionNiareDao.update(questionaire);
    }

    @Override
    public void deploy(Integer id) {
        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class,id);
        questionaire.setStatus(QN_STATUS_DEPLOYED);
        questionNiareDao.update(questionaire);
    }

    @Override
    public void delete(Integer id) {
        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class,id);
        questionNiareDao.delete(questionaire);
    }

    @Override
    public void cancelDeploy(Integer id) {
        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class,id);
        questionaire.setStatus(QN_STATUS_DEPLOYING);
        questionNiareDao.update(questionaire);
    }

    @Override
    public QuestionNiareDomain queryDomain(Integer id) {
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("desp").as("desp"));
        projectionList.add(Projections.property("status").as("status"));

        Criteria criteria = questionNiareDao.getCriteria(MyQuestionaire.class);
        criteria.add(Restrictions.eq("id",id));
        QuestionNiareDomain domain=questionNiareDao.getUniqueResult(criteria,QuestionNiareDomain.class,projectionList);

        ProjectionList projectionList1 = Projections.projectionList();
        projectionList1.add(Projections.property("question.id").as("id"));
        projectionList1.add(Projections.property("question.title").as("title"));
        projectionList1.add(Projections.property("question.qtype").as("qtype"));
        projectionList1.add(Projections.property("sn").as("sn"));

        Criteria criteria1 = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
        criteria1.createAlias("myQuestionByQuestionId","question");
        criteria1.add(Restrictions.eq("naireId",id));
        List<QnQuestionDomain> questions=questionNiareDao.listCriteria(criteria1,projectionList1,QnQuestionDomain.class);
        for(QnQuestionDomain qnQuestionDomain:questions){

            ProjectionList projectionList2 = Projections.projectionList();
            projectionList2.add(Projections.property("option.id").as("id"));
            projectionList2.add(Projections.property("option.answer").as("answer"));

            Criteria criteria2 = questionNiareDao.getCriteria(MyRefNqOption.class);
            criteria2.createAlias("myRefNaireQuestionByQnId","nq");
            criteria2.createAlias("nq.myQuestionByQuestionId", "ques");
            criteria2.createAlias("nq.myQuestionaireByNaireId","niare");
            criteria2.createAlias("myQuestionOptionByOptionId","option");
            criteria2.add(Restrictions.eq("ques.id",qnQuestionDomain.getId()));
            criteria2.add(Restrictions.eq("niare.id",id));
            List<QnQuestionOptionDomain> options=questionNiareDao.listCriteria(criteria2,projectionList2,QnQuestionOptionDomain.class);
            qnQuestionDomain.setOptions(options);
        }

        domain.setQuestions(questions);
        return domain;
    }

    @Override
    public void saveQuestion(Integer naireId, QnQuestionDomain questionDomain) {
//        SQLQuery query=questionNiareDao.getSQLQuery("select max(s_order) from my_ref_naire_question");
//        Object obj=query.
        Criteria criteria = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
        criteria.setProjection(Projections.max("sOrder"));
        criteria.add(Restrictions.eq("myQuestionaireByNaireId.id",naireId));
        Object obj=criteria.uniqueResult();
        int current=0;
        if(null!=obj){
            current=(Integer)obj+1;
        }
//        int  maxIndex=questionNiareDao.getSQLQuery()

        MyQuestion question=new MyQuestion();
//        question.setQtype(questionDomain.getQtype());
        question.setStatus(1);
        question.setTitle(questionDomain.getTitle());
        questionNiareDao.save(question);

        MyInstruction instruction=new MyInstruction();
        instruction.setContent(questionDomain.getIns());
        questionNiareDao.save(instruction);

        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class,naireId);
        MyRefNaireQuestion myRefNaireQuestion=new MyRefNaireQuestion();
        myRefNaireQuestion.setMyQuestionaireByNaireId(questionaire);
        myRefNaireQuestion.setMyQuestionByQuestionId(question);
        myRefNaireQuestion.setQuestionId(question.getId());
        myRefNaireQuestion.setSn(questionDomain.getSn());
        myRefNaireQuestion.setsOrder(questionDomain.getoIndex());
        questionNiareDao.save(myRefNaireQuestion);

        for(QnQuestionOptionDomain optionDomain: questionDomain.getOptions()){
            MyQuestionOption myQuestionOption=new MyQuestionOption();
            myQuestionOption.setAnswer(optionDomain.getAnswer());
            questionNiareDao.save(myQuestionOption);
            MyRefNqOption myRefNqOption=new MyRefNqOption();
            myRefNqOption.setMyQuestionOptionByOptionId(myQuestionOption);
            myRefNqOption.setOptionId(myQuestionOption.getId());
            myRefNqOption.setMyRefNaireQuestionByQnId(myRefNaireQuestion);
            myRefNqOption.setQnId(myRefNaireQuestion.getId());
            questionNiareDao.save(myRefNqOption);
        }

        MyRefNqIns myRefNqIns=new MyRefNqIns();
        myRefNqIns.setMyRefNaireQuestionByQnId(myRefNaireQuestion);
        myRefNqIns.setQnId(myRefNaireQuestion.getId());
        myRefNqIns.setMyInstructionByInsId(instruction);
        myRefNqIns.setInsId(instruction.getId());
        questionNiareDao.save(myRefNqIns);

    }
}
