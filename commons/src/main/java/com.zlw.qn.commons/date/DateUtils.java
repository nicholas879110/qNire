package com.zlw.qn.commons.date;

import org.apache.commons.lang.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期处理工具类
 *
 * @author Zero
 */
public class DateUtils {

    /**
     * 将日期类型转换为指格式的字符串类型
     *
     * @param date 日期对象
     * @param formatEnum 格式化枚举对象
     *
     * @return 格式化后的字符串日期
     */
    public static String dateToString(Date date, DateFormatEnum formatEnum) {
        if (null == formatEnum) {
            throw new NullPointerException("formatEnum值不能为Null");
        }
        if(null == date){

            return "";
        }
        return dateToString(date, formatEnum.getValue());
    }

    /**
     * 将日期类型转换为指定格式的字符串类型
     *
     * @param date 日期对象
     * @param format 格式化字符串
     *
     * @return 格式化后的字符串日期
     */
    public static String dateToString(Date date, String format) {
        if (null == date || StringUtils.isEmpty(format)) {
            throw new NullPointerException("date值对象或format值不能为Null");
        }
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.format(date);
    }

    /**
     * 将日期字符串根据指定的格式转换为日期对象
     *
     * @param date 日期字符串
     * @param formatEnum 格式化枚举对象
     *
     * @return 格式化后的日期对象
     *
     * @throws java.text.ParseException 抛出转换失败的异常
     */
    public static Date stringToDate(String date, DateFormatEnum formatEnum) throws ParseException {
        if (null == formatEnum) {
            throw new NullPointerException("formatEnum值不能为null");
        }
        return stringToDate(date, formatEnum.getValue());
    }

    /**
     * 将日期字符串根据指定的格式转换为日期对象
     *
     * @param date 日期字符串
     * @param format 格式化字符串
     *
     * @return 格式化后的日期对象
     *
     * @throws java.text.ParseException 抛出转换失败的异常
     */
    public static Date stringToDate(String date, String format) throws ParseException {
        if (null == date || StringUtils.isEmpty(format)) {
            throw new NullPointerException("date值或format值不能为Null");
        }

        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.parse(date);
    }

    /**
     * 比较两个日期相差多少天，单位（天）
     * @param startDate 开始时间
     * @param endDate 结束时间
     */
    public static int compareDay(Date startDate, Date endDate){
        Calendar small = Calendar.getInstance();
        small.setTime(startDate);
        Calendar big = Calendar.getInstance();
        big.setTime(endDate);

        small.set(Calendar.HOUR_OF_DAY,0);
        small.set(Calendar.MINUTE,0);
        small.set(Calendar.SECOND,0);
        small.set(Calendar.MILLISECOND,0);

        big.set(Calendar.HOUR_OF_DAY,0);
        big.set(Calendar.MINUTE,0);
        big.set(Calendar.SECOND,0);
        big.set(Calendar.MILLISECOND,0);

        Long smallMills = small.getTimeInMillis();
        Long bigMills = big.getTimeInMillis();

        int days = (int)((bigMills-smallMills)/24/3600/1000);

        return days;
    }

}
