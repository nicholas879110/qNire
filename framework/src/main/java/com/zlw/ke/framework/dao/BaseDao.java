package com.zlw.ke.framework.dao;


import com.zlw.ke.commons.collections.CollectionUtils;
import com.zlw.ke.framework.consts.BaseSystemConst;
import com.zlw.ke.framework.page.Pager;
import com.zlw.ke.framework.page.PagerQuery;
import org.hibernate.*;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.hql.internal.ast.QueryTranslatorImpl;
import org.hibernate.jdbc.ReturningWork;
import org.hibernate.jdbc.Work;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * 基础DAO实现
 *
 * @author ChengJianLong
 */
@Repository
public class BaseDao {
    @Autowired
    private SessionFactory sessionFactory;

    /**
     * 获取session
     *
     * @return session
     */
    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    /**
     * 获取Query
     *
     * @param hql hql
     *
     * @return Query
     */
    public Query getQuery(String hql) {
        return this.getSession().createQuery(hql);
    }

    /**
     * 获取SQLQuery
     *
     * @param sql sql
     *
     * @return SQLQuery
     */
    public SQLQuery getSQLQuery(String sql) {
        return this.getSession().createSQLQuery(sql);
    }

    /**
     * 获取Criteria
     *
     * @param entityClass 泛型类
     * @param <T> 对象类型
     *
     * @return Criteria
     */
    public <T> Criteria getCriteria(Class<T> entityClass) {
        return this.getSession().createCriteria(entityClass);
    }

    /**
     * 获取Criteria
     *
     * @param entityClass 泛型类
     * @param aliasName 别名
     * @param <T> 对象类型
     *
     * @return Criteria
     */
    public <T> Criteria getCriteria(Class<T> entityClass, String aliasName) {
        return this.getSession().createCriteria(entityClass, aliasName);
    }

    /**
     * 查询全部列表
     *
     * @param entityClass 泛型类
     * @param <T> 列表类型
     *
     * @return 查询结果列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> list(Class<T> entityClass) {
        return this.getCriteria(entityClass).list();
    }

    /**
     * 查询相应列表
     *
     * @param criteria Criteria对象
     * @param <T> 列表类型
     *
     * @return 查询结果列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> list(Criteria criteria) {
        return criteria.list();
    }

    /**
     * 获取单个对象
     *
     * @param entityClass 泛型类
     * @param id 主键ID
     * @param <T> 对象类型
     *
     * @return 泛型对象
     */
    @SuppressWarnings("unchecked")
    public <T> T get(Class<T> entityClass, Serializable id) {
        return (T) this.getSession().get(entityClass, id);
    }

    /**
     * 获取单个对象
     *
     * @param entityClass 泛型类
     * @param id 主键ID
     * @param <T> 对象类型
     *
     * @return 泛型对象
     */
    @SuppressWarnings("unchecked")
    public <T> T load(Class<T> entityClass, Serializable id) {
        return (T) this.getSession().load(entityClass, id);
    }

    /**
     * 根据主键ID数组查询列表
     *
     * @param entityClass 实体类
     * @param ids 主键ID数组
     * @param <T> 列表类型
     *
     * @return 查询列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> list(Class<T> entityClass, Serializable[] ids) {
        Criteria criteria = this.getCriteria(entityClass);
        criteria.add(Restrictions.in("id", ids)).addOrder(Order.asc("id"));
        return criteria.list();
    }

    /**
     * 删除一个对象
     *
     * @param entityClass 泛型类
     * @param id 主键ID
     * @param <T> 对象类型
     */
    public <T> void delete(Class<T> entityClass, Serializable id) {
        T t = get(entityClass, id);
        if (t != null) {
            this.getSession().delete(t);
        }
    }

    /**
     * 删除一个对象
     *
     * @param object 对象
     */
    public void delete(Object object) {
        this.getSession().delete(object);
    }

    /**
     * 删除对象列表
     *
     * @param entities 泛型类对象列表
     * @param <T> 集合类型
     */
    public <T> void deleteAll(Collection<T> entities) {
        for (T t : entities) {
            this.delete(t);
        }
    }

