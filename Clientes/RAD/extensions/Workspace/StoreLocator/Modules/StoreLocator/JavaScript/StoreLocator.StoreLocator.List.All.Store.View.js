define('StoreLocator.StoreLocator.List.All.Store.View', [
    'underscore',
    'StoreLocator.List.All.Store.View'
], function StoreLocatorListAllStoreViewFn(
    _,
    StoreLocatorListAllStoreView
) {
    'use strict';

    _.extend(StoreLocatorListAllStoreView.prototype, {
        getContext: _.wrap(StoreLocatorListAllStoreView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.urlcomponent = this.model.get('urlcomponent');
            return originalRet;
        })
    });
});
