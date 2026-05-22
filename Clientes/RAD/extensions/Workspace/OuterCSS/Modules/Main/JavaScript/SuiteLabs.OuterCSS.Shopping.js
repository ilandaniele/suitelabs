define('SuiteLabs.OuterCSS.Shopping', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSShopping(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.shopping');
        }
    };
});
