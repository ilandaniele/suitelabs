define('AwaLabs.Jewelry', [
    'Header.MiniCart.View',
    'Backbone.View',
    'Jewelry.Utils'
], function AwaLabsJewelry(
    HeaderMiniCartView,
    BackboneView,
    JewelryUtils
) {
    'use strict';

    HeaderMiniCartView.addExtraContextProperty = BackboneView.addExtraContextProperty;

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');

            if (cart) {
                JewelryUtils.cartContextDefinitions(cart);
            }

            if (layout) {
                JewelryUtils.layoutContextDefinitions(layout, environment);
            }

            if (pdp) {
                ['ProductDetails.Full.View', 'ProductDetails.QuickView.View'].forEach(function eachView(viewId) {
                    pdp.addToViewContextDefinition(viewId, 'isJewelry', 'boolean', function isJewelry(context) {
                        return JewelryUtils.isJewelry(context.model.item, environment);
                    });

                    pdp.addToViewContextDefinition(viewId, 'shippingWarning', 'string', function shippingWarning() {
                        return environment.getConfig('jewelry.shippingWarning');
                    });
                });
            }
        }
    };
});
