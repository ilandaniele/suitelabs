/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductDetails.Full.View', [
    'ProductDetails.Full.View',
    'themehelper_product_details_full_view.tpl',
    'ThemeHelper.ProductHideAddToCart.Checker',
    'underscore'
], function ThemeHelperProductDetailsFullView(
    ProductDetailsFullView,
    productDetailsFullTpl,
    ThemeHelperProductHideAddToCartChecker,
    _
) {
    'use strict';

    _.extend(ProductDetailsFullView.prototype, {
        template: productDetailsFullTpl,

        getContext: _.wrap(ProductDetailsFullView.prototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var item = context.model.attributes.item;
            var showAddToCart = ThemeHelperProductHideAddToCartChecker.showAddToCart(item);
            var isActiveItem = ThemeHelperProductHideAddToCartChecker.isActiveItem(item);
            var itemOnBackorer = item.get('custitem_acs_stock_status') == 3;
            var stockMessage =  !showAddToCart ? _.translate('This item currently not available') : item.get('custitemstockstatus');
            
            context.stock = itemOnBackorer ? item.get('custitemstockstatus') : stockMessage;
            context.isHideAddToCart = !showAddToCart;
            context.showAddToCart = showAddToCart;
            context.isActiveItem = isActiveItem;

            return context;
        })
    });
});
