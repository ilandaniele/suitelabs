define(
	'SignifydTracker.ServiceController'
,	[
		'ServiceController'
	,	'SignifydTracker.Model'
	]
,	function(
		ServiceController
	,	SignifydTrackerModel
	)

	{
		'use strict';
		return ServiceController.extend({

			name:'SignifydTracker.ServiceController'

		,	post: function ()
			{
                return SignifydTrackerModel.SendData(this.data);
			}
		});
	}
);
