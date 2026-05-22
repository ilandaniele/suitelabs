var extensions = {};

extensions['AwaLabs.AwaFileUpload.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/AwaFileUpload/2.1.0/' + asset;
}

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


define('AwaLabs.FileUpload', [
    'FileUpload.File.View'
], function AwaLabsFileUpload() {
    'use strict';
});


};

extensions['AwaLabs.CheckoutCreditCardsViews.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CheckoutCreditCardsViews/2.1.0/' + asset;
}

define('AwaLabs.CheckoutCreditCardsViews', [
    'OrderWizard.Module.PaymentMethod.Creditcard',
    'Utils',
    'underscore'
], function AwaLabsCheckoutCreditCardsViews(
    OrderWizardModulePaymentMethodCreditcard,
    Utils,
    _
) {
    'use strict';

    var prototype = OrderWizardModulePaymentMethodCreditcard.prototype;

    _.extend(prototype, {
        childViews: _.extend(prototype.childViews, {
            'CreditCard.List': _.wrap(prototype.childViews['CreditCard.List'], function creditCardList(fn) {
                this.itemsPerRow = 2;
                if (!Utils.isDesktopDevice() && !Utils.isTabletDevice()) {
                    this.itemsPerRow = 1;
                }

                return fn.apply(this, _.toArray(arguments).slice(1));
            })
        })
    });
});


};

extensions['AwaLabs.CheckoutImprovements.2.1.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CheckoutImprovements/2.1.1/' + asset;
}

define('AwaLabs.CheckoutImprovements', [
    'jQuery',
    'underscore',
    'OrderWizard.Module.SubmitButton'
], function CheckoutImprovements(
    jQuery,
    _
) {
    'use strict';

    var scrollToBottom = function scrollToBottom() {
        var $button = jQuery('.order-wizard-step-actions');
        jQuery('html,body').animate({ scrollTop: $button.offset().top }, 'slow');
    };

    return {
        mountToApp: function mountToApp(container) {
            var checkout = container.getComponent('Checkout');
            var stepsURL = ['shipping/address', 'billing'];
            var continueModuleData = {
                id: 'cart-summary-continue',
                index: 100,
                classname: 'OrderWizard.Module.SubmitButton',
                options: { container: '#wizard-step-content-right' }
            };

            if (checkout) {
                checkout.on('afterShowContent', function afterShowContent() {
                    jQuery('.main').addClass('checkout');

                    jQuery('.present .order-wizard-steps-step-name').on('click', function onClickScrollBottom(e) {
                        e.preventDefault();
                        scrollToBottom();
                    });
                });

                _.each(stepsURL, function eachStep(step) {
                    checkout.addModuleToStep({
                        step_url: step, module: continueModuleData
                    });
                });
            }
        }
    };
});


};

extensions['AwaLabs.CheckoutSteps.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CheckoutSteps/2.0.0/' + asset;
}


define('AwaLabs.StepModule', [
    'Wizard.Module',
    'order_wizard_steps_module.tpl',
    'Backbone',
    'underscore',
    'Utils'
], function AwaLabsStepModule(
    WizardModule,
    orderWizardStepsModuleTpl,
    Backbone,
    _
) {
    'use strict';

    return WizardModule.extend({
        template: orderWizardStepsModuleTpl,
        model: new Backbone.Model(), // Fix for custom fields module,
        initialize: function initialize(options) {
            this.wizard = options.wizard;
            this.stepNumber = options.stepNumber || 1;
        },
        render: function render() {
            this._render();
            this.trigger('ready', true);
        },
        isActive: function isActive() {
            return true;
        },
        getContext: function getContext() {
            var steps;
            var self = this;
            var stepGroups = [];
            var errorsToDisplay = [];
            var counter = 0;

            steps = _.filter(_.toArray(this.wizard.stepGroups), function filterSteps(step) {
                var stepContainer = (self.options.container === '#wizard-step-content-steps-top' && step.state === 'present');
                var stepState = step.state === (self.options.container === '#wizard-step-content-steps-top' ? 'past' : 'future');

                if (step.showStepGroup()
                    && self.options.container === '#wizard-step-content-steps-bottom'
                    && (step.state === 'present' || step.state === 'past')) {
                    counter++;
                }
                return stepContainer || stepState;
            });

            _(steps).each(function eachStep(stepGroup) {
                var stepGroupData = {
                    name: stepGroup.name,
                    iconClass: '',
                    elClass: '',
                    linkUrl: '',
                    counter: 0
                };
                var iconClass = ' order-wizard-steps-step-icon-past';
                var stepGroupErrors = stepGroup.getErrors();

                if (stepGroup.showStepGroup()) {
                    if (stepGroup.state === 'present') {
                        iconClass = ' order-wizard-steps-step-icon-present';
                    } else if (stepGroup.state === 'future') {
                        iconClass = ' order-wizard-steps-step-icon-future';
                    }

                    if (stepGroupErrors && stepGroupErrors.length) {
                        iconClass += ' wizard-step-navigation-error';
                    }
                    stepGroupData.iconClass = iconClass;
                    stepGroupData.elClass = stepGroup.state;

                    stepGroupData.linkUrl = stepGroup.state === 'future' ? Backbone.history.fragment : stepGroup.getURL() + '?force=true';

                    errorsToDisplay = _.uniq(_.union(errorsToDisplay, stepGroupErrors), function unionErrors(item) {
                        return item.errorCode;
                    });

                    stepGroupData.counter = ++counter;

                    stepGroups.push(stepGroupData);
                }
            });

            return {
                stepGroups: stepGroups,
                errors: errorsToDisplay,
                showBackButton: !this.options.wizard.isCurrentStepFirst()
            };
        }
    });
});


define('AwaLabs.CheckoutSteps', [
    'underscore',
    'AwaLabs.StepModule'
], function OrderWizardModuleSteps(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var checkout = container.getComponent('Checkout');
            var stepsURL = ['shipping/address', 'billing', 'review'];
            var topModuleData = {
                id: 'top-steps',
                index: 0,
                classname: 'AwaLabs.StepModule',
                options: { container: '#wizard-step-content-steps-top' }
            };
            var bottomModuleData = {
                id: 'bottom-steps',
                index: 100,
                classname: 'AwaLabs.StepModule',
                options: { container: '#wizard-step-content-steps-bottom' }
            };

            if (checkout) {
                _.each(stepsURL, function eachStep(stepUrl) {
                    checkout.addModuleToStep({
                        step_url: stepUrl, module: topModuleData
                    });
                    checkout.addModuleToStep({
                        step_url: stepUrl, module: bottomModuleData
                    });
                });
            }
        }
    };
});


};

extensions['AwaLabs.DeliveryInstructions.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/DeliveryInstructions/2.1.0/' + asset;
}

define('OrderWizard.Module.DeliveryInstructions', [
    'Profile.Model',
    'Wizard.Module',
    'underscore',
    'jQuery',
    'orderwizard_delivery_instructions.tpl',
    'Utils',
    'GlobalViews.Confirmation.View'
], function OrderWizardModuleDeliveryInstructions(
    ProfileModel,
    WizardModule,
    _,
    jQuery,
    orderWizardDeliveryInstructionsTpl,
    Utils,
    GlobalViewsConfirmationView
) {
    return WizardModule.extend({
        events: {
            'click [data-action="change-delivery-option"]': 'changeDeliveryOption',
            'change [data-action="wg-input-field-option"]': 'onFieldChange'
        },
        template: orderWizardDeliveryInstructionsTpl,
        initialize: function initialize() {
            WizardModule.prototype.initialize.apply(this, arguments);
            this.listenTo(this.model, 'request', this.disableOnRequest);
            this.listenTo(this.model, 'sync', this.updateOnResponse);
            this.listenTo(this.model, 'error', this.updateOnResponse);
            this.environment = this.options.wizard.application.getComponent('Environment');
            this.checkWhiteGlove();
        },
        checkWhiteGlove: function checkWhiteGlove() {
            var profile = ProfileModel.getInstance();
            var lines = this.model && this.model.get('lines');
            var options = this.model.get('options');
            this.isTrade = profile.get('isTrade');
            this.isWhiteGlove = _.some(lines.models, function fnSome(line) {
                return line && line.get('item') && line.get('item').get('custitem46');
            });
            this.isWhiteGloveDisabled = !this.isWhiteGlove;
            if (!this.isTrade && this.isWhiteGlove) {
                options.custbody_awa_white_glove = 'T';
                this.model.set(options, options).save();
            }
        },
        disableOnRequest: function disableOnRequest() {
            this.isTemporarlyDisabled = true;
            this.step.enableNavButtons();
            this.render();
        },
        updateOnResponse: function updateOnResponse() {
            this.isTemporarlyDisabled = false;
            this.step.enableNavButtons();
            this.render();
        },
        getConfigurationForShipMethod: function getConfigurationForShipMethod() {
            var shippingMethodsForDeliveryInstructions = this.environment.getConfig('deliveryinstructions.shippingMethods');
            var shipmethod = this.model.get('shipmethod') + '';
            var shippingMethodConfiguration = _.findWhere(shippingMethodsForDeliveryInstructions, { internalid: shipmethod });
            var finalConfig;
            if (!shippingMethodConfiguration) {
                return null;
            }
            finalConfig = {
                liftGateEnabled: shippingMethodConfiguration.liftGate &&
                    this.environment.getConfig('deliveryinstructions.liftGate.enabled'),
                residentialAddressEnabled: shippingMethodConfiguration.residentialAddress &&
                    this.environment.getConfig('deliveryinstructions.residentialAddress.enabled')
            };

            if (finalConfig.liftGateEnabled === false && finalConfig.residentialAddressEnabled === false) {
                return null;
            }
            return finalConfig;
        },
        isActive: function isActive() {
            var profile = ProfileModel.getInstance();
            var isTrade = profile.get('isTrade');
            var config = this.getConfigurationForShipMethod();
            return (!!config && isTrade) || (this.environment.getConfig('deliveryinstructions.whiteGlove.enabled'));
        },
        isValid: function isValid() {
            var options = this.model.get('options');
            if (options.custbody_awa_white_glove === 'T' && this.isWhiteGlove) {
                if (!options.custbody_wg_full_name) {
                    return this.showErrorMessage('Name is required');
                }
                if (!options.custbody_wg_email_address) {
                    return this.showErrorMessage('Email is required.');
                }
                if (!/^[.\w\-!#$%&'*+/=?^_`{|}~\\]{1,64}@[.\w-]{1,255}\.[\w-]{1,20}$/.test(options.custbody_wg_email_address)) {
                    return this.showErrorMessage('Please enter a valid email.');
                }
                if (!options.custbody_wg_phone_number) {
                    return this.showErrorMessage('Phone number is required.');
                }
            }
            this.clearError();
            return jQuery.Deferred().resolve();
        },
        showErrorMessage: function showErrorMessage(message) {
            this.error = { errorMessage: message };
            this.showError();
            return jQuery.Deferred().reject();
        },
        onFieldChange: function onFieldChange(e) {
            var options = this.model.get('options');
            options[e.target.name] = e.target.value;
            this.model.set(options, options);
        },
        changeWhiteGloveOption: function changeWhiteGloveOption(params) {
            var options = params.model.get('options');
            options.custbody_awa_white_glove = 'F';
            options.custbody_wg_unchecked = 'T';
            params.model.set(options, options).save();
        },
        changeDeliveryOption: function changeDeliveryOption(e) {
            var $target = jQuery(e.target);
            var option;
            var value;
            var view;
            var options;
            var self = this;
            e.preventDefault();
            option = $target.data('option');
            value = $target.is(':checked');
            if (option === 'custbody_awa_white_glove') {
                if (!value) {
                    view = new GlobalViewsConfirmationView({
                        title: Utils.translate(self.environment.getConfig('deliveryinstructions.whiteGlove.modalTitle')),
                        body: Utils.translate(self.environment.getConfig('deliveryinstructions.whiteGlove.disclaimer')),
                        callBack: self.changeWhiteGloveOption,
                        callBackParameters: { model: self.model },
                        confirmLabel: Utils.translate('I Agree'),
                        cancelLabel: Utils.translate('Cancel'),
                        autohide: true
                    });
                    self.options.wizard.application.getLayout().showInModal(view, {});
                } else {
                    options = this.model.get('options');
                    options.custbody_awa_white_glove = value ? 'T' : 'F';
                    this.model.set(options, options).save();
                }
            } else {
                this.model.set(option, value).save();
            }
        },
        getContext: function getContext() {
            var config = this.getConfigurationForShipMethod();
            var residentialAddressEnabled = config && config.residentialAddressEnabled;
            var liftgateEnabled = config && config.liftGateEnabled;
            var whiteGloveEnabled = this.environment.getConfig('deliveryinstructions.whiteGlove.enabled') && this.isWhiteGlove;
            return {
                isTemporarlyDisabled: this.isTemporarlyDisabled ? 'disabled' : '',
                residentialAddressEnabled: config && config.residentialAddressEnabled,
                liftgateEnabled: config && config.liftGateEnabled,
                liftgateChecked: this.model.get('liftGate'),
                residentialAddressChecked: this.model.get('residentialAddress'),
                residentialAddressTitle: this.environment.getConfig('deliveryinstructions.residentialAddress.optionTitle'),
                residentialAddressDescription: this.environment.getConfig('deliveryinstructions.residentialAddress.optionDescription'),
                liftGateTitle: this.environment.getConfig('deliveryinstructions.liftGate.optionTitle'),
                liftGateDescription: this.environment.getConfig('deliveryinstructions.liftGate.optionDescription'),
                whiteGloveEnabled: this.environment.getConfig('deliveryinstructions.whiteGlove.enabled') && this.isWhiteGlove,
                whiteGloveChecked: this.model.get('options').custbody_awa_white_glove !== 'F',
                whiteGloveDisabled: this.isWhiteGloveDisabled,
                whiteGloveTitle: this.environment.getConfig('deliveryinstructions.whiteGlove.title'),
                whiteGloveMessage: this.environment.getConfig('deliveryinstructions.whiteGlove.message'),
                isTrade: this.isTrade,
                showTitle: residentialAddressEnabled || liftgateEnabled || whiteGloveEnabled,
                options: this.model.get('options')
            };
        }
    });
});


define('AwaLabs.DeliveryInstructions.Checkout.EntryPoint', [
    'underscore',
    'OrderWizard.Module.DeliveryInstructions'
], function AwaLabsDeliveryInstructionsCheckoutEntryPoint(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var checkout = application.getComponent('Checkout');
            var layout = application.getComponent('Layout');

            if (checkout && layout) {
                checkout.addModuleToStep({
                    step_url: 'shipping/address',
                    module: {
                        id: 'delivery-instructions',
                        index: 10,
                        classname: 'OrderWizard.Module.DeliveryInstructions'
                    }
                });

                layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Navigable.View', 'whiteGloveServiceMessage', 'string',
                    function overrideContext(context) {
                        var env = application.getComponent('Environment');
                        var isFreightItem = context && context.model && context.model.item && context.model.item.custitem46;
                        var whiteGloveServiceMessage = env.getConfig(
                            isFreightItem ? 'deliveryinstructions.freightItemMessage' : 'deliveryinstructions.nonFreightItemMessage'
                        );

                        return _(whiteGloveServiceMessage).translate();
                    }
                );
            }
        }
    };
});


};

extensions['AwaLabs.Dialog.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Dialog/2.0.0/' + asset;
}

