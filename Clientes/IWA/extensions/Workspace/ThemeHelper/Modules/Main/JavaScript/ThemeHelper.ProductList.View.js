define('ThemeHelper.ProductList.View', [
    'ProductList.Control.View',
    'themehelper_product_list_control.tpl',
    'underscore'
], function ThemeHelperProductListView(
    ProductListControlView,
    Template,
    _
) {
    'use strict';

    _.extend(ProductListControlView.prototype, {
        template: Template
    });
});
