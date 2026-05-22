define('SuiteLabs.OuterCSS.MyAccount', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSMyAccount(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.myaccount');
        }
    };
});
