define('SuiteLabs.ExcludeFromSEO.Facets.Browse.View', [
    'Facets.Browse.View',
    'Configuration',
    'jQuery',
    'underscore'
], function SuiteLabsExcludeFromSEOFacetsBrowseView(
    FacetsBrowseView,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    var META_ROBOTS_ID = 'facet-seo-ignore';

    return _(FacetsBrowseView.prototype).extend({
        initialize: _(FacetsBrowseView.prototype.initialize).wrap(function initialize(fn) {
            var init = fn.apply(this, _(arguments).toArray().slice(1));
            var excludeFromSEO = false;
            var facetsToExclude = _(
                _(Configuration.get('facets')).filter(function (facet) {
                    return facet.seoExclude;
                })
            ).pluck('id');

            if (SC.isPageGenerator()) {
                _(this.translator.facets).each(function eachFacet(facet) {
                    excludeFromSEO = excludeFromSEO || _(facetsToExclude).contains(facet.id);
                });
                if (excludeFromSEO) {
                    this.addMetaExclude();
                } else {
                    this.removeMetaExclude();
                }
            }
            return init;
        }),

        addMetaExclude: function addMetaExclude() {
            return !jQuery('#' + META_ROBOTS_ID).length ? jQuery('head').append(
                '<meta id="' + META_ROBOTS_ID + '" name="robots" content="noindex">'
            ) : false;
        },

        removeMetaExclude: function removeMetaExclude() {
            return jQuery('#' + META_ROBOTS_ID).remove();
        }
    });
});