define('Dialog.View', [
    'Backbone',
    'dialog.tpl',
    'jQuery',
    'Utils'
], function DialogView(
    Backbone,
    dialogTpl,
    jQuery,
    Utils
) {
    'use strict';

    /** @class DialogView @extend Backbone.View */
    return Backbone.View.extend({

        template: dialogTpl,

        attributes: {
            'class': 'DialogView'
        },

        events: {
            'click .dialog-footer-cancel-button': 'onCancelButtonClickedHandler',
            'click .dialog-footer-ok-button': 'onOkButtonClickedHandler',
            'click .global-views-modal-content-header-close': 'onClose'
        },
        resolveBodyHtml: function resolveBodyHtml() {
            return this.options.bodyHtml ||
                jQuery('<p>').html(this.options.bodyText || Utils.translate('Proceeding with your request...')).prop('outerHTML');
        },

        initialize: function initialize(options) {
            var doNothingFunction = function doNothing() {};
            this.hasName = !!options.name;
            this.name = options.name;
            this.headerText = options.headerText;
            this.hasHeaderText = !!this.headerText;
            this.bodyHtml = this.resolveBodyHtml();
            if (options.buttons) {
                this.hasOkButton = !!options.buttons.ok;
                if (this.hasOkButton) {
                    this.okButtonText = options.buttons.ok.text || Utils.translate('OK');
                    this.onOkButtonClicked = options.buttons.ok.onClick || doNothingFunction;
                }
                this.hasCancelButton = !!options.buttons.cancel;
                if (this.hasCancelButton) {
                    this.cancelButtonText = options.buttons.cancel.text || Utils.translate('CANCEL');
                    this.onCancelButtonClicked = options.buttons.cancel.onClick || doNothingFunction;
                }
            } else {
                this.hasOkButton = !options.hideOkButton;
                this.okButtonText = Utils.translate('OK');
                this.onOkButtonClicked = doNothingFunction;
                this.hasCancelButton = false;
            }
            this.onClose = options.onClose || doNothingFunction;
        },

        onCancelButtonClickedHandler: function onCancelButtonClickedHandler() {
            this.onCancelButtonClicked();
            this.onClose();
        },

        onOkButtonClickedHandler: function onOkButtonClickedHandler() {
            this.onOkButtonClicked();
            this.onClose();
        },

        getContext: function getContext() {
            return {
                hasName: this.hasName,
                name: this.name,
                hasHeaderText: this.hasHeaderText,
                headerText: this.headerText,
                bodyHtml: this.bodyHtml,
                hasOkButton: !!this.hasOkButton,
                okButtonText: this.okButtonText,
                hasCancelButton: !!this.hasCancelButton,
                cancelButtonText: this.cancelButtonText
            };
        }

    });
});


define('Dialog.Service', [
    'Dialog.View',
    'underscore'
], function Dialog(
    DialogView,
    _
) {
    'use strict';

    var DialogService = function DialogService(application) {
        this.application = application;
    };

    _.extend(DialogService.prototype, {
        getConfigData: function getConfigData(name) {
            var configuration = this.application.getComponent('Environment');
            var config = _.findWhere(configuration.getConfig('dialogsConfig'), { name: name });
            var buttons = {};
            if (config) {
                if (config.hasOkBtn) {
                    buttons.ok = {
                        text: config.okBtnText
                    };
                }
                if (config.hasCancelBtn) {
                    buttons.cancel = {
                        text: config.cancelBtnText
                    };
                }
                config.buttons = buttons;
                return config;
            }
            return {};
        },
        openModalDialog: function openModalDialog(viewOptions) {
            this.application.getLayout().showInModal(
                new DialogView(viewOptions), {
                    modalOptions: {
                        backdrop: 'static',
                        keyboard: false
                    }
                }
            );
        },
        openDialog: function openDialog(params) {
            var options;
            var dialogConfig;
            if (_.isString(params)) {
                options = {
                    name: params
                };
            } else {
                options = {
                    name: params.name,
                    headerText: params.headerText,
                    bodyHtml: params.bodyHtml || params.bodyText,
                    buttons: params.buttons,
                    onClose: params.onClose,
                    hideOkButton: params.hideOkButton
                };
            }
            if (options.name) {
                dialogConfig = this.getConfigData(options.name);
                _.extend(options, {
                    headerText: dialogConfig.headerText || options.headerText,
                    bodyHtml: dialogConfig.bodyHtml || options.bodyHtml || dialogConfig.body,
                    buttons: dialogConfig.buttons || options.buttons
                });
                if (dialogConfig.buttons && dialogConfig.buttons.ok && options.buttons && options.buttons.ok) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            ok: {
                                text: dialogConfig.buttons.ok.text || options.buttons.ok.text,
                                onClick: options.buttons.ok.onClick
                            }
                        })
                    });
                }
                if (dialogConfig.buttons && dialogConfig.buttons.cancel && options.buttons && options.buttons.cancel) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            cancel: {
                                text: dialogConfig.buttons.cancel.text || options.buttons.cancel.text,
                                onClick: options.buttons.cancel.onClick
                            }
                        })
                    });
                }
                this.openModalDialog(options);
            } else {
                this.openModalDialog(options);
            }
        }
    });
    return DialogService;
});


define('AwaLabs.Dialog', [
    'Dialog.Service'
], function AwaLabsDialog() {
    'use strict';
});


};

extensions['AwaLabs.Favicon.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Favicon/2.0.0/' + asset;
}

define('AwaLabs.Favicon', [
], function Favicon(
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            var faviconHtml = '<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">' +
            '<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">' +
            '<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">' +
            '<link rel="manifest" href="/favicon/site.webmanifest">' +
            '<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000">' +
            '<link rel="shortcut icon" href="/favicon/favicon.ico">' +
            '<meta name="msapplication-TileColor" content="#ffffff">' +
            '<meta name="msapplication-config" content="/favicon/browserconfig.xml">' +
            '<meta name="theme-color" content="#ffffff">';
            jQuery('[rel="shortcut icon"]').replaceWith(faviconHtml);
        }
    };
});


};

extensions['AwaLabs.FavoritesList.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/FavoritesList/2.1.0/' + asset;
}

define('FavoritesList.RequestQuoteWizard.Module.Items', [
    'underscore',
    'ShareFavorites.Model',
    'RequestQuoteWizard.Module.Items',
    'Profile.Model'
], function FavoritesListRequestQuoteWizardModuleItems(
    _,
    ShareFavoritesModel,
    RequestQuoteWizardModuleItems,
    ProfileModel
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItems.prototype, {
        generatePdfUrl: function generatePdfUrl(user, useRetailPrices) {
            var pdfModel = new ShareFavoritesModel();
            var url = pdfModel.url();

            var urlParams = {
                userid: user.get('internalid'),
                listid: this.model.get('plInternalId'),
                enableprice: !user.hidePrices() ? 'T' : 'F',
                useretailprice: useRetailPrices
            };
            var urlSearchParams = new URLSearchParams(urlParams);
            url += '?' + urlSearchParams.toString();
            return url;
        },

        getContext: _.wrap(RequestQuoteWizardModuleItems.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');

            context.pdfUrl = this.generatePdfUrl(user, useRetailPrices);
            return context;
        })
    });
});


define('ShareFavorites.Model', [
    'Backbone',
    'underscore'
], function ShareFavoritesModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/ShareFavorites.Service.ss'))
    });
});


define('AwaLabs.FavoritesList.Checkout', [
    'FavoritesList.RequestQuoteWizard.Module.Items'
], function AwaLabsFavoritesList() {
    'use strict';
});


};

extensions['AwaLabs.FooterCopyright.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/FooterCopyright/2.1.0/' + asset;
}

define('FooterCopyright.View', [
    'SCView',
    'footer_copyright.tpl'
], function FooterCopyrightViewModule(
    SCViewComponent,
    FooterCopyrightTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FooterCopyrightView(options) {
        SCView.call(this);
        this.options = options;
        this.template = FooterCopyrightTpl;
    }

    FooterCopyrightView.prototype = Object.create(SCView.prototype);

    FooterCopyrightView.prototype.constructor = FooterCopyrightView;

    FooterCopyrightView.prototype.getContext = function getContext() {
        var environmentComponent = this.options.application.getComponent('Environment');
        return {
            copyrightText: (environmentComponent.getConfig('footer.copyrightText') || '').replace('[YEAR]', new Date().getFullYear())
        };
    };

    return FooterCopyrightView;
});


define('AwaLabs.FooterCopyright', [
    'FooterCopyright.View'
], function FooterCopyright(
    FooterCopyrightView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'FooterCopyright': {
                        'FooterCopyright': {
                            childViewIndex: 1,
                            childViewConstructor: function footerCopyright() {
                                return new FooterCopyrightView({
                                    application: container
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});


};

extensions['AwaLabs.GeoIPLocation.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/GeoIPLocation/2.1.0/' + asset;
}

define('AwaLabs.GeoIpLocation', [
    'jQuery',
    'underscore',
    'Utils'
], function AwaLabsGeoIpLocation(
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            jQuery.getScript(_.getAbsoluteUrl(getExtensionAssetsPath('services/restrictedIp.ssp')));
        }
    };
});


};

extensions['AwaLabs.HeadContentByApplication.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/HeadContentByApplication/2.1.0/' + asset;
}

define('AwaLabs.HeadContentByApplication', [
    'jQuery',
    'Utils'
], function AwaLabsHeadContentByApplication(
    jQuery
) {
    'use strict';

    function isOnCMS() {
        return (parent && parent.location && parent.location.href.match(/\/cms\/[0-9]\/admin\/cms/ig))
            || location.href.match(/\/cms\/[0-9]\/admin\/cms/ig);
    }

    return {
        mountToApp: function mountToApp(container) {
            var $head = jQuery('head');
            var environmentComponent = container.getComponent('Environment');
            var headHtml = environmentComponent.getConfig('HeadContentByApplication.' + SC.ENVIRONMENT.SCTouchpoint);
            var $headHtmlAdd;
            if (SC.ENVIRONMENT.jsEnvironment === 'browser' && !isOnCMS() && headHtml) {
                $headHtmlAdd = jQuery(headHtml);
                $head.append($headHtmlAdd);
            }
        }
    };
});


};

extensions['AwaLabs.HeaderCustomizations.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/HeaderCustomizations/2.0.0/' + asset;
}

define('HeaderCustomizations.Header.View', [
    'Header.View',
    'underscore',
    'jQuery'
], function HeaderCustomizationsHeaderView(
    HeaderView,
    _,
    jQuery
) {
    'use strict';

    _.extend(HeaderView.prototype, {
        initialize: _.wrap(HeaderView.prototype.initialize, function initialize(fn) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            jQuery(window).on('price_change', function priceChange() {
                self.render();
            });
        })
    });
});


define('HeaderCustomizations.MyAccount.Menu', [
    'underscore'
], function HeaderCustomizationsMyAccountMenu(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            var userComponent = container.getComponent('UserProfile');
            var customerTypeFieldId = environment.getConfig('headerCustomization.customerTypeFieldId');
            var accountBalanceName = environment.getConfig('headerCustomization.accountBalanceName');
            var printStatementName = environment.getConfig('headerCustomization.printStatementName');

            userComponent.getUserProfile().then(function thenFn(user) {
                var userType = _.findWhere(user.customfields, { id: customerTypeFieldId });
                var userIsCustomer = userType && userType.value === '1';
                if (userIsCustomer) {
                    layout.addToViewContextDefinition('Header.Menu.MyAccount.View', 'entries', 'array', function fn(context) {
                        return _.map(context.entries, function mapEntries(entry) {
                            if (entry.name === 'Billing') {
                                entry.children = _.reject(entry.children, { name: accountBalanceName });
                                entry.children = _.reject(entry.children, { name: printStatementName });
                            }

                            return entry;
                        });
                    });

                    layout.addToViewContextDefinition('MenuTree.Node.View', 'node', 'array', function fn(context) {
                        var node = context.node;
                        return node.name === accountBalanceName || node.name === printStatementName ? {} : node;
                    });
                }
            });
        }
    };
});


define('AwaLabs.HeaderCustomizations', [
    'underscore',
    'Profile.Model',
    'Header.Menu.View',
    'SC.Configuration',
    'Categories',
    'HeaderCustomizations.MyAccount.Menu',
    'HeaderCustomizations.Header.View'
], function HeaderCustomizations(
    _,
    ProfileModel,
    HeaderMenuView,
    Configuration,
    Categories,
    HeaderCustomizationsMyAccountMenu
) {
    'use strict';

    return {
        addImageToRootCategories: function addImageToRootCategories() {
            var arrayImagesObject = SC.ENVIRONMENT.published.SCCategoryConfiguration;
            var imageObject;
            _.each(Configuration.navigationData, function eachNav(nav) {
                imageObject = _.find(arrayImagesObject, function findImageObject(imageObj) {
                    return imageObj.siteCategory && imageObj.siteCategory.toUpperCase() === nav.text.toUpperCase();
                });
                if (imageObject) {
                    nav.image = imageObject;
                }
            });
        },
        mountToApp: function mountToApp(container) {
            var self = this;
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();
            var showMyAccount = !profile.get('contactId') || (!!profile.get('contactId')() && profile.allowPriceControl());
            Categories.getCategoriesPromise().done(function dnFn() {
                self.addImageToRootCategories();
            });
            if (!showMyAccount) {
                HeaderMenuView.removeChildView('Header.Menu.MyAccount', 'Header.Menu.MyAccount');
            }
            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.View', 'showMyAccount', 'boolean', function fn() {
                    return showMyAccount;
                });

                layout.addToViewContextDefinition('RequestQuoteAccessPoints.HeaderLink.View', 'DisplayLink', 'boolean', function fn() {
                    return profile.get('isLoggedIn') === 'T';
                });
            }

            HeaderCustomizationsMyAccountMenu.mountToApp(container);
        }
    };
});


};

extensions['ACS.HideEditShipAddr.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/HideEditShipAddr/1.0.0/' + asset;
}

define('Address.AddExtraContext.Hack', [
    'Address.Details.View',
    'Backbone',
    'Backbone.View.render'
],
function HackCheckout(
    AddressDetailsView,
    Backbone
) {
    'use strict';

    AddressDetailsView.addExtraContextProperty = Backbone.View.addExtraContextProperty;
});


define('Address.Details.View.HideEdit', [
    'Address.Details.View',
    'Backbone',
    'underscore'
], function AvailabilityFacetFacetsFacetedNavigationItemView(
    AddressDetailsView,
    Backbone,
    _
) {
    'use strict';

    _.extend(AddressDetailsView.prototype, {
        getContext: _.wrap(AddressDetailsView.prototype.getContext, function fnWrap(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var checkoutStep = Backbone.history.fragment;
            var hideEdit = checkoutStep === 'shipping/address' || checkoutStep === 'billing' || checkoutStep === 'opc';
            if (!hideEdit) {
                hideEdit = this.options ? this.options.hideEdit : this.hideEdit;
            }
            return _.extend(context, {
                hideEdit: hideEdit
            });
        })
    });
});


define('OrderWizard.Module.ShowShipments.HideEdit', [
    'OrderWizard.Module.ShowShipments',
    'Address.Details.View',
    'underscore'
], function AvailabilityFacetFacetsFacetedNavigationItemView(
    OrderWizardModuleShowShipments,
    AddressDetailsView,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleShowShipments.prototype, {
        childViews: _.extend(OrderWizardModuleShowShipments.prototype.childViews, {
            'Shipping.Address': function ShippingAddress() {
                return new AddressDetailsView({
                    hideActions: !!this.options.hide_edit_address_button,
                    hideDefaults: true,
                    hideEdit: true,
                    hideRemoveButton: true,
                    manage: 'shipaddress',
                    model: this.addressSource.get(this.model.get('shipaddress')),
                    hideSelector: true
                });
            }
        })
    });
});


define('HideEditShippingAddress', [
    'Backbone',
    'Address.AddExtraContext.Hack',
    'Address.Details.View.HideEdit',
    'OrderWizard.Module.ShowShipments.HideEdit'
], function HideEditShippingAddress(
) {
    'use strict';
});


};

extensions['AwaLabs.InactivityMessage.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/InactivityMessage/2.1.0/' + asset;
}

