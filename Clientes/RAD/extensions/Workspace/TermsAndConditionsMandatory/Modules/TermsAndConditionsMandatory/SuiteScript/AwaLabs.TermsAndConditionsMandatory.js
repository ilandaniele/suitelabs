define('AwaLabs.TermsAndConditionsMandatory', [
    'Application',
    'Models.Init',
    'underscore'
], function TermsAndConditionsMandatory(
    Application,
    ModelsInit,
    _
) {
    'use strict';

    var cart = Application.getComponent('Cart');
    cart.on('beforeSubmit', function beforeSubmit() {
        var fieldOrderValue;
        var fieldCustomerValue = ModelsInit.customer.getCustomFields();
        fieldCustomerValue = fieldCustomerValue && _.findWhere(fieldCustomerValue, { name: 'custentity_terms_acknowledge' });
        fieldCustomerValue = fieldCustomerValue && fieldCustomerValue.value;
        if (fieldCustomerValue === 'F') {
            fieldOrderValue = ModelsInit.order.getFieldValues(['agreetermcondition']);
            if (fieldOrderValue.agreetermcondition === 'T') {
                ModelsInit.customer.updateProfile({
                    internalid: nlapiGetUser(),
                    customfields: {
                        'custentity_terms_acknowledge': fieldOrderValue.agreetermcondition
                    }
                });
            }
        }
    });

    Application.on('after:LiveOrder.get', function afterLiveOrderGet(Model, responseData) {
        var fieldCustomerValue = ModelsInit.customer.getCustomFields();
        fieldCustomerValue = fieldCustomerValue && _.findWhere(fieldCustomerValue, { name: 'custentity_terms_acknowledge' });
        fieldCustomerValue = fieldCustomerValue && fieldCustomerValue.value;
        if (fieldCustomerValue) {
            responseData.agreetermcondition = fieldCustomerValue === 'T';
        }
    });
});
