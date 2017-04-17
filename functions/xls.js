/**
 * Created by ran.styr on 19/01/2017.
 */
let XLSX = require('xlsx');
let Database = require('../database/db');
let _ = require('lodash');

let xls = {

    readFile: function (filePath) {
        let localFilename = __dirname + filePath;
        console.log('localFilename - ' + localFilename);
        console.log('filePath - ' + filePath);

        let fileData = XLSX.readFile(filePath);
        console.log('fileData');
        return fileData;

    },

    sheetToJSON: function (sheetData , key) {
        let json = XLSX.utils.sheet_to_json(sheetData,{raw: true});
        console.log('sheetToJSON' + key);
        return json;
    }
};


module.exports = xls;