define('Session.Message', [
    'session_message.tpl',
    'InactivityMessage.ProfileModel',
    'Dialog.Service',
    'InactivityMessage.Model',
    'underscore',
    'Backbone',
    'jQuery',
    'Utils'
], function SessionMessage(
    sessionMessageTpl,
    ProfileModel,
    DialogService,
    InactivityMessageModel,
    _,
    Backbone,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: sessionMessageTpl,
        title: _('Session Timeout').translate(),
        attributes: {
            'class': 'SessionMessageView'
        },
        modalClass: 'session-timeout',
        initialize: function initialize(application) {
            var self = this;
            this.application = application;
            this.sessionExpired = false;
            this.sessionMantained = false;
            this.inactivityMessageModel = new InactivityMessageModel();
            this.waitConfirmationLogout();
            this.on('afterViewRender', function afterViewRender() {
                _.defer(function deferEvent() {
                    jQuery('#modal').on('hidden.bs.modal', function hideModal() {
                        if (!self.sessionMantained) {
                            self.logOut();
                        }
                    });
                });
            });
        },

        events: {
            'click [data-action="maintain-session"]': 'keepSessionAlive'
        },

        keepSessionAlive: function keepSessionAlive() {
            var profileModel = new ProfileModel();
            var self = this;
            profileModel.fetch().done(function onDone() {
                if (profileModel.get('isLoggedIn') !== 'T') {
                    self.sessionExpired = true;
                    self.render();
                    return;
                }
                self.inactivityMessageModel.fetch().done(function onFetchDone() {
                    self.sessionMantained = true;
                    jQuery('#modal').modal('toggle');
                    if (profileModel.get('isPendingTradeApproval')) {
                        new DialogService(self.application)
                            .openDialog('Pending Trade Approval - Session Timeout');
                    }
                });
            });
        },

        waitConfirmationLogout: function waitConfirmationLogout() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.logOut();
            }, 30000);
        },

        logOut: function logOut() {
            var environmentComponent = this.application.getComponent('Environment');
            var logoutURL = environmentComponent.getSiteSetting('touchpoints.logout');

            window.location.href = logoutURL;
        },

        getContext: function getContext() {
            return {
                sessionExpired: this.sessionExpired,
                sessionMantained: this.sessionMantained
            };
        }
    });
});


define('InactivityMessage.Model', [
    'Backbone',
    'underscore'
], function InactivityMessageModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/InactivityMessage.Service.ss'))
    });
});


define('InactivityMessage.ProfileModel', [
    'Backbone',
    'underscore'
], function InactivityMessageProfileModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/Profile.Service.ss')
    });
});


define('AwaLabs.Inactivity.Message', [
    'Session.Message',
    'underscore',
    'jQuery'
], function AwaLabsInactivityMessage(
    SessionMessage,
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            this.application = application;
            this.checkSession();
        },

        checkSession: function checkSession() {
            var userProfile = this.application.getComponent('UserProfile');
            var self = this;
            userProfile.getUserProfile().then(function afterGetUserProfile(user) {
                if (!user || !user.isloggedin) {
                    return;
                }
                self.setNewSessionTimeoutHandler();
                jQuery(document).ajaxSuccess(function onSuccess() {
                    self.setNewSessionTimeoutHandler();
                });
            });
        },

        addDefinitionsToModalView: function addDefinitionsToModalView() {
            var self = this;
            var layout = this.application.getComponent('Layout');

            layout.addToViewContextDefinition('GlobalViews.Modal.View', 'closeAction', 'string', function addCloseAction(context) {
                return context.modalDialogClass === 'session-timeout' ? 'log-out' : '';
            });

            layout.addToViewEventsDefinition('GlobalViews.Modal.View', 'click [data-action="log-out"]', function logOut() {
                var environmentComponent = self.application.getComponent('Environment');
                window.location.href = environmentComponent.getSiteSetting('touchpoints.logout');
            });
        },

        setNewSessionTimeoutHandler: function setNewSessionTimeoutHandler() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.showModalDialog();
                self.addDefinitionsToModalView(); // add context properties to global view to trigger logout on dismiss modal button.
            }, 600000);
        },

        showModalDialog: function showModalDialog() {
            var view = new SessionMessage(this.application);
            var options = {
                modalOptions: {
                    backdrop: 'static',
                    keyboard: false
                }
            };

            this.application.getLayout().showInModal(view, options);
        }
    };
});


};

extensions['AwaLabs.Jewelry.2.1.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Jewelry/2.1.1/' + asset;
}

define('Jewelry.Utils', [

], function JewelryItemKeyMapping(

) {
    'use strict';

    return {
        isJewelry: function isJewelry(item, environmentComponent) {
            var jewelryConfig = environmentComponent.getConfig('jewelry');
            var productCategory = item[jewelryConfig.productTypeFieldId];

            return productCategory && productCategory === jewelryConfig.productTypeFieldValue;
        },

        getJewelrySummary: function getJewelrySummary(summary) {
            var summaryJewelry = summary && summary.jewelry;

            if (summaryJewelry) {
                summaryJewelry.singleItem = summaryJewelry.jewelry_count && summaryJewelry.jewelry_count <= 1;
            }
            return summaryJewelry;
        },

        getNewItemCount: function getNewItemCount(itemCount, summary) {
            var summaryJewelry = summary && summary.jewelry;

            return itemCount - (summaryJewelry && summaryJewelry.jewelry_count ? summaryJewelry.jewelry_count : 0);
        },

        cartContextDefinitions: function cartContextDefinitions(cart) {
            var self = this;
            
            cart.addToViewContextDefinition('Cart.Summary.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.summary);
            });

            cart.addToViewContextDefinition('Cart.Summary.View', 'itemCount', 'number', function itemCount(context) {
                return self.getNewItemCount(context.itemCount, context.summary);
            });
        },

        layoutContextDefinitions: function layoutContextDefinitions(layout, environment) {
            var self = this;

            layout.addToViewContextDefinition('Header.MiniCart.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'radItems', 'number', function itemsInCart(context) {
                return self.getNewItemCount(context.itemsInCart, context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'showPluraLabel', 'number', function showPluraLabel(context) {
                var radItems = self.getNewItemCount(context.itemsInCart, context.model.summary);
                return radItems === 0 || radItems > 1;
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'isJewelry', 'boolean', function isJewelry(context) {
                return self.isJewelry(context.model.item || context.model, environment);
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'shippingWarning', 'string', function shippingWarning() {
                return environment.getConfig('jewelry.shippingWarning');
            });
        }
    };
});


define('OrderWizard.Module.Confirmation.Jewelry', [
    'OrderWizard.Module.Confirmation',
    'Backbone',
    'Tracker',
    'underscore'
], function OrderWizardModuleConfirmationJewelry(
    OrderWizardModuleConfirmation,
    Backbone,
    Tracker,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleConfirmation.prototype, {
        trackTransaction: function trackTransaction(confirmation) {
            var summary = confirmation.get('summary');
            var lines = confirmation.get('lines').filter(function eachLine(line) {
                return line.get('rate') > 0;
            });
            var transaction = {
                confirmationNumber: confirmation.get('tranid'),
                subTotal: summary && (summary.totalSubtotal || summary.subtotal),
                total: summary && summary.total,
                taxTotal: summary && summary.taxtotal,
                shippingCost: summary && summary.shippingcost,
                handlingCost: summary && summary.handlingcost,
                products: new Backbone.Collection(),
                promocodes: confirmation.get('promocodes')
            };
            var transactionModel = new Backbone.Model(transaction);

            _(lines).each(function eachLine(line) {
                var options = [];

                line.get('options').each(function eachOption(option) {
                    if (option.get('value').label) {
                        options.push(option.get('value').label);
                    }
                });

                transactionModel.get('products').add(
                    new Backbone.Model({
                        name: line.get('item').get('_name'),
                        id: line.get('item').get('itemid'),
                        rate: line.get('rate'),
                        category: '/' + line.get('item').get('urlcomponent'),
                        options: options.sort().join(', '),
                        quantity: line.get('quantity')
                    })
                );
            });

            Tracker.getInstance().trackTransaction(transactionModel);
        }
    });
});


define('AwaLabs.Jewelry.Checkout', [
    'Header.MiniCart.View',
    'Backbone.View',
    'Jewelry.Utils',
    'OrderWizard.Module.Confirmation.Jewelry'
], function AwaLabsJewelryCheckout(
    HeaderMiniCartView,
    BackboneView,
    JewelryUtils
) {
    'use strict';

    HeaderMiniCartView.addExtraContextProperty = BackboneView.addExtraContextProperty;

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');

            if (cart) {
                JewelryUtils.cartContextDefinitions(cart);
            }

            if (layout) {
                JewelryUtils.layoutContextDefinitions(layout, environment);

                layout.addToViewContextDefinition('OrderWizard.Module.CartSummary', 'jewelry', 'string', function jewelrySummary(context) {
                    return JewelryUtils.getJewelrySummary(context.model.summary);
                });

                layout.addToViewContextDefinition('OrderWizard.Module.CartSummary', 'itemCount', 'string', function jewelryItemCount(context) {
                    return JewelryUtils.getNewItemCount(context.itemCount, context.model.summary);
                });
            }
        }
    };
});


};

extensions['Tavano.Klaviyo.3.0.7'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/Tavano/Klaviyo/3.0.7/' + asset;
}


define(
	'Tavano.Klaviyo.Klaviyo'
,   [
		'Tavano.Klaviyo.Cart.Sync',
		'Tavano.Klaviyo.ProductView.Sync',
		'Tavano.Klaviyo.LoaderSync',
		'Tavano.Klaviyo.Order.Sync',
		'Tavano.Klaviyo.Profile.Sync',
		'Tavano.Klaviyo.Profile.Model'
	]
,   function (
		TavanoKlaviyoCartSync,
		TavanoKlaviyoProductViewSync,
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoOrderSync,
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoProfileModel
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{

			var registerEvent = true;

			if (SC.isPageGenerator())
				return
			

			var userprofilecomponent = container.getComponent("UserProfile");
			
			var cart = container.getComponent('Cart');
			var pdp = container.getComponent('PDP');
			var layout = container.getComponent('Layout');
			
			
			var environment_component = container.getComponent("Environment");


			// ---------------------
			// Order Submission
			// ---------------------
			TavanoKlaviyoOrderSync.sendOrderDetailsInfo(cart,userprofilecomponent)


			// ---------------------
			// Add To Cart
			// ---------------------
			
			cart.on("afterAddLine",function(){
				TavanoKlaviyoCartSync.sendAddLineEvent(cart,environment_component)
			})


			// ---------------------
			// Update Line
			// ---------------------
			
			cart.on("afterUpdateLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})

			// ---------------------
			// Remove Line
			// ---------------------
			
			cart.on("afterRemoveLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})


			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					
					

					if (userprofilecomponent){
						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);
						});
					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoProfileModel();
						klaviyoProfileModel.fetch().done(function(result){
							TavanoKlaviyoProfileSync.addProfileFromService(result);
						})

					}
					
				}, 2000);

				

				layout.on('afterShowContent', function() {
					if (pdp){
						TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp,environment_component);
						TavanoKlaviyoProductViewSync.sendViewedItem(pdp,environment_component);
						if (pdp && registerEvent) {
							registerEvent = false;
							pdp.on('afterOptionSelection', _.debounce(function (event) {
								TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp, environment_component);
								TavanoKlaviyoProductViewSync.sendViewedItem(pdp, environment_component);
								return true
							}), 200)
						}
					}
				});

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});



define('Tavano.Klaviyo.Cart.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

    var isCartUpdateInProgress = false;

	var KlaviyoCartSync = {

		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},

		addCustomFields : function(line,parentItem,environment_component,klaviyoObject,isMatrixChild){

			
			try{
				var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];
				

				_.each(customFields,function(customField){
					
					if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){
	
						klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]
	
					}else{

						if (customField && customField.nsid == "displayname"){
							klaviyoObject[customField.klaviyokey] = line.item.displayname
						}else{
							klaviyoObject[customField.klaviyokey] = line.item.extras[customField.nsid]
						}
						
					}
					
				})
			}catch(e){
				console.log("Impossible to add custom fields");
				console.log(JSON.stringify(e))
			}
        },


        sendAddLineEvent:  function(cart,environment_component){

			var self = this;



			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);

			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {


					var klaviyoObject = {};


					var session = environment_component.getSession()

					// ---------------------------
					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
					// ---------------------------
					// Currency
					// ---------------------------
					var currency_code = session.currency.code;
					var currency_name = session.currency.currencyname
					var currency_symbol = session.currency.symbol
					

					klaviyoObject["currency_code"] = currency_code;
					klaviyoObject["currency_name"] = currency_name;
					klaviyoObject["currency_symbol"] = currency_symbol;
					
					// ---------------------------
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;

					

					var Items = [];
				
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						
						var matrixParent = line.item.extras.matrix_parent;

						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine)


						// Handle Images
						
						if (matrixParent){

							var allImages = self.getParentImages(matrixParent.itemimages_detail);

							var matrixOptionValues = [];
							_.each(line.options,function(option){
								if (option && option.isMatrixDimension && option.value)
									matrixOptionValues.push(option.value.label)
							})

							
							
							var mainImage
							// Now we only have to pick the Image from the entire list of images
							for (var i=0 ; i< allImages.length; i++){
								var allCheck = true;
								for (var j = 0; j < matrixOptionValues.length; j++){
									if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
										
										
									}else{
										allCheck = false;
									}
								}

								if (allCheck){
									mainImage = allImages[i]
								}


							}
							
		
							if (mainImage){
								Items[lineIndex]["ImageURL"] = mainImage
							}else{
								// If we didn't found the image, we assign the first that we can
								if (allImages && allImages.length > 0)
									Items[lineIndex]["ImageURL"] = allImages[0];
		
							}
						}

						// End Handle Images

					})
	
					

					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					
					// Add new Line row
					// Not necessary
					// if (lines && lines.length > 0){
					// 	klaviyoObject["AddedItemProductName"] = lines[0].item.extras.keyMapping_name;
					// 	klaviyoObject["AddedItemProductID"] = lines[0].item.itemid;
					// 	klaviyoObject["AddedItemSKU"] = lines[0].item.extras.keyMapping_sku;
					// 	klaviyoObject["AddedItemImageURL"] = lines[0].item.extras.keyMapping_images.length > 0 ?lines[0].item.extras.keyMapping_images[0].url:"";
					// 	klaviyoObject["AddedItemURL"] = lines[0].item.extras.keyMapping_url;
					// 	klaviyoObject["AddedItemPrice"] = lines[0].rate;
					// 	klaviyoObject["AddedItemQuantity"] = lines[0].quantity;
					// }
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;
	
	
					cart.getSummary().then(function(summary) {
	
						
	
						klaviyoObject["$value"] = summary.subtotal;
	
	
	
						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},

        sendUpdateLineEvent:  function(cart,environment_component){

			var self = this;
		

			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);


			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {

					var klaviyoObject = {};

					var session = environment_component.getSession()

					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
					// ---------------------------
					// Currency
					// ---------------------------
					var currency_code = session.currency.code;
					var currency_name = session.currency.currencyname
					var currency_symbol = session.currency.symbol
					

					klaviyoObject["currency_code"] = currency_code;
					klaviyoObject["currency_name"] = currency_name;
					klaviyoObject["currency_symbol"] = currency_symbol;
					
					// ---------------------------
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;



					var Items = [];

					
					
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						var matrixParent = line.item.extras.matrix_parent;


						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine);


						// Handle Images
						
						if (matrixParent){

							var allImages = self.getParentImages(matrixParent.itemimages_detail)

							var matrixOptionValues = [];
							_.each(line.options,function(option){
								if (option && option.isMatrixDimension && option.value)
									matrixOptionValues.push(option.value.label)
							})

							
							
							var mainImage
							// Now we only have to pick the Image from the entire list of images
							for (var i=0 ; i< allImages.length; i++){
								var allCheck = true;
								for (var j = 0; j < matrixOptionValues.length; j++){
									if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
										
										
									}else{
										allCheck = false;
									}
								}

								if (allCheck){
									mainImage = allImages[i]
								}


							}
							
		
							if (mainImage){
								Items[lineIndex]["ImageURL"] = mainImage
							}else{
								// If we didn't found the image, we assign the first that we can
								if (allImages && allImages.length > 0)
									Items[lineIndex]["ImageURL"] = allImages[0];
		
							}
						}

						// End Handle Images

					})
				
					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;



					
					
	
	
					cart.getSummary().then(function(summary) {
	
						klaviyoObject["$value"] = summary.subtotal;
	

						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},



    }

	return KlaviyoCartSync;
});



