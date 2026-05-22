define('OrderWizard.Module.Shipmethod.Site', [
    'OrderWizard.Module.Shipmethod',
    'underscore'
], function OrderWizardModuleShipmethodSite(
    OrderWizardModuleShipmethod,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleShipmethod.prototype, {
        getContext: _.wrap(OrderWizardModuleShipmethod.prototype.getContext, function (fn) {
            var currentContext = fn.apply(this, _.toArray(arguments).slice(1));
            var shippingMethodsFiltered = currentContext.model.get('shipmethods').models.map(function (shipmethod) {
                return {
                    name: shipmethod.get('name'),
                    rate_formatted: shipmethod.get('rate_formatted'),
                    internalid: shipmethod.get('internalid'),
                    isActive: shipmethod.get('internalid') === currentContext.model.get('shipmethod'),
                    rate: shipmethod.get('rate')
                };
            });
            shippingMethodsFiltered = _.sortBy(shippingMethodsFiltered, function (ship) {
                return ship.rate;
            });
            return _.extend(currentContext, {
                shippingMethods: shippingMethodsFiltered
            });
        })
    });


});
