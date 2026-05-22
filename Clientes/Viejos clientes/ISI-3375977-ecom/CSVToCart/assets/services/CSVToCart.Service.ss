function service(request, response)
{
	'use strict';
	try
	{
		require('CSVToCart.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('CSVToCart.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
