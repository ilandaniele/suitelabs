define('Jewelry.Utils', [
    'Configuration',
    'LiveOrder.Model',
    'Utils',
    'underscore'
], function JewelryUtils(
    Configuration,
    LiveOrderModel,
    Utils,
    _
) {
    'use strict';

    return {
        getActionsTransaction: function getActionsTransaction(lines, excludeLines) {
            var thereIsJewelry = false;
            var flatRateLine;
            var toExcludeFromShippingCalculation;
            var isJewelry;
            var subtotal = 0;
            var jewelryCount = 0;
            var subtotalRetail = 0;

            _.each(lines, function eachLine(line) {
                var currentItem = line.item;
                var retailRate = currentItem.pricelevel4 || line.rate;
                var currentItemInternalId;
                var lineamount;

                toExcludeFromShippingCalculation = null;
                isJewelry = currentItem[Configuration.get('jewelry.productTypeFieldId')] === Configuration.get('jewelry.productTypeFieldValue')
                    || currentItem.internalid === Configuration.get('jewelry.markupitemid');
                thereIsJewelry = thereIsJewelry || isJewelry;

                currentItemInternalId = String(
                    line.type === 'Markup' ? currentItem.internalid || currentItem.itemid : currentItem.internalid
                );

                if (currentItemInternalId === Configuration.get('jewelry.serviceitemid') ||
                    currentItemInternalId === Configuration.get('jewelry.markupitemid')) {
                    flatRateLine = line;
                    toExcludeFromShippingCalculation = line.internalid;
                }

                if (isJewelry) {
                    toExcludeFromShippingCalculation = line.internalid;
                    jewelryCount += line.quantity;
                    subtotalRetail += (line.quantity * retailRate);
                    lineamount = line.amount || (line.quantity ? line.quantity * line.rate : line.rate);
                    subtotal += lineamount;
                }
                if (!!toExcludeFromShippingCalculation && excludeLines) {
                    order.setItemExcludedFromShipping(toExcludeFromShippingCalculation, true);
                }
            });

            return {
                thereIsJewelry: thereIsJewelry,
                thereIsFlatRateLine: !!flatRateLine,
                jewelryCount: jewelryCount,
                jewelrySubtotal: subtotal,
                jewelrySubtotalRetail: subtotalRetail,
                jewelrySubtotalFormatted: Utils.formatCurrency(subtotal),
                jewelrySubtotalRetailFormatted: Utils.formatCurrency(subtotalRetail),
                flatRateLine: flatRateLine,
                flatRateLineAmount: flatRateLine ? flatRateLine.amount : 0,
                flatRateLineAmountFormatted: flatRateLine ? flatRateLine.amount_formatted : Utils.formatCurrency(0)
            };
        },

        getActionsLiveOrder: function getActionsLiveOrder(excludeLines, debug, fromwho) {
            var orderFields = LiveOrderModel.getFieldValues();
            var lines = LiveOrderModel.getLines(orderFields);

            return this.getActionsTransaction(lines, excludeLines, debug, fromwho);
        }
    };
});
