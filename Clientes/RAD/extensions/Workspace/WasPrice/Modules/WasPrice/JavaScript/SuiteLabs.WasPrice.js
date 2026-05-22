define('SuiteLabs.WasPrice', [
    'WasPrice.View'
], function SuiteLabsWasPrice(
    WasPriceView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var PDP = container.getComponent('PDP');
            var PLP = container.getComponent('PLP');
            var pdpChildView = {
                'Product.Price': {
                    'WasPriceView': {
                        childViewIndex: 1,
                        childViewConstructor: function WasPriceChildView() {
                            return new WasPriceView({ targetComponent: PDP });
                        }
                    }
                }
            };
            var plpChildView = {
                'Cart.QuickAddToCart': {
                    'WasPriceView': {
                        childViewIndex: 1,
                        childViewConstructor: function WasPriceChildView() {
                            return new WasPriceView({ targetComponent: PLP });
                        }
                    }
                }
            };

            PDP.addChildViews(PDP.PDP_FULL_VIEW, pdpChildView);
            PDP.addChildViews(PDP.PDP_QUICK_VIEW, pdpChildView);
            PLP.addChildViews(PLP.PLP_VIEW, plpChildView);
        }
    };
});
