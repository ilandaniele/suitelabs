define('SuiteLabs.Klaviyo.Checkout', [
    'Tracker'
], function SuiteLabsKlaviyoCheckout(
    Tracker
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var profileComponent = container.getComponent('UserProfile');
            var profile;

            profileComponent.getUserProfile().then(function getUserProfile(userProfile) {
                profile = userProfile;
            });

            Tracker.on('transaction', function onTransaction(dataLayer) {
                if (
                    dataLayer
                    && dataLayer.ecommerce
                    && dataLayer.ecommerce.purchase
                    && dataLayer.ecommerce.purchase.actionField
                ) {
                    dataLayer.ecommerce.purchase.actionField.email = profile.email;
                    dataLayer.ecommerce.purchase.actionField.phone = profile.phoneinfo && profile.phoneinfo.phone;
                }
            });
        }
    };
});
