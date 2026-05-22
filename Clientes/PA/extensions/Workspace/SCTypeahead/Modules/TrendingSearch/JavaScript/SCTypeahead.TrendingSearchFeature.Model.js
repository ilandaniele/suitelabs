define('SCTypeahead.TrendingSearchFeature.Model', [
    'Backbone',
    'Backbone.CachedModel',
    'underscore',
    'Utils'
], function(
    Backbone,
    BackboneCachedModel,
    _,
    Utils
) {
    'use strict';

    return BackboneCachedModel.extend({
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/SCTypeahead.TrendingSearchFeature.Service.ss"
            )
        ),

        parse: function(item)
        {
            if( item.hasOwnProperty('custrecord_tsi_item_url_component') && item.custrecord_tsi_item_url_component )
            {
                item.custrecord_tsi_item_url_component = item.custrecord_tsi_item_url_component.replace(/^.*\/\/[^\/]+/, '');
            }

            if( item.hasOwnProperty('custrecord_tsc_related_cat_link') && item.custrecord_tsc_related_cat_link )
            {
                item.custrecord_tsc_related_cat_link = item.custrecord_tsc_related_cat_link.replace(/^.*\/\/[^\/]+/, '');
            }

            if( item.hasOwnProperty('custrecord_tsi_popularity_count') && item.custrecord_tsi_popularity_count ) //for items
            {
                if(!isNaN(parseInt(item.custrecord_tsi_popularity_count, 10 )))
                {
                    item.custrecord_tsi_popularity_count = parseInt(item.custrecord_tsi_popularity_count, 10);
                }                
            }
            if( item.hasOwnProperty('custrecord_tsc_popularity_count') && item.custrecord_tsc_popularity_count ) //for categories
            {
                if(!isNaN(parseInt(item.custrecord_tsc_popularity_count, 10 )))
                {
                    item.custrecord_tsc_popularity_count = parseInt(item.custrecord_tsc_popularity_count, 10);
                }                
            }

            if( item.hasOwnProperty('custrecord_tsi_item_review_rating') && item.custrecord_tsi_item_review_rating)
            {
                item.custrecord_tsi_item_review_rating_percent = parseFloat(item.custrecord_tsi_item_review_rating)/5*100;
            }
            
            return item;
        }
    });
}); 
