define('RemoveWholesaleShipping.LiveOrder.Model', [
    'SC.Models.Init',
    'Configuration',
    'Application',
    'underscore'
], function RemoveWholesaleShippingLiveOrder(
    ModelsInit,
    Configuration,
    Application,
    _
) {
    'use strict';

    var isLoggedIn;
    var isGuest;
    var wholeSaleShipmethod;

    function filterWholesaleShipmethod(model, result) {
        result.shipmethods = _(result.shipmethods).filter(function filter(shipmethod) {
            return !_(wholeSaleShipmethod).contains(shipmethod.internalid);
        });

        // in case that the selected shipmethod is not present in the available shipmethods
        // we reset the shipmethod selected
        // also calling Commerce API method to remove the shipping method from backend session
        if (_(wholeSaleShipmethod).contains(result.shipmethod)) {
            result.shipmethod = null;
            ModelsInit.order.removeShippingMethod();
        }
    }

    try {
        isLoggedIn = ModelsInit.session.isLoggedIn2();
        isGuest = ModelsInit.customer.isGuest();
        wholeSaleShipmethod = Configuration.get('extensions.removeWholesaleShipping.wholeSalesShippingIds');
        wholeSaleShipmethod = wholeSaleShipmethod ? JSON.parse(wholeSaleShipmethod) : null;
        if (!isLoggedIn || isGuest) {
            if (wholeSaleShipmethod && wholeSaleShipmethod.length > 0) {
                wholeSaleShipmethod = typeof wholeSaleShipmethod === 'object' ? wholeSaleShipmethod : [wholeSaleShipmethod]
                Application.on('after:LiveOrder.get', filterWholesaleShipmethod);
            }
        }
    } catch (e) {
        nlapiLogExecution('error', 'RemoveWholesaleShipping', JSON.stringify(e));
    }
});
