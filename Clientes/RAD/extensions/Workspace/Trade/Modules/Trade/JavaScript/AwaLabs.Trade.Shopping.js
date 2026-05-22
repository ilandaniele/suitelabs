define('AwaLabs.Trade.Shopping', [
    'AwaLabs.Trade',
    'Trade.Link.View',
    'Profile.Model',
    'Profile.Model.HidePrices'
], function AwaLabsTradeShopping(
    AwaLabsTrade,
    TradeLinkView,
    ProfileModel
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var pdp = container.getComponent('PDP');
            var environment = container.getComponent('Environment');
            var profile = ProfileModel.getInstance();
            var tradeLinkView;

            if (cart) {
                cart.addToViewContextDefinition('Cart.Item.Actions.View', 'isTrade', 'boolean', function isTrade() {
                    return profile.get('isTrade');
                });

                cart.addToViewContextDefinition('Cart.Detailed.View', 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade');
                });
            }

            if (pdp) {
                tradeLinkView = {
                    'Product.Price': {
                        'Trade.Link.View': {
                            childViewConstructor: function TradeLinkChildView() {
                                return new TradeLinkView({
                                    environment: environment,
                                    profile: profile
                                });
                            }
                        }
                    }
                };

                pdp.addToViewContextDefinition('ProductDetails.Full.View', 'isTrade', 'boolean', function isTrade() {
                    return profile.get('isTrade');
                });

                pdp.addChildViews(pdp.PDP_FULL_VIEW, tradeLinkView);
                pdp.addChildViews(pdp.PDP_QUICK_VIEW, tradeLinkView);
            }

            if (layout) {
                layout.addToViewContextDefinition('ProductLine.Stock.View', 'showInStockMessage', 'boolean', function showInStockMessage(context) {
                    return profile.get('isTrade') && context.stockInfo.isInStock && profile.get('isLoggedIn') === 'T';
                });

                layout.addToViewContextDefinition('ProductLine.Stock.View', 'showOutOfStockMessage', 'boolean', function showOutOfStockMessage(context) {
                    return !profile.get('isTrade') && !context.stockInfo.isInStock;
                });
            }
            AwaLabsTrade.mountToApp(container, 'showContactAndTradingInfo');
        }
    };
});
