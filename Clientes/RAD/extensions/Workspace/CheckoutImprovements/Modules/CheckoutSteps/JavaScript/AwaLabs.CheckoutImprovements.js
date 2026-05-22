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
