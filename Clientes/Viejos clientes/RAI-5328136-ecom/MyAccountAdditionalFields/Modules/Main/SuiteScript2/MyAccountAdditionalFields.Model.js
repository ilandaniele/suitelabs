/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define([
    'N/runtime',
    'N/record',
    'N/search',
    'N/log'
], function MyAccountAdditionalFields(
    nRuntime,
    nRecord,
    nSearch,
    nLog
) {
    'use strict';

    return {
        upload: function upload(data) {
            var leadRecord;
            var properties;

            properties = JSON.parse(data);
            leadRecord = nRecord.load({
                type: nRecord.Type.LEAD,
                id: nRuntime.getCurrentUser().id,
                isDynamic: true
            });

            if (properties.category) {
                leadRecord.setValue({
                    fieldId: 'custentity_category',
                    value: properties.category
                });
            }

            if (properties.thirdPartyCarrier) {
                leadRecord.setValue({
                    fieldId: 'custentity_third_party_carrier',
                    value: properties.thirdPartyCarrier
                });
            }

            if (properties.thirdPartyAcct) {
                leadRecord.setValue({
                    fieldId: 'thirdpartyacct',
                    value: properties.thirdPartyAcct
                });
            }

            if (properties.creditCardOrInvoice && properties.creditCardOrInvoice === 'creditCard') {
                leadRecord.setValue({
                    fieldId: 'custentity_credit_card',
                    value: true
                });
            } else if (properties.creditCardOrInvoice && properties.creditCardOrInvoice === 'invoice') {
                leadRecord.setValue({
                    fieldId: 'custentity_invoice',
                    value: true
                });
            }

            if (properties.providerLocator) {
                leadRecord.setValue({
                    fieldId: 'custentity_provider_locator',
                    value: true
                });
            }

            if (properties.practiceManager) {
                leadRecord.setValue({
                    fieldId: 'custentity_practice_manager',
                    value: properties.practiceManager
                });
            }

            if (properties.practiceManagerEmail) {
                leadRecord.setValue({
                    fieldId: 'custentity_practice_manager_email',
                    value: properties.practiceManagerEmail
                });
            }

            if (properties.practiceManagerPhone) {
                leadRecord.setValue({
                    fieldId: 'custentity_practice_manager_phone',
                    value: properties.practiceManagerPhone
                });
            }

            if (properties.physician) {
                leadRecord.setValue({
                    fieldId: 'custentity_physician',
                    value: properties.physician
                });
            }

            if (properties.physicianEmail) {
                leadRecord.setValue({
                    fieldId: 'custentity_physician_email',
                    value: properties.physicianEmail
                });
            }

            if (properties.physicianPhone) {
                leadRecord.setValue({
                    fieldId: 'custentity_physician_phone',
                    value: properties.physicianPhone
                });
            }

            if (properties.accountsPayable) {
                leadRecord.setValue({
                    fieldId: 'custentity_accounts_payable',
                    value: properties.accountsPayable
                });
            }

            if (properties.accountsPayableEmail) {
                leadRecord.setValue({
                    fieldId: 'custentity_accounts_payable_email',
                    value: properties.accountsPayableEmail
                });
            }

            if (properties.accountsPayablePhone) {
                leadRecord.setValue({
                    fieldId: 'custentity_accounts_payable_phone',
                    value: properties.accountsPayablePhone
                });
            }

            if (properties.invoiceEmail) {
                leadRecord.setValue({
                    fieldId: 'custentity_atlas_mfg_std_invoice_email',
                    value: properties.invoiceEmail
                });
            }

            if (properties.taxExemptId) {
                leadRecord.setValue({
                    fieldId: 'vatregnumber',
                    value: properties.taxExemptId
                });
            }

            leadRecord.setValue({
                fieldId: 'custentity_additional_fields',
                value: true
            });

            leadRecord.save();

            return {
                response: 'succcess'
            };
        },

        hasAdditionalFields: function hasAdditionalFields() {
            var leadRecord;
            var additionalFields = false;
            try {
                leadRecord = nRecord.load({
                    type: nRecord.Type.LEAD,
                    id: nRuntime.getCurrentUser().id,
                    isDynamic: true
                });

                additionalFields = leadRecord.getValue({
                    fieldId: 'custentity_additional_fields'
                });
            } catch (e) {
                nLog.error({
                    title: 'Error checking if leads has additional fields',
                    details: e.message
                });

                throw new Error(e.message);
            }

            return additionalFields;
        },

        getCategoriesAndThirdPartyCarriers: function getCategoriesAndThirdPartyCarriers() {
            var lists = {};
            var categories = [];
            var carriers = [];
            var categorySearch;
            var exampleCustomer;
            var field;

            try {
                categorySearch = nSearch.create({
                    type: nSearch.Type.CUSTOMER_CATEGORY,
                    columns: ['internalid', 'name'],
                    filters: ['isinactive', 'is', 'F']
                });

                categorySearch.run().each(function Each(result) {
                    categories.push({
                        id: result.getValue('internalid'),
                        name: result.getValue('name')
                    });

                    return true;
                });

                categories.unshift({
                    id: '',
                    name: ''
                });

                exampleCustomer = nRecord.load({
                    type: nRecord.Type.CUSTOMER,
                    id: 18,
                    isDynamic: true
                });

                field = exampleCustomer.getField({
                    fieldId: 'thirdpartycarrier'
                });

                carriers = field.getSelectOptions({
                    filter: '',
                    operator: 'contains'
                });

                carriers.unshift({
                    value: '',
                    text: ''
                });


                lists = {
                    categories: categories,
                    carriers: carriers
                };

                return lists;
            } catch (e) {
                nLog.error({
                    title: 'Error getting lists',
                    details: e.message
                });

                throw new Error(e.message);
            }
        }
    };
});
