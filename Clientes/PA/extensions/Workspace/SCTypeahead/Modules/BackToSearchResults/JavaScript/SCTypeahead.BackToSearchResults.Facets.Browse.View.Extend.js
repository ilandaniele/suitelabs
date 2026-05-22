define('SCTypeahead.BackToSearchResults.Facets.Browse.View.Extend', [
    'Facets.Browse.View',
    'Utils',
    'underscore'
], function(
    FacetsBrowseView,
    Utils,
    _
) {
    'use strict';

    _.extend(FacetsBrowseView.prototype,{

        initialize:  _.wrap(FacetsBrowseView.prototype.initialize, function(fn)
        {
            fn.apply(this, _.toArray(arguments).slice(1));
            if(!SC.isPageGenerator())
            {
                this.on('afterViewRender',function(){
                    Utils.trackSearchResultUrl();
                },this);
            }            
        })
    });
}); 
