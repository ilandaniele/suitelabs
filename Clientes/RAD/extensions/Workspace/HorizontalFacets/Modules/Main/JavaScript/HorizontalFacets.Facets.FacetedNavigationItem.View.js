
define('HorizontalFacets.Facets.FacetedNavigationItem.View', [
    'Facets.FacetedNavigationItem.View',
    'Utils',
    'underscore'
], function HorizontalFacetsFacetsFacetedNavigationItemView(
    FacetsFacetedNavigationItemView,
    Utils,
    _
) {
    'use strict';

    _.extend(FacetsFacetedNavigationItemView.prototype, {
        getContext: _.wrap(FacetsFacetedNavigationItemView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var isStandaloneFacet = this.facet_config.standaloneFacet;

            context.showHeading = context.showHeading && !(isStandaloneFacet && Utils.isDesktopDevice());
            context.isCollapsed = context.isCollapsed && !(isStandaloneFacet && Utils.isDesktopDevice());

            return context;
        })
    });
});
