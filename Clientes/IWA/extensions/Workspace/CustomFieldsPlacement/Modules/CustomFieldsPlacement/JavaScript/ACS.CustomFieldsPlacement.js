
define('ACS.CustomFieldsPlacement', [
    'underscore',
    'jQuery'
], function CustomFieldsPlacement(
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var checkout = container.getComponent('Checkout');
            var $topElem;
            var $customfields;
            var isIWA;
            if (layout) {
                layout.on('afterShowContent', function afterShowContent() {
                    _.defer(function defer() {
                        checkout.getCurrentStep().then(function getCurrentStepThen(step) {
                            if (step.url === 'review') {
                                $topElem = jQuery('[class*="OrderWizard.Module.ShowPayments"]');
                                $customfields = jQuery('.order-wizard-checkoutfieldmanagement').parent();
                                isIWA = window.location.host.indexOf('iwawine') > -1;
                                if (isIWA) {
                                    $customfields = jQuery('.custom-fields-checkout-order-wizard').parent();
                                }
                                if ($customfields) {
                                    $topElem.insertAfter($customfields);
                                }
                            }
                        });
                    });
                });
            }
        }
    };
});
