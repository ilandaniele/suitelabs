define('FileUpload.File.Collection', [
    'Backbone',
    'FileUpload.File.Model',
    'underscore',
    'Utils'
], function FileUploadFileCollection(
    Backbone,
    FileUploadFileModel
) {
    'use strict';

    return Backbone.Collection.extend({
        url: function url() {
            var urlSuitelet = SC.ENVIRONMENT.published.file_upload_suitelet_url;
            var urlObject = new URL(urlSuitelet);
            urlObject.hostname = Backbone.history.location.host;
            return urlObject.toString();
        },

        model: FileUploadFileModel
    });
});
