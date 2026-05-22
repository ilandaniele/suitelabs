function debug (message)
{
  nlapiLogExecution('DEBUG', 'Free Shipping Script', message);
}

function customRecalc () {
	debug('entered recalc');
	if (nlapiGetContext().getExecutionContext() !== 'webstore') return true

	var shipMethod = nlapiGetFieldValue('shipmethod');
	var shipMethodName = nlapiGetFieldText('shipmethod');
	debug('shipMethod: '+shipMethod+' shipMethodName: '+shipMethodName);
	
	var numLines = nlapiGetLineItemCount('item');

	for (var i = 1; i<= numLines; i++) {
		var itemId = parseInt(nlapiGetLineItemValue('item','item',i)); // 31243 integer
		var exclude = nlapiGetLineItemValue('item','excludefromraterequest',i);
		// debug('is free shipping: '+isFreeShippingItem);
		debug('itemID: '+itemId+' shipmethod: '+shipMethod);
		var isFreeShipping = nlapiGetCurrentLineItemValue('item','custcol_apply_free_shipping');

		if(exclude === 'F' && itemId === 31243 && shipMethod === '110') {
			nlapiSelectLineItem('item', i);
			nlapiSetCurrentLineItemValue('item', 'excludefromraterequest', 'T', false, true);
			nlapiCommitLineItem('item');
			debug('TRIMMING SHIPPING current item: '+nlapiGetCurrentLineItemValue('item','item')+' current item custitemfield185: '+isFreeShipping);
		} else {
			if(exclude === 'T' && itemId === 31243 && shipMethod !== '110') {
				nlapiSelectLineItem('item', i);
				nlapiSetCurrentLineItemValue('item', 'excludefromraterequest', 'T', false, true);
				nlapiCommitLineItem('item');
				debug('ROLLING BACK SHIPPING current item: '+nlapiGetCurrentLineItemValue('item','item')+' current item custitemfield185: '+isFreeShipping);
			}
		}
		
	}
}

function customValidateLine (type)
{
	if (type = 'item') {
		var itemId = nlapiGetCurrentLineItemValue('item', 'item');
		// debug('Line validated: ' + itemId);
		// var rec = nlapiLoadRecord('inventoryitem', itemId); does not work need permission
	}
  
	if (nlapiGetContext().getExecutionContext() !== 'webstore') return true

	if (type !== 'item') return true

	// var freeShipping = nlapiGetCurrentLineItemValue('item', 'custitem185'); does not work
	var qty = parseInt(nlapiGetCurrentLineItemValue('item', 'quantity'));
	// debug('quantity:' + qty); //+' free shipping: '+freeShipping
	return true
}



function customFieldChanged(type,name, linenum) {
	debug('entered field change');
	if (nlapiGetContext().getExecutionContext() !== 'webstore') return true

	var shipMethod = nlapiGetFieldValue('shipmethod');
	var shipMethodName = nlapiGetFieldText('shipmethod');
	debug('shipMethod: '+shipMethod+' shipMethodName: '+shipMethodName);
	
	var numLines = nlapiGetLineItemCount('item');

	for (var i = 1; i<= numLines; i++) {
		var itemId = parseInt(nlapiGetLineItemValue('item','item',i)); // 31243 integer
		var exclude = nlapiGetLineItemValue('item','excludefromraterequest',i);
		// debug('is free shipping: '+isFreeShippingItem);
		debug('itemID: '+itemId+' shipmethod: '+shipMethod);
		var isFreeShipping = nlapiGetCurrentLineItemValue('item','custcol_apply_free_shipping');

		if(exclude === 'F' && itemId === 31243 && shipMethod === '110') {
			nlapiSelectLineItem('item', i);
			nlapiSetCurrentLineItemValue('item', 'excludefromraterequest', 'T', false, true);
			nlapiCommitLineItem('item');
			debug('TRIMMING SHIPPING current item: '+nlapiGetCurrentLineItemValue('item','item')+' current item custitemfield185: '+isFreeShipping);
		} else {
			if(exclude === 'T' && itemId === 31243 && shipMethod !== '110') {
				nlapiSelectLineItem('item', i);
				nlapiSetCurrentLineItemValue('item', 'excludefromraterequest', 'T', false, true);
				nlapiCommitLineItem('item');
				debug('ROLLING BACK SHIPPING current item: '+nlapiGetCurrentLineItemValue('item','item')+' current item custitemfield185: '+isFreeShipping);
			}
		}
		
	}
}