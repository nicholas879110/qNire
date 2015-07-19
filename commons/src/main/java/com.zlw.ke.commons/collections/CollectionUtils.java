package com.zlw.ke.commons.collections;

import java.util.Collection;
import java.util.Map;

/**
 * 集合工具类
 *
 * @author ChengJianLong
 */
public class CollectionUtils extends org.apache.commons.collections.CollectionUtils {
    /**
     * 集合是否为空
     *
     * @param collection 集合
     * @param <T> 集合类型
     *
     * @return true:为空;false:不为空
     */
    public static <T> boolean isNull(Collection<T> collection) {
        return null == collection || collection.isEmpty();
    }

    /**
     * 集合是否为不为空
     *
     * @param collection 集合
     * @param <T> 集合类型
     *
     * @return true:不为空;false:为空
     */
    public static <T> boolean notNull(Collection<T> collection) {
        return !isNull(collection);
    }

    /**
     * Map是否为空
     *
     * @param map map
     * @param <T> key类型
     * @param <O> value类型
     *
     * @return true:为空;false:不为空
     */
    public static <T, O> boolean isNull(Map<T, O> map) {
        return null == map || map.isEmpty();
    }

    /**
     * Map是否为不为空
     *
     * @param map map
     * @param <T> key类型
     * @param <O> value类型
     *
     * @return true:不为空;false:为空
     */
    public static <T, O> boolean notNull(Map<T, O> map) {
        return !isNull(map);
    }

    /**
     * 数组是否为空
     *
     * @param array 数组
     * @param <T> 数组类型
     *
     * @return true:为空;false:不为空
     */
    public static <T> boolean isNull(T[] array) {
        return null == array || array.length == 0;
    }

    /**
     * 数组是否为不为空
     *
     * @param array 数组
     * @param <T> 数组类型
     *
     * @return true:不为空;false:为空
     */
    public static <T> boolean notNull(T[] array) {
        return !isNull(array);
    }

    /**
     * 集合长度是否相等(任意集合为空返回false), 比较长度的集合可以为不同的实体集合
     *
     * @param collection1 集合1
     * @param collection2 集合2
     *
     * @return true:相等;false:不等
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    public static boolean sizeEqual(Collection collection1, Collection collection2) {
        if (null == collection1 || null == collection2) {
            throw new NullPointerException("参数不能为Null！");
        }
        return collection1.size() == collection2.size();
    }
}