define('Tavano.Klaviyo.ProductView.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProductViewSync = {


        addPossiblePriceLevels: function(line,session,klaviyoObject){

            for (var i=1; i < 50; i++ ){

                var priceLevel = line.item["pricelevel" + i];
                var priceLevelFormatted = line.item["pricelevel" + i + "_formatted"];

                if (priceLevel && priceLevelFormatted){
                    klaviyoObject["pricelevel" + i] = priceLevel;
                    klaviyoObject["pricelevel" + i + "_formatted"] = priceLevelFormatted;

                    // Adding the price level assigned to the customer in a new variable
                    // if ( i.toString() == session.priceLevel ){
                    //     klaviyoObject["PriceForCustomer"] = priceLevel;
                    //     klaviyoObject["PriceForCustomer_formatted"] = priceLevelFormatted;
                    // }
                }
                
            }
        },


        addCustomFields : function(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixChild){
            
            var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];

            _.each(customFields,function(customField){
                if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){

                    klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]

                }else{
                    klaviyoObject[customField.klaviyokey] = itemToSend[customField.nsid]
                }
                
            })

        },
        
        sendProductDetailsInfo : function(pdp,environment_component,klaviyoObject){
            
            var line = pdp.getItemInfo();

            if (!line)
                return
            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;

            
            
            if (line){

                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var parentItem = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })

                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                
                

                // storedisplayname || storedisplayname2 || displayname
                var klaviyoObject = {
                    "ProductName": itemToSend.displayname || itemToSend.storedisplayname || itemToSend.storedisplayname2 ,
                    "ProductID" : itemToSend.internalid,
                    "SKU": itemToSend.keyMapping_sku,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "URL":location.href,
                    "Price":itemToSend.keyMapping_price,
                    // "CompareAtPrice": line.item.keyMapping_comparePriceAgainst
                    
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);

                // Sending always all the images available in custom attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }
                


                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }
                

                var session = environment_component.getSession()

                // ---------------------------
                // SiteID and Domain
                // ---------------------------
                var siteId = environment_component.getConfig("siteSettings.siteid");
                var domain = location.protocol + "//" + location.host;

                klaviyoObject["site_id"] = siteId;
                klaviyoObject["domain"] = domain;
                
                // ---------------------------
                // Currency
                // ---------------------------
                var currency_code = session.currency.code;
                var currency_name = session.currency.currencyname
                var currency_symbol = session.currency.symbol
                

                klaviyoObject["currency_code"] = currency_code;
                klaviyoObject["currency_name"] = currency_name;
                klaviyoObject["currency_symbol"] = currency_symbol;
                
                // ---------------------------
                // Language
                // ---------------------------
                var language_name = session.language.name;
                klaviyoObject["language_name"] = language_name;

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------
                var price_levelInternalId = session.priceLevel;

                klaviyoObject["pricelevelID"] = price_levelInternalId;

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);
                


                var eventData = {
                    'event':'klaviyoProductViewed',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        },
        sendViewedItem : function(pdp,environment_component){
            var line = pdp.getItemInfo();
            var parentItem = line;
            
            if (!line)
                return

            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;
            

            
            
            if (line){


                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })


                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                var klaviyoObject = {
                    "Title": itemToSend.itemid,
                    "ItemId": itemToSend.internalid,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "Metadata": {
                        "Price": itemToSend.keyMapping_price,
                        // "CompareAtPrice": itemToSend.keyMapping_comparePriceAgainst
                    }
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);


                // Sending always all the images available in custome attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }

                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }

                var session = environment_component.getSession()
                
                // ---------------------------
                // Currency
                // ---------------------------
                var currency_code = session.currency.code;
                var currency_name = session.currency.currencyname
                var currency_symbol = session.currency.symbol
                

                klaviyoObject["currency_code"] = currency_code;
                klaviyoObject["currency_name"] = currency_name;
                klaviyoObject["currency_symbol"] = currency_symbol;
                
                // ---------------------------
                // Language
                // ---------------------------
                var language_name = session.language.name;
                klaviyoObject["language_name"] = language_name;

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------

                var price_levelInternalId = session.priceLevel;
                klaviyoObject["pricelevelID"] = price_levelInternalId;
                

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);

                var eventData = {
                    'event':'klaviyoViewedItem',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        }
    }

	return TavanoKlaviyoProductViewSync;
});



define('Tavano.Klaviyo.LoaderSync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoLoaderSync = {
        
        addLoader : function(){
            
            
            var loadScriptEventData = {
                'event':'klaviyoLoadScript',
                'klaviyo_data': {}
            };
            !window.loaderCompleted && window["dataLayer"].push(loadScriptEventData);
            window.loaderCompleted = true;

            Backbone.trigger("KlaviyoLoaderCompleted")
            
        }
    }

	return TavanoKlaviyoLoaderSync;
});



define('Tavano.Klaviyo.Checkout.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoCheckoutSync = {




		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},
        
        sendCheckoutInfo: function(cart,environment_component){

			var self = this;

			var session = environment_component.getSession()
			

			var klaviyoObject = {};
			
			// ---------------------------
			// Currency
			// ---------------------------
			var currency_code = session.currency.code;
			var currency_name = session.currency.currencyname
			var currency_symbol = session.currency.symbol
			

			klaviyoObject["currency_code"] = currency_code;
			klaviyoObject["currency_name"] = currency_name;
			klaviyoObject["currency_symbol"] = currency_symbol;


			// ---------------------------
			// SiteID and Domain
			// ---------------------------
			var siteId = environment_component.getConfig("siteSettings.siteid");
			var domain = location.protocol + "//" + location.host;
			
			klaviyoObject["site_id"] = siteId;
			klaviyoObject["domain"] = domain;
			
			// ---------------------------
			// Language
			// ---------------------------
			var language_name = session.language.name;

			klaviyoObject["language_name"] = language_name;

			cart.getSummary().then(function(summary) {

				klaviyoObject["$event_id"] = Date.now().toString();
				klaviyoObject["$value"] = summary.total;
				klaviyoObject["items_subtotal"] = summary.subtotal;
				klaviyoObject["$CheckoutURL"] = location.href;
				
			});

			

			cart.getLines().then(function(lines) {


				var Items = [];
				
				_.each(lines,function(line,lineIndex){

					Items.push({
						"ProductID" : line.item.itemid,
						"SKU": line.item.extras.keyMapping_sku,
						"ProductName": line.item.itemid,
						"Quantity":line.quantity,
						"ItemPrice":line.rate,
						"RowTotal":line.amount,
						"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
						"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
					})


					// Handle Images

					var matrixParent = line.item.extras.matrix_parent;
					
					if (matrixParent){

						// In this case the all images are related to the child
						// var allImages = _.map(line.item.extras.keyMapping_images,function(image){
						// 	return image.url
						// })
						

						var allImages = self.getParentImages(matrixParent.itemimages_detail)

						var matrixOptionValues = [];
						_.each(line.options,function(option){
							if (option && option.isMatrixDimension && option.value)
								matrixOptionValues.push(option.value.label)
						})

						
						
						var mainImage
						// Now we only have to pick the Image from the entire list of images
						for (var i=0 ; i< allImages.length; i++){
							var allCheck = true;
							for (var j = 0; j < matrixOptionValues.length; j++){
								if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
									
									
								}else{
									allCheck = false;
								}
							}

							if (allCheck){
								mainImage = allImages[i]
							}


						}
						
	
						if (mainImage){
							Items[lineIndex]["ImageURL"] = mainImage
						}else{
							// If we didn't found the image, we assign the first that we can
							if (allImages && allImages.length > 0)
								Items[lineIndex]["ImageURL"] = allImages[0];
	
						}
					}

					// End Handle Images

				})

				var ItemNames = _.map(lines,function(line){
					return line.item.itemid
				})

				klaviyoObject["ItemNames"] = ItemNames;
				klaviyoObject["Items"] = Items;

				var eventData = {
					'event':'klaviyoStartedCheckout',
					'klaviyo_data': klaviyoObject
				};


				
				!window.checkoutStarted && window["dataLayer"].push(eventData);
				window.checkoutStarted = true;
				


			});

        }
       
    }

	return TavanoKlaviyoCheckoutSync;
});



define('Tavano.Klaviyo.Order.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoOrderSync = {
        
        sendOrderDetailsInfo : function(cart,userprofilecomponent){

            self.cart = cart;

            if (cart){

                cart.on("beforeSubmit",function(data){

                    // Pre-save the following information
                    // Shipping Address
                    // Billing Address
                    // Customer Information

                    userprofilecomponent.getUserProfile().then(function(profile) {
                        
                        var profile = {
                            "$email": profile.email,
                            "$first_name": profile.firstname,
                            "$last_name": profile.lastname,
                            "$phone_number": profile.phoneinfo ? profile.phoneinfo.phone : "",
                            "$address1": profile.addresses.length > 0 ? profile.addresses[0].addr1 : "",
                            "$address2": profile.addresses.length > 0 ? profile.addresses[0].addr2 : "",
                            "$city": profile.addresses.length > 0 ? profile.addresses[0].city : "",
                            "$zip": profile.addresses.length > 0 ? profile.addresses[0].zip : "",
                            "$region":profile.addresses.length > 0 ? profile.addresses[0].state : "",
                            "$country": profile.addresses.length > 0 ? profile.addresses[0].country : "",
                        }

                        sessionStorage.setItem('customer_properties', JSON.stringify(profile));    
                        
                    });


                    self.cart.getShipAddress().then(function(shippingAddress) {
                        sessionStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));    
                    })

                    self.cart.getBillAddress().then(function(billingAddress) {
                        sessionStorage.setItem('billingAddress', JSON.stringify(billingAddress));    
                    })



                    cart.getLines().then(function(lines) {

                        

                        var Items = _.map(lines,function(line){
                            return {
                                "ProductID" : line.item.itemid,
                                "SKU": line.item.extras.keyMapping_sku,
                                "ProductName": line.item.extras.keyMapping_name,
                                "Quantity":line.quantity,
                                "ItemPrice":line.rate,
                                "RowTotal":line.amount,
                                "ProductURL":line.item.extras.keyMapping_url,
                                "ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
                            }
                        })
        
                        var ItemNames = _.map(lines,function(line){
                            return line.item.extras.keyMapping_name
                        })

                        sessionStorage.setItem('ItemNames', JSON.stringify(ItemNames));    

                        sessionStorage.setItem('Items', JSON.stringify(Items));    



                        
                    })

                })
    
                cart.on("afterSubmit",function(data){

                    
                    
                    var klaviyoObject = {};


                    klaviyoObject["$value"] = data.confirmation.summary.total;
                    klaviyoObject["OrderId"] = data.confirmation.tranid;

                    if (data.promocodes && data.promocodes.length > 0){

                        klaviyoObject["DiscountCode"] = "";
                        klaviyoObject["DiscountValue"] = data.confirmation.summary.extras.discounttotal_formatted;
                    }

                    
        
                    // Adding Shipping and Billing Addresses

                    var billingAddress = JSON.parse(sessionStorage.getItem('billingAddress'));
                    var shippingAddress = JSON.parse(sessionStorage.getItem('shippingAddress'));
                    var customer_properties = JSON.parse(sessionStorage.getItem('customer_properties'));
                    var Items = JSON.parse(sessionStorage.getItem('Items'));
                    var ItemNames = JSON.parse(sessionStorage.getItem('ItemNames'));


                    klaviyoObject["ItemNames"] = ItemNames;
                    klaviyoObject["Items"] = Items;
                    

                    klaviyoObject["BillingAddress"] = {

                        "FirstName": billingAddress.fullname,
                        "LastName": billingAddress.fullname,
                        "Company": billingAddress.company,
                        "Address1": billingAddress.addr1,
                        "Address2": billingAddress.addr2,
                        "City": billingAddress.city,
                        "Region": billingAddress.state,
                        "RegionCode":billingAddress.state,
                        "Country": billingAddress.country,
                        "CountryCode": billingAddress.country,
                        "Zip": billingAddress.zip,
                        "Phone": billingAddress.phone,
                    };

                    klaviyoObject["ShippingAddress"] = {
                        
                        "FirstName": shippingAddress.fullname,
                        "LastName": shippingAddress.fullname,
                        "Company": shippingAddress.company,
                        "Address1": shippingAddress.addr1,
                        "Address2": shippingAddress.addr2,
                        "City": shippingAddress.city,
                        "Region": shippingAddress.state,
                        "RegionCode":shippingAddress.state,
                        "Country": shippingAddress.country,
                        "CountryCode": shippingAddress.country,
                        "Zip": shippingAddress.zip,
                        "Phone": shippingAddress.phone,
                    };



                    // Not necessary
                    // klaviyoObject["customer_properties"] = customer_properties;

                    var addedToCartEventData = {
                        'event':'klaviyoPlacedOrder',
                        'klaviyo_data': klaviyoObject
                    };
                    // window["dataLayer"].push(addedToCartEventData);


                })

            }
        }
    }

	return TavanoKlaviyoOrderSync;
});



define('Tavano.Klaviyo.Profile.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProfileSync = {
        
        addProfile : function(profile,environment_component){
            
            if ( profile && profile.isloggedin){


                var session = environment_component.getSession()

                var price_levelInternalId = session.priceLevel;

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname,
                        "pricelevelID" : price_levelInternalId
    
                    }
                };
                
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
        },
        addProfileFromService : function(profile){

            // If it's logged in
            if (profile && profile.email){

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname
                    }
                };
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
            
        }
    }

	return TavanoKlaviyoProfileSync;
});


define('Tavano.Klaviyo.AddOrderSource.Checkout'
, [
    'Tavano.Klaviyo.OrderSource.View'
  ]
,   function
  (
    TavanoKlaviyoOrderSourceView
  )
{
  'use strict';


  var TavanoKlaviyoAddOrderSource = {

    addOrderSourceModule : function(checkout,environment_component){

        // // ----------------------------------------
        // // Add source origin to environment
        // // We allow up to 5 sites
        // // ----------------------------------------


        // var siteSource = environment_component.getConfig('Klaviyo.websource');
        
        
        

        // if (siteSource && siteSource.length > 0) 
        //     siteSource = siteSource[0]

        // var siteSourceValue;

        // switch(siteSource) {
        //     case "Site A":
        //         siteSourceValue = "1";
        //       break;
        //       case "Site B":
        //         siteSourceValue = "2";
        //       break;
        //       case "Site C":
        //         siteSourceValue = "3";
        //       break;
        //       case "Site D":
        //         siteSourceValue = "4";
        //       break;
        //       case "Site E":
        //         siteSourceValue = "5";
        //       break;
        //     default:
        //         siteSourceValue = "1";
        //   }

        // window.siteSource = siteSourceValue;


        // try{

        //     checkout.addModuleToStep(
        //         {
        //             step_url: 'opc'
        //             , module: {
        //                 id: 'TavanoKlaviyoOrderSourceView'
        //                 , index: 6
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });
        
        //         checkout.addModuleToStep(
        //         {
        //             step_url: 'review'
        //             , module: {
        //                 id: 'Tavano.KlaviyoOrderSourceView'
        //                 , index: 99
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });

        // }catch(e){

        // }
    }
 }


  return TavanoKlaviyoAddOrderSource

});





