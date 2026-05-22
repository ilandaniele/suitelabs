
define('HorizontalFacets.Facets.Browse.View', [
    'HorizontalFacets.Facets.Horizontal.View',
    'Facets.Browse.View',
    'Utils',
    'underscore'
], function HorizontalFacetsFacetsBrowseView(
    FacetsHorizontalView,
    FacetsBrowseView,
    Utils,
    _
) {
    'use strict';

    _.extend(FacetsBrowseView.prototype, {
        initialize: _.wrap(FacetsBrowseView.prototype.initialize, function initialize(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;

            function renderHorizontalFacet() {
                self._render();
                self.$el.find('[data-action="pushable"]').scPush({ target: 'tablet' });
            }

            window.removeEventListener('renderHorizontalFacet', renderHorizontalFacet);
            window.addEventListener('renderHorizontalFacet', renderHorizontalFacet);

            return ret;
        }),

        childViews: _.extend({}, FacetsBrowseView.prototype.childViews, {
            'Facets.Horizontal.View': function FacetsHorizontalChildView() {
                if (Utils.isDesktopDevice()) {
                    return new FacetsHorizontalView({
                        application: this.application,
                        translator: this.translator,
                        facets: this.model.get('facets')
                    });
                }
            }
        }),

        getContext: _.wrap(FacetsBrowseView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.isDesktopDevice = Utils.isDesktopDevice();
            return context;
        })
    });
});
