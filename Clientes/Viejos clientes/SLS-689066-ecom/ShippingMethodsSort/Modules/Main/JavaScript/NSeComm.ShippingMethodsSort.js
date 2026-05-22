define('NSeComm.ShippingMethodsSort', [
    'underscore'
], function NSeCommShippingMethodsSortMainModule(
    _
    ) {
    'use strict';

    function getShippingMethodsFunction() {
        return function getShippingMethods(context) {
            return _(context.shippingMethods).sortBy(function orderByPrice(shippingMethod) {
                return parseFloat(shippingMethod.rate_formatted.replace('$', ''));
            });
        };
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition(
                    'OrderWizard.Module.Shipmethod',
                    'shippingMethods',
                    'object',
                    getShippingMethodsFunction());

                layout.addToViewContextDefinition(
                    'OrderWizard.Module.ShowShipments',
                    'shippingMethods',
                    'object',
                    getShippingMethodsFunction());
            }
        }
    };
});
