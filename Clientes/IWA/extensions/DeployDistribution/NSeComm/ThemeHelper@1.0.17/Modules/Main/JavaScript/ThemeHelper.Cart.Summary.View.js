/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Cart.Summary.View', [
    'Cart.Summary.View',
    'themehelper_cart_summary.tpl',
    'underscore'
], function ThemeHelperCartSummaryView(
    CartSummaryView,
    CartSummaryTpl,
    _
) {
    'use strict';

    _.extend(CartSummaryView.prototype, {
        template: CartSummaryTpl
    });
});
