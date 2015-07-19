package com.zlw.ke.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: WjObject <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "wj_object", schema = "", catalog = "vote")
public class WjObject {
    private int oid;
    private String title;
    private String discribe;
    private Timestamp createtime;
    private Integer state;
    private String remark;
    private String anonymousFlag;

    @Id
    @Column(name = "oid", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    @Basic
    @Column(name = "title", nullable = true, insertable = true, updatable = true, length = 1000, precision = 0)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "discribe", nullable = true, insertable = true, updatable = true, length = 1000, precision = 0)
    public String getDiscribe() {
        return discribe;
    }

    public void setDiscribe(String discribe) {
        this.discribe = discribe;
    }

    @Basic
    @Column(name = "createtime", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public Timestamp getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Timestamp createtime) {
        this.createtime = createtime;
    }

    @Basic
    @Column(name = "state", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Basic
    @Column(name = "remark", nullable = true, insertable = true, updatable = true, length = 200, precision = 0)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Basic
    @Column(name = "anonymousFlag", nullable = true, insertable = true, updatable = true, length = 1, precision = 0)
    public String getAnonymousFlag() {
        return anonymousFlag;
    }

    public void setAnonymousFlag(String anonymousFlag) {
        this.anonymousFlag = anonymousFlag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WjObject wjObject = (WjObject) o;

        if (oid != wjObject.oid) return false;
        if (anonymousFlag != null ? !anonymousFlag.equals(wjObject.anonymousFlag) : wjObject.anonymousFlag != null)
            return false;
        if (createtime != null ? !createtime.equals(wjObject.createtime) : wjObject.createtime != null) return false;
        if (discribe != null ? !discribe.equals(wjObject.discribe) : wjObject.discribe != null) return false;
        if (remark != null ? !remark.equals(wjObject.remark) : wjObject.remark != null) return false;
        if (state != null ? !state.equals(wjObject.state) : wjObject.state != null) return false;
        if (title != null ? !title.equals(wjObject.title) : wjObject.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = oid;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (discribe != null ? discribe.hashCode() : 0);
        result = 31 * result + (createtime != null ? createtime.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        result = 31 * result + (anonymousFlag != null ? anonymousFlag.hashCode() : 0);
        return result;
    }
}
