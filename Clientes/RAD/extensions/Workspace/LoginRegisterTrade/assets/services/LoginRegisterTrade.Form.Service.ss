
function service(request, response)
{
	'use strict';
	try
	{
		require('LoginRegisterTrade.Form.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('LoginRegisterTrade.Form.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}
