/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Account.Model', [
    'Application',
    'Models.Init',
    'ThemeHelper.Newsletter.Model'
], function ThemeHelperAccountModel(
    Application,
    ModelsInit
) {
    'use strict';

    Application.on('after:Account.register', function on(Model, response, userData) {
        ModelsInit.customer.updateProfile({
            internalid: nlapiGetUser(),
            emailsubscribe: (userData.emailsubscribe && userData.emailsubscribe !== 'F') ? 'F' : 'T'
        });
    });
});
