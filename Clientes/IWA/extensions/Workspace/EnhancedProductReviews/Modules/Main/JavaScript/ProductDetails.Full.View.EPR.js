define('ProductDetails.Full.View.EPR', [
    'ProductDetails.Full.View',
    'GlobalViews.StarRating.View',
    'SC.Configuration',
    'underscore'
], function ProductDetailsFullViewEPR(
    ProductDetailsFullView,
    GlobalViewsStarRatingView,
    Configuration,
    _
) {
    'use strict';

    _(ProductDetailsFullView.prototype).extend({
        getChildViews: _.wrap(ProductDetailsFullView.prototype.getChildViews, function getChildViews(fn) {
            var childViews = fn.apply(this, _.toArray(arguments).slice(1));

            if (childViews['Global.StarRating']) {
                childViews['Global.StarRating'] = function wrapperFunction(options) {
                    return function GlobalStarRating() {
                        return new GlobalViewsStarRatingView({
                            model: options.model.get('item'),
                            showRatingCount: true,
                            showSchemaInfo: true,
                            isPDP: true
                        });
                    };
                };
            }
            return childViews;
        }),

        switchReviewsRatingPosition: function switchReviewsRatingPosition() {
            var ratingContainer = this.$('.product-details-full-rating').detach();
            var config = Configuration.get('enhancedProductReviews') || {
                container: '[data-cms-area="item_info"]',
                containerPosition: 'before'
            };

            switch (config.containerPosition) {
            case 'last':
                this.$(config.container).append(ratingContainer);
                break;
            case 'before':
                this.$(config.container).before(ratingContainer);
                break;
            case 'after':
                this.$(config.container).after(ratingContainer);
                break;
            default:
                break;
            }
        },

        render: _.wrap(ProductDetailsFullView.prototype.render, function render(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));

            this.switchReviewsRatingPosition();

            return ret;
        })
    });
});
