package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyQuestionaire <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_questionaire", schema = "", catalog = "vote")
public class MyQuestionaire {
    private int id;
    private String name;
    private String version;
    private Integer status;
    private String desp;
    private Integer anonymousFlag;
    private Set<MyRefNaireQuestion> myRefNaireQuestionsById;

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
    @Column(name = "name", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "version", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    @Basic
    @Column(name = "status", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Basic
    @Column(name = "desp", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getDesp() {
        return desp;
    }

    public void setDesp(String desp) {
        this.desp = desp;
    }

    @Basic
    @Column(name = "anonymousFlag", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getAnonymousFlag() {
        return anonymousFlag;
    }

    public void setAnonymousFlag(Integer anonymousFlag) {
        this.anonymousFlag = anonymousFlag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyQuestionaire that = (MyQuestionaire) o;

        if (id != that.id) return false;
        if (anonymousFlag != null ? !anonymousFlag.equals(that.anonymousFlag) : that.anonymousFlag != null)
            return false;
        if (desp != null ? !desp.equals(that.desp) : that.desp != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (version != null ? !version.equals(that.version) : that.version != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (version != null ? version.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (desp != null ? desp.hashCode() : 0);
        result = 31 * result + (anonymousFlag != null ? anonymousFlag.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "myQuestionaireByNaireId")
    public Set<MyRefNaireQuestion> getMyRefNaireQuestionsById() {
        return myRefNaireQuestionsById;
    }

    public void setMyRefNaireQuestionsById(Set<MyRefNaireQuestion> myRefNaireQuestionsById) {
        this.myRefNaireQuestionsById = myRefNaireQuestionsById;
    }
}
