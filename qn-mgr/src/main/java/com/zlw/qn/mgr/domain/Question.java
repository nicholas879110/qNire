package com.zlw.qn.mgr.domain;

/**
 * Created by YT on 2015/7/19.
 */
public class Question {
    private int id;
    private String title;
    private String qtypeTile;
    private Integer status;
    private String keyword;
    private String tagIdTitle;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getQtypeTile() {
        return qtypeTile;
    }

    public void setQtypeTile(String qtypeTile) {
        this.qtypeTile = qtypeTile;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getTagIdTitle() {
        return tagIdTitle;
    }

    public void setTagIdTitle(String tagIdTitle) {
        this.tagIdTitle = tagIdTitle;
    }
}
