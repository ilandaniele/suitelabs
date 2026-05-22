define('SEOImprovements.FacetDisplay.View', [
    'Facets.FacetsDisplay.View',
    'underscore'
], function SEOImprovementsFacetDisplayView(
    FacetsFacetsDisplayView,
    _
) {
    'use strict';

    _.extend(FacetsFacetsDisplayView.prototype, {
        getContext: _.wrap(FacetsFacetsDisplayView.prototype.getContext, function fnFacetsFacetsDisplayViewPrototypeGetContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            var mainHeader = _('Searching');
            var first = false;
            var category = this.parentView && this.parentView.model &&
                this.parentView.model.get('category') &&
                this.parentView.model.get('category').get('name');
            if (category) {
                mainHeader += ((first ? ',' : '') + ' ' + _('in') + ' ' + category);
                first = true;
            }
            if (originalRet.values && originalRet.values.length) {
                mainHeader += ((first ? ',' : '') + ' ' + _('narrowed by') + ' ' +
                    _.map(originalRet.values, function fnValues(facet) { return facet.valueLabel; }).join(', '));
                first = true;
            }
            if (first) {
                originalRet.mainHeader = mainHeader;
            }
            return originalRet;
        })
    });
});
