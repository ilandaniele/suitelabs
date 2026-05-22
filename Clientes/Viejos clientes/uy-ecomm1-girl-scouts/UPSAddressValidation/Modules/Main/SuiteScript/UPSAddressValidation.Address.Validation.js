/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.Address.Validation', [
    'SC.Model',
    'Configuration',
    'underscore'
],
function UPSAddressValidationAddressValidation(
    SCModel,
    Configuration,
    _
) {
    'use strict';

    var AddressValidationRequest = {
        AccessRequest: {
            AccessLicenseNumber: '',
            UserId: '',
            Password: ''
        },
        AddressValidationRequest: {
            Request: {
                TransactionReference: {
                    CustomerContext: 'SCA UPS Address Validation'
                },
                RequestAction: 'AV'
            },
            Address: {
                City: '',
                StateProvinceCode: '',
                PostalCode: ''
            }
        }
    };

    return SCModel.extend({
        name: 'UPSAddressValidation',
        upsResponse: null,
        upsGetArrayResults: function upsGetArrayResults() {
            var response = this.upsResponse;
            var results;
            var addressValidationResult = response.AddressValidationResponse.AddressValidationResult;

            results = (_.isArray(addressValidationResult)) ? addressValidationResult : [addressValidationResult];

            if (results[0].Quality === '1.0') {
                return [];
            }

            results = _.map(results, function map(address) {
                return {
                    city: address.Address.City,
                    state: address.Address.StateProvinceCode,
                    zip: address.PostalCodeLowEnd
                };
            });
            return results;
        },
        upsIsValid: function upsIsValid() {
            var response = this.upsResponse;
            if (!response) {
                nlapiLogExecution('ERROR', 'No response', '');
                return false;
            }
            if (response.AddressValidationResponse.Response.Error) {
                nlapiLogExecution('ERROR', 'Error Code', response.AddressValidationResponse.Response.ErrorCode);
                nlapiLogExecution('ERROR', 'Error Code', response.AddressValidationResponse.Response.ErrorDescription);
                return false;
            }
            if (response.AddressValidationResponse.Response.ResponseStatusCode !== '1') {
                nlapiLogExecution('ERROR', 'Response Code', response.AddressValidationResponse.Response.ResponseStatusCode);
                nlapiLogExecution('ERROR', 'Response Description', response.AddressValidationResponse.Response.ResponseStatusDescription);
                return false;
            }
            if (!response.AddressValidationResponse.AddressValidationResult) {
                nlapiLogExecution('ERROR', 'No Address Validation Result', JSON.stringify(response.AddressValidationResponse));
                return false;
            }
            return true;
        },
        upsValidate: function upsValidate(id, data) {
            var upsObj = AddressValidationRequest;
            var upsURL = (Configuration.get('extensions.upsAddressValidation.testingMode'))
                ? Configuration.get('extensions.upsAddressValidation.testingUrl')
                : Configuration.get('extensions.upsAddressValidation.productionUrl');
            var availableCountries = ['US'];
            var validCountry;
            var request;
            var headers = {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'
            };

            upsURL += Configuration.get('extensions.upsAddressValidation.validationType');

            validCountry = _.find(availableCountries, function findValidCountry(value) {
                return value === data.country;
            });

            if (!data.country || !validCountry) {
                return null;
            }

            /*eslint-disable */
            upsObj.AccessRequest.AccessLicenseNumber = upsObject.licenseUPS;
            upsObj.AccessRequest.UserId = upsObject.userUPS;
            upsObj.AccessRequest.Password = upsObject.passwordUPS;
            upsObj.AddressValidationRequest.Address.City = data.city;
            upsObj.AddressValidationRequest.Address.StateProvinceCode = data.state;
            upsObj.AddressValidationRequest.Address.PostalCode = data.zip;
            /*eslint-enable */

            request = nlapiRequestURL(upsURL, JSON.stringify(upsObj), headers).getBody();
            this.upsResponse = JSON.parse(request);

            return this.upsResponse;
        }
    });
});
