<%--
  Created by IntelliJ IDEA.
  User: zlw
  Date: 14-11-20
  Time: 下午11:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row">
    <div class="page-header">
        <h1>
            题型管理
            <small class="pull-right">
                <button class="btn btn-minier btn-info" type="button" id="add-btn">添加类型</button>
                <button class="btn btn-minier btn-info" type="button" id="delete-btn">批量删除</button>
            </small>
        </h1>
    </div>

    <div class="col-xs-12 table-responsive">
        <table id="qtmList" class="table table-striped table-bordered table-hover"></table>
    </div>
</div>

<div id="dialog-file-operation" class="hide">
    <form id="uploadForm" method="post" enctype="multipart/form-data" class="form-horizontal">
        <input type="text" hidden="true" name="id"/>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">Chinese:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="ch">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">English:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="form-control" type="text" name="en">
            </div>
        </div>

        <div class="form-group no-margin-left no-margin-right">
            <label class="col-sm-3 control-label col-xs-12  no-padding">File:</label>

            <div class=" col-xs-12 col-sm-9">
                <input class="input-small" id="video-file" type="file" name="file">
            </div>
        </div>

    </form>
</div>
<script type="text/javascript">
    //批量删除
    function assessDataDelete() {
        var checkedAr = $('#qtmList').find("[name='id']:checked");
        if (checkedAr.size() == 0) {
            bootBoxWarning("请至少选中一行数据！");
            return;
        }
        bootBoxConfirm("确定是否批量删除题型？", function (result) {
            if (result) {
                if (checkedAr) {
                    var ids = [];
                    $.each(checkedAr, function (index, obj) {
                        var sData = $('#qtmList').dataTable().fnGetData($(obj).parents('#qtmList tr').get(0));
                        ids.push(sData.id);
                    });
                    if (ids.length != 0) {
                        $.ajax({
                            url: getContentPath() + '/questionTypeMgr/deleteTypes.action',
                            type: 'post',
                            dataType: "json",
                            data: {
                                "pks": ids.join(",")
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    $('#qtmList').dataTable().fnClearTable();
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

    function updateQuestionType(data){
        switchPage("/questionTypeMgr/updateInit.do",{"id":data});
    }

    $(function () {
        $("#add-btn").click(function () {
            switchPage("/questionTypeMgr/addInit.do")
        })

        $("#delete-btn").click(function () {
            assessDataDelete();
        })
        //datatable初始化
        var oTable1;
        oTable1 = $('#qtmList').dataTable({
            "bStateSave": true,//记录到cookie
            "bServerSide": true,
            "sServerMethod": "POST",
            "bRetrieve": true,
            "sAjaxSource": getContentPath() + "/questionTypeMgr/queryTypes.do",
            "aoColumns": [
                {
                    "sWidth": "5%",
                    "bSortable": false,
                    //"mData": "adCd",
                    "sTitle": "<label class='center'><input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span></label>",
                    "sClass": "center"
                },
                {
                    "sWidth": "40%",
                    "bSortable": false,
                    "sTitle": "类型名称",
                    "mData": "name",
                    "sClass": "center"
                },
                {
                    "sWidth": "40%",
                    "bSortable": false,
                    "mData": "code",
                    "sTitle": "类型代码",
                    "sClass": "center"
                },
                {
                    "sWidth": "5%",
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
                "aTargets": [3], "mRender": function (data, type, full) {
                return '<a title="修改" href="javaScript:void(0);" onclick="updateQuestionType(\'' + data + '\');" ><i class="icon-edit bigger-130"></i>&nbsp;&nbsp;</a>'
            }
            }
            ],
//        "fnServerParams": function (aoData) {
//            var queryParameters = $("#gov-assess-data-form").serializeArray();
//            $(queryParameters).each(function (i, v) {
//                        aoData.push(v);
//                    }
//            );
//        },
            //设置第0排 name="userId"
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
//            var id = aData["adCd"] + ';' + aData["yr"];
//            //状态设置
//            if (aData["sub"] == 1) {
//                $('td:eq(4)', nRow).html("未提交")
//                $('td:eq(5)', nRow).find("a").remove();
//                $('td:eq(5)', nRow).append('<a title="详情" href="javaScript:void(0);" onclick="showDataDetail(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-file-alt2 bigger-130"></i>&nbsp;&nbsp;</a>' +
//                (validAuthCode("GOV_ASSESS_UPDATE") == true ? '<a title="修改" href="javaScript:void(0);" onclick="updateAssessData(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-pencil2 bigger-130 green"></i>&nbsp;&nbsp;</a>' : '&nbsp;&nbsp;') +
//                (validAuthCode("GOV_ASSESS_SUBMIT") == true ? '<a title="提交" href="javaScript:void(0);" onclick="assessDataSubmitSingle(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-check2 bigger-130 green"></i></a>' : ''));
//                $('td:eq(0)', nRow).html('<label class="center"><input type="checkbox" class="ace" name="adCd" value="' + id + '" /><span style="width:0px;" class="lbl"></span></label>');
//            } else if (aData["sub"] == 2) {
//                $('td:eq(4)', nRow).html("待审核")
//                $('td:eq(5)', nRow).find("a").remove();
//                $('td:eq(5)', nRow).append('<a title="详情" href="javaScript:void(0);" onclick="showDataDetail(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-file-alt2 bigger-130"></i></a>');
//            } else if (aData["sub"] == 3) {
//                $('td:eq(4)', nRow).html("通过")
//                $('td:eq(5)', nRow).find("a").remove();
//                $('td:eq(5)', nRow).append('<a title="详情" href="javaScript:void(0);" onclick="showDataDetail(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-file-alt2 bigger-130"></i></a>');
//            } else if (aData["sub"] == 4) {
//                $('td:eq(4)', nRow).html("退回")
//                $('td:eq(5)', nRow).find("a").remove();
//                $('td:eq(5)', nRow).append('<a title="详情" href="javaScript:void(0);" onclick="showDataDetail(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-file-alt2 bigger-130"></i></a>' +
//                '&nbsp;&nbsp;' + (validAuthCode("GOV_ASSESS_UPDATE") == true ? '<a title="修改" href="javaScript:void(0);" onclick="updateAssessData(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-pencil2 bigger-130 green"></i>&nbsp;&nbsp;</a>' : '&nbsp;&nbsp;')+
//                (validAuthCode("GOV_ASSESS_SUBMIT") == true ? '<a title="提交" href="javaScript:void(0);" onclick="assessDataSubmitSingle(\'' + aData["adCd"] + ';' + aData["yr"] + '\');" ><i class="icon-check2 bigger-130 green"></i></a>' : ''));
//                $('td:eq(0)', nRow).html('<label class="center"><input type="checkbox" class="ace" name="adCd" value="' + id + '" /><span style="width:0px;" class="lbl"></span></label>');
//            }
                $('td:eq(0)', nRow).html('<label class="center"><input type="checkbox" class="ace" name="id" value="' + aData["id"] + '" /><span style="width:0px;" class="lbl"></span></label>');
            },
            "fnDrawCallback": function (oSettings) {
                //取消第一列class="selectrow"的checkbox框选中状态
                $("#qtmList th input[type=checkbox]").removeAttr("checked");
                $("#qtmList .rowcheckbox").show();
            },
            "fnInitComplete": function (oSettings, json) {
                $('#qtmList th input[type=checkbox]').on('click', function () {
                    var that = this;
                    $(this).closest('table').find('tr > td:first-child input[type=checkbox]')
                            .each(function () {
                                this.checked = that.checked;
                                $(this).closest('tr').toggleClass('selected');
                            });
                });
            }
//        "fnStateLoadParams": function (oSettings, oData) {
//            if (isInit == "true") {
//                oData.iStart = 0;
//                oData.oSearch.sSearch = "";
//            } else {
//                $("input[name='yearData']").val(oData.yearData);
//                //$("select[name='padCd']").select2("val",oData.adState);
//                //$("select[name='adCd']").select2("val",oData.adDistrict);
//                $("input[name='sub']").val(oData.sub);
//                var orgObj1 = [];
//                orgObj1 = oData.subUn;
//                if (orgObj1 != null) {
//                    if (orgObj1.length == 2) {
//                        if (orgObj1[0].length > 0 && orgObj1[1].length > 0) {
//                            orgObj1[1] = decodeURI(orgObj1[1]);
//                            orgObj = orgObj1;
//                        }
//                    }
//                }
//            }
//        },
//        "fnCookieCallback": function (sName, oData, sExpires, sPath) {
//            // Customise oData or sName or whatever else here
//            oData.yearData = $("input[name='yearData']").val();
//            //oData.adState = $("select[name='padCd']").val();
//            //oData.adDistrict = $("select[name='adCd']").val();
//            oData.sub = $("input[name='sub']").val();
//
//            if (orgObj != null) {
//                if (orgObj.length == 2) {
//                    if (orgObj[0] != null && orgObj[1] != null) {
//                        if (orgObj[0].length > 0 && orgObj[1].length > 0) {
//                            orgObj[1] = encodeURI(orgObj[1]);
//                            oData.subUn = orgObj;
//                        }
//                    }
//                }
//            }
//            return sName + "=" + JSON.stringify(oData) + "; expires=" + sExpires + "; path=" + sPath;
//        }
        });
    })
</script>