define('SuiteLabs.Foursixty', [
    'jQuery'
], function SuiteLabsFoursixty(
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var foursixtyLoaded;

            if (!SC.isPageGenerator() && environment && layout) {
                window.addEventListener('foursixty.content.rendered', function foursixtyContentRendered() {
                    var scriptUrl = environment.getConfig('foursixty.scriptUrl');

                    if (!foursixtyLoaded) {
                        jQuery.getScript(scriptUrl);
                        foursixtyLoaded = true;
                    }
                });

                layout.on('afterShowContent', function toggleFoursixty() {
                    foursixtyLoaded = false;
                });
            }
        }
    };
});
