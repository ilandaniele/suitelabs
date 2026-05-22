define('NS.RestrictListOfShippingMethods.Checkout', [
    'order_wizard_shipmethod_module_ext.tpl',
    'OrderWizard.Module.Shipmethod',
    'underscore'
], function NSRestrictListOfShippingMethodsCheckout (
    order_wizard_shipmethod_module_ext_tpl,
    OrderWizardModuleShipmethod,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var self = this;
            var viewPrototype = OrderWizardModuleShipmethod.prototype;
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var userprofile = container.getComponent('UserProfile');
            var environment = container.getComponent('Environment');
            var checkout = container.getComponent('Checkout');
            var b2bshipping = environment.getConfig('parkdesigns.b2bshipping');
            var b2cshipping = environment.getConfig('parkdesigns.b2cshipping');

            if (cart) {
                userprofile.getUserProfile().then(function (profile) {
                    var filterShipMethodsObj = function (context) {
                        var shippingMethods = context.shippingMethods;
                        var profilecustomfields = _.findWhere(profile.customfields, { id: 'custentity_hidden_customersegment' }).value;
                        var customerObj = profilecustomfields ? _.pluck(JSON.parse(profilecustomfields), 'value') : {};
                        
                        console.log('shippingMethods:', shippingMethods);

                        self.customercategory = _.contains(customerObj, 'B2B');

                        if (shippingMethods) {
                            if (self.customercategory) {
                                console.log('Customer Category is: B2B');
                                return shippingMethods.filter(function (shipMethod) { return b2bshipping && b2bshipping.indexOf(shipMethod.internalid) >= 0; });
                            } else {
                                console.log('Customer Category is: B2C or without custentity_hidden_customersegment');
                                return shippingMethods.filter(function (shipMethod) { return b2cshipping && b2cshipping.indexOf(shipMethod.internalid) >= 0; });
                            }
                        }
                    };

                    layout.addToViewContextDefinition('OrderWizard.Module.Shipmethod', 'shippingMethods', 'object', filterShipMethodsObj);
                    layout.addToViewContextDefinition('OrderWizard.Module.ShowShipments', 'shippingMethods', 'object', filterShipMethodsObj);
                });
            }

        }
    };
});
