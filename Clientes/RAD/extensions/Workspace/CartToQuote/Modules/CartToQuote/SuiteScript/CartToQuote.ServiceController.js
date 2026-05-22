define('CartToQuote.ServiceController', [
    'ServiceController',
    'Models.Init'
], function CartToQuoteServiceController(
    ServiceController,
    ModelsInit
) {
    'use strict';

    return ServiceController.extend({
        name: 'CartToQuote.ServiceController',
        'delete': function fnDelete() {
            ModelsInit.order.removeAllItems();
            return {
                success: true
            };
        }
    });
});
