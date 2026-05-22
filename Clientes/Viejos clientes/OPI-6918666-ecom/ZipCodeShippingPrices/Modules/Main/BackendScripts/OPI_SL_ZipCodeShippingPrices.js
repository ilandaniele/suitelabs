/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define([
    'N/search',
    'N/log',
    'SuiteScripts/Deploy_Extensions/NSeComm/ZipCodeShippingPrices@1.0.0/Modules/Main/SuiteScript2/ZipCodeShippingPricesModule.js'
], function ZipCodeShippingPrices(
    nSearch,
    nLog,
    zipCodeShippingPricesModule) {
    function onRequest(context) {
        var shippingCost = zipCodeShippingPricesModule.getShippingCost(context.request.parameters.zipCode);
        context.response.write({ output: shippingCost });
    }
    return {
        onRequest: onRequest
    };
});
