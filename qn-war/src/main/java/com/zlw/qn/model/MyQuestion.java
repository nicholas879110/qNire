package com.zlw.qn.model;

import javax.persistence.*;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyQuestion <br>
 * Create DateTime: 15-7-20 下午11:00 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_question", schema = "", catalog = "vote")
public class MyQuestion {
    private int id;
    private String title;
    private String shortTitle;
    private Integer status;
    private String keyword;
    private String ins;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "title", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "short_title", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getShortTitle() {
        return shortTitle;
    }

    public void setShortTitle(String shortTitle) {
        this.shortTitle = shortTitle;
    }

    @Basic
    @Column(name = "status", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Basic
    @Column(name = "keyword", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    @Basic
    @Column(name = "ins", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getIns() {
        return ins;
    }

    public void setIns(String ins) {
        this.ins = ins;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyQuestion question = (MyQuestion) o;

        if (id != question.id) return false;
        if (ins != null ? !ins.equals(question.ins) : question.ins != null) return false;
        if (keyword != null ? !keyword.equals(question.keyword) : question.keyword != null) return false;
        if (shortTitle != null ? !shortTitle.equals(question.shortTitle) : question.shortTitle != null) return false;
        if (status != null ? !status.equals(question.status) : question.status != null) return false;
        if (title != null ? !title.equals(question.title) : question.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (shortTitle != null ? shortTitle.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (keyword != null ? keyword.hashCode() : 0);
        result = 31 * result + (ins != null ? ins.hashCode() : 0);
        return result;
    }
}