    /**
     * 批量删除对象
     *
     * @param entityClass 泛型类
     * @param ids 主键ID数组
     * @param <T> 对象类型
     */
    public <T> void deleteAll(Class<T> entityClass, Serializable[] ids) {
        for (Serializable id : ids) {
            this.delete(entityClass, id);
        }
    }

    /**
     * 保存对象
     *
     * @param object 对象
     */
    public Serializable save(Object object) {
        return this.getSession().save(object);
    }

    /**
     * 修改对象
     *
     * @param object 对象
     */
    public void update(Object object) {
        this.getSession().update(object);
    }

    /**
     * 添加对象,对象存在则修改对象
     *
     * @param object 对象
     */
    public void saveOrUpdate(Object object) {
        this.getSession().saveOrUpdate(object);
    }

    /**
     * 通过语句执行操作
     *
     * @param hql 操作语句
     * @param isHql 是否是HQL，true：是，false：否
     * @param params 操作参数
     */
    public void executeUpdate(String hql, boolean isHql, Object... params) {
        Query query = null;
        if (isHql) {
            query = this.getQuery(hql);
        } else {
            query = this.getSQLQuery(hql);
        }

        this.setParameters(query, params);
        query.executeUpdate();
    }

    /**
     * 通过语句执行操作
     *
     * @param hql 操作语句
     * @param isHql 是否是HQL，true：是，false：否
     * @param params 操作参数
     */
    public void executeUpdate(String hql, boolean isHql, List<Object> params) {
        Query query = null;
        if (isHql) {
            query = this.getQuery(hql);
        } else {
            query = this.getSQLQuery(hql);
        }
        this.setParameters(query, params);
        query.executeUpdate();
    }

    /**
     * 查询唯一对象
     *
     * @param hql HQL查询语句
     * @param params 查询条件
     * @param <T> 对象类型
     *
     * @return 查询对象
     */
    public <T> T getUniqueResultByHql(String hql, Object... params) {
        return this.getUniqueResultByHql(hql, null, params);
    }

    /**
     * 查询唯一对象，适用于自定义查询字段的情况
     *
     * @param hql HQL查询语句
     * @param bean 自定义查询字段对应实体
     * @param params 查询条件
     * @param <T> 对象类型
     *
     * @return 查询对象
     */
    @SuppressWarnings("unchecked")
    public <T> T getUniqueResultByHql(String hql, Class<T> bean, Object... params) {
        Query query = this.getQuery(hql);
        setParameters(query, params);
        if (null != bean) {
            query.setResultTransformer(Transformers.aliasToBean(bean));
        }
        return (T) query.uniqueResult();
    }

    /**
     * 查询唯一对象
     *
     * @param sql SQL查询语句
     * @param params 查询条件
     * @param <T> 泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，返回类型为Object，查询多个字段时，返回类型为Object[]
     *
     * @return 查询对象
     */
    public <T> T getUniqueResultBySql(String sql, Object... params) {
        return this.getUniqueResultBySql(sql, null, params);
    }

    /**
     * 查询唯一对象
     *
     * @param sql SQL查询语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param params 查询条件
     * @param <T> 对象类型
     *
     * @return 查询对象
     */
    @SuppressWarnings("unchecked")
    public <T> T getUniqueResultBySql(String sql, Class<T> entityClass, Object... params) {
        SQLQuery query = this.getSQLQuery(sql);
        this.setParameters(query, params);
        if (null != entityClass) {
            query.addEntity(entityClass);
        }
        return (T) query.uniqueResult();
    }

    /**
     * 查询唯一对象
     *
     * @param hql HQL查询语句
     * @param params 查询条件
     * @param <T> 对象类型
     *
     * @return 查询对象
     */
    public <T> T getUniqueResultByHql(String hql, List<Object> params) {
        return this.getUniqueResultByHql(hql, null, params);
    }

    /**
     * 查询唯一对象，适用于自定义查询字段的情况
     *
     * @param hql HQL查询语句
     * @param bean 自定义查询字段对应实体
     * @param params 查询条件
     * @param <T> 对象类型
     *
     * @return 查询对象
     */
    @SuppressWarnings("unchecked")
    public <T> T getUniqueResultByHql(String hql, Class<T> bean, List<Object> params) {
        Query query = this.getQuery(hql);
        setParameters(query, params);
        if (null != bean) {
            query.setResultTransformer(Transformers.aliasToBean(bean));
        }
        return (T) query.uniqueResult();
    }

    /**
     * 查询唯一对象
     *
     * @param sql SQL查询语句
     * @param params 查询条件
     * @param <T> 泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，返回类型为Object，查询多个字段时，返回类型为Object[]
     *
     * @return 查询对象
     */
    public <T> T getUniqueResultBySql(String sql, List<Object> params) {
        return this.getUniqueResultBySql(sql, null, params);
    }

    /**
     * 查询唯一对象
     *
     * @param sql SQL查询语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param params 查询条件
     * @param <T> 对象类型
     *
     * @return 查询对象
     */
    @SuppressWarnings("unchecked")
    public <T> T getUniqueResultBySql(String sql, Class<T> entityClass, List<Object> params) {
        SQLQuery query = this.getSQLQuery(sql);
        this.setParameters(query, params);
        if (null != entityClass) {
            query.addEntity(entityClass);
        }
        return (T) query.uniqueResult();
    }

    /**
     * 根据Criteria对象查询单条数据
     *
     * @param criteria Criteria对象
     * @param projectionList 数据实体投映转换对象
     * @param cls 查询结果转换实体
     * @param <T> 泛型对象
     *
     * @return 泛型对象
     */
    @SuppressWarnings("unchecked")
    public <T> T getUniqueResult(Criteria criteria, Class<T> cls, ProjectionList projectionList) {
        if (null != projectionList) {
            criteria.setProjection(projectionList);
        }
        if (null != cls) {
            criteria.setResultTransformer(Transformers.aliasToBean(cls));
        }
        return (T) criteria.uniqueResult();
    }

    /**
     * 根据Criteria对象查询单条数据
     *
     * @param criteria Criteria对象
     * @param <T> 泛型对象
     *
     * @return 泛型对象
     */
    @SuppressWarnings("unchecked")
    public <T> T getUniqueResult(Criteria criteria) {
        return (T) criteria.uniqueResult();
    }

    /**
     * 根据Hql语句和参数条件查询对应的记录列表
     *
     * @param hql hql语句
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 泛型对象列表
     */
    public <T> List<T> listHql(String hql, Object... params) {
        return this.listHql(hql, null, params);
    }

    /**
     * 根据Hql语句和参数条件查询对应的记录列表，适用于自定义查询字段的情况
     *
     * @param hql hql语句
     * @param bean 自定义查询字段对应实体
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 泛型对象列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> listHql(String hql, Class<T> bean, Object... params) {
        Query query = this.getQuery(hql);
        setParameters(query, params);
        if (null != bean) {
            query.setResultTransformer(Transformers.aliasToBean(bean));
        }
        return query.list();
    }

    /**
     * 根据Hql语句和参数条件查询对应的记录列表
     *
     * @param hql hql语句
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 泛型对象列表
     */
    public <T> List<T> listHql(String hql, List<Object> params) {
        return this.listHql(hql, null, params);
    }

    /**
     * 根据Hql语句和参数条件查询对应的记录列表，适用于自定义查询字段的情况
     *
     * @param hql hql语句
     * @param bean 自定义查询字段对应实体
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 泛型对象列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> listHql(String hql, Class<T> bean, List<Object> params) {
        Query query = this.getQuery(hql);
        setParameters(query, params);
        if (null != bean) {
            query.setResultTransformer(Transformers.aliasToBean(bean));
        }
        return query.list();
    }

    /**
     * 根据Sql语句和参数条件查询对应的记录列表
     *
     * @param sql SQL语句
     * @param params 查询条件
     * @param <T> 列表泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，列表泛型为Object，查询多个字段时，列表泛型为Object[]
     *
     * @return 泛型对象列表
     */
    public <T> List<T> listSql(String sql, Object... params) {
        return this.listSql(sql, null, params);
    }

