define('NS.RestrictListOfShippingMethods.ShippingLogic', [
    'Configuration',
    'Application',
    'Profile.Model',
    'Models.Init',
    'LiveOrder.Model',
    'Utils',
    'underscore'
], function NSRestrictListOfShippingMethodsShippingLogic (
    Configuration,
    Application,
    ProfileModel,
    ModelsInit,
    LiveOrder,
    Utils,
    _
) {
    'use strict';

    return {
        executeCustomShippingLogic: function executeCustomShippingLogic(order) {
            var nsConfiguration = Configuration.get().parkdesigns;
            var b2bshipping = nsConfiguration.b2bshipping;
            var b2cshipping = nsConfiguration.b2cshipping;
            var profileModel = ProfileModel.get();
            var customerCategory = _(profileModel.customfields).findWhere({
                name: 'custentity_customer_customersegments'
            }) || {};

            nlapiLogExecution('ERROR','profileModel', JSON.stringify(profileModel));
            nlapiLogExecution('ERROR','profileModel.customfields', JSON.stringify(profileModel.customfields));
            nlapiLogExecution('ERROR','customerCategory.value', JSON.stringify(customerCategory.value));

            // if (customerCategory.value == 'B2B') {
            //     order.shipmethods = _.filter(order.shipmethods, function (shipmethod) {
            //         return b2bshipping.indexOf(shipmethod.internalid) !== -1; // -1 means not present
            //     })
            // } else if (customerCategory.value == 'B2C') {
            //     order.shipmethods = _.filter(order.shipmethods, function (shipmethod) {
            //         return b2cshipping.indexOf(shipmethod.internalid) !== -1; // -1 means not present
            //     })
            // } else {
            //     return order.shipmethods
            // }
            
            return order.shipmethods
        },
        start: function() {
            var self = this;
            var App = require('Application');
            App.on('after:LiveOrder.get', function (Model, response) {
                if (ModelsInit.session.isLoggedIn2() && Utils.isCheckoutDomain()) {
                    //nlapiLogExecution('ERROR','after:LiveOrder.get - response', JSON.stringify(response))
                    // self.executeCustomShippingLogic(response);
                }
                return response;
            });
        }
    }
});
