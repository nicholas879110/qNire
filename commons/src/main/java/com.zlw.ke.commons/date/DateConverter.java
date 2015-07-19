package com.zlw.ke.commons.date;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 请求参数日期字符串转换为日期类的全局处理类
 *
 * @author Zero
 */
public class DateConverter implements Converter<String, Date> {

    private static final Logger L = LoggerFactory.getLogger(DateConverter.class);

    @Override
    public Date convert(String s) {
        if (StringUtils.isBlank(s))
            return null;

        SimpleDateFormat dateFormat;
        //不存在":"冒号，表示只有年月日
        if (!s.contains(":"))
            dateFormat = new SimpleDateFormat(DateFormatEnum.YYYY_MM_DD.getValue());
        else
            dateFormat = new SimpleDateFormat(DateFormatEnum.YYYY_MM_DD_HH_MM_SS.getValue());

        try {
            return dateFormat.parse(s);
        } catch (ParseException e) {
            L.error("将日期字符串转换为日期对象失败", e);
        }
        return null;
    }
}
