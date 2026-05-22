
define('HorizontalFacets.Facets.FacetedNavigation.View', [
    'Facets.FacetedNavigation.View',
    'underscore'
], function HorizontalFacetsFacetsFacetedNavigationView(
    FacetsFacetedNavigationView,
    _
) {
    'use strict';

    _.extend(FacetsFacetedNavigationView.prototype, {
        initialize: _.wrap(FacetsFacetedNavigationView.prototype.initialize, function initialize(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;

            this.originalFacets = this.options.facets;
            this.selectedFacet = 'all';

            function displayHorizontalFacetHandler(e) {
                var selectedFacets;

                if (e.detail.id && e.detail.id !== 'all') {
                    selectedFacets = _.find(self.originalFacets, function findFacet(facet) {
                        return facet.id === e.detail.id;
                    });

                    if (selectedFacets) {
                        self.options.facets = [selectedFacets];
                    }
                } else if (e.detail.id === 'all') {
                    self.options.facets = _.reject(self.originalFacets, function rejectStandalone(facet) {
                        return self.isStandaloneFacet(facet);
                    });
                }

                self.render();
            }

            window.removeEventListener('displayHorizontalFacet', displayHorizontalFacetHandler);
            window.addEventListener('displayHorizontalFacet', displayHorizontalFacetHandler);

            return ret;
        }),

        getFacetConfig: function getFacetConfig(facet) {
            return _.find(this.options.translator.configuration.facets, function findFacetConfig(config) {
                return config.id === facet.id || config.id === facet.url;
            });
        },

        isStandaloneFacet: function isStandaloneFacet(facet) {
            var facetConfig = this.getFacetConfig(facet);

            return facetConfig && facetConfig.standaloneFacet;
        }
    });
});
