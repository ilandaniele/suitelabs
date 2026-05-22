define('AwaLabs.HideSections.Shopping', [
    'jQuery',
    'underscore'
], function AwaLabsHideSectionsShopping(
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var userProfile = container.getComponent('UserProfile');
            var webCustomerType = 'custentity_rad_web_customer_type';

            if (cart && environment) {
                cart.addToViewContextDefinition('Cart.Summary.View', 'showEstimate', 'boolean', function showEstimate() {
                    return !environment.getConfig('hideSections.shippingEstimate');
                });
            }

            if (layout) {
                if (environment.getConfig('hideSections.reviewRates')) {
                    layout.addToViewContextDefinition('GlobalViews.RatingByStar.View', 'rates', 'array', function overrideRates(context) {
                        var rates = context.rates;
                        _.each(rates, function fnEach(rate) {
                            rate.showCount = parseInt(rate.count || 0, 10) > 0;
                        });
                        return rates;
                    });
                }

                if (pdp && userProfile && environment.getConfig('hideSections.quantity')) {
                    layout.on('afterShowContent', function afterShowContent() {
                        var $quantity = jQuery('[data-view="Quantity"]');
                        var itemInfo = pdp.getItemInfo();
                        if (itemInfo) {
                            userProfile.getUserProfile().then(function afterGetUserProfile(user) {
                                var customerType = _.findWhere(user.customfields, { id: webCustomerType });
                                var customerIsTrade = customerType
                                    && customerType.value === '2'
                                    && user.isloggedin;
                                if (!itemInfo.item.isinstock && !customerIsTrade) {
                                    $quantity.remove();
                                }
                            });
                        }
                    });
                }
            }
        }
    };
});
