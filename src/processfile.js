"use strict"

const express = require('express');
const router = express.Router();
const multer = require('multer');
const mammoth = require('mammoth');
const htmljson = require('html-to-json');

//File stored on buffer
const storage = multer.memoryStorage();

/* Disk storage file system
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname.replace('routes','')+'/uploads/');
    },
    filename: function(req, file, cb){
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp+'.'+ file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
}) */

const upload = multer({
    storage: storage
}).single('file');

router.post('/', function(req, res){
    upload(req, res, function(err){
        if(err){
            res.json({error_code:1, res: err});
            return;
       }       
       mammoth.convertToHtml({buffer: req.file.buffer})       
       .then(function(html){                 
            res.json({error_code:0, res: html});
            return;
       })       
       .catch(function (err){
           res.json({error_code:1, res:{value:"", messages: {type: "error", message:"No se puede procesar el archivo. Por favor, asegurese de utilizar el formato de documentos de office."} }});
           return;
       })
       .done()
        
    })    
});

module.exports = router;