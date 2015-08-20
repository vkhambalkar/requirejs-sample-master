/**
 * Created by vijay on 8/16/2015.
 */
define(function(){
    function ChartModel(id){

        this.id  = id;
        this.fields = [];
        this.series = [];
        this.values = [];

        this.subscriber = {}; //list of all subscription with array handler
        this.fieldMap = {};
        this.fieldDataMap = {}; //will hold all data with field name country:["INDIA", "USA"], city:["NEw Jersey","New York"]
        this.getCount = function(){
            this.values = this.values || [];
            return this.values.length;
        }
        this.getFieldByColumn = function(columnName){
            if(this.fieldMap.hasOwnProperty(columnName)){
                return this.fieldMap[columnName];

            }

            var item = null;
            $.each(this.fields, function(key, val){
                if(val.column === columnName){
                    item = val;
                    return false;
                }
            })

            if(item){
                this.fieldMap[item.field] = item;
                this.fieldDataMap[item.field] = []; //create data field to hold all data
            }

            return item;
        }

        this.subscribe = function(type, handler){
            var subscriber = this.subscriber.hasOwnProperty(type) ? this.subscriber[type] : null;
            if(subscriber == null){
                this.subscriber[type] = [];
            }

            this.subscriber[type].push(handler);


        }
    }

    ChartModel.prototype.getValues = function(){
        return ["USA","CANANDA","INDIA"];
    }

    ChartModel.prototype.getSeries = function(){
        var _this = this;
        /*return [
         {label:"Data1", field:"data1", data:[30, 200, 100, 400, 150, 250]},
         {label:"Data2", field:"data2", data:[50, 20, 10, 40, 15, 25]},
         ];*/
        /**
         * Sample Data
         * {"column":"date", "field":"tradeDate", "label":"Date"},
         {"column":"appleS", "field":"applePrice","label":"Apple Price"},
         {"column":"microsoft", "field":"microsoftPrice","label":"Microsoft Price"}
         * @type {{}}
         */
        var seriesData = [],
            item = {"label":"", "field":"", "data":[]};

        $.each(this.fields, function(index, val){
            if(!_this.fieldDataMap.hasOwnProperty(val.field)){
                _this.fieldDataMap[val.field] = [];
            }
            if(!val.hasOwnProperty("series") || val.series === true)
            seriesData.push({"label":val.label, "field":val.field, "data":_this.fieldDataMap[val.field] || []});
        })

        return seriesData;


    }

    ChartModel.prototype.onData = function(param){
        var _this = this;

        if(param == null || !param.hasOwnProperty("values")){
            throw "no data found";
        }
        var records = param.values;

        //console.log(records);
        //return false;

        this.values = [];
        var item; //each record to hold
        var fieldMap;
        var counter = 0;

        //check if data propety available, use this to hold all values for this property



        /**
         * model signature from server
         * {"column":"date", "field":"tradeDate", "label":"Date"}
         * record from server
         * {"date":"07-01-2015", "apple":"70", "microsoft":"100"},
         */
        $.each(records, function(key, record){ //loop over all records
            item = {"_id":counter++};
            $.each(record, function(key, val){ // loop over each property of record like stock, price, quantity
                fieldMap = _this.getFieldByColumn(key);


                if(fieldMap){ //check if column defined then extract value
                    item[fieldMap.field] = val;
                    //keep adding all data for given property
                    _this.fieldDataMap[fieldMap.field].push(val);
                }

            })
            _this.values.push(item);
        })




        console.log(this.values);

        if(this.subscriber.hasOwnProperty("change")){
            $.each(this.subscriber.change, function(index, handler){
                handler(_this.values);
            })
        }
    }




    return chartModel = ChartModel;
})