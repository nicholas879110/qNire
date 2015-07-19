jQuery(function ($) {

    var oTable1 = $('#title-table').dataTable({
        "bServerSide": true,
        "sServerMethod": "POST",
        "sAjaxSource": getContentPath() + "/title/page",
        "aoColumns": [
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "名称",
                "mData": "certName"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "等级",
                "mData": "certLevel"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "学时",
                "mData": "studyTime"
            },
            {
                "sWidth": "10%",
                "bSortable": false,
                "sTitle": "封面",
                "mData": "certFrontCover"
            },
            {
                "sWidth": "5%",
                "bSortable": false,
                "mData": "certId"
            }
        ],
        "fnServerParams": function (aoData) {
            var certName=$("input[name=certNameQ]").val();
            var certLevel=$("select[name=certLevelQ]").val();

            aoData.push({
                "name": "certName",
                "value": certName
            },{
                name:"certLevel",
                value:certLevel
            });
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var certFrontCover=aData["certFrontCover"];
            $('td:eq(3)', nRow).html("<a target='_blank' href='"+getContentPath()+certFrontCover+"'>"+certFrontCover+"</a>");

            var certLevel=aData["certLevel"];
            $('td:eq(1)', nRow).html("<span>"+revertLevel(certLevel)+"</span>");

            var operation = '<div class="action-buttons">' +
                '<a href="javascript:void(0)" onclick="editTitle(this);" class="blue"> <i class="icon-pencil bigger-130"></i></a>' +
                '<a href="javascript:void(0)" onclick="deleteTitle(this);" class="red"> <i class="icon-trash bigger-130"></i></a>' +
                '</div>' ;

            $('td:eq(4)', nRow).html(operation);
        }
    });



    function revertLevel(level){
        var levelName="";
        switch (level) {
            case Constant.CertficateLevel.Lower:
                levelName = Constant.CertficateLevel.LowerName;
                break;
            case Constant.CertficateLevel.Middler:
                levelName = Constant.CertficateLevel.MiddlerName;
                break;
            case Constant.CertficateLevel.Higher:
                levelName = Constant.CertficateLevel.HigherName;
                break;
            case Constant.CertficateLevel.Bester:
                levelName = Constant.CertficateLevel.BesterName;
                break;
            case Constant.CertficateLevel.Super:
                levelName = Constant.CertficateLevel.SuperName;
                break;
            default :
                break;
        }
        return levelName;
    }



    $("#search-btn").click(function(e){
        var oSettings = $('#title-table').dataTable().fnSettings();
        oSettings._iDisplayStart = 0;
        $('#title-table').dataTable().fnClearTable();
    })

    $("#add-btn").click(function(){
        var dialog = $("#dialog-title").removeClass('hide').dialog({
            modal: true,
            title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>增加职称</h4></div>",
            title_html: true,
            width:500,
            open: function (event, ui) {
                $('#title-data-form')[0].reset();
            },
            close: function (event, ui) {
                $('#title-data-form')[0].reset();
                $( this ).dialog( "destroy" );
            },
            buttons: [
                {
                    text: "取消",
                    "class": "btn btn-xs",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "保存",
                    "class": "btn btn-primary btn-xs",
                    click: function () {
                        var $form = $('#title-data-form');
                        if(!$form.valid()) return;
                        var fd = new FormData($form.get(0));
                        $.ajax({
                            url: getContentPath() + "/title/su",
                            type: $form.attr('method'),
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            success: function (data, textStatus, jqXHR) {
                                if (data.code==0) {
                                    //刷新表格
                                    $('#title-table').dataTable().fnClearTable();
                                    bootBoxSuccess(data.msg);
                                } else {
                                    bootBoxError(data.msg);
                                }
                            },
                            error : function(jqXHR, textStatus, errorThrown) {
                                alert("服务器异常，请联系管理员！", "错误");
                            }
                        });
                        dialog.dialog("close");
                    }
                }
            ]
        });

    })


    var upload_in_progress = false;
    $('#certFrontCover').ace_file_input({
        no_file : '选择文件',
        btn_choose : '选择',
        btn_change : '重选',
        droppable : false,
        onchange : null,
        thumbnail : false,
//        thumbnail:'large',
        before_remove: function() {
            if(upload_in_progress)
                return false;//if we are in the middle of uploading a file, don't allow resetting file input
            return true;
        },
        before_change: function(files, dropped) {
            var file = files[0];
            if(typeof file == "string") {//files is just a file name here (in browsers that don't support FileReader API)
                if(! (/\.(jpe?g|png|gif)$/i).test(file) ) {
                    alert('请选择图片文件!');
                    return false;
                }
            }
            else {
                var type = $.trim(file.type);
                if( ( type.length > 0 && ! (/^image\/(jpe?g|png|gif)$/i).test(type) )
                    || ( type.length == 0 && ! (/\.(jpe?g|png|gif)$/i).test(file.name) )//for android's default browser!
                    ) {
                    alert('请选择图片文件!');
                    return false;
                }

                if( file.size > 1100000 ) {//~100Kb
                    alert('文件大小不能超过 1M!');
                    return false;
                }
            }

            return true;
        }
    });


    Validator.validate($('#title-data-form'), {
        rules: {
            certName: {
                required: true
            },
            certLevel: {
                required: true
            },
            studyTime: {
                required: true,
                digits:true
            }
        },
        debug : true,
        messages: {
            certName: {
                required: "职称名称不能为空"
            },
            certLevel: {
                required: "职称等级不能为空"
            },
            studyTime: {
                required: "学时不能为空",
                digits:"学时只能为数字"
            }
        },
        submitHandler: function (form) {

        },
        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')){
                var controls = element.closest('div[class*="col-"]');
                if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            }
            else {
                error.insertAfter(element.parent());
            }

        }
    });
})

