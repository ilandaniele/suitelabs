define(
	'SignifydTracker.Model'
,	[
		'SC.Model'
	,	'Models.Init'

	,	'underscore'
	,	'Utils'
	]

,	function (
		SCModel
	,	ModelsInit

	,	_
	)
{
	'use strict';

	return SCModel.extend({

		name: 'SignifydTrackerModel'

    ,   SendData: function (request) 
        {
            try {
                var config = SC.Configuration.signifyd;
                nlapiLogExecution("DEBUG", "SignifydTracker config", JSON.stringify(config));
                var url = config.apiUrl;
                var apiKey = config.apiKey;
                var auth = nlapiEncrypt(apiKey+':', 'base64');
                var headers = {
                    "User-Agent-x": "Signifyd Service",
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + auth
                };
                nlapiLogExecution("DEBUG", "SignifydTracker headers", JSON.stringify(headers));
                var requestObj = request;
                nlapiLogExecution("DEBUG", "SignifydTracker requestObj", JSON.stringify(requestObj));
                var response = nlapiRequestURL(url, JSON.stringify(requestObj), headers, "POST").getBody();
                nlapiLogExecution("DEBUG", "SignifydTracker response", JSON.stringify(response));
                var responseObj = JSON.parse(response);
                if(response.errors != null) {

                }
                return {
                    status: 200
                ,	code: "OK"
                ,	message: response
                };
            }
            catch (ex) {
                nlapiLogExecution("ERROR", "SignifydTracker Exception", JSON.stringify(ex));
                return {
                    status: 500
                ,	code: "ERROR"
                ,	message: response
                };
            }
        }
	});
});
