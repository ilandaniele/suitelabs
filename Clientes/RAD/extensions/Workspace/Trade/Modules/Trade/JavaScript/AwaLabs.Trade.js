define('AwaLabs.Trade', [
    'Profile.Model',
    'MyAccountMenu',
    'Dialog.Service',
    'Profile.Model.HidePrices'
], function AwaLabsTrade(
    ProfileModel,
    MyAccountMenu,
    DialogService
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container, showContactAndTradingInfo) {
            var checkout = container.getComponent('Checkout');
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (checkout) {
                checkout.on('afterShowContent', function beforeShowContent() {
                    checkout.getCurrentStep().done(function getCurrentStepDone(currentStep) {
                        if (currentStep && currentStep.url === 'shipping/address' && profile && profile.get('isPendingTradeApproval')) {
                            new DialogService(container).openDialog('Pending Trade Approval - Checkout');
                        }
                    });
                });
            }

            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.MyAccount.View', showContactAndTradingInfo || 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade') && (!showContactAndTradingInfo || !!profile.get('contactId'));
                });

                layout.addToViewContextDefinition('Header.Menu.View', 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade');
                });
            }

            if (!profile.get('isTrade')) {
                MyAccountMenu.getInstance().removeSubEntry('quotes');
            }
        }
    };
});
