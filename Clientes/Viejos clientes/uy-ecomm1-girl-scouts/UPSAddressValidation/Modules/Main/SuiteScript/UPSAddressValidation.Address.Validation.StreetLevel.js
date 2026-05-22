/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.Address.Validation.StreetLevel', [
    'SC.Model',
    'Configuration',
    'underscore'
], function UPSAddressValidationAddressValidationStreetLevel(
    SCModel,
    Configuration,
    _
) {
    'use strict';

    var XAVRequest = {
        UPSSecurity: {
            UsernameToken: {
                Username: '',
                Password: ''
            },
            ServiceAccessToken: {
                AccessLicenseNumber: ''
            }
        },
        XAVRequest: {
            Request: {
                RequestOption: '1',
                TransactionReference: {
                    CustomerContext: 'SCA UPS Address Validation Street Level'
                }
            },
            MaximumListSize: '15', // valid 0 - 50, default 15
            AddressKeyFormat: {
                ConsigneeName: '',
                BuildingName: '',
                AddressLine: [],
                Region: '',
                PoliticalDivision2: '',
                PoliticalDivision1: '',
                PostcodePrimaryLow: '',
                PostcodeExtendedLow: '',
                Urbanization: '',
                CountryCode: ''
            }
        }
    };

    return SCModel.extend({
        name: 'UPSAddressValidationStreetLevel',
        upsResponse: null,
        upsGetArrayResults: function upsGetArrayResults() {
            var response = this.upsResponse;
            var results;

            results = (_.isArray(response.XAVResponse.Candidate)) ? response.XAVResponse.Candidate : [response.XAVResponse.Candidate];

            results = _.map(results, function map(address) {
                var addr = address.AddressKeyFormat.AddressLine;
                return {
                    addr1: (_.isArray(addr)) ? addr[0] : addr,
                    addr2: (_.isArray(addr) && addr.length > 1) ? addr[1] : null,
                    city: address.AddressKeyFormat.PoliticalDivision2,
                    state: address.AddressKeyFormat.PoliticalDivision1,
                    zip: address.AddressKeyFormat.PostcodePrimaryLow
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
            if (response.Fault) {
                nlapiLogExecution('ERROR', 'Fault Code', response.Fault.faultcode);
                nlapiLogExecution('ERROR', 'Fault String', response.Fault.faultstring);
                nlapiLogExecution('ERROR', 'Error Code', response.Fault.detail.Errors.ErrorDetail.PrimaryErrorCode.Code);
                nlapiLogExecution('ERROR', 'Error Description', response.Fault.detail.Errors.ErrorDetail.PrimaryErrorCode.Description);
                return false;
            }
            if (response.XAVResponse.Response.ResponseStatus.Code !== '1') {
                nlapiLogExecution('ERROR', 'Response Code', response.XAVResponse.Response.ResponseStatus.Code);
                nlapiLogExecution('ERROR', 'Response Description', response.XAVResponse.Response.ResponseStatus.Description);
                return false;
            }
            if (!response.XAVResponse.Candidate) {
                nlapiLogExecution('ERROR', 'No Candidate', JSON.stringify(response.XAVResponse));
                return false;
            }
            return true;
        },
        upsValidate: function upsValidate(id, data) {
            var upsObj = XAVRequest;
            var upsURL = (Configuration.get('extensions.upsAddressValidation.testingMode'))
            ? Configuration.get('extensions.upsAddressValidation.testingUrl')
            : Configuration.get('extensions.upsAddressValidation.productionUrl');
            var validCountry;
            var availableCountries = ['US', 'PR'];
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
            upsObj.UPSSecurity.UsernameToken.Username = upsObject.userUPS;
            upsObj.UPSSecurity.UsernameToken.Password = upsObject.passwordUPS;
            upsObj.UPSSecurity.ServiceAccessToken.AccessLicenseNumber = upsObject.licenseUPS;
            upsObj.XAVRequest.AddressKeyFormat.ConsigneeName = data.company;
            upsObj.XAVRequest.AddressKeyFormat.BuildingName = '';
            upsObj.XAVRequest.AddressKeyFormat.PoliticalDivision2 = data.city;
            upsObj.XAVRequest.AddressKeyFormat.PoliticalDivision1 = data.state;
            upsObj.XAVRequest.AddressKeyFormat.PostcodePrimaryLow = data.zip;
            upsObj.XAVRequest.AddressKeyFormat.CountryCode = data.country;

            upsObj.XAVRequest.AddressKeyFormat.AddressLine.push(data.addr1);
            upsObj.XAVRequest.AddressKeyFormat.AddressLine.push(data.addr2);
            /*eslint-enable */

            request = nlapiRequestURL(upsURL, JSON.stringify(upsObj), headers).getBody();

            this.upsResponse = JSON.parse(request);

            return this.upsResponse;
        }
    });
});
