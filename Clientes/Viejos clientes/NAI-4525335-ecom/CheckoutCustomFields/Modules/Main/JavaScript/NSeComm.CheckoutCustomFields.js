define('NSeComm.CheckoutCustomFields', [
    'CheckoutCustomFields.View',
    'underscore'
], function NSeCommCheckoutCustomFields(
    CheckoutCustomFieldsView,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var checkout = container.getComponent('Checkout');
            var user = container.getComponent('UserProfile');
            var environment = container.getComponent('Environment');

            if (checkout && user && environment) {
                user.getUserProfile().then(function getUserData(userData) {
                    var customerLegalName = _(userData.customfields).findWhere({
                        id: 'custentity2'
                    });
                    var FDA = _(userData.customfields).findWhere({
                        id: 'custentity3'
                    });

                    checkout.addChildView('Shipping.Address', function addChildView() {
                        return new CheckoutCustomFieldsView(
                            {
                                'Disclaimer': environment.getConfig('checkoutCustomFields.disclaimer'),
                                'Customer': customerLegalName.value,
                                'FDA': FDA.value
                            });
                    });
                });
            }
        }
    };
});
