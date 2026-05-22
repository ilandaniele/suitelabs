define('CustomForms.Form.View', [
    'Backbone',

    'CustomForms.Model',

    'customforms_form.tpl',

    'SCFormView',
    'Utils',
    'jQuery',
    'underscore'
], function CustomFormsFormViewModule(
    Backbone,

    CustomFormsModel,

    template,

    FormViewModule,
    Utils,
    jQuery,
    _
) {
    'use strict';

    /**
     * data-validate-required-message="message"
     * data-validate-required
     * data-validate-state
     * data-validate-zip
     * data-validate-phone
     * data-validate-email
     */

    var SCFormView = FormViewModule.SCFormView;
    var FORM_TYPE = {
        CASE: '1',
        LEAD: '2'
    };
    var FILEID_FIELD_NAME;

    function insertIntoFormAndGetFileId(data, $form) {
        var fileId = Number(data) ? data : '';
        var $inputsFound = $form.find('input[name="' + FILEID_FIELD_NAME + '"]');

        if ($inputsFound.length) {
            $inputsFound.first().val(fileId);
        } else {
            $form.append(jQuery('<input>').attr({
                type: 'hidden',
                name: FILEID_FIELD_NAME,
                value: fileId
            }));
        }
        return fileId;
    }

    function CustomFormsFormView(options) {
        SCFormView.call(this, new CustomFormsModel());

        this.options = options || {};
        this.template = template;
        this.customFormDataPromise = jQuery.Deferred();

        FILEID_FIELD_NAME = this.options.settings.custrecord_custom_form_type === FORM_TYPE.CASE ? 'custevent_crm_file_id' : 'custentity_lead_file_id';

        this.validators = {
            validateEmail: function validateEmail(value) {
                var emailRegex = new RegExp('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&\'' + // eslint-disable-line no-useless-escape
                    '*+/=?^_`{|}~]+)*@(?:[a-z0-9]+(?:-+[a-z0-9]+)*\.)+(?:xn--[a-z0-9]+|' + // eslint-disable-line no-useless-escape
                    '[a-z]{2,16})$', 'i');

                if (value && !emailRegex.test(value)) {
                    return 'A valid email address is required';
                }

                return '';
            },

            validatePhone: function validatePhone(value) {
                return value ? Utils.validatePhone.apply(Utils, arguments) : '';
            },

            validateState: function validateState(value) {
                return value ? Utils.validateState.apply(Utils, arguments) : '';
            },

            validateZipCode: function validateZipCode(value) {
                return value ? Utils.validateZipCode.apply(Utils, arguments) : '';
            }
        };

        this.attributes = {
            id: 'CustomFormsFormView',
            'class': 'CustomForms-Form-View'
        };
    }

    CustomFormsFormView.prototype = Object.create(SCFormView.prototype);

    CustomFormsFormView.prototype.constructor = CustomFormsFormView;

    CustomFormsFormView.prototype.getEvents = function getEvents() {
        return {
            'blur [type="date"]': 'normalizeDate',
            'blur [type="time"]': 'normalizeTime',
            'blur [type="number"]': 'normalizeNumber',
            'blur [type="datetime"]': 'normalizeDateTime',
            'blur [data-validate-datetime]': 'normalizeDateTime',
            'blur [data-validate-integer]': 'normalizeInteger',
            'blur [data-validate-link]': 'normalizeLink',
            'blur [data-validate-percent]': 'normalizePercent',
            'blur [name]': 'onFormFieldChange',

            'submit form': 'submitForm',

            'change [data-list-id="country"]': 'updateStates'
        };
    };

    CustomFormsFormView.prototype.render = function render() {
        SCFormView.prototype.render.apply(this, arguments);

        this.afterRender();
    };

    CustomFormsFormView.prototype.afterRender = function afterRender() {
        var settings = this.options.settings;

        this.fetchCustomFormData();
        this.applyTranslations();

        // Form configuration
        this.formModel.set('formId', settings.custrecord_custom_form_id);
        this.formModel.set('formHash', settings.custrecord_custom_form_hash);
        this.formModel.set('formType', settings.custrecord_custom_form_type);

        // Auto-populated fields
        this.setCurrency();
        this.setSubsidiary();
        this.setCurrentDomain();

        // Field validations
        this.applyValidations();

        this.loadSelectCustomLists();
        this.setSettingsRecordId();
        this.googleReCAPTCHALoadPromise = this.loadGoogleReCAPTCHA();

        this.setTooltips();
    };

    CustomFormsFormView.prototype.setTooltips = function setTooltips() {
        this.$('[data-tooltip]').each(function eachTooltip() {
            var $this = jQuery(this);
            var fieldId = $this.data('tooltip');

            jQuery.get('/core/help/fieldhelp.nl?f=' + fieldId + '&amp;NS_VER=2021.2.0').done(
                function onFieldHelpFetch(response) {
                    var tempElement = document.createElement('html');
                    var textElement;
                    var text;

                    tempElement.innerHTML = response;
                    textElement = tempElement.getElementsByClassName('text');
                    text = textElement && textElement.length && _.translate(textElement[0].textContent).trim();

                    if (text) {
                        $this.attr('data-placement', 'auto').attr('data-toggle', 'tooltip').addClass('custom-form-tooltip');
                        $this.attr('title', text).tooltip({ html: true });
                    } else {
                        $this.remove();
                    }
                }
            );
        });
    };

    CustomFormsFormView.prototype.getCustomLists = function getCustomLists() {
        return _(this.$('select[data-list-id]'))
            .chain()
            .map(function mapElementToCustomListId(element) {
                return jQuery(element).data('listId');
            })
            .join(',')
            .value();
    };

    CustomFormsFormView.prototype.fetchCustomFormData = function fetchCustomFormData() {
        var deferred = this.customFormDataPromise;
        var customFormsModel = new CustomFormsModel();
        var customLists = this.getCustomLists();
        var settings = this.options.settings;

        return customFormsModel.fetch({
            data: {
                customLists: customLists,
                formId: settings.custrecord_custom_form_id,
                formType: settings.custrecord_custom_form_type,
                formHash: settings.custrecord_custom_form_hash
            }
        }).then(
            function onSuccess(data) {
                deferred.resolve(data);
            },
            function onReject() {
                deferred.reject();
            }
        );
    };

    CustomFormsFormView.prototype.applyTranslations = function applyTranslations() {
        this.$('[data-translate]').each(function eachValidateRequired() {
            var $this = jQuery(this);
            var text = _($this.text().trim()).translate();

            $this.text(text);
        });
    };

    CustomFormsFormView.prototype.setCurrency = function setCurrency() {
        var environment = this.options.environment;
        var $currency = this.$('[name="currency"]');
        var currencies = environment.getSiteSetting('currencies') || [];
        var currency;

        if (!_.isEmpty($currency) && currencies.length) {
            currency = _(currencies).findWhere({ isdefault: 'T' });
            if (!_.isEmpty(currency)) {
                $currency.val(currency.internalid);
            }
        }
    };

    CustomFormsFormView.prototype.setSubsidiary = function setSubsidiary() {
        var environment = this.options.environment;
        var $subsidiary = this.$('[name="subsidiary"]');
        var subsidiaries = environment.getSiteSetting('subsidiaries') || [];
        var subsidiary;

        if (!_.isEmpty($subsidiary) && subsidiaries.length) {
            subsidiary = _(subsidiaries).findWhere({ isdefault: 'T' });
            if (!_.isEmpty(subsidiary)) {
                $subsidiary.val(subsidiary.internalid);
            }
        }
    };

    CustomFormsFormView.prototype.setCurrentDomain = function setCurrentDomain() {
        var environment = this.options.environment;
        var $currentDomain = jQuery('<input>').attr({
            type: 'hidden',
            name: 'currentDomain',
            value: ''
        });
        var customerCenterTouchpoint = environment.getSiteSetting('touchpoints.customercenter') || '';
        var currentDomainMatch = customerCenterTouchpoint.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
        var currentDomain = currentDomainMatch && currentDomainMatch[0];

        $currentDomain.val(currentDomain);

        this.$('form').append($currentDomain);
    };

    CustomFormsFormView.prototype.setSettingsRecordId = function setSettingsRecordId() {
        var $settingsRecordId = jQuery('<input>').attr({
            type: 'hidden',
            name: 'settingsRecordId',
            value: ''
        });

        this.customFormDataPromise.then(function afterFetch(customFormData) {
            $settingsRecordId.val(customFormData.settingsRecordId);
        });

        this.$('form').append($settingsRecordId);
    };

    CustomFormsFormView.prototype.loadSelectCustomLists = function loadSelectCustomLists() {
        var self = this;

        this.customFormDataPromise.then(function afterFetch(customFormData) {
            var customLists = customFormData.customLists;
            var environment = self.options.environment;

            if (customLists.country && customLists.state) {
                // remove states so they are not rendered first time load
                customLists = _({}).extend(customLists, { state: [] });
            }

            _(customLists).each(function forEachCustomList(customListValues, customListId) {
                var defaultLabel = self.$('select[data-list-id="' + customListId + '"]').data('default-label');

                self.$('select[data-list-id="' + customListId + '"]')
                    .children().remove().end();

                if (defaultLabel) {
                    self.$('select[data-list-id="' + customListId + '"]')
                    .append(
                        '<option value="">'
                        + defaultLabel
                        + '</option>'
                    );
                }

                _(customListValues).each(function forEachCustomListValue(customListValue) {
                    var id = String(customListValue[customListId === 'country' ? 'code' : 'id']);
                    var $selectAll = self.$('select[data-list-id="' + customListId + '"]');

                    $selectAll.each(function eachSelect() {
                        var $select = jQuery(this);
                        var optionsToHide = $select.data('hide-option') !== undefined ? String($select.data('hide-option')).split(',') : [];

                        if (optionsToHide.length === 0 || optionsToHide.indexOf(id) === -1) {
                            $select.append(
                                '<option value="' + id + '">' + customListValue.name + '</option>'
                            );
                        }
                        if (optionsToHide.indexOf('') !== -1) {
                            $select.find('[value=""]').remove();
                        }
                    });
                });
            });

            self.$('select[data-default-value]').each(function forEachListDefaultValue() {
                var $this = self.$(this);
                var defaultValue = $this.data('default-value');
                var listId = $this.data('list-id');

                $this.find('option[value=' + defaultValue + ']').prop('selected', true);

                if (listId === 'country') {
                    self.updateStates(null, 'US');
                }
            });

            environment.cancelableTrigger('customFormAfterLoadLists');
        });
    };

    CustomFormsFormView.prototype.loadGoogleReCAPTCHA = function loadGoogleReCAPTCHA() {
        var settings = this.options.settings;

        if (settings.custrecord_custom_form_gr_enabled === 'T') {
            return jQuery.getScript('https://www.google.com/recaptcha/api.js?render=' + settings.custrecord_custom_form_gr_site_key);
        }

        return jQuery.Deferred().resolve();
    };

    CustomFormsFormView.prototype.updateStates = function updateStates(e, selectedCountry) {
        var country = e ? jQuery(e.target).val() : selectedCountry;
        var self = this;

        this.$('select[data-list-id="state"]').children().remove();

        this.customFormDataPromise.then(function afterFetch(customFormData) {
            var customLists = customFormData.customLists;
            var states = _(customLists.state).where({ country: country });

            self.$('select[data-list-id="state"]').append(
                '<option value=""></option>'
            );

            _(states).each(function forEachCustomListValue(customListValue) {
                self.$('select[data-list-id="state"]').append(
                    '<option value="' + customListValue.id + '">' + customListValue.name + '</option>'
                );
            });
        });
    };

    // loop over the form html and generate an object to be stored in this.validation to be used later on when validating
    CustomFormsFormView.prototype.applyValidations = function applyValidations() {
        var self = this;
        var validationObject = {};
        var setInputValidation = function setInputValidation($input, name, data) {
            // This generic condition can be changed to a more specific criteria like data-ignore-validation
            if ($input.parent().attr('data-validation')) {
                validationObject[name] = _(validationObject[name] || {}).extend(data);
            }
        };

        this.$('[data-validate-required]').each(function eachValidateRequired() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = (name + ' is required');

            setInputValidation($this, name, {
                required: true,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('input[min]').each(function eachMinValue() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var min = parseInt($this.attr('min'), 10);

            setInputValidation($this, name, {
                min: min,
                minMsg: _('Value must be greater than or equal to $(0)').translate(min)
            });
        });

        this.$('input[max]').each(function eachMaxValue() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var max = parseInt($this.attr('max'), 10);

            setInputValidation($this, name, {
                max: max,
                maxMsg: _('Value must be less than or equal to $(0)').translate(max)
            });
        });

        this.$('[data-validate-state]').each(function eachValidateState() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid state is required');

            setInputValidation($this, name, {
                fn: self.validators.validateState,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('[data-validate-zip]').each(function eachValidateZip() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid zip code is required');

            setInputValidation($this, name, {
                fn: self.validators.validateZipCode,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('[data-validate-phone]').each(function eachValidatePhone() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid phone number is required');

            setInputValidation($this, name, {
                fn: self.validators.validatePhone,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('[data-validate-email]').each(function eachValidateEmail() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid email address is required');

            setInputValidation($this, name, {
                fn: self.validators.validateEmail,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.validation = validationObject;
    };

    CustomFormsFormView.prototype.normalizeDate = function normalizeDate(e) {
        var $input = this.$(e.target);
        var date = new Date($input.val());
        var value;

        if (date.getDate()) {
            value = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        } else {
            value = '';
        }
        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizeTime = function normalizeTime(e) {
        var self = this;
        var $input = this.$(e.target);
        var date = new Date('1/1/2000 ' + $input.val().replace(/(am|pm)/, ''));
        var value;
        var hours;
        var pad = function pad(num) {
            return ('0' + num).substr(-2);
        };

        if (date.getDate()) {
            hours = date.getHours();
            hours += /pm/.test($input.val()) && hours < 12 ? 12 : 0;
            value = (hours > 12 ? hours - 12 : hours || 12) + ':' + pad(date.getMinutes());
            value += ' ' + (hours > 11 ? 'pm' : 'am');
        } else {
            value = '';
        }
        $input.prop('type', value ? 'time' : 'text').val(value);
        $input.off('blur').on('blur', function onBlur(ev) { self.normalizeTime(ev); });
    };

    CustomFormsFormView.prototype.normalizeNumber = function normalizeNumber(e) {
        var self = this;
        var $input = this.$(e.target);
        var parsedNumber = Number($input.val().replace(/[^0-9.]/g, ''));
        var value = parsedNumber >= 0 ? parsedNumber : '';

        $input.prop('type', value ? 'number' : 'text').val(value);
        $input.off('blur').on('blur', function onBlur(ev) { self.normalizeNumber(ev); });
    };

    CustomFormsFormView.prototype.normalizeDateTime = function normalizeDateTime(e) {
        var $input = this.$(e.target);
        var date = new Date($input.val().replace(/(am|pm)/, ''));
        var value;
        var hours;
        var pad = function pad(num) {
            return ('0' + num).substr(-2);
        };

        if (date.getDate()) {
            hours = date.getHours();
            hours += /pm/.test($input.val()) && hours < 12 ? 12 : 0;
            value = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            value += ' ' + (hours > 12 ? hours - 12 : hours || 12) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
            value += ' ' + (hours > 11 ? 'pm' : 'am');
        } else {
            value = '';
        }
        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizeInteger = function normalizeInteger(e) {
        var $input = this.$(e.target);
        var value = parseInt($input.val(), 10) || '';

        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizeLink = function normalizeLink(e) {
        var $input = this.$(e.target);
        var value = $input.val();

        if (!/^https?:\/\//.test(value)) {
            value = 'http://' + value;
        }
        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizePercent = function normalizePercent(e) {
        var $input = this.$(e.target);
        var value = Number($input.val().replace(/%$/, '')) || '';

        if (value) {
            value += '%';
        }
        $input.val(value);
    };

    // CustomFormsFormView.prototype.submit = function submit(e) {
    //     var settings = this.options.settings;

    //     e.preventDefault();

    //     if (settings.custrecord_custom_form_gr_enabled === 'T') {
    //         this.submitFormWithReCAPTCHA(e);
    //     } else {
    //         this.submitForm(e);
    //     }
    // };

    CustomFormsFormView.prototype.generateReCAPTCHA = function generateReCAPTCHA(action, callback) {
        var settings = this.options.settings;

        this.googleReCAPTCHALoadPromise.done(function afterReCAPTCHALoaded() {
            window.grecaptcha.ready(function onReCAPTCHAReady() {
                window.grecaptcha.execute(settings.custrecord_custom_form_gr_site_key, { action: action }).then(function afterReCAPTCHAExecute(token) {
                    var $reCAPTCHAToken = jQuery('[name="gReCAPTCHAToken"]');

                    if (!$reCAPTCHAToken.length) {
                        $reCAPTCHAToken = jQuery('<input>').attr({
                            type: 'hidden',
                            name: 'gReCAPTCHAToken'
                        }).appendTo(self.$('form'));
                    }

                    $reCAPTCHAToken.val(token);

                    callback();
                });
            });
        });
    };


    // CustomFormsFormView.prototype.submitFormWithReCAPTCHA = function submitFormWithReCAPTCHA(e) {
    //     var self = this;

    //     this.generateReCAPTCHA('submit', function callback() {
    //         self.submitForm(e);
    //     });
    // };

    CustomFormsFormView.prototype.uploadFile = function uploadFile($form, $deferred) {
        var settings = this.options.settings;
        var self = this;
        var $reCAPTCHADeferred = jQuery.Deferred();

        if (settings.custrecord_custom_form_gr_enabled === 'T') {
            this.generateReCAPTCHA('file_upload', function callback() {
                $reCAPTCHADeferred.resolve();
            });
        } else {
            $reCAPTCHADeferred.resolve();
        }

        $reCAPTCHADeferred.done(function onReCAPTCHADone() {
            self.customFormDataPromise.then(function afterFetch(customFormData) {
                var formData = new FormData($form[0]);

                jQuery.ajax({
                    data: formData,
                    dataType: 'json',
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    beforeSend: function beforeSend(jqXHR) {
                        jqXHR.setRequestHeader('X-SC-Touchpoint', SC.ENVIRONMENT.SCTouchpoint);
                    },
                    url: customFormData.url,
                    success: function success(data) {
                        var fileId = insertIntoFormAndGetFileId(data, $form);
                        $deferred.resolve(fileId);
                    },

                    error: function error(jqXhr) {
                        $deferred.reject(jqXhr);
                    }
                });
            });
        });
    };

    CustomFormsFormView.prototype.submitForm = function submitForm(e) {
        var settings = this.options.settings;
        var environment = this.options.environment;
        var $deferred = jQuery.Deferred();
        var beforeSubmitPromise;
        var $form = this.$(e.target);
        var $triggerBeforeSubmitElem = $form.find('[data-trigger-before-submit]');
        var triggerBeforeSubmit = $triggerBeforeSubmitElem.data('trigger-before-submit');
        var self = this;
        var promise;

        // Re-apply validations in case that there is a dynamic data-validate attribute
        this.applyValidations();

        // in case of any error we call the saveForm so it validates again and prevent form submission and display error messages
        if (this.getFormValues($form).errorCode) {
            return this.saveForm(e);
        }

        beforeSubmitPromise = triggerBeforeSubmit ? environment.cancelableTrigger('customFormBeforeSubmit', {
            triggeringForm: settings.custrecord_custom_form_id
        }) : jQuery.Deferred();

        beforeSubmitPromise.done(function beforeSubmitDone() {
            if ($form.find('input[type="file"]').val()) {
                this.uploadFile($form, $deferred);
            } else {
                $deferred.resolve();
            }

            $deferred.done(function onFilesUploaded() {
                if (settings.custrecord_custom_form_gr_enabled === 'T') {
                    promise = jQuery.Deferred();
                    self.generateReCAPTCHA('submit', function callback() {
                        self.saveForm(e).then(
                            function saveFormSuccess() {
                                promise.resolve.apply(promise, arguments);
                            },
                            function saveFormError() {
                                promise.reject.apply(promise, arguments);
                            }
                        );
                    });
                } else {
                    promise = self.saveForm(e);
                }

                if (promise) {
                    promise.done(function done(result) {
                        var redirectURL = settings.custrecord_custom_form_redirect_url;

                        self.statusMessage = {
                            code: (result.code === 'ERR_RECAPTCHA_FORM' ? 'error' : 'success'),
                            message: result.message || 'CUSTOM_CASE_SUMISSION_SUCCESS'
                        };

                        if (self.statusMessage.code === 'success' && redirectURL) {
                            Backbone.history.navigate(redirectURL, { trigger: true });
                        } else {

                            if ( !$form.find('[data-prevent-clear-fields]').length ) {
                                self.$('input:visible, select:visible, textarea:visible, input[name="' + FILEID_FIELD_NAME + '"]').val('');
                            }
                            
                            $form.trigger('customreset');
                            environment.cancelableTrigger('customFormAfterSubmit');
                        }
                    }).fail(function fail(jqXhr) {
                        self.statusMessage = {
                            code: 'error',
                            message: jqXhr.responseJSON
                            ? jqXhr.responseJSON.errorMessage
                            : 'Something went wrong processing your request, please try again later.'
                        };
                        jqXhr.preventDefault = true;
                    }).always(function always() {
                        self.showStatusMessage();
                    });
                }
            }).fail(function fail(jqXhr) {
                self.statusMessage = {
                    code: 'error',
                    message: jqXhr.responseJSON ? jqXhr.responseJSON.errorMessage : 'Something went wrong uploading your file, please try again later.'
                };
                jqXhr.preventDefault = true;
                self.showStatusMessage();
            });
        });

        beforeSubmitPromise.fail(function beforeSubmitFail(errorMessage) {
            self.statusMessage = {
                code: 'error',
                message: errorMessage || 'Something went wrong, please try again later or contact support.'
            };
            self.showStatusMessage();
        });

        if (!triggerBeforeSubmit) {
            beforeSubmitPromise.resolve();
        }

        return e.stopPropagation() || e.preventDefault();
    };

    CustomFormsFormView.prototype.showStatusMessage = function showStatusMessage() {
        var $alert = this.$('[data-type="alert-placeholder"]').removeClass('hide message-success message-error');

        $alert.addClass(this.statusMessage.code === 'success' ? 'message-success' : 'message-error');
        $alert.html(_(this.statusMessage.message).translate()).fadeIn(400).delay(10000).fadeOut();
    };

    CustomFormsFormView.prototype.validateField = function validateField(_validationData, fieldName, fieldValue) {
        var required = this.validation[fieldName].required;
        var customFunctionValdiation = this.validation[fieldName].fn;
        var minValidation = this.validation[fieldName].min;
        var maxValidation = this.validation[fieldName].max;
        var error = this.validation[fieldName].msg;
        var errorMinMsg = this.validation[fieldName].minMsg;
        var errorMaxMsg = this.validation[fieldName].maxMsg;

        if (required && !fieldValue) {
            return error;
        }

        if (minValidation && (fieldValue < minValidation)) {
            return errorMinMsg;
        }

        if (maxValidation && (fieldValue > maxValidation)) {
            return errorMaxMsg;
        }

        if (customFunctionValdiation && fieldValue) {
            error = customFunctionValdiation(fieldValue);

            if (error) {
                return error;
            }
        }

        // no error
        return '';
    };

    CustomFormsFormView.prototype.getFormFieldValue = function getFormFieldValue($input) {
        var name = $input.attr('name');
        var value = $input.val().trim();
        var error;

        if (!this.validation[name]) {
            return {
                name: name,
                value: value
            };
        }

        error = this.validateField(this.validation[name], name, value);

        if (error) {
            return {
                name: name,
                error: error
            };
        }

        return {
            name: name,
            value: value
        };
    };

    CustomFormsFormView.prototype.getFormValues = function getFormValues($form) {
        var self = this;
        var formValues = _($form.serializeObject()).extend({
            'custom-file': $form.find('[type="file"]').val()
        });
        var errors = {};

        _(this.validation).each(function forEachValidation(validationData, fieldName) {
            var fieldValue = formValues[fieldName];
            var error = self.validateField(validationData, fieldName, fieldValue);

            if (error) {
                errors[fieldName] = error;
            }
        });

        if (!_(errors).isEmpty()) {
            return {
                errorCode: 1,
                errors: errors
            };
        }

        return formValues;
    };

    CustomFormsFormView.prototype.getContext = function getContext() {
        var settings = this.options.settings;

        return {
            formId: settings.custrecord_custom_form_id,
            formContent: settings.custrecord_custom_form_html,
            hideBadge: settings.custrecord_custom_form_gr_hide_badge === 'T'
        };
    };

    return CustomFormsFormView;
});
