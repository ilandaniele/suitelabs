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
