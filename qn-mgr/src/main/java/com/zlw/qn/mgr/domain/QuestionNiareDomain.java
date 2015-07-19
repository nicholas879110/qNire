package com.zlw.qn.mgr.domain;

import java.util.List;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: QuestionNiareDomain <br>
 * Create DateTime: 15-7-19 下午2:49 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class QuestionNiareDomain {

    private int id;
    private String name;
    private String version;
    private Integer status;
    private String desp;
    private Integer anonymousFlag;
    private List<QnQuestionDomain> questions;

    public List<QnQuestionDomain> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QnQuestionDomain> questions) {
        this.questions = questions;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDesp() {
        return desp;
    }

    public void setDesp(String desp) {
        this.desp = desp;
    }

    public Integer getAnonymousFlag() {
        return anonymousFlag;
    }

    public void setAnonymousFlag(Integer anonymousFlag) {
        this.anonymousFlag = anonymousFlag;
    }
}
