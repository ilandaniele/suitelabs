define('LoginRegisterTrade.Account.Register.Model', [
    'Account.Register.Model',
    'Utils',
    'underscore',
    'Utils'
], function LoginRegisterTradeAccountRegisterModel(
    AccountRegisterModel,
    Utils,
    _
) {
    'use strict';

    _.extend(AccountRegisterModel.prototype, {
        validation: _.extend(AccountRegisterModel.prototype.validation, {
            company: {
                required: false
            },
            email2: [
                {
                    required: true,
                    msg: Utils.translate('Confirm email is required')
                },
                {
                    equalTo: 'email',
                    msg: Utils.translate('New Email and Confirm Email do not match')
                }
            ]
        })
    });
});
