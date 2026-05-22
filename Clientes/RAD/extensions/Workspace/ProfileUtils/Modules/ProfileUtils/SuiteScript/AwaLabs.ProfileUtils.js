define('AwaLabs.ProfileUtils', [
    'Application',
    'SC.Models.Init',
    'underscore'
], function ProfileUtils(
    Application,
    ModelsInit,
    _
) {
    'use strict';

    Application.on('after:Profile.get', function fnProfileGet(model, response) {
        var customFields = response.customfields;
        var isEnabledRetailPrices = _.findWhere(customFields, { name: 'custentity_catalog_retail_price_enabled' });
        var isAllowContactCheckout = _.findWhere(customFields, { name: 'custentity_allow_contact_checkout' });
        var isAllowPriceControl = _.findWhere(customFields, { name: 'custentity_allow_price_control' });
        response.contactId = ModelsInit.context.getContact();
        response.isEnabledRetailPrices = isEnabledRetailPrices && isEnabledRetailPrices.value && isEnabledRetailPrices.value === 'T';
        response.isAllowContactCheckout = isAllowContactCheckout && isAllowContactCheckout.value && isAllowContactCheckout.value === 'T';
        response.isAllowPriceControl = !response.contactId ||
            (isAllowPriceControl && isAllowPriceControl.value && isAllowPriceControl.value === 'T');
        response.allowContactCheckout = !response.contactId || (isAllowContactCheckout && response.isAllowPriceControl);
        response.allowProceedToCheckout = !response.isEnabledRetailPrices && response.allowContactCheckout;
        return response;
    });
});
