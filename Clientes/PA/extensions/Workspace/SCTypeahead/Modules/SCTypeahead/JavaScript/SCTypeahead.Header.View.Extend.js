define('SCTypeahead.Header.View.Extend', [
    'Header.View',
    'SC.Configuration',
    'Utils',
    'underscore'
], function(
    HeaderView,
    Configuration,
    Utils,
    _
) {
    'use strict';

    

    _.extend(HeaderView.prototype,{

        getContext: _.wrap(HeaderView.prototype.getContext, function(fn)
        {
            var parent_context = fn.apply(this, _.toArray(arguments).slice(1));

            var allowFullscreenSearchMobile = Configuration.get('sctypeahead.searchbargeneral.allowFullscreenSearchMobile');

            var updated_context = _.extend(parent_context, {
                allowFullscreenSearchMobile: allowFullscreenSearchMobile
            });

            return updated_context;
        })
    });
});
