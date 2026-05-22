
function service(request, response)
{
	'use strict';
	try 
	{
		require('SSD.VelaroChat.VelaroChat.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('SSD.VelaroChat.VelaroChat.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}