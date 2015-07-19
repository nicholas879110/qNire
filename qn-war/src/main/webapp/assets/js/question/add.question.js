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
            url: getContentPath() + "/kp/l",
            otherParam: ["code",""]
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: selectNode,
            beforeClick:zTreeBeforeClick,
            beforeAsync: zTreeBeforeAsync
        }
    };

    function zTreeBeforeClick (treeId, treeNode, clickFlag) {
        return treeNode.type == Constant.ProfessionType.KNOWLEDGE_POINT;
    }

    // 异步将在之前
    function zTreeBeforeAsync (treeId, treeNode) {
        var codes = "";
        if (!treeNode) {
        } else {
            var cs = [];
            cs.push(treeNode.code);
            var pNode = treeNode.getParentNode();
            while (pNode) {
                cs.push(pNode.code);
                pNode = pNode.getParentNode();
            }
            // 需要将code反序，从上之下拼接，传递之后台
            var tmp = cs.reverse();
            codes = tmp.join(",");
        }
        $.fn.zTree.getZTreeObj(treeId).setting.async.otherParam = ["code", codes];
        return true;
    }

    function selectNode(e, treeId, treeNode) {
        var name = treeNode.name;
        var code = treeNode.code;
        //只有选择节点类型为知识点的数据时才有效
        $('#' + settins.id).val(code);
        $('#' + settins.name).val(name);
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


var optionCount=9;//单选题、多选题默认可选项为7个

/**
 * 生成单选题html
 * @returns {*}
 */
function generateSingleSelectHtml(){
    var singleSelectHtml="";
    var startOption="A";
    var startOptionCode=65;
    for(var i=0;i<optionCount;i++){
        var temp="<div class=\"radio\"><label><input name=\"answer-input\" type=\"radio\" class=\"ace\" value=\""+String.fromCharCode(startOptionCode+i)+"\"/><span class=\"lbl\">"+String.fromCharCode(startOptionCode+i)+"</span></label></div>"
        singleSelectHtml+=(temp);
    }
    return singleSelectHtml.toString();
}

function generateMultiSelectHtml(){
    var multiSelectHtml="";
    var startOption="A";
    var startOptionCode=65;
    for(var i=0;i<optionCount;i++){
        var temp="<div class=\"checkbox\"><label><input name=\"answer-input\" type=\"checkbox\" class=\"ace\" value=\""+String.fromCharCode(startOptionCode+i)+"\"/><span class=\"lbl\">"+String.fromCharCode(startOptionCode+i)+"</span></label></div>"
        multiSelectHtml+=(temp);
    }
    return multiSelectHtml.toString();
}

function generateJdugeHtml(){
    var temp="<div class=\"radio\"><label><input name=\"answer-input\" type=\"radio\" class=\"ace\" value=\"0\"/><span class=\"lbl\">正确</span></label></div>"+
        "<div class=\"radio\"><label><input name=\"answer-input\" type=\"radio\" class=\"ace\" value=\"1\"/><span class=\"lbl\">错误</span></label></div>";
    return temp;
}

function generateTextAreaHtml(){
    var temp='<textarea name="answer-input" class="form-control" name="title" placeholder=""></textarea>';
    return temp;
}




jQuery(function ($){

    //知识点加载
    var settingCustom = {
        id: 'kpId',
        name: 'kpName',
        treeId: 'kp-tree',
        divId:'select-zTree'
    }
    TreeLoader.loadCategoryTree(settingCustom);


    $("#questionType").change(function(){
        var qtCode=$(this).children('option:selected').val();
        switch (qtCode){
            case Constant.QuestionType.SingleSelect:
                $("#answerBox div.form-inline").html(generateSingleSelectHtml());
                $("#optionBox").removeClass("hide");
                $("#contentBox").removeClass("hide");
                break;
            case Constant.QuestionType.MultiSelect:
                $("#answerBox div.form-inline").html(generateMultiSelectHtml());
                $("#optionBox").removeClass("hide");
                $("#contentBox").removeClass("hide");
                break;
            case Constant.QuestionType.Jduge:
                $("#answerBox div.form-inline").html(generateJdugeHtml());
                $("#optionBox").addClass("hide");
                $("#contentBox").addClass("hide");
                break;
            case Constant.QuestionType.FillBlank:
                $("#answerBox div.form-inline").html(generateTextAreaHtml());
                $("#contentBox").addClass("hide");
                $("#optionBox").addClass("hide");
                break;
            case Constant.QuestionType.QuestionAnswer:
                $("#answerBox div.form-inline").html(generateTextAreaHtml());
                $("#contentBox").addClass("hide");
                $("#optionBox").addClass("hide");
                break;
            default :break;
        }

        if (qtCode==Constant.QuestionType.SingleSelect||qtCode==Constant.QuestionType.MultiSelect||qtCode==Constant.QuestionType.Jduge) {
            $('#content').rules("add", {
                required: true,
                messages: {
                    required: "试题内容不能为空"
                }
            });

            if(qtCode==Constant.QuestionType.Jduge){
                $('#optionCount').rules('remove');
                $('#optionCount').parents('.form-group').removeClass('has-error');
                $('#optionCount').parents('.form-group').find('.help-block').remove();

            }else {
                $('#optionCount').rules("add", {
                    required: true,
                    digits:true,
                    messages: {
                        required: "试题选项个数不能为空",
                        digits:"试题选项个数只能为数字"
                    }
                });
            }

        } else if(qtCode==Constant.QuestionType.QuestionAnswer||qtCode==Constant.QuestionType.FillBlank) {
            $('#content').rules('remove');
            $('#content').parents('.form-group').removeClass('has-error');
            $('#content').parents('.form-group').find('.help-block').remove();
        }
    })

    $("#save-qustion-button").click(function(){
        var $form=$("#add-question-form");
        if($form.valid()){
        var qtCode=$("#questionType").children('option:selected').val();
        var answer="";
        switch (qtCode){
            case Constant.QuestionType.SingleSelect:
                answer=$('#answerBox input:radio:checked').val();
                break;
            case Constant.QuestionType.MultiSelect:
                var answers=[];
                var boxs=$("#answerBox input[type='checkbox']:checked");
                $(boxs).each(function(index,obj){
                    answers.push($(this).val());
                })
                answer=answers.join(",");
                break;
            case Constant.QuestionType.Jduge:
                answer=$('#answerBox input:radio:checked').val();
                break;
            case Constant.QuestionType.FillBlank:
                answer=$('#answerBox textarea[name=answer-input]').val();
                break;
            case Constant.QuestionType.QuestionAnswer:
                answer=$('#answerBox textarea[name=answer-input]').val();
                break;
            default :break;
        }
            var fd = new FormData($form.get(0));
            fd.append("answer",answer);
            $.ajax({
                url : getContentPath()+"/question/save.do",
                type : $form.attr('method'),
                processData : false,
                contentType : false,
                dataType : 'json',
                data : fd,
                success: function (data, textStatus, jqXHR) {
                    if(data.code===0){
                        switchPage("/question/init.do");
                    }else{
                        bootBoxError(data.msg);
                    }
                }
            });
        }
    })


    Validator.validate($('#add-question-form'), {
        rules: {
            title: {
                required: true
            },
            level: {
                required: true
            },
            questionTypeCode: {
                required: true
            },
            'answer-input': {
                required: true
            }
        },
        debug : true,
        messages: {
            title: {
                required: "题目不能为空"
            },
            level: {
                required: "试题难度不能为空"
            },
            questionTypeCode: {
                required: "题型不能为空"
            },
            'answer-input': {
                required: "答案不能为空"
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



    $("#back").click(function(){
        switchPage("/question/init")
    })


})


function StringBuffer() {
    this._strs = new Array;
}
StringBuffer.prototype.append = function (str) {
    this._strs.push(str);
}
StringBuffer.prototype.toString = function() {
    this._strs.join("");
}