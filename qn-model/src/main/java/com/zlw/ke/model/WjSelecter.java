package com.zlw.ke.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: WjSelecter <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "wj_selecter", schema = "", catalog = "vote")
public class WjSelecter {
    private Integer oid;
    private Integer qseq;
    private String content;
    private Integer selseq;
    private String remark;

    @Basic
    @Column(name = "oid", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    @Basic
    @Column(name = "qseq", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getQseq() {
        return qseq;
    }

    public void setQseq(Integer qseq) {
        this.qseq = qseq;
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
    @Column(name = "selseq", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getSelseq() {
        return selseq;
    }

    public void setSelseq(Integer selseq) {
        this.selseq = selseq;
    }

    @Basic
    @Column(name = "remark", nullable = true, insertable = true, updatable = true, length = 20, precision = 0)
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

        WjSelecter that = (WjSelecter) o;

        if (content != null ? !content.equals(that.content) : that.content != null) return false;
        if (oid != null ? !oid.equals(that.oid) : that.oid != null) return false;
        if (qseq != null ? !qseq.equals(that.qseq) : that.qseq != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (selseq != null ? !selseq.equals(that.selseq) : that.selseq != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = oid != null ? oid.hashCode() : 0;
        result = 31 * result + (qseq != null ? qseq.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (selseq != null ? selseq.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }
}
