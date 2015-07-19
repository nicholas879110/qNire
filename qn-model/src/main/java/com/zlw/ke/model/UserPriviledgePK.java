package com.zlw.ke.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserPriviledgePK <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class UserPriviledgePK implements Serializable {
    private String fkUserId;
    private String fkPriviledgeId;

    @Column(name = "FK_USER_ID", nullable = false, insertable = true, updatable = true, length = 255, precision = 0)
    @Id
    public String getFkUserId() {
        return fkUserId;
    }

    public void setFkUserId(String fkUserId) {
        this.fkUserId = fkUserId;
    }

    @Column(name = "FK_PRIVILEDGE_ID", nullable = false, insertable = true, updatable = true, length = 255, precision = 0)
    @Id
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

        UserPriviledgePK that = (UserPriviledgePK) o;

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
}
