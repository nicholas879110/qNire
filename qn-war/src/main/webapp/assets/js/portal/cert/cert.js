/**
 * 实名认证.
 * Created by Dendy on 2014/8/5.
 */
$(function () {
    //分步向导
    var $validation = true;
    var form = $('cert-form');
    $('#fuelux-wizard').ace_wizard().on('change', function (e, info) {
    }).on('finished', function (e) {
    }).on('stepclick', function (e) {
        return false;//prevent clicking on steps
    });

    var certResult = $('#cert-status').val();

    switch (certResult) {
        case Constant.CertificateStatus.NOT_AUDIT :
            _activeStep(3);
            $('#cert-status-msg').html("您的实名认证请求已经成功提交，请耐心等待审核结果！");
            break;
        case Constant.CertificateStatus.PASS :
            _activeStep(4);
            $('#cert-result-msg').html("恭喜，您的实名认证请求已经通过审核，<br><br>现在可以进行证件报考、升级等操作了！");
            break;
        case Constant.CertificateStatus.NOT_PASS :
            _activeStep(4);
            $('#cert-result-msg').html("抱歉，您的实名认证请求未通过审核！<br><br>原因及意见：" + $('#cert-opinion').val());
            break;
        default :
    }

    function _activeStep(step) {
        $('#fuelux-wizard').data('wizard').currentStep = step;
        $('#fuelux-wizard').data('wizard').setState();
    }

    $('#page-content').on('click', '#before-apply-btn', function () {
        $('#fuelux-wizard').wizard('next');
    });

    $("#apply-btn").click(function(){
        switchPage("/u/stu/cert/apply");
    })
});

function showInfoEdit(){
    switchPage("/u/stu/info/edit")
}