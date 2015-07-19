TreeLoader = function () {
};


/**
 * 加载证书数据
 * @param settins
 */
TreeLoader.loadCategoryTree = function (settins) {
    $('#' + settins.treeId).html('正在加载证书(职称)数据...');
    var setting = {
        view: {
            selectedMulti: false,
            showLine:false
        },
        edit: {
        },
        async: {
            enable: true,
            url: getContentPath() + "/manage/cert/query/all",
            autoParam: ["id"]
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: selectNode,
            beforeClick: zTreeBeforeClick
        }
    };

    function selectNode(e, treeId, treeNode) {
        var name = treeNode.name;
        var id = treeNode.id;

        //只有选择节点类型为证书的数据时才有效
        $('#' + settins.id).val(id);
        $('#' + settins.name).val(name);
    }

    function zTreeBeforeClick(treeId, treeNode, clickFlag){
        return treeNode.type == Constant.ProfessionDataType.Certificate;
    }

    function onBodyDown(event) {
        // var zTreeId = "#selectZtree";
        if (!(event.target.className == "zTree-btn" || event.target.className == "zTree-input" || event.target.className == "zTree-content" || $(event.target).parents('#' + settins.divId + " .zTree-content").length>0)) {
            hideMenu();
        }
    }

    function showMenu() {
        var cityObj = $('#' + settins.divId + " .zTree-input");
        var cityPosition = $('#' + settins.divId).position();
        $('#' + settins.divId+ " .zTree-content").css({top:cityObj.outerHeight() + "px"}).slideDown("fast");
        $("body").bind("mousedown", onBodyDown);
        $('#' + settins.divId + " .zTree-btn > i").removeClass("icon-caret-down").addClass("icon-caret-up");

    }

    function hideMenu() {
        $('#' + settins.divId + " .zTree-content").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
        $('#' + settins.divId + " .zTree-btn > i").removeClass("icon-caret-up").addClass("icon-caret-down");
    }

    function showIconForTree(treeId, treeNode) {
        return !treeNode.isParent;
    }

    /**
     * zTree初始化
     */
    $(document).ready(function () {
        var tree = $.fn.zTree.init($("#" + settins.treeId), setting);
        $("#" + settins.divId + " .zTree-btn").bind("click", function(){
            if($("#" + settins.divId + " .zTree-btn > i").hasClass("icon-caret-up")) {
                hideMenu();
            } else {
                showMenu();
            }
        });
    });
}


jQuery(function ($) {

    /**
     * 考试证书加载
     */
    var settingCustom = {
        id: 'certId',
        name: 'certName',
        treeId: 'cert-tree',
        divId:'select-zTree'
    }
    TreeLoader.loadCategoryTree(settingCustom);



    $(".form_datetime").datetimepicker({
        language:'zh-CN',
        format: "yyyy-mm-dd hh:ii:ss",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left"
    });

    $("#save-custom-exam-strategy").click(function(){
        var $form=$("#add-ces-form");
        var fd = new FormData($form.get(0));
        if($form.valid()){
            startLoading("保存中...");
            $.ajax({
                url : getContentPath()+"/ces/save",
                type : $form.attr('method'),
                processData : false,
                contentType : false,
                dataType : 'json',
                data : fd,
                success: function (data, textStatus, jqXHR) {
                    if(data.code===0){
                        switchPage("/ces/init");
                    }else{
                        bootBoxError(data.msg);
                    }
                    endLoading();
                }
            });
        }
    });

    Validator.validate($("#add-ces-form"), {
        rules: {
            name: {
                required: true
            },
            examTime: {
                required: true
            },
            examTimeLength: {
                required: true,
                digits:true
            },
            generateMode: {
                required: true
            },
            answerMode: {
                required: true
            },
            questionTypeStrategyId: {
                required: true
            },
            repeatTimes:{
                required:true,
                digits:true,
                min:1
            }
        },
        messages: {
            name: {
                required: "策略名字不能为空!"
            },
            examTime: {
                required: "考试时间不能为空!"
            },
            examTimeLength: {
                required: "考试时长不能为空!",
                digits:"考试时长只能为数字!"
            },
            generateMode: {
                required: "组卷模式不能为空!"
            },
            answerMode: {
                required: "答题方式不能为空!"
            },
            questionTypeStrategyId: {
                required: "题型分布策略不能为空!"
            },
            repeatTimes:{
                required:"重考次数不能为空",
                digits:"重考次数只能为数字",
                min:"最小值只能为{0}"
            }
        },
        submitHandler: function (form) {


        }
    });


    $("#back").click(function(){
         switchPage("/ces/init")
    })

});
