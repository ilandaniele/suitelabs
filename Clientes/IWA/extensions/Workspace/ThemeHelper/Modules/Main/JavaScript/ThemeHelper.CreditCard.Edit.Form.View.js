/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.CreditCard.Edit.Form.View', [
    'CreditCard.Edit.Form.View',
    'themehelper_creditcard_edit_form.tpl',
    'underscore'
], function ThemeHelperCreditCardEditFormView(
    CreditCardEditFormView,
    CreditcardEditFormTpl,
    _
) {
    'use strict';

    _.extend(CreditCardEditFormView.prototype, {
        template: CreditcardEditFormTpl
    });
});
