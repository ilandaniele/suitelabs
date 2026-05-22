define('HeaderCustomizations.MyAccount.Menu', [
    'underscore'
], function HeaderCustomizationsMyAccountMenu(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            var userComponent = container.getComponent('UserProfile');
            var customerTypeFieldId = environment.getConfig('headerCustomization.customerTypeFieldId');
            var accountBalanceName = environment.getConfig('headerCustomization.accountBalanceName');
            var printStatementName = environment.getConfig('headerCustomization.printStatementName');

            userComponent.getUserProfile().then(function thenFn(user) {
                var userType = _.findWhere(user.customfields, { id: customerTypeFieldId });
                var userIsCustomer = userType && userType.value === '1';
                if (userIsCustomer) {
                    layout.addToViewContextDefinition('Header.Menu.MyAccount.View', 'entries', 'array', function fn(context) {
                        return _.map(context.entries, function mapEntries(entry) {
                            if (entry.name === 'Billing') {
                                entry.children = _.reject(entry.children, { name: accountBalanceName });
                                entry.children = _.reject(entry.children, { name: printStatementName });
                            }

                            return entry;
                        });
                    });

                    layout.addToViewContextDefinition('MenuTree.Node.View', 'node', 'array', function fn(context) {
                        var node = context.node;
                        return node.name === accountBalanceName || node.name === printStatementName ? {} : node;
                    });
                }
            });
        }
    };
});
