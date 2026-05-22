define('FileUpload.Model', [
    'LiveOrder.Model'
], function FileUploadModel(
    LiveOrderModel
) {
    'use strict';

    var domain = request.getURL().split('/').slice(0, 3).join('/');
    var headers = request.getAllHeaders();
    var suiteletUrl = domain + nlapiResolveURL(
        'SUITELET',
        'customscript_sl_get_files',
        'customdeploy_sl_get_files'
    );

    return {
        getFileIdsFromLines: function getFileIdsFromLines(lines) {
            var lineFileIds = [];

            lines.forEach(function forEachLine(line) {
                var options = line.options ? LiveOrderModel.parseLineOptionsToCommerceAPI(line.options) : {};
                var fileId = options && options.custcol_ns_file_id;

                if (fileId) {
                    lineFileIds.push(fileId);
                }
            });

            return lineFileIds;
        },

        getFilesFromFileIds: function getFilesFromFileIds(fileIds) {
            var suiteletResponse;
            var suiteletResponseBodyRaw;
            var suiteletResponseBody = {};

            if (fileIds.length) {
                suiteletResponse = nlapiRequestURL(
                    suiteletUrl + '&ids=' + fileIds.join(','),
                    null,
                    headers
                );
                suiteletResponseBodyRaw = suiteletResponse && suiteletResponse.getBody();
                suiteletResponseBody = JSON.parse(suiteletResponseBodyRaw || '{}');
            }

            return suiteletResponseBody;
        }
    };
});
