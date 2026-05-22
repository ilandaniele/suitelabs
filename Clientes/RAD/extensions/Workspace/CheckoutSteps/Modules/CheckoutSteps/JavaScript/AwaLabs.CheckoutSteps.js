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
