define('SCTypeahead.RecentlySearched.Collection', [
    'Backbone',
    'underscore',
    'Utils'
], function(
    Backbone,
    _,
    Utils
) {
    'use strict';

    
    
    return Backbone.Collection.extend({

        parse: function(items) 
        {
            var res = _.map(items, function (n, i) {
                return {key: n, data_index: i};
            });
            return res;
        }
    });
});
