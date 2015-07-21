package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserQuesOpt <br>
 * Create DateTime: 15-7-20 下午11:00 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "user_ques_opt", schema = "", catalog = "vote")
public class UserQuesOpt {
    private int id;
    private String answer;
    private Integer checked;
    private UserQuestion userQuestion;
    private MyQuestionOption questionOption;

    private int uqId;
    private int qoId;

    @Basic
    @Column(name = "user_ques_id", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public int getUqId() {
        return uqId;
    }

    public void setUqId(int uqId) {
        this.uqId = uqId;
    }

    @Basic
    @Column(name = "opt_id", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public int getQoId() {
        return qoId;
    }

    public void setQoId(int qoId) {
        this.qoId = qoId;
    }

    @ManyToOne
    @JoinColumn(name = "user_ques_id", referencedColumnName = "id",insertable = false,updatable = false)
    public UserQuestion getUserQuestion() {
        return userQuestion;
    }

    public void setUserQuestion(UserQuestion userQuestion) {
        this.userQuestion = userQuestion;
    }
    @ManyToOne
    @JoinColumn(name = "opt_id", referencedColumnName = "id",insertable = false,updatable = false)
    public MyQuestionOption getQuestionOption() {
        return questionOption;
    }

    public void setQuestionOption(MyQuestionOption questionOption) {
        this.questionOption = questionOption;
    }

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @GenericGenerator(name = "generator", strategy = "native")
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
    @Column(name = "checked", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getChecked() {
        return checked;
    }

    public void setChecked(Integer checked) {
        this.checked = checked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserQuesOpt that = (UserQuesOpt) o;

        if (id != that.id) return false;
        if (answer != null ? !answer.equals(that.answer) : that.answer != null) return false;
        if (checked != null ? !checked.equals(that.checked) : that.checked != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (answer != null ? answer.hashCode() : 0);
        result = 31 * result + (checked != null ? checked.hashCode() : 0);
        return result;
    }
}
