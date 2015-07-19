package com.zlw.qn.mgr.service;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.mgr.domain.Tag;
import com.zlw.qn.model.MyQuestion;
import com.zlw.qn.model.MyQuestionType;

import java.util.List;

/**
 * Created by YT on 2015/7/19.
 */
public interface QuestionMgrService  {

    public Pager pager(PagerQuery pagerQuery,String qtype,String tag,String keyword) throws Exception;

    public void insertQuestion(MyQuestion myQuestion);

    public void updateQuestion(MyQuestion myQuestion);

    public void deleteQuestion(Integer id);

    public void deleteQue(String pk);

    public void deleteQues(String pks);

    public void exportQue(String pk);

    public void exportQues(String pks);

    public void saveType(QusetionType domain);

    public void updateType(QusetionType domain);

    public MyQuestionType getMyQuestionTypeById(String id);

    public List<Tag> getTagList();

    public List<QusetionType> getQusetionTypeList();
}
