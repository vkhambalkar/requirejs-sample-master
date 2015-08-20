/**
 * Created by vijay on 8/16/2015.
 */
define(function(){
    function LineChart(elementId,model){
        //var seriesList =  model.getSeries();

        function convertSeries(seriesList){
            //make columns
            var columns = [];
            var series = [];
            for(var i=0;i<seriesList.length; i++){
                series = [seriesList[i].field].concat(seriesList[i].values);
                columns.push(series);
            }

            return columns;
        }



        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                    .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                    .transitionDuration(350)  //how fast do you want the lines to transition?
                    .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                    .showYAxis(true)        //Show the y-axis
                    .showXAxis(true)        //Show the x-axis
                ;

            chart.xAxis     //Chart x-axis settings
                .axisLabel('Time (ms)')
                .tickFormat(d3.format(',r'));

            chart.yAxis     //Chart y-axis settings
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format('.02f'));

            /* Done setting the chart up? Time to render it!*/
            var myData = sinAndCos();   //You need data...

            d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.
                .datum(myData)         //Populate the <svg> element with chart data...
                .call(chart);          //Finally, render the chart!

            //Update the chart when window resizes.
            nv.utils.windowResize(function() { chart.update() });
            return chart;
        });
    }

    return LineChart;
})