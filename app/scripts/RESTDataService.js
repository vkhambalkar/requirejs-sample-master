/**
 * Created by vijay on 8/16/2015.
 */
define(function(){
    function RESTDataService(url){
        var models = [];
        this.url = url;

        this.registerModel = function(param){
            if(param instanceof  Array){
                models = models.concat(param);
            }
            else if(param){
                models.push(param);
            }

            this.load();
        }
        this.getModel = function (modelId) {
            var item = null;
            $.each(models, function(key, val){
                if(val.id === modelId){
                    item = val;
                    return false;
                }
            })

            return item;
        }

        this.load = function () {
            var _this = this;

            $.getJSON( url, function( data ) {
                var items = [];
                $.each( data, function( dataKey, val ) {
                    //items.push( "<li id='" + key + "'>" + val + "</li>" );
                    var model =  _this.getModel(dataKey);
                    //console.log("Key :" + dataKey, " Value :" + val)
                    if(model && model.onData){
                        model.onData.call(model, val);
                    }
                });
            });
        }
    }
    return RESTDataService;
})