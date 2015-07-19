//package com.zlw.ke.commons.excel.impl;
//
//import java.util.List;
//import java.util.Map;
//
//import com.zlw.ke.commons.excel.ExportExcel;
//import com.zlw.ke.commons.excel.utils.POIExcelUtil;
//import org.apache.poi.hssf.usermodel.HSSFCellStyle;
//import org.apache.poi.hssf.usermodel.HSSFFont;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//
//
///**
// * 导出excel2007实现
// *
// * @author: zlw
// * @date 2014-10-14
// * @version V1.0
// */
//public  class ExportExcel2007Support implements ExportExcel {
//
//
//
//
//    public HSSFWorkbook export(String sheetName, String[] titles, List<Map<String, Object>> dataList, String[] fields,HSSFCellStyle cellStyle) {
//        HSSFWorkbook workbook= POIExcelUtil.createWorkbook();
//        HSSFSheet sheet = POIExcelUtil.createSheet(workbook, sheetName);
//        //HSSFCellStyle cellStyle=POIExcelUtil.setHeaderCellStyle(workbook);
////        HSSFCellStyle cellStyle=workbook.createCellStyle();
////        HSSFFont fontStyle=workbook.createFont();
////        cellStyle=this.setHeaderStyle(cellStyle,fontStyle);
//        POIExcelUtil.setHeader(workbook, sheet, titles, cellStyle);
//        POIExcelUtil.setWorkbookData(sheet, dataList, fields, cellStyle);
//        return workbook;
//    }
//
//    /**
//     * 需要将字体样式设置进单元格样式
//     * @param cellStyle
//     * @param fontStyle
//     * @return
//     */
//    //public abstract  HSSFCellStyle setHeaderStyle(HSSFCellStyle cellStyle,HSSFFont fontStyle);
//
//}
