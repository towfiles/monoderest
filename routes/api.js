/**
 * Created by TOBY-PAD on 8/20/2016.
 */

var express = require('express');
var func    = require('../functions/func');
var router = express.Router();
var parameters;
var db;

/* rest get api crud*/
router.get('/*', function(req, res, next) {
    db = req.db;
    parameters = req.query;
    //validation
    if(!func.isObjEmptyOrNotExist(parameters)){

            //validate query before processing
            var err = func.queryValidator(parameters,req);
            if(err.msg !== "ok"){
                res.status(err.status).json({message: err.msg});
            }
            else {
                var processedQuery = func.queryProcessor(parameters);
                console.log(processedQuery);
                db.collection(processedQuery.collections)
                    .find(processedQuery.filter, processedQuery.column)
                    .toArray(function (e, docs) {
                        res.status(200).json(docs);
                    })
               

            }

    }
    else{
        var err = func.functionHandler(1, "");
        res.status(err.status).json({message: err.msg});

    }

});

router.post("/*", function(req, res, next){
    db = req.db;
    parameters = req.query;
    if(func.isObjEmptyOrNotExist(parameters) === false){

        //validate query before processing
        var err = func.queryValidator(parameters,req);
        if(err.msg !== "ok"){
            res.status(err.status).json({message: err.msg});
        }
        else {
            var insertData = req.body;
            var schemaValid = func.compareSchema(insertData,parameters.collections);
            console.log(typeof schemaValid);
            if(typeof schemaValid == "boolean"){
                db.collection(parameters.collections).insert(insertData, function(e, docs){
                 if(e === null){
                 res.status(200).json(docs.insertedIds);

                 }
                 else {
                 res.status(500).json({"code" : e.code, "message": e.errmsg});
                 }

                 });
            }
            else {
                res.status(500).json({message: schemaValid});
            }

        }


    }
    else{
        var err = func.functionHandler(1, "");
        res.status(err.status).json({message: err.msg});

    }


});

router.put("/*", function(req, res, next){
    db = req.db;
    parameters = req.query;
    if(func.isObjEmptyOrNotExist(parameters) === false){

        //validate query before processing
        var err = func.queryValidator(parameters,req);
        if(err.msg !== "ok"){
            res.status(err.status).json({message: err.msg});
        }
        else {
            if(!func.isObjEmptyOrNotExist(req.body.whereData)){
                var whereData  = req.body.whereData;
                var updateData = req.body.updateData;
                db.collection(parameters.collections).update(whereData,{$set : updateData},
                    function(e,docs) {
                        console.log(e);
                        console.log(docs);
                        if(e === null){
                            res.status(200).json(docs.result.nModified);

                        }
                        else {
                            res.status(500).json({"code" : e.code, "message": e.errmsg});
                        }
                    }
                );
            }
            else{
                var err = func.functionHandler(1, "");
                res.status(err.status).json({message: err.msg});
            }

        }

    }
    else{
        var err = func.functionHandler(1, "");
        res.status(err.status).json({message: err.msg});

    }


});

router.delete("/*", function(req, res, next){
    db = req.db;
    parameters = req.query;
    if(func.isObjEmptyOrNotExist(parameters) === false){

        //validate query before processing
        var err = func.queryValidator(parameters,req);
        if(err.msg !== "ok"){
            res.status(err.status).json({message: err.msg});
        }
        else {


        }

    }
    else{
        var err = func.functionHandler(1, "");
        res.status(err.status).json({message: err.msg});

    }


});






module.exports = router;

