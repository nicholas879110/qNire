package com.zlw.ke.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: SysUser <br>
 * Create DateTime: 14-11-15 下午3:03 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "sys_user", catalog = "vote", schema = "")
public class SysUser  implements Serializable{

    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator", strategy = "uuid")
    @Column(name = "ID", unique = true, nullable = false)
    private String id;
    @Column(name = "USERNAME")
    private String username;
    @Column(name="NAME")
    private String name;
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "CREATE_TIME")
    private Date createTime;
    @Column(name = "UPDATE_TIME")
    private Date updateTime;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "Tel_NUM")
    private String telNum;
    @Column (name="TYPE")
    private Byte type;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_priviledge", joinColumns = {@JoinColumn(name = "FK_USER_ID", nullable = false, updatable = false)}, inverseJoinColumns = {@JoinColumn(name = "FK_PRIVILEDGE_ID", nullable = false, updatable = false)})
    private Set<Priviledge> priviledges=new HashSet<>();
    private Collection<Unit> unitsById;
    private Collection<Unit> unitsById_0;
    private Collection<UserPriviledge> userPriviledgesById;
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
    @Column(name = "USERNAME", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "PASSWORD", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "CREATE_TIME", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "UPDATE_TIME", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Basic
    @Column(name = "EMAIL", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Tel_NUM", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getTelNum() {
        return telNum;
    }

    public void setTelNum(String telNum) {
        this.telNum = telNum;
    }

    @Basic
    @Column(name = "NAME", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "TYPE", nullable = true, insertable = true, updatable = true, length = 3, precision = 0)
    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public Set<Priviledge> getPriviledges() {
        return priviledges;
    }

    public void setPriviledges(Set<Priviledge> priviledges) {
        this.priviledges = priviledges;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SysUser sysUser = (SysUser) o;

        if (createTime != null ? !createTime.equals(sysUser.createTime) : sysUser.createTime != null) return false;
        if (email != null ? !email.equals(sysUser.email) : sysUser.email != null) return false;
        if (id != null ? !id.equals(sysUser.id) : sysUser.id != null) return false;
        if (name != null ? !name.equals(sysUser.name) : sysUser.name != null) return false;
        if (password != null ? !password.equals(sysUser.password) : sysUser.password != null) return false;
        if (telNum != null ? !telNum.equals(sysUser.telNum) : sysUser.telNum != null) return false;
        if (type != null ? !type.equals(sysUser.type) : sysUser.type != null) return false;
        if (updateTime != null ? !updateTime.equals(sysUser.updateTime) : sysUser.updateTime != null) return false;
        if (username != null ? !username.equals(sysUser.username) : sysUser.username != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (telNum != null ? telNum.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "sysUserByUpdateUserId")
    public Collection<Unit> getUnitsById() {
        return unitsById;
    }

    public void setUnitsById(Collection<Unit> unitsById) {
        this.unitsById = unitsById;
    }

    @OneToMany(mappedBy = "sysUserByCreateUserId")
    public Collection<Unit> getUnitsById_0() {
        return unitsById_0;
    }

    public void setUnitsById_0(Collection<Unit> unitsById_0) {
        this.unitsById_0 = unitsById_0;
    }

    @OneToMany(mappedBy = "sysUserByFkUserId")
    public Collection<UserPriviledge> getUserPriviledgesById() {
        return userPriviledgesById;
    }

    public void setUserPriviledgesById(Collection<UserPriviledge> userPriviledgesById) {
        this.userPriviledgesById = userPriviledgesById;
    }

    @OneToMany(mappedBy = "sysUserByCreateUserId")
    public Collection<Video> getVideosById() {
        return videosById;
    }

    public void setVideosById(Collection<Video> videosById) {
        this.videosById = videosById;
    }
}
