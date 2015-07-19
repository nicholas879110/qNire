package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: Unit <br>
 * Create DateTime: 14-11-15 下午3:11 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "unit", catalog = "vote")
public class Unit {

    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator", strategy = "uuid")
    @Column(name = "ID", unique = true, nullable = false)
    private String id;

    @Column(name = "NAME")
    private String name;

    @ManyToOne
    @JoinColumn(name = "CREATE_USER_ID")
    private SysUser createUser;

    @Column(name = "createTime")
    private Date createTime;

    @ManyToOne
    @JoinColumn(name = "UPDATE_USER_ID")
    private SysUser updateUser;

    @Column(name = "UPDATE_TIME")
    private Date updateTime;

    @OneToMany(mappedBy = "unit",orphanRemoval=true)
    private Set<Video> videos=new HashSet<>();

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

    public SysUser getCreateUser() {
        return createUser;
    }

    public void setCreateUser(SysUser createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public SysUser getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(SysUser updateUser) {
        this.updateUser = updateUser;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Set<Video> getVideos() {
        return videos;
    }

    public void setVideos(Set<Video> videos) {
        this.videos = videos;
    }
}
