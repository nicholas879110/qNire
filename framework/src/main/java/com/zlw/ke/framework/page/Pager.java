package com.zlw.ke.framework.page;

import java.util.Collections;
import java.util.List;

/**
 * 分页对象
 *
 * @author ChengJianLong
 */
public class Pager<T> {
    /**
     * 过滤前总记录数
     * Number of records in the data set, not accounting for filtering
     */
    private long iTotalRecords;
    /**
     * 过滤后总记录数
     * Number of records in the data set, accounting for filtering
     */
    private long iTotalDisplayRecords;
    /**
     * dataTables匹配请求的跟踪标志（页面传过来的，原样返回）
     * Tracking flag for DataTables to match requests
     */
    private int sEcho;
    /**
     * 数据
     * The data to display on this page
     */
    private List<T> aaData = Collections.emptyList();

    /**
     * 分页查询结果对象构造方法
     */
    public Pager() {}

    /**
     * 分页查询结果对象构造方法
     *
     * @param pagerQuery 分页参数
     */
    public Pager(PagerQuery pagerQuery) {
        this.sEcho = pagerQuery.getsEcho();
    }

    /**
     * 分页查询结果对象构造方法
     *
     * @param pagerQuery 分页参数
     * @param iTotalRecords 总记录数
     */
    public Pager(PagerQuery pagerQuery, long iTotalRecords) {
        this.sEcho = pagerQuery.getsEcho();
        this.iTotalRecords = iTotalRecords;
        this.iTotalDisplayRecords = iTotalRecords;
    }

    /**
     * 分页查询结果对象构造方法
     *
     * @param pagerQuery 分页参数
     * @param iTotalRecords 总记录数
     * @param aaData 查询结果数据
     */
    public Pager(PagerQuery pagerQuery, long iTotalRecords, List<T> aaData) {
        this.sEcho = pagerQuery.getsEcho();
        this.iTotalRecords = iTotalRecords;
        this.iTotalDisplayRecords = iTotalRecords;
        if (aaData!=null)
            this.aaData = aaData;
    }

    /**
     * 装载查询结果数据
     *
     * @param iTotalRecords 总记录数
     * @param aaData 查询结果数据
     */
    public void setupResult(long iTotalRecords, List<T> aaData) {
        this.iTotalRecords = iTotalRecords;
        this.iTotalDisplayRecords = iTotalRecords;
        if (aaData!=null)
            this.aaData = aaData;
    }

    public long getiTotalRecords() {
        return iTotalRecords;
    }

    public void setiTotalRecords(long iTotalRecords) {
        this.iTotalRecords = iTotalRecords;
    }

    public long getiTotalDisplayRecords() {
        return iTotalDisplayRecords;
    }

    public void setiTotalDisplayRecords(long iTotalDisplayRecords) {
        this.iTotalDisplayRecords = iTotalDisplayRecords;
    }

    public int getsEcho() {
        return sEcho;
    }

    public void setsEcho(int sEcho) {
        this.sEcho = sEcho;
    }

    public List<T> getAaData() {
        return aaData;
    }

    public void setAaData(List<T> aaData) {
        this.aaData = aaData;
    }
}
