/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(
    [
        './Utils/ErrorHandler',

        './Steps/StepSS2.MatrixItemConversion.List',
        './Steps/StepSS2.MatrixItemConversion.Convert',
        './Steps/StepSS2.InventoryAdjustment.List',
        './Steps/StepSS2.InventoryAdjustment.Adjust',
        './Steps/StepSS2.TransactionUpdate.List',
        './Steps/StepSS2.TransactionUpdate.Update',

        'N/error',
        'N/runtime',
        'N/log'
    ], function(
        error_handler,

        MatrixItemConversionList,
        MatrixItemConversionConvert,
        InventoryAdjustmentList,
        InventoryAdjustmentAdjust,
        TransactionUpdateList,
        TransactionUpdateUpdate,

        error_module,
        runtime,
        log
    ) {
        var request_handler = {

            services: {
                'ItemConversions': MatrixItemConversionList,    // List Matrix Item Conversion
                'ConvertMatrix': MatrixItemConversionConvert,   // Convert Non-Matrix Item to Matrix Item
                'InventoryAdjustments': InventoryAdjustmentList, // List Inventory Adjustment Result
                'AdjustInventory': InventoryAdjustmentAdjust,    // Do adjustment job
                'TransactionUpdates': TransactionUpdateList, // List Transaction Update Result
                'UpdateTransactions': TransactionUpdateUpdate    // Do update job
            },
            onRequest: function onRequest(context) {
                try {
                    var script = runtime.getCurrentScript();
                    var service_name = context.request.parameters.service_name || script.getParameter({name: 'custscript_mic_service_name'});

                    log.debug('MIC context.request', JSON.stringify(context.request));

                    if(!service_name) {
                        throw error_module.create({
                            name: 'SERVICE_ERROR',
                            message: 'Service name is required'
                        });
                    }
                    var service = this.services[service_name];
                    if(!service) {
                        throw error_module.create({
                            name: 'SERVICE_ERROR',
                            message: 'Service ' + service_name + ' not found'
                        });
                    }
                    var result = service.onRequest(context);
                    return result;
                } catch(error) {
                    log.error({
                        title: 'SERVICES ENTRYPOINT ERROR',
                        details: error.stack
                    });
                    var response = error_handler.handleError(error);
                    context.response.write(JSON.stringify(response));
                }
            }

        };

        return request_handler;
    });