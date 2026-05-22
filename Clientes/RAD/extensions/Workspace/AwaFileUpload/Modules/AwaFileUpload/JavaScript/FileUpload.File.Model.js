define('FileUpload.File.Model', [
    'Backbone'
], function FileUploadFileModel(
    Backbone
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: function getUrlRoot() {
            var url = SC.ENVIRONMENT.published.file_upload_suitelet_url;
            var urlObject = new URL(url);
            urlObject.hostname = Backbone.history.location.host;
            return urlObject.toString();
        }
    });
});
