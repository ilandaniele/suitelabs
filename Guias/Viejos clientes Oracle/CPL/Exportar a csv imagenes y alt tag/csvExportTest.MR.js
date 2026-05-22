/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*/
define([
    'N/file',
  	'N/log',
	'N/runtime',
	'N/record'
], function csvExportTest(
    nFile,
  	nLog,
	nRuntime,
	nRecord
) {
    'use strict';
​
    function getInputData() {
		
		// cargo la carpeta o lo que sea que tenga las imagenes
		var fileId = nRuntime.getCurrentScript().getParameter('custscript_csv_file_id');

		var file = nFile.load({
            id: fileId
        });
		
		
		nLog.debug('file', JSON.stringify(file));
		return file;
		
		//aca leer de alguna forma la carpeta, para pasarle una lista al map con los archivos con su internal id que sean imagenes.
    }
​
    function map(context) {
		
		// aca leería cada uno de estos files y llamaria al SOAP.
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
		
		context.write({
			key: context.key,
			value: context.values[0]
		});
       
    };
	
	function summarize(context) {		
		var csvFile = nFile.create({
			name: 'altImageExport.csv',
			contents: 'image path,alt tag\n',
			folder: 69341, //ID de la folder
			fileType: 'CSV'
		});

		// Agrego la data al CSV nuevo
        context.output.iterator().each(function(key, value) {
			nLog.debug('key',key);
			nLog.debug('value',value);
			
			var alt = value ? value : 'NO ALT';
			
			var line = key + ','+ alt;
			
			nLog.debug('line',line);
			
			csvFile.appendLine({
				value: line
			});

            return true;
        });

        var fileId = csvFile.save();

        log.audit({
            title: 'Id of new file record',
            details: fileId
        });
    };
​
    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
		summarize: summarize
    };
});
