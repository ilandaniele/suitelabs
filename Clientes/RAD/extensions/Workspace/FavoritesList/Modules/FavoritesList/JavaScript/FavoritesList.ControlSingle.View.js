define('FavoritesList.ControlSingle.View', [
    'ProductList.ControlSingle.View',
    'favorites_list_control_single.tpl',
    'ProductList.Control.View',
    'underscore',
    'jQuery'
], function FavoritesListControlSingleView(
    ProductListControlSingleView,
    favoritesListControlSingleTpl,
    ProductListControlView,
    _,
    jQuery
) {
    'use strict';

    return ProductListControlSingleView.extend({
        template: favoritesListControlSingleTpl,
        events: {
            'click [data-type="add-product-to-single-list"]': 'addRemoveProduct'
        },
        triggerChange: ProductListControlView.prototype.triggerChange,
        initialize: _.wrap(ProductListControlSingleView.prototype.initialize, function initialize(fn) {
            var favoriteslist;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.utils = this.options.application.ProductListModule.Utils;
            favoriteslist = this.utils.getFavoriteList();
            this.single_list = this.utils.getProductLists().length === 1 ? this.collection.at(0) : _.find(this.collection.models, function findModel(list) {
                return list.get('name') === favoriteslist[0].get('name');
            });
            this.on('afterViewRender', function fnAfterViewRender() {
                _.defer(function fnDefer() {
                    if (jQuery('.stock-notifications-accordion').length) {
                        jQuery('.favorites-wrap').addClass('no-stock');
                    }
                });
            });
        }),
        isProductAlreadyAdded: function isProductAlreadyAdded() {
            return !!this.single_list && this.single_list.checked(this.product);
        },
        addRemoveProduct: function addRemoveProduct(e) {
            if (!this.isProductAlreadyAdded()) {
                this.addItemToSingleList(e);
            } else {
                this.removeItemFromList(this.product, e);
            }
        },
        removeItemFromList: function removeItemFromList(product, e) {
            var self = this;
            var productId = this.getProductId(product);
            var productItem = this.single_list.get('items').find(function findSingleList(item) {
                return (
                    parseInt(item.get('item').get('internalid'), 10) === parseInt(productId, 10)
                    || parseInt(item.get('item').get('originalid'), 10) === parseInt(productId, 10));
            });
            e.preventDefault();

            if (productItem) {
                productItem.set('productList', {
                    id: self.single_list.get('internalid') || self.single_list.get('originalid'),
                    owner: self.single_list.get('owner').id
                });
                this.single_list.get('items').remove(productItem);

                productItem.destroy().done(function destroyItemDone() {
                    self.single_list.collection.trigger('changed');
                    self.render();
                    self.triggerChange();
                });
            } else {
                self.render();
            }
        },
        getContext: function getContext() {
            var model = this.single_list;
            return {
                isProductAlreadyAdded: this.isProductAlreadyAdded(),
                name: model && model.get('name'),
                id: model && model.get('internalid')
            };
        }
    });
});
