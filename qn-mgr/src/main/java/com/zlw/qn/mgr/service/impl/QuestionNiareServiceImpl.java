package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.model.MyQuestionaire;
import com.zlw.qn.security.util.UserUtil;
import com.zlw.qn.mgr.dao.QuestionNiareDao;
import com.zlw.qn.mgr.domain.QuestionNiareDomain;
import com.zlw.qn.mgr.service.QuestionNiareService;
import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
