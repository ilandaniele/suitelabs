/* eslint-disable no-undef */
define('QuoteToSalesOrder.Model.Site', [
    'QuoteToSalesOrder.Model',
    'underscore'
], function QuoteToSalesOrderSite(
    QuoteToSalesOrderModel,
    _
) {
    'use strict';

    return _.extend(QuoteToSalesOrderModel, {

        getTransactionRecord: _.wrap(QuoteToSalesOrderModel.getTransactionRecord, function getTransactionRecord(fn) {
            var quote;
            var lineCount;
            var salesOrder;
            var index;
            var taxcode;
            var taxrate1;
            var taxtotal;
            var total;

            salesOrder = fn.apply(this, _.toArray(arguments).slice(1));
            quote = nlapiLoadRecord('estimate', this.quoteId);
            lineCount = quote.getLineItemCount('item');
            for (index = 1; index <= lineCount; index++) {
                taxcode = quote.getLineItemValue('item', 'taxcode', index);
                taxrate1 = quote.getLineItemValue('item', 'taxrate1', index);
                salesOrder.setLineItemValue('item', 'taxrate1', index, taxcode);
                salesOrder.setLineItemValue('item', 'taxrate1', index, taxrate1);
            }
            taxtotal = parseFloat(quote.getFieldValue('taxtotal'));
            total = parseFloat(salesOrder.getFieldValue('total'));
            salesOrder.setFieldValue('taxtotal', taxtotal);
            salesOrder.setFieldValue('total', taxtotal + total);

            return salesOrder;
        })
    });
});
