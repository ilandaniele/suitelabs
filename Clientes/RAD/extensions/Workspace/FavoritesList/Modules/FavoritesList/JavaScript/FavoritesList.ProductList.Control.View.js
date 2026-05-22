define('FavoritesList.ProductList.Control.View', [
    'ProductList.Control.View',
    'ProductList.ControlSingle.View',
    'FavoritesList.ControlSingle.View',
    'ProductList.Collection',
    'Tracker',
    'underscore',
    'Utils'
], function FavoritesListProductListControlView(
    ProductListControlView,
    ProductListControlSingleView,
    FavoritesListControlSingleView,
    ProductListCollection,
    Tracker,
    _,
    Utils
) {
    'use strict';

    var ControlViewFunctions = {
        addNewProductToList: function addNewProductToList(newList) {
            this.addItemToList(this.product, newList, true);
            this.saveAndShowConfirmationMessage(
                this.$('.ul-product-lists [type="checkbox"]:checked').length > 1
                    ? Utils.translate('Success! You added this item to your Projects')
                    : Utils.translate('Success! You added this item to your Project')
            );
        },
        doAddItemToList: function doAddItemToList(product, productList, dontShowMessage) {
            var self = this;
            var alreadyAdded = false;
            var productListLineToSave = this.getNewItemData(product, productList);
            var productLists = this.utils.getProductLists();
            if (!productLists.get(productList.get('internalid'))) {
                productLists.add(productList);
                alreadyAdded = true;
            }
            return productListLineToSave.save(null, {
                // Note this is lack of validation is require to not validate the JSON returned from the
                // services as it will lack the Model/Collection structure required to run the
                // validation. for example the list of options will be an array and not a collection
                // as the event handle that parse them didn't run yet
                validate: false,
                success: function productListSave(productListLine) {
                    if (!alreadyAdded) {
                        productList.get('items').add(productListLine);
                    } else {
                        productList.set('items', [productListLine]);
                    }

                    Tracker.getInstance().trackAddToWishlist(self.product);

                    self.collection.trigger('changed');
                    self.render();
                    self.triggerChange();
                    if (!dontShowMessage) {
                        self.saveAndShowConfirmationMessage(
                            self.$('.ul-product-lists [type="checkbox"]:checked').length > 1
                                ? Utils.translate('Success! You added this item to your product lists')
                                : Utils.translate('Success! You added this item to your product list')
                        );
                    }
                }
            });
        },
        showFlyout: _.wrap(ProductListControlView.prototype.showFlyout, function showFlyout(fn) {
            if (this.isDisabledWishlistButton) {
                return;
            }
            fn.apply(this, _.toArray(arguments).slice(1));
        }),
        triggerChange: function triggerChange() {
            var productListsInstance = this.utils.getProductLists();
            productListsInstance.trigger('change');
        }
    };

    _.extend(ProductListControlView.prototype, {
        initialize: _.wrap(ProductListControlView.prototype.initialize, function initialize(fn) {
            var favorites;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.utils = this.utils ? this.utils : this.options.application.ProductListModule.Utils;
            favorites = this.utils.getFavoriteList();
            favorites = favorites && favorites.length ? favorites[0] : null;
            if (favorites) {
                this.collection = this.collection.filter(function filterFavorites(model) {
                    return (!!favorites && favorites.id !== model.id);
                });

                if (!(this.collection instanceof ProductListCollection)) {
                    this.collection = new ProductListCollection(this.collection);
                }
            }
        }),
        events: _.extend(ProductListControlView.prototype.events, {
            'click [data-action="close-message"]': function hideMessage() {
                this.hideConfirmationMessage();
            }
        })
    });

    _.extend(ProductListControlView.prototype, ControlViewFunctions);
    _.extend(ProductListControlSingleView.prototype, ControlViewFunctions);
    _.extend(FavoritesListControlSingleView.prototype, ControlViewFunctions);
});
