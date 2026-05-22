define('InventoryDisplay.PDP.View', [
    'underscore',
    'Profile.Model'
], function InventoryDisplayPDPView(
    _,
    ProfileModel
) {
    'use strict';

    var SuiteCommerceInventoryDisplayMessageRegularItemView;
    var InventoryDisplayConfiguration;

    try {
        /* eslint-disable global-require */
        SuiteCommerceInventoryDisplayMessageRegularItemView = require('SuiteCommerce.InventoryDisplay.Message.RegularItem.View');
        InventoryDisplayConfiguration = require('SuiteCommerce.InventoryDisplay.InventoryDisplay.Configuration');
        _.extend(SuiteCommerceInventoryDisplayMessageRegularItemView.ItemMessageView.prototype, {
            getStockMessage: function getStockMessage() {
                var profile = ProfileModel.getInstance();
                var isTrade = profile.get('isTrade');

                var stockMessage = '';
                if (this.isInStock()) {
                    stockMessage = this.item.custitem_ns_sc_ext_id_stock_message
                        || InventoryDisplayConfiguration.InventoryDisplayConfiguration.inStockMessageForRegularItems;
                    if (this.isUnderThreshold()) {
                        stockMessage = this.item.custitem_ns_sc_ext_id_low_stock_msg ||
                            InventoryDisplayConfiguration.InventoryDisplayConfiguration.lowStockMessage;
                    }
                } else if (isTrade && this.item.isbackorderable) {
                    stockMessage = this.item.custitem_ns_sc_ext_id_bo_msg
                        || InventoryDisplayConfiguration.InventoryDisplayConfiguration.backorderMessageForRegularItems;
                }
                return stockMessage;
            }
        });
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }
});
