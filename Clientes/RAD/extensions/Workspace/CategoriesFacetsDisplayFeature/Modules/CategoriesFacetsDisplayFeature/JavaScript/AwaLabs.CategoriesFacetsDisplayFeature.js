define('AwaLabs.CategoriesFacetsDisplayFeature', [
    'underscore'
], function AwaLabsCategoriesLeftNavigation(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var activeExtraCategories;
            var activeCategories;
            if (layout) {
                layout.addToViewContextDefinition('Facets.FacetedNavigationItem.View', 'isCollapsed', 'boolean', function isCollapsedFn(context) {
                    if (context.rangeValues.length) {
                        if (context.rangeMin !== context.rangeFrom) {
                            context.isCollapsed = false;
                        }
                    } else {
                        activeCategories = _.findWhere(context.values, { 'isActive': true });
                        if (activeCategories) {
                            context.isCollapsed = false;
                        }
                    }
                    return context.isCollapsed;
                });
                layout.addToViewContextDefinition('Facets.FacetedNavigationItem.View', 'extraValueActive', 'boolean', function extraValueActiveFn(context) {
                    activeExtraCategories = _.findWhere(context.extraValues, { 'isActive': true });
                    return !!activeExtraCategories;
                });
            }
        }
    };
});
