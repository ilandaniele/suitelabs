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

            new_conversion: function() {
                if(/service_name=ItemConversions/.test(window.location.href)) {
                    window.location = window.location.href.replace('ItemConversions', 'ConvertMatrix');
                    return;
                }
                window.location = window.location.href + '&service_name=ConvertMatrix';
            }
        };

        return function(){
            client.pageInit();
            return client;
        }();
    });