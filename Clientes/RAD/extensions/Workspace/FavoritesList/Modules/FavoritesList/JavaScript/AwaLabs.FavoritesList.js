define('AwaLabs.FavoritesList', [
    'Profile.Model',
    'Utils',
    'ProductList.Details.View',
    'Favorites.ProductList.Details.View',
    'ProductList.Lists.View',
    'Header.MiniProjects.View',
    'Header.MiniFavorites.View',
    'ErrorManagement.PageNotFound.View',
    'underscore',
    'ProductList.Utils',
    'FavoritesList.ProductList.Utils',
    'FavoritesList.ProductList.Details.View',
    'Project.ProductList.Lists.View',
    'FavoritesList.AddedToCart.Improved.View',
    'FavoritesList.BulkActions.Extended.View',
    'FavoritesList.ProductList.DetailsLater.View',
    'FavoritesList.CartSaveForLater.View',
    'FavoritesList.ProductList.Control.View',
    'FavoritesList.ProductList.DisplayFull.View',
    'FavoritesList.ProductList.Model',
    'FavoritesList.ProductList.ControlItem.View'
], function AwaLabsFavoritesList(
    ProfileModel,
    Utils,
    ProductListDetailsView,
    FavoritesListProductListDetailsView,
    ProductListListsView,
    HeaderMiniProjectsView,
    HeaderMiniFavoritesView,
    PageNotFoundView,
    _
) {
    'use strict';

    return {
        MenuItems: {
            name: _('My Favorites').translate(),
            id: 'favoriteslist',
            index: 3,
            url: 'balance'
        },

        mountToApp: function mountToApp(application) {
            var pageType = application.getComponent('PageType');
            var layout = application.getComponent('Layout');

            pageType.registerPageType({
                name: 'Favorites',
                routes: ['favoriteslist/:id'],
                view: FavoritesListProductListDetailsView,
                options: {
                    isFavorite: true
                }
            });

            pageType.registerPageType({
                name: 'Favorites',
                routes: ['project/:id', 'project/:id/?*options'],
                view: ProductListDetailsView,
                options: {
                    isFavorite: false
                }
            });

            pageType.registerPageType({
                name: 'Projects',
                routes: ['project', 'project/?*options'],
                view: ProductListListsView,
                defaultTemplate: {
                    name: 'product_list_lists.tpl',
                    displayName: 'Projects List',
                    thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/default-layout-wishlist.png'
                    )
                }
            });

            pageType.registerPageType({
                name: 'ProjectDetails',
                routes: ['project/:id', 'project/:id/?*options'],
                view: ProductListDetailsView,
                defaultTemplate: {
                    name: 'product_list_details_tpl',
                    displayName: 'Project Details',
                    thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/default-layout-wishlist-detail.png'
                    )
                }
            });

            pageType.registerPageType({
                'name': 'Wishlist',
                'routes': ['wishlist', 'wishlist/?*options', 'wishlist/:id', 'wishlist/:id/?*options'],
                'view': PageNotFoundView,
                'defaultTemplate': {
                    'name': 'error_management_page_not_found.tpl',
                    'displayName': 'Page not found'
                }
            });

            if (layout) {
                layout.addChildViews(
                    layout.ALL_VIEWS, {
                        'Header.MiniProjects': {
                            'Header.MiniProjects': {
                                childViewIndex: 1,
                                childViewConstructor: function headerMiniProject() {
                                    return new HeaderMiniProjectsView({
                                        application: application
                                    });
                                }
                            }
                        },
                        'Header.MiniFavorites': {
                            'Header.MiniFavorites': {
                                childViewIndex: 1,
                                childViewConstructor: function cmsHomeSlider() {
                                    return new HeaderMiniFavoritesView({
                                        application: application
                                    });
                                }
                            }
                        }
                    }
                );

                layout.addToViewContextDefinition('Header.View', 'showMiniCart', 'boolean', function showMiniCart() {
                    var profile = ProfileModel.getInstance();
                    return profile.get('isLoggedIn') === 'T';
                });
            }
        }
    };
});
