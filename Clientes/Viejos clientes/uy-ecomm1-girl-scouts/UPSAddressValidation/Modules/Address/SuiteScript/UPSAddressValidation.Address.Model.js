/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.Address.Model', [
    'UPSAddressValidation.Model',
    'Address.Model',
    'Configuration',
    'Models.Init',
    'underscore'
],
function UPSAddressValidationAddressModel(
    UPSAddressValidationModel,
    AddressModel,
    Configuration,
    ModelsInit,
    _
) {
    'use strict';

    _.extend(AddressModel, {

        update: function update(id, dataParams) {
            var upsResponse;
            var addressResults;
            var data = this.unwrapAddressee(dataParams);
            var addressData = {};

            this.validate(data);

            data.internalid = id;

            if (data.skipaddress === 'T') {
                return {
                    id: ModelsInit.customer.updateAddress(data)
                };
            }

            if (!Configuration.get('extensions.upsAddressValidation.enabled')) {
                return {
                    id: ModelsInit.customer.updateAddress(data)
                };
            }
            addressData.id = ModelsInit.customer.updateAddress(data);
            addressData.UPSValidationAddresses = [];

            nlapiLogExecution('DEBUG', 'UPSAddressValidation.Address.Model | Update | id', addressData.id);

            upsResponse = UPSAddressValidationModel.upsValidate(id, data);

            nlapiLogExecution('DEBUG', 'UPSAddressValidation.Address.Model | Update | upsResponse', JSON.stringify(upsResponse));

            if (upsResponse && UPSAddressValidationModel.upsIsValid()) {
                addressResults = UPSAddressValidationModel.upsGetArrayResults();
                if (addressResults && addressResults.length) {
                    addressData.UPSValidationAddresses = addressResults;
                }
            }
            nlapiLogExecution('DEBUG', 'UPSAddressValidation.Address.Model | Update | addressData', JSON.stringify(addressData));

            return addressData;
        },

        create: function create(dataParams) {
            var upsResponse;
            var addressResults;
            var data = this.unwrapAddressee(dataParams);
            var addressData = {};

            this.validate(data);

            if (data.skipaddress === 'T') {
                return {
                    id: ModelsInit.customer.addAddress(data)
                };
            }

            if (!Configuration.get('extensions.upsAddressValidation.enabled')) {
                return {
                    id: ModelsInit.customer.addAddress(data)
                };
            }

            addressData.id = ModelsInit.customer.addAddress(data);
            addressData.UPSValidationAddresses = [];

            nlapiLogExecution('DEBUG', 'UPSAddressValidation.Address.Model | Create | id', addressData.id);
            upsResponse = UPSAddressValidationModel.upsValidate(null, data);
            nlapiLogExecution('DEBUG', 'UPSAddressValidation.Address.Model | Create | upsResponse', JSON.stringify(upsResponse));

            if (upsResponse && UPSAddressValidationModel.upsIsValid()) {
                addressResults = UPSAddressValidationModel.upsGetArrayResults();
                if (addressResults && addressResults.length) {
                    addressData.UPSValidationAddresses = addressResults;
                }
            }
            nlapiLogExecution('DEBUG', 'UPSAddressValidation.Address.Model | Create | addressData', JSON.stringify(addressData));
            return addressData;
        }
    });
});
