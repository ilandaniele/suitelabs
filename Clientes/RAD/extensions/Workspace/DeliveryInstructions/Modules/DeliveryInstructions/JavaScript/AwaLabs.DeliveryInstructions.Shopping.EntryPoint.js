define('AwaLabs.DeliveryInstructions.Shopping.EntryPoint', [
    'underscore'
], function AwaLabsDeliveryInstructionsShoppingEntryPoint(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');

            if (layout) {
                layout.addToViewContextDefinition('Cart.Lines.View', 'whiteGloveServiceMessage', 'string',
                    function overrideContext(context) {
                        var env = application.getComponent('Environment');
                        var isFreightItem = context && context.item && context.item.custitem46;
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

