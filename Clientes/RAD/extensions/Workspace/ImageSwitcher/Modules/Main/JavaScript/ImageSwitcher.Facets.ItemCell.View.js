define('ImageSwitcher.Facets.ItemCell.View', [
    'Facets.ItemCell.View',
    'underscore'
], function ImageSwitcherFacetsItemCellView(
    FacetsItemCellView,
    _
) {
    'use strict';

    _.extend(FacetsItemCellView.prototype, {
        getContext: _.wrap(FacetsItemCellView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            context.hoverImage = this.model.get('custitem_hover_img') || '';
            context.hoverImageAltTxt = this.model.get('custitem_hover_img_alt_txt') || '';

            return context;
        })
    });
});
