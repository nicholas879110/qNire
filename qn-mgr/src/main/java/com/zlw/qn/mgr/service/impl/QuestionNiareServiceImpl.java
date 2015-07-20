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

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
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
        questionaire.setUpdateTime(new Date());
        questionaire.setUser(UserUtil.getUser().getSysUser());
        questionNiareDao.save(questionaire);
    }

    @Override
    public void update(QuestionNiareDomain domain) {

        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class, domain.getId());
        questionaire.setName(domain.getName());
        questionaire.setDesp(domain.getDesp());
        questionaire.setStatus(QN_STATUS_DEPLOYING);
        questionaire.setUpdateTime(new Date());
        questionaire.setUser(UserUtil.getUser().getSysUser());
        questionNiareDao.update(questionaire);
    }

    @Override
    @Transactional
    public void deploy(Integer id) {
        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class,id);
        questionaire.setStatus(QN_STATUS_DEPLOYED);
        questionaire.setUpdateTime(new Date());
        questionaire.setUser(UserUtil.getUser().getSysUser());
        questionNiareDao.update(questionaire);
    }

    @Override
    public void delete(Integer id) {
        MyQuestionaire questionaire=questionNiareDao.get(MyQuestionaire.class,id);
        questionNiareDao.delete(questionaire);
    }

    @Override
    @Transactional
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
        projectionList1.add(Projections.property("sOrder").as("sOrder"));

        Criteria criteria1 = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
        criteria1.createAlias("myQuestionByQuestionId","question");
        criteria1.add(Restrictions.eq("naireId",id));
        List<QnQuestionDomain> questions=questionNiareDao.listCriteria(criteria1,projectionList1,QnQuestionDomain.class);
        Collections.sort(questions,new Comparator<QnQuestionDomain>() {
            @Override
            public int compare(QnQuestionDomain o1, QnQuestionDomain o2) {

                return o1.getsOrder()<o2.getsOrder()?-1:1;
            }
        });
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
        int current=0;
        Criteria criteria = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
        if(questionDomain.getPreQuestionId()!=null){
//            criteria.add(Restrictions.eq("myQuestionByQuestionId.id",questionDomain.getPreQuestionId()));
            criteria.add(Restrictions.eq("myQuestionaireByNaireId.id",naireId));
//            criteria.add(Restrictions.eq("sOrder",questionDomain.getoIndex()));
            current=questionDomain.getsOrder()+1;
            List<MyRefNaireQuestion> list=questionNiareDao.list(criteria);
            for(MyRefNaireQuestion refNaireQuestion:list){
                if(refNaireQuestion.getsOrder()>questionDomain.getsOrder()){
                    refNaireQuestion.setsOrder(refNaireQuestion.getsOrder() + 1);
                    questionNiareDao.update(refNaireQuestion);
                }
            }
        }else{
            criteria.setProjection(Projections.max("sOrder"));
            criteria.add(Restrictions.eq("myQuestionaireByNaireId.id",naireId));
            Object obj=criteria.uniqueResult();
            if(null!=obj){
                current=(Integer)obj+1;
            }
        }



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
        myRefNaireQuestion.setsOrder(current);
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

    @Override
    public void removeQuestion(Integer niareId, Integer questionId,Integer sOrder) {
        Criteria criteria = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
        criteria.add(Restrictions.eq("myQuestionaireByNaireId.id",niareId));
        criteria.add(Restrictions.eq("myQuestionByQuestionId.id",questionId));
        criteria.add(Restrictions.eq("sOrder",sOrder));
        MyRefNaireQuestion refNaireQuestion=questionNiareDao.getUniqueResult(criteria);
        if(refNaireQuestion!=null){
            Criteria criteria1 = questionNiareDao.getCriteria(MyRefNqOption.class);
            criteria1.add(Restrictions.eq("myRefNaireQuestionByQnId.id",refNaireQuestion.getId()));
            List<MyRefNqOption> refNqOptions=questionNiareDao.list(criteria1);
            questionNiareDao.deleteAll(refNqOptions);

            Criteria criteria2 = questionNiareDao.getCriteria(MyRefNqIns.class);
            criteria2.add(Restrictions.eq("myRefNaireQuestionByQnId.id",refNaireQuestion.getId()));
            List<MyRefNqIns> refNqInses=questionNiareDao.list(criteria2);
            questionNiareDao.deleteAll(refNqInses);
        }
        questionNiareDao.delete(refNaireQuestion);
    }

    @Override
    public QnQuestionDomain queryQnQuestionDomain(Integer niareId, Integer questionId, Integer sOrder) {

        Criteria criteria = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
        criteria.add(Restrictions.eq("myQuestionaireByNaireId.id",niareId));
        criteria.add(Restrictions.eq("myQuestionByQuestionId.id",questionId));
        criteria.add(Restrictions.eq("sOrder",sOrder));
        criteria.createAlias("myQuestionByQuestionId","question");
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("question.id").as("id"));
        projectionList.add(Projections.property("question.title").as("title"));
        projectionList.add(Projections.property("question.qtype").as("qtype"));
        projectionList.add(Projections.property("sn").as("sn"));
        projectionList.add(Projections.property("sOrder").as("sOrder"));
        QnQuestionDomain qnQuestionDomain=questionNiareDao.getUniqueResult(criteria,QnQuestionDomain.class,projectionList);


        ProjectionList projectionList2 = Projections.projectionList();
        projectionList2.add(Projections.property("option.id").as("id"));
        projectionList2.add(Projections.property("option.answer").as("answer"));

        Criteria criteria2 = questionNiareDao.getCriteria(MyRefNqOption.class);
        criteria2.createAlias("myRefNaireQuestionByQnId","nq");
        criteria2.createAlias("nq.myQuestionByQuestionId", "ques");
        criteria2.createAlias("nq.myQuestionaireByNaireId","niare");
        criteria2.createAlias("myQuestionOptionByOptionId","option");
        criteria2.add(Restrictions.eq("ques.id",qnQuestionDomain.getId()));
        criteria2.add(Restrictions.eq("niare.id",niareId));

        List<QnQuestionOptionDomain> options=questionNiareDao.listCriteria(criteria2,projectionList2,QnQuestionOptionDomain.class);
        qnQuestionDomain.setOptions(options);

        Criteria criteria3=questionNiareDao.getCriteria(MyRefNqIns.class);
        criteria3.createAlias("myRefNaireQuestionByQnId","nq");
        criteria3.createAlias("nq.myQuestionByQuestionId", "ques");
        criteria3.createAlias("nq.myQuestionaireByNaireId","niare");
        criteria3.add(Restrictions.eq("ques.id",qnQuestionDomain.getId()));
        criteria3.add(Restrictions.eq("niare.id",niareId));
        MyRefNqIns myRefNqIns=questionNiareDao.getUniqueResult(criteria3);
        qnQuestionDomain.setIns(myRefNqIns.getMyInstructionByInsId().getContent());
        return qnQuestionDomain;
    }


    @Override
    public void removeQuestionOption(Integer niareId, Integer questionId, Integer optionId) {
//        Criteria criteria = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
//        criteria.add(Restrictions.eq("myQuestionaireByNaireId.id",niareId));
//        criteria.add(Restrictions.eq("myQuestionByQuestionId.id",questionId));
//
//        MyRefNaireQuestion refNaireQuestion=questionNiareDao.getUniqueResult(criteria);
//
//        if (refNaireQuestion!=null){
            Criteria criteria2 = questionNiareDao.getCriteria(MyRefNqOption.class);
            criteria2.createAlias("myRefNaireQuestionByQnId","nq");
            criteria2.createAlias("nq.myQuestionByQuestionId", "ques");
            criteria2.createAlias("nq.myQuestionaireByNaireId","niare");
            criteria2.createAlias("myQuestionOptionByOptionId","option");
            criteria2.add(Restrictions.eq("ques.id",questionId));
            criteria2.add(Restrictions.eq("niare.id",niareId));
            criteria2.add(Restrictions.eq("option.id",optionId));

            MyRefNqOption refNqOption=questionNiareDao.getUniqueResult(criteria2);
            questionNiareDao.delete(refNqOption);
//        }
    }


    @Override
    public void updateQuestion(Integer niareId, QnQuestionDomain questionDomain) {

        MyQuestion question=questionNiareDao.get(MyQuestion.class,questionDomain.getId());
        question.setStatus(1);
        question.setTitle(questionDomain.getTitle());
        questionNiareDao.update(question);

        Criteria criteria3=questionNiareDao.getCriteria(MyRefNqIns.class);
        criteria3.createAlias("myRefNaireQuestionByQnId","nq");
        criteria3.createAlias("nq.myQuestionByQuestionId", "ques");
        criteria3.createAlias("nq.myQuestionaireByNaireId","niare");
        criteria3.add(Restrictions.eq("ques.id",questionDomain.getId()));
        criteria3.add(Restrictions.eq("niare.id",niareId));
        MyRefNqIns myRefNqIns=questionNiareDao.getUniqueResult(criteria3);
        MyInstruction myInstruction=myRefNqIns.getMyInstructionByInsId();
        myInstruction.setContent(questionDomain.getIns());
        questionNiareDao.save(myInstruction);

        Criteria criteria = questionNiareDao.getCriteria(MyRefNaireQuestion.class);
        criteria.add(Restrictions.eq("myQuestionaireByNaireId.id",niareId));
        criteria.add(Restrictions.eq("myQuestionByQuestionId.id",questionDomain.getId()));
        MyRefNaireQuestion myRefNaireQuestion=questionNiareDao.getUniqueResult(criteria);
        for(QnQuestionOptionDomain optionDomain: questionDomain.getOptions()){
            MyQuestionOption myQuestionOption=questionNiareDao.get(MyQuestionOption.class,optionDomain.getId());
            if(myQuestionOption==null){
                 myQuestionOption=new MyQuestionOption();
                myQuestionOption.setAnswer(optionDomain.getAnswer());
                questionNiareDao.save(myQuestionOption);
                MyRefNqOption myRefNqOption=new MyRefNqOption();
                myRefNqOption.setMyQuestionOptionByOptionId(myQuestionOption);
                myRefNqOption.setOptionId(myQuestionOption.getId());
                myRefNqOption.setMyRefNaireQuestionByQnId(myRefNaireQuestion);
                myRefNqOption.setQnId(myRefNaireQuestion.getId());
                questionNiareDao.save(myRefNqOption);
            }else {
                myQuestionOption.setAnswer(optionDomain.getAnswer());
                questionNiareDao.update(myQuestionOption);
            }

        }

//        MyRefNqIns myRefNqIns=new MyRefNqIns();
//        myRefNqIns.setMyRefNaireQuestionByQnId(myRefNaireQuestion);
//        myRefNqIns.setQnId(myRefNaireQuestion.getId());
//        myRefNqIns.setMyInstructionByInsId(instruction);
//        myRefNqIns.setInsId(instruction.getId());
//        questionNiareDao.save(myRefNqIns);
    }
}
