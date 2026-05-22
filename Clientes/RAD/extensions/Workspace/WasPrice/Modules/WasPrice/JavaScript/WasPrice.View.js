
define('WasPrice.View', [
    'SCView',
    'was_price_view.tpl',
    'Item.Model',
    'underscore'
], function WasPriceViewModule(
    SCViewComponent,
    WasPriceTpl,
    ItemModel,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function WasPriceView(options) {
        SCView.call(this);
        this.template = WasPriceTpl;
        this.targetComponent = options.targetComponent;
        this.contextDataRequest = ['item'];
    }

    WasPriceView.prototype = Object.create(SCView.prototype);

    WasPriceView.prototype.constructor = WasPriceView;

    WasPriceView.prototype.getContext = function getContext() {
        var item = this.contextData.item && this.contextData.item();
        var wasPrice = item.custitemwasprice;
        var wasPriceFormatted = item.custitemwasprice_formatted;
        var priceObject = this.targetComponent.getPrice
            && _.isFunction(this.targetComponent.getPrice)
            ? this.targetComponent.getPrice()
            : new ItemModel(item).getPrice();
        var showWasPrice;

        if (priceObject &&
            priceObject.price &&
            wasPrice &&
            wasPriceFormatted
        ) {
            showWasPrice = wasPrice > priceObject.price;
        }

        return {
            showWasPrice: showWasPrice,
            wasPrice: wasPrice,
            wasPriceFormatted: wasPriceFormatted
        };
    };

    return WasPriceView;
});
