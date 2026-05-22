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

            new_adjustment: function() {
                if(/service_name=InventoryAdjustments/.test(window.location.href)) {
                    window.location = window.location.href.replace('InventoryAdjustments', 'AdjustInventory');
                    return;
                }
                window.location = window.location.href + '&service_name=AdjustInventory';
            }
        };

        return function(){
            client.pageInit();
            return client;
        }();
    });