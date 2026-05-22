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
                var itemidDelimiter = form.getValue({fieldId: 'custpage_matrix_delimiter'});

                if (!itemidDelimiter) {
                    message.create({
                        title: 'Error',
                        message: 'Please select the itemid delimiter.',
                        type: message.Type.ERROR
                    }).show({duration: 5000});
                    return false;
                }
                return true;
            },

            cancelMICConverting: function cancelMICConverting() {
                if(/service_name=ConvertMatrix/.test(window.location.href)) {
                    window.location = window.location.href.replace('ConvertMatrix', 'ItemConversions');
                    return;
                }
                window.location = window.location.href + '&service_name=ItemConversions';
            }

        };

        return client;
    });