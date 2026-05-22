/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define([
    './MyAccountAdditionalFields.Model.js',
    'N/log'
], function MyAccountAdditionalFieldsService(
    MyAccountAdditionalFieldsModel,
    nLog
) {
    'use strict';

    return {
        service: function service(context) {
            var response;
            var lists;
            var additionalFields;
            var body;

            var params = context.request.parameters;

            try {
                switch (context.request.method) {
                case 'POST':
                    body = JSON.parse(context.request.body);
                    if (body.action === 'updateLead') {
                        response = MyAccountAdditionalFieldsModel.upload(context.request.body);
                    }
                    break;
                case 'GET':
                    if (params.action === 'getCategoriesAndThirdPartyCarriers') {
                        lists = MyAccountAdditionalFieldsModel.getCategoriesAndThirdPartyCarriers();
                        response = {
                            categories: lists.categories,
                            carriers: lists.carriers
                        };
                    } else if (params.action === 'hasAdditionalFields') {
                        additionalFields = MyAccountAdditionalFieldsModel.hasAdditionalFields();
                        response = {
                            additionalFields: additionalFields
                        };
                    }
                    break;
                default:
                    response = {
                        error: true,
                        details: 'Method not implemented'
                    };
                    break;
                }
            } catch (e) {
                nLog.error({
                    title: 'Error in MyAccountAdditionalFieldsModel.Service',
                    details: e
                });
                response = {
                    error: true,
                    details: e
                };
            }

            context.response.write(JSON.stringify(response));
        }
    };
});
