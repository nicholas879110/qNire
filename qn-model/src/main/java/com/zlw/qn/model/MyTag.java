package com.zlw.qn.model;

import javax.persistence.*;
import java.util.Collection;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyTag <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_tag", schema = "", catalog = "vote")
public class MyTag {
    private int id;
    private String tagName;
    private Collection<MyQuestion> myQuestionsById;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "tag_name", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyTag myTag = (MyTag) o;

        if (id != myTag.id) return false;
        if (tagName != null ? !tagName.equals(myTag.tagName) : myTag.tagName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (tagName != null ? tagName.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "myTagByTagId")
    public Collection<MyQuestion> getMyQuestionsById() {
        return myQuestionsById;
    }

    public void setMyQuestionsById(Collection<MyQuestion> myQuestionsById) {
        this.myQuestionsById = myQuestionsById;
    }
}
