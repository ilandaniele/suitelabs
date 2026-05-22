var freeshipping_item = new function freeShippingItemSC() {
	var self = this;
	self.isProcessing = false;
	
	var debug = new function debug (message) {
		nlapiLogExecution('DEBUG', 'Example Scriptable Cart', message);
	};
	
	var getContext = new function getContext () {
		return nlapiGetContext().getExecutionContext();
	};
	
	return {
		customRecalc: function (type, action) {
	  
		debug('Recalc called!');
			if (nlapiGetContext().getExecutionContext() !== 'webstore') return true
			if (self.isProcessing) return

			var shipMethod = nlapiGetField('shipmethod');
			debug('ship method: '+shipMethod);
			// if(
			// var lines = nlapiGetLineItemCount('item');


			// for (var i = 1; i <= lines; i++)
			// {
			// nlapiSelectLineItem('item', i);
			// }

			return true
		},

		customValidateLine: function (type) {
			if (nlapiGetContext().getExecutionContext() !== 'webstore') return true

			if (type !== 'item') return true

			var freeShipping = nlapiGetCurrentLineItemValue('item', 'custitem185');
			debug('free shipping: '+freeShipping);
			return true
		}
  };
}();


//You created a variable called freeshipping_item, so when you update the record for this script in NetSuite, 
// you need to reference the method names using this name. For example, instead of simply entering 
// recalc in the record's Recalc Function field, you need to enter freeshipping_item.recalc, because these are being returned by the function.