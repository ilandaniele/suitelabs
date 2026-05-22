/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.OrderWizard.Module.Address', [
    'OrderWizard.Module.Address',
    'themehelper_order_wizard_address_module.tpl',
    'underscore'
], function ThemeHelperOrderWizardModuleAddress(
    OrderWizardModuleAddress,
    OrderWizardModuleAddressTpl,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleAddress.prototype, {
        template: OrderWizardModuleAddressTpl,

        getContext: _.wrap(OrderWizardModuleAddress.prototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.homeUrl = this.wizard.model.get('touchpoints').home;
            return context;
        })
    });
});
