
function service(request, response)
{
	'use strict';
	try 
	{
		require('CaseForm.Case.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('CaseForm.Case.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}