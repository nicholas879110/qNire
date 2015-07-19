package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;
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
@Table(name = "priviledge", catalog = "qn")
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
    private String parentId;
    private Priviledge priviledgeByParentId;
    private Collection<Priviledge> priviledgesById;
    private Collection<UserPriviledge> userPriviledgesById;

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

    public Set<SysUser> getUsers() {
        return users;
    }

    public void setUsers(Set<SysUser> users) {
        this.users = users;
    }

    @Basic
    @Column(name = "CODE", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
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

    @Basic
    @Column(name = "PARENT_ID", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Priviledge that = (Priviledge) o;

        if (code != null ? !code.equals(that.code) : that.code != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (parentId != null ? !parentId.equals(that.parentId) : that.parentId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (code != null ? code.hashCode() : 0);
        result = 31 * result + (parentId != null ? parentId.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "PARENT_ID", referencedColumnName = "ID")
    public Priviledge getPriviledgeByParentId() {
        return priviledgeByParentId;
    }

    public void setPriviledgeByParentId(Priviledge priviledgeByParentId) {
        this.priviledgeByParentId = priviledgeByParentId;
    }

    @OneToMany(mappedBy = "priviledgeByParentId")
    public Collection<Priviledge> getPriviledgesById() {
        return priviledgesById;
    }

    public void setPriviledgesById(Collection<Priviledge> priviledgesById) {
        this.priviledgesById = priviledgesById;
    }

    @OneToMany(mappedBy = "priviledgeByFkPriviledgeId")
    public Collection<UserPriviledge> getUserPriviledgesById() {
        return userPriviledgesById;
    }

    public void setUserPriviledgesById(Collection<UserPriviledge> userPriviledgesById) {
        this.userPriviledgesById = userPriviledgesById;
    }
}
