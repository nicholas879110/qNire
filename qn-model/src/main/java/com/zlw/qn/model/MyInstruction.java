package com.zlw.qn.model;

import javax.persistence.*;
import java.util.Set;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: MyInstruction <br>
 * Create DateTime: 15-7-19 下午2:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Table(name = "my_instruction", schema = "", catalog = "vote")
public class MyInstruction {
    private int id;
    private String content;
    private Set<MyRefNqIns> myRefNqInsesById;

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = true, length = 10, precision = 0)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "content", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MyInstruction that = (MyInstruction) o;

        if (id != that.id) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "myInstructionByInsId")
    public Set<MyRefNqIns> getMyRefNqInsesById() {
        return myRefNqInsesById;
    }

    public void setMyRefNqInsesById(Set<MyRefNqIns> myRefNqInsesById) {
        this.myRefNqInsesById = myRefNqInsesById;
    }
}
