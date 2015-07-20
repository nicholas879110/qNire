package com.zlw.qn.mgr.service;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QnQuestionDomain;
import com.zlw.qn.mgr.domain.QuestionNiareDomain;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: QuestionNiareService <br>
 * Create DateTime: 15-7-19 下午2:47 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public interface QuestionNiareService {

    Pager<QuestionNiareDomain> pager(PagerQuery pagerQuery);



    void save(QuestionNiareDomain domain);

    void update(QuestionNiareDomain domain);

    void deploy(Integer id);

    void delete(Integer id);

    void cancelDeploy(Integer id);

    QuestionNiareDomain queryDomain(Integer id);

    void saveQuestion(Integer naireId, QnQuestionDomain questionDomain);

    void removeQuestion(Integer niareId, Integer questionId,Integer sOrder);

    QnQuestionDomain queryQnQuestionDomain(Integer niareId, Integer questionId, Integer sOrder);

    void removeQuestionOption(Integer niareId, Integer questionId, Integer optionId);

    void updateQuestion(Integer niareId, QnQuestionDomain questionDomain);

}
