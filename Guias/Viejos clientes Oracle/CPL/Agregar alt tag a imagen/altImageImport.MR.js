/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*/
define([
    'N/file',
  	'N/log',
	'N/runtime',
	'N/record'
], function AltImageImport(
    nFile,
  	nLog,
	nRuntime,
	nRecord
) {
    'use strict';
​
    function getInputData() {
		var fileId = nRuntime.getCurrentScript().getParameter('custscript_file_id');
		
		var file = nFile.load({
            id: fileId
        });
		
		nLog.debug('file', JSON.stringify(file));
		return file;
    }
​
    function map(context) {
		nLog.debug('entered','Entered map');
        var csvData = context.value.split(';');
        var imagePath = csvData[0];
		var alt = csvData[1];
		
		context.write({
                key: imagePath,
                value: alt
        });
    };
​
    function reduce(context) {
        nLog.debug('entered reduce',context.key);
		nLog.debug('entered reduce',context);
		try{
            var file = nFile.load({
                id: context.key
            });
			
			
			// file.fileType =
			var record = nRecord.load({
				type: 'file',
				id: context.key,
				
			});
			nLog.debug('file loaded', record);
			
			// no esta cargando el alt tag, el resto anda bien
			nLog.debug('file loaded', file);
			file.setValue({
				fieldId: 'alttagcaption',
				value: context.values[0]
			});
			
			// file.alttagcaption = context.values[0];
			
			var fileId = file.save();
            
        } catch(ex) {
             nLog.error('error', JSON.stringify(ex));
        }
    }
​
    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce
    };
});
