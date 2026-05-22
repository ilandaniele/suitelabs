define('FavoritesList.AddedToCart.Improved.View', [
    'ProductList.AddedToCart.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'underscore'
], function FavoritesListAddedToCartImprovedView(
    ProductListAddedToCartView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    _
) {
    'use strict';

    _.extend(ProductListAddedToCartView.prototype, {
        childViews: _.extend(ProductListAddedToCartView.prototype.childViews, {
            'ProductList.ItemsAddedToCart': function ProductListItemsAddedToCart() {
                var list = this.options.list;
                var isItem = !list;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    childViewOptions: {
                        application: this.application,
                        hide_rating: true,
                        hide_added_on: true,
                        hide_checkbox: true,
                        id: 'list',
                        name: 'List',
                        icon: 'icon-th-list',
                        isDefault: true,
                        isItemsAddedToCart: true,
                        hideStock: true
                    },
                    viewsPerRow: 1,
                    collection: isItem
                        ? [this.options.item]
                        : list.get('items').models.filter(this.isPurchasable)
                });
            }
        }),

        getContext: function getContext() {
            var list = this.options.list;
            var isItem = !list;
            var models = isItem ? [this.options.item] : list.get('items').models.filter(this.isPurchasable);

            return {
                isItem: isItem,
                hasMoreThanOneModel: models.length > 1,
                listName: !isItem ? list.get('name') : this.options.item.get('item').displayname,
                modelsLength: models.length,
                isItemsAddedToCart: this.options.isItemsAddedToCart || false
            };
        }
    });
});
