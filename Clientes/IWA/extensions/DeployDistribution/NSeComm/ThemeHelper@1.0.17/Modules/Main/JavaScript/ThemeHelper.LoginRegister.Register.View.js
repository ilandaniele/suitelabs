/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.LoginRegister.Register.View', [
    'LoginRegister.Register.View',
    'themehelper_login_register_register.tpl',
    'underscore'
], function ThemeHelperLoginRegisterRegisterView(
    LoginRegisterRegisterView,
    LoginRegisterRegisterViewTpl,
    _
) {
    'use strict';

    _.extend(LoginRegisterRegisterView.prototype, {
        template: LoginRegisterRegisterViewTpl
    });
});
