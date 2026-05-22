define('ZipCode.View', [
    'pacejetintegrationwithzipcode_zip_code.tpl',
    'SCFormView'
], function ZipCodeViewModule(
    NSeCommWebsiteCustomizationsZipCodeTpl,
    SCFormViewComponent) {
    'use strict';

    var SCFormView = SCFormViewComponent.SCFormView;

    function ZipCodeView(options) {
        var self = this;
        this.model = options.PacejetModel;
        SCFormView.call(this, options.PacejetModel);
        this.options = options || {};

        this.template = NSeCommWebsiteCustomizationsZipCodeTpl;

        this.options.PacejetModel.fetch({
            data: {
                action: 'getZipCode'
            }
        }).done(function pacejetPromise() {
            self.zipCode = self.options.PacejetModel.get('zipCode');
            self.render();
        });
    }

    ZipCodeView.prototype = Object.create(SCFormView.prototype);
    ZipCodeView.prototype.constructor = ZipCodeView;
    ZipCodeView.prototype.getContext = function getContext() {
        return {
            zipCode: this.zipCode,
            show: Boolean(this.zipCode)
        };
    };

    ZipCodeView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        SCFormView.prototype.render.apply(self, args);
        this.$('.pop-up').hide();
    };

    ZipCodeView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="open"]': 'openHandler',
            'click [data-action="close"]': 'closeHandler',
            'submit form': 'saveForm',
            'blur [name="zipcode"]': 'onFormFieldChange'
        };
    };

    ZipCodeView.prototype.saveForm = function saveForm(e) {
        var promise = {};
        var self = this;
        e.preventDefault();


        this.model.set('action', 'saveZipCode');
        promise = SCFormView.prototype.saveForm.call(this, e);

        if (promise) {
            promise.fail(function fail(jqXhr) {
                jqXhr.preventDefault = true;
            }).done(function done() {
                self.removeErrorMessage('zipcode');
                self.zipCode = self.options.PacejetModel.get('zipCode');
            }).always(function always() {
                self.render();
            });
        }
        return promise;
    };

    ZipCodeView.prototype.getFormValues = function getFormValues($savingForm) {
        var output = {};
        var formValues = $savingForm.serializeObject();
        if (formValues.zipcode &&
            formValues.zipcode !== '' &&
            typeof formValues.zipcode === 'string') {
            output = {
                zipcode: formValues.zipcode
            };
        } else {
            output = {
                errorCode: 'FormValidation',
                errors: {
                    zipcode: 'This field is required'
                }
            };
        }
        return output;
    };

    ZipCodeView.prototype.getFormFieldValue = function getFormFieldValue(changedInput) {
        var newVal = changedInput.val();
        var fieldName = changedInput.attr('name');
        var output = {};
        if (fieldName === 'zipcode' && typeof newVal === 'string' && newVal !== '') {
            output = {
                name: fieldName,
                value: newVal
            };
        } else {
            output = {
                name: fieldName || '',
                error: 'This field is required'
            };
        }
        return output;
    };

    ZipCodeView.prototype.openHandler = function openHandler() {
        this.$('.pop-up').show();
    };

    ZipCodeView.prototype.closeHandler = function closeHandler() {
        this.$('.pop-up').hide();
    };

    return ZipCodeView;
});
