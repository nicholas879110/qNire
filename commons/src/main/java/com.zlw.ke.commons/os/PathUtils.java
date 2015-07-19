package com.zlw.ke.commons.os;

/**
 * 文件路径处理工具类
 *
 * @author Zero
 */
public class PathUtils {
    // 路径分隔符
    public static String separator = "/";

    // 后缀符号
    public static String extsep = ".";

    /**
     * 将指定的多个路径组合成一个完整的路径<br> 注：<br> 1、当listPath参数中存在绝对路径
     * 时（即：以路径分隔符开头如"/abc"），将<br> 丢弃已经组装的路径，从绝对路径分隔符位置重新组装；<br>
     * 2、当listPath参数列表的最后个值为空字符串时""，整个路径将以路径分隔符结尾
     *
     * @param basePath 起始根路径
     * @param listPath 路径列表
     * @return
     */
    public static String join(String basePath, String[] listPath) {
        if (null == listPath || null == basePath) {
            throw new NullPointerException("basePath或listPath对象为null");
        }
        if (listPath.length == 0) {
            return basePath;
        }

        StringBuilder buf = new StringBuilder();
        buf.append(separatorConvert(basePath));
        for (String s : listPath) {
            s = separatorConvert(s);
            if (s.startsWith(separator)) {
                buf.delete(0, buf.length());
                buf.append(s);
            } else if (buf.toString().endsWith(separator)) {
                buf.append(s);
            } else {
                buf.append(separator);
                buf.append(s);
            }
        }

        return buf.toString();

    }

    /**
     * 分隔文件路径、文件名、文件后缀<br> 当filePath包含路径时,如:/home/path/test.txt分隔
     * 后的结果为["/home/path/", "test", * ".txt"]<br>
     * 当filePath为文件名时,如:test.txt分隔后的结果为["", "test", ".txt"]
     *
     * @param filePath 文件路径或文件名
     * @return <br> String[0]:文件路径 <br> String[1]:文件名<br> String[2]:文件后缀
     */
    public static String[] splitext(String filePath) {
        if (null == filePath) {
            throw new NullPointerException("filePath值为null");
        }

        filePath = separatorConvert(filePath);
        int lastSepIndex = filePath.lastIndexOf(separator);
        String fileDirPath = "";
        String extsepName = "";
        String fileName = filePath;

        if (lastSepIndex >= 0) {
            fileDirPath = filePath.substring(0, lastSepIndex + 1);
            fileName = filePath.substring(lastSepIndex + 1, filePath.length());
        }

        if (fileName.lastIndexOf(extsep) > 0) {
            fileName = fileName.substring(0, fileName.lastIndexOf(extsep));
            extsepName = filePath.substring(filePath.lastIndexOf(extsep), filePath.length());
        }

        return new String[]{fileDirPath, fileName, extsepName};
    }

    /**
     * 路径分隔符转换，将以"\"为分隔符的路径转换为"/"
     *
     * @param path 路径
     * @return
     */
    public static String separatorConvert(String path) {
        if (null == path) {
            throw new NullPointerException("path值为null");
        }
        return path.replaceAll("\\\\", separator);
    }
}
