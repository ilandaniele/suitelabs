define('PayPalOptions.PDP.View', [
    'paypal_options_pdp.tpl',
    'Item.Model',
    'SCView'
], function PayPalOptionsPDPViewModule(
    PayPalOptionsPDPTpl,
    ItemModel,
    SCViewComponent
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function PayPalOptionsPDPView(options) {
        SCView.call(this);

        this.pdp = options.pdp;
        this.template = PayPalOptionsPDPTpl;
    }

    PayPalOptionsPDPView.prototype = Object.create(SCView.prototype);

    PayPalOptionsPDPView.prototype.constructor = PayPalOptionsPDPView;

    PayPalOptionsPDPView.prototype.getContext = function getContext() {
        var itemInfo = this.pdp.getItemInfo();
        var priceContainer;
        var price;
        var item;

        if (itemInfo && itemInfo.item) {
            item = new ItemModel(itemInfo.item);
            priceContainer = item.getPrice();
            price = priceContainer.price || 0;
        }

        return {
            price: price,
            showMessage: !!price
        };
    };

    return PayPalOptionsPDPView;
});
