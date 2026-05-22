define('SCTypeahead.TrendingCategories.View'
,	[
        'sc_typeahead_trending_categories.tpl'
    ,   'SCTypeahead.TrendingSearchFeature.Collection'
    ,   'SC.Configuration'
	,	'Utils'
	,	'jQuery'	
	,	'Backbone'
	,	'underscore'
    ]
, function (
        sc_typeahead_trending_categories_tpl
    ,   TrendingSearchFeatureCollection
    ,   Configuration
	,	Utils
	,	jQuery
	,	Backbone
	,	_
)
{
    'use strict';

    var maxTrendingCategoriesToBeShwon = Configuration.get('sctypeahead.trendingSearches.categories.maxCategoriesToBeShown') || 10;

	return Backbone.View.extend({

        template: sc_typeahead_trending_categories_tpl

    ,   fetchOptions: {
            columns: 'custrecord_tsc_popularity_count,custrecord_tsc_corrected_search_term,custrecord_tsc_related_cat_link',
            recordType: 'customrecord_trending_search_categories',
            recordLimit: maxTrendingCategoriesToBeShwon
        }

    ,   initialize: function(options)
        {
            this.collection = new TrendingSearchFeatureCollection();

            this.collection.fetch({
                data: this.fetchOptions
            });

            this.collection && this.collection.on('reset destroy change add remove', this.render, this);
        }

    ,	getContext: function getContext()
		{
            return {    
                trendingSearchCategories: this.collection,
                showTrendingCategories: !!this.collection.length
			};
		}
	});
}); 
