/* globals nlapiResolveURL, nlapiRequestURL */
define('FileUpload.LiveOrder.Model', [
    'FileUpload.Model',

    'LiveOrder.Model',
    'Application'
], function FileUploadLiveOrderModel(
    FileUploadModel,

    LiveOrderModel,
    Application
) {
    'use strict';

    function afterLiveOrderGetUnsafe(model, result) {
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

    Application.on('after:LiveOrder.get', function afterLiveOrderGet(model, result) {
        try {
            afterLiveOrderGetUnsafe(model, result);
        } catch (e) {
            nlapiLogExecution('error', 'Error in after:LiveOrder.get', e);
        }
    });
});
