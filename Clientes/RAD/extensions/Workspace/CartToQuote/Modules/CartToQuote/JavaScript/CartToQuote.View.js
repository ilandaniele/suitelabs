define('CartToQuote.View', [
    'Backbone',
    'jQuery',
    'underscore',
    '_carttoquote.tpl',
    'Profile.Model',
    'LiveOrder.Model',
    'CartToQuote.Utils',
    'CartToQuote.Model',
    'ProductList.Model'
], function CartToQuoteView(
    Backbone,
    jQuery,
    _,
    cartToQuoteTpl,
    ProfileModel,
    LiveOrderModel,
    ToQuoteUtils,
    CartToQuoteModel,
    ProductListModel
) {
    'use strict';

    return Backbone.View.extend({
        template: cartToQuoteTpl,
        events: {
            'click [data-action="cart-to-quote"]': 'cartToQuote',
            'click [data-action="cart-detail-to-quote"]': 'cartToQuote'
        },

        initialize: function initialize(options) {
            var profile = ProfileModel.getInstance();
            this.productList = new ProductListModel();
            this.application = options.application;
            this.cartDetail = options.fromCartDetail;
            this.model = new CartToQuoteModel();
            this.liveOrderModel = LiveOrderModel.getInstance();

            if (profile.get('isLoggedIn') === 'T') {
                this.productList.set('internalid', 'quote');
                this.productList.fetch();
            }
        },
        cartToQuote: function quoteToCart(e, allowPropagation) {
            var self = this;
            var cartLines = this.liveOrderModel.get('lines').models;
            if (!allowPropagation) {
                ToQuoteUtils.linesToQuote(this.productList, this.productList.get('internalid'), cartLines).done(function itemsAddedToQuote() {
                    self.model.set('internalid', _.random(1, 100)); // set internalid for call destroy method
                    self.model.destroy().done(function onEmptyCart() {
                        jQuery(e.target).trigger('click', true);
                    });
                });
                e.stopPropagation();
            }
            e.preventDefault();
        },

        getContext: function getContext() {
            return {
                isCartDetail: this.cartDetail
            };
        }
    });
});