    /**
     * 根据Criteria对象查询所有数据，不分页
     *
     * @param criteria Criteria对象
     * @param projectionList 数据实体投映转换对象
     * @param cls 查询结果转换实体
     * @param <T> 泛型对象
     *
     * @return 泛型对象列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> listCriteria(Criteria criteria, ProjectionList projectionList, Class<T> cls) {
        if (null != projectionList) {
            criteria.setProjection(projectionList);
        }
        if (null != cls) {
            criteria.setResultTransformer(Transformers.aliasToBean(cls));
        }
        return criteria.list();
    }

    /**
     * 根据Sql语句和参数条件查询对应的记录列表
     *
     * @param sql SQL语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 泛型对象列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> listSql(String sql, Class<T> entityClass, Object... params) {
        SQLQuery query = this.getSQLQuery(sql);
        setParameters(query, params);
        if (null != entityClass) {
            query.addEntity(entityClass);
        }
        return query.list();
    }

    /**
     * 根据Sql语句和参数条件查询对应的记录列表
     *
     * @param sql SQL语句
     * @param params 查询条件
     * @param <T> 列表泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，列表泛型为Object，查询多个字段时，列表泛型为Object[]
     *
     * @return 泛型对象列表
     */
    public <T> List<T> listSql(String sql, List<Object> params) {
        return this.listSql(sql, null, params);
    }

    /**
     * 根据Sql语句和参数条件查询对应的记录列表
     *
     * @param sql SQL语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 泛型对象列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> listSql(String sql, Class<T> entityClass, List<Object> params) {
        SQLQuery query = this.getSQLQuery(sql);
        setParameters(query, params);
        if (null != entityClass) {
            query.addEntity(entityClass);
        }
        return query.list();
    }

    /**
     * 无分页根据criteria对象查询总数
     *
     * @param criteria 封装好的criteria对象
     *
     * @return 查询结果
     */
    public long findCount(Criteria criteria) {
        criteria.setFirstResult(0);
        return (Long) criteria.setProjection(Projections.rowCount()).uniqueResult();
    }

    /**
     * 将HQL语句转换成SQL语句
     *
     * @param hql hql
     *
     * @return 转换后的SQL语句
     */
    protected String hqlToSql(String hql) {
        QueryTranslatorImpl queryTranslator = new QueryTranslatorImpl(hql, hql, Collections.EMPTY_MAP, (SessionFactoryImplementor) sessionFactory);

        queryTranslator.compile(Collections.EMPTY_MAP, false);
        return queryTranslator.getSQLString();
    }

    /**
     * 设置查询参数
     *
     * @param query query对象
     * @param params 查询条件
     */
    public void setParameters(Query query, Object... params) {
        if (CollectionUtils.notNull(params)) {
            for (int i = 0; i < params.length; i++) {
                query.setParameter(i, params[i]);
            }
        }
    }

    /**
     * 设置查询参数
     *
     * @param query query对象
     * @param params 查询条件
     */
    public void setParameters(Query query, List<Object> params) {
        if (CollectionUtils.notNull(params)) {
            for (int i = 0; i < params.size(); i++) {
                query.setParameter(i, params.get(i));
            }
        }
    }

    /**
     * 获取当前查询的记录数
     *
     * @param hql 查询语句
     * @param isHql 是否是HQL, true：是，false：否
     * @param params 查询条件
     *
     * @return 查询结果
     */
    public long findCount(String hql, boolean isHql, Object... params) {
        StringBuilder builder = new StringBuilder();
        builder.append("select count(*) from (");
        if (isHql) {
            builder.append(hqlToSql(hql));
        } else {
            builder.append(hql);
        }
        String sql = builder.append(") totalModel").toString();
        SQLQuery query = this.getSQLQuery(sql);
        this.setParameters(query, params);
        BigInteger count = (BigInteger) query.uniqueResult();
        return count.longValue();
    }

    /**
     * 获取当前查询的记录数
     *
     * @param hql 查询语句
     * @param isHql 是否是HQL, true：是，false：否
     * @param params 查询条件
     *
     * @return 查询结果
     */
    public long findCount(String hql, boolean isHql, List<Object> params) {
        StringBuilder builder = new StringBuilder();
        builder.append("select count(*) from (");
        if (isHql) {
            builder.append(hqlToSql(hql));
        } else {
            builder.append(hql);
        }
        String sql = builder.append(") totalModel").toString();
        SQLQuery query = this.getSQLQuery(sql);
        this.setParameters(query, params);
        BigInteger count = (BigInteger) query.uniqueResult();
        return count.longValue();
    }

