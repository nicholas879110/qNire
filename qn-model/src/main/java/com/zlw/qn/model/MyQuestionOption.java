package com.zlw.qn.model;

import javax.persistence.*;
import java.util.Set;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyQuestionOption <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_question_option", schema = "", catalog = "vote")
public class MyQuestionOption {
    private int id;
    private String answer;
    private String remark;
    private Set<MyRefNqOption> myRefNqOptionsById;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "answer", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Basic
    @Column(name = "remark", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyQuestionOption that = (MyQuestionOption) o;

        if (id != that.id) return false;
        if (answer != null ? !answer.equals(that.answer) : that.answer != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (answer != null ? answer.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "myQuestionOptionByOptionId")
    public Set<MyRefNqOption> getMyRefNqOptionsById() {
        return myRefNqOptionsById;
    }

    public void setMyRefNqOptionsById(Set<MyRefNqOption> myRefNqOptionsById) {
        this.myRefNqOptionsById = myRefNqOptionsById;
    }
}
