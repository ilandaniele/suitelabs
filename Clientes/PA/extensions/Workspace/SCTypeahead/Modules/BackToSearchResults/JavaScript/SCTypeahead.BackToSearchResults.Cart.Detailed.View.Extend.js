define('SCTypeahead.BackToSearchResults.Cart.Detailed.View.Extend', [
    'Cart.Detailed.View',
    'Utils',
    'underscore'
], function(
    CartDetailedView,
    Utils,
    _
) {
    'use strict';

    _.extend(CartDetailedView.prototype,{

        initialize:  _.wrap(CartDetailedView.prototype.initialize, function(fn)
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