    /**
     * 分页获取符合条件的查询记录
     *
     * @param criteria 封装好的criteria对象
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param <T> 列表类型
     *
     * @return 分页查询结果列表
     */
    public <T> List<T> findPagerData(Criteria criteria, Integer beginNum, Integer showNum) {
        return this.findPagerData(null, null, criteria, beginNum, showNum);
    }

    /**
     * 分页获取符合条件的查询记录，适用于自定义查询字段的情况
     *
     * @param projectionList 查询字段投影对象
     * @param bean 查询字段对应实体
     * @param criteria 封装好的criteria对象
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param <T> 查询字段实体泛型
     *
     * @return 分页查询结果列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> findPagerData(ProjectionList projectionList, Class<T> bean, Criteria criteria, Integer beginNum, Integer showNum) {
        if (null != projectionList) {
            // 设置投影字段
            criteria.setProjection(projectionList);
        }
        if (null != bean) {
            // 设置投影字段映射对象
            criteria.setResultTransformer(Transformers.aliasToBean(bean));
        }
        criteria.setFirstResult(beginNum);
        criteria.setMaxResults(showNum);
        return criteria.list();
    }

    /**
     * 分页获取符合条件的查询记录
     *
     * @param hql hql语句
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 分页查询结果列表
     */
    public <T> List<T> findPagerDataByHql(String hql, Integer beginNum, Integer showNum, Object... params) {
        return this.findPagerDataByHql(hql, null, beginNum, showNum, params);
    }

    /**
     * 分页获取符合条件的查询记录，适用于自定义查询字段的情况
     *
     * @param hql hql语句
     * @param bean 自定义查询字段对应实体
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param <T> 查询字段实体泛型
     *
     * @return 分页查询结果列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> findPagerDataByHql(String hql, Class<T> bean, Integer beginNum, Integer showNum, Object... params) {
        Query query = this.getQuery(hql);
        if (null != bean) {
            query.setResultTransformer(Transformers.aliasToBean(bean));
        }
        // 开始获取数据的位置
        query.setFirstResult(beginNum);
        // 获取多少条记录
        query.setMaxResults(showNum);
        // 是否有查询条件
        this.setParameters(query, params);
        return query.list();
    }

    /**
     * 分页获取符合条件的查询记录
     *
     * @param sql sql语句
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param params 查询条件
     * @param <T> 列表泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，列表泛型为Object，查询多个字段时，列表泛型为Object[]
     *
     * @return 分页查询结果列表
     */
    public <T> List<T> findPagerDataBySql(String sql, Integer beginNum, Integer showNum, Object... params) {
        return this.findPagerDataBySql(sql, null, beginNum, showNum, params);
    }

    /**
     * 分页获取符合条件的查询记录
     *
     * @param sql sql语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 分页查询结果列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> findPagerDataBySql(String sql, Class<T> entityClass, Integer beginNum, Integer showNum, Object... params) {
        SQLQuery query = this.getSQLQuery(sql);
        // 开始获取数据的位置
        query.setFirstResult(beginNum);
        // 获取多少条记录
        query.setMaxResults(showNum);
        // 是否有查询条件
        this.setParameters(query, params);
        // 设置查询映射对象
        if (null != entityClass) {
            query.addEntity(entityClass);
        }
        return query.list();
    }

    /**
     * 分页获取符合条件的查询记录
     *
     * @param hql hql语句
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 分页查询结果列表
     */
    public <T> List<T> findPagerDataByHql(String hql, Integer beginNum, Integer showNum, List<Object> params) {
        return this.findPagerDataByHql(hql, null, beginNum, showNum, params);
    }