define('Tavano.Klaviyo.Checkout.Sync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoCheckoutSync = {




		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},

		addCustomFields : function(line,parentItem,environment_component,klaviyoObject,isMatrixChild){

			
			try{
				var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];

				_.each(customFields,function(customField){
					if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){
	
						klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]
	
					}else{
						
						if (customField && customField.nsid == "displayname"){
							klaviyoObject[customField.klaviyokey] = line.item.displayname
						}else{
							klaviyoObject[customField.klaviyokey] = line.item.extras[customField.nsid]
						}

					}
					
				})
			}catch(e){
				console.log("Impossible to add custom fields");
				console.log(JSON.stringify(e))
			}
        },
        
        sendCheckoutInfo: function(cart,environment_component){

			var self = this;

			var session = environment_component.getSession()
			

			var klaviyoObject = {};
			
			// ---------------------------
			// Currency
			// ---------------------------
			var currency_code = session.currency.code;
			var currency_name = session.currency.currencyname
			var currency_symbol = session.currency.symbol
			

			klaviyoObject["currency_code"] = currency_code;
			klaviyoObject["currency_name"] = currency_name;
			klaviyoObject["currency_symbol"] = currency_symbol;


			// ---------------------------
			// SiteID and Domain
			// ---------------------------
			var siteId = environment_component.getConfig("siteSettings.siteid");
			var domain = location.protocol + "//" + location.host;
			
			klaviyoObject["site_id"] = siteId;
			klaviyoObject["domain"] = domain;
			
			// ---------------------------
			// Language
			// ---------------------------
			var language_name = session.language.name;

			klaviyoObject["language_name"] = language_name;

			cart.getSummary().then(function(summary) {

				klaviyoObject["$event_id"] = Date.now().toString();
				klaviyoObject["$value"] = summary.total;
				klaviyoObject["items_subtotal"] = summary.subtotal;
				klaviyoObject["$CheckoutURL"] = location.href;
				
			});

			

			cart.getLines().then(function(lines) {


				var Items = [];
				
				_.each(lines,function(line,lineIndex){

					var dataLine = {
						"ProductID" : line.item.internalid,
						"SKU": line.item.extras.keyMapping_sku,
						"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
						"Quantity":line.quantity,
						"ItemPrice":line.rate,
						"RowTotal":line.amount,
						"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
						"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
					}
					
					// Handle Images

					var matrixParent = line.item.extras.matrix_parent;
					
					self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)

					Items.push(dataLine)
					
					if (matrixParent){

						// In this case the all images are related to the child
						// var allImages = _.map(line.item.extras.keyMapping_images,function(image){
						// 	return image.url
						// })
						

						var allImages = self.getParentImages(matrixParent.itemimages_detail)

						var matrixOptionValues = [];
						_.each(line.options,function(option){
							if (option && option.isMatrixDimension && option.value)
								matrixOptionValues.push(option.value.label)
						})

						
						
						var mainImage
						// Now we only have to pick the Image from the entire list of images
						for (var i=0 ; i< allImages.length; i++){
							var allCheck = true;
							for (var j = 0; j < matrixOptionValues.length; j++){
								if (allImages[i].indexOf(matrixOptionValues[j])!= -1){
									
									
								}else{
									allCheck = false;
								}
							}

							if (allCheck){
								mainImage = allImages[i]
							}


						}
						
	
						if (mainImage){
							Items[lineIndex]["ImageURL"] = mainImage
						}else{
							// If we didn't found the image, we assign the first that we can
							if (allImages && allImages.length > 0)
								Items[lineIndex]["ImageURL"] = allImages[0];
	
						}
					}

					// End Handle Images

				})

				var ItemNames = _.map(Items,function(item){
					return item["ProductName"]
				})

				klaviyoObject["ItemNames"] = ItemNames;
				klaviyoObject["Items"] = Items;

				var eventData = {
					'event':'klaviyoStartedCheckout',
					'klaviyo_data': klaviyoObject
				};


				
				!window.checkoutStarted && window["dataLayer"].push(eventData);
				window.checkoutStarted = true;
				


			});

        }
       
    }

	return TavanoKlaviyoCheckoutSync;
});



define('Tavano.Klaviyo.LoaderSync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoLoaderSync = {
        
        addLoader : function(){
            
            
            var loadScriptEventData = {
                'event':'klaviyoLoadScript',
                'klaviyo_data': {}
            };
            !window.loaderCompleted && window["dataLayer"].push(loadScriptEventData);
            window.loaderCompleted = true;

            Backbone.trigger("KlaviyoLoaderCompleted")
            
        }
    }

	return TavanoKlaviyoLoaderSync;
});


define('Tavano.Klaviyo.OrderSource.View'
, [
    'Wizard.Module'

  , 'tavano_klaviyo_klaviyoordersource.tpl'
  ]
, function (
    WizardModule

  , tavano_klaviyo_klaviyoordersource
  )
{
  'use strict';

  return WizardModule.extend({

    template: tavano_klaviyo_klaviyoordersource,

   
    

   getContext: function getContext()
    {
      try{
          
        // if (this && this.model){
        //   var wizardModule = this.model;
        //   var options = wizardModule.get('options');
          

        //   options.custbody_tt_klaviyo_order_source = window.siteSource;

        //   wizardModule.set('options',options);
        // }
          
      }catch(e){
          // console.log("Klaviyo Error trying to set order source: ");
          console.log(e);
      }
        
      return {};
    }
  });
});



define('Tavano.Klaviyo.Profile.Sync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProfileSync = {
        
        addProfile : function(profile,environment_component){
            
            if ( profile && profile.isloggedin){


                var session = environment_component.getSession()

                var price_levelInternalId = session.priceLevel;

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname,
                        "pricelevelID" : price_levelInternalId
    
                    }
                };
                
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
        },
        addProfileFromService : function(profile){

            // If it's logged in
            if (profile && profile.email){

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname
                    }
                };
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
            
        }
    }

	return TavanoKlaviyoProfileSync;
});


// @module Tavano.Klaviyo.Profile.Model
define(
	'Tavano.Klaviyo.Profile.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	,	Utils
	)
{
  return Backbone.Model.extend({

    url: function url ()
    {
      // var url = _.getAbsoluteUrl(getExtensionAssetsPath('services/QuestionsAndAnswers.Service.ss'));
        var urlRoot = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
							"services/KlaviyoProfile.Service.ss"
					)
			)

      return urlRoot;
    }
  })


});


// @module Tavano.Klaviyo.Checkout.Profile.Model
define(
	'Tavano.Klaviyo.Checkout.Profile.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	,	Utils
	)
{
  return Backbone.Model.extend({

    url: function url ()
    {
      // var url = _.getAbsoluteUrl(getExtensionAssetsPath('services/QuestionsAndAnswers.Service.ss'));
        var urlRoot = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
							"services/KlaviyoProfile.Service.ss"
					)
			)

      return urlRoot;
    }
  })


});


// Model.js
// -----------------------
// @module Case
define("Tavano.Klaviyo.KlaviyoProfile.Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/KlaviyoProfile.Service.ss"
            )
        )
        
});
});



define(
	'Tavano.Klaviyo.Klaviyo.Checkout'
,   [
		
		
		'Tavano.Klaviyo.LoaderSync.Checkout',
		'Tavano.Klaviyo.Checkout.Sync.Checkout',
		
		'Tavano.Klaviyo.Profile.Sync.Checkout',
		'Tavano.Klaviyo.AddOrderSource.Checkout',
		'Tavano.Klaviyo.Checkout.Profile.Model'
		
	]
,   function (
		
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoCheckoutSync,
		
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoAddOrderSourceCheckout,
		TavanoKlaviyoCheckoutProfileModel
		
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{
			

			var userprofilecomponent = container.getComponent("UserProfile");
			var checkout = container.getComponent('Checkout');
			var cart = container.getComponent('Cart');
			var environment_component = container.getComponent("Environment");



			// ---------------------
			// Order Source
			// ---------------------
			
			TavanoKlaviyoAddOrderSourceCheckout.addOrderSourceModule(checkout,environment_component)



			// Manage Guest Checkout
			// Manage Login/Register
			checkout && checkout.on("afterShowContent", function() {


				if (userprofilecomponent){

					userprofilecomponent.getUserProfile().then(function(profile) {
					

						if (!window.isProfileLoaded && profile && profile.isloggedin){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					});

				}else{

					// We might be in a version with no support for UserProfile Component
					var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
					klaviyoProfileModel.fetch().done(function(result){


						
						if (!window.isProfileLoaded && result && result.email){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					})

				}

			})

			
			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					

					
					if (userprofilecomponent){

						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && profile && profile.isloggedin){

								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
								
							}

						});

					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
						klaviyoProfileModel.fetch().done(function(result){


							TavanoKlaviyoProfileSync.addProfileFromService(result);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && result && result.email){
								
								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
							}


						})
					}

					
				}, 2000);

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});


};

extensions['AwaLabs.LayoutClass.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/LayoutClass/2.0.0/' + asset;
}

define("AwaLabs.LayoutClass", [
    'underscore'
], function AwaLabsLayoutClass(
    _
){
    'use strict';

    return {
        addClassToLayout: function addClassToLayout(Layout,view){
            Layout.$('#layout').removeClass().addClass(this.layoutClass).addClass('sec_'+view.template.Name);
        },
        mountToApp: function(application){
            var Layout = application.getLayout();
            var self = this;
            Layout.once('afterAppendView',function(view){
                self.layoutClass = Layout.$('#layout').attr('class');
                self.addClassToLayout(Layout,view);
                Layout.on('afterAppendView',function(view){
                    if(!view.inModal){
                        self.addClassToLayout(Layout,view);
                    }
                });
            });
        }
    }
});


};

extensions['AwaLabs.LoginRegisterTrade.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/LoginRegisterTrade/2.1.0/' + asset;
}

/* global getExtensionAssetsPath */
define('LoginRegisterTrade.Model', [
    'SCModel',
    'Utils',
    'underscore'
], function LoginRegisterTradeModelDefinition(
    SCModelComponent,
    Utils,
    _
) {
    'use strict';

    var validateTaxId = function validateTaxId(data) {
        // nine digits number
        if ((!data || (!(/^\d{9}$/.test(data)) && !(/\d{2}-\d{7}/.test(data)))) && this.get('selectedCountry') === 'US') {
            return Utils.translate('Please enter your nine digit Tax ID Number');
        } else if (data && (!(/^\d{9}$/.test(data)) && !(/\d{2}-\d{7}/.test(data)))) {
            return Utils.translate('Please enter your nine digit Tax ID Number');
        }
        return undefined;
    };

    var validateResale = function validateResale(data) {
        if (data && data.length < 9 && this.get('selectedCountry') === 'US') {
            return Utils.translate('Resale Number is invalid');
        }
        return undefined;
    };

    var validateBusinessYears = function validateBusinessYears(businessYears) {
        if (businessYears && _.isNaN(parseInt(businessYears, 10))) {
            return Utils.translate('Please enter a valid number of years');
        }
        return undefined;
    };

    var validatePhoneNotRequired = function validatePhoneNotRequired(phone) {
        var minLength = 7;
        var value;

        if (_.isNumber(phone)) {
            // phone is a number so we can't ask for .length
            // we elevate 10 to (minLength - 1)
            // if the number is lower, then its invalid
            // eg: phone = 1234567890 is greater than 1000000, so its valid
            //     phone = 123456 is lower than 1000000, so its invalid
            if (phone < Math.pow(10, minLength - 1)) {
                return Utils.translate('Phone Number is invalid');
            }
        } else if (phone && this.get('selectedCountry') === 'US') {
            // if its a string, we remove all the useless characters
            value = phone.replace(/[()-.\s]/g, '');
            // we then turn the value into an integer and back to string
            // to make sure all of the characters are numeric

            // first remove leading zeros for number comparison
            while (value.length && value.substring(0, 1) === '0') {
                value = value.substring(1, value.length);
            }
            if (parseInt(value, 10).toString() !== value || value.length < minLength) {
                return Utils.translate('Phone Number is invalid');
            }
        }
        return undefined;
    };

    var validateZipCode = function validateZipCode(value, _valName, form) {
        var countries = SC.ENVIRONMENT.siteSettings.countries || {};
        if (
            !value && (
                (!form.country || countries[form.country])
                && countries[form.country]
                && countries[form.country].isziprequired === 'T'
            )
        ) {
            return Utils.translate('Zip Code is required');
        }

        return undefined;
    };

    var validateOfficePhone = function validateOfficePhone(phone) {
        var minLength = 10;
        var maxLength = 10;
        var isValid = true;
        var value;

        if (_.isNumber(phone)) {
            // phone is a number so we can't ask for .length
            // we elevate 10 to (minLength - 1)
            // if the number is lower, then its invalid
            // eg: phone = 1234567890 is greater than 1000000, so its valid
            //     phone = 123456 is lower than 1000000, so its invalid
            if (phone < Math.pow(10, minLength - 1)) {
                isValid = false;
            }
        } else if (phone && this.get('selectedCountry') === 'US') {
            // if its a string, we remove all the useless characters
            value = phone.replace(/[()-.\s]/g, '');
            // we then turn the value into an integer and back to string
            // to make sure all of the characters are numeric

            // first remove leading zeros for number comparison
            while (value.length && value.substring(0, 1) === '0') {
                value = value.substring(1, value.length);
            }
            if (parseInt(value, 10).toString() !== value || value.length < minLength || value.length > maxLength) {
                isValid = false;
            }
        } else if (phone && this.get('selectedCountry') === 'Other') {
            if (phone < Math.pow(7, minLength - 1)) {
                return 'Phone number must be at least 7 digit long.';
            }
        } else if (!phone) {
            return _('Phone Number is required').translate();
        }
        if (!isValid) {
            return _('Phone Number is invalid. Should be Area Code and Phone Number').translate();
        }
        return undefined;
    };

    var SCModel = SCModelComponent.SCModel;

    var LoginRegisterTradeModel = function LoginRegisterTradeModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('services/LoginRegisterTrade.Service.ss')
            );
        };

        this.validation = {
            country: {
                required: true,
                msg: Utils.translate('Country is required')
            },
            firstName: {
                required: true,
                msg: Utils.translate('First Name is required')
            },
            lastName: {
                required: true,
                msg: Utils.translate('Last Name is required')
            },
            email: {
                required: true,
                pattern: 'email',
                msg: Utils.translate('Valid Email is required')
            },
            email2: [
                {
                    required: true,
                    msg: Utils.translate('Confirm email is required')
                },
                {
                    equalTo: 'email',
                    msg: Utils.translate('Email and Confirm Email do not match')
                }
            ],
            companyName: {
                required: true,
                msg: Utils.translate('Company Name is required')
            },
            password: {
                required: true,
                minLength: 8,
                msg: Utils.translate('Please enter a valid password, min length 8.')
            },
            password2: [
                {
                    required: true,
                    msg: Utils.translate('Confirm password is required')
                },
                {
                    equalTo: 'password',
                    msg: Utils.translate('New Password and Confirm Password do not match')
                }
            ],
            taxId: {
                fn: validateTaxId
            },
            taxResaleNumber: {
                fn: validateResale
            },
            officePhone: {
                fn: validateOfficePhone
            },
            cellPhone: {
                fn: validatePhoneNotRequired
            },
            street: {
                required: true,
                msg: Utils.translate('Address is required')
            },
            city: {
                required: true,
                msg: Utils.translate('City is required')
            },
            state: {
                fn: Utils.validateState
            },
            zip: {
                fn: validateZipCode
            },
            numberOfYearsInBusiness: {
                fn: validateBusinessYears
            }
        };
    };

    LoginRegisterTradeModel.prototype = Object.create(SCModel.prototype);

    LoginRegisterTradeModel.prototype.constructor = LoginRegisterTradeModel;

    return LoginRegisterTradeModel;
});


