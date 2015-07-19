package com.zlw.ke.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: Video <br>
 * Create DateTime: 14-11-15 下午3:16 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "video", catalog = "ke")
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
    private String fisrtFrame;
    private String unitId;
    private String createUserId;
    private SysUser sysUserByCreateUserId;
    private Unit unitByUnitId;

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Id
    @Column(name = "ID", nullable = false, insertable = true, updatable = true, length = 255, precision = 0)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "NAME", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "URL", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
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

    @Basic
    @Column(name = "EN", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getEn() {
        return en;
    }

    public void setEn(String en) {
        this.en = en;
    }

    @Basic
    @Column(name = "CH", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getCh() {
        return ch;
    }

    public void setCh(String ch) {
        this.ch = ch;
    }

    @Basic
    @Column(name = "IS_LONG", nullable = true, insertable = true, updatable = true, length = 3, precision = 0)
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

    @Basic
    @Column(name = "createTime", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "LENGTH", nullable = true, insertable = true, updatable = true, length = 19, precision = 0)
    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    @Basic
    @Column(name = "FISRT_FRAME", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getFisrtFrame() {
        return fisrtFrame;
    }

    public void setFisrtFrame(String fisrtFrame) {
        this.fisrtFrame = fisrtFrame;
    }

    @Basic
    @Column(name = "UNIT_ID", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    @Basic
    @Column(name = "CREATE_USER_ID", nullable = true, insertable = true, updatable = true, length = 255, precision = 0)
    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Video video = (Video) o;

        if (ch != null ? !ch.equals(video.ch) : video.ch != null) return false;
        if (createTime != null ? !createTime.equals(video.createTime) : video.createTime != null) return false;
        if (createUserId != null ? !createUserId.equals(video.createUserId) : video.createUserId != null) return false;
        if (en != null ? !en.equals(video.en) : video.en != null) return false;
        if (fisrtFrame != null ? !fisrtFrame.equals(video.fisrtFrame) : video.fisrtFrame != null) return false;
        if (id != null ? !id.equals(video.id) : video.id != null) return false;
        if (isLong != null ? !isLong.equals(video.isLong) : video.isLong != null) return false;
        if (length != null ? !length.equals(video.length) : video.length != null) return false;
        if (name != null ? !name.equals(video.name) : video.name != null) return false;
        if (unitId != null ? !unitId.equals(video.unitId) : video.unitId != null) return false;
        if (url != null ? !url.equals(video.url) : video.url != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (ch != null ? ch.hashCode() : 0);
        result = 31 * result + (en != null ? en.hashCode() : 0);
        result = 31 * result + (fisrtFrame != null ? fisrtFrame.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (url != null ? url.hashCode() : 0);
        result = 31 * result + (unitId != null ? unitId.hashCode() : 0);
        result = 31 * result + (isLong != null ? isLong.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        result = 31 * result + (createUserId != null ? createUserId.hashCode() : 0);
        result = 31 * result + (length != null ? length.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "CREATE_USER_ID", referencedColumnName = "ID")
    public SysUser getSysUserByCreateUserId() {
        return sysUserByCreateUserId;
    }

    public void setSysUserByCreateUserId(SysUser sysUserByCreateUserId) {
        this.sysUserByCreateUserId = sysUserByCreateUserId;
    }

    @ManyToOne
    @JoinColumn(name = "UNIT_ID", referencedColumnName = "ID")
    public Unit getUnitByUnitId() {
        return unitByUnitId;
    }

    public void setUnitByUnitId(Unit unitByUnitId) {
        this.unitByUnitId = unitByUnitId;
    }
}
