package com.zlw.ke.video.domain;

import com.zlw.ke.model.Unit;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: VideoDomain <br>
 * Create DateTime: 14-11-15 下午4:05 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class VideoDomain {

    private String id;
    private String name;
    private String url;//本地相对路径
    private String firstFrame;//视频截图地址
    private Unit unit;
    private String en;
    private String ch;
    private String unitId;
    private Integer playOrder;//播放顺序
    private Integer next;
    private Long length;


    public VideoDomain() {
    }

    public VideoDomain(String name) {
        this.name = name;
    }

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFirstFrame() {
        return firstFrame;
    }

    public void setFirstFrame(String firstFrame) {
        this.firstFrame = firstFrame;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public String getEn() {
        return en;
    }

    public void setEn(String en) {
        this.en = en;
    }

    public String getCh() {
        return ch;
    }

    public void setCh(String ch) {
        this.ch = ch;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public Integer getPlayOrder() {
        return playOrder;
    }

    public void setPlayOrder(Integer playOrder) {
        this.playOrder = playOrder;
    }

    public Integer getNext() {
        return next;
    }

    public void setNext(Integer next) {
        this.next = next;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }
}
