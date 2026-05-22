define('AwaLabs.OrderedBy', [
    'SC.Models.Init',
    'Application'
], function AwaLabsOrderedBy(
    ModelsInit,
    Application
) {
    'use strict';

    Application.on('after:Quote.update', function afterQuoteUpdate(model) {
        var context = ModelsInit.context;
        var createdBy = context.getContact();

        if (!!model.record && !!createdBy) {
            model.record.setFieldValue('custbody_created_by_id', JSON.stringify(createdBy));
        }
    });

    Application.on('before:LiveOrder.update', function afterLiveOrderUpdate(model, data) {
        var context = ModelsInit.context;
        var createdBy = context.getContact();

        if (!!createdBy && !!data && !!data.options) {
            data.options.custbody_created_by_id = JSON.stringify(createdBy);
        }
    });
});
