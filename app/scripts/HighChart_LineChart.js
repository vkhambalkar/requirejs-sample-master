define(function(){
    function LineChart(elementId,model){
        //make columns
        function convertSeries(seriesList){
            var columns = [];
            var series;
            for(var i=0;i<seriesList.length; i++){

                series = {
                    name: seriesList[i].label,
                    data: seriesList[i].data
                }

                columns.push(series);
            }

            return columns;
        }

        var _series = convertSeries(model.getSeries());
        var _element = "#"+elementId;

        $(_element).highcharts({
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Data1', 'Data2']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: _series
        });
    }

    return LineChart;
})