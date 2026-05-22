define('AwaLabs.Trade', [
    'Models.Init',
    'Application',
    'Configuration',
    'underscore'
], function AwaLabsTrade(
    ModelsInit,
    Application,
    Configuration,
    _
) {
    'use strict';

    Application.on('after:Profile.update', function afterProfileUpdate(_model, _result, data) {
        var disabled;
        var useRetail;
        var customerUpdate;

        try {
            disabled = data.pricingDisabled === 'T' ? 'T' : 'F';
            useRetail = data.retailPriceEnabled === 'T' ? 'T' : 'F';
            customerUpdate = {
                customfields: {
                    custentity_pricing_disabled: disabled,
                    custentity_catalog_retail_price_enabled: useRetail
                }
            };
            ModelsInit.customer.updateProfile(customerUpdate);
        } catch (e) {
            nlapiLogExecution('debug', 'Error updating custom entity fields', e);
        }
    });

    Application.on('after:Profile.get', function afterFn(_model, response) {
        var customFields = response.customfields;
        var isTrade = customFields && _.findWhere(customFields, { name: 'custentity_rad_web_customer_type' });
        var isPendingTradeApproval = customFields && _.findWhere(customFields, { name: 'custentity_rad_pending_trade_approval' });

        response.isTrade = isTrade && isTrade.value === Configuration.get('ProfileUtilsTradeCustomerType');
        response.isPendingTradeApproval = isPendingTradeApproval && isPendingTradeApproval.value === 'T';
        return response;
    });

    Application.on('after:LiveOrder.get', function onAfterLiveOrderGet(_model, result) {
        var profileCustomFields = ModelsInit.session.isLoggedIn2() && ModelsInit.customer.getCustomFields();
        var isTradeField = profileCustomFields && _.findWhere(profileCustomFields, { name: 'custentity_rad_web_customer_type' });
        var isTrade = isTradeField && isTradeField.value === Configuration.get('ProfileUtilsTradeCustomerType');
        var lines = result.lines;
        var filterShippingMethods;

        nlapiLogExecution('DEBUG', 'isTrade', isTrade);
        if (isTrade) {
            filterShippingMethods = _.some(lines, function eachLine(line) {
                var currentItem = line.item;
                return !!currentItem && !!currentItem.custitem46;
            });
            nlapiLogExecution('DEBUG', 'filterShippingMethods', JSON.stringify(filterShippingMethods));
            // Filter the shipmethods
            if (filterShippingMethods) {
                result.shipmethods = _.filter(result.shipmethods, function eachShipMethod(shipmethd) {
                    return shipmethd.internalid === Configuration.get('trade.freightShippingMethod'); // Freight Best Way
                });
            }
            result.shipmethods = _.filter(result.shipmethods, function eachShipMethod(shipmethd) {
                return shipmethd.internalid !== Configuration.get('trade.freightRetailShippingMethod'); // Freight Retail 12%
            });
        } else {
            result.shipmethods = _.filter(result.shipmethods, function eachShipMethod(shipmethd) {
                return shipmethd.internalid === Configuration.get('trade.freightRetailShippingMethod'); // Freight Retail 12%
            });
        }
        nlapiLogExecution('ERROR', 'result.shipmethods', JSON.stringify(result.shipmethods));
    });
});
