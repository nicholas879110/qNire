package com.zlw.qn.mgr.domain;

/**
 * Created by YT on 2015/7/19.
 */
public class QuestionAdd {

    private String title;
    private Integer qtype;
    private String keyword;
    private String keywordOth;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getQtype() {
        return qtype;
    }

    public void setQtype(Integer qtype) {
        this.qtype = qtype;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getKeywordOth() {
        return keywordOth;
    }

    public void setKeywordOth(String keywordOth) {
        this.keywordOth = keywordOth;
    }
}
