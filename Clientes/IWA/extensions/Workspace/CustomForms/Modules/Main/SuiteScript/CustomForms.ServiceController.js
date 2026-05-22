define('CustomForms.ServiceController', [
    'CustomForms.Model',
    'ServiceController'
], function CustomFormsServiceController(
    CustomFormsModel,
    ServiceController
) {
    'use strict';

    return ServiceController.extend({
        name: 'CustomForms.ServiceController',

        // The values in this object are the validation needed for the current service.
        // Can have values for all the request methods ('common' values) and specific for each one.
        options: {
            common: {
                requireLoggedInPPS: true
            }
        },

        get: function get() {
            var customLists = this.request.getParameter('customLists');
            var formId = this.request.getParameter('formId');
            var formHash = this.request.getParameter('formHash');
            var formType = this.request.getParameter('formType');

            var result = {
                url: CustomFormsModel.getFileUploaderUrl()
            };

            if (customLists) {
                result.customLists = CustomFormsModel.getCustomListsValues(customLists);
            }

            if (formId && formType && formHash) {
                result.settingsRecordId = CustomFormsModel.getCustomFormSettingsRecordId(formId, formType, formHash);
            }

            return result;
        },

        post: function post() {
            return CustomFormsModel.create(this.data);
        },

        put: function put() {
            // do nothing
        },

        'delete': function del() {
            // do nothing
        }
    });
});
