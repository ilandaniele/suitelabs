define('InventoryLocationQuantitiesTable', [
    'InventoryLocationQuantitiesTable.View'
], function InventoryLocationQuantitiesTableModule(
    InventoryLocationQuantitiesTableView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');

            if (pdp) {
                pdp.addChildView('Product.Stock.Info', function addInventoryLocationQuantitiesTableView() {
                    return new InventoryLocationQuantitiesTableView({
                        container: container,
                        pdp: pdp
                    });
                });
            }
        }
    };
});
