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
