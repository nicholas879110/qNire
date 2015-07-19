package com.zlw.ke.model;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: WjReplay <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "wj_replay", schema = "", catalog = "vote")
public class WjReplay {
    private int replayId;
    private String replayCode;
    private String replayIp;
    private int oid;
    private Timestamp replayTime;
    private String remark;

    @Id
    @Column(name = "replayId", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getReplayId() {
        return replayId;
    }

    public void setReplayId(int replayId) {
        this.replayId = replayId;
    }

    @Basic
    @Column(name = "replayCode", nullable = false, insertable = true, updatable = true, length = 100, precision = 0)
    public String getReplayCode() {
        return replayCode;
    }

    public void setReplayCode(String replayCode) {
        this.replayCode = replayCode;
    }

    @Basic
    @Column(name = "replayIp", nullable = false, insertable = true, updatable = true, length = 100, precision = 0)
    public String getReplayIp() {
        return replayIp;
    }

    public void setReplayIp(String replayIp) {
        this.replayIp = replayIp;
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
    @Column(name = "replayTime", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public Timestamp getReplayTime() {
        return replayTime;
    }

    public void setReplayTime(Timestamp replayTime) {
        this.replayTime = replayTime;
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

        WjReplay wjReplay = (WjReplay) o;

        if (oid != wjReplay.oid) return false;
        if (replayId != wjReplay.replayId) return false;
        if (remark != null ? !remark.equals(wjReplay.remark) : wjReplay.remark != null) return false;
        if (replayCode != null ? !replayCode.equals(wjReplay.replayCode) : wjReplay.replayCode != null) return false;
        if (replayIp != null ? !replayIp.equals(wjReplay.replayIp) : wjReplay.replayIp != null) return false;
        if (replayTime != null ? !replayTime.equals(wjReplay.replayTime) : wjReplay.replayTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = replayId;
        result = 31 * result + (replayCode != null ? replayCode.hashCode() : 0);
        result = 31 * result + (replayIp != null ? replayIp.hashCode() : 0);
        result = 31 * result + oid;
        result = 31 * result + (replayTime != null ? replayTime.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }
}
