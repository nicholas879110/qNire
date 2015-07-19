/**
 * Created by danjiaxin on 2014/8/26.
 */
var certificateTree, couCerTree, setting = {
    data: {
        simpleData: {
            enable: true
        },
        key: {
            url: "xUrl"
        }
    },
    view: {
        selectedMulti: false,
        showLine: false
    },
    callback: {
        onClick: function(event, treeId, treeNode) {
            $("#level").val(treeNode.url);
            var n = treeNode.name;
            $("#certName").val(n.substring(0, n.lastIndexOf("_")));
            $("#search-btn").click();
        }
    }
}, ccSetting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    view: {
        selectedMulti: false,
        showLine: false
    },
    check: {
        enable: true
    }
};
$(document).ready(function() {
    certificateTree = $.fn.zTree.init($("#certificateTree"), setting, zNodes);
    couCerTree = $.fn.zTree.init($("#couCerTree"), ccSetting, ccNodes);
    $('#myModal').on('hide.bs.modal', function (e) {
        $("#certId").val("");
        couCerTree.checkAllNodes(false);
    });
    Validator.validate("#courseCer", {
        rules : {
            certId : {
                required: true
            }
        },
        messages : {
            certId: {
                required: "课程名称不能为空"
            }
        },
        submitHandler : function(form) {
            var nodes = couCerTree.getCheckedNodes(), ids="certId="+$("#certId").val();
            if (nodes.length == 0) {
                bootBoxWarning("请选择课程");
            } else {
                for (var i = 0; i < nodes.length; i++) {
                    ids += "&courseId="+nodes[i].id;
                }
            }
            $.postJSON("/course/cer/"+(eval($("#ccc").val())?"save":"update"),ids,function(data){
                if (data.code == 0) {
                    $("#search-btn").click();
                }
                $('#myModal').modal('hide');
            });
        }
    });
    /**
     * 表格ID
     * @type {string}
     */
    var dataTableId = "#data-table";
    /**
     * 表格加载
     * @type {*|jQuery}
     */
    $(dataTableId).dataTable({
        "sAjaxSource": getContentPath() + "/course/cer/pager.do",
        "aoColumns": [
            { "sWidth": "6%", "sTitle": "<input type=\"checkbox\" class=\"ace\" /><span class=\"lbl\"></span>", "sClass": "center", "mData": "certId", "bSortable": false },
            { "sWidth": "32%", "sTitle": "证书(职称)名称", "sClass": "center", "mData": "certName", "bSortable": false },
            { "sWidth": "16%", "sTitle": "等级", "sClass": "center", "mData": "certLevel", "bSortable": false },
            { "sWidth": "32%", "sTitle": "课程名称", "sClass": "center", "mData": "courseName", "bSortable": false },
            { "sWidth": "14%", "sTitle": "操作", "sClass": "center", "mData": "courseId", "bSortable": false }
        ],
        "aLengthMenu": [ 10, 20, 30 ],
        "aaSorting": [],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var btnDivHTML = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
            var btnDivHTMLEnd = '</div>';
            var delLink = '<a class="red del-btn" title="删除" href="javascript:void(0);"><i class="icon-trash bigger-130"></i></a>';
            var id = aData["certId"];
            var inputHtml = "<input type='checkbox' class='ace' name='roleId' value='" + id + "'/><span class=\"lbl\"></span>";
            var btnHTML = "";
            $('td:first', nRow).html(inputHtml);
            if (validAuthCode('')) {
                btnHTML += delLink;
            }
            $("td:last", nRow).html(btnDivHTML + btnHTML + btnDivHTMLEnd);
            // 删除
            $('td:last', nRow).find(".del-btn").click(function () {
                bootBoxConfirm("确认要删除吗？", function (isConfirm) {
                    if (isConfirm) {
                        $.postJSON("/course/cer/delete", {certId: id, courseId: aData.courseId}, function(data) {
                            if (data.code == 0) {
                                $("#search-btn").click();
                            }
                        });
                    }
                });
            });
        },
        "fnServerParams": function (aoData) {
            setupQueryParameter(aoData, "#query-form");
        }
    });

    /**
     * 查询按钮点击事件
     */
    $("#search-btn").click(function () {
        var oSettings = $(dataTableId).dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $(dataTableId).dataTable().fnClearTable();
    });

    /**
     * 管理课程
     */
    $("#addCourse").click(function() {
        var nodes = certificateTree.getSelectedNodes();
        if (nodes.length == 1) {
            $("#certId").val(nodes[0].id);
            getCourse(nodes[0].id);
            $("#ccc").val(true);
            $("#myModal").modal("show");
        } else {
            bootBoxWarning("请选择课程");
        }
    });

    /**
     * 证书替换获取课程
     */
    $("#certId").change(function() {
        getCourse(this.value);
    });

    /**
     * 通过证书id获取课程ids
     * @param id
     */
    function getCourse(id) {
        if (id == null || id.length != 32) {
            couCerTree.checkAllNodes(false);
            return ;
        }
        $.post(getContentPath()+"/course/cer/cis",{id:id},function(data){
            if (data.code == 0) {
                couCerTree.checkAllNodes(false);
                var ns = data.result;
                for (var i = 0; i < ns.length; i++) {
                    couCerTree.checkNode(couCerTree.getNodeByParam("id", ns[i], null), true, false);
                }
            } else {
                bootBoxError("获取证书课程失败，请联系管理员", function() {
                    $("#myModal").modal("hide");
                })
            }
        }, "json");
    }
});
