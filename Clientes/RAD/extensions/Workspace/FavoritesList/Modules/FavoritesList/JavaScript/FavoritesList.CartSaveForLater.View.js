define('FavoritesList.CartSaveForLater.View', [
    'Cart.Detailed.View',
    'underscore'
], function FavoritesListCartSaveForLaterView(
    CartDetailedView,
    _
) {
    'use strict';

    _.extend(CartDetailedView.prototype, {
        disableElementsOnPromise: _.wrap(CartDetailedView.prototype.disableElementsOnPromise, function disableElementsOnPromise(fn, wholePromise) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            wholePromise.done(function wholePromiseDone() {
                var projectsListIntances = self.application.ProductListModule.Utils.getProductLists();
                projectsListIntances.trigger('change');
            });
        })
    });
});
