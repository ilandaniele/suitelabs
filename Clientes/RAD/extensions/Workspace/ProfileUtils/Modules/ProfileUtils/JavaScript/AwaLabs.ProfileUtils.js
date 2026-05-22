define('AwaLabs.ProfileUtils', [
    'Profile.Model',
    'LiveOrder.Model',
    'underscore'
], function ProfileUtils(
    ProfileModel,
    LiveOrderModel,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var profile = ProfileModel.getInstance();
            if (layout) {
                layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'showProcedToCheckoutButton', 'string', function fnAddToContext() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'useRetailPrices', 'string', function fnAddToContext() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'showProcedToCheckoutButton', 'string', function fnAddToContext() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'useRetailPrices', 'string', function fnAddToContext() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'retailSubTotalFormatted', 'string', function fnAddToContext() {
                    var cart = LiveOrderModel.getInstance();
                    var summary = cart.get('summary');
                    return !!summary && summary.retailSubTotalFormatted;
                });
            }
        }
    }
});
