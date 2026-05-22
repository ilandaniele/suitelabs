define('SCTypeahead.BackToSearchResults.Home.View.Extend', [
    'Home.View',
    'Utils',
    'underscore'
], function (
    HomeView,
    Utils,
    _
) {
    'use strict';

    _.extend(HomeView.prototype,{

        initialize: _.wrap(HomeView.prototype.initialize, function(fn)
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
