package com.zlw.qn.framework.page;

import java.util.Collections;
import java.util.List;

/**
 * 前台分页对象
 *
 * @author ChengJianLong
 */
public class FrontPager<T> {
    /**
     * 数据
     */
    private List<T> aaData = Collections.emptyList();

    /**
     * 前台分页查询结果对象构造方法
     */
    public FrontPager() {}

    /**
     * 前台分页查询结果对象构造方法
     *
     * @param aaData 查询结果数据
     */
    public FrontPager(List<T> aaData) {
        if (aaData!=null)
            this.aaData = aaData;
    }

    public List<T> getAaData() {
        return aaData;
    }

    public void setAaData(List<T> aaData) {
        this.aaData = aaData;
    }
}
