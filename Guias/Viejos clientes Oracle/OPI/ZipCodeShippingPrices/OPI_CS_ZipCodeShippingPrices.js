/* globals nlapiGetFieldValue, nlapiGetCurrentLineItemValue */

var ZipCodeShippingPricesModule = (function ZipCodeShippingPricesModule() {
    'use strict';

    var setZipCodeShippingPrice = function setZipCodeShippingPrice() {
        
		var shipMethod = nlapiGetFieldValue('shipmethod');
		var shipMethodName = nlapiGetFieldText('shipmethod');
		nlapiLogExecution('debug','shipMethod',shipMethod);
		nlapiLogExecution('debug','shipMethodName',shipMethodName);
		
		var zipCode = nlapiGetFieldValue('shipzip');
		
		zipCode = 98001;
		nlapiLogExecution('debug','zipcode',zipCode);
		// var desc = nlapiGetCurrentLineItemValue('item','description'); //get shipping price from table
		
		var filter = new nlobjSearchFilter('custrecord_orca_delivery_zip_code', null, 'is', zipCode);
		var column = new nlobjSearchColumn('custrecord_orca_delivery_shipping_cost');
		
		// no tengo permisos, llamar a suitelet
		//http module
		
		
		var shippingCost = searchresults.getValue('custrecord_orca_delivery_shipping_cost',null,null); //da nulo
		
		// var addressRecord = nlapiLoadRecord('address',addressId,'');
		// var zipCode = nlapiGetFieldValue('zip'); // no anda address record la tiene, get address record
		nlapiLogExecution('debug','cost',shippingCost); //devolvio algo, parse value
		
		
		
		// if(zipCode === '8000') { //if table zip is there, obtain shipping cost
			// shippingcostoverridden true
			
			//overrideshippingcost float
			
			//tengo que commitear esto??
			//tengo que actualizar en el modelo para ver en el frontend?
		// } else{
			// hide ship method
		// }
		
		
		// if(shipMethodname === 'Orca Delivery') {
			
		// }
		// Obtengo con el zipcode el shipping price, lo seteo, si esta vacío oculto el shipping method, si es orca delivery.
		
		// set shipping price
		
        
    };

    var recalc = function recalc(type, action) {
        if (
            nlapiGetContext().getExecutionContext() === 'webstore'
            && action === 'commit'
        ) {
            nlapiLogExecution('debug', '--- START ---', '--- recalc ---');
            setZipCodeShippingPrice();
            nlapiLogExecution('debug', '--- END ---', '--- recalc ---');
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
	
    return {
        // fieldChanged: fieldChanged,
        recalc: recalc
    };
}());