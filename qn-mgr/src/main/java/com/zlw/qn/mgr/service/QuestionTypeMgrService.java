package com.zlw.qn.mgr.service;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.model.MyQuestion;
import com.zlw.qn.model.MyQuestionType;

/**
 * Created by YT on 2015/7/19.
 */
public interface QuestionTypeMgrService {

    public Pager typePager(PagerQuery pagerQuery) throws Exception;

    public void insertQuestion(MyQuestion myQuestion);

    public void updateQuestion(MyQuestion myQuestion);

    public void deleteQuestion(Integer id);

    public void deleteType(String pk);

    public void deleteTypes(String pks);

    public void saveType(QusetionType domain);

    public void updateType(QusetionType domain);

    public MyQuestionType getMyQuestionTypeById(String id);
}
