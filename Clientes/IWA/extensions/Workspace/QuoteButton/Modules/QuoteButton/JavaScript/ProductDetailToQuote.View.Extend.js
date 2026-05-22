define('ProductDetailToQuote.View.Extend', [
    'ProductDetailToQuote.View',
    'Profile.Model',
    'acs_product_detail_to_quote.tpl',
    'underscore'
], function ProductDetailToQuoteViewExtend(
        ProductDetailToQuoteView,
        ProfileModel,
        template,
        _
    ) {
    'use strict';

    return _.extend(ProductDetailToQuoteView.prototype, {
        template: template,

        getContext: _.wrap(ProductDetailToQuoteView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            context.isLoggedIn = ProfileModel.getInstance().get('isLoggedIn') === 'T';

            return context;
        })
    });
});
