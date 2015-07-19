package com.zlw.ke.model;

import javax.persistence.*;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserPriviledge <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "user_priviledge", schema = "", catalog = "vote")
@IdClass(UserPriviledgePK.class)
public class UserPriviledge {
    private String fkUserId;
    private String fkPriviledgeId;
    private SysUser sysUserByFkUserId;
    private Priviledge priviledgeByFkPriviledgeId;

    @Id
    @Column(name = "FK_USER_ID", nullable = false, insertable = true, updatable = true, length = 255, precision = 0)
    public String getFkUserId() {
        return fkUserId;
    }

    public void setFkUserId(String fkUserId) {
        this.fkUserId = fkUserId;
    }

    @Id
    @Column(name = "FK_PRIVILEDGE_ID", nullable = false, insertable = true, updatable = true, length = 255, precision = 0)
    public String getFkPriviledgeId() {
        return fkPriviledgeId;
    }

    public void setFkPriviledgeId(String fkPriviledgeId) {
        this.fkPriviledgeId = fkPriviledgeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserPriviledge that = (UserPriviledge) o;

        if (fkPriviledgeId != null ? !fkPriviledgeId.equals(that.fkPriviledgeId) : that.fkPriviledgeId != null)
            return false;
        if (fkUserId != null ? !fkUserId.equals(that.fkUserId) : that.fkUserId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = fkUserId != null ? fkUserId.hashCode() : 0;
        result = 31 * result + (fkPriviledgeId != null ? fkPriviledgeId.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "FK_USER_ID", referencedColumnName = "ID", nullable = false)
    public SysUser getSysUserByFkUserId() {
        return sysUserByFkUserId;
    }

    public void setSysUserByFkUserId(SysUser sysUserByFkUserId) {
        this.sysUserByFkUserId = sysUserByFkUserId;
    }

    @ManyToOne
    @JoinColumn(name = "FK_PRIVILEDGE_ID", referencedColumnName = "ID", nullable = false)
    public Priviledge getPriviledgeByFkPriviledgeId() {
        return priviledgeByFkPriviledgeId;
    }

    public void setPriviledgeByFkPriviledgeId(Priviledge priviledgeByFkPriviledgeId) {
        this.priviledgeByFkPriviledgeId = priviledgeByFkPriviledgeId;
    }
}
