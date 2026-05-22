define('Facets.Browse.View.FixMetaDescription', [
    'Facets.Browse.View',
    'underscore'
], function FacetsBrowseViewFixMetaDescription(
    FacetsBrowseView,
    _
) {
    'use strict';

    _.extend(FacetsBrowseView.prototype, {
        getMetaDescription: function getMetaDescription() {
            var category = this.model.get('category');

            // Prioritize the CMS description instead of the category description
            return this.metaDescription || (category && category.get('metadescription'));
        }
    });
});
