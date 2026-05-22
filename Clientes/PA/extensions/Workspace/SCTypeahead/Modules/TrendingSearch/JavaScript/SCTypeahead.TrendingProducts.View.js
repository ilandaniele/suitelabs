define('SCTypeahead.TrendingProducts.View'
,	[
        'sc_typeahead_trending_products.tpl'
    ,   'SCTypeahead.TrendingSearchFeature.Collection'
    ,   'SC.Configuration'
	,	'Utils'
	,	'jQuery'	
	,	'Backbone'
	,	'underscore'
    ]
, function (
        sc_typeahead_trending_products_tpl
    ,   TrendingSearchFeatureCollection
    ,   Configuration
	,	Utils
	,	jQuery
	,	Backbone
	,	_
)
{
    'use strict';

    var maxTrendingProductsToBeShown = Configuration.get('sctypeahead.trendingSearches.products.maxProductsToBeShown') || 5;

	return Backbone.View.extend({

        template: sc_typeahead_trending_products_tpl

    ,   fetchOptions: {
            columns: 'custrecord_tsi_popularity_count,custrecord_tsi_item_name,custrecord_tsi_item_description,custrecord_tsi_item_manufacturer,custrecord_tsi_item_review_rating,custrecord_tsi_item_image,custrecord_tsi_item_url_component',
            recordType: 'customrecord_trending_search_items',
            recordLimit: maxTrendingProductsToBeShown
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
                trendingSearchProducts: this.collection,
                showTrendingProducts: !!this.collection.length,
                isImageOptimizationEnabled: Configuration.get('pa.imageOptimizationEnabled')
			};
		}
	});
}); 
