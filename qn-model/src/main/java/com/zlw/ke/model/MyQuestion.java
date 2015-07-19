package com.zlw.ke.model;

import javax.persistence.*;
import java.util.Collection;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyQuestion <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_question", schema = "", catalog = "vote")
public class MyQuestion {
    private int id;
    private String title;
    private String shortTitle;
    private Integer qtype;
    private Integer status;
    private String keyword;
    private Integer tagId;
    private MyTag myTagByTagId;
    private MyQuestionType myQuestionTypeByQtype;
    private Collection<MyRefNaireQuestion> myRefNaireQuestionsById;

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
    @Column(name = "qtype", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getQtype() {
        return qtype;
    }

    public void setQtype(Integer qtype) {
        this.qtype = qtype;
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
    @Column(name = "tag_id", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyQuestion that = (MyQuestion) o;

        if (id != that.id) return false;
        if (keyword != null ? !keyword.equals(that.keyword) : that.keyword != null) return false;
        if (qtype != null ? !qtype.equals(that.qtype) : that.qtype != null) return false;
        if (shortTitle != null ? !shortTitle.equals(that.shortTitle) : that.shortTitle != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (tagId != null ? !tagId.equals(that.tagId) : that.tagId != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (shortTitle != null ? shortTitle.hashCode() : 0);
        result = 31 * result + (qtype != null ? qtype.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (keyword != null ? keyword.hashCode() : 0);
        result = 31 * result + (tagId != null ? tagId.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "tag_id", referencedColumnName = "id")
    public MyTag getMyTagByTagId() {
        return myTagByTagId;
    }

    public void setMyTagByTagId(MyTag myTagByTagId) {
        this.myTagByTagId = myTagByTagId;
    }

    @ManyToOne
    @JoinColumn(name = "qtype", referencedColumnName = "id")
    public MyQuestionType getMyQuestionTypeByQtype() {
        return myQuestionTypeByQtype;
    }

    public void setMyQuestionTypeByQtype(MyQuestionType myQuestionTypeByQtype) {
        this.myQuestionTypeByQtype = myQuestionTypeByQtype;
    }

    @OneToMany(mappedBy = "myQuestionByQuestionId")
    public Collection<MyRefNaireQuestion> getMyRefNaireQuestionsById() {
        return myRefNaireQuestionsById;
    }

    public void setMyRefNaireQuestionsById(Collection<MyRefNaireQuestion> myRefNaireQuestionsById) {
        this.myRefNaireQuestionsById = myRefNaireQuestionsById;
    }
}
