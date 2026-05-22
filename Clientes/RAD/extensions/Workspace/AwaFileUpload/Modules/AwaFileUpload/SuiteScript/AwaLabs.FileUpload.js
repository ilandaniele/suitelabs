define('AwaLabs.FileUpload', [
    'Configuration',
    'FileUpload.File.Model'
], function AwaLabsFileUpload(
    Configuration
) {
    Configuration.get().publish = Configuration.get().publish || [];
    Configuration.get().publish.push({
        key: 'file_upload_suitelet_url',
        model: 'FileUpload.File.Model',
        call: 'getFileUploadUrl'
    });
});