    /**
     * 分页获取符合条件的查询记录，适用于自定义查询字段的情况
     *
     * @param hql hql语句
     * @param bean 自定义查询字段对应实体
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param <T> 查询字段实体泛型
     *
     * @return 分页查询结果列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> findPagerDataByHql(String hql, Class<T> bean, Integer beginNum, Integer showNum, List<Object> params) {
        Query query = this.getQuery(hql);
        if (null != bean) {
            query.setResultTransformer(Transformers.aliasToBean(bean));
        }
        // 开始获取数据的位置
        query.setFirstResult(beginNum);
        // 获取多少条记录
        query.setMaxResults(showNum);
        // 是否有查询条件
        this.setParameters(query, params);
        return query.list();
    }

    /**
     * 分页获取符合条件的查询记录
     *
     * @param sql sql语句
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param params 查询条件
     * @param <T> 列表泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，列表泛型为Object，查询多个字段时，列表泛型为Object[]
     *
     * @return 分页查询结果列表
     */
    public <T> List<T> findPagerDataBySql(String sql, Integer beginNum, Integer showNum, List<Object> params) {
        return this.findPagerDataBySql(sql, null, beginNum, showNum, params);
    }

    /**
     * 分页获取符合条件的查询记录
     *
     * @param sql sql语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param beginNum 起始记录数
     * @param showNum 展示条数
     * @param params 查询条件
     * @param <T> 列表类型
     *
     * @return 分页查询结果列表
     */
    @SuppressWarnings("unchecked")
    public <T> List<T> findPagerDataBySql(String sql, Class<T> entityClass, Integer beginNum, Integer showNum, List<Object> params) {
        SQLQuery query = this.getSQLQuery(sql);
        // 开始获取数据的位置
        query.setFirstResult(beginNum);
        // 获取多少条记录
        query.setMaxResults(showNum);
        // 是否有查询条件
        this.setParameters(query, params);
        // 设置查询映射对象
        if (null != entityClass) {
            query.addEntity(entityClass);
        }
        return query.list();
    }

    /**
     * 通用分页查询
     *
     * @param projectionList 查询字段投影对象
     * @param bean 查询字段对应实体
     * @param criteria 封装好的criteria对象
     * @param pagerQuery 分页查询参数
     * @param <T> 查询对象类型
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerData(ProjectionList projectionList, Class<T> bean, Criteria criteria, PagerQuery pagerQuery) {
        // 查询总数
        long total = this.findCount(criteria);

        // 分页查询数据
        List<T> rows = this.findPagerData(projectionList, bean, criteria, pagerQuery.getiDisplayStart(), pagerQuery.getiDisplayLength());

        return new Pager<T>(pagerQuery, total, rows);
    }

    /**
     * 通用分页查询
     *
     * @param hql HQL语句
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询对象泛型
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataByHql(String hql, PagerQuery pagerQuery, List<Object> params) {
        return this.pagerDataByHql(hql, null, pagerQuery, params);
    }

    /**
     * 通用分页查询
     *
     * @param hql HQL语句
     * @param bean 自定义查询字段对应实体
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询字段实体泛型
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataByHql(String hql, Class<T> bean, PagerQuery pagerQuery, List<Object> params) {
        // 查询总数
        long total = this.findCount(hql, BaseSystemConst.IS_HQL, params);

        // 分页查询数据
        List<T> rows = this.findPagerDataByHql(hql, bean, pagerQuery.getiDisplayStart(), pagerQuery.getiDisplayLength(), params);

        return new Pager<T>(pagerQuery, total, rows);
    }

    /**
     * 通用分页查询
     *
     * @param hql HQL语句
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询对象泛型
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataByHql(String hql, PagerQuery pagerQuery, Object... params) {
        return this.pagerDataByHql(hql, null, pagerQuery, params);
    }

    /**
     * 通用分页查询
     *
     * @param hql HQL语句
     * @param bean 自定义查询字段对应实体
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询字段实体泛型
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataByHql(String hql, Class<T> bean, PagerQuery pagerQuery, Object... params) {
        // 查询总数
        long total = this.findCount(hql, BaseSystemConst.IS_HQL, params);

        // 分页查询数据
        List<T> rows = this.findPagerDataByHql(hql, bean, pagerQuery.getiDisplayStart(), pagerQuery.getiDisplayLength(), params);

        return new Pager<T>(pagerQuery, total, rows);
    }

    /**
     * 通用分页查询
     *
     * @param sql sql语句
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询数据泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，为Object，查询多个字段时，为Object[]
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataBySql(String sql, PagerQuery pagerQuery, List<Object> params) {
        return this.pagerDataBySql(sql, null, pagerQuery, params);
    }

    /**
     * 通用分页查询
     *
     * @param sql sql语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询对象泛型
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataBySql(String sql, Class<T> entityClass, PagerQuery pagerQuery, List<Object> params) {
        // 查询总数
        long total = this.findCount(sql, BaseSystemConst.IS_SQL, params);

        // 分页查询数据
        List<T> rows = this.findPagerDataBySql(sql, entityClass, pagerQuery.getiDisplayStart(), pagerQuery.getiDisplayLength(), params);

        return new Pager<T>(pagerQuery, total, rows);
    }

    /**
     * 通用分页查询
     *
     * @param sql sql语句
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询数据泛型，实际上只会有Object和Object[]两种结果，查询单个字段时，为Object，查询多个字段时，为Object[]
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataBySql(String sql, PagerQuery pagerQuery, Object... params) {
        return this.pagerDataBySql(sql, null, pagerQuery, params);
    }

    /**
     * 通用分页查询
     *
     * @param sql sql语句
     * @param entityClass 封装查询结果的实体对象<br>注：<br>1、entityClass必须为Hibernate实体类<br>2、entityClass必须被Hibernate初始化时扫描到
     * @param pagerQuery 分页查询参数
     * @param params 查询条件
     * @param <T> 查询对象泛型
     *
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataBySql(String sql, Class<T> entityClass, PagerQuery pagerQuery, Object... params) {
        // 查询总数
        long total = this.findCount(sql, BaseSystemConst.IS_SQL, params);

        // 分页查询数据
        List<T> rows = this.findPagerDataBySql(sql, entityClass, pagerQuery.getiDisplayStart(), pagerQuery.getiDisplayLength(), params);

        return new Pager<T>(pagerQuery, total, rows);
    }


    /**
     * 通用分页查询,查询结果映射为map
     *
     * @param projectionList 查询字段投影对象
     * @param criteria       封装好的criteria对象
     * @param query          分页查询参数
     * @param <T>            查询对象类型
     * @return 分页查询结果对象
     */
    public <T> Pager<T> pagerDataByMap(ProjectionList projectionList, Criteria criteria, PagerQuery query) {
        // 查询总数
        long total = this.findCount(criteria);
        // 分页查询数据
        List<T> rows = this.findPagerDataByMap(projectionList, criteria, query.getiDisplayStart(), query.getiDisplayLength());
        return new Pager<T>(query, total, rows);
    }


