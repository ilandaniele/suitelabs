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
        'N/format',
        'N/url',
        '../third_parties/underscore.js'
    ],function(
        search,
        error,
        record,
        task,
        runtime,
        format,
        url,
        _
    )
    {
        var inventory_adjustment_helper = {

            SCRIPT_ID: 'customscript_mic_inventory_adj_mapreduce',
            DEPLOYMENT_ID: 'customdeploy_mic_inventory_adj_mapreduce',

            FINISHED_STATUS: 'Completed',
            ERROR_STATUS: 'Error',
            CANCELLED_STATUS: 'Canceled',
            PROCESSING_STATUS: 'Processing',
            PENDING_STATUS: 'Pending',

            adjustInventory: function (adjustmentAccount, postingDate, postingPeriod, subsidiary){
                try {
                    var currentUser = runtime.getCurrentUser();

                    var micInventoryAdjustmentRecord = record.create({
                        type: 'customrecord_mic_inventory_adjustment',
                        isDynamic: true
                    });

                    micInventoryAdjustmentRecord.setValue({
                        fieldId: 'custrecord_mic_inventory_adjst_account',
                        value: adjustmentAccount,
                        ignoreFieldChange: true
                    });
                    micInventoryAdjustmentRecord.setValue({
                        fieldId: 'custrecord_mic_inventory_adjst_date',
                        value:  new Date(postingDate),
                        ignoreFieldChange: true
                    });
                    micInventoryAdjustmentRecord.setValue({
                        fieldId: 'custrecord_mic_inventory_adjst_period',
                        value: postingPeriod,
                        ignoreFieldChange: true
                    });

                    micInventoryAdjustmentRecord.setValue({
                        fieldId: 'custrecord_mic_inventory_adjst_runner',
                        value: currentUser.id,
                        ignoreFieldChange: true
                    });

                    micInventoryAdjustmentRecord.setValue({
                        fieldId: 'custrecord_mic_inventory_adjst_status',
                        value: 'Pending',
                        ignoreFieldChange: true
                    });

                    subsidiary && micInventoryAdjustmentRecord.setValue({
                        fieldId: 'custrecord_mic_inventory_adjst_sub',
                        value: subsidiary,
                        ignoreFieldChange: true
                    });

                    var micInventoryAdjustment = micInventoryAdjustmentRecord.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    var adjustTask = task.create({taskType: task.TaskType.MAP_REDUCE});
                    adjustTask.scriptId = this.SCRIPT_ID;
                    adjustTask.deploymentId = this.DEPLOYMENT_ID;
                    adjustTask.params = {
                        custscript_date: postingDate,
                        custscript_posting_period: postingPeriod,
                        custscript_account: adjustmentAccount,
                        custscript_mic_inventory_adjustment_rec: micInventoryAdjustment,
                        custscript_mic_inventory_adjustment_sub: subsidiary
                    };
                    var adjustTaskId = adjustTask.submit();

                    log.debug({
                        title: 'InventoryAdjustmentHelperSS2 - adjustTask',
                        details: adjustTaskId
                    });

                } catch(error) {
                    if(error.name !== 'MAP_REDUCE_ALREADY_RUNNING') {
                        throw error;
                    }
                }
            }

        };

        return inventory_adjustment_helper;
    });