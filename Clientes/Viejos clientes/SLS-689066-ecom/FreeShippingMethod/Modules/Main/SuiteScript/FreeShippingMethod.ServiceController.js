define('MultiAddToCart.ServiceController', [
    'ServiceController',
    'FreeShippingMethod.Model'
], function (
    ServiceController,
    FreeShippingMethodModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'FreeShippingMethod.ServiceController',

        // The values in this object are the validation needed for the current service.
        options: {
            common: {}
        },

        post: function post() {
            var cartItemId = this.request.getParameter('cartItemId');
            var excluded = this.request.getParameter('excluded');
            return FreeShippingMethodModel.setItemExcludedFromShipping(cartItemId, excluded);
        }
    });
});
