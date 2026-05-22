define('DoNotEmail.Account.Model', [
    'Application',
    'Models.Init'
], function DoNotEmailAccountModel(
    Application,
    ModelsInit
) {
    'use strict';

    Application.on('after:Account.register', function afterAccountRegister(model, response, userData) {
        ModelsInit.customer.updateProfile({
            internalid: nlapiGetUser(),
            customfields: {
                custentity74: (userData.emailsubscribe && userData.emailsubscribe !== 'F') ? 'F' : 'T'
            }
        });
    });
});
