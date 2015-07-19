package com.zlw.qn.video.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: UnitDomain <br>
 * Create DateTime: 14-11-15 下午3:40 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class UnitDomain {

    private String id;
    private String name;
    private String  createUserId;
    private Date createTime;
    private String updateUserID;
    private Date updateTime;
    private List<String> headUrls=new ArrayList<>();

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

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUpdateUserID() {
        return updateUserID;
    }

    public void setUpdateUserID(String updateUserID) {
        this.updateUserID = updateUserID;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public List<String> getHeadUrls() {
        return headUrls;
    }

    public void setHeadUrls(List<String> headUrls) {
        this.headUrls = headUrls;
    }
}
