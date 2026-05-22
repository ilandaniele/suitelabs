/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/log',
    './ZipCodeShippingPricesModule.js'
], function ZipCodeShippingPrices(
    nLog,
    zipCodeShippingPricesModule
) {
    'use strict';

    return {
        getShippingCost: function getShippingCost(zipCode) {
            var shippingCost = zipCodeShippingPricesModule.getShippingCost(zipCode);
            nLog.debug({ title: 'Shipping Cost', details: shippingCost });
            return shippingCost;
        }
    };
});
