define('AwaLabs.Trade.MyAccount', [
    'AwaLabs.Trade',
    'Profile.Model',
    'Profile.ManagePrice.View',
    'Profile.Model.HidePrices'
], function AwaLabsTradeMyAccount(
    AwaLabsTrade,
    ProfileModel,
    ProfileManagePriceView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (layout) {
                layout.addToViewContextDefinition('Overview.Home.View', 'isTrade', 'boolean', function isTrade() {
                    return profile.get('isTrade');
                });

                if (profile.get('isAllowPriceControl')) {
                    layout.addChildViews('Overview.Home.View', {
                        'Profile.ManagePrice': {
                            'Profile.ManagePrice': {
                                childViewConstructor: function ProfileManagePrice() {
                                    return new ProfileManagePriceView({ model: profile });
                                }
                            }
                        }
                    });
                }
            }
            AwaLabsTrade.mountToApp(container, 'showContactAndTradingInfo');
        }
    };
});
