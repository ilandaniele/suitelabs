define('ThemeHelper.ProductReviews.Center.View', [
    'ProductReviews.Center.View',
    'themehelper_product_reviews_center.tpl',
    'underscore'
], function ThemeHelperProductReviewsCenterView(
    ProductReviewsCenterView,
    ProductReviewsCenterTpl,
    _
) {
    'use strict';

    return _(ProductReviewsCenterView.prototype).extend({
        initialize: _(ProductReviewsCenterView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.template = ProductReviewsCenterTpl;

                return init;
            }
        )
    });
});
