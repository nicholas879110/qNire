//package com.zlw.ke.commons.excel.utils;
//
//import java.util.List;
//import java.util.Map;
//
//import com.zlw.ke.commons.excel.ExcelConstants;
//import org.apache.commons.lang.StringUtils;
//import org.apache.poi.hssf.usermodel.HSSFCell;
//import org.apache.poi.hssf.usermodel.HSSFCellStyle;
//import org.apache.poi.hssf.usermodel.HSSFRow;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.hssf.util.HSSFColor;
//
//
///**
// * POI操作excel工具类
// * @author zlw
// * @date 2014-10-14
// * @version 1.0
// */
//public class POIExcelUtil {
//
//    /**
//     * 创建了一个excel文件
//     *
//     * @return
//     */
//    public static HSSFWorkbook createWorkbook() {
//        return new HSSFWorkbook();
//    }
//
//    /**
//     * 创建一个excel sheet
//     *
//     * @param sheetName
//     *            sheet名字，若为空则默认为‘sheet1’
//     * @return
//     */
//    public static HSSFSheet createSheet(HSSFWorkbook workbook, String sheetName) {
//        if (StringUtils.isBlank(sheetName)) {
//            sheetName = ExcelConstants.DEFAUT_SHEET_NAME;
//        }
//        return workbook.createSheet(sheetName);
//    }
//
//    /**
//     * 设置表头
//     *
//     * @param workbook
//     *            工作簿对象
//     * @param sheet
//     *            工作表
//     * @param titles
//     *            表头名称
//     * @param cellStyle
//     *            表格样式,，不需要添加样式，设置为null
//     */
//    public static void setHeader(HSSFWorkbook workbook, HSSFSheet sheet, String[] titles, HSSFCellStyle cellStyle) {
//        // 默认设置表头为第一行
//        HSSFRow titleRow = sheet.createRow(ExcelConstants.DEFAUT_HEADER_SHOW_LINE);
//        for (int i = 0; i < titles.length; i++) {
//            HSSFCell cell = titleRow.createCell(i, HSSFCell.CELL_TYPE_STRING);// 创建数据列
//            if (cellStyle != null) {
//                cell.setCellStyle(cellStyle);
//            }
//            cell.setCellValue(titles[i]);
//        }
//    }
//
//    /**
//     * 设置工作表数据
//     *
//     * @param sheet
//     * @param dataList
//     * @param fields
//     * @param cellStyle
//     */
//    public static void setWorkbookData(HSSFSheet sheet, List<Map<String, Object>> dataList, String[] fields, HSSFCellStyle cellStyle) {
//        if (dataList != null){
//            int line = ExcelConstants.DEFAUT_HEADER_SHOW_LINE + 1 ;
//            for (Map<String, Object> data : dataList) {
//                HSSFRow dataRow = sheet.createRow(line++);
//                int col = 0;
//                for (int i = 0; i < fields.length; i++) {
//                    HSSFCell cell = dataRow.createCell(col++);
//                    if (cellStyle != null) {
//                        cell.setCellStyle(cellStyle);
//                    }
//                    String value = getValue(data.get(fields[i]));
//                    cell.setCellValue(value);
//                }
//            }
//        }
//    }
//
//    private static String getValue(Object o) {
//        return (o == null) ? "" : o.toString();
//    }
//
//    /**
//     * 设置标题样式
//     *
//     * @param workbook
//     * @param isFull
//     *            : 是否填充单元格
//     * @return
//     */
//    public static HSSFCellStyle setCellStyle(HSSFWorkbook workbook, boolean isFull) {
//        HSSFCellStyle cellstyle = workbook.createCellStyle();
//        if (isFull) {
//            cellstyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND); // 填充单元格
//            cellstyle.setFillForegroundColor(HSSFColor.AQUA.index); // 填绿色
//        }
//        cellstyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//        cellstyle.setBottomBorderColor((short) 0);
//        cellstyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//        cellstyle.setLeftBorderColor((short) 0);
//        cellstyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
//        cellstyle.setRightBorderColor((short) 0);
//        cellstyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
//        cellstyle.setTopBorderColor((short) 0);
//        cellstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 居中显示
//        return cellstyle;
//    }
//
//}
