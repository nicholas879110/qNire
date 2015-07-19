package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
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
@Table(name = "unit", catalog = "qn")
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
    private String createUserId;
    private String updateUserId;
    private SysUser sysUserByUpdateUserId;
    private SysUser sysUserByCreateUserId;
    private Collection<Video> videosById;

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    @Id
    @Column(name = "ID", nullable = false, insertable = true, updatable = true, length = 255, precision = 0)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "NAME", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
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

    @Basic
    @Column(name = "createTime", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
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

    @Basic
    @Column(name = "UPDATE_TIME", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
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

    @Basic
    @Column(name = "CREATE_USER_ID", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    @Basic
    @Column(name = "UPDATE_USER_ID", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getUpdateUserId() {
        return updateUserId;
    }

    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Unit unit = (Unit) o;

        if (createTime != null ? !createTime.equals(unit.createTime) : unit.createTime != null) return false;
        if (createUserId != null ? !createUserId.equals(unit.createUserId) : unit.createUserId != null) return false;
        if (id != null ? !id.equals(unit.id) : unit.id != null) return false;
        if (name != null ? !name.equals(unit.name) : unit.name != null) return false;
        if (updateTime != null ? !updateTime.equals(unit.updateTime) : unit.updateTime != null) return false;
        if (updateUserId != null ? !updateUserId.equals(unit.updateUserId) : unit.updateUserId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        result = 31 * result + (createUserId != null ? createUserId.hashCode() : 0);
        result = 31 * result + (updateUserId != null ? updateUserId.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "UPDATE_USER_ID", referencedColumnName = "ID")
    public SysUser getSysUserByUpdateUserId() {
        return sysUserByUpdateUserId;
    }

    public void setSysUserByUpdateUserId(SysUser sysUserByUpdateUserId) {
        this.sysUserByUpdateUserId = sysUserByUpdateUserId;
    }

    @ManyToOne
    @JoinColumn(name = "CREATE_USER_ID", referencedColumnName = "ID")
    public SysUser getSysUserByCreateUserId() {
        return sysUserByCreateUserId;
    }

    public void setSysUserByCreateUserId(SysUser sysUserByCreateUserId) {
        this.sysUserByCreateUserId = sysUserByCreateUserId;
    }

    @OneToMany(mappedBy = "unitByUnitId")
    public Collection<Video> getVideosById() {
        return videosById;
    }

    public void setVideosById(Collection<Video> videosById) {
        this.videosById = videosById;
    }
}
