define(
	'SCTypeahead.MyAccount'
,   [
		'SCTypeahead.SiteSearch.View.Extend'
	,	'SCTypeahead.ItemsSearcher.View.Extend'
	,	'SCTypeahead.ItemsSearcher.Item.View.Extend'
	,	'SCTypeahead.Header.View.Extend'
	,	'SCTypeahead.Utils.Extend'
	,	'SC.Configuration'
	,	'Handlebars'
	,	'Backbone'
	,	'Utils'
	,	'underscore'
	]
,   function (	
		SCTypeaheadSiteSearchViewExtend
	,	SCTypeaheadItemsSearcherViewExtend
	,	SCTypeaheadItemsSearcherItemViewExtend
	,	SCTypeaheadHeaderViewExtend
	,	SCTypeaheadUtilsExtend
	,	Configuration
	,	Handlebars
	,	Backbone
	,	Utils
	,	_
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (application)
		{
			Handlebars.registerHelper('highlightKeywords', function(text, keywords) 
			{
				return new Handlebars.SafeString(Utils.highlightKeywords(text, keywords));
			});
		}
	};
}); 
