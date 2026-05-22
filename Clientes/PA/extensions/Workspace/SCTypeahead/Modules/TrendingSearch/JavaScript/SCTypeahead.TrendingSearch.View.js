define('SCTypeahead.TrendingSearch.View'
,	[
        'sc_typeahead_trending_search.tpl'
    ,   'SCTypeahead.RecentlySearched.View'
    ,   'SCTypeahead.TrendingCategories.View'
    ,   'SCTypeahead.TrendingProducts.View'
    ,   'SC.Configuration'
	,	'Utils'
	,	'jQuery'	
	,	'Backbone'
	,	'underscore'
    ]
, function (
        sc_typeahead_trending_search_tpl
    ,   RecentlySearchedView
    ,   TrendingCategoriesView
    ,   TrendingProductsView
    ,   Configuration
	,	Utils
	,	jQuery
	,	Backbone
	,	_
)
{
    'use strict';

    var showTrendingCategories = Configuration.get('sctypeahead.trendingSearches.categories.enableTrendingCategories');
    var showTrendingProducts = Configuration.get('sctypeahead.trendingSearches.products.enableTrendingProducts');
    var showRecentlySearched = Configuration.get('sctypeahead.recentlySearched.enableRecentlySearchedKeyword');

	return Backbone.View.extend({

        template: sc_typeahead_trending_search_tpl
    
    ,   childViews: {
            'Recently.Search': function()
            {
                return new RecentlySearchedView();
            },

            'Trending.Categories': function()
            {
                return new TrendingCategoriesView();
            },

            'Trending.Products': function()
            {
                return new TrendingProductsView();
            }
        }

    ,   initialize: function initialize()
        {
            this.model && this.model.on('change:show', this.render, this);    

            Backbone.on('recently_searched_collection_changed', this.render, this);
        }

	,	getContext: function getContext()
		{
            var isMobile = Utils.isPhoneDevice() || Utils.isTabletDevice();

            var recent_keywords = Utils.getRecentlySearchKeywordFromCookie() || [];
            var showCloseIcon = showTrendingCategories || showTrendingProducts || (showRecentlySearched && recent_keywords && !!recent_keywords.length);
            return {    
                showView: !!this.model.get('show'),
                isMobile: isMobile,
                showTrendingCategories: showTrendingCategories,
                showTrendingProducts: showTrendingProducts,
                showRecentlySearched: showRecentlySearched && recent_keywords && !!recent_keywords.length,
                showCloseIcon: showCloseIcon
			};
		}
	});
}); 
