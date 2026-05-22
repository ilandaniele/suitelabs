define('ExpectedShipDate', [
], function ExpectedShipDate(
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Actionable.View', 'expectedShipDate', 'string', function fn(context) {
                    var expectedShipDate;
                    if (context.model) {
                        expectedShipDate = context.model.expectedShipDate;
                    }
                    return expectedShipDate;
                });
            }
        }
    };
});
