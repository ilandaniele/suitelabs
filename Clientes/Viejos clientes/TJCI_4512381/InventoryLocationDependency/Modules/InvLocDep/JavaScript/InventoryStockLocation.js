define('InventoryStockLocation', [
    'InventoryStockLocation.View'
], function (InventoryStockLocationView) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            /** @type {LayoutComponent} */
            var pdp = container.getComponent('PDP');

            function childViewConstructor() {
                return new InventoryStockLocationView({
                    pdp: pdp,
                    container: container
                });
            }

            if (pdp) {
                pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                    'Quantity.Pricing': {
                        'InventoryStockLocationView': {
                            childViewIndex: 10,
                            childViewConstructor: childViewConstructor()
                        }
                    }
                });

                pdp.addChildViews(pdp.PDP_QUICK_VIEW, {
                    'Quantity.Pricing': {
                        'InventoryStockLocationView': {
                            childViewIndex: 10,
                            childViewConstructor: childViewConstructor()
                        }
                    }
                });
            }
        }
    };
});
