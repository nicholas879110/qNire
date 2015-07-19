package com.zlw.ke.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: WjAdmins <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "wj_admins", schema = "", catalog = "vote")
public class WjAdmins {
    private String username;
    private String password;

    @Basic
    @Column(name = "username", nullable = true, insertable = true, updatable = true, length = 20, precision = 0)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "password", nullable = true, insertable = true, updatable = true, length = 30, precision = 0)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WjAdmins wjAdmins = (WjAdmins) o;

        if (password != null ? !password.equals(wjAdmins.password) : wjAdmins.password != null) return false;
        if (username != null ? !username.equals(wjAdmins.username) : wjAdmins.username != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = username != null ? username.hashCode() : 0;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }
}
