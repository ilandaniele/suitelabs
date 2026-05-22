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
        var transaction_update_helper = {

            SCRIPT_ID: 'customscript_mic_transaction_update',
            DEPLOYMENT_ID: 'customdeploy_mic_transaction_update',

            FINISHED_STATUS: 'Completed',
            ERROR_STATUS: 'Error',
            CANCELLED_STATUS: 'Canceled',
            STARTED_STATUS: 'Started',
            PROCESSING_STATUS: 'Processing',
            PENDING_STATUS: 'Pending',

            updateTransactions: function updateTransactions(){
                try {
                    var currentUser = runtime.getCurrentUser();

                    log.debug({
                        title: 'updateTransactions - updateTransactions',
                        details: currentUser
                    });

                    var transactionUpdateRecord = record.create({
                        type: 'customrecord_mic_transction_update',
                        isDynamic: true
                    });

                    transactionUpdateRecord.setValue({
                        fieldId: 'custrecord_mic_transaction_runner',
                        value: currentUser.id,
                        ignoreFieldChange: true
                    });

                    transactionUpdateRecord.setValue({
                        fieldId: 'custrecord_mic_transaction_update_status',
                        value: 'Pending',
                        ignoreFieldChange: true
                    });

                    // transactionUpdateRecord.setValue({
                    //     fieldId: 'custrecord_mic_matrix_itemid_delimiter',
                    //     value: itemidDelimiter,
                    //     ignoreFieldChange: true
                    // });

                    var transactionUpdateRecordId = transactionUpdateRecord.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    var updatingTask = task.create({taskType: task.TaskType.MAP_REDUCE});
                    updatingTask.scriptId = this.SCRIPT_ID;
                    updatingTask.deploymentId = this.DEPLOYMENT_ID;
                    updatingTask.params = {
                        // custscript_mic_matrix_itemid_delimiter: itemidDelimiter,
                        custscript_mic_transaction_update: transactionUpdateRecordId
                    };
                    var updatingTaskId = updatingTask.submit();

                    log.debug({
                        title: 'updateTransaction - updatingTaskId',
                        details: updatingTaskId
                    });

                } catch(error) {
                    if(error.name !== 'MAP_REDUCE_ALREADY_RUNNING') {
                        throw error;
                    }
                }
            }

        };

        return transaction_update_helper;
    });