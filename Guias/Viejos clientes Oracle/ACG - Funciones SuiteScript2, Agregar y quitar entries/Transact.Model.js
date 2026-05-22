/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/url',
    'N/https',
    'N/runtime',
    'N/log'
], function TransactModel(
    Url,
    Https,
    Runtime,
    Log
) {
    'use strict';

    var VALIDATOR_SCRIPT_ID = 'customscript_erpts_sl_sca_wps_auth';
    var VALIDATOR_DEPLOY_ID = 'customdeploy_erpts_sl_sca_wps_auth';

    var log = function log(title, details) {
        Log.debug({ title: '[Transact] ' + title, details: details });
    };

    return {
        getValidationServiceUrl: function getValidationServiceUrl() {
            var url = Url.resolveScript({
                scriptId: VALIDATOR_SCRIPT_ID,
                deploymentId: VALIDATOR_DEPLOY_ID,
                returnExternalUrl: true
            });
            return url;
        },

        validator: function validator(dukeId, pin, items, payment, shipping, summary) {
            var url = this.getValidationServiceUrl();

            var headers = {};

            var objSummary = JSON.parse(summary);

            var parameters = JSON.stringify({
                entity: Runtime.getCurrentUser().id,
                dukeId: dukeId,
                pin: pin,
                items: JSON.parse(items || '[]').map(function eachItem(item) {
                    return {
                        line: item.lineId,
                        item: item.itemId,
                        name: item.itemName,
                        rate: item.rate,
                        quantity: item.quantity || 1,
                        discount: item.discount,
                        tax: item.tax,
                        total: item.total
                    };
                }),
                shipping: JSON.parse(shipping),
                discounts: {
                    promoCodes: objSummary.discounttotal,
                    giftCertificates: objSummary.giftcertapplied
                },
                tax: objSummary.taxtotal,
                paymentMethod: JSON.parse(payment).id
            });

            var response;

            try {
                headers['User-Agent-x'] = 'SuiteScript-Call';
                headers['Content-Type'] = 'application/json';

                log('Https.post url', url);
                log('Https.post params', parameters);

                response = Https.post({
                    url: url,
                    body: parameters,
                    headers: headers
                });

                log('Https.post response', response);

                response = response.body ? JSON.parse(response.body.toString()) : {
                    error: 'Empty Response'
                };
            } catch (e) {
                response = {
                    error: e.message || 'Unexpected Error'
                };
                log('error', e);
            }

            return response;
        }
    };
});
