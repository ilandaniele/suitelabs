function service(request, response)
{
	'use strict';
	try
	{
		require('AwaLabs.OrderStatusImprovements.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('AwaLabs.OrderStatusImprovements.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendContent({}, { status: 500 });
	}
}
