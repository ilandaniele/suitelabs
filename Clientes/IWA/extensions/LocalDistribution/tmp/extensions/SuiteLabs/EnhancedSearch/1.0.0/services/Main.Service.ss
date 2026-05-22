
function service(request, response)
{
	'use strict';
	try 
	{
		require('SuiteLabs.EnhancedSearch.Main.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SuiteLabs.EnhancedSearch.Main.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}