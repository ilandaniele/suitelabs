/**
  *
  * @NApiVersion 2.0
  * @NScriptType UserEventScript
  */

define([
    'N/record',
    'N/log'
], function UpdateAssignedWebsiteLeadUE(
    nRecord,
    nLog
) {
    'use strict';

    var doBeforeSubmit = function doBeforeSubmit(context) {
        var leadRecord = context.newRecord;
        
        try {
            var assignedWebsite = leadRecord.getValue({
                fieldId: 'custentity_assigned_website'
            });
            
            if (assignedWebsite[0] === '11') {
                leadRecord.setValue({
                    fieldId: 'assignedwebsite',
                    value: assignedWebsite[0]
                });
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
            if (context.type === context.UserEventType.CREATE) {
                doBeforeSubmit(context);
            }
            nLog.debug({
                title: 'beforeSubmit',
                details: 'This is executed before submit'
            });
        }
    };
});
