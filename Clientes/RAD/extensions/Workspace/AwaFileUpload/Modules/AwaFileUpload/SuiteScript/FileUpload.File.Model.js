define('FileUpload.File.Model', [
    'SC.Model'
], function FileUploadFileModel(
    SCModel
) {
    'use strict';

    return SCModel.extend({
        name: 'FileUpload.File.Model',

        suitelet: {
            script: 'customscript_file_upload_suitelet',
            deployment: 'customdeploy_file_upload_suitelet_deploy'
        },

        getFileUploadUrl: function getFileUploadUrl() {
            return nlapiResolveURL('SUITELET', this.suitelet.script, this.suitelet.deployment, true);
        }
    });
});
