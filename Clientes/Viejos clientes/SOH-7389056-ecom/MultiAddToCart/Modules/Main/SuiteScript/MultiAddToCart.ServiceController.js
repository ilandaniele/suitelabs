define('MultiAddToCart.ServiceController', [
    'ServiceController',
    'MultiAddToCart.Model'
], function MultiAddToCartServiceController(
    ServiceController,
    MultiAddToCartModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'MultiAddToCart.ServiceController',

        // The values in this object are the validation needed for the current service.
        options: {
            common: {}
        },

        get: function get() {
            var fullurl = this.request.getParameter('fullurl');
            return MultiAddToCartModel.getCategoryHierarchy(fullurl);
        }
    });
});
