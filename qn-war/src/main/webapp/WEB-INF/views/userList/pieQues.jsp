<%@ page contentType="text/html;charset=UTF-8" language="java" %>


		<%--<script type="text/javascript" src="${ctx}/assets/js/jquery-2.1.0.js"></script>--%>
		<style type="text/css">
${demo.css}
		</style>

<script src="${ctx}/assets/js/highcharts.js"></script>
<script src="${ctx}/assets/js/modules/exporting.js"></script>

<div id="container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>

<script type="text/javascript">
    $(function () {
        $('#container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '回答问题数统计'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage}',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: "回答问题数",
                colorByPoint: true,
                data: [{
                    name: "已回答问题",
                    y: 56
                }, {
                    name: "未回答问题",
                    y: 24,
                    sliced: true,
                    selected: true
                }/*, {
                 name: "Firefox",
                 y: 10.38
                 }, {
                 name: "Safari",
                 y: 4.77
                 }, {
                 name: "Opera",
                 y: 0.9100000000000001
                 }, {
                 name: "Proprietary or Undetectable",
                 y: 0.2
                 }*/]
            }]
        });
    });
</script>

