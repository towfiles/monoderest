/**
 * Created by TOBY-PAD on 8/21/2016.
 */

var func = {
    functionHandler : function (errCode,field) {
        var msg = "";
        var status;
        var err = {};
        if (errCode == 1) {
            msg = "incorrect parameter syntax";
            status = 500;
        }
        else if (errCode == 2) {
            msg = field + " query field not specified";
            status = 500;
        }
        else if (errCode == 3) {
            msg = field;
            status = 500;
        }

        err.msg    = msg;
        err.status = status;
        return err;
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
        //validate all compusulsory queries
        if(this.isObjEmptyOrNotExist(query.document)){

            return this.functionHandler(2, "document");
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

        var processedQuery = {};
        processedQuery.document = query.document;
        if(query.column == "*"){
            processedQuery.column = {};
        }
        else {
            processedQuery.column = query.column.split(",");
        }
        //filters are optional
        if(!this.isObjEmptyOrNotExist(query.filter)){
            processedQuery.filter = this.processFilter(query.filter);
        }

        return processedQuery;

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
        console.log(newfilter);
        newfilter = JSON.parse(newfilter);
        return newfilter;
    }





};


module.exports = func;