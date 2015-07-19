package com.zlw.qn.model;

import javax.persistence.*;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyRefNqIns <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_ref_nq_ins", schema = "", catalog = "vote")
public class MyRefNqIns {
    private int id;
    private Integer qnId;
    private Integer insId;
    private MyInstruction myInstructionByInsId;
    private MyRefNaireQuestion myRefNaireQuestionByQnId;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "qn_id", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getQnId() {
        return qnId;
    }

    public void setQnId(Integer qnId) {
        this.qnId = qnId;
    }

    @Basic
    @Column(name = "ins_id", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getInsId() {
        return insId;
    }

    public void setInsId(Integer insId) {
        this.insId = insId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyRefNqIns that = (MyRefNqIns) o;

        if (id != that.id) return false;
        if (insId != null ? !insId.equals(that.insId) : that.insId != null) return false;
        if (qnId != null ? !qnId.equals(that.qnId) : that.qnId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (qnId != null ? qnId.hashCode() : 0);
        result = 31 * result + (insId != null ? insId.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "ins_id", referencedColumnName = "id",insertable = false,updatable = false)
    public MyInstruction getMyInstructionByInsId() {
        return myInstructionByInsId;
    }

    public void setMyInstructionByInsId(MyInstruction myInstructionByInsId) {
        this.myInstructionByInsId = myInstructionByInsId;
    }

    @ManyToOne
    @JoinColumn(name = "qn_id", referencedColumnName = "id",insertable = false,updatable = false)
    public MyRefNaireQuestion getMyRefNaireQuestionByQnId() {
        return myRefNaireQuestionByQnId;
    }

    public void setMyRefNaireQuestionByQnId(MyRefNaireQuestion myRefNaireQuestionByQnId) {
        this.myRefNaireQuestionByQnId = myRefNaireQuestionByQnId;
    }
}
