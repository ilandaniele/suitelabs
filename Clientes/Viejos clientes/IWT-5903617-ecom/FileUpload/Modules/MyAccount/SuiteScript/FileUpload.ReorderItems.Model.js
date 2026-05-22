/* globals nlapiResolveURL, nlapiRequestURL */
define('FileUpload.ReorderItems.Model', [
    'FileUpload.Model',

    'LiveOrder.Model',
    'Application'
], function FileUploadReorderItemsModel(
    FileUploadModel,

    LiveOrderModel,
    Application
) {
    'use strict';

    function afterOrderItemSearchUnsafe(model, result) {
        var lines = result ? result.records : [];
        var lineFileIds = FileUploadModel.getFileIdsFromLines(lines);
        var filesByFileIds = FileUploadModel.getFilesFromFileIds(lineFileIds);

        lines.forEach(function forEachLine(line) {
            var options = line.options ? LiveOrderModel.parseLineOptionsToCommerceAPI(line.options) : {};
            var fileId = options && options.custcol_ns_file_id;

            if (fileId && filesByFileIds && filesByFileIds[fileId]) {
                line.file = filesByFileIds[fileId];
            }
        });
    }

    Application.on('after:OrderItem.search', function afterOrderItemSearch(model, result) {
        try {
            afterOrderItemSearchUnsafe(model, result);
        } catch (e) {
            nlapiLogExecution('error', 'Error in after:OrderItem.search', e);
        }
    });
});
