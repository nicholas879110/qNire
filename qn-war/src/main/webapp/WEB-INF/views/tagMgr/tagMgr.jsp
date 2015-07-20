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
            标签管理
            <small class="pull-right">
                <button class="btn btn-minier btn-info" type="button" id="add-btn">添加标签</button>
                <button class="btn btn-minier btn-info" type="button" id="delete-btn">批量删除</button>
            </small>
        </h1>
    </div>

    <div class="col-xs-12 table-responsive">
        <table id="tagList" class="table table-striped table-bordered table-hover"></table>
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
        var checkedAr = $('#tagList').find("[name='id']:checked");
        if (checkedAr.size() == 0) {
            bootBoxWarning("请至少选中一行数据！");
            return;
        }
        bootBoxConfirm("确定是否批量删除标签？", function (result) {
            if (result) {
                if (checkedAr) {
                    var ids = [];
                    $.each(checkedAr, function (index, obj) {
                        var sData = $('#tagList').dataTable().fnGetData($(obj).parents('#tagList tr').get(0));
                        ids.push(sData.id);
                    });
                    if (ids.length != 0) {
                        $.ajax({
                            url: getContentPath() + '/tagMgr/deleteTags.action',
                            type: 'post',
                            dataType: "json",
                            data: {
                                "pks": ids.join(",")
                            },
                            success: function (data, textStatus, jqXHR) {
                                if (data.code == 0) {
                                    $('#tagList').dataTable().fnClearTable();
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

    function updateTag(data){
        switchPage("/tagMgr/updateInit.do",{"id":data});
    }

    $(function () {
        $("#add-btn").click(function () {
            switchPage("/tagMgr/addInit.do")
        })

        $("#delete-btn").click(function () {
            assessDataDelete();
        })
        //datatable初始化
        var oTable1;
        oTable1 = $('#tagList').dataTable({
            "bStateSave": true,//记录到cookie
            "bServerSide": true,
            "sServerMethod": "POST",
            "bRetrieve": true,
            "sAjaxSource": getContentPath() + "/tagMgr/queryTags.do",
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
                    "mData": "tagName",
                    "sTitle": "标签名称",
                    "sClass": "center"
                },
                {
                    "sWidth": "40%",
                    "bSortable": false,
                    "sTitle": "标签图标",
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
                return '<a title="修改" href="javaScript:void(0);" onclick="updateTag(\'' + data + '\');" ><i class="icon-edit bigger-130"></i>&nbsp;&nbsp;</a>'
            }
            }
            ],
            //设置第0排 name="userId"
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                $('td:eq(0)', nRow).html('<label class="center"><input type="checkbox" class="ace" name="id" value="' + aData["id"] + '" /><span style="width:0px;" class="lbl"></span></label>');
                $('td:eq(2)', nRow).html('<label class="center"><img class="ace" height="25px" width="25px" src="${ctx}/img_save_path/' + aData["tagImgPath"] + '" /><span style="width:0px;" class="lbl"></span></label>');
            },
            "fnDrawCallback": function (oSettings) {
                //取消第一列class="selectrow"的checkbox框选中状态
                $("#tagList th input[type=checkbox]").removeAttr("checked");
                $("#tagList .rowcheckbox").show();
            },
            "fnInitComplete": function (oSettings, json) {
                $('#tagList th input[type=checkbox]').on('click', function () {
                    var that = this;
                    $(this).closest('table').find('tr > td:first-child input[type=checkbox]')
                            .each(function () {
                                this.checked = that.checked;
                                $(this).closest('tr').toggleClass('selected');
                            });
                });
            }

        });
    })
</script>