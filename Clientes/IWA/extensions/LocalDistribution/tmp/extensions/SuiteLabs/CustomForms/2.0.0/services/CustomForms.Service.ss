
function service(request, response)
{
	'use strict';
	try 
	{
		require('CustomForms.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('CustomForms.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}