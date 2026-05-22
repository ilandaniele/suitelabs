define('Facets.ItemCell.View.EPR', [
    'Facets.ItemCell.View',
    'GlobalViews.StarRating.View',
    'underscore'
], function ProductDetailsFullViewEPR(
    FacetsItemCellView,
    GlobalViewsStarRatingView,
    _
) {
    'use strict';

    _.extend(FacetsItemCellView.prototype.childViews, {
        'GlobalViews.StarRating': function GlobalViewsStarRating() {
            return new GlobalViewsStarRatingView({
                model: this.model,
                showRatingCount: false
            });
        }
    });
});
