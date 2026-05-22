define('SEOImprovements.PLP.View', [
    'Facets.ItemCell.View',
    'underscore'
], function SEOImprovementsPLPView(
    FacetsItemCellView,
    _
) {
    'use strict';

    _.extend(FacetsItemCellView.prototype, {
        getContext: _.wrap(FacetsItemCellView.prototype.getContext, function onGetContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            var thumbnail = originalRet.thumbnail;
            if (thumbnail && !thumbnail.altimagetext) {
                thumbnail.altimagetext = originalRet.name;
            }
            return originalRet;
        })
    });
});
