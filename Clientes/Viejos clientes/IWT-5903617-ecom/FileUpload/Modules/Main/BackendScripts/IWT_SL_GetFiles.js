/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define([
    '../SuiteScript2/FileUpload.Model.js'
],
function GetFiles(
    fileUploadModel
) {
    function onRequest(context) {
        var output;

        if (context.request.parameters.id) {
            output = fileUploadModel.get(context.request.parameters.id);
        } else if (context.request.parameters.ids) {
            output = fileUploadModel.list(context.request.parameters.ids.split(','));
        }

        context.response.write(JSON.stringify(output));
    }

    return {
        onRequest: onRequest
    };
});
