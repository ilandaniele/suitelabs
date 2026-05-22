/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define([
    'N/search',
    'N/log',
    'SuiteScripts/Deploy_Extensions/NSeComm/PDPClosestWarehouseWithStock@1.0.0/Modules/Main/SuiteScript2/PDPClosestWarehouseWithStock.Model.js'
], function PDPClosestWarehouseWithStock(
    nSearch,
    nLog,
    closestWarehouseWithStockModel
) {
    function onRequest(context) {
        var zipCode = context.request.parameters.zipCode;
        var itemId = context.request.parameters.itemId;
        var quantity = context.request.parameters.quantity;
        var domain = context.request.parameters.domain;
        var warehouseHasStock = closestWarehouseWithStockModel.closestWarehouseHasStock(zipCode, itemId, quantity, domain);
        nLog.error({ title: 'warehouse', details: warehouseHasStock });
        context.response.write({ output: JSON.stringify(warehouseHasStock) });
    }
    return {
        onRequest: onRequest
    };
});
