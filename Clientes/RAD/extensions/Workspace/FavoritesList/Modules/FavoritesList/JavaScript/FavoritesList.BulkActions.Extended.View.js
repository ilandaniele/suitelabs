define('FavoritesList.BulkActions.Extended.View', [
    'ProductList.BulkActions.View',
    'ShareFavorites.Model',
    'Profile.Model',
    'underscore'
], function FavoritesListBulkActionsExtendedView(
    BulkActionsExtendedView,
    ShareFavoritesModel,
    ProfileModel,
    _
) {
    'use strict';

    _.extend(BulkActionsExtendedView.prototype, {
        getContext: _.wrap(BulkActionsExtendedView.prototype.getContext, function getContext(fn) {
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices') ? 'T' : 'F';
            var share = new ShareFavoritesModel();
            var url = _.translate(share.url() + '?userid=$(0)&listid=$(1)&enableprice=$(2)&useretailprice=$(3)',
                user.get('internalid'), this.model.id, !user.hidePrices() ? 'T' : 'F', useRetailPrices);
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isFavorite: this.model.get('templateId') === '1',
                isPriceEnabled: !user.hidePrices(),
                pdfUrl: url
            });
        })
    });
});
