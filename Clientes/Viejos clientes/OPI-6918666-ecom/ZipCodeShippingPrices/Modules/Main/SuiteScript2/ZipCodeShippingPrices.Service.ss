/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    'N/log',
    './ZipCodeShippingPrices.Model'
], function ZipCodeShippingPricesService(
    nLog,
    ZipCodeShippingPricesModel
) {
    'use strict';

    return {
        service: function service(context) {
            var response = [];
            nLog.debug({ title: 'Zip Code Shipping Prices Service Context', details: context });
            var params = context.request.parameters;
            var shippingCost = '';
            var zipCode = '';
            nLog.debug({ title: 'Zip Code Shipping Prices Service Parameters', details: params });

            try {
                switch (context.request.method) {
                case 'GET':
                    if (params.action === 'getShippingCost') {
                        zipCode = params.zipCode;
                        shippingCost = ZipCodeShippingPricesModel.getShippingCost(zipCode);

                        response = {
                            shippingCost: shippingCost || ''
                        };
                    }
                    break;
                default:
                    nLog.debug({ title: 'Zip Code Shipping Prices Service', details: context.request.method });
                }
            } catch (e) {
                nLog.error({ title: 'Zip Code Shipping Prices Service', details: e });
            }
            context.response.write(JSON.stringify(response));
        }
    };
});
