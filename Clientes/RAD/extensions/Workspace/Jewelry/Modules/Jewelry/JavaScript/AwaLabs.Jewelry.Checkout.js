define('AwaLabs.Jewelry.Checkout', [
    'Header.MiniCart.View',
    'Backbone.View',
    'Jewelry.Utils',
    'OrderWizard.Module.Confirmation.Jewelry'
], function AwaLabsJewelryCheckout(
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
            var environment = container.getComponent('Environment');

            if (cart) {
                JewelryUtils.cartContextDefinitions(cart);
            }

            if (layout) {
                JewelryUtils.layoutContextDefinitions(layout, environment);

                layout.addToViewContextDefinition('OrderWizard.Module.CartSummary', 'jewelry', 'string', function jewelrySummary(context) {
                    return JewelryUtils.getJewelrySummary(context.model.summary);
                });

                layout.addToViewContextDefinition('OrderWizard.Module.CartSummary', 'itemCount', 'string', function jewelryItemCount(context) {
                    return JewelryUtils.getNewItemCount(context.itemCount, context.model.summary);
                });
            }
        }
    };
});
