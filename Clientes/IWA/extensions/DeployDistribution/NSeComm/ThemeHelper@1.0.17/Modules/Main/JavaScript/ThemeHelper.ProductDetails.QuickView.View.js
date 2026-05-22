/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductDetails.QuickView.View', [
    'ProductDetails.QuickView.View',
    'themehelper_product_details_quickview.tpl',
    'underscore'
], function ThemeHelperProductDetailsQuickViewView(
    ProductDetailsQuickViewView,
    ProductDetailsQuickViewTpl,
    _
) {
    'use strict';

    _.extend(ProductDetailsQuickViewView.prototype, {
        template: ProductDetailsQuickViewTpl
    });
});
