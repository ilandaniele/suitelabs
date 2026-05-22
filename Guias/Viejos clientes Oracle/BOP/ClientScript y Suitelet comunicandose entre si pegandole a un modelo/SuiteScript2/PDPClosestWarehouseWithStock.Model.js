/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/record',
    'N/search',
    'N/https',
    'N/log'
], function PDPClosestWarehouseWithStock(
    nRecord,
    nSearch,
    nHttps,
    nLog
) {
    'use strict';

    function getClosestWarehouse(zipCode) {
        var validZip = /^\d{5}(-\d{4})?$/.test(zipCode);
        var reducedZip;
        var resultZip = '';

        if (validZip) {
            reducedZip = zipCode.substring(0, 2);
            if ((reducedZip < 57) || (reducedZip >= 60 && reducedZip <= 65) || (reducedZip >= 70 && reducedZip <= 72)) {
                resultZip = 2;
            } else {
                resultZip = 3;
            }
        }
        return resultZip;
    }

    function getWarehouseStocks(zipCode, itemId, quantity, domain) {
        var locationId = getClosestWarehouse(zipCode);

        nLog.debug({ title: 'locationID from model after get closest warehouse', details: locationId });
        var warehouseHasStock = [];
        var location;

        var URL = domain + '/api/items?id=' + itemId + '&fieldset=details';

        var response = nHttps.get({
            url: URL,
            headers: {
                'Accept-Language': 'en-us',
                'Accept': 'application/json'
            }
        });

        var jsonResponse = JSON.parse(response.body);
        var locations = jsonResponse.items[0].quantityavailable_detail.locations;
        var isBackorderable = jsonResponse.items[0].isbackorderable;

        var i;
        for (i = 0; i < locations.length; i++) {
            if (locations[i].internalid === locationId) {
                location = locations[i];
            }
        }

        nLog.error({ title: 'isBackorderable', details: isBackorderable });
        nLog.error({ title: 'quantity', details: quantity });
        nLog.error({ title: 'location', details: location });
        nLog.error({ title: 'locations to check', details: locations });

        if (location) {
            if (location.quantityavailable >= quantity) {
                warehouseHasStock = [true, location.quantityavailable];
            } else if (isBackorderable) {
                warehouseHasStock = [true, 1];
            } else {
                warehouseHasStock = [true, 0];
            }
        } else if (locationId) {
            if (isBackorderable) {
                warehouseHasStock = [true, 1];
            } else {
                warehouseHasStock = [true, 0];
            }
        } else {
            warehouseHasStock = [false, 0];
        }

        nLog.error({ title: 'warehouse', details: warehouseHasStock });
        return warehouseHasStock;
    }


    return {
        closestWarehouseHasStock: function closestWarehouseHasStock(zipCode, itemId, quantity, domain) {
            return getWarehouseStocks(zipCode, itemId, quantity, domain);
        }
    };
});
