/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    'N/runtime',
    'N/log',
    './Pacejet.Model'
], function PacejetService(
    nRuntime,
    nLog,
    PacejetModel
) {
    'use strict';

    return {
        service: function service(context) {
            var response = [];
            var sessionObj = {};
            var params = context.request.parameters;
            var body = {};
            var zipCode = '';
            var rates = {};

            try {
                switch (context.request.method) {
                case 'GET':

                    if (params.action === 'getZipCodeAndPajecetData') {
                        sessionObj = nRuntime.getCurrentSession();
                        zipCode = sessionObj.get({ name: 'ZipCode' });
                        rates = PacejetModel.getPacejetShippingData(zipCode, params.item);

                        response = {
                            zipCode: zipCode,
                            rates: rates
                        };
                    } else if (params.action === 'getZipCode') {
                        sessionObj = nRuntime.getCurrentSession();
                        zipCode = sessionObj.get({ name: 'ZipCode' });
                        response = {
                            zipCode: zipCode || ''
                        };
                    }

                    break;
                case 'POST':
                    body = JSON.parse(context.request.body);
                    if (body.action === 'saveZipCode') {
                        sessionObj = nRuntime.getCurrentSession();
                        sessionObj.set({
                            name: 'ZipCode',
                            value: body.zipcode
                        });

                        response = {
                            zipCode: sessionObj.get({ name: 'ZipCode' })
                        };
                    }
                    break;

                default:
                    nLog.debug({ title: 'Pacejet Service', details: context.request.method });
                }
            } catch (e) {
                nLog.error({ title: 'Pacejet Service', details: e });
            }
            context.response.write(JSON.stringify(response));
        }
    };
});
