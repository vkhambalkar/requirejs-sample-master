/**
 * Created by vijay on 8/19/15.
 */
define(function(){

    console.log("Loaded");
    return function ChartBuilder(){
         require(["angular", "C3_LineChart", "ChartModel", "jquery"], function(angular,C3LineChart,ChartModel){
            var app = angular.module("chartBuilderApp",[]);




             var stockModel = new ChartModel("stock");
             stockModel.fields = [
                 {"column":"date", "field":"tradeDate", "label":"Date", series:false},
                 {"column":"appleS", "field":"applePrice","label":"Apple Price"},
                 {"column":"microsoft", "field":"microsoftPrice","label":"Microsoft Price"},
                 {"column":"google", "field":"googlePrice","label":"Google"}
             ];
             stockModel.onData( {values: [
                 {"date":"07-01-2015", "appleS":"70", "microsoft":"100", "google":1},
                 {"date":"07-02-2015", "appleS":"80", "microsoft":"90", "google":2},
                 {"date":"07-03-2015", "appleS":"90", "microsoft":"80", "google":6},
                 {"date":"07-04-2015", "appleS":"100.00", "microsoft":"70", "google":10}

             ]});


             var currentChart;

            app.controller("MainCtrl", function($scope, $http){
                var vm = this;
                $scope.welcome = "Welcome to Chart Builder";


                var vm = this;
                $scope.model = vm.model = stockModel;

                vm.series = stockModel.getSeries();
                vm.charts = [];
                vm.addNew = function(){
                    $scope.chartModel = stockModel;
                    vm.charts.push({"title":"New Chart"})
                }
                vm.refreshChart = function(){
                    stockModel.fields = vm.series;
                    currentChart.render();

                }
                vm.export = function(){
                    console.log(JSON.stringify(stockModel.fields));
                    alert("application ready, please copy to web-client")
                }
            })

             app.directive('c3LineChart', function() {
                 var uniqueId = 1;
                 return {

                     replace:true,
                     restrict: 'E',
                     scope:{
                         chartModel:'=chartData'
                     },
                     link: function(scope, element, attrs) {
                         var elementId = "chart"+ uniqueId;
                         console.log(scope.chartModel);
                         element.attr("id", elementId)
                         currentChart = new C3LineChart(elementId, stockModel);
                         currentChart.render();
                         uniqueId++;

                         scope.$watch("chartModel", function(newVal, oldVal){
                             console.log("model changed")
                             console.log(oldVal, ">",   newVal);
                         })
                     }
                 };
             });

            angular.bootstrap(document,["chartBuilderApp"]);
        });


    }
})
