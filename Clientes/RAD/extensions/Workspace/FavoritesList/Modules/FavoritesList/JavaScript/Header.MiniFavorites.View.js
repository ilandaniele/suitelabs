define('Header.MiniFavorites.View', [
    'Header.MiniFavoritesItemCell.View',
    'Profile.Model',
    'Configuration',
    'header_mini_favorites.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
],
function HeaderMiniFavoritesView(
    HeaderMiniFavoritesItemCellView,
    ProfileModel,
    Configuration,
    headerMiniFavoritesTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniFavoritesTpl,
        favoriteList: null,
        initialize: function initialize() {
            var self = this;
            this.FavoritesUtils = this.options.application.ProductListModule.Utils;
            // for loading status
            this.isLoading = true;
            this.ItemsCount = 0;
            // Favorites Favorites promise
            this.FavoritesUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                var FavoritesList = self.FavoritesUtils.getFavoriteList();
                var productListsInstance = self.FavoritesUtils.getProductLists();
                if (FavoritesList.length) {
                    FavoritesList = FavoritesList[0];
                    self.FavoritesUtils.getProductList(FavoritesList.id).done(function getProductListDone(favoriteList) {
                        self.favoriteList = favoriteList;
                        self.isLoading = false;
                        self.render();
                    });
                }

                productListsInstance.on('change', function productListsInstanceChange() {
                    FavoritesList = self.FavoritesUtils.getFavoriteList();
                    if (FavoritesList.length) {
                        FavoritesList = FavoritesList[0];
                        self.FavoritesUtils.getProductList(FavoritesList.id).done(function getProductListDone2(favoriteList) {
                            self.favoriteList = favoriteList;
                            self.isLoading = false;
                            self.render();
                        });
                    }
                });
            });

            BackboneCompositeView.add(this);
        },

        render: function render() {
            Backbone.View.prototype.render.apply(this, arguments);
            // on tablet or desktop make the minicart dropdown
            if (_.isTabletDevice() || _.isDesktopDevice()) {
                this.$('[data-type="mini-favorites"]').attr('data-toggle', 'dropdown');
            }
        },
        getItemsSummary: function getItemsSummary() {
            var count = 0;
            var cost = 0;
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            var totalCost = 0;
            if (!this.isLoading) {
                _.each(this.favoriteList.items, function eachFavoriteItem(line) {
                    count += line.quantity;
                    cost = useRetailPrices ? line.item[retailPricelevel] : line.item.onlinecustomerprice_detail.onlinecustomerprice;
                    totalCost += line.quantity * cost;
                });
            }
            return {
                count: count,
                totalCost: totalCost
            };
        },
        childViews: {
            'Header.MiniFavoritesItemCell': function HeaderMiniFavoritesItemCell() {
                var favoriteList = this.favoriteList;
                var lines = favoriteList.items;
                return new BackboneCollectionView({
                    collection: !this.isLoading ? new Backbone.Collection(lines) : new Backbone.Collection(),
                    childView: HeaderMiniFavoritesItemCellView,
                    viewsPerRow: 1
                });
            }
        },
        getContext: function getContext() {
            var summary = this.getItemsSummary();
            return {
                url: this.favoriteList ? 'favoriteslist/' + (this.favoriteList.internalid || 'tmpl_' + this.favoriteList.templateid) : '',
                ItemsCount: summary.count,
                totalCost: _.formatCurrency(summary.totalCost),
                isLoading: this.isLoading,
                showLines: summary.count > 0,
                id: !!this.favoriteList && this.favoriteList.internalid,
                showCost: !ProfileModel.getInstance().hidePrices()
            };
        }
    });
});
