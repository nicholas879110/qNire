<%@ page contentType="text/html;charset=UTF-8" language="java" %>


		<%--<script type="text/javascript" src="${ctx}/assets/js/jquery-2.1.0.js"></script>--%>
		<style type="text/css">
${demo.css}
		</style>

<script src="${ctx}/assets/js/highcharts.js"></script>
<script src="${ctx}/assets/js/modules/exporting.js"></script>
<div id="container1" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
<div id="container2" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>

<script type="text/javascript">


    $(function () {

        $('#container1').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '每天发布/回复统计'
            },
            subtitle: {
                text: '---------------'
            },
            xAxis: {
                categories: [
                    '2015-07-11',
                    '2015-07-12',
                    '2015-07-13',
                    '2015-07-14',
                    '2015-07-15',
                    '2015-07-16',
                    '2015-07-17',
                    '2015-07-18',
                    '2015-07-19',
                    '2015-07-20',
                    '2015-07-21'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '发布/回复 (人数)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} 人</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: '发布',
                data: [50, 100, 106, 129, 144, 176, 135, 148, 216, 194, 95]

            }, {
                name: '回复',
                data: [30, 78, 98, 93, 106, 84 ,105, 104, 91, 83, 106]

            }/*, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

            }*/]
        });

        $('#container2').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '累积发布/回复人数统计'
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
                        format: '<b>{point.name}</b>: {point.y}人',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: "发布/回复",
                colorByPoint: true,
                data: [{
                    name: "发布",
                    y: 1000
                }, {
                    name: "回复",
                    y: 500,
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

