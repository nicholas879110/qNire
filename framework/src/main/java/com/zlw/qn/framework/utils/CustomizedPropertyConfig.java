package com.zlw.qn.framework.utils;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * 获取配置文件值工具类
 *
 * @author hetao
 */
public class CustomizedPropertyConfig extends PropertyPlaceholderConfigurer {

    private static Map<String, Object> ctxPropertiesMap;

    /**
     * 设置文件编码为utf-8，解决读取中文时的编码问题.
     */
    public CustomizedPropertyConfig() {
        super.setFileEncoding("utf-8");
    }

    // static method for accessing context properties
    public static Object get(String name) {
        return ctxPropertiesMap.get(name);
    }

    @Override
    protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props)
            throws BeansException {
        super.processProperties(beanFactory, props);
        // load properties to ctxPropertiesMap
        ctxPropertiesMap = new HashMap<String, Object>();
        for (Object key : props.keySet()) {
            String keyStr = key.toString();
            String value = props.getProperty(keyStr);
            ctxPropertiesMap.put(keyStr, value);
        }
    }
}
