define('AwaLabs.PriceToggle', [
    'underscore',
    'Profile.Model',
    'PriceToggle.Item.Model'
], function PriceToggle(
    _,
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (layout) {
                layout.addToViewContextDefinition('Cart.Item.Summary.View', 'useRetailPrices', 'boolean', function useRetailPrices() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Cart.Summary.View', 'useRetailPrices', 'boolean', function useRetailPrices() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Cart.Summary.View', 'showProceedToCheckoutButton', 'boolean', function showProceedToCheckoutButton() {
                    return profile.get('allowContactCheckout');
                });
            }
        }
    };
});
