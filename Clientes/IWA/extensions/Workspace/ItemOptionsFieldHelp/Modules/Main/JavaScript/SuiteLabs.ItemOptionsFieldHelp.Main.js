
define('SuiteLabs.ItemOptionsFieldHelp.Main', [
    'ItemOptionsFieldHelp.View'
], function SuiteLabsItemOptionsFieldHelpMain(
    ItemOptionsFieldHelpView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');

            if (pdp) {
                pdp.addChildView('Options.Collection', function ItemOptionsFieldHelpChildView() {
                    return new ItemOptionsFieldHelpView({ container: container });
                });
            }
        }
    };
});
