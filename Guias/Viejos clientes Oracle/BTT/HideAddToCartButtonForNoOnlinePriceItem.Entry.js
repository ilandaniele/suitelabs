define('HideAddToCartButtonForNoOnlinePriceItem.Entry', [
    'ProductDetails.QuickView.View',
    'ProductDetails.Full.View',
    'ProductViews.Price.View',
    'SuiteCommerce.ProductComparison.ComparisonPage.View'
], function HideAddToCartButtonForNoOnlinePriceItemEntry(
    ProductDetailsQuickViewView,
    ProductDetailsFullView,
    ProductViewsPriceView,
    ComparisonPageView
) {
    'use strict';

    return {
        beforeShowContent: function() {
            return this.promise;
        },

        mountToApp: function mountToApp(container) {
            var Layout = container.getComponent('Layout');

            if (Layout) {
                /**
                 * @description Hide $0.00 prices on PDP, PLP and QuickView. Added 'showPrice' to product_views_price.tpl
                 */
                ProductViewsPriceView.prototype.getContext = _.wrap(ProductViewsPriceView.prototype.getContext, function(fn) {
                    var context = fn.apply(this, _.toArray(arguments).slice(1));
                    if (context.priceFormatted == '$0.00' || !context.priceFormatted) {
                        context.showPrice = false;
                    } else {
                        context.showPrice = true;
                    }
                    return context;
                });

                /**
                 * @description hide price and Add to Cart button if price is zero on item compare page
                 */
                ComparisonPageView.ComparisonPageView.prototype.getContext = _.wrap(ComparisonPageView.ComparisonPageView.prototype.getContext, function(fn) {
                    var context = fn.apply(this, _.toArray(arguments).slice(1));
                    _.each(context.items, function(item) {
                        if (item.price.formatted == '$0.00') {
                            item.isPurchasable = false;
                            delete item.price;
                            delete context.comparisonPagePriceLabel;
                        }
                    });
                    return context;
                });

                /**
                 * @description hide Add to Cart button on PDP
                 */
                ProductDetailsFullView.prototype.getContext = _.wrap(ProductDetailsFullView.prototype.getContext, function(fn) {
                    var context = fn.apply(this, _.toArray(arguments).slice(1));
                    var price = this.model.get('item').get('onlinecustomerprice_detail').onlinecustomerprice_formatted;
                    if (price) {
                        if (price == '$0.00') {
                            context.showAddToCartButton = false;
                        } else {
                            context.showAddToCartButton = true;
                        }
                    } else {
                        context.showAddToCartButton = false;
                    }
                    return context;
                });

                /**
                 * @description hide Add to Cart button on QuickView
                 */
                ProductDetailsQuickViewView.prototype.getContext = _.wrap(ProductDetailsQuickViewView.prototype.getContext, function(fn) {
                    var context = fn.apply(this, _.toArray(arguments).slice(1));
                    var price = this.model.get('item').get('onlinecustomerprice_detail').onlinecustomerprice_formatted;
                    if (price) {
                        if (price == '$0.00') {
                            context.showAddToCartButton = false;
                        } else {
                            context.showAddToCartButton = true;
                        }
                    } else {
                        context.showAddToCartButton = false;
                    }
                    return context;
                });

            }
        }
    };
});
