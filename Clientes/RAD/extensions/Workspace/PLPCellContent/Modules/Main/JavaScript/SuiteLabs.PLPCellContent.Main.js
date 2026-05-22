define('SuiteLabs.PLPCellContent.Main', [
    'PLPCellContent.View'
], function SuiteLabsPLPCellContentMain(
    PLPCellContentView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var plp = container.getComponent('PLP');

            plp.addChildViews(plp.PLP_VIEW, {
                'ProductViewsPrice.Price': {
                    'PLPCellContent.View': {
                        childViewConstructor: function childViewConstructor() {
                            return new PLPCellContentView({
                                container: container
                            });
                        },
                        childViewIndex: 11
                    }
                }
            });
        }
    };
});
