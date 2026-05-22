/* global nlapiGetWebContainer */
define('CustomForms.Model', [
    'CustomForms.ReCAPTCHA',
    'SC.Model',
    'underscore'
], function CustomFormsModel(
    CustomFormsReCAPTCHA,
    SCModel,
    _
) {
    'use strict';

    // Case Form is type 1, but this code is not using it, it is here for reference only.
    // var FORM_TYPE_CASE = '1';
    var FORM_TYPE_LEAD = '2';

    return SCModel.extend({
        name: 'CustomForms',

        successMessage: {
            code: 'OK',
            message: 'Your request has been processed!'
        },

        reCAPTCHAFailedMessage: {
            status: 500,
            code: 'ERR_RECAPTCHA_FORM',
            message: 'reCAPTCHA couldn\'t validate, please try again later.'
        },

        warningMessage: {
            status: 500,
            code: 'ERR_FORM',
            message: 'Something went wrong processing your request, please try again later.'
        },

        generateFormUrl: function generateFormUrl(data) {
            var type = String(data.formType) !== FORM_TYPE_LEAD ? 'case' : 'lead';
            var url = data.currentDomain + 'app/site/crm/external' + type + 'page.nl';
            var params = {
                compid: nlapiGetContext().getCompany(),
                formid: data.formId,
                h: data.formHash
            };

            return url + '?' + _(params).map(function eachParam(v, k) { return k + '=' + v; }).join('&');
        },

        getFileUploaderUrl: function getFileUploaderUrl() {
            return nlapiResolveURL('SUITELET', 'customscript_cms_form_file_uploader', 'customdeploy_cms_form_file_uploader');
        },

        getStatesFetcherUrl: function getStatesFetcherUrl() {
            return nlapiResolveURL('SUITELET', 'customscript_cms_form_states_fetcher', 'customdeploy_cms_form_states_fetcher', true);
        },

        getCustomListValues: function getCustomListValues(customList) {
            var filters = ['isinactive', 'is', 'F'];
            var columns = [
                new nlobjSearchColumn('name'),
                new nlobjSearchColumn('internalid').setSort(false)
            ];
            var searchResults = nlapiSearchRecord(
                customList,
                null,
                filters,
                columns
            ) || [];

            return _(searchResults).map(function forEachResult(customListValue) {
                return {
                    id: customListValue.id,
                    name: customListValue.getValue('name')
                };
            });
        },

        getIssueTypes: function getIssueTypes() {
            var tempCase;
            var issueField;
            var options;
            var ret = [];

            try {
                tempCase = nlapiCreateRecord('supportcase');
                issueField = tempCase.getField('issue');
                options = issueField.getSelectOptions();

                ret = _(options).map(function forEachResult(option) {
                    return {
                        id: option.getId(),
                        name: option.getText()
                    };
                });
            } catch (e) {
                nlapiLogExecution('error', 'Error getting the support case types list', e.message);
            }

            return ret;
        },

        getCustomListsValues: function getCustomListsValues(customLists) {
            var self = this;
            var customListsIds = customLists.split(',');

            return _(customListsIds).reduce(function reducer(result, customListId) {
                switch (customListId) {
                case 'state':
                    result[customListId] = self.getStates();
                    break;
                case 'country':
                    result[customListId] = self.getCountries();
                    break;
                case 'issue':
                    result[customListId] = self.getIssueTypes();
                    break;
                default:
                    result[customListId] = self.getCustomListValues(customListId);
                }

                return result;
            }, {});
        },

        getStates: function getStates() {
            var statesFetcherUrl = this.getStatesFetcherUrl();
            var statesFetcherResponse;
            var statesFetcherResponseBody;
            var statesFetcherParsedResponse;

            try {
                statesFetcherResponse = nlapiRequestURL(statesFetcherUrl);
                statesFetcherResponseBody = statesFetcherResponse.getBody();
                statesFetcherParsedResponse = JSON.parse(statesFetcherResponseBody);

                if (statesFetcherParsedResponse) {
                    statesFetcherParsedResponse = statesFetcherParsedResponse.states;
                }
            } catch (e) {
                nlapiLogExecution('error', 'Error getting States', JSON.stringify(e));
                statesFetcherParsedResponse = [];
            }

            return (statesFetcherParsedResponse || []);
        },

        getCountries: function getCountries() {
            return nlapiGetWebContainer().getShoppingSession().getCountries();
        },

        getCustomFormSettingsRecordId: function getCustomFormSettingsRecordId(formId, formType, formHash) {
            var filters = [
                ['isinactive', 'is', 'F'],
                'and',
                ['custrecord_custom_form_id', 'is', formId],
                'and',
                ['custrecord_custom_form_type', 'is', formType],
                'and',
                ['custrecord_custom_form_hash', 'is', formHash]
            ];
            var searchResults = nlapiSearchRecord(
                'customrecord_cms_custom_form',
                null,
                filters
            ) || [];

            if (searchResults.length === 1) {
                return _(searchResults).first().getId();
            }

            return null;
        },

        getCustomFormSettingsRecordReCAPTCHASettings: function getCustomFormSettingsRecordReCAPTCHASettings(id) {
            var settings;

            try {
                if (id) {
                    settings = nlapiLookupField(
                        'customrecord_cms_custom_form',
                        id,
                        ['custrecord_custom_form_gr_enabled', 'custrecord_custom_form_gr_secret_key']
                    );

                    if (settings) {
                        return {
                            enabled: settings.custrecord_custom_form_gr_enabled === 'T',
                            secretKeyId: settings.custrecord_custom_form_gr_secret_key
                        };
                    }
                }
            } catch (e) {
                nlapiLogExecution('error', 'Error on getCustomFormSettingsRecordReCAPTCHASettings', JSON.stringify(e));
            }

            return {
                enabled: false
            };
        },

        // searchCustomFormSettingsRecord: function searchCustomFormSettingsRecord(data) {
        //     var filters = [
        //         ['isinactive', 'is', 'F'],
        //         'and',
        //         ['custrecord_custom_form_id', 'is', data.formId],
        //         'and',
        //         ['custrecord_custom_form_type', 'is', data.formType],
        //         'and',
        //         ['custrecord_custom_form_hash', 'is', data.formHash]
        //     ];
        //     var columns = [
        //         new nlobjSearchColumn('custrecord_custom_form_gr_enabled'),
        //         new nlobjSearchColumn('custrecord_custom_form_gr_secret_key')
        //     ];
        //     var searchResults = nlapiSearchRecord(
        //         'customrecord_cms_custom_form',
        //         null,
        //         filters,
        //         columns
        //     ) || [];
        //     var searchResultsMap = _(searchResults).map(function forEachResult(searchResult) {
        //         return {
        //             enabled: searchResult.getValue('custrecord_custom_form_gr_enabled') === 'T',
        //             secretKeyId: searchResult.getValue('custrecord_custom_form_gr_secret_key')
        //         };
        //     });

        //     if (searchResultsMap.length === 1) {
        //         return _(searchResultsMap).first();
        //     }

        //     return {
        //         enabled: false
        //     };
        // },

        create: function create(data) {
            var serviceUrl;
            var serviceData;
            var serviceResponse;
            var responseCode;
            var responseBody;
            var reCaptchaIsValid;
            var customFormSettingsRecord;

            try {
                customFormSettingsRecord = this.getCustomFormSettingsRecordReCAPTCHASettings(data.settingsRecordId);

                nlapiLogExecution('error', 'customFormSettingsRecord', JSON.stringify(customFormSettingsRecord));

                if (customFormSettingsRecord.enabled) {
                    reCaptchaIsValid = CustomFormsReCAPTCHA.validate(data, customFormSettingsRecord.secretKeyId);

                    if (!reCaptchaIsValid) {
                        return this.reCAPTCHAFailedMessage;
                    }
                }

                serviceUrl = this.generateFormUrl(data);
                serviceData = _(data).omit(['formId', 'formHash', 'formType']);

                serviceData = _(serviceData).extend({
                    compid: nlapiGetContext().getCompany(),
                    formid: data.formId,
                    h: data.formHash
                });

                serviceResponse = nlapiRequestURL(serviceUrl, serviceData);
                responseBody = serviceResponse.getBody();
                responseCode = parseInt(serviceResponse.getCode(), 10);

                // Just in case someday it accepts the redirect. 206 is netsuite error ('partial content')
                if (responseCode === 200 || responseCode === 201 || responseCode === 302 || responseCode === 404) {
                    return this.successMessage;
                }
            } catch (e) {
                // If the form submit SUCCEEDS!!! it will throw an exception
                // Because of the url redirect
                if (e instanceof nlobjError && e.getCode().toString() === 'ILLEGAL_URL_REDIRECT') {
                    return this.successMessage;
                }
                this.warningMessage = e.message || this.warningMessage;
            }

            if (responseBody) {
                responseBody = responseBody.substr(responseBody.lastIndexOf('class=text') + 'class=text'.length + 1);
                responseBody = responseBody.substr(0, responseBody.indexOf('</'));
                responseBody = responseBody.replace(/<\/?[^>]+(>|$)/g, '').trim();
            }
            throw responseBody || this.warningMessage;
        }
    });
});
