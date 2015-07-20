package com.zlw.qn.model;

import javax.persistence.*;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserQuesOpt <br>
 * Create DateTime: 15-7-20 下午11:00 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "user_ques_opt", schema = "", catalog = "vote")
public class UserQuesOpt {
    private int id;
    private String answer;
    private Integer checked;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "answer", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Basic
    @Column(name = "checked", nullable = true, insertable = true, updatable = true, length = 10, precision = 0)
    public Integer getChecked() {
        return checked;
    }

    public void setChecked(Integer checked) {
        this.checked = checked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserQuesOpt that = (UserQuesOpt) o;

        if (id != that.id) return false;
        if (answer != null ? !answer.equals(that.answer) : that.answer != null) return false;
        if (checked != null ? !checked.equals(that.checked) : that.checked != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (answer != null ? answer.hashCode() : 0);
        result = 31 * result + (checked != null ? checked.hashCode() : 0);
        return result;
    }
}
