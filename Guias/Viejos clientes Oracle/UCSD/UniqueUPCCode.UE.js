/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */
define([
    'N/record',
    'N/log',
    'N/search'
], function UniqueUPCCode(
    nRecord,
    nLog,
    nSearch
    ) {
        'use strict';

        var doBeforeSubmit = function doBeforeSubmit(context) {
            try {
                var hasSomeResult = false;
                var item = context.newRecord;
                var oldItemId = context.oldRecord ? context.oldRecord.id : '';
                
                nLog.debug({
                    title: 'oldRecord',
                    details: oldItemId
                });
                
                var UPCCode = item.getValue({
                  fieldId: 'upccode'
                });
                
                nLog.debug({
                    title: 'new upc code',
                    details: UPCCode
                });

                var mySearch = nSearch.create({
                  type: nSearch.Type.ITEM,
                  columns: ['internalid', 'itemid', 'upccode'],
                  filters: ['upccode', nSearch.Operator.IS, UPCCode]
                }).run().each(function(result) {
                    nLog.debug({
                        title: 'result',
                        details: result
                    });
                    
                    if (parseInt(result.id, 10) !== parseInt(oldItemId, 10)) {
                       hasSomeResult = true;
                    }
                    
                    return true;
                });

                if (hasSomeResult) {
                    throw new Error('There was an error. The UPC Code selected has already been used');
                }
            } catch (e) {
                nLog.error({
                    title: 'Errors ',
                    details: JSON.stringify(e)
                });
                throw JSON.stringify(e);
            }
        };
        
        return {
            beforeSubmit: function beforeSubmit(context) {
                if (context.type === context.UserEventType.EDIT || context.type === context.UserEventType.CREATE) {
                    doBeforeSubmit(context);
                }
                nLog.debug({
                    title: 'beforeSubmit',
                    details: 'This is executed after submit'
                });
            } 
        };
});
