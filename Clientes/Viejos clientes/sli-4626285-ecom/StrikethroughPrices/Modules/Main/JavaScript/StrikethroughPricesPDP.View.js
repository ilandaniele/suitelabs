define('StrikethroughPricesPDP.View', [
    'strikethrough_prices_pdp.tpl',
    'SCView',
    'jQuery'
], function StrikethroughPricesPDPViewModule(
    StrikethroughPricesPDPTpl,
    SCViewComponent,
    jQuery
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function StrikethroughPricesPDPView(options) {
        var self = this;
        SCView.call(this);
        this.options = options || {};
        this.template = StrikethroughPricesPDPTpl;

        this.contextDataRequest = ['item'];

        this.options.PDP.cancelableOn('changeColorPDP', function changeColor() {
            var item = self.options.PDP.getItemInfo().item;
            var salePrice = item.pricelevel20;
            var regularPrice = item.keyMapping_price;

            if (salePrice !== regularPrice) {
                // Encontrar parent con
                jQuery('.flaming-hot-sale-price').find('.product-views-price-lead').css('color', 'red');
            }
            // self.changeSelectorColor();
        });
    }

    StrikethroughPricesPDPView.prototype = Object.create(SCView.prototype);
    StrikethroughPricesPDPView.prototype.constructor = StrikethroughPricesPDPView;
    StrikethroughPricesPDPView.prototype.getContext = function getContext() {
        return { };
    };

    return StrikethroughPricesPDPView;
});
