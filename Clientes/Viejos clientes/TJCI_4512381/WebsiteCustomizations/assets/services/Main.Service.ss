
function service(request, response)
{
	'use strict';
	try 
	{
		require('NSeComm.WebsiteCustomizations.Main.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('NSeComm.WebsiteCustomizations.Main.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}