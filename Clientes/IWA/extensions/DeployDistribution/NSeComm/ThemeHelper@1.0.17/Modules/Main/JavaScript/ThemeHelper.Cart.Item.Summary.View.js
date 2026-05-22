/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Cart.Item.Summary.View', [
    'Cart.Item.Summary.View',
    'themehelper_cart_lines.tpl',
    'underscore'
], function ThemeHelperCartItemSummaryView(
    CartItemSummaryView,
    CartLinesTpl,
    _
) {
    'use strict';

    _.extend(CartItemSummaryView.prototype, {
        template: CartLinesTpl
    });
});
