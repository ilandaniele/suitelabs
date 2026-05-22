/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(
    [
        'N/ui/dialog'
    ],function(
        dialog
    ) {
        var client = {

            pageInit: function() {
            },

            new_update: function() {
                if(/service_name=TransactionUpdates/.test(window.location.href)) {
                    window.location = window.location.href.replace('TransactionUpdates', 'UpdateTransactions');
                    return;
                }
                window.location = window.location.href + '&service_name=UpdateTransactions';
            }
        };

        return function(){
            client.pageInit();
            return client;
        }();
    });