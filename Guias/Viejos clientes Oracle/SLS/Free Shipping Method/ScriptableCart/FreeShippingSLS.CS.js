/* globals nlapiGetFieldValue, nlapiGetCurrentLineItemValue */

// Configure the shipping method that will apply the item free shipping logic


var ItemFreeShippingModule = (function ItemFreeShippingModule() {
    'use strict';

    var FREE_SHIPPING_METHOD = 110;

    var setItemFreeShipping = function setItemFreeShipping() {
        var selectedShipMethod;
        var numLines;
        var isLineExcluded;
        var isLineShippingFree;
        var itemId;
        var commitLine;
        var i;

        try {
            selectedShipMethod = nlapiGetFieldValue('shipmethod');
            numLines = nlapiGetLineItemCount('item');

            if (selectedShipMethod) {
                selectedShipMethod = parseInt(selectedShipMethod, 10);
            }

            for (i = numLines; i >= 1; i--) {
                commitLine = false;
                nlapiSelectLineItem('item', i);

                isLineExcluded = nlapiGetCurrentLineItemValue('item', 'excludefromraterequest');
                isLineShippingFree = nlapiGetCurrentLineItemValue('item', 'custcol_apply_free_shipping');
                itemId = parseInt(nlapiGetCurrentLineItemValue('item', 'item'), 10);

                nlapiLogExecution('debug', '--- START ---', '--- START ' + itemId + ' ---');
                nlapiLogExecution('debug', 'isLineExcluded (' + typeof isLineExcluded + ')', isLineExcluded);
                nlapiLogExecution('debug', 'isLineShippingFree (' + typeof isLineShippingFree + ')', isLineShippingFree);

                if (
                    selectedShipMethod === FREE_SHIPPING_METHOD
                    && isLineExcluded === 'F'
                    && isLineShippingFree === 'T'
                ) {
                    nlapiLogExecution('debug', 'Exclude', 'Excluding item ' + itemId + ' from shipping ' + selectedShipMethod);
                    nlapiSetCurrentLineItemValue('item', 'excludefromraterequest', 'T', false, false);
                    commitLine = true;
                }

                if (
                    selectedShipMethod !== FREE_SHIPPING_METHOD
                    && isLineExcluded === 'T'
                ) {
                    nlapiLogExecution('debug', 'Include', 'Including item ' + itemId + ' from shipping ' + selectedShipMethod);
                    nlapiSetCurrentLineItemValue('item', 'excludefromraterequest', 'F', false, false);
                    commitLine = true;
                }

                if (commitLine) {
                    nlapiCommitLineItem('item');
                }

                nlapiLogExecution('debug', '--- END ---', '--- END ' + itemId + ' ---');
            }
        } catch (e) {
            nlapiLogExecution('debug', 'An error has occurred, details: ', e.message);
        }
    };

    var fieldChanged = function fieldChanged(type, field) {
        var numLines;

        if (
            nlapiGetContext().getExecutionContext() === 'webstore'
            && type === 'item'
            && field === 'shipmethod'
        ) {
            nlapiLogExecution('debug', '--- START ---', '--- fieldChanged ---');
            numLines = nlapiGetLineItemCount('item');

            if (numLines > 0) {
                nlapiSelectLineItem('item', 1);
                nlapiCommitLineItem('item');
            }
            nlapiLogExecution('debug', 'numLines', numLines);
            nlapiLogExecution('debug', '--- END ---', '--- fieldChanged ---');
        }
    };

    var recalc = function recalc(type, action) {
        if (
            nlapiGetContext().getExecutionContext() === 'webstore'
            && action === 'commit'
        ) {
            nlapiLogExecution('debug', '--- START ---', '--- recalc ---');
            setItemFreeShipping();
            nlapiLogExecution('debug', '--- END ---', '--- recalc ---');
        }
    };

    return {
        fieldChanged: fieldChanged,
        recalc: recalc
    };
}());
