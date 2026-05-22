define('Jewelry.LiveOrder.ServiceController', [
    'LiveOrder.ServiceController',
    'LiveOrder.Model',
    'SiteSettings.Model',
    'underscore'
], function JewelryLiveOrderServiceController(
    LiveOrderServiceController,
    LiveOrderModel,
    SiteSettings,
    _
) {
    'use strict';

    _.extend(LiveOrderServiceController, {
        post: function post() {
            var confirmation;
            var orderInfo;
            var jewelrySummary;
            this.setShopperCurrency();

            LiveOrderModel.checkItemsAvailability();

            // Updates the order with the passed in data
            LiveOrderModel.update(this.data);

            jewelrySummary = LiveOrderModel.get();
            jewelrySummary = jewelrySummary.summary;
            jewelrySummary = jewelrySummary.jewelry;

            // Submit the order
            confirmation = LiveOrderModel.submit();
            confirmation.summary.jewelry = jewelrySummary;
            // Get the new order
            orderInfo = LiveOrderModel.get();

            // Set the confirmation
            orderInfo.confirmation = confirmation;

            // Update touchpoints after submit order
            orderInfo.touchpoints = SiteSettings.getTouchPoints();

            return orderInfo;
        }
    });
});
