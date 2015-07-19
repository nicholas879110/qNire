jQuery(function ($) {

    $("#save-gloab-test-strategy").click(function(){
        var $form=$("#gloab-test-strategy-form");
        var fd = new FormData($form.get(0));
        $.ajax({
            url : getContentPath()+"/gts/save",
            type : $form.attr('method'),
            processData : false,
            contentType : false,
            dataType : 'json',
            data : fd,
            success: function (data, textStatus, jqXHR) {
                if(data.code===0){
                    switchPage("/gts/init")
                }else{
                    bootBoxError(data.msg);
                }
            }
        });
    });

    $("#showEdit").click(function(){
        $("#gloab-test-strategy-form").removeClass("hide");
        $("#gloab-test-strategy-detail").addClass("hide");
    });


    $("#back").click(function(){
//        $("#gloab-pratice-strategy-form").addClass("hide");
//        $("#gloab-pratice-strategy-detail").removeClass("hide");
        switchPage("/gts/init")
    });

});
