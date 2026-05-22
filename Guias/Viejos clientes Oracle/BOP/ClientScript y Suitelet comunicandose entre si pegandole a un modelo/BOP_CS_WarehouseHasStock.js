/* globals nlapiGetFieldValue, nlapiSetFieldValue, nlapiGetFieldText, nlapiGetCurrentLineItemValue */

var WarehouseHasStockModule = (function WarehouseHasStockModule() {
    'use strict';

    var closestWarehouseHasStock = function closestWarehouseHasStock() {
        var itemId = nlapiGetCurrentLineItemValue('item', 'item');
        var zipCode = nlapiGetFieldValue('shipzip');
        var quantity = nlapiGetCurrentLineItemValue('item', 'quantity');
        var domain = nlapiGetContext().getSetting('SCRIPT', 'custscript_domain');
        var suiteletConfig = {
            id: 'customscript_ns_sl_closest_warehouse',
            deploy: 'customdeploy_ns_sl_closest_warehouse'
        };

        var suiteletUrl = nlapiResolveURL('suitelet', suiteletConfig.id, suiteletConfig.deploy, true);
        var response = nlapiRequestURL(suiteletUrl, { zipCode: zipCode, itemId: itemId, quantity: quantity, domain: domain }, null, 'POST');
        var warehouseHasStock = JSON.parse(response.getBody());
        return warehouseHasStock[0] && warehouseHasStock[1] > 0;
    };

    var validateLine = function validateLine() {
        var result;
        if (nlapiGetContext().getExecutionContext() === 'webstore') {
            result = closestWarehouseHasStock();

            // chequear aqui en PDP si ya esta en el cart
            // chequear en checkout si se puede eliminar
            return result;
        }
        return true;
    };

    return {
        validateLine: validateLine
    };
}());
