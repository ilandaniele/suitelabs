/**
*@NApiVersion 2.x
*@NScriptType UserEventScript
*/
define([
    'N/file',
    'N/record',
    'N/runtime'
], function MoveFiles(
    nFile,
    record,
    runtime
) {
    var script = runtime.getCurrentScript();
    var FINAL_FOLDER_ID = script.getParameter({
        name: 'custscript_final_folder_id'
    });

    function attachFileToSalesOrder(fileId, salesOrderId) {
        try {
            record.attach({
                record: {
                    type: 'file',
                    id: fileId
                },
                to: {
                    type: 'salesorder',
                    id: salesOrderId
                }
            });
        } catch (e) {
            log.error({
                title: 'attachFileToSalesOrder',
                details: e
            });
        }
    }

    function moveFileToFolder(fileId, folderId) {
        var fileObject;

        try {
            fileObject = nFile.load(fileId);

            fileObject.folder = folderId;
            fileObject.save();
        } catch (e) {
            log.error({
                title: 'moveFileToFolder',
                details: e
            });
        }
    }

    function fileExists(fileId) {
        var exists = true;

        try {
            nFile.load(fileId);
        } catch (e) {
            exists = false;
            log.error({
                title: 'fileExists',
                details: e
            });
        }

        return exists;
    }

    function beforeSubmit(context) {
        var salesOrderRecord;
        var itemLinesCount;
        var i;
        var fileId;

        if (context.type !== context.UserEventType.CREATE) {
            return;
        }

        salesOrderRecord = context.newRecord;
        itemLinesCount = salesOrderRecord.getLineCount({
            sublistId: 'item'
        });

        for (i = 0; i < itemLinesCount; i++) {
            fileId = salesOrderRecord.getSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_ns_file_id',
                line: i
            });

            if (fileId) {
                if (fileExists(fileId)) {
                    salesOrderRecord.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_ns_file',
                        line: i,
                        value: fileId
                    });
                } else {
                    throw 'There is an error with a custom folder in your order. Please, verify and re-upload your custom files';
                }
            }
        }
    }

    function afterSubmit(context) {
        var salesOrderRecord;
        var itemLinesCount;
        var i;
        var file;

        if (context.type !== context.UserEventType.CREATE) {
            return;
        }

        salesOrderRecord = context.newRecord;
        itemLinesCount = salesOrderRecord.getLineCount({
            sublistId: 'item'
        });

        for (i = 0; i < itemLinesCount; i++) {
            file = salesOrderRecord.getSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_ns_file',
                line: i
            });

            if (file) {
                moveFileToFolder(file, FINAL_FOLDER_ID);
                attachFileToSalesOrder(file, salesOrderRecord.id);
            }
        }
    }

    return {
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
});
