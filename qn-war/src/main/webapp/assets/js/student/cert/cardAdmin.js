/**
 * Created by gxb on 2014/9/19.
 */
$(function () {
    //初始化日期控件
    $('.date-picker').datepicker({autoclose:true,endDate:""}).next().on(ace.click_event, function(){
        $(this).prev().focus();
    });
    $("#data-table").DataTable({
        "sAjaxSource": getContentPath() + "/stuCert/pager",
        "aoColumns": [
            { "sWidth": "30%", "sTitle": "职业（工种）及等级", "sClass": "center", "mData": "certName", "bSortable": false },
            { "sWidth": "30%", "sTitle": "证书编号", "sClass": "center", "mData": "certCode", "bSortable": false },
            { "sWidth": "20%", "sTitle": "发证日期", "sClass": "center", "mData": "licenceDate", "bSortable": false },
            { "sWidth": "20%", "sTitle": "操作", "sClass": "center", "mData": "certId", "bSortable": false }

        ],
        "aLengthMenu": [ 10, 20, 30 ],
        "aaSorting": [],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:not(:first,:last)', nRow).addClass("td_v_middle");
            var licenceDate = aData["licenceDate"];
            licenceDate = licenceDate.split(" ")[0];
            $("td:eq(2)", nRow).html(licenceDate);

            var btnDivHTML = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
            var btnDivHTMLEnd = '</div>';

            var updateLink = '<a class="update" href="#">修改</a>';
            var updateHTML = "";

            var deleteLink = '<a class="red delete" href="#">删除</a>';
            var deleteHtml = "";

//            updateHTML += updateLink;
            deleteHtml += deleteLink;
            $('td:last', nRow).html(btnDivHTML  + updateHTML + deleteHtml + btnDivHTMLEnd);

            // 修改
            $('td:last', nRow).find(".update").click(function () {
                $('#certId').val(aData["certId"]);
                $('#licenceDate').val(licenceDate);
                $('#certCode').val(aData["certCode"]);
                $('#id').val(aData["id"]);

                $('#saveForm').prop('action',getContentPath()+"/stuCert/updateUserCert");
            });

            // 删除
            $('td:last', nRow).find(".delete").click(function () {
                var confirmMsg = '确定要删除么？';
                var url = getContentPath() + "/stuCert/deleteUserCert";
                bootBoxConfirm(confirmMsg,function(isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            url: url,
                            type: "POST",
                            data: {id:aData["id"]},
                            dataType: "json",
                            success: function(data){
                                if(data.code == 0){
                                    bootBoxSuccess(data.msg,function(){
                                        refresh();
                                    });
                                }else{
                                    bootBoxError(data.msg);
                                }
                            }
                        });
                    }
                });
            });
        },
        "fnServerParams": function (aoData) {
            aoData.push({"name":"type","value":"Certificate"});
        }
    });
    $("#data-table2").DataTable({
        "sAjaxSource": getContentPath() + "/stuCert/pager",
        "aoColumns": [
            { "sWidth": "80%", "sTitle": "职称等级", "sClass": "center", "mData": "certName", "bSortable": false },
            { "sWidth": "80%", "sTitle": "职称编号", "sClass": "center", "mData": "certCode", "bSortable": false },
            { "sWidth": "10%", "sTitle": "发证日期", "sClass": "center", "mData": "licenceDate", "bSortable": false },
            { "sWidth": "20%", "sTitle": "操作", "sClass": "center", "mData": "certId", "bSortable": false }

        ],
        "aLengthMenu": [ 10, 20, 30 ],
        "aaSorting": [],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td:not(:first,:last)', nRow).addClass("td_v_middle");
            var licenceDate = aData["licenceDate"];
            licenceDate = licenceDate.split(" ")[0];
            $("td:eq(2)", nRow).html(licenceDate);

            var btnDivHTML = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
            var btnDivHTMLEnd = '</div>';

            var updateLink = '<a class="update" href="#">修改</a>';
            var updateHTML = "";

            var deleteLink = '<a class="red delete" href="#">删除</a>';
            var deleteHtml = "";

//            updateHTML += updateLink;
            deleteHtml += deleteLink;
            $('td:last', nRow).html(btnDivHTML  + updateHTML + deleteHtml + btnDivHTMLEnd);

            // 修改
            $('td:last', nRow).find(".update").click(function () {
                $('#certId').val(aData["certId"]);
                $('#licenceDate').val(licenceDate);
                $('#certCode').val(aData["certCode"]);
                $('#id').val(aData["id"]);

                $('#saveForm').prop('action',getContentPath()+"/stuCert/updateUserCert");
            });

            // 删除
            $('td:last', nRow).find(".delete").click(function () {
                var confirmMsg = '确定要删除么？';
                var url = getContentPath() + "/stuCert/deleteUserCert";
                bootBoxConfirm(confirmMsg,function(isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            url: url,
                            type: "POST",
                            data: {id:aData["id"]},
                            dataType: "json",
                            success: function(data){
                                if(data.code == 0){
                                    bootBoxSuccess(data.msg,function(){
                                        refresh();
                                    });
                                }else{
                                    bootBoxError(data.msg);
                                }
                            }
                        });
                    }
                });
            });
        },
        "fnServerParams": function (aoData) {
            aoData.push({"name":"type","value":"JobTitle"});
        }
    });
    function refresh(){
        var oSettings = $('#data-table').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#data-table').dataTable().fnClearTable();
    }
    function refresh2(){
        var oSettings = $('#data-table2').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#data-table2').dataTable().fnClearTable();
    }
    //保存的表单
    $( "#saveBtn" ).click(function(e) {
        $('#saveForm').submit();
        e.preventDefault();
        return false;
    });
    $( "#saveBtn2" ).click(function(e) {
        $('#saveForm2').submit();
        e.preventDefault();
        return false;
    });

    $( "#myTab li" ).click(function(e) {
        var activeTab = $(this).find('a').prop('name');
        if(activeTab == "#home"){//切换查证证书的类型
            type =  "Certificate";
            refresh();
        }else{
            type = "JobTitle";
            refresh2();
        }

        var activeForm = $(activeTab).find('form').attr('id');
        saveCertValidate = validForm("#"+activeForm,saveCertSetting);
    });

    function saveCert(form){
        if($('#id').val().length == 0){//此时为添加
            $(form).prop('action',getContentPath()+"/stuCert/bindUserCert");
        }
        var jsonSeries = $(form).serialize();
        $.ajax({
            url: $(form).attr("action"),
            type: "POST",
            data : jsonSeries,
            dataType: "json",
            success: function(data){
                if(data.code == 0){
                    bootBoxSuccess(data.msg, function () {
                        saveCertValidate.resetForm();
                        $('#id').val("");
                        refresh();
                    });
                }else{
                    bootBoxError(data.msg);
                }
            }
        });
    }
    var saveCertSetting = {
        rules: {
            certCode: {
                required: true,
                digits:true
            },
            licenceDate:{
                required:true
            },
            certId:{
                required:true,
            remote: {
                url: getContentPath() + "/stuCert/validateCert",
                type: "post",
                dataType: "json",
                data: {
                    certId: function () {
                        return $('#certId').val();
                    },
                    userCertId: function () {
                        return $('#id').val();
                    },
                    saveAs: function () {
                        return true;
                    }
                }
            }

            }
        },
        messages: {
            certCode: {
                required: "请输入编号",
                digits:"编号只能是整数"
            },
            licenceDate:{
                required:"请输入发证日期"
            },
            certId:{
                required:"请选择职业（工种）及等级",
                remote: "职业（工种）及等级已存在"
            }
        },
        submitHandler: function (form) {
            saveCert(form);
        }
    };
    var saveCertValidate = validForm("#saveForm",saveCertSetting);

});

