/* globals getExtensionAssetsPath */
define('FileUpload.PDP.View', [
    'SCView',

    'file_upload_pdp.tpl',

    'Cart.AddToCart.Button.View', // WARNING: This code is not SC Compliant, but this is SCA

    'Utils',
    'jQuery',
    'underscore'
], function FileUploadPDPViewModule(
    SCViewComponent,

    template,

    CartAddToCartButtonView,

    Utils,
    jQuery,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FileUploadPDPView(options) {
        var self = this;
        SCView.call(this);

        this.pdp = options.pdp;
        this.config = options.config;
        this.options = options || {};
        this.template = template;

        this.attributes = {
            id: 'FileUploadPDPView',
            'class': 'fileupload-pdp-view'
        };

        /**
         * WARNING: This code is not SC Compliant, but this is SCA
         */
        CartAddToCartButtonView.prototype.addToCart = _(CartAddToCartButtonView.prototype.addToCart).wrap(function addToCart(fn, e) {
            var context = this;
            var args = _(arguments).toArray().slice(1);
            var $addToCartButton = jQuery(e.target);

            $addToCartButton.attr('disabled', true);

            self.uploadFile(this.model).then(
                function success() {
                    fn.apply(context, args);
                },
                function error(message) {
                    self.pdp.showMessage({
                        message: message,
                        type: 'error',
                        selector: 'Product.Options',
                        timeout: 10000
                    });

                    $addToCartButton.attr('disabled', false);
                }
            );

            return false;
        });
    }

    // Inherit parent instance methods.
    FileUploadPDPView.prototype = Object.create(SCView.prototype);

    // Restore the constuctor.
    FileUploadPDPView.prototype.constructor = FileUploadPDPView;

    FileUploadPDPView.prototype.getEvents = function getEvents() {
        return {
            'change [name="pdpUploadFile"]': 'toggleResetButton',
            'reset form': 'hideResetButton',
            'click [data-action="reset-current-file"]': 'resetCurrentFile'
        };
    };

    FileUploadPDPView.prototype.toggleResetButton = function toggleResetButton() {
        var fileHasValue = Boolean(this.$('[name="pdpUploadFile"]').val());
        var $removeButton = this.$('[name="pdpUploadFileRemove"]');

        if (fileHasValue) {
            $removeButton.removeClass('hide');
        } else {
            $removeButton.addClass('hide');
        }
    };

    FileUploadPDPView.prototype.hideResetButton = function hideResetButton() {
        this.$('[name="pdpUploadFileRemove"]').addClass('hide');
    };

    FileUploadPDPView.prototype.uploadFile = function uploadFile(productModel) {
        var deferred = jQuery.Deferred();
        var $customFileForm = this.$('.custom-file-form');
        var $pdpUploadFileInput = $customFileForm.find('[name="pdpUploadFile"]');
        var lineHasCustomFile = $customFileForm.length && $pdpUploadFileInput.val();
        var formData;
        var errorMessage = _('ERROR_FILE_NOT_UPLOADED').translate();

        var itemInfo = this.pdp.getItemInfo();
        var displayFileUploadForm = itemInfo && itemInfo.item && itemInfo.item.custitem_has_file_upload;

        if (displayFileUploadForm) {
            if (!lineHasCustomFile) {
                return jQuery.Deferred().reject(errorMessage);
            }
        } else if (!lineHasCustomFile) {
            return jQuery.Deferred().resolve();
        }


        formData = new FormData($customFileForm[0]);

        jQuery.ajax({
            url: Utils.getAbsoluteUrl(
                getExtensionAssetsPath('Modules/Main/SuiteScript2/FileUpload.Service.ss'),
                true
            ),
            data: formData,
            dataType: 'json',
            type: 'POST',
            contentType: false,
            processData: false,
            beforeSend: function beforeSend(jqXHR) {
                jqXHR.setRequestHeader('X-SC-Touchpoint', SC.ENVIRONMENT.SCTouchpoint);
            }
        }).then(function afterUploadingFile(data) {
            var fileIdOption;

            if (data.error) {
                deferred.reject('Error uploading custom file' + (data.details ? ': ' + data.details : ''));
                return;
            }

            fileIdOption = productModel.get('options').findWhere({ cartOptionId: 'custcol_ns_file_id' });

            if (data.fileId && fileIdOption) {
                fileIdOption.set('value', {
                    internalid: data.fileId,
                    label: data.fileId
                });
            }

            deferred.resolve();
        });

        return deferred.promise();
    };

    FileUploadPDPView.prototype.resetCurrentFile = function resetCurrentFile() {
        var self = this;

        jQuery.when(
            this.pdp.setOption('custcol_ns_file_id', null),
            this.pdp.setOption('custcol_ns_file', null)
        ).then(function afterUnsetFile() {
            self.render();
        });
    };

    FileUploadPDPView.prototype.fetchCurrentFile = function fetchCurrentFile(fileId) {
        var url = Utils.getAbsoluteUrl(
            getExtensionAssetsPath('Modules/Main/SuiteScript2/FileUpload.Service.ss'),
            true
        );

        return jQuery.ajax({
            url: url,
            data: { id: fileId },
            dataType: 'json'
        });
    };

    FileUploadPDPView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        var itemInfo = this.pdp.getItemInfo();
        var options = itemInfo ? itemInfo.options : [];
        var fileUploadOption = _(options).findWhere({ cartOptionId: 'custcol_ns_file_id' });
        var currentFileId = fileUploadOption && fileUploadOption.value && fileUploadOption.value.internalid;

        if (currentFileId) {
            this.fetchCurrentFile(currentFileId).then(function afterFetchCurrentFile(data) {
                if (data && data.name) {
                    self.currentFile = data.name;
                    self.currentFileUrl = data.url;
                    SCView.prototype.render.apply(self, args);
                }
            });
        }

        SCView.prototype.render.apply(this, arguments);
    };

    FileUploadPDPView.prototype.getContext = function getContext() {
        var itemInfo = this.pdp.getItemInfo();
        var options = itemInfo ? itemInfo.options : [];
        var displayFileUploadForm = itemInfo && itemInfo.item && itemInfo.item.custitem_has_file_upload;
        var fileUploadOption = _(options).findWhere({ cartOptionId: 'custcol_ns_file_id' });
        var currentFileId = fileUploadOption && fileUploadOption.value && fileUploadOption.value.internalid;
        var displayFileInput = !currentFileId;
        var currentFile = this.currentFile || Utils.translate('Loading...');
        var domain = 'https://' + SC.ENVIRONMENT.shoppingDomain;
        var currentFileUrl = this.currentFileUrl ? (domain + this.currentFileUrl) : '';

        return {
            titleText: this.config.title,
            fileInformationText: this.config.fileInformation,

            displayFileUploadForm: displayFileUploadForm, // displayFileUploadForm,
            displayFileInput: displayFileInput,

            currentFileId: currentFileId,
            currentFile: currentFile,
            currentFileUrl: currentFileUrl
        };
    };

    // Return the AMD constructor.
    return FileUploadPDPView;
});
