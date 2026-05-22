define('SortShipMethods', [
    'underscore',
    'SortShippingMethods.FixProperty'
], function RemoveDefaulShipMethod(
    _
) {
    'use strict';

    return {
        sortShipMethods: function sortShipMethods(shippingMethods, model) {
            var shippingMethodsSorted = _.sortBy(shippingMethods, function sortBy(shipMethod) {
                var shipMethodObj = _.find(model.shipmethods, function findShipMethod(method) {
                    return method.internalid.toString() === shipMethod.internalid.toString();
                });
                return shipMethodObj.rate;
            });
            return shippingMethodsSorted;
        },

        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var self = this;
            if (layout) {
                try {
                    layout.addToViewContextDefinition('OrderWizard.Module.Shipmethod', 'shippingMethods', 'object', function sortShipMethods(context) {
                        var shippingMethods = self.sortShipMethods(context.shippingMethods, context.model);
                        return shippingMethods;
                    });

                    layout.addToViewContextDefinition('OrderWizard.Module.ShowShipments', 'shippingMethods', 'object', function sortShipMethods(context) {
                        var shippingMethods = self.sortShipMethods(context.shippingMethods, context.model);
                        return shippingMethods;
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };
});
