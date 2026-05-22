
function service(request, response)
{
	'use strict';
	try 
	{
		require('SSD.ShippingMethodExtension.ShippingMethod.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SSD.ShippingMethodExtension.ShippingMethod.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}