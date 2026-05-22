/* globals getExtensionAssetsPath */
define('CSVToCart.View', [
    'SCView',
    'section-csvtocart.tpl',
    'jQuery',
    'underscore',
    'Utils'
], function CSVToCartViewModule(
    SCViewComponent,
    CSVToCartTpl,
    jQuery,
    _,
    Utils
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    var CSVToCartView = function CSVToCartView(options) {
        SCView.call(this);

        this.options = options || {};
        this.template = CSVToCartTpl;
        this.model = options.model;
        this.attributes = {
            'id': 'CSVToCartView',
            'class': 'CSVToCartview'
        };
        this.results = [];
    };

    CSVToCartView.prototype = Object.create(SCView.prototype);

    CSVToCartView.prototype.constructor = CSVToCartView;

    CSVToCartView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    CSVToCartView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="import"]': 'importCSV'
        };
    };

    CSVToCartView.prototype.importCSV = function importCSV() {
        var self = this;
        var deferred = jQuery.Deferred();
        var $customFileForm = this.$('.custom-file-form');
        var $uploadFileInput = $customFileForm.find('[name="uploadFile"]');
        var fileIsImported = $customFileForm.length && $uploadFileInput.val();

        var formData;

        var errorMessage = _('ERROR_FILE_NOT_UPLOADED').translate();

        if (!fileIsImported) {
            return jQuery.Deferred().reject(errorMessage);
        }

        formData = new FormData($customFileForm[0]);

        jQuery.ajax({
            url: Utils.getAbsoluteUrl(
                // eslint-disable-next-line no-undef
                getExtensionAssetsPath('services/CSVToCart.Service.ss'),
                false
            ),
            data: formData,
            dataType: 'json',
            type: 'POST',
            contentType: false,
            processData: false,
            beforeSend: function beforeSend(jqXHR) {
                jqXHR.setRequestHeader('X-SC-Touchpoint', SC.ENVIRONMENT.SCTouchpoint);
            },
            error: function error(message) {
                self.model.set({
                    rowsAffected: false,
                    processed: 0,
                    added: 0,
                    skipped: 0,
                    error: _('Error ' + message.responseJSON.errorStatusCode + ': ' + message.responseJSON.errorMessage).translate()
                });
                self.render();
                deferred.resolve();
            }
        }).then(function success(data) {
            self.model.set({
                rowsAffected: true,
                processed: data.processed,
                added: data.added,
                skipped: data.skipped,
                error: data.error
            });
            self.options.cart.clearEstimateShipping().then(function lines() {
                self.render();
                deferred.resolve();
            });
        });

        return deferred.promise();
    };

    CSVToCartView.prototype.getContext = function getContext() {
        return {
            rowsAffected: this.model.get('rowsAffected'),
            processed: this.model.get('processed'),
            added: this.model.get('added'),
            skipped: this.model.get('skipped'),
            error: this.model.get('error')
        };
    };

    return CSVToCartView;
});
