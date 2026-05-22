define('FileUpload.File.View', [
    'fileupload.tpl',
    'FileUpload.File.Collection',
    'FileUpload.File.Model',
    'FileUpload.File.Thumbnail.View',
    'Backbone.CollectionView',
    'Backbone',
    'underscore',
    'jQuery'
], function FileUploadFileView(
    fileuploadtpl,
    FileUploadFileCollection,
    FileUploadFileModel,
    FileUploadFileThumbnailView,
    BackboneCollectionView,
    Backbone,
    _,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: fileuploadtpl,

        events: {
            'change [name="fileupload-uploader"]': 'uploadFile'
        },

        childViews: {
            'FileUpload.FileThumbnail': function fnFileUploadFileThumbnailView() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: FileUploadFileThumbnailView,
                    viewsPerRow: 5,
                    childViewOptions: {
                        application: this.application,
                        isNew: true
                    }
                });
            }
        },

        initialize: function initialize(options) {
            var self = this;
            this.collection = new FileUploadFileCollection();
            this.model = options.model;
            this.application = options.application;
            this.maxFiles = options.maxFiles || 1;

            this.collection.on('add sync remove', function reRender() {
                self.render();
                self.model.set('files', self.collection.map(function setAttr(model) {
                    return model.attributes;
                }));
            });
        },

        uploadFile: function uploadFile(e) {
            var files = e.currentTarget.files;
            var File;
            var formData;
            var self = this;
            jQuery('#loading_file').toggleClass('hidden');
            jQuery(e.currentTarget).attr('disabled', true);
            if (files && files.length > self.maxFiles) {
                jQuery('#loading_file').toggleClass('hidden');
                self.showError(_(self.maxFiles + ' file(s) limit has been exceeded').translate());
            } else {
                _.each(files, function eachFile(file) {
                    if (self.collection.length >= self.maxFiles) {
                        jQuery('#loading_file').toggleClass('hidden');
                        self.showError(_(self.maxFiles + ' file(s) limit has been exceeded').translate());
                    } else {
                        File = new FileUploadFileModel(file);
                        formData = new FormData();
                        formData.append('file', file);

                        File.save(file, {
                            processData: false,
                            contentType: false,
                            cache: false,
                            data: formData,
                            beforeSend: function beforeSend() {}
                        }).done(function caseFileSaveDone(data) {
                            jQuery(e.currentTarget).attr('disabled', false);
                            jQuery('#loading_file').toggleClass('hidden');
                            if (self.collection.length <= 9) {
                                self.collection.add(new FileUploadFileModel(_.extend(data, { internalid: data.internalid })));
                            } else {
                                self.showError(_('10 files limit has been exceeded').translate());
                            }
                        });
                    }
                });
            }
        }
    });
});
