
function service(request, response)
{
	'use strict';
	try 
	{
		require('NS.RestrictListOfShippingMethods.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('NS.RestrictListOfShippingMethods.ServiceController', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}