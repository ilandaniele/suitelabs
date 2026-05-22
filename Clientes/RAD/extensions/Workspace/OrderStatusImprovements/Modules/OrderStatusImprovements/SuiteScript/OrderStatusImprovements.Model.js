define('OrderStatusImprovements.Model', [
    'SC.Model',
    'StoreItem.Model',
    'underscore'
], function OrderStatusImprovementsModel(
    SCModel,
    StoreItem,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'OrderStatusImprovements',
        get: function get(data) {
            var scriptId = 'customscript_awa_sc_ext_sl_orderstatus';
            var deployId = 'customdeploy_awa_sc_ext_sl_orderstatus';
            var suiteletInternalUrl = nlapiResolveURL(
                'SUITELET',
                scriptId,
                deployId,
                'external'
            );
            var headers = {
                Accept: 'application/json'
            };
            var responseObj = nlapiRequestURL(suiteletInternalUrl, JSON.stringify({
                ordernumber: data.ordernumber,
                verificationfield: data.verificationfield
            }), headers, null, 'POST');
            var responseStatusCode = parseInt(responseObj.getHeader('Custom-Header-Status'), 10);
            var orderData;
            var lineItem;
            var result = {
                lines: []
            };

            if (responseStatusCode === 200) {
                orderData = JSON.parse(responseObj.getBody());
            }

            if (orderData && orderData.details && orderData.details.itemDetails && orderData.details.itemDetails.length) {
                _.each(orderData.details.itemDetails, function each(itemData) {
                    itemData.item = {
                        id: itemData.internalid,
                        type: itemData.type
                    };
                    lineItem = {
                        item: {
                            id: itemData.internalid,
                            type: itemData.type
                        }
                    };
                    result.lines.push(lineItem);
                });

                if (StoreItem) {
                    StoreItem.preloadItems(_(result.lines).pluck('item'));
                    _.each(orderData.details.itemDetails, function each(itemData) {
                        itemData.item = StoreItem.get(itemData.item.id, itemData.item.type);
                    });
                }
            }

            return orderData;
        }
    });
});
