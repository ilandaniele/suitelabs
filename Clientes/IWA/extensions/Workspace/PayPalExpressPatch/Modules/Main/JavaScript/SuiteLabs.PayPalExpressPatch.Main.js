
define('SuiteLabs.PayPalExpressPatch.Main', [
    'OrderWizard.Module.PaymentMethod.Selector',
    'Utils',
    'underscore'
], function SuiteLabsPayPalExpressPatchMain(
    OrderWizardModulePaymentMethodSelector,
    Utils,
    _
) {
    'use strict';

    _.extend(OrderWizardModulePaymentMethodSelector.prototype, {
        render: function render() {
            var selectedModule;
            var selectedPayment;
            var selectedType;
            var otherModule;
            var type;

            if (this.wizard.hidePayment()) {
                this.$el.empty();
                this.trigger('change_label_continue');
                return;
            }

            // We do this here so we give time for information to be bootstrapped
            _.each(this.modules, function eachModule(module) {
                module.isActive = module.instance.isActive();
            });

            if (!this.selectedModule) {
                // CASE #5433539: The following line was modified from the original version to patch the PayPal Express issue
                selectedPayment = this.model.get('paymentmethods').findWhere({ primary: true });

                if (selectedPayment) {
                    selectedType = this.isOthersModule(selectedPayment.get('type'))
                        ? 'others'
                        : selectedPayment.get('type');
                } else if (this.wizard.options.profile.get('paymentterms')) {
                    selectedType = 'invoice';
                }

                this.setModuleByType(selectedType, true);
            } else if (this.selectedModule.type === 'paypal' && !this.model.get('isPaypalComplete')) {
                this.trigger('change_label_continue', Utils.translate('Continue to Paypal'));
            } else {
                this.trigger('change_label_continue');
            }

            if (this.isOthersModule(this.selectedModule.type)) {
                type = this.selectedModule.type;
                otherModule = _.findWhere(this.modules, {
                    type: 'others'
                });

                otherModule.isSelected = true;

                this.selectedModule = otherModule;
                this._render();

                this.renderModule(otherModule);
                if (type !== 'others') {
                    this.setModuleByType(type, true);
                }
            } else {
                this._render();

                selectedModule = _.findWhere(this.modules, { isSelected: true });
                this.renderModule(selectedModule);
            }

            if (
                Utils.getParameterByName(window.location.href, 'externalPayment') === 'FAIL' &&
                this.showExternalPaymentErrorMessage
            ) {
                this.showExternalPaymentErrorMessage = false;
                this.manageError(this.externalPaymentErrorMessage);
            }
        }
    });
});
