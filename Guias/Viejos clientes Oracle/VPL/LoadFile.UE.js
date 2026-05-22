/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

  define([
      'N/file',
      'N/log'
  ], function LoadFileUE(
    nFile,
    nLog
    ) {
      'use strict';

      var doAfterSubmit = function doAfterSubmit(context) {
            
        try {
            var pdfFile = nFile.load({
                id: 'Web Site Hosting Files/Live Hosting Files/site/assets/Downloads/000041E.pdf'
            });
            
            nLog.debug({
                title: 'pdf file',
                details: pdfFile
            });
    
            var pdfCaption = pdfFile.getValue({
                fieldId: 'caption'
            });
            
            var pdfSiteDescription = pdfFile.getValue({
                fieldId: 'sitedescription'
            });
            
            nLog.debug({
                title: 'pdf caption',
                details: pdfCaption
            });
            
            nLog.debug({
                title: 'pdf site description',
                details: pdfSiteDescription
            });
        
        } catch (e) {
            nLog.debug({
              title: 'error',
              details: e
          });
        }
        
      };

      return {
          afterSubmit: function afterSubmit(context) {
              doAfterSubmit(context);
              nLog.debug({
                  title: 'afterSubmit',
                  details: 'This is executed after submit'
              });
          },

          beforeSubmit: function beforeSubmit() {
              nLog.debug({
                  title: 'beforeSubmit',
                  details: 'This is executed before submit'
              });
          }
      };
  });
