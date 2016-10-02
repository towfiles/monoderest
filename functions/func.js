/**
 * Created by TOBY-PAD on 8/21/2016.
 */

var func = {

    functionHandler : function (errCode,field) {
        var msg = "";
        var status;
        switch(errCode) {
            case 1: 
                msg = "Incorrect parameter syntax";
                status = 500;
                break;
            case 2:
                msg = field + " query field not specified";
                status = 500;
                break;
            case 3:
                msg = field;
                status = 500;
                break;
            default:
                msg = "Unknown error occured, please try again";
                status = 500;
                break;
        }

        return {
            msg    : msg,
            status : status
        };
    },

    isObjEmptyOrNotExist : function(obj) { //check if object exist
        if(typeof obj !== "undefined"){
            return !Object.keys(obj).length;
        }
        else {
            return true;
        }

    },

    queryValidator : function(query,req){
        if(this.isObjEmptyOrNotExist(query.collections)){

            return this.functionHandler(2, "collections");
        }
        else if(this.isObjEmptyOrNotExist(query.column) && req.method == "GET"){

            return this.functionHandler(2, "column");
        }
        else if( typeof query.filter === "string"){
            if(query.filter == ""){
                return this.functionHandler(3, "no filters were passed in the field");
            }
            else{
                return {msg:"ok"};
            }

        }
        else {
            return {msg:"ok"};
        }

    },


    queryProcessor : function(query){

        return {
                collections : query.collections,
                column      : (query.column == "*")? {} :  query.column.split(","),
                filter      : (!this.isObjEmptyOrNotExist(query.filter)) ? this.processFilter(query.filter) : {}
        };


    },


    processFilter  : function(filter){ //filter processing algorithm
        var newfilter = "";
        var start     = "";
        for(var i = 0; i < filter.length; i++){
            if(filter.charAt(i) == "-" && filter.charAt(i+1) == "["){ // minus sign is OR
                    var changeOR = '{"$or":';

                newfilter = newfilter +  changeOR;
            }
            else if(filter.charAt(i) == "*" && filter.charAt(i+1) == "["){ // asterik sign is AND
                var changeOR = '{"$and":';

                newfilter = newfilter +  changeOR;
            }

            else{
                if(filter.charAt(i) == "]"){
                    newfilter = newfilter + "]}";
                }
                else{
                    newfilter = newfilter + filter.charAt(i);
                }

            }

        }
        newfilter = JSON.parse(newfilter);
        return newfilter;
    },



    IsJsonString :function (str) {
        console.log(str);
        try {
            JSON.parse(str);
        } 
        catch (e) {
            return false;
        }
        return true;
    },
    
    
    compareSchema : function (data,collection) {
        var schema  = require('../schema.json');
        var schemaColumns = [];
        if(schema[collection]){
            schema[collection]._id = "object";
            for(det in schema[collection]){
                schemaColumns.push(det);
            }
            console.log(schemaColumns);
            for(det2 in data){
                if(schemaColumns.indexOf(det2) === -1){
                    return "column " + det2 + " does not exist";
                }
            }
            return true;
        }
        else {
            return "collection schema does not exist";
        }

        
    }


};


module.exports = func;
