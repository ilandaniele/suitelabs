define('AwaLabs.LoginRegisterTrade', [
    'LoginRegisterTrade.Trade.View',
    'LoginRegisterTrade.Retail.View',
    'jQuery',
    'Backbone',
    'Utils',
    'LoginRegisterTrade.Account.Register.Model',
    'LoginRegisterTrade.LoginRegister.Register.View',
    'LoginRegisterTrade.LoginRegister.Login.View'
], function AwaLabsLoginRegisterTrade(
    LoginRegisterTradeTradeView,
    LoginRegisterTradeRetailView,
    jQuery,
    Backbone,
    Utils
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');

            if (layout) {
                layout.addToViewEventsDefinition(
                    'LoginRegister.Register.View',
                    'click [data-action="link-register"]',
                    function setValueInDropDown(event) {
                        var a = jQuery(event.target);
                        var text = a.html();
                        var link = a.data('link');

                        jQuery('#customer-type-dropdown').html(text);
                        jQuery('#btnRedirect').attr('data-link', link);
                    }
                );
                layout.addToViewEventsDefinition(
                    'LoginRegister.Register.View',
                    'click [data-action="submit"]',
                    function setValueInDropDown(event) {
                        var a = jQuery(event.target);
                        var link = a.data('link');

                        event.preventDefault();
                        event.stopPropagation();
                        if (link) {
                            Backbone.history.navigate(link, { trigger: true, replace: true });
                        } else {
                            layout.showMessage({
                                type: 'error',
                                message: Utils.translate('Please select a customer type')
                            });
                        }
                    }
                );
                layout.addToViewContextDefinition('LoginRegister.Register.View', 'tradeSelectText', 'string', function fn() {
                    return environment.getConfig('tradeCustomerTradeSelectText');
                });
                layout.addToViewContextDefinition('LoginRegister.Register.View', 'retailSelectText', 'string', function fn() {
                    return environment.getConfig('tradeCustomerRetailsSelectText');
                });
            }
            if (pageType) {
                pageType.registerPageType({
                    name: 'register-trade',
                    view: LoginRegisterTradeTradeView,
                    routes: ['register-trade'],
                    options: { 'environment': environment }
                });
                pageType.registerPageType({
                    name: 'register-retail',
                    view: LoginRegisterTradeRetailView,
                    routes: ['register-retail']
                });
            }
        }
    };
});
