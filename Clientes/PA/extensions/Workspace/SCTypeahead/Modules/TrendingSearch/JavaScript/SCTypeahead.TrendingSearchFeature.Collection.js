define('SCTypeahead.TrendingSearchFeature.Collection', [
    'Backbone',
    'Backbone.CachedCollection',
    'SC.Configuration',
    'SCTypeahead.TrendingSearchFeature.Model',
    'underscore',
    'Utils'
], function(
    Backbone,
    BackboneCachedCollection,
    Configuration,
    TrendingSearchFeatureModel,
    _,
    Utils
) {
    'use strict';

    var original_fetch = BackboneCachedCollection.prototype.fetch;
    
    return BackboneCachedCollection.extend({
        
        model: TrendingSearchFeatureModel,

        url: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/SCTypeahead.TrendingSearchFeature.Service.ss"
            )
        ),

        options: { cache: true },

        fetch: function(options) 
        {
            _.extend(this.options, options || {});

            return original_fetch.apply(this, arguments);
        },

        parse: function(items) 
        {
            items = _.sortBy(items,function(item){
                if( item && item.hasOwnProperty('custrecord_tsi_popularity_count') )
                {
                    return -item.custrecord_tsi_popularity_count;
                }
                if( item && item.hasOwnProperty('custrecord_tsc_popularity_count') )
                {
                    return -item.custrecord_tsc_popularity_count;
                }  
            });
            return items;
        }
    });
});
