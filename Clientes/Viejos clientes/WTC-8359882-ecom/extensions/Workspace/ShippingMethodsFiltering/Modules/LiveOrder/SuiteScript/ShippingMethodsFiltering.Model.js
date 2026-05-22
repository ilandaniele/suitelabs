define('ShippingMethodsFiltering.Model', [
    'Application',
    'Models.Init',
    'Utils',
    'underscore',
    'Configuration'
], function ShippingMethodsFilteringModel(
    Application,
    CommerceAPI,
    Utils,
    _,
    Configuration
) {
    'use strict';

    try {
        if (CommerceAPI.session.isLoggedIn2() && Utils.isCheckoutDomain()) {
            Application.on('after:LiveOrder.get', function afterLiveOrderGet(Model, response) {
                var shipMethods = response.shipmethods;
                var shipMethodsIdsArray = [];
                var filteredShipMethods;
                var custAddress = _.find(response.addresses, function getDefaultShipping(address) {
                    return address.defaultshipping === 'T';
                });

                var shippingMethodsConfig = Configuration.get('extensions').ShippingMethodsFiltering;
                var internationalShipping = custAddress.country !== 'US';

                var hazmatProduct = _.any(response.lines, function eachItem(line) {
                    return line.item.custitem_wt_haz_mat_item;
                });

                if (hazmatProduct && internationalShipping) {
                    shipMethodsIdsArray = String(shippingMethodsConfig.internationalAndHazmat).split(',');
                } else if (internationalShipping) {
                    shipMethodsIdsArray = String(shippingMethodsConfig.internationalAndNonHazmat).split(',');
                } else if (hazmatProduct) {
                    shipMethodsIdsArray = String(shippingMethodsConfig.nationalAndHazmat).split(',');
                } else {
                    shipMethodsIdsArray = String(shippingMethodsConfig.nationalAndNonHazmat).split(',');
                }

                filteredShipMethods = _(shipMethods).filter(function filterShipMethods(shipMethod) {
                    return _(shipMethodsIdsArray).contains(shipMethod.internalid);
                });

                response.shipmethods = filteredShipMethods;
            });
        }
    } catch (e) {
        nlapiLogExecution('ERROR', 'error', JSON.stringify(e));
    }
});
