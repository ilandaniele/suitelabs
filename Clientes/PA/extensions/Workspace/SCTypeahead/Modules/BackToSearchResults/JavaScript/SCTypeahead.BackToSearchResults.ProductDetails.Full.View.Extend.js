define('SCTypeahead.BackToSearchResults.ProductDetails.Full.View.Extend', [
    'ProductDetails.Full.View',
    'SC.Configuration',
    'jQuery',
    'Utils',
    'underscore'
], function(
    ProductDetailsFullView,
    Configuration,
    jQuery,
    Utils,
    _
) {
    'use strict';


    _.extend(ProductDetailsFullView.prototype,{

        getContext: _.wrap(ProductDetailsFullView.prototype.getContext, function(fn)
        {
            var currentContext = fn.apply(this, _.toArray(arguments).slice(1)),
                searchResultUrl = Utils.getSearchResultUrlCookie(),
                enableBackToSearchResult = Configuration.get('sctypeahead.backtosearchresults.enableBackToSearchResult');

            return _.extend(currentContext, {
                searchResultUrl: !(searchResultUrl.charAt(0) === '"' && searchResultUrl.charAt(1) === '"'),
                enableBackToSearchResult: enableBackToSearchResult
            })
        }),

        events: {
            'click [data-action="go-back-to-search-results"]': 'goBackToSearchResult'
        },

        goBackToSearchResult: function(e){
            e.preventDefault();
            window.history.back();
        }

    });
}); 