define('LoginRegisterTrade.Retail.View', [
    'LoginRegister.Register.View',
    'loginregister_retail.tpl',
    'Dialog.Service',
    'Loggers',
    'Profile.Model',
    'LiveOrder.Model',
    'Backbone',
    'Utils',
    'underscore'
], function LoginRegisterTradeView(
    LoginRegisterRegisterView,
    loginRegisterRetailTpl,
    DialogService,
    Loggers,
    ProfileModel,
    LiveOrderModel,
    Backbone,
    Utils,
    _
) {
    'use strict';

    return LoginRegisterRegisterView.extend({
        template: loginRegisterRetailTpl,

        events: _.extend(LoginRegisterRegisterView.prototype.events, {
            'submit form': 'customSaveForm'
        }),
        bindings: _.extend(LoginRegisterRegisterView.prototype.bindings, {
            '[name="email2"]': 'email2'
        }),

        redirect: function redirect(_context, response) {
            var self = this;
            var url;

            return this.cancelableTrigger('after:LoginRegister.register').then(function event() {
                var urlOptions = Utils.parseUrlOptions(window.location.search);
                var application = self.application;
                var profileModel;

                if (urlOptions.is && urlOptions.is === 'checkout') {
                    profileModel = ProfileModel.getInstance();

                    if (response.user) {
                        profileModel.set(response.user);
                    }
                    if (response.cart) {
                        LiveOrderModel.getInstance().set(response.cart);
                    }
                    if (response.address) {
                        profileModel.get('addresses').reset(response.address);
                    }
                    if (response.paymentmethod) {
                        profileModel.get('paymentmethods').reset(response.paymentmethod);
                    }

                    // Track Guest Checkout Event
                    self.trackEvent(function track() {
                        application.Configuration.currentTouchpoint = 'checkout';
                    });
                } else {
                    // Track Login Event
                    self.trackEvent(function trackEvent() {
                        var touchpoints = response.touchpoints;

                        // if we know from which touchpoint the user is coming from
                        if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                            // we save the url to that touchpoint
                            url = touchpoints[urlOptions.origin];
                            // if there is an specific hash
                            if (urlOptions.origin_hash) {
                                // we add it to the url as a fragment
                                url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                            }
                        }
                    });
                }
            });
        },

        customSaveForm: function customSaveForm(e, model, props) {
            var application = this.application;
            var environment = application.getComponent('Environment');
            var customRegisterMessage = environment.getConfig('tradeCustomerTradeRegisterText');
            var promise = this.saveForm(e, model, props);
            var self = this;

            e.preventDefault();

            return promise && promise.done(function promiseSuccessCallback(data) {
                var loggers = Loggers && Loggers.Loggers.getLogger();
                var actionId = loggers.start('Customer Registration');

                if (data.user && data.user.internalid) {
                    loggers.end(actionId, {
                        operationIds: self.model.getOperationIds(),
                        status: 'success'
                    });
                    new DialogService(self.options.application).openDialog({
                        name: Utils.translate('Pending Retail Approval - Logged In'),
                        bodyHtml: Utils.translate(customRegisterMessage),
                        headerText: Utils.translate(''),
                        hideOkButton: true,
                        onClose: function onClose() {
                            var urlOptions = Utils.parseUrlOptions(window.location.search);
                            var url;

                            if (urlOptions.is && urlOptions.is === 'checkout') {
                                application.Configuration.currentTouchpoint = 'checkout';
                                Backbone.history.navigate('', { trigger: true });
                            } else if (urlOptions.origin && data.touchpoints[urlOptions.origin]) {
                                url = data.touchpoints[urlOptions.origin];
                                if (urlOptions.origin_hash) {
                                    url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                                }
                                window.location.href = url;
                            } else {
                                window.location.href = data.touchpoints.home;
                            }
                        }
                    });
                } else {
                    self.showError(data.errorMessage || 'Error creating your account.');
                }
            });
        }
    });
});


define('LoginRegisterTrade.Trade.View', [
    'loginregister_trade.tpl',
    'LoginRegisterTrade.Model',
    'LoginRegisterTrade.Form.Model',
    'Dialog.Service',
    'GlobalViews.CountriesDropdown.View',
    'GlobalViews.States.View',
    'Backbone',
    'Backbone.FormView',
    'AjaxRequestsKiller',
    'Utils',
    'jQuery',
    'underscore'
], function LoginRegisterTradeView(
    loginRegisterTradeTpl,
    LoginRegisterTradeModel,
    LoginRegisterTradeFormModel,
    DialogService,
    CountriesDropdownView,
    GlobalViewsStatesView,
    Backbone,
    BackboneFormView,
    AjaxRequestsKiller,
    Utils,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        title: Utils.translate('Register Trade'),

        pageTitle: Utils.translate('Register Trade'),

        template: loginRegisterTradeTpl,

        events: {
            'submit form': 'customSaveForm',
            'blur [data-action="formatPhoneOffice"]': 'formatPhone',
            'blur [data-action="formatPhoneCell"]': 'formatPhone',
            'change [data-action="selectstate"]': 'eraseZip',
            'change [data-action="inputstate"]': 'eraseZip',
            'change [data-action="selectcountry"]': 'updateStatesEvent'
        },

        childViews: {
            'CountriesDropdown': function CountriesDropdown() {
                return new CountriesDropdownView({
                    countries: this.countries,
                    selectedCountry: this.selectedCountry,
                    manage: false
                });
            },
            'StatesView': function StatesView() {
                return new GlobalViewsStatesView({
                    countries: this.countries,
                    selectedCountry: this.selectedCountry,
                    selectedState: this.model.get('state'),
                    manage: false
                });
            }
        },

        bindings: {
            '[name="firstName"]': 'firstName',
            '[name="lastName"]': 'lastName',
            '[name="companyName"]': 'companyName',
            '[name="webSite"]': 'webSite',
            '[name="businessType"]': 'businessType',
            '[name="taxId"]': 'taxId',
            '[name="taxResaleNumber"]': 'taxResaleNumber',
            '[name="officePhone"]': 'officePhone',
            '[name="email"]': 'email',
            '[name="email2"]': 'email2',
            '[name="password"]': 'password',
            '[name="password2"]': 'password2',
            '[name="street"]': 'street',
            '[name="street2"]': 'street2',
            '[name="city"]': 'city',
            '[name="country"]': 'country',
            '[name="zip"]': 'zip'
        },

        initialize: function initialize(options) {
            this.environment = options.environment;
            this.countries = this.environment.getSiteSetting('countries');
            this.model = new LoginRegisterTradeModel();
            this.formModel = new LoginRegisterTradeFormModel();
            this.selectedCountry = this.environment.getConfig('siteSettings.defaultshipcountry') || _.first(_.keys(this.countries));
            this.selectedCountryGroup = this.selectedCountry === 'US' ? 'US' : 'Other';
            this.selectedCountry = this.selectedCountry || 'US';
            this.model.set('country', this.selectedCountry);
            BackboneFormView.add(this);
        },

        updateStatesEvent: function updateStatesEvent(e) {
            var value = this.$(e.currentTarget).val();

            this.updateStates(value);
        },

        updateStates: function updateStates(selectedCountry) {
            this.getChildViewInstance('StatesView').options.selectedCountry = selectedCountry;
            this.getChildViewInstance('StatesView').render();
            this.eraseZip();
        },

        customSaveForm: function customSaveForm(e) {
            var promise = BackboneFormView.saveForm.apply(this, arguments);
            var self = this;

            e.preventDefault();

            return promise && promise.done(function promiseSuccessCallback(data) {
                var performTrackedRedirection;

                if (data.success === true) {
                    performTrackedRedirection = function performTrackedRedirectionFn() {
                        var urlOptions = Utils.parseUrlOptions(window.location.search);
                        var touchpoints = SC.ENVIRONMENT.siteSettings.touchpoints;
                        var url;

                        if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                            // we save the URL to that touchpoint
                            url = touchpoints[urlOptions.origin];
                            // if there is an specific hash
                            if (urlOptions.origin_hash) {
                                // we add it to the URL as a fragment
                                url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                            }
                            window.location.href = url;
                        } else {
                            // otherwise we need to take it to home
                            window.location.href = touchpoints.home;
                        }
                    };

                    new DialogService(self.options.application).openDialog({
                        name: Utils.translate('Pending Trade Approval - Logged In'),
                        bodyHtml: Utils.translate('You will receive an email confirmation requesting copies ' +
                            ' of your business information to speed up the approval process <br>' +
                            '1. Current Business Licence, <br>' +
                            '2. Resale or Sales Certificate, OR <br>' +
                            '3. W9, Federal ID Form or EIN Form ' +
                            '(<a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank">download a blank W9 here</a>)'),
                        headerText: Utils.translate('Thank you! Your application has been received.'),
                        onClose: function onClose() {
                            performTrackedRedirection();
                        }
                    });
                } else {
                    self.showError(data.errorMessage || 'Error creating your account.');
                }
            });
        },

        formatPhone: function formatPhone(e) {
            var target = jQuery(e.target);

            target.val(Utils.formatPhone(target.val(), '(123) 456-7890'));
        },

        eraseZip: function eraseZip() {
            var selectedCountry = this.$('[name="country"]').val();
            var countries = this.countries;
            var zipFieldset = this.$('[data-input="zip"]');
            var zipInput = this.$('input[name="zip"]', zipFieldset);

            zipInput.val('');

            if (countries[selectedCountry] && countries[selectedCountry].isziprequired === 'F') {
                zipFieldset.hide();
            } else {
                zipFieldset.show();
            }
        },

        beforeShowContent: function beforeShowContent() {
            return this.formModel.fetch({
                killerId: AjaxRequestsKiller.getKillerId()
            });
        },

        getContext: function getContext() {
            return {
                businessOptions: this.formModel.get('businessOptions') || [],
                selectedCountryGroupUS: this.selectedCountryGroup === 'US'
            };
        }
    });
});


define('LoginRegisterTrade.Account.Register.Model', [
    'Account.Register.Model',
    'Utils',
    'underscore',
    'Utils'
], function LoginRegisterTradeAccountRegisterModel(
    AccountRegisterModel,
    Utils,
    _
) {
    'use strict';

    _.extend(AccountRegisterModel.prototype, {
        validation: _.extend(AccountRegisterModel.prototype.validation, {
            company: {
                required: false
            },
            email2: [
                {
                    required: true,
                    msg: Utils.translate('Confirm email is required')
                },
                {
                    equalTo: 'email',
                    msg: Utils.translate('New Email and Confirm Email do not match')
                }
            ]
        })
    });
});


define('LoginRegisterTrade.LoginRegister.Register.View', [
    'LoginRegister.Register.View',
    'Profile.Model',
    'LiveOrder.Model',
    'Configuration',
    'Backbone',
    'Utils',
    'underscore'
], function LoginRegisterTradeLoginRegisterRegisterView(
    LoginRegisterRegisterView,
    ProfileModel,
    LiveOrderModel,
    Configuration,
    Backbone,
    Utils,
    _
) {
    'use strict';

    _.extend(LoginRegisterRegisterView.prototype, {
        redirect: function redirect(_context, response) {
            var self = this;

            return this.cancelableTrigger('after:LoginRegister.register').then(function thenFn() {
                var urlOptions = Utils.parseUrlOptions(window.location.search);
                var touchpoints = response.touchpoints;
                var application = self.application;
                var profileModel;
                var url;

                if (urlOptions.is && urlOptions.is === 'checkout') {
                    profileModel = ProfileModel.getInstance();

                    if (response.user) {
                        profileModel.set(response.user);
                    }
                    if (response.cart) {
                        LiveOrderModel.getInstance().set(response.cart);
                    }
                    if (response.address) {
                        profileModel.get('addresses').reset(response.address);
                    }
                    if (response.paymentmethod) {
                        profileModel.get('paymentmethods').reset(response.paymentmethod);
                    }

                    // Track Guest Checkout Event
                    self.trackEvent(function trackEvent() {
                        application.Configuration.currentTouchpoint = 'checkout';
                        Backbone.history.navigate('', { trigger: true });
                    });
                } else {
                    // Track Login Event
                    self.trackEvent(function trackEventFn() {
                        // if we know from which touchpoint the user is coming from
                        if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                            // we save the url to that touchpoint
                            url = touchpoints[urlOptions.origin];
                            // if there is an specific hash
                            if (urlOptions.origin_hash) {
                                // we add it to the url as a fragment
                                url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                            }
                            window.location.href = url;
                        } else if (
                            Configuration.getRegistrationType() !== 'disabled' &&
                            SC.ENVIRONMENT.siteSettings.siteloginrequired === 'T'
                        ) {
                            window.location.href = touchpoints.home;
                        } else {
                            // otherwise we need to take it to the login page
                            window.location.href = touchpoints.login;
                        }
                    });
                }
            });
        }
    });
});


define('LoginRegisterTrade.LoginRegister.Login.View', [
    'LoginRegister.Login.View',
    'Dialog.Service',
    'Utils',
    'underscore'
], function LoginRegisterTradeLoginRegisterLoginView(
    LoginRegisterLoginView,
    DialogService,
    Utils,
    _
) {
    'use strict';

    _.extend(LoginRegisterLoginView.prototype, {
        redirect: function redirect(context, response) {
            var self = this;

            var performTrackedRedirection = function performTrackedRedirection() {
                var urlOptions = Utils.parseUrlOptions(window.location.search);
                var touchpoints = response.touchpoints;
                var isPasswordReset = urlOptions.passwdret;
                var url;

                // Track Login Event
                self.trackEvent(function trackEvent() {
                    if (
                        !isPasswordReset &&
                        (urlOptions.is === 'checkout' || urlOptions.origin === 'checkout')
                    ) {
                        self.refreshApplication(response);
                    } else if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                        // we save the URL to that touchpoint
                        url = touchpoints[urlOptions.origin];
                        // if there is an specific hash
                        if (urlOptions.origin_hash) {
                            // we add it to the URL as a fragment
                            url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                        }
                        window.location.href = url;
                    } else {
                        // otherwise we need to take it to home
                        window.location.href = touchpoints.home;
                    }
                });
            };

            // If user is pending trade approval, before redirecting, display a popup dialog
            if (context.get('user').isPendingTradeApproval) {
                new DialogService(this.application).openDialog({
                    name: 'Pending Trade Approval - Logged In',
                    onClose: function onClose() {
                        performTrackedRedirection();
                    }
                });
            } else {
                performTrackedRedirection();
            }
        }
    });
});


/* global getExtensionAssetsPath */
define('LoginRegisterTrade.Form.Model', [
    'SCModel',
    'Utils'
], function LoginRegisterTradeFormModelDefinition(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    var LoginRegisterTradeFormModel = function LoginRegisterTradeFormModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('services/LoginRegisterTrade.Form.Service.ss')
            );
        };
    };

    LoginRegisterTradeFormModel.prototype = Object.create(SCModel.prototype);

    LoginRegisterTradeFormModel.prototype.constructor = LoginRegisterTradeFormModel;

    return LoginRegisterTradeFormModel;
});


define('AwaLabs.LoginRegisterTrade', [
    'LoginRegisterTrade.Trade.View',
    'LoginRegisterTrade.Retail.View',
    'jQuery',
    'Backbone',
    'Utils',
    'LoginRegisterTrade.Account.Register.Model',
    'LoginRegisterTrade.LoginRegister.Register.View',
    'LoginRegisterTrade.LoginRegister.Login.View'
], function AwaLabsLoginRegisterTrade(
    LoginRegisterTradeTradeView,
    LoginRegisterTradeRetailView,
    jQuery,
    Backbone,
    Utils
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');

            if (layout) {
                layout.addToViewEventsDefinition(
                    'LoginRegister.Register.View',
                    'click [data-action="link-register"]',
                    function setValueInDropDown(event) {
                        var a = jQuery(event.target);
                        var text = a.html();
                        var link = a.data('link');

                        jQuery('#customer-type-dropdown').html(text);
                        jQuery('#btnRedirect').attr('data-link', link);
                    }
                );
                layout.addToViewEventsDefinition(
                    'LoginRegister.Register.View',
                    'click [data-action="submit"]',
                    function setValueInDropDown(event) {
                        var a = jQuery(event.target);
                        var link = a.data('link');

                        event.preventDefault();
                        event.stopPropagation();
                        if (link) {
                            Backbone.history.navigate(link, { trigger: true, replace: true });
                        } else {
                            layout.showMessage({
                                type: 'error',
                                message: Utils.translate('Please select a customer type')
                            });
                        }
                    }
                );
                layout.addToViewContextDefinition('LoginRegister.Register.View', 'tradeSelectText', 'string', function fn() {
                    return environment.getConfig('tradeCustomerTradeSelectText');
                });
                layout.addToViewContextDefinition('LoginRegister.Register.View', 'retailSelectText', 'string', function fn() {
                    return environment.getConfig('tradeCustomerRetailsSelectText');
                });
            }
            if (pageType) {
                pageType.registerPageType({
                    name: 'register-trade',
                    view: LoginRegisterTradeTradeView,
                    routes: ['register-trade'],
                    options: { 'environment': environment }
                });
                pageType.registerPageType({
                    name: 'register-retail',
                    view: LoginRegisterTradeRetailView,
                    routes: ['register-retail']
                });
            }
        }
    };
});


};

