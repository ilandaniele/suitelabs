define('ShowAllTransactions', [], function ShowAllTransactions() {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition('TransactionHistory.List.View', 'hasTerms', 'boolean', function hasTerms() {
                    return true;
                });
            }
        }
    };
});
