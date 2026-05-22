/* global getExtensionAssetsPath */
define('LoginRegisterTrade.Form.Model', [
    'SCModel',
    'Utils'
], function LoginRegisterTradeFormModelDefinition(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    var LoginRegisterTradeFormModel = function LoginRegisterTradeFormModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('services/LoginRegisterTrade.Form.Service.ss')
            );
        };
    };

    LoginRegisterTradeFormModel.prototype = Object.create(SCModel.prototype);

    LoginRegisterTradeFormModel.prototype.constructor = LoginRegisterTradeFormModel;

    return LoginRegisterTradeFormModel;
});
