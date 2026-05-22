/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    './Transact.Model'
], function TransactService(
    TransactModel
) {
    'use strict';

    return {
        service: function service(context) {
            var result = {};
            var params = context.request.parameters || {};

            try {
                switch (context.request.method) {
                case 'GET':
                    result = TransactModel.validator(params.dukeId, params.pin, params.items, params.payment, params.shipping, params.summary);
                    break;
                default:
                    result.error = 'Invalid method';
                }
            } catch (e) {
                result.error = e;
            }

            context.response.write(JSON.stringify(result));
        }
    };
});
