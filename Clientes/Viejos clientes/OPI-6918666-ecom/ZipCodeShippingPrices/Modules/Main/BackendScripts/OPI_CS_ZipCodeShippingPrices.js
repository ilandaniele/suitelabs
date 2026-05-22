/* globals nlapiGetFieldValue, nlapiSetFieldValue, nlapiGetFieldText */

var ZipCodeShippingPricesModule = (function ZipCodeShippingPricesModule() {
    'use strict';

    var setShippingPrice = function setShippingPrice() {
        var zipCode = nlapiGetFieldValue('shipzip');
        // var shipMethod = nlapiGetFieldValue('shipmethod');
        var shipMethodName = nlapiGetFieldText('shipmethod');
        var suiteletConfig = {
            id: 'customscript_ns_sl_zipcodeshippingprices',
            deploy: 'customdeploy_ns_sl_zipcodeshippingprices'
        };
        var suiteletUrl;
        var response;
        var shippingCost;
        nlapiLogExecution('debug', 'zipCode', zipCode);
        nlapiLogExecution('debug', 'shipMethodName', shipMethodName);

        if (zipCode) {
            suiteletUrl = nlapiResolveURL('suitelet', suiteletConfig.id, suiteletConfig.deploy, true);
            response = nlapiRequestURL(suiteletUrl, { zipCode: zipCode }, null, 'POST');
            shippingCost = response.getBody();
            nlapiLogExecution('debug', '--- ship cost ---', shippingCost);
            if (Number(shippingCost) !== 0) { // shippingCost !== '0.00'
                nlapiLogExecution('debug', 'entered != 0.00', shippingCost);
                if (shipMethodName === 'Orca Delivery') {
                    nlapiLogExecution('debug', 'entered override ', shippingCost);
                    nlapiSetFieldValue('overrideshippingcost', shippingCost, true, false);
                    nlapiSetFieldValue('shippingcostoverridden', 'T', true, false);
                    // nlapiSetFieldValue('shippingcost', shippingCost, true, true);
                }
            }
        }
    };

    var recalc = function recalc() {
        nlapiLogExecution('debug', 'context ', nlapiGetContext().getExecutionContext());
        if (nlapiGetContext().getExecutionContext() === 'webstore') {
            nlapiLogExecution('debug', '--- START ---', '--- recalc ---');
            setShippingPrice();
            nlapiLogExecution('debug', '--- END ---', '--- recalc ---');
        }
    };

    return {
        recalc: recalc
    };
}());
