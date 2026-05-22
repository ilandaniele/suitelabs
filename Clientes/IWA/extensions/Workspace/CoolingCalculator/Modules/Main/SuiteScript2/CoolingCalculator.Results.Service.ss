/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define([
    './CoolingCalculator.Model'
], function CoolingCalculatorResultsService(
    CoolingCalculatorModel
) {
    'use strict';

    return {
        service: function service(context) {
            var result = {};
            var action = context.request.parameters && context.request.parameters.action;

            try {
                switch (action) {
                case 'getRValues':
                    result = CoolingCalculatorModel.getMaterialRValues();
                    break;
                case 'getThermalDetails':
                    result = CoolingCalculatorModel.getTLCItemDetails(
                        context.request.parameters.tlcId
                    );
                    break;
                case 'getTLCId':
                    result = CoolingCalculatorModel.getThermalRecordTLCIdByFormId(
                        context.request.parameters.formId
                    );
                    break;
                default:
                    // Unknown action
                }
            } catch (e) {
                result.error = e;
            }
            context.response.write(JSON.stringify(
                result
            ));
        }
    };
});
