define('AwaLabs.OrderStatusImprovements.ServiceController', [
    'Application',
    'ServiceController',
    'OrderStatusImprovements.Model'
], function OrderStatusImprovementsServiceController(
    Application,
    ServiceController,
    OrderStatusImprovementsModel
) {
    'use strict';

    return ServiceController.extend({

        name: 'AwaLabs.OrderStatusImprovements.ServiceController',

        post: function post() {
            return OrderStatusImprovementsModel.get(this.data);
        }
    });
});
