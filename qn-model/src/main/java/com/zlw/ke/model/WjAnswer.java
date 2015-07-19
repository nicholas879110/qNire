package com.zlw.ke.model;

import javax.persistence.*;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: WjAnswer <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "wj_answer", schema = "", catalog = "vote")
public class WjAnswer {
    private int answerId;
    private int replayId;
    private int oid;
    private Integer qSeq;
    private Integer seSeq;
    private String seValue;
    private String remark;

    @Id
    @Column(name = "answerId", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getAnswerId() {
        return answerId;
    }

    public void setAnswerId(int answerId) {
        this.answerId = answerId;
    }

    @Basic
    @Column(name = "replayId", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getReplayId() {
        return replayId;
    }

    public void setReplayId(int replayId) {
        this.replayId = replayId;
    }

    @Basic
    @Column(name = "oid", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    @Basic
    @Column(name = "qSeq", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getqSeq() {
        return qSeq;
    }

    public void setqSeq(Integer qSeq) {
        this.qSeq = qSeq;
    }

    @Basic
    @Column(name = "seSeq", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getSeSeq() {
        return seSeq;
    }

    public void setSeSeq(Integer seSeq) {
        this.seSeq = seSeq;
    }

    @Basic
    @Column(name = "seValue", nullable = true, insertable = true, updatable = true, length = 1000, precision = 0)
    public String getSeValue() {
        return seValue;
    }

    public void setSeValue(String seValue) {
        this.seValue = seValue;
    }

    @Basic
    @Column(name = "remark", nullable = true, insertable = true, updatable = true, length = 200, precision = 0)
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

        WjAnswer wjAnswer = (WjAnswer) o;

        if (answerId != wjAnswer.answerId) return false;
        if (oid != wjAnswer.oid) return false;
        if (replayId != wjAnswer.replayId) return false;
        if (qSeq != null ? !qSeq.equals(wjAnswer.qSeq) : wjAnswer.qSeq != null) return false;
        if (remark != null ? !remark.equals(wjAnswer.remark) : wjAnswer.remark != null) return false;
        if (seSeq != null ? !seSeq.equals(wjAnswer.seSeq) : wjAnswer.seSeq != null) return false;
        if (seValue != null ? !seValue.equals(wjAnswer.seValue) : wjAnswer.seValue != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = answerId;
        result = 31 * result + replayId;
        result = 31 * result + oid;
        result = 31 * result + (qSeq != null ? qSeq.hashCode() : 0);
        result = 31 * result + (seSeq != null ? seSeq.hashCode() : 0);
        result = 31 * result + (seValue != null ? seValue.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }
}