extensions['AwaLabs.OrderStatusImprovementsHandlebarsExtras.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/OrderStatusImprovementsHandlebarsExtras/2.0.0/' + asset;
}

define('AwaLabs.OrderStatusImprovementsHandlebarsExtras', [
    'Utils',
    'Handlebars'
], function AwaLabsOrderStatusImprovementsHandlebarsExtras(
    Utils,
    Handlebars
) {
    'use strict';

    Handlebars.registerHelper('formatPriceDecimals', function formatPriceDecimals(priceString) {
        var price = (priceString && priceString[0] === '$') ? priceString.substr(1) : priceString;
        price = parseFloat(price.split(',').join('')).toFixed(2); // removed commas
        return new Handlebars.SafeString(Utils.formatCurrency(price));
    });
});


};

extensions['AwaLabs.OrderWizardModuleCartSummaryHideTax.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/OrderWizardModuleCartSummaryHideTax/2.0.0/' + asset;
}

define('AwaLabs.OrderWizardModuleCartSummaryHideTax', [], function OrderWizardModuleCartSummaryHideTax() {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition('OrderWizard.Module.CartSummary', 'showTax', 'boolean', function fn(context) {
                    return context.model && context.model.summary && context.model.summary.taxtotal !== 0;
                });
            }
        }
    };
});


};

extensions['SuiteLabs.OuterCSS.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/OuterCSS/1.0.0/' + asset;
}

define('SuiteLabs.OuterCSS.MyAccount', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSMyAccount(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.myaccount');
        }
    };
});


define('SuiteLabs.OuterCSS.Shopping', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSShopping(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.shopping');
        }
    };
});


define('SuiteLabs.OuterCSS.Helper', [
    'jQuery'
], function SuiteLabsOuterCSSHelper(
    jQuery
) {
    'use strict';

    return {
        appendOuterFile: function appendOuterFile(container, configKey) {
            var environment = container.getComponent('Environment');
            var element;
            var outerFile = environment ?
                environment.getConfig(configKey) :
                container.getConfig(configKey);

            if (!outerFile || (typeof outerFile !== 'string')) {
                return;
            }

            element = jQuery('link[id=outercss]');

            if (!element.length) {
                jQuery('<link id="outercss" rel="stylesheet">').attr('href', outerFile).appendTo(jQuery('head'));
            } else {
                element.attr('href', outerFile);
            }
        }
    };
});


define('SuiteLabs.OuterCSS.Checkout', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSCheckout(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.checkout');
        }
    };
});


};

extensions['AwaLabs.SEOImprovements.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/SEOImprovements/2.0.0/' + asset;
}

define('AwaLabs.SEOImprovements', [
], function SEOImprovements() {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var environmentComponent = application.getComponent('Environment');
            if (layout) {
                layout.addToViewContextDefinition('Header.Logo.View', 'logoUrl', 'string', function fn() {
                    return environmentComponent.getConfig('header.logoUrl');
                });
                layout.addToViewContextDefinition('Header.Logo.View', 'siteName', 'string', function fn(context) {
                    return context.headerLinkTitle || environmentComponent.getConfig('seo.siteTitle');
                });
            }
        }
    };
});


};

extensions['AwaLabs.SocialMedia.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/SocialMedia/2.1.0/' + asset;
}

define('SocialMedia.View', [
    'SCView',
    'social-media.tpl'
], function SocialMediaViewModule(
    SCViewComponent,
    SocialMediaTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function SocialMediaView(options) {
        SCView.call(this);
        this.environment = options.environment;
        this.template = SocialMediaTpl;
    }

    SocialMediaView.prototype = Object.create(SCView.prototype);

    SocialMediaView.prototype.constructor = SocialMediaView;

    SocialMediaView.prototype.getContext = function getContext() {
        return {
            facebookUrl: this.environment.getConfig('socialmedia.facebookUrl'),
            linkedinUrl: this.environment.getConfig('socialmedia.linkedinUrl'),
            youtubeUrl: this.environment.getConfig('socialmedia.youtubeUrl'),
            twitterUrl: this.environment.getConfig('socialmedia.twitterUrl'),
            instagramUrl: this.environment.getConfig('socialmedia.instagramUrl'),
            googleUrl: this.environment.getConfig('socialmedia.googleUrl'),
            pinterestUrl: this.environment.getConfig('socialmedia.pinterestUrl')
        };
    };

    return SocialMediaView;
});


define('AwaLabs.SocialMedia', [
    'SocialMedia.View'
], function SocialMedia(
    SocialMediaView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'SocialMedia': {
                        'SocialMedia': {
                            childViewIndex: 1,
                            childViewConstructor: function socialMedia() {
                                return new SocialMediaView({
                                    environment: container.getComponent('Environment')
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});


};

extensions['ACS.SortShipMethods.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/SortShipMethods/1.0.0/' + asset;
}

define('SortShippingMethods.FixProperty', [
    'OrderWizard.Module.Shipmethod',
    'OrderWizard.Module.ShowShipments',
    'Backbone',
    'Backbone.View.render'
],
function HackCheckout(
    OrderWizardModuleShipmethod,
    OrderWizardModuleShowShipments,
    Backbone
) {
    'use strict';

    OrderWizardModuleShipmethod.addExtraContextProperty = Backbone.View.addExtraContextProperty;
    OrderWizardModuleShowShipments.addExtraContextProperty = Backbone.View.addExtraContextProperty;
});


define('SortShipMethods', [
    'underscore',
    'SortShippingMethods.FixProperty'
], function RemoveDefaulShipMethod(
    _
) {
    'use strict';

    return {
        sortShipMethods: function sortShipMethods(shippingMethods, model) {
            var shippingMethodsSorted = _.sortBy(shippingMethods, function sortBy(shipMethod) {
                var shipMethodObj = _.find(model.shipmethods, function findShipMethod(method) {
                    return method.internalid.toString() === shipMethod.internalid.toString();
                });
                return shipMethodObj.rate;
            });
            return shippingMethodsSorted;
        },

        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var self = this;
            if (layout) {
                try {
                    layout.addToViewContextDefinition('OrderWizard.Module.Shipmethod', 'shippingMethods', 'object', function sortShipMethods(context) {
                        var shippingMethods = self.sortShipMethods(context.shippingMethods, context.model);
                        return shippingMethods;
                    });

                    layout.addToViewContextDefinition('OrderWizard.Module.ShowShipments', 'shippingMethods', 'object', function sortShipMethods(context) {
                        var shippingMethods = self.sortShipMethods(context.shippingMethods, context.model);
                        return shippingMethods;
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };
});


};

extensions['AwaLabs.StickyHeader.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/StickyHeader/2.0.0/' + asset;
}

define('AwaLabs.StickyHeader', [
    'Header.View',
    'Profile.Model',
    'Header.Profile.View',
    'Header.Menu.MyAccount.View',
    'Handlebars',
    'jQuery'
], function AwaLabsStickyHeader(
    HeaderView,
    ProfileModel,
    HeaderProfileView,
    HeaderMenuMyAccountView,
    Handlebars,
    jQuery
) {
    'use strict';
    return {
        mountToApp: function mountToApp(container) {
            var Layout;
            /* eslint-disable no-underscore-dangle */
            if (container.layout) {
                Layout = container.getLayout();
                /* eslint-enable no-underscore-dangle */
                Layout.once('afterAppendView', function afterAppendView() {
                    jQuery(document).on('scroll', function stickyScroll() {
                        var $headerMainNavWrapper;
                        var $headerMainWrapper;
                        if (jQuery('html').hasClass('ns_is-edit')) {
                            return;
                        }

                        $headerMainNavWrapper = Layout.$('#site-header');
                        $headerMainWrapper = Layout.$('.header-main-wrapper');

                        $headerMainWrapper.css({
                            'minHeight': $headerMainWrapper.height()
                        });


                        if (jQuery(document).scrollTop() > 0) {
                            $headerMainNavWrapper.addClass('sticky-header');
                            $headerMainNavWrapper.next().addClass('less-padding');
                        } else {
                            $headerMainNavWrapper.removeClass('sticky-header');
                            $headerMainNavWrapper.next().removeClass('less-padding');
                        }
                    });
                });
            }
        }
    };
});


};

extensions['AwaLabs.StoreLocator.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/StoreLocator/2.0.0/' + asset;
}

define('StoreLocator.LocationInfo.View', [
    'Backbone',
    '_store_locator_location_info.tpl'
], function StoreLocatorLocationInfoView(
    Backbone,
    StoreLocatorLocatorDetailsTpl
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocatorDetailsTpl,

        initialize: function initialize(options) {
            this.application = options.application;
            this.model = options.model;
        },

        getContext: function getContext() {
            console.log('model', this.model);
            return {
                model: this.model
            };
        }
    });
});


define('StoreLocator.LocationRoute.Model', [
    'Backbone'
], function StoreLocatorLocationRouteModel(
    Backbone
) {
    'use strict';

    return Backbone.Model.extend({
        toRouteParams: function toRouteParams() {
            var routeParams = {
                origin: {
                    query: this.get('origin')
                },
                destination: {
                    query: this.get('destination')
                },
                travelMode: this.get('mode')
            };
            return routeParams;
        }
    });
});


define('StoreLocator.LocationRoute.View', [
    'Backbone',
    '_store_locator_location_route.tpl',
    'jQuery',
    'underscore',
    'Utils'
], function StoreLocatorLocationRouteViewFn(
    Backbone,
    StoreLocatorLocationRouteTpl,
    jQuery,
    _,
    Utils
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocationRouteTpl,

        events: {
            'click [data-action="changeTravelMode"]': 'changeTravelMode',
            'click [data-action="getRoute"]': 'getRoute',
            'click [data-action="getCurrentLocation"]': 'getCurrentLocation',
            'click [data-action="print"]': 'print'
        },

        initialize: function initialize(options) {
            this.application = options.application;
            this.locationModel = options.locationModel;
            this.reference_map = options.reference_map;
            this.locationRouteModel = options.locationRouteModel;
            this.collection = options.collection;
        },
        print: function print() {
            window.print();
        },

        getOriginFullAddress: function getOriginFullAddress(locationModel) {
            var addr = [];
            addr.push(locationModel.get('address1'));
            if (locationModel.get('city')) {
                addr.push(locationModel.get('city'));
            }
            if (locationModel.get('state')) {
                addr.push(locationModel.get('state'));
            }
            if (locationModel.get('country')) {
                addr.push(locationModel.get('country'));
            }
            if (locationModel.get('zip')) {
                addr.push(locationModel.get('zip'));
            }
            return addr.join(', ');
        },

        showAutoCompleteInput: function showAutoCompleteInput(input) {
            if (input) {
                // eslint-disable-next-line no-undef
                this.autocomplete = new google.maps.places.SearchBox(input);
                // eslint-disable-next-line no-undef
                google.maps.event.addListener(this.autocomplete, 'places_changed', _.bind(this.placesChanged, this));
            }
        },
        placesChanged: function placesChanged() {
            var place = this.autocomplete && this.autocomplete.getPlaces() &&
                this.autocomplete.getPlaces()[0];
            if (!place || _.size(place) === 0) {
                console.warn('Autocomplete returned place contains no geometry');
                return;
            }

            if (!place.geometry) {
                console.warn('Autocomplete returned place contains no geometry');
                return;
            }
            this.setFromRoute(place.formatted_address);
            this.getRoute();
        },

        setFromRoute: function setFromRoute(address, isFromGeoLocation) {
            this.locationRouteModel.set('origin', address);
            if (isFromGeoLocation) {
                this.$('[name="route-from"]').val(address);
            }
        },

        changeTravelMode: function changeTravelMode(e) {
            this.locationRouteModel.set('mode', jQuery(e.target).data('mode'));
            this.render();
        },
        validateRouteModel: function validateRouteModel() {
            return this.locationRouteModel.get('mode') &&
                this.locationRouteModel.get('origin') &&
                this.locationRouteModel.get('destination');
        },
        getRoute: function getRoute(e) {
            // eslint-disable-next-line no-undef
            var directionsService = new google.maps.DirectionsService();
            // eslint-disable-next-line no-undef
            var directionsRenderer = new google.maps.DirectionsRenderer();
            var routeParams;
            var leg;
            var self = this;
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (this.validateRouteModel()) {
                directionsRenderer.setMap(this.reference_map.map);
                routeParams = this.locationRouteModel.toRouteParams();
                directionsService.route(routeParams, function handleResponse(response, status) {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                        leg = response.routes &&
                            response.routes[0] &&
                            response.routes[0].legs &&
                            response.routes[0].legs[0];
                        if (leg) {
                            self.locationRouteModel.set('leg', leg);
                        }
                    } else {
                        self.showError(Utils.translate('No result for this params'));
                    }
                });
            }
        },

        getCurrentLocation: function getCurrentLocation(e) {
            var promise = this.useCurrentLocation();
            var self = this;
            e.preventDefault();
            promise.done(function doneFn(formattedAddress) {
                self.setFromRoute(formattedAddress, true);
                self.locationRouteModel.set('allowCurrentLocation', true);
                self.getRoute();
            });
        },

        useCurrentLocation: function useCurrentLocation() {
            var self = this;
            var promise = jQuery.Deferred();
            var latLng;
            // eslint-disable-next-line no-undef
            var geoCoder = new google.maps.Geocoder();
            var city;
            var formattedAddress;
            navigator.geolocation.getCurrentPosition(
                function doneCallback(position) {
                    latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
                    geoCoder.geocode({ location: latLng }, function handleLocationResult(results, status) {
                        // eslint-disable-next-line no-undef
                        if (status === google.maps.GeocoderStatus.OK) {
                            city = _(results).find(function findFn(result) {
                                return !_.indexOf(result.types, 'locality');
                            });
                            if (city) {
                                formattedAddress = city.formatted_address;
                            } else {
                                formattedAddress = results[0].formatted_address;
                            }
                            promise.resolveWith(self, [formattedAddress]);
                        }
                    });
                },
                function errorCallBack() {
                    promise.rejectWith(self, arguments);
                    self.locationRouteModel('allowCurrentLocation', false);
                }
            );
            return promise;
        },

        render: function render() {
            var self = this;
            this._render();
            this.$input = this.$('[data-type="autocomplete-input-route"]');
            this.reference_map.load().done(function donFn() {
                self.showAutoCompleteInput(self.$input.get(0));
                self.setDataInForm();
            });
            return this;
        },

        setDataInForm: function setDataInForm() {
            this.$('[name="route-from"]').val(this.locationRouteModel.get('origin'));
            if (!this.locationRouteModel.get('destination')) {
                this.locationRouteModel.set('destination', this.getOriginFullAddress(this.locationModel));
            }
            if (!this.locationRouteModel.get('mode')) {
                this.locationRouteModel.set('mode', 'DRIVING');
            }
        },

        getContext: function getContext() {
            return {
                model: this.locationRouteModel,
                isDRIVING: this.locationRouteModel.get('mode') === 'DRIVING' || !this.locationRouteModel.get('mode'),
                isWALKING: this.locationRouteModel.get('mode') === 'WALKING',
                isBICYCLING: this.locationRouteModel.get('mode') === 'BICYCLING',
                isTRANSIT: this.locationRouteModel.get('mode') === 'TRANSIT'
            };
        }
    });
});


define('StoreLocator.LocationSteps.View', [
    'Backbone',
    '_store_locator_location_steps.tpl',
    'underscore'
], function StoreLocatorLocationStepsView(
    Backbone,
    StoreLocatorLocationStepsTpl,
    _
) {
    'use strict';

    return Backbone.View.extend({

        template: StoreLocatorLocationStepsTpl,

        initialize: function initialize(options) {
            this.application = options.application;
            this.locationRouteModel = options.locationRouteModel;
            this.locationRouteModel.on('change:leg', _.bind(this.render, this));
        },

        getContext: function getContext() {
            return {
                locationRouteModel: this.locationRouteModel,
                hasSteps: this.locationRouteModel.get('leg') &&
                    this.locationRouteModel.get('leg').steps &&
                    this.locationRouteModel.get('leg').steps.length > 0
            };
        }
    });
});


define('StoreLocator.StoreLocator.List.All.Store.View', [
    'underscore',
    'StoreLocator.List.All.Store.View'
], function StoreLocatorListAllStoreViewFn(
    _,
    StoreLocatorListAllStoreView
) {
    'use strict';

    _.extend(StoreLocatorListAllStoreView.prototype, {
        getContext: _.wrap(StoreLocatorListAllStoreView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.urlcomponent = this.model.get('urlcomponent');
            return originalRet;
        })
    });
});


