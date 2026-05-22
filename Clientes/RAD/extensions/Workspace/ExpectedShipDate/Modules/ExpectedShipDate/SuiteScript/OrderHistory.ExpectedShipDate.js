define('OrderHistory.ExpectedShipDate', [
    'OrderHistory.Model',
    'Configuration',
    'underscore'
], function AwaLabsJewelry(
    OrderHistoryModel,
    Configuration,
    _
) {
    'use strict';

    _.extend(OrderHistoryModel, {
        getExtraLineFields: _.wrap(OrderHistoryModel.getExtraLineFields, function getExtraLineFields(fn, result, record, i) {
            fn.apply(this, _.toArray(arguments).slice(1));
            result.expectedShipDate = record.getLineItemValue('item', Configuration.get('orderHistory.expectedShipDate'), i);
        })
    });
});
