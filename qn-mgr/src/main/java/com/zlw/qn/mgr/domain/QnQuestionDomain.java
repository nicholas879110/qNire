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
    private Integer sOrder;
    private Integer preQuestionId;
    private Integer preIndex;
    private String sn;
    private String ins;//提示
    private String[] tags;
    private List<QnQuestionOptionDomain> options;

    public int getId() {
        return id;
    }

    public Integer getPreIndex() {
        return preIndex;
    }

    public void setPreIndex(Integer preIndex) {
        this.preIndex = preIndex;
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

    public Integer getsOrder() {
        return sOrder;
    }

    public void setsOrder(Integer sOrder) {
        this.sOrder = sOrder;
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

    public Integer getPreQuestionId() {
        return preQuestionId;
    }

    public void setPreQuestionId(Integer preQuestionId) {
        this.preQuestionId = preQuestionId;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }
}
