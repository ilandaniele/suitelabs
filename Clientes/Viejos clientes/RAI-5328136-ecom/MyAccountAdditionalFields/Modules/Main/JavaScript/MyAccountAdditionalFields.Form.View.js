/* globals getExtensionAssetsPath */
define('MyAccountAdditionalFields.Form.View', [
    'SCFormView',
    'additional_fields_form.tpl',
    'jQuery',
    'underscore'
], function MyAccountAdditionalFieldsFormView(
    SCFormViewComponent,
    MyAccountAdditionalFieldsTpl,
    jQuery,
    _
) {
    var SCFormView = SCFormViewComponent.SCFormView;
    function MyAccountAdditionalFieldsView(options) {
        SCFormView.call(this, options.model);
        this.template = MyAccountAdditionalFieldsTpl;
        this.model = options.model;
    }

    MyAccountAdditionalFieldsView.prototype = Object.create(SCFormView.prototype);

    MyAccountAdditionalFieldsView.prototype.constructor = MyAccountAdditionalFieldsView;

    MyAccountAdditionalFieldsView.prototype.getEvents = function getEvents() {
        return {
            'submit form': 'submitForm'
        };
    };

    MyAccountAdditionalFieldsView.prototype.submitForm = function submitForm(e) {
        var promise = {};
        var self = this;
        var url;
        var redirect;
        e.preventDefault();


        this.model.set('action', 'updateLead');
        promise = SCFormView.prototype.saveForm.call(this, e);

        if (promise) {
            promise.fail(function fail(jqXhr) {
                jqXhr.preventDefault = true;
            }).done(function done(data) {
                if (data.error) {
                    self.successMessage = false;
                    self.errorMessage = data.error;
                } else {
                    self.successMessage = true;
                    self.errorMessage = '';
                }
            }).always(function always() {
                self.render();
                if (self.successMessage) {
                    url = window.location.href;
                    redirect = url.substring(0, url.lastIndexOf('/'));
                    window.location.href = redirect;
                    window.location.reload();
                }
            });
        }
        return promise;
    };

    MyAccountAdditionalFieldsView.prototype.validateEmail = function validateEmail(email) {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    MyAccountAdditionalFieldsView.prototype.getFormValues = function getFormValues($savingForm) {
        var formValues = $savingForm.serializeObject();
        var category = jQuery('.category-select').val();
        var thirdPartyCarrier = jQuery('.third-party-carrier-select').val();
        var errors = {};

        if (!(formValues.invoiceEmail && typeof formValues.invoiceEmail === 'string' && this.validateEmail(formValues.invoiceEmail))) {
            errors.invoiceEmail = 'Enter a valid Invoice Email address';
        }

        if (!(formValues.practiceManager && typeof formValues.practiceManager === 'string')) {
            errors.practiceManager = 'Enter valid Practice Manager name';
        }

        if (!(formValues.practiceManagerEmail
            && typeof formValues.practiceManagerEmail === 'string'
            && this.validateEmail(formValues.practiceManagerEmail))) {
            errors.practiceManagerEmail = 'Enter a valid Practice Manager email';
        }

        if (!(formValues.practiceManagerPhone && typeof formValues.practiceManagerPhone === 'string')) {
            errors.practiceManagerPhone = 'Enter valid Practice Manager phone';
        }

        if (!(formValues.accountsPayable && typeof formValues.accountsPayable === 'string')) {
            errors.accountsPayable = 'Enter valid Accounts Payable name';
        }

        if (!(formValues.accountsPayableEmail
            && typeof formValues.accountsPayableEmail === 'string'
            && this.validateEmail(formValues.accountsPayableEmail))) {
            errors.accountsPayableEmail = 'Enter a valid Accounts Payable email';
        }

        if (!(formValues.accountsPayablePhone && typeof formValues.accountsPayablePhone === 'string')) {
            errors.accountsPayablePhone = 'Enter valid Accounts Payable phone';
        }

        if (formValues.physicianEmail && typeof formValues.physicianEmail === 'string' && !this.validateEmail(formValues.physicianEmail)) {
            errors.physicianEmail = 'Enter a valid Phyician email';
        }

        if (!(formValues.creditCardOrInvoice)) {
            errors.creditCardOrInvoice = 'Please select Invoice or Credit card';
        }

        if (!category) {
            errors.category = 'Please, select a category';
        }

        if (Object.keys(errors).length > 0) {
            return {
                errorCode: 'FormValidation',
                errors: errors
            };
        }

        return {
            category: category,
            thirdPartyCarrier: thirdPartyCarrier,
            thirdPartyAcct: formValues.thirdPartyAcct,
            invoiceEmail: formValues.invoiceEmail,
            creditCardOrInvoice: formValues.creditCardOrInvoice,
            providerLocator: formValues.providerLocator === 'on',
            physician: formValues.physician,
            physicianEmail: formValues.physicianEmail,
            physicianPhone: formValues.physicianPhone,
            practiceManager: formValues.practiceManager,
            practiceManagerEmail: formValues.practiceManagerEmail,
            practiceManagerPhone: formValues.practiceManagerPhone,
            accountsPayable: formValues.accountsPayable,
            accountsPayableEmail: formValues.accountsPayableEmail,
            accountsPayablePhone: formValues.accountsPayablePhone,
            taxExemptId: formValues.taxExemptId
        };
    };

    MyAccountAdditionalFieldsView.prototype.getContext = function getContext() {
        return {
            successMessage: this.successMessage,
            errorMessage: this.errorMessage,
            additionalFieldsMessage: _.translate('ADDITIONAL_FIELDS_SUCCESS_MESSAGE'),
            categories: this.categories,
            carriers: this.carriers
        };
    };

    MyAccountAdditionalFieldsView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        this.getCategoriesAndThirdPartyCarriersCall().always(function aftergetCategoriesAndThirdPartyCarriersCall() {
            SCFormView.prototype.render.apply(self, args);
        });
    };

    MyAccountAdditionalFieldsView.prototype.getCategoriesAndThirdPartyCarriersCall = function getCategoriesAndThirdPartyCarriersCall() {
        var self = this;
        var additionalFieldsPromise = jQuery.Deferred();

        this.model.fetch({
            data: {
                action: 'getCategoriesAndThirdPartyCarriers'
            }
        }).done(function getCategoriesAndThirdPartyCarriersCallSuccessfull() {
            self.categories = self.model.get('categories');
            self.carriers = self.model.get('carriers');
        }).always(function getCategoriesAndThirdPartyCarriersCallAlways() {
            additionalFieldsPromise.resolve();
        });
        return additionalFieldsPromise;
    };

    return MyAccountAdditionalFieldsView;
});
