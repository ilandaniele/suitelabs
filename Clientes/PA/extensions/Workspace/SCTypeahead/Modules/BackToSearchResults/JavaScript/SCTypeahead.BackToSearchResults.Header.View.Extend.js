define('SCTypeahead.BackToSearchResults.Header.View.Extend', [
    'Header.View',
    'Utils',
    'underscore'
], function(
    HeaderView,
    Utils,
    _
) {
    'use strict';

    _.extend(HeaderView.prototype,{

        initialize: _.wrap(HeaderView.prototype.initialize, function(fn)
        {
            fn.apply(this,_.toArray(arguments).slice(1));

            if(!SC.isPageGenerator())
            {
                this.on('afterViewRender',function(){
                    Utils.trackSearchResultUrl();
                },this);
            }            
        })
    });
}); 
