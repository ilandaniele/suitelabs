define('FavoritesList.ProductList.ControlItem.View', [
    'ProductList.ControlItem.View',
    'jQuery',
    'underscore'
], function FavoritesListProductListControlItemView(
    ProductListControlItemView,
    jQuery,
    _
) {
    'use strict';

    _.extend(ProductListControlItemView.prototype, {
        pListItemHandler: function pListItemHandler(e) {
            e.preventDefault();
            e.stopPropagation();
            this.pListItemHandlerAddRemove(e);
        },
        pListItemHandlerAddRemove: _.debounce(function pListItemHandlerAddRemove(e) {
            var self = this;
            var checkbox = jQuery(e.target);
            if (self.parentView.mode === 'move') {
                self.moveProduct();
            } else {
                self.addRemoveProduct(checkbox);
            }
        }, 600),
        removeItemFromList: function removeItemFromList(product) {
            var self = this;
            var productId = this.parentView.getProductId(product);
            var productItem = self.model.get('items').find(function findItem(item) {
                return parseInt(item.get('item').get('internalid'), 10) === parseInt(productId, 10);
            });
            var productListsInstance = this.parentView.utils.getProductLists();

            if (productItem) {
                productItem.set('productList', {
                    id: self.model.get('internalid'),
                    owner: self.model.get('owner').id
                });
                this.model.get('items').remove(productItem);

                productItem.destroy().done(function productItemDestroy() {
                    self.model.collection.trigger('changed');
                    productListsInstance.trigger('change');
                    self.parentView.render();
                    self.parentView.hideConfirmationMessage();
                });
            } else {
                self.parentView.render();
            }
        }
    });
});
