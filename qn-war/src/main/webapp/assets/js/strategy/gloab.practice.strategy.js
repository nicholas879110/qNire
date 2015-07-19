jQuery(function ($) {

    $("#save-gloab-pratice-strategy").click(function(){
        var $form=$("#gloab-pratice-strategy-form");
        var fd = new FormData($form.get(0));
        $.ajax({
            url : getContentPath()+"/gps/save",
            type : $form.attr('method'),
            processData : false,
            contentType : false,
            dataType : 'json',
            data : fd,
            success: function (data, textStatus, jqXHR) {
                if(data.code===0){
//                    $("#gloab-pratice-strategy-form").addClass("hide");
//                    $("#gloab-pratice-strategy-detail").removeClass("hide");
                    switchPage("/gps/init")
                }else{
                    bootBoxError(data.msg);
                }
            }
        });
    });


    $("#showEdit").click(function(){
        $("#gloab-pratice-strategy-form").removeClass("hide");
        $("#gloab-pratice-strategy-detail").addClass("hide");
    });


    $("#back").click(function(){
//        $("#gloab-pratice-strategy-form").addClass("hide");
//        $("#gloab-pratice-strategy-detail").removeClass("hide");
        switchPage("/gps/init")
    });

});
