package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: CustomUser <br>
 * Create DateTime: 15-7-20 下午11:00 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "custom_user", schema = "", catalog = "vote")
public class CustomUser {
    private int id;
    private String username;
    private Boolean sex;
    private Integer salary;
    private String position;
    private String education;
    private Boolean married;
    private String star;
    private Integer age;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @GenericGenerator(name = "generator", strategy = "native")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "username", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "sex", nullable = true, insertable = true, updatable = true, length = 1, precision = 0)
    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    @Basic
    @Column(name = "salary", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    @Basic
    @Column(name = "position", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    @Basic
    @Column(name = "education", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    @Basic
    @Column(name = "married", nullable = true, insertable = true, updatable = true, length = 1, precision = 0)
    public Boolean getMarried() {
        return married;
    }

    public void setMarried(Boolean married) {
        this.married = married;
    }

    @Basic
    @Column(name = "star", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getStar() {
        return star;
    }

    public void setStar(String star) {
        this.star = star;
    }

    @Basic
    @Column(name = "age", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CustomUser that = (CustomUser) o;

        if (id != that.id) return false;
        if (age != null ? !age.equals(that.age) : that.age != null) return false;
        if (education != null ? !education.equals(that.education) : that.education != null) return false;
        if (married != null ? !married.equals(that.married) : that.married != null) return false;
        if (position != null ? !position.equals(that.position) : that.position != null) return false;
        if (salary != null ? !salary.equals(that.salary) : that.salary != null) return false;
        if (sex != null ? !sex.equals(that.sex) : that.sex != null) return false;
        if (star != null ? !star.equals(that.star) : that.star != null) return false;
        if (username != null ? !username.equals(that.username) : that.username != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (sex != null ? sex.hashCode() : 0);
        result = 31 * result + (salary != null ? salary.hashCode() : 0);
        result = 31 * result + (position != null ? position.hashCode() : 0);
        result = 31 * result + (education != null ? education.hashCode() : 0);
        result = 31 * result + (married != null ? married.hashCode() : 0);
        result = 31 * result + (star != null ? star.hashCode() : 0);
        result = 31 * result + (age != null ? age.hashCode() : 0);
        return result;
    }
}
