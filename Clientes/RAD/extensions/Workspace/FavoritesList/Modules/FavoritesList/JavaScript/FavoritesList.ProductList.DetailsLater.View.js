define('FavoritesList.ProductList.DetailsLater.View', [
    'ProductList.DetailsLater.View',
    'Profile.Model',
    'underscore'
], function FavoritesListProductListDetailsLaterView(
    ProductListDetailsLaterView,
    ProfileModel,
    _
) {
    'use strict';

    var favoritesPromise;
    _.extend(ProductListDetailsLaterView.prototype, {
        loadProductList: _.wrap(ProductListDetailsLaterView.prototype.loadProductList, function loadProductList(fn) {
            var self = this;
            if (this.model.get('typeName') !== 'default' && this.model.get('name') !== 'Favorites') {
                return fn.apply(this, _.toArray(arguments).slice(1));
            }
            if (!favoritesPromise) {
                ProfileModel.getPromise().done(function profileGetPromiseDone() {
                    if (ProfileModel.getInstance().get('isLoggedIn') === 'T') {
                        self.favoritesUtils = self.options.application.ProductListModule.Utils;

                        self.favoritesUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                            var favoritesList = self.favoritesUtils.getFavoriteList();
                            if (favoritesList.length) {
                                favoritesList = favoritesList[0];
                                favoritesPromise = self.favoritesUtils.getProductList(favoritesList.id).done(function getProductListDone(favoriteList) {
                                    favoriteList.name = _.translate('Favorites');
                                    self.favoriteList = favoriteList;
                                    self.isLoading = false;
                                    self.model.set(favoriteList);
                                    self.render();
                                });
                            }
                        });
                    }
                });
            }

            return favoritesPromise;
        }),
        disableElementsOnPromise: _.wrap(ProductListDetailsLaterView.prototype.disableElementsOnPromise, function disableElementsOnPromise(fn, wholePromise) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            wholePromise.done(function wholePromiseDone() {
                self.notifiyChangeToHeaders();
            });
        }),
        showConfirmationMessage: _.wrap(ProductListDetailsLaterView.prototype.showConfirmationMessage, function showConfirmationMessage(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.notifiyChangeToHeaders();
        }),
        notifiyChangeToHeaders: function notifiyChangeToHeaders() {
            var projectsListIntances = this.application.ProductListModule.Utils.getProductLists();
            projectsListIntances.trigger('change');
        },
        getContext: _.wrap(ProductListDetailsLaterView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.name = this.model.get('name');
            return originalRet;
        })
    });
});
