package com.zlw.qn.mgr.domain;

import java.util.List;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: QnQuestionDomain <br>
 * Create DateTime: 15-7-19 下午8:44 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class QnQuestionDomain {

    private int id;
    private String title;
    private String shortTitle;
    private Integer qtype;
    private Integer status;
    private String keword;
    private Integer oIndex;
    private String sn;
    private String ins;//提示

    private List<QnQuestionOptionDomain> options;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortTitle() {
        return shortTitle;
    }

    public void setShortTitle(String shortTitle) {
        this.shortTitle = shortTitle;
    }

    public Integer getQtype() {
        return qtype;
    }

    public void setQtype(Integer qtype) {
        this.qtype = qtype;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getKeword() {
        return keword;
    }

    public void setKeword(String keword) {
        this.keword = keword;
    }

    public List<QnQuestionOptionDomain> getOptions() {
        return options;
    }

    public void setOptions(List<QnQuestionOptionDomain> options) {
        this.options = options;
    }

    public Integer getoIndex() {
        return oIndex;
    }

    public void setoIndex(Integer oIndex) {
        this.oIndex = oIndex;
    }

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public String getIns() {
        return ins;
    }

    public void setIns(String ins) {
        this.ins = ins;
    }
}
