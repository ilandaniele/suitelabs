
function service(request, response)
{
	'use strict';
	try
	{
		require('InactivityMessage.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('InactivityMessage.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
