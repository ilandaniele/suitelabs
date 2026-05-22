define('FileUpload.Cart.View', [
    'SCView',

    'file_upload_cart.tpl'
], function FileUploadCartViewModule(
    SCViewComponent,

    template
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FileUploadCartView(options) {
        SCView.call(this);

        this.parentView = true;
        this.config = options.config;
        this.options = options || {};
        this.template = template;

        this.attributes = {
            id: 'FileUploadCartView',
            'class': 'fileupload-cart-view'
        };
    }

    // Inherit parent instance methods.
    FileUploadCartView.prototype = Object.create(SCView.prototype);

    // Restore the constuctor.
    FileUploadCartView.prototype.constructor = FileUploadCartView;

    FileUploadCartView.prototype.render = function render() {
        var model = this.parentView.model;
        var fileIdOption = model.getOption('custcol_ns_file_id');
        var file = model.get('file');

        if (fileIdOption && file) {
            // display this customization
            SCView.prototype.render.apply(this, arguments);
        }
    };

    FileUploadCartView.prototype.getContext = function getContext() {
        var model = this.parentView.model;
        var file = model.get('file');
        var fileName = file.name;
        var domain = 'https://' + SC.ENVIRONMENT.shoppingDomain;
        var fileUrl = domain + file.url;

        return {
            fileUrl: fileUrl,
            fileName: fileName,
            title: this.config.title
        };
    };

    // Return the AMD constructor.
    return FileUploadCartView;
});
