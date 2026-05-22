define('ThemeHelper.Facets.FacetedNavigationItemCategory.View', [
    'Facets.FacetedNavigationItemCategory.View',
    'themehelper_facets_faceted_navigation_item_category.tpl',
    'underscore'
], function ThemeHelperFacetsFacetedNavigationItemCategoryView(
    FacetsFacetedNavigationItemCategoryView,
    ThemeHelperthemeHelperProductViewsPriceTpl,
    _
) {
    'use strict';

    _.extend(FacetsFacetedNavigationItemCategoryView.prototype, {
        template: ThemeHelperthemeHelperProductViewsPriceTpl
    });
});