function deleteTitle(dom){
    var sData = $('#title-table').dataTable().fnGetData($(dom).parents("#title-table tr").get(0));
    $.ajax({
        url : getContentPath()+'/title/del',
        type : 'get',
        dataType : "json",
        data : {
            "id" : sData["certId"]
        },
        success : function(data, textStatus, jqXHR) {
            if (data.code==0) {
                $('#title-table').dataTable().fnClearTable();
            } else {
                alert(data.msg);
            }
        }
    });
}


function editTitle(dom) {
    var sData = $('#title-table').dataTable().fnGetData($(dom).parents("#title-table tr").get(0));
    var dialog = $("#dialog-title").removeClass('hide').dialog({
        modal: true,
        title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='icon-ok'></i>编辑职称</h4></div>",
        title_html: true,
        width:500,
        open: function (event, ui) {
            $("#title-data-form").resetForm();
            $('#title-data-form').find("input[name=certId]").attr("value",sData["certId"]);
            $('#title-data-form').find("input[name=certName]").attr("value",sData["certName"]);
            $('#title-data-form').find("input[name=frontCover]").attr("value",sData["frontCover"]);
            $('#title-data-form').find("input[name=studyTime]").attr("value",sData["studyTime"]);
            $('#title-data-form').find("select[name=certLevel]").val(sData["certLevel"]);
        },
        close: function (event, ui) {
            $( this ).dialog( "destroy" );
            $("#dialog-title").addClass('hide')
        },
        buttons: [
            {
                text: "取消",
                "class": "btn btn-xs",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "保存",
                "class": "btn btn-primary btn-xs",
                click: function () {
                    var $form = $('#title-data-form');
                    if(!$form.valid()) return;
                    var fd = new FormData($form.get(0));
                    $.ajax({
                        url: getContentPath() + "/title/su",
                        type: $form.attr('method'),
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        data: fd,
                        success: function (data, textStatus, jqXHR) {
                            if (data.code==0) {
                                $('#title-table').dataTable().fnClearTable();
                                bootBoxSuccess(data.msg);
                            } else {
                                bootBoxError(data.msg);
                            }
                        }
                    });
                    dialog.dialog("close");
                }
            }
        ]
    });
}