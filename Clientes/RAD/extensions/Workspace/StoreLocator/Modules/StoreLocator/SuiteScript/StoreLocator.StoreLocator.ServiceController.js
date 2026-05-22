define('StoreLocator.StoreLocator.ServiceController', [
    'StoreLocator.ServiceController',
    'underscore',
    'StoreLocator.Model'
], function StoreLocatorStoreLocatorServiceController(
    StoreLocatorServiceController,
    _,
    StoreLocatorModel
) {
    'use strict';

    _.extend(StoreLocatorServiceController, {
        get: _.wrap(StoreLocatorServiceController.get, function get(fn) {
            if (this.request.getParameter('urlcomponent')) {
                return StoreLocatorModel.getByUrlComponent(this.request.getParameter('urlcomponent'));
            }
            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });
});
