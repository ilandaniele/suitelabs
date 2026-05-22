define('SuiteLabs.OuterCSS.Checkout', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSCheckout(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.checkout');
        }
    };
});
