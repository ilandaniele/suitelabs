/* globals nlapiResolveURL, nlapiRequestURL */
define('FileUpload.OrderHistory.Model', [
    'FileUpload.Model',

    'LiveOrder.Model',
    'Application'
], function FileUploadOrderHistoryModel(
    FileUploadModel,

    LiveOrderModel,
    Application
) {
    'use strict';

    function afterOrderHistoryGetUnsafe(model, result) {
        var lines = result ? result.lines : [];
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

    Application.on('after:OrderHistory.get', function afterOrderHistoryGet(model, result) {
        try {
            afterOrderHistoryGetUnsafe(model, result);
        } catch (e) {
            nlapiLogExecution('error', 'Error in after:OrderHistory.get', e);
        }
    });
});
