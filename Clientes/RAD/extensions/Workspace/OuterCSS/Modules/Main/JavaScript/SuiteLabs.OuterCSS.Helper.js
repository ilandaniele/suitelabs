define('SuiteLabs.OuterCSS.Helper', [
    'jQuery'
], function SuiteLabsOuterCSSHelper(
    jQuery
) {
    'use strict';

    return {
        appendOuterFile: function appendOuterFile(container, configKey) {
            var environment = container.getComponent('Environment');
            var element;
            var outerFile = environment ?
                environment.getConfig(configKey) :
                container.getConfig(configKey);

            if (!outerFile || (typeof outerFile !== 'string')) {
                return;
            }

            element = jQuery('link[id=outercss]');

            if (!element.length) {
                jQuery('<link id="outercss" rel="stylesheet">').attr('href', outerFile).appendTo(jQuery('head'));
            } else {
                element.attr('href', outerFile);
            }
        }
    };
});
