define('PepperJamTracker', [
    'jQuery',
    'LiveOrder.Model',
    'Configuration',
    'underscore'
], function PepperJamTracker(
    jQuery,
    LiveOrderModel,
    Configuration,
    _
) {

    var getItemsInStringFormat = function getItems() {
        var lines = JSON.parse(sessionStorage.getItem('cartLines'));
        var items = '';

        _.each(lines, function eachLine(line, idx) {
            var itemNumber = idx + 1;
            var item = line.item;
                items += '&ITEM_ID' + itemNumber + '=' + item.internalid + '&' +
                'ITEM_PRICE' + itemNumber + '=' + line.rate + '&' +
                'QUANTITY' + itemNumber + '=' + line.quantity;
        });

        return items;
    };

    return {
        trackTransaction: function trackTransaction(transaction) {
            var liveOrderInstance = LiveOrderModel.getInstance();
            var pepperJamConfiguration = Configuration.get('PepperJamTracking');
            var clickIdParameter = sessionStorage.getItem('clickId');
            var items = getItemsInStringFormat(liveOrderInstance);
            var soId = transaction.get('confirmationNumber');

            var iframeCode = '<iframe src="' + pepperJamConfiguration.baseUrl + 
                         '?' + 'INT=' + pepperJamConfiguration.integrationType + 
                         '&' + 'PROGRAM_ID' + '=' + pepperJamConfiguration.programId +
                         '&' + 'ORDER_ID' + '=' + soId +
                         '&' + 'CLICK_ID' + '=' + clickIdParameter +
                         items + 
                         '" width="1" height="1" frameborder="0"></iframe>';
            _.defer(function() {
                jQuery('[data-view="OrderWizard.AfterConfirmation"]').append(iframeCode);
                sessionStorage.removeItem('clickId');
                sessionStorage.removeItem('cartLines');
            });
        }
    }

});
