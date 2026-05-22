define('CSVToCart.ServiceController', [
    'ServiceController',
    'CSVToCart.Model'
], function CSVToCartServiceController(
    ServiceController,
    CSVToCartModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'CSVToCart.ServiceController',
        options: {
            common: {}
        },

        post: function post() {
            var file = this.request.getFile('uploadFile');
            return CSVToCartModel.addCSVToCart(file);
        }
    });
});
