/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.ThemeHelper.Main', [
    'jQuery',
    'ThemeHelper.ProductHideAddToCart.Checker',
    'ThemeHelper.ProductDetails.Full.View',
    'ThemeHelper.Cart.Lines.View',
    'ThemeHelper.ProductDetails.QuickView.View',
    'ThemeHelper.Facets.Browse.View',
    'ThemeHelper.Cart.Summary.View',
    'ThemeHelper.Header.View',
    'ThemeHelper.Footer.View',
    'ThemeHelper.GoogleTagManager',
    'ThemeHelper.Cart.Detailed.View',
    'ThemeHelper.ProductReviews.Review.View',
    'ThemeHelper.ProductDetails.Quantity.View',
    'ThemeHelper.ProductReviews.Center.View',
    'ThemeHelper.ProductList.View',
    'ThemeHelper.ProductViews.Price.View',
    'ThemeHelper.Facets.FacetedNavigationItemCategory.View'

],
    function NSeCommThemeHelperMain(
        jQuery,
        ThemeHelperProductHideAddToCartChecker
    ) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                var config = container.getConfig();
                var plp = container.getComponent('PLP');
                var itemsInfo;
                var categoryInfo;
                var filters;

                config.itemKeyMapping = config.itemKeyMapping || {};

                config.itemKeyMapping._stock = function stock(item) { // eslint-disable-line no-underscore-dangle
                    var showStock = ThemeHelperProductHideAddToCartChecker.showAddToCart(item);
                    return showStock ? item.get('quantityavailable') : 0;
                };
                config.itemKeyMapping._isPurchasable = function isPurchasable(item) { // eslint-disable-line no-underscore-dangle
                    var showStock = ThemeHelperProductHideAddToCartChecker.showAddToCart(item);
                    return showStock ? item.get('ispurchasable') : 0;
                };

                if (plp) {
                    plp.cancelableOn('afterShowContent', function () {
                        itemsInfo = plp.getItemsInfo();
                        categoryInfo = plp.getCategoryInfo();
                        filters = plp.getFilters();
                        
                        if (!itemsInfo.length && categoryInfo && categoryInfo.fullurl && !filters.length) {
                            jQuery('.facets-facet-browse-content').remove();
                            jQuery('.facets-browse-category-heading-list-header').remove();
                        }
                    });
                }
            }
        };
    });
