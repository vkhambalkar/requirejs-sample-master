/**
 * Created by vijay on 8/16/2015.
 */
require.config({
    shim: {
        angular: {
            exports: "angular"
        }
    },
    paths: {
        'angular': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.4/angular'
    }
});

require(["greetings","ChartModel","C3_LineChart","HighChart_LineChart","angular", "RESTDataService"],
    function( greetings, ChartModel,C3LineChart, HLineChart,angular,RESTDataService){

        var stockModel = new ChartModel("stock");
            stockModel.fields = [
                {"column":"date", "field":"tradeDate", "label":"Date", series:false},
                {"column":"appleS", "field":"applePrice","label":"Apple Price"},
                {"column":"microsoft", "field":"microsoftPrice","label":"Microsoft Price"},
                {"column":"google", "field":"googlePrice","label":"Google"}
            ];

        var restService = new RESTDataService("data/chart-data.json");
            restService.registerModel(stockModel);


        //var chartModel = new ChartModel("chartId");

        $(document).ready(function(){
            return;

            new C3LineChart("chart", stockModel);

            new HLineChart("container",stockModel);
        })
        var chartApp = angular.module("chartApp",[]);

        chartApp.controller("MainCtrl", function($scope, $http){
            $scope.welcome = "Welcome to Angular with Require JS wow it changed";



        })



        chartApp.directive('c3LineChart', function() {
            return {
                template: '<div></div>',
                replace:true,
                restrict: 'E',
                link: function(scope, element, attrs) {
                    new C3LineChart(element.attr("id"), stockModel);
                }
            };
        });

        chartApp.directive('highLineChart', function() {
            return {
                template: '<div></div>',
                replace:true,
                restrict: 'E',
                link: function(scope, element, attrs) {
                    new HLineChart(element.attr("id"),stockModel);
                }
            };
        });

        angular.bootstrap(document,["chartApp"]);

});