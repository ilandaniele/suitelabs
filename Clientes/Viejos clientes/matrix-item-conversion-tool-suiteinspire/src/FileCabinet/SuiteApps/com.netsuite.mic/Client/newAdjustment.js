/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(
    [
        'N/ui/dialog',
        'N/ui/message',
        '../third_parties/underscore.js'
    ],function(
        dialog,
        message
    ) {
        var client = {

            pageInit: function(context) {
                var form = context.currentRecord;
                var error = form.getValue({fieldId: 'custpage_error'});
                if(error) {
                    error = JSON.parse(error);
                    message.create(error).show();
                }
            },

            saveRecord: function(context) {
                var form = context.currentRecord;

                var adjustmentAccount= form.getValue({fieldId: 'custpage_adjustment_account'});

                if (!adjustmentAccount) {
                    message.create({
                        title: 'Error',
                        message: 'Please select the adjustment account.',
                        type: message.Type.ERROR
                    }).show({duration: 5000});
                    return false;
                }

                return true;
            },

            cancelMicAdjustment: function cancelMICConverting() {
                if(/service_name=InventoryAdjustments/.test(window.location.href)) {
                    window.location = window.location.href.replace('AdjustInventory', 'InventoryAdjustments');
                    return;
                }
                window.location = window.location.href + '&service_name=InventoryAdjustments';
            }
            /*,

            convert: function convert(){
                var form = context.currentRecord;
                var itemidDelimiter = form.getValue({fieldId: 'custpage_matrix_delimiter'});

                if (itemidDelimiter === '-')
                {
                    message.create({
                        title: 'Error'
                        ,   message: 'Please select a website'
                        ,   type: message.Type.ERROR
                    }).show({duration: 3000});

                    return false;
                }
                return true;
            }

             */
        };

        return client;
    });