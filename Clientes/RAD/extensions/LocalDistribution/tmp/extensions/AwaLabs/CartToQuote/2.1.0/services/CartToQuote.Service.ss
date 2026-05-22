
function service(request, response)
{
	'use strict';
	try
	{
		require('CartToQuote.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('CartToQuote.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
