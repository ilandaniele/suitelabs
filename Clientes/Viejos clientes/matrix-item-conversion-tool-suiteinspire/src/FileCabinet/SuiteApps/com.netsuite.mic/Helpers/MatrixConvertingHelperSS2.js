/**
 *@NApiVersion 2.x
 */
define(
    [
        'N/search',
        'N/error',
        'N/record',
        'N/task',
        'N/runtime',
        '../third_parties/underscore.js'
    ],function(
        search,
        error,
        record,
        task,
        runtime,
        _
    )
    {
        var matrix_converting_helper = {

            SCRIPT_ID: 'customscript_mic_item_convert',
            DEPLOYMENT_ID: 'customdeploy_mic_item_convert',

            FINISHED_STATUS: 'Completed',
            ERROR_STATUS: 'Error',
            CANCELLED_STATUS: 'Canceled',
            STARTED_STATUS: 'Started',
            PROCESSING_STATUS: 'Processing',
            PENDING_STATUS: 'Pending',

            convertItems: function convertItems(itemidDelimiter){
                try {
                    var currentUser = runtime.getCurrentUser();

                    log.debug({
                        title: 'convertItems - convertItems',
                        details: currentUser
                    });

                    var itemConvertingRecord = record.create({
                        type: 'customrecord_mic_matrix_conversion',
                        isDynamic: true
                    });

                    itemConvertingRecord.setValue({
                        fieldId: 'custrecord_mic_matrix_runner',
                        value: currentUser.id,
                        ignoreFieldChange: true
                    });

                    itemConvertingRecord.setValue({
                        fieldId: 'custrecord_mic_matrix_convert_status',
                        value: 'Pending',
                        ignoreFieldChange: true
                    });

                    itemConvertingRecord.setValue({
                        fieldId: 'custrecord_mic_matrix_itemid_delimiter',
                        value: itemidDelimiter,
                        ignoreFieldChange: true
                    });

                    var itemConvertingRecordId = itemConvertingRecord.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    var convertingTask = task.create({taskType: task.TaskType.MAP_REDUCE});
                    convertingTask.scriptId = this.SCRIPT_ID;
                    convertingTask.deploymentId = this.DEPLOYMENT_ID;
                    convertingTask.params = {
                        custscript_mic_matrix_itemid_delimiter: itemidDelimiter,
                        custscript_mic_matrix_item_conversion: itemConvertingRecordId
                    };
                    var convertingTaskId = convertingTask.submit();

                    log.debug({
                        title: 'convertItem - convertingTaskId',
                        details: convertingTaskId
                    });

                } catch(error) {
                    if(error.name !== 'MAP_REDUCE_ALREADY_RUNNING') {
                        throw error;
                    }
                }
            }

        };

        return matrix_converting_helper;
    });