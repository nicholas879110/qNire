<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-11-20
  Time: 下午11:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<div class="row">
    <div class="page-header">
        <h1>
            题库管理
            <small class="pull-right">
                <button class="btn btn-minier btn-info" type="button" id="add-btn">添加题目</button>
                <button class="btn btn-minier btn-info" type="button" id="delete-btn">批量删除</button>
                <button class="btn btn-minier btn-info" type="button" id="export-btn">批量发布</button>
            </small>
        </h1>
    </div>

    <div class="col-xs-12 table-responsive">
        <form action="/questionMgr/exportQues.action" class="form-horizontal form-border" method="post" id="queryFrom">
            <div class="col-xs-12">
                标签：
                <c:forEach items="${tags }" var="tagV">
                    <input name="tags" type="checkbox" value="${tagV.id }">${tagV.tagName }<img src="${ctx}/img_save_path/${tagV.tagImgPath }" width="25px" height="20px">
                </c:forEach>
            </div>
            <div class="col-xs-12">
                题目类型：
                <select id="types" name="qtype">
                    <option value="">所有</option>
                    <c:forEach items="${types }" var="type">
                        <option value="${type.id }">${type.name }</option>
                    </c:forEach>
                </select>
                关键字：
                <input type="text" name="keyword">
                <a id="ques-query-btn" href="javaScript:void(0);" class="btn btn-minier btn-info">查询</a>
            </div>

        </form>
        <div class="space-12"></div>
        <table id="qmList" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>

<script type="text/javascript">
    //批量删除
    function assessDataDelete() {
        var checkedAr = $('#qmList').find("[name='id']:checked");
        if (checkedAr.size() == 0) {
            bootBoxWarning("请至少选中一行数据！");
            return;
        }
        bootBoxConfirm("确定是否批量删除题目？", function (result) {
            if (result) {
                if (checkedAr) {
                    var ids = [];
                    $.each(checkedAr, function (index, obj) {
                        var sData = $('#qmList').dataTable().fnGetData($(obj).parents('#qmList tr').get(0));
                        ids.push(sData.id);
                    });
                    if (ids.length != 0) {
                        $.ajax({
                            url: getContentPath() + '/questionMgr/deleteQues.action',
                            type: 'post',
                            dataType: "json",
                            data: {
                                "pks": ids.join(",")
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    $('#qmList').dataTable().fnClearTable();
                                    bootBoxSuccess(data.msg)
                                } else {
                                    bootBoxError(data.msg);
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    //批量发布
    function exportQues() {
        var checkedAr = $('#qmList').find("[name='id']:checked");
        if (checkedAr.size() == 0) {
            bootBoxWarning("请至少选中一行数据！");
            return;
        }
        bootBoxConfirm("确定是否批量发布题目？", function (result) {
            if (result) {
                if (checkedAr) {
                    var ids = [];
                    $.each(checkedAr, function (index, obj) {
                        var sData = $('#qmList').dataTable().fnGetData($(obj).parents('#qmList tr').get(0));
                        ids.push(sData.id);
                    });
                    if (ids.length != 0) {
                        $.ajax({
                            url: getContentPath() + '/questionMgr/exportQues.action',
                            type: 'post',
                            dataType: "json",
                            data: {
                                "pks": ids.join(",")
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    $('#qmList').dataTable().fnClearTable();
                                    bootBoxSuccess(data.msg)
                                } else {
                                    bootBoxError(data.msg);
                                }
                            }
                        });
                    }
                }
            }
        });
    }

    function updateQuestionType(data) {
        switchPage("/questionMgr/updateInit.do", {"id": data});
    }

    function detailQuestion(data) {
        switchPage("/questionMgr/detailInit.do", {"id": data});
    }

    $(function () {
        $("#add-btn").click(function () {
            switchPage("/questionMgr/addInit.do")
        })

        $("#export-btn").click(function () {
            exportQues();
        })

        $("#delete-btn").click(function () {
            assessDataDelete();
        })
        //datatable初始化
        var oTable1;
        oTable1 = $('#qmList').dataTable({
            "bStateSave": true,//记录到cookie
            "bServerSide": true,
            "sServerMethod": "POST",
            "bRetrieve": true,
            "sAjaxSource": getContentPath() + "/questionMgr/queryques.do",
            "aoColumns": [
                {
                    "sWidth": "5%",
                    "bSortable": false,
                    //"mData": "adCd",
                    "sTitle": "<label class='center'><input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span></label>",
                    "sClass": "center"
                },
                {
                    "sWidth": "30%",
                    "bSortable": false,
                    "sTitle": "题目",
                    "mData": "title",
                    "sClass": "center"
                },
                {
                    "sWidth": "10%",
                    "bSortable": false,
                    "mData": "status",
                    "sTitle": "发布状态",
                    "sClass": "center"
                },
                {
                    "sWidth": "10%",
                    "bSortable": false,
                    "mData": "qtypeTile",
                    "sTitle": "题目类型",
                    "sClass": "center"
                },
                {
                    "sWidth": "10%",
                    "bSortable": false,
                    "mData": "tagIdTitle",
                    "sTitle": "标签",
                    "sClass": "center"
                },
                {
                    "sWidth": "10%",
                    "bSortable": false,
                    "mData": "id",
                    "sTitle": "操作",
                    "sClass": "center"
                }
            ],
            "aoColumnDefs": [
                {
                    sDefaultContent: '',//使提示弹出框 失效
                    aTargets: ['_all']
                },
                {
                    "sClass": "rowcheckbox", "aTargets": [0],
                    "aTargets": [5], "mRender": function (data, type, full) {
                    return '<a title="查看" href="javaScript:void(0);" onclick="detailQuestion(\'' + data + '\');" ><i class="icon-search bigger-130"></i>&nbsp;&nbsp;</a>' +
                            '<a title="修改" href="javaScript:void(0);" onclick="updateQuestion(\'' + data + '\');" ><i class="icon-edit bigger-130"></i>&nbsp;&nbsp;</a>'
                }
                }
            ],
            //设置第0排 name="userId"
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                var status = aData["status"];
                if (status == 0) {
                    $('td:eq(2)', nRow).html("未发布")
                } else {
                    $('td:eq(2)', nRow).html("已发布")
                }
                $('td:eq(0)', nRow).html('<label class="center"><input type="checkbox" class="ace" name="id" value="' + aData["id"] + '" /><span style="width:0px;" class="lbl"></span></label>');
            },
            "fnServerParams": function (aoData) {
                var queryParameters = $("#queryFrom").serializeArray();
                $(queryParameters).each(function (i, v) {
                            aoData.push(v);
                        }
                );
            },
            "fnDrawCallback": function (oSettings) {
                //取消第一列class="selectrow"的checkbox框选中状态
                $("#qmList th input[type=checkbox]").removeAttr("checked");
                $("#qmList .rowcheckbox").show();
            },
            "fnInitComplete": function (oSettings, json) {
                $('#qmList th input[type=checkbox]').on('click', function () {
                    var that = this;
                    $(this).closest('table').find('tr > td:first-child input[type=checkbox]')
                            .each(function () {
                                this.checked = that.checked;
                                $(this).closest('tr').toggleClass('selected');
                            });
                });
            }
        });

        //查询考核数据表
        $("#ques-query-btn").click(function () {
            var oSettings = oTable1.fnSettings();
            oSettings._iDisplayStart = 0;
            oTable1.fnClearTable();
        })

    })
</script>