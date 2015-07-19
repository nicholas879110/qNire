package com.zlw.qn.model;

import javax.persistence.*;
import java.util.Set;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyRefNaireQuestion <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_ref_naire_question", schema = "", catalog = "vote")
public class MyRefNaireQuestion {
    private int id;
    private Integer naireId;
    private Integer questionId;
    private String sn;
    private Integer sOrder;
    private MyQuestion myQuestionByQuestionId;
    private MyQuestionaire myQuestionaireByNaireId;
    private Set<MyRefNqIns> myRefNqInsesById;
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
    @Column(name = "naire_id", nullable = true, insertable = false, updatable = false, length = 10, precision = 0)
    public Integer getNaireId() {
        return naireId;
    }

    public void setNaireId(Integer naireId) {
        this.naireId = naireId;
    }

    @Basic
    @Column(name = "question_id", nullable = true, insertable = false, updatable = false, length = 10, precision = 0)
    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    @Basic
    @Column(name = "sn", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    @Basic
    @Column(name = "s_order", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getsOrder() {
        return sOrder;
    }

    public void setsOrder(Integer sOrder) {
        this.sOrder = sOrder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyRefNaireQuestion that = (MyRefNaireQuestion) o;

        if (id != that.id) return false;
        if (naireId != null ? !naireId.equals(that.naireId) : that.naireId != null) return false;
        if (questionId != null ? !questionId.equals(that.questionId) : that.questionId != null) return false;
        if (sOrder != null ? !sOrder.equals(that.sOrder) : that.sOrder != null) return false;
        if (sn != null ? !sn.equals(that.sn) : that.sn != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (naireId != null ? naireId.hashCode() : 0);
        result = 31 * result + (questionId != null ? questionId.hashCode() : 0);
        result = 31 * result + (sn != null ? sn.hashCode() : 0);
        result = 31 * result + (sOrder != null ? sOrder.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    public MyQuestion getMyQuestionByQuestionId() {
        return myQuestionByQuestionId;
    }

    public void setMyQuestionByQuestionId(MyQuestion myQuestionByQuestionId) {
        this.myQuestionByQuestionId = myQuestionByQuestionId;
    }

    @ManyToOne
    @JoinColumn(name = "naire_id", referencedColumnName = "id")
    public MyQuestionaire getMyQuestionaireByNaireId() {
        return myQuestionaireByNaireId;
    }

    public void setMyQuestionaireByNaireId(MyQuestionaire myQuestionaireByNaireId) {
        this.myQuestionaireByNaireId = myQuestionaireByNaireId;
    }

    @OneToMany(mappedBy = "myRefNaireQuestionByQnId")
    public Set<MyRefNqIns> getMyRefNqInsesById() {
        return myRefNqInsesById;
    }

    public void setMyRefNqInsesById(Set<MyRefNqIns> myRefNqInsesById) {
        this.myRefNqInsesById = myRefNqInsesById;
    }

    @OneToMany(mappedBy = "myRefNaireQuestionByQnId")
    public Set<MyRefNqOption> getMyRefNqOptionsById() {
        return myRefNqOptionsById;
    }

    public void setMyRefNqOptionsById(Set<MyRefNqOption> myRefNqOptionsById) {
        this.myRefNqOptionsById = myRefNqOptionsById;
    }
}
