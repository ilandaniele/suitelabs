define('LoginRegisterTrade.ServiceController', [
    'ServiceController',
    'LoginRegisterTrade.Model'
], function LoginRegisterTradeServiceControllerFn(
    ServiceController,
    LoginRegisterTradeModel
) {
    'use strict';

    return ServiceController.extend({
        name: 'LoginRegisterTrade.ServiceController',

        get: function get() {
            return LoginRegisterTradeModel.get();
        },

        post: function post() {
            return LoginRegisterTradeModel.registerAccount(this.data);
        }
    });
});
