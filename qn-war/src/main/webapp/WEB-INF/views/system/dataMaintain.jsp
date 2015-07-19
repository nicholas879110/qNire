<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="row">
    <div class="col-xs-12">
        <div class="col-xs-12" style="margin-top: 10px;">
            <input class="btn btn-sm btn-primary pull-left" onclick="location.href='${ctx}/template/initData.xlsx';"
                   type="button" value="下载职业模版"/>
            <input class="btn btn-sm btn-danger pull-left" onclick="location.href='${ctx}/template/courseData.xlsx';"
                   type="button" value="下载课程模版"/>
        </div>
        <div class="col-xs-12 hr hr-dotted"></div>
        <div class="col-xs-12">
            <div align="center">
                <form id="initData" enctype="multipart/form-data">
                    <table border="0" cellspacing="0" cellpadding="10">
                        <tr>
                            <td align="right"><label for="initDataType">初始化类型：</label></td>
                            <td>
                                <select id="initDataType" name="initDataType" style="width: 200px;">
                                    <option value="">请选择</option>
                                    <option value="1">职业</option>
                                    <option value="2">课程</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td align="right"><label for="courseFrontCoverFile">初始化模版数据：</label></td>
                            <td><input accept="application/msexcel" id="courseFrontCoverFile"
                                       name="courseFrontCoverFile" type="file" style="width: 200px;"/></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <input onclick="$('#initData').submit();" class="btn btn-sm btn-success" id="search-btn"
                                       type="button" value="初始化"/>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <br/>
            <br/>
            <div align="center">
                <form id="initData2" enctype="multipart/form-data">
                    <table border="0" cellspacing="0" cellpadding="10">
                        <tr>
                            <td align="right"><label for="courseFrontCoverFile">初始化模版数据：</label></td>
                            <td><input accept="application/msexcel" id="courseFrontCoverFile2"
                                       name="courseFrontCoverFile" type="file" style="width: 200px;"/></td>
                        </tr>
                        <tr>
                            <td align="right"><h4>审核：</h4></td>
                            <td>
                                <div class="radio">
                                    <label class="inline">
                                        <input name="isAudit" type="radio" class="ace" value="resource.audit.status.auditPass" />
                                        <span class="lbl">是</span>
                                    </label>
                                </div>
                                <div class="radio">
                                    <label class="inline">
                                        <input name="isAudit" type="radio" class="ace" checked value="resource.audit.status.notAudit"/>
                                        <span class="lbl">否</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <input onclick="$('#initData2').submit();" class="btn btn-sm btn-success" id="search-btn2"
                                       type="button" value="初始化"/>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${ctx}/assets/js/system/dataMaintain.js"></script>
