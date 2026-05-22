define('ThemeHelper.ProductViews.Price.View', [
    'ProductViews.Price.View',
    'themehelper_product_views_price.tpl',
    'underscore'
], function ThemeHelperProductViewsPriceView(
    ProductViewsPriceView,
    Template,
    _
) {
    'use strict';

    _.extend(ProductViewsPriceView.prototype, {
        template: Template
    });
});
