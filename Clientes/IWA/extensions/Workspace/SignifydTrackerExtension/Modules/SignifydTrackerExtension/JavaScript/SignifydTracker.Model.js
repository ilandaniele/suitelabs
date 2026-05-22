define(
	'SignifydTracker.Model'
,	[
		'underscore'
	,	'Backbone'
	,	'Utils'
	]
,	function (
		_
	,	Backbone
	,	Utils
	)
{
	'use strict';

	return Backbone.Model.extend({

        urlRoot: Utils.getAbsoluteUrl('services/SignifydTracker.Service.ss')
	});
});
