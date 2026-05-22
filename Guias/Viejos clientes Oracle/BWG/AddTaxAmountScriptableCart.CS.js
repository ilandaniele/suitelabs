/* globals nlapiGetFieldValue, nlapiGetCurrentLineItemValue */

// Add water tax amount that will to the sales order


var AddWaterTaxModule = (function AddWaterTaxModule() {
    'use strict';

    var addWaterTax = function addWaterTax() {
       
        var isCustomerWaterTaxExempt;
		var productWaterTaxCode;
		var productWaterTaxAmount;
		var itemId;
        var commitLine;
        var i;
		var numLines;
        

        try {
			//Get if customer is taxable. HOW ?
			
			isCustomerWaterTaxExempt = nlapiGetCurrentLineItemValue('item', 'custcol_customer_is_water_tax_exempt');
			nlapiLogExecution('debug', 'isCustomerWaterTaxable (' + typeof isCustomerWaterTaxable + ')', isCustomerWaterTaxable);
			
			if(isCustomerWaterTaxExempt !== 'T'){
				//Get item lines
				numLines = nlapiGetLineItemCount('item');
				
				for (i = numLines; i >= 1; i--) {
					commitLine = false;
					nlapiSelectLineItem('item', i);
					
					//Get product water taxable code
					productWaterTaxCode = nlapiGetCurrentLineItemValue('item','custcol_water_tax_code'); 
					itemId = parseInt(nlapiGetCurrentLineItemValue('item', 'item'), 10);
					
					nlapiLogExecution('debug', '--- START ---', '--- START ' + itemId + ' ---');
					nlapiLogExecution('debug', 'productWaterTaxCode (' + typeof productWaterTaxCode + ')', productWaterTaxCode);
					
					
					// if it's equals CHICAGO_BOTTLED_WATER
					// if(chicagoBottledWater) {
						// commitLine = true;
					// }
					
					// if (selectedShipMethod === FREE_SHIPPING_METHOD
						// && isLineExcluded === 'F'
						// && isLineShippingFree === 'T'
					// ) {
						// nlapiLogExecution('debug', 'Exclude', 'Excluding item ' + itemId + ' from shipping ' + selectedShipMethod);
						// nlapiSetCurrentLineItemValue('item', 'excludefromraterequest', 'T', false, false);
						// commitLine = true;
					// }
				
					// if (commitLine) {
						// nlapiCommitLineItem('item');
					// }
					
					nlapiLogExecution('debug', '--- END ---', '--- END ' + itemId + ' ---');
				}
				
				//ADD tax amount.
				
				// nlapiSetFieldValue('taxtotal', taxRate, false /*fire field change*/, true /*synchronous*/);
			}
        } catch (e) {
            nlapiLogExecution('debug', 'An error has occurred, details: ', e.message);
        }
    };

    // var fieldChanged = function fieldChanged(type, field) {
        // var numLines;

        // if (
            // nlapiGetContext().getExecutionContext() === 'webstore'
            // && type === 'item'
            // && field === 'shipmethod'
        // ) {
            // nlapiLogExecution('debug', '--- START ---', '--- fieldChanged ---');
            // numLines = nlapiGetLineItemCount('item');

            // if (numLines > 0) {
                // nlapiSelectLineItem('item', 1);
                // nlapiCommitLineItem('item');
            // }
            // nlapiLogExecution('debug', 'numLines', numLines);
            // nlapiLogExecution('debug', '--- END ---', '--- fieldChanged ---');
        // }
    // };

    var recalc = function recalc(type, action) {
        if (
            nlapiGetContext().getExecutionContext() === 'webstore'
            && action === 'commit'
        ) {
            nlapiLogExecution('debug', '--- START ---', '--- recalc ---');
            addWaterTax();
            nlapiLogExecution('debug', '--- END ---', '--- recalc ---');
        }
    };

    return {
        // fieldChanged: fieldChanged,
        recalc: recalc
    };
}());
