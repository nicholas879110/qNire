package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserQuestion <br>
 * Create DateTime: 15-7-20 下午11:00 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "user_question", schema = "", catalog = "vote")
public class UserQuestion {
    private int id;
    private Date createTime;
    private MyQuestion myQuestion;
    private CustomUser customUser;
    @ManyToOne
    @JoinColumn(name = "ques_id", referencedColumnName = "id",insertable = false,updatable = false)
    public MyQuestion getMyQuestion() {
        return myQuestion;
    }

    public void setMyQuestion(MyQuestion myQuestion) {
        this.myQuestion = myQuestion;
    }
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id",insertable = false,updatable = false)
    public CustomUser getCustomUser() {
        return customUser;
    }

    public void setCustomUser(CustomUser customUser) {
        this.customUser = customUser;
    }

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
    @Column(name = "create_time", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserQuestion that = (UserQuestion) o;

        if (id != that.id) return false;
        if (createTime != null ? !createTime.equals(that.createTime) : that.createTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        return result;
    }
}
