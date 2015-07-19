package com.zlw.qn.model;

import org.aspectj.internal.lang.annotation.ajcDeclarePrecedence;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: Priviledge <br>
 * Create DateTime: 14-12-8 下午8:50 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "priviledge", catalog = "vote")
public class Priviledge {


    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator", strategy = "uuid")
    @Column(name = "ID", unique = true, nullable = false)
    private String id;

    @Column(name="NAME")
    private String name;


    @Column(name="CODE")
    private String code;


    @ManyToMany(mappedBy = "priviledges",cascade = CascadeType.ALL)
    private Set<SysUser> users=new HashSet<>();

    @OneToMany(mappedBy = "parent",cascade = CascadeType.ALL)
    private Set<Priviledge> priviledges;

    @ManyToOne
    @JoinColumn(name = "PARENT_ID")
    private  Priviledge parent;


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

    public Set<SysUser> getUsers() {
        return users;
    }

    public void setUsers(Set<SysUser> users) {
        this.users = users;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<Priviledge> getPriviledges() {
        return priviledges;
    }

    public void setPriviledges(Set<Priviledge> priviledges) {
        this.priviledges = priviledges;
    }

    public Priviledge getParent() {
        return parent;
    }

    public void setParent(Priviledge parent) {
        this.parent = parent;
    }
}
