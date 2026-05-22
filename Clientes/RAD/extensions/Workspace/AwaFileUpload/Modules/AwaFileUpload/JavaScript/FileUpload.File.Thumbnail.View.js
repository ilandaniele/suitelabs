define('FileUpload.File.Thumbnail.View', [
    'fileupload_image_thumbnail.tpl',
    'Backbone',
    'GlobalViews.Confirmation.View',
    'underscore'
], function FileUploadThumbnailView(
    fileuploadimagethumbnailtpl,
    Backbone,
    ConfirmationView,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: fileuploadimagethumbnailtpl,

        events: {
            'click [data-action="fileupload-file-remove-file"]': 'removeFileUpload'
        },

        getContext: function getContext() {
            return {
                isNew: this.options.isNew ? this.options.isNew : false,
                name: this.model.get('name'),
                fileID: this.model.get('internalid')
            };
        },

        removeFileUpload: function removeFileUpload(e) {
            var view;
            var model = this.model;

            e.preventDefault();
            view = new ConfirmationView({
                title: _.translate('Remove File Upload'),
                body: _.translate('Are you sure you want to remove this file?'),
                callBack: this.removeFile,
                className: 'credit-application-modal',
                callBackParameters: {
                    context: this,
                    model: model
                },
                autohide: true
            });
            this.options.application.getLayout().showInModal(view);
        },

        removeFile: function removeFile(options) {
            options.model.destroy();
        }

    });
});
