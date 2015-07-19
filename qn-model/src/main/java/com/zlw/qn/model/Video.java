package com.zlw.qn.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: Video <br>
 * Create DateTime: 14-11-15 下午3:16 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "video", catalog = "vote")
public class Video {

    @Id
    @GeneratedValue(generator = "generator")
    @GenericGenerator(name = "generator", strategy = "uuid")
    @Column(name = "ID", unique = true, nullable = false)
    private String id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "URL")
    private String url;//本地相对路径

    @Column(name = "FISRT_FRAME")
    private String firstFrame;//视频截图地址

    @ManyToOne
    @JoinColumn(name = "UNIT_ID")
    private Unit unit;

    @Column(name = "EN")
    private String en;

    @Column(name = "CH")
    private String ch;

    @Column(name = "IS_LONG")
    private Byte  isLong;

    @ManyToOne
    @JoinColumn(name = "CREATE_USER_ID")
    private SysUser createUser;

    @Column(name = "createTime")
    private Date createTime;

    @Column(name = "LENGTH")
    private Long length;


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

    public Byte getIsLong() {
        return isLong;
    }

    public void setIsLong(Byte isLong) {
        this.isLong = isLong;
    }

    public SysUser getCreateUser() {
        return createUser;
    }

    public void setCreateUser(SysUser createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }
}
