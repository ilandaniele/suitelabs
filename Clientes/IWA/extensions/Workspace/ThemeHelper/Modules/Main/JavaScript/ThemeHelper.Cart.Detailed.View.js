/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Cart.Detailed.View', [
    'Cart.Detailed.View',
    'themehelper_cart_detailed.tpl',
    'underscore'
], function ThemeHelperCartDetailedView(
    CartDetailedView,
    CartDetailedTpl,
    _
) {
    'use strict';

    _.extend(CartDetailedView.prototype, {
        template: CartDetailedTpl
    });
});
