define('CartToQuote.ProductList.DetailsLater.View', [
    'ProductList.DetailsLater.View',
    'underscore'
], function CartToQuoteProductListDetailsLaterView(
    ProductListDetailsLaterView,
    _
) {
    'use strict';

    return _.extend(ProductListDetailsLaterView.prototype, {
        getContext: _.wrap(ProductListDetailsLaterView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.name = this.model.get('name');
            originalRet.pusherTarget = this.options.isMarketWizard ? 'market-wizard-pusher' : 'cart-save-for-later';
            return originalRet;
        })
    });
});
