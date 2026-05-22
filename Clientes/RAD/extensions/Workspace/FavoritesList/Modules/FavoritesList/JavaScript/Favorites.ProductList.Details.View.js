define('Favorites.ProductList.Details.View', [
    'ProductList.Details.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'ProductList.Model',
    'Backbone',
    'underscore',
    'FavoritesList.ProductList.Details.View'
], function FavoritesProductListDetailsView(
    ProductListDetailsView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    ProductListModel,
    Backbone,
    _
) {
    'use strict';


    return ProductListDetailsView.extend({
        childViews: _.extend(ProductListDetailsView.prototype.childViews, {
            'ProductList.DynamicDisplay': function ProductListDynamicDisplay() {
                var displayOption = this.getDisplayOption();
                var rows = parseInt(displayOption.columns, 10) || 3;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    collection: this.collection.models,
                    viewsPerRow: rows,
                    childViewOptions: {
                        application: this.application,
                        show_edit_action: true,
                        show_move_action: true,
                        listId: this.model.id,
                        parentView: this,
                        isFavorite: true
                    }
                });
            }
        }),

        getContext: _.wrap(ProductListDetailsView.prototype.getContext, function getContext(fn) {
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isFavorite: true
            });
        })
    });
});
