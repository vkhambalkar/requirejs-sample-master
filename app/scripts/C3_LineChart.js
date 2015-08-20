/**
 * Created by vijay on 8/16/2015.
 */
define(function(){
    function LineChart(element,model){
        var elm = '#'+element,
            chart;

        if(!model)
        {
            throw  "charModel empty, please make sure chartModel is not empty"
        }
        function convertSeries(seriesList){
            //make columns
            var columns = [];
            var series = [];
            for(var i=0;i<seriesList.length; i++){
                series = [seriesList[i].field].concat(seriesList[i].data);
                columns.push(series);
            }

            return columns;
        }

        function render(){

            //console.log(model.getSeries(), convertSeries(model.getSeries()));
            var names = {};

            if(!chart){

                _.each(model.getSeries(), function(item){
                    names[item.field] = item.label
                })

                chart = c3.generate({
                    bindto: elm,
                    data: {
                        columns: convertSeries(model.getSeries()),
                        names:names
                    }

                });
                return;
            }

             _.each(model.fields, function(item){

                 console.log(item.field, item.label);
                 names[item.field] = item.label;
            })

            console.log(JSON.stringify(names))

            chart.data.names (names);
        }





        model.subscribe("change", function(){
            render();
        })

        this.render = render;
    }

    return LineChart;
})