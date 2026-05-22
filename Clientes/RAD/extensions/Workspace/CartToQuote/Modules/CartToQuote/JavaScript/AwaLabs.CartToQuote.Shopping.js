define('AwaLabs.CartToQuote.Shopping', [
    'CartToQuote.View',
    'Profile.Model',
    'CartToQuote.MarketWizard.View',
    'Backbone',
    'jQuery',
    'CartToQuote.ProductList.Item.Model',
    'CartToQuote.ProductDetailToQuote.View'
], function AwaLabsCartToQuoteShopping(
    CartToQuoteView,
    ProfileModel,
    CartToQuoteMarketWizardView,
    Backbone,
    jQuery
) {
    'use strict';

    return {

        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var cart = container.getComponent('Cart');
            var profile = ProfileModel.getInstance();
            var carToQuoteView = new CartToQuoteMarketWizardView({
                application: container
            });
            if (layout) {
                layout.addChildViews('Cart.Summary.View', {
                    'CartToQuoteView': {
                        'CartToQuoteView': {
                            childViewIndex: 1,
                            childViewConstructor: function childViewConstructor() {
                                return new CartToQuoteView({
                                    application: container,
                                    fromCartDetail: false
                                });
                            }
                        }
                    }
                });
                layout.addChildViews('Cart.Detailed.View', {
                    'CartToQuoteView': {
                        'CartToQuoteView': {
                            childViewIndex: 1,
                            childViewConstructor: function childViewConstructor() {
                                return new CartToQuoteView({
                                    application: container,
                                    fromCartDetail: true
                                });
                            }
                        }
                    }
                });
                layout.addToViewContextDefinition('Cart.Detailed.View', 'showProceedToCheckoutButton', 'boolean', function fn() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Cart.Summary.View', 'showProcedToCheckoutButton', 'boolean', function fn() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });

                if (cart) {
                    cart.addChildView('CartToQuote.MarketWizard.View', function cartToQuoteMarketWizardViewFn() {
                        return carToQuoteView;
                    });

                    cart.addToViewEventsDefinition(
                        'Cart.Item.Actions.View',
                        'click [data-action="move-market-wizard"]',
                        function fn(event) {
                            var internalid = jQuery(event.target).data('internalid');
                            event.preventDefault();
                            event.stopPropagation();
                            return Backbone.Events.trigger('cartToQuote:moveToMarketWizard', { id: internalid });
                        }
                    );
                }
            }
        }
    };
});
