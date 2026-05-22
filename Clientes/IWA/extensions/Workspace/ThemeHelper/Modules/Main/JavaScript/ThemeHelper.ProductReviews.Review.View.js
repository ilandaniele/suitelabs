/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductReviews.Review.View', [
    'ProductReviews.Review.View',
    'underscore'
], function ThemeHelperProductReviewsReviewView(
    ProductReviewsReviewView,
    _
) {
    'use strict';

    _.extend(ProductReviewsReviewView.prototype, {
        getContext: _.wrap(ProductReviewsReviewView.prototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.reviewCreatedOn = context.reviewCreatedOn.split(' ')[0];
            context.reviewText = this.model.get('text');
            return context;
        })
    });
});
