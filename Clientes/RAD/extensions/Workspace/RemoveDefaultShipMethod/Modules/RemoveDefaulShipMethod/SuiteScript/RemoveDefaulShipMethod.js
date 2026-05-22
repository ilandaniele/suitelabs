define('RemoveDefaulShipMethod', [
    'Account.Model',
    'SC.Models.Init',
    'underscore'
], function RemoveDefaulShipMethod(
    AccountModel,
    ModelsInit,
    _
) {
    'use strict';

    _.extend(AccountModel, {
        login: _.wrap(AccountModel.login, function register(fn) {
            var loginResuls = fn.apply(this, _.toArray(arguments).slice(1));
            ModelsInit.order.removeShippingMethod();
            return loginResuls;
        })
    });
});
