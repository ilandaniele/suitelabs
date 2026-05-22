/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */

define([
    'N/search'
], function ZipCodeShippingPrices(
    nSearch
) {
    function getShippingCost(zipCode) {
        var shippingCost = '0.00';

        nSearch.create({
            type: 'customrecord_orca_delivery_shipping_cost',
            columns: ['custrecord_orca_delivery_zip_code', 'custrecord_orca_delivery_shipping_cost'],
            filters: ['custrecord_orca_delivery_zip_code', 'is', zipCode]
        }).run().each(function getResults(result) {
            shippingCost = result ? result.getValue({
                name: 'custrecord_orca_delivery_shipping_cost'
            }) : '0.00';
            return true;
        });

        return shippingCost;
    }
    return {
        getShippingCost: getShippingCost
    };
});
