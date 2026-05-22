/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.Model', [
    'SC.Model',
    'Configuration',
    'UPSAddressValidation.Address.Validation',
    'UPSAddressValidation.Address.Validation.StreetLevel'
],
function UPSAddressValidationModel(
    SCModel,
    Configuration,
    UPSAddressValidationAddressValidation,
    UPSAddressValidationAddressValidationStreetLevel
) {
    'use strict';

    var model = (Configuration.get('extensions.upsAddressValidation.validationType') === 'XAV')
        ? UPSAddressValidationAddressValidationStreetLevel
        : UPSAddressValidationAddressValidation;

    return SCModel.extend({
        name: 'UPSAddressValidation',

        upsResponse: null,

        upsGetArrayResults: function upsGetArrayResults() {
            return model.upsGetArrayResults();
        },

        upsIsValid: function upsIsValid() {
            return model.upsIsValid();
        },

        upsValidate: function upsValidate(id, data) {
            return model.upsValidate(id, data);
        }
    });
});
