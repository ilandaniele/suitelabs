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
