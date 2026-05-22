define('AwaLabs.Jewelry.MyAccount', [
    'Header.MiniCart.View',
    'Backbone.View',
    'Jewelry.Utils'
], function AwaLabsJewelryMyAccount(
    HeaderMiniCartView,
    BackboneView,
    JewelryUtils
) {
    'use strict';

    HeaderMiniCartView.addExtraContextProperty = BackboneView.addExtraContextProperty;

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');

            if (layout) {
                JewelryUtils.layoutContextDefinitions(layout, environment);

                layout.addToViewContextDefinition('OrderHistory.Summary.View', 'jewelry', 'object', function jewelry(context) {
                    return JewelryUtils.getJewelrySummary(context.model.summary);
                });
            }
        }
    };
});
