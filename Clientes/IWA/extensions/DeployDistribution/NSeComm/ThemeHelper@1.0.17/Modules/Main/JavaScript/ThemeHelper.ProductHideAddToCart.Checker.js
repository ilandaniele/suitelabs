/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductHideAddToCart.Checker', [
], function ThemeHelperProductDetailsExtend() {
    'use strict';

    return {
        showAddToCart: function showAddToCart(item) {
            var hideAddToCart;
            var stockType;
            try {
                hideAddToCart = item.get('custitemitemhideaddtocart');
                stockType = item.get('custitem_acs_stock_status');

                if (stockType == 3) {
                    return !hideAddToCart;
                }
                
                if (stockType == 9) {
                    return false;
                }
                
                if (hideAddToCart && stockType > 4) {
                    return false;
                }
                return true;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(e);
                return true;
            }
        },
        isActiveItem: function isActiveItem(item) {
            var hideAddToCart;
            var stockType;
            try {
                hideAddToCart = item.get('custitemitemhideaddtocart');
                stockType = item.get('custitem_acs_stock_status');
                
                if (stockType == 9) {
                    return true;
                }
                
                return false;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(e);
                return true;
            }
        }
    };
});
