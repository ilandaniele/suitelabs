define('GlobalViews.StarRating.View.EPR', [
    'GlobalViews.StarRating.View',
    'SC.Configuration',
    'enhanced_global_views_star_rating.tpl',
    'jQuery',
    'Utils',
    'underscore'
], function GlobalViewsStarRatingViewEPR(
    GlobalViewsStarRatingView,
    Configuration,
    EnhancedGlobalViewsStarRatingTpl,
    jQuery,
    Utils,
    _
) {
    'use strict';

    _.extend(GlobalViewsStarRatingView.prototype, {
        template: EnhancedGlobalViewsStarRatingTpl,

        events: _.extend({}, GlobalViewsStarRatingView.prototype.events, {
            'click [data-action="scroll-to-reviews"]': 'scrollToReviews'
        }),

        getProductReviewsContainer: function getProductReviewsContainer() {
            var $elem = jQuery('#product-review-center');
            var domElem = $elem.get(0);

            if (!domElem) {
                // Fallback to alternative container
                $elem = jQuery('.product-reviews-center-content');
                domElem = $elem.get(0);
            }

            return domElem;
        },

        isPusherVisible: function isPusherVisible($pusher) {
            var pusherElem = $pusher.get(0);

            return Utils.isPhoneDevice()
            && pusherElem
            && $pusher.css('display') !== 'none';
        },

        scrollToReviews: function scrollToReviews() {
            var $pusher = jQuery('.product-reviews-center-pusher');
            var reviewsContainer = this.getProductReviewsContainer();

            if (this.isPusherVisible($pusher)) {
                $pusher.click();
            } else if (reviewsContainer) {
                reviewsContainer.scrollIntoView(true);
            }
        },

        getContext: _.wrap(GlobalViewsStarRatingView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var isPDP = this.options.isPDP;
            var isFormView = this.$el.attr('id') === 'rating';
            var config = Configuration.get('enhancedProductReviews') || {
                displayEmptyStars: false,
                newReviewLabel: 'Be the first to write a review'
            };

            _.extend(context, {
                showNoReviewsLink: isPDP && !context.ratingCountGreaterThan0,
                newReviewLink: this.model && this.model.get('_url') + '/newReview',
                newReviewLabel: config.newReviewLabel,
                showRating: config.displayEmptyStars || isFormView || !!(context.value && context.value > 0)
            });

            return context;
        })
    });
});
