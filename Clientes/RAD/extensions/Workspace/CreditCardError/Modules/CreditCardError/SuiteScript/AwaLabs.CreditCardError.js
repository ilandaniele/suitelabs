define('AwaLabs.CreditCardError', [
    'LiveOrder.Model',
    'Configuration',
    'underscore'
], function AwaLabsCreditCardError(
    LiveOrderModel,
    Configuration,
    _
) {
    'use strict';

    _.extend(LiveOrderModel, {
        submit: _.wrap(LiveOrderModel.submit, function onSubmit(fn) {
            var error;
            try {
                return fn.apply(this, _.toArray(arguments).slice(1));
            } catch (e) {
                if (e && e.code && e.code === 'ERR_WS_CC_AUTH' && Configuration.get('creditCardCVVError')) {
                    error = {
                        code: e.code,
                        message: Configuration.get('creditCardCVVError') || '',
                        status: '500'
                    };
                    throw error;
                }
                nlapiLogExecution('ERROR', 'order submit error', e);
                throw e;
            }
        })
    });
});
