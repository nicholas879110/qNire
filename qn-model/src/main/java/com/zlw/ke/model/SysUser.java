package com.zlw.ke.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
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
@Table(name = "sys_user", catalog = "ke")
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelNum() {
        return telNum;
    }

    public void setTelNum(String telNum) {
        this.telNum = telNum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

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
}
