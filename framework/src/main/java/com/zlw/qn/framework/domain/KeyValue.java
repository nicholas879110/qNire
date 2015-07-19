package com.zlw.qn.framework.domain;

/**
 * Key Value对象
 *
 * @author ChengJianLong
 */
public class KeyValue<T, K> {
    private T key;
    private K value;

    public KeyValue() {}

    public KeyValue(T key, K value) {
        this.key = key;
        this.value = value;
    }

    public T getKey() {
        return key;
    }

    public void setKey(T key) {
        this.key = key;
    }

    public K getValue() {
        return value;
    }

    public void setValue(K value) {
        this.value = value;
    }
}
