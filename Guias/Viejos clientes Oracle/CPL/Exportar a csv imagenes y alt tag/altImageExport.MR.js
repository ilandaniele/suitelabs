/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*/
define([
    'N/file',
  	'N/log',
	'N/runtime',
	'N/record'
], function AltImageExport(
    nFile,
  	nLog,
	nRuntime,
	nRecord
) {
    'use strict';
​
    function getInputData() {
		
		// cargo la carpeta o lo que sea que tenga las imagenes
		var fileId = nRuntime.getCurrentScript().getParameter('custscript_file_id');
		
		var file = nFile.load({
            id: fileId
        });
		
		
		nLog.debug('file', JSON.stringify(file));
		return file;
		
		//aca leer de alguna forma la carpeta, para pasarle uina lista al map con los archivos con su internal id que sean imagenes.
    }
​
    function map(context) {
		
		// aca leería cada uno de estos files y llamaria al SOAP.
		// nLog.debug('entered','Entered map');
        // var csvData = context.value.split(';');
        // var imagePath = csvData[0];
		// var alt = csvData[1];
		
		// context.write({
                // key: imagePath,
                // value: alt
        // });
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
			
			
			//REDUCE WRITE KEY AND VALUE
            
        } catch(ex) {
             nLog.error('error', JSON.stringify(ex));
        }
    };
	
	function summarize(context) {		
		var csvFile = nFile.create({
			name: 'altImageExport',
			contents: 'image path,alt tag\n',
			folder: 39, //ID de la folder
			fileType: 'CSV'
		});

		// Agrego la data al CSV nuevo
        context.output.iterator().each(function(key, value) {
			csvFile.appendLine({
				value: key+','+ value ? value : 'NO ALT'
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
