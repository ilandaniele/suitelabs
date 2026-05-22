define('LoginRegisterTrade.Form.ServiceController', [
    'ServiceController',
    'LoginRegisterTrade.Model'
], function LoginRegisterTradeFormServiceControllerFn(
    ServiceController,
    LoginRegisterTradeModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'LoginRegisterTrade.Form.ServiceController',

        get: function get() {
            return LoginRegisterTradeModel.get();
        }
    });
});
