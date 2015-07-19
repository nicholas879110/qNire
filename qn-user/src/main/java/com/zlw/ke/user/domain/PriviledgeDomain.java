package com.zlw.ke.user.domain;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: PriviledgeDomain <br>
 * Create DateTime: 14-12-8 下午10:44 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class PriviledgeDomain {

    private String id;
    private String name;
    private String pId;
    private Boolean checked;

    public PriviledgeDomain(String id, String name, String pId, boolean b) {
        this.id = id;
        this.name = name;
        this.pId = pId;
        this.checked = b;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }
}
