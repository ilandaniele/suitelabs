/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.ThemeHelper.Checkout', [
    'ThemeHelper.Transaction.Line.Views.Cell.Navigable.View',
    'ThemeHelper.OrderWizard.Module.CartSummary',
    'ThemeHelper.LoginRegister.Register.View',
    'ThemeHelper.OrderWizard.Module.Address',
    'ThemeHelper.CreditCard.Edit.Form.View',
    'ThemeHelper.CreditCard.Edit.Form.SecurityCode.View',
    'ThemeHelper.GoogleTagManager',
    'ThemeHelper.Header.View',
    'ThemeHelper.Address.Edit.Fields.View'
],
function NSeCommThemeHelperCheckout(
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {}
    };
});
