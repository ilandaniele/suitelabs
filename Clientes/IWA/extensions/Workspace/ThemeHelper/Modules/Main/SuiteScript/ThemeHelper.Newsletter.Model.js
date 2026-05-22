/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Newsletter.Model', [
    'Models.Init',
    'Newsletter.Model',
    'Configuration',
    'underscore'
], function ThemeHelperNewsletterModel(
    ModelsInit,
    NewsletterModel,
    Configuration,
    _
) {
    'use strict';

    return _(NewsletterModel).extend({
        // @method createSubscription Create a new 'lead' record with globalsubscriptionstatus = 1 (Soft Opt-In)
        // @parameter {String} email
        // @returns {subscriptionDone} Custom object with confirmation of lead record creation
        createSubscription: function createSubscription(email) {
            var record = nlapiCreateRecord('lead');
            record.setFieldValue('entityid', email);
            record.setFieldValue('firstname', Configuration.get('newsletter.genericFirstName'));
            record.setFieldValue('lastname', Configuration.get('newsletter.genericLastName'));
            record.setFieldValue('email', email);
            record.setFieldValue('subsidiary', ModelsInit.session.getShopperSubsidiary());
            record.setFieldValue('companyname', Configuration.get('newsletter.companyName'));
            record.setFieldValue('category', '16');
            record.setFieldValue('globalsubscriptionstatus', 1);
            nlapiSubmitRecord(record);
            return this.subscriptionDone;
        }
    });
});
