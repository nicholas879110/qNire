package com.zlw.ke.framework.page;

import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;

/**
 * 查询对象
 *
 * @author ChengJianLong
 */
public class PagerQuery {
    /**
     * 当前起始记录数
     */
    private int iDisplayStart = 0;
    /**
     * 每一页显示条数
     */
    private int iDisplayLength = 10;
    /**
     * dataTables匹配请求的跟踪标志
     */
    private int sEcho;
    /**
     * table列数量
     */
    private int iColumns;
    /**
     * 排序列数据库字段名称字符串，用逗号分隔
     * 例如：
     * table有4列“A,B,C,D”，其中第二列设置sName为testB，那么当前字符串即为“,testB,,”
     * 如果全部列都设置了sName，则当前字符串为“testA,testB,testC,testD”
     */
    private String sColumns;
    /**
     * 排序列数量
     */
    private int iSortingCols;
    /**
     * 当前排序列INDEX
     */
    private Integer iSortCol_0;
    /**
     * 当前排序列排序规则 asc|desc
     */
    private String sSortDir_0;

    public int getiDisplayStart() {
        return iDisplayStart;
    }

    public void setiDisplayStart(int iDisplayStart) {
        this.iDisplayStart = iDisplayStart;
    }

    public int getiDisplayLength() {
        return iDisplayLength;
    }

    public void setiDisplayLength(int iDisplayLength) {
        this.iDisplayLength = iDisplayLength;
    }

    public int getsEcho() {
        return sEcho;
    }

    public void setsEcho(int sEcho) {
        this.sEcho = sEcho;
    }

    public int getiColumns() {
        return iColumns;
    }

    public void setiColumns(int iColumns) {
        this.iColumns = iColumns;
    }

    public String getsColumns() {
        return sColumns;
    }

    public void setsColumns(String sColumns) {
        this.sColumns = sColumns;
    }

    public int getiSortingCols() {
        return iSortingCols;
    }

    public void setiSortingCols(int iSortingCols) {
        this.iSortingCols = iSortingCols;
    }

    public int getSortColIndex() {
        return this.iSortCol_0;
    }

    public void setiSortCol_0(Integer iSortCol_0) {
        this.iSortCol_0 = iSortCol_0;
    }

    public String getSortColDir() {
        return this.sSortDir_0;
    }

    public void setsSortDir_0(String sSortDir_0) {
        this.sSortDir_0 = sSortDir_0;
    }



    /**
     * 查询时前端封装后的显示对象
     */
    private Class domainClass;

    /**
     * 设置查询结果投影，要求必须设置投影，查询业务需要的字段，从而提高效率。
     *
     * @return
     */
    public ProjectionList projectionList(){
        return null;
    }

    /**
     * 设置前端显示的类，用于查询时将投影转换为该类型，如果返回null，则会映射到原始后台model.
     * <p/>
     * eg.
     * <blockquote>
     * criteria.setResultTransformer(Transformers.aliasToBean(bean));
     * </blockquote>
     *
     * @return 前端显示的domain对象
     * @see org.hibernate.Criteria#setResultTransformer(org.hibernate.transform.ResultTransformer)
     */
    public  Class getDomainClass(){
        return null;
    }

    /**
     * 获取自身查询逻辑的criteria对象
     *
     * @param initializedCriteria 初始化的查询对象，未带任何逻辑
     * @return 待查询逻辑的对象
     */
    public Criteria queryBusiness(Criteria initializedCriteria){
        return null;
    }
}
