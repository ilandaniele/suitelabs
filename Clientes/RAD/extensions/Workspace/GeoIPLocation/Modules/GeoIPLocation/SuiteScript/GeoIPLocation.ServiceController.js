define('GeoIPLocation.ServiceController', [
    'ServiceController',
    'GeoIPLocation.Model'
], function GeoIPLocationServiceController(
    ServiceController,
    GeoIPLocationModel
) {
    'use strict';

    return ServiceController.extend({

        name: 'GeoIPLocation.ServiceController',

        get: function get() {
            return GeoIPLocationModel.get();
        }
    });
}
);
