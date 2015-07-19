package com.zlw.ke.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: WjQuestion <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "wj_question", schema = "", catalog = "vote")
public class WjQuestion {
    private Integer oid;
    private String content;
    private Integer qtype;
    private Integer seq;
    private String remark;
    private String title;

    @Basic
    @Column(name = "oid", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    @Basic
    @Column(name = "content", nullable = true, insertable = true, updatable = true, length = 1000, precision = 0)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
    @Column(name = "seq", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    @Basic
    @Column(name = "remark", nullable = true, insertable = true, updatable = true, length = 20, precision = 0)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Basic
    @Column(name = "title", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WjQuestion that = (WjQuestion) o;

        if (content != null ? !content.equals(that.content) : that.content != null) return false;
        if (oid != null ? !oid.equals(that.oid) : that.oid != null) return false;
        if (qtype != null ? !qtype.equals(that.qtype) : that.qtype != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (seq != null ? !seq.equals(that.seq) : that.seq != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = oid != null ? oid.hashCode() : 0;
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (qtype != null ? qtype.hashCode() : 0);
        result = 31 * result + (seq != null ? seq.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        return result;
    }
}
