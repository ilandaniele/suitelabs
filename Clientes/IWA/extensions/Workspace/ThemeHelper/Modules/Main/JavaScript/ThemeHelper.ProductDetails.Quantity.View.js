/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductDetails.Quantity.View', [
    'ProductDetails.Quantity.View',
    'underscore',
    'ThemeHelper.ProductHideAddToCart.Checker'
], function ThemeHelperProductDetailsQuantityView(
    ProductDetails,
    _,
    ProductHideAddToCartChecker
) {
    'use strict';

    return _.extend(ProductDetails.prototype, {
        getContext: _(ProductDetails.prototype.getContext).wrap(function getContext(fn) {
            var context = fn.apply(this, _(arguments).toArray().slice(1));
            var showQty = ProductHideAddToCartChecker.showAddToCart(context.model.get('item'));

            if (!showQty) {
                context.showQuantity = false;
            }
            return context;
        })
    });
});