define('StoreLocator.StoreLocator.Details.View', [
    'StoreLocator.Details.View',
    'underscore',
    'AjaxRequestsKiller',
    'StoreLocator.LocationRoute.Model',
    'StoreLocator.LocationInfo.View',
    'StoreLocator.LocationRoute.View',
    'StoreLocator.LocationSteps.View',
    'Utils'
], function StoreLocatorStoreLocatorDetailsView(
    StoreLocatorDetailsView,
    _,
    AjaxRequestsKiller,
    StoreLocatorLocationRouteModel,
    StoreLocatorLocationInfoView,
    StoreLocatorLocationRouteView,
    StoreLocatorLocationStepsView,
    Utils
) {
    'use strict';


    _.extend(StoreLocatorDetailsView.prototype, {
        initialize: _.wrap(StoreLocatorDetailsView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.locationRouteModel = new StoreLocatorLocationRouteModel();
        }),
        getBreadcrumbPages: function getBreadcrumbPages() {
            var breadCrumbs = [];
            breadCrumbs.push({
                text: Utils.translate('Stores'),
                href: '/storelist'
            });
            breadCrumbs.push({
                text: this.model.get('name'),
                href: '/stores/' + this.model.get('urlcomponent')
            });
            return breadCrumbs;
        },
        beforeShowContent: function beforeShowContent() {
            var urlcomponent = this.routerArguments[0];
            return this.model.fetch({
                data: {
                    urlcomponent: urlcomponent
                },
                killerId: AjaxRequestsKiller.getKillerId()
            });
        },
        childViews: _.extend(StoreLocatorDetailsView.prototype.childViews, {
            'StoreLocationInfo': function StoreLocationInfoCustom() {
                return new StoreLocatorLocationInfoView({
                    application: this.application,
                    model: this.model
                });
            },
            'StoreLocationRoute': function StoreLocationInfoCustom() {
                return new StoreLocatorLocationRouteView({
                    application: this.application,
                    locationModel: this.model,
                    locationRouteModel: this.locationRouteModel,
                    reference_map: this.reference_map,
                    collection: this.collection
                });
            },
            'StoreLocationSteps': function StoreLocationStepsCustom() {
                return new StoreLocatorLocationStepsView({
                    application: this.application,
                    locationRouteModel: this.locationRouteModel,
                    reference_map: this.reference_map
                });
            }
        })
    });
});


define('StoreLocator.Search.View.BoundsFix', [
    'StoreLocator.Map.View',
    'underscore'
], function StoreLocatorSearchViewBoundsFix(
    StoreLocatorMapView,
    _
) {
    'use strict';

    _.extend(StoreLocatorMapView.prototype, {
        updateMap: function updateMap() {
            var position = this.reference_map.getPosition();
            var self = this;

            this.reference_map.clearPointList(this.map);

            if (position && _.size(position) && !position.refineSearch) {
                this.reference_map.showMyPosition(position, this.map);
            } else {
                this.reference_map.centerMapToDefault(this.map);
            }

            if (this.collection.length) {
                this.reference_map.showPointList(this.collection, this.map);
                _.delay(function deferBounds() {
                    self.reference_map.fitBounds(self.map);
                }, 500);
            }
        }
    });
});


define('AwaLabs.StoreLocator', [
    'Utils',
    'ReferenceMap.Configuration',
    'StoreLocator.Upgrade.View',
    'ReferenceMap',
    'StoreLocator.List.All.View',
    'StoreLocator.Details.View',
    'ErrorManagement.PageNotFound.View',
    'StoreLocator.Search.View.BoundsFix',
    'StoreLocator.StoreLocator.Details.View',
    'StoreLocator.StoreLocator.List.All.Store.View'
], function AwaLabsStoreLocator(
    Utils,
    ReferenceConfiguration,
    StoreLocatorUpgradeView,
    ReferenceMap,
    StoreLocatorListAllView,
    StoreLocatorDetailsView,
    ErrorManagementPageNotFoundView
) {
    'use strict';


    return {
        mountToApp: function mountToApp(application) {
            var pageType = application.getComponent('PageType');
            var referenceMap = new ReferenceMap();
            if (ReferenceConfiguration.isEnabled() && window.location.protocol === 'https:') {
                if (Utils.oldIE(8)) {
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorUpgrade',
                        routes: ['stores', 'stores/details/:id', 'stores/all', 'stores/all?:options'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_upgrade.tpl',
                            displayName: 'Browser Upgrade',
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                '/path/to/store_locator_upgrade_tpl.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorUpgrade',
                        routes: ['stores', 'stores/:id', 'storelist', 'storelist?:options'],
                        view: StoreLocatorUpgradeView,
                        defaultTemplate: {
                            name: 'store_locator_upgrade.tpl',
                            displayName: 'Browser Upgrade',
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                '/path/to/store_locator_upgrade_tpl.png'
                            )
                        }
                    });
                } else {
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorListAll',
                        routes: ['stores/all', 'stores/all?:options'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_list_all.tpl',
                            displayName: ReferenceConfiguration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-list.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorListAll',
                        routes: ['storelist', 'storelist?:options'],
                        view: StoreLocatorListAllView,
                        defaultTemplate: {
                            name: 'store_locator_list_all.tpl',
                            displayName: ReferenceConfiguration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-list.png'
                            )
                        }
                    });
                    // remove previous route
                    pageType.registerPageType({
                        name: 'StoreLocatorDetails',
                        routes: ['stores/details/:id'],
                        view: ErrorManagementPageNotFoundView,
                        defaultTemplate: {
                            name: 'store_locator_details.tpl',
                            displayName: referenceMap.configuration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-details.png'
                            )
                        }
                    });
                    // add new route
                    pageType.registerPageType({
                        name: 'StoreLocatorDetails',
                        routes: ['stores/:id'],
                        view: StoreLocatorDetailsView,
                        defaultTemplate: {
                            name: 'store_locator_details.tpl',
                            displayName: referenceMap.configuration.title(),
                            thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/default-layout-store-locator-details.png'
                            )
                        }
                    });
                }
            }
        }
    };
});


};

extensions['AwaLabs.Trade.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Trade/2.1.0/' + asset;
}

define('Profile.Model.HidePrices', [
    'Profile.Model',
    'underscore'
], function ProfileModelHidePrices(
    ProfileModel,
    _
) {
    _.extend(ProfileModel.prototype, {
        hidePrices: _.wrap(ProfileModel.prototype.hidePrices, function hidePrices(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var customfields = this.get('customfields');
            var pricingDisabled = customfields && _.findWhere(customfields, {
                name: 'custentity_pricing_disabled'
            });
            var disabled = pricingDisabled && pricingDisabled.value === 'T';

            return disabled || ret;
        })
    });
});


define('Trade.Link.View', [
    'trade_link_view.tpl',
    'SCView',
    'Backbone'
], function TradeLinkViewModule(
    TradeLinkViewTpl,
    SCViewComponent,
    Backbone
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function TradeLinkView(options) {
        SCView.call(this);

        this.options = options || {};
        this.environment = options.environment;
        this.template = TradeLinkViewTpl;
    }

    TradeLinkView.prototype = Object.create(SCView.prototype);

    TradeLinkView.prototype.constructor = TradeLinkView;

    TradeLinkView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="trade-signin"]': 'tradeSignIn',
            'click [data-action="trade-apply"]': 'tradeApply'
        };
    };

    TradeLinkView.prototype.render = function render() {
        if (!this.options.profile || !(this.options.profile.get('isLoggedIn') === 'T')) {
            SCView.prototype.render.apply(this, arguments);
        }
    };

    TradeLinkView.prototype.tradeSignIn = function tradeSignIn() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl;
    };

    TradeLinkView.prototype.tradeApply = function tradeApply() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl + '&fragment=register-trade';
    };

    TradeLinkView.prototype.generateUrl = function generateUrl(touchpoint) {
        var origin = this.environment.getConfig('currentTouchpoint');
        var hash = Backbone.history.fragment;
        var loginUrl = touchpoint + '&origin=' + origin + '&origin_hash=' + encodeURIComponent(hash);

        return loginUrl;
    };

    TradeLinkView.prototype.getContext = function getContext() {
        return {};
    };

    return TradeLinkView;
});


define('AwaLabs.Trade', [
    'Profile.Model',
    'MyAccountMenu',
    'Dialog.Service',
    'Profile.Model.HidePrices'
], function AwaLabsTrade(
    ProfileModel,
    MyAccountMenu,
    DialogService
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container, showContactAndTradingInfo) {
            var checkout = container.getComponent('Checkout');
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (checkout) {
                checkout.on('afterShowContent', function beforeShowContent() {
                    checkout.getCurrentStep().done(function getCurrentStepDone(currentStep) {
                        if (currentStep && currentStep.url === 'shipping/address' && profile && profile.get('isPendingTradeApproval')) {
                            new DialogService(container).openDialog('Pending Trade Approval - Checkout');
                        }
                    });
                });
            }

            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.MyAccount.View', showContactAndTradingInfo || 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade') && (!showContactAndTradingInfo || !!profile.get('contactId'));
                });

                layout.addToViewContextDefinition('Header.Menu.View', 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade');
                });
            }

            if (!profile.get('isTrade')) {
                MyAccountMenu.getInstance().removeSubEntry('quotes');
            }
        }
    };
});


};

SC.ENVIRONMENT.EXTENSIONS_JS_MODULE_NAMES = ["FileUpload.File.Collection","FileUpload.File.Model","FileUpload.File.Thumbnail.View","FileUpload.File.View","AwaLabs.StepModule","OrderWizard.Module.DeliveryInstructions","Dialog.View","Dialog.Service","FavoritesList.RequestQuoteWizard.Module.Items","ShareFavorites.Model","FooterCopyright.View","HeaderCustomizations.Header.View","HeaderCustomizations.MyAccount.Menu","Address.AddExtraContext.Hack","Address.Details.View.HideEdit","OrderWizard.Module.ShowShipments.HideEdit","Session.Message","InactivityMessage.Model","InactivityMessage.ProfileModel","Jewelry.Utils","OrderWizard.Module.Confirmation.Jewelry","Tavano.Klaviyo.Klaviyo","Tavano.Klaviyo.Cart.Sync","Tavano.Klaviyo.ProductView.Sync","Tavano.Klaviyo.LoaderSync","Tavano.Klaviyo.Checkout.Sync","Tavano.Klaviyo.Order.Sync","Tavano.Klaviyo.Profile.Sync","Tavano.Klaviyo.AddOrderSource.Checkout","Tavano.Klaviyo.Checkout.Sync.Checkout","Tavano.Klaviyo.LoaderSync.Checkout","Tavano.Klaviyo.OrderSource.View","Tavano.Klaviyo.Profile.Sync.Checkout","Tavano.Klaviyo.Profile.Model","Tavano.Klaviyo.Checkout.Profile.Model","Tavano.Klaviyo.KlaviyoProfile.Model","LoginRegisterTrade.Model","LoginRegisterTrade.Retail.View","LoginRegisterTrade.Trade.View","LoginRegisterTrade.Account.Register.Model","LoginRegisterTrade.LoginRegister.Register.View","LoginRegisterTrade.LoginRegister.Login.View","LoginRegisterTrade.Form.Model","SuiteLabs.OuterCSS.MyAccount","SuiteLabs.OuterCSS.Shopping","SuiteLabs.OuterCSS.Helper","SocialMedia.View","SortShippingMethods.FixProperty","StoreLocator.LocationInfo.View","StoreLocator.LocationRoute.Model","StoreLocator.LocationRoute.View","StoreLocator.LocationSteps.View","StoreLocator.StoreLocator.List.All.Store.View","StoreLocator.StoreLocator.Details.View","StoreLocator.Search.View.BoundsFix","Profile.Model.HidePrices","Trade.Link.View"];
try{
	extensions['AwaLabs.AwaFileUpload.2.1.0']();
	SC.addExtensionModule('AwaLabs.FileUpload');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CheckoutCreditCardsViews.2.1.0']();
	SC.addExtensionModule('AwaLabs.CheckoutCreditCardsViews');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CheckoutImprovements.2.1.1']();
	SC.addExtensionModule('AwaLabs.CheckoutImprovements');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CheckoutSteps.2.0.0']();
	SC.addExtensionModule('AwaLabs.CheckoutSteps');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.DeliveryInstructions.2.1.0']();
	SC.addExtensionModule('AwaLabs.DeliveryInstructions.Checkout.EntryPoint');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Dialog.2.0.0']();
	SC.addExtensionModule('AwaLabs.Dialog');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Favicon.2.0.0']();
	SC.addExtensionModule('AwaLabs.Favicon');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.FavoritesList.2.1.0']();
	SC.addExtensionModule('AwaLabs.FavoritesList.Checkout');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.FooterCopyright.2.1.0']();
	SC.addExtensionModule('AwaLabs.FooterCopyright');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.GeoIPLocation.2.1.0']();
	SC.addExtensionModule('AwaLabs.GeoIpLocation');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.HeadContentByApplication.2.1.0']();
	SC.addExtensionModule('AwaLabs.HeadContentByApplication');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.HeaderCustomizations.2.0.0']();
	SC.addExtensionModule('AwaLabs.HeaderCustomizations');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.HideEditShipAddr.1.0.0']();
	SC.addExtensionModule('HideEditShippingAddress');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.InactivityMessage.2.1.0']();
	SC.addExtensionModule('AwaLabs.Inactivity.Message');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Jewelry.2.1.1']();
	SC.addExtensionModule('AwaLabs.Jewelry.Checkout');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['Tavano.Klaviyo.3.0.7']();
	SC.addExtensionModule('Tavano.Klaviyo.Klaviyo.Checkout');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.LayoutClass.2.0.0']();
	SC.addExtensionModule('AwaLabs.LayoutClass');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.LoginRegisterTrade.2.1.0']();
	SC.addExtensionModule('AwaLabs.LoginRegisterTrade');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.OrderStatusImprovementsHandlebarsExtras.2.0.0']();
	SC.addExtensionModule('AwaLabs.OrderStatusImprovementsHandlebarsExtras');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.OrderWizardModuleCartSummaryHideTax.2.0.0']();
	SC.addExtensionModule('AwaLabs.OrderWizardModuleCartSummaryHideTax');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.OuterCSS.1.0.0']();
	SC.addExtensionModule('SuiteLabs.OuterCSS.Checkout');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.SEOImprovements.2.0.0']();
	SC.addExtensionModule('AwaLabs.SEOImprovements');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.SocialMedia.2.1.0']();
	SC.addExtensionModule('AwaLabs.SocialMedia');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.SortShipMethods.1.0.0']();
	SC.addExtensionModule('SortShipMethods');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.StickyHeader.2.0.0']();
	SC.addExtensionModule('AwaLabs.StickyHeader');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.StoreLocator.2.0.0']();
	SC.addExtensionModule('AwaLabs.StoreLocator');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Trade.2.1.0']();
	SC.addExtensionModule('AwaLabs.Trade');
}
catch(error)
{
	console.error(error);
}