    /**
     * 分页获取符合条件的查询记录，将查询结果映射为MAP.
     *
     * @param projectionList 查询字段投影对象
     * @param criteria       封装好的criteria对象
     * @param beginNum       起始记录数
     * @param showNum        展示条数
     * @param <T>            查询字段实体泛型
     * @return 分页查询结果列表
     */
    @SuppressWarnings("all")
    public <T> List<T> findPagerDataByMap(ProjectionList projectionList, Criteria criteria, Integer beginNum, Integer showNum) {
        if (null != projectionList) {
            // 设置投影字段
            criteria.setProjection(projectionList);
        }
        criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        criteria.setFirstResult(beginNum);
        criteria.setMaxResults(showNum);
        return criteria.list();
    }

    /**
     * 设置投影查询字段
     *
     * @param propertyMap 字段Map<br></br>
     * Key：Hibernate数据模型字段，value：查询结果映射实体字段
     * @param projectionList ProjectionList对象
     *
     * @return ProjectionList对象
     */
    public ProjectionList setProjectionsProperty(Map<String, String> propertyMap, ProjectionList projectionList) {
        if (CollectionUtils.isNull(propertyMap)) {
            return projectionList;
        }
        for (Map.Entry<String, String> e : propertyMap.entrySet()) {
            projectionList.add(Projections.property(e.getKey()), e.getValue());
        }
        return projectionList;
    }

    /**
     * 调用存储过程
     *
     * @param work 原生JDBC存储过程执行对象
     */
    public void callProcedure(Work work) {
        this.getSession().doWork(work);
    }

    /**
     * 调用存储过程（带返回值）
     *
     * @param returningWork 带返回值的原生JDBC存储过程执行对象
     * @param <T> 返回值泛型
     *
     * @return 存储过程返回结果
     */
    public <T> T callProcedureWithResult(ReturningWork<T> returningWork) {
        return this.getSession().doReturningWork(returningWork);
    }
}
