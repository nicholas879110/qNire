package com.zlw.qn.mgr.domain;

/**
 * Created by YT on 2015/7/19.
 */
public class Tag {
    private int id;
    private String tagName;
    private String tagImgPath;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getTagImgPath() {
        return tagImgPath;
    }

    public void setTagImgPath(String tagImgPath) {
        this.tagImgPath = tagImgPath;
    }
}
