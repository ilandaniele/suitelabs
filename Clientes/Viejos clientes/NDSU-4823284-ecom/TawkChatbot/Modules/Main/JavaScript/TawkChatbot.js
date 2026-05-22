define('TawkChatbot', [
    'jQuery'
], function (
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var configuration = environment.getConfig('tawkChatbot.url');
            if (layout) {
                layout.on('afterShowContent', function afterShowContent() {
                    jQuery(configuration).insertBefore('body');
                });
            }
        }
    };
});
