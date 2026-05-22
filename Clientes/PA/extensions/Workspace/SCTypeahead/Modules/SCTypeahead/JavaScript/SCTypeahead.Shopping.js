define(
	'SCTypeahead.Shopping'
,   [
		'SCTypeahead.SiteSearch.View.Extend'
	,	'SCTypeahead.ItemsSearcher.View.Extend'
	,	'SCTypeahead.ItemsSearcher.Item.View.Extend'
	,	'SCTypeahead.Header.View.Extend'
	,	'SCTypeahead.Utils.Extend'
	,	'SCTypeahead.BackToSearchResults.Cart.Detailed.View.Extend'
	,	'SCTypeahead.BackToSearchResults.ProductDetails.Full.View.Extend'
	,	'SCTypeahead.BackToSearchResults.Header.View.Extend'
	,	'SCTypeahead.BackToSearchResults.Facets.Browse.View.Extend'
	,	'SCTypeahead.BackToSearchResults.Home.View.Extend'
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
	,	SCTypeaheadBackToSearchResultsCartDetailedViewExtend
	,	SCTypeaheadBackToSearchResultsProductDetailsFullViewExtend
	,	SCTypeaheadBackToSearchResultsHeaderViewExtend
	,	SCTypeaheadBackToSearchResultsFacetsBrowseViewExtend
	,	SCTypeaheadBackToSearchResultsHomeViewExtend
	,	Configuration
	,	Handlebars
	,	Backbone
	,	Utils
	,	_
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (application) {
			Handlebars.registerHelper('highlightKeywords', function(text, keywords) {
				return new Handlebars.SafeString(Utils.highlightKeywords(text, keywords));
			});
		}
	};
}); 
