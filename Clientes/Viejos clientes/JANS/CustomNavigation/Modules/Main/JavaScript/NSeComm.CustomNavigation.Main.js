define('NSeComm.CustomNavigation.Main', [
    'NSeComm.CustomNavigation.Main.View',
    'underscore'
], function NSeCommCustomNavigationMain(MainView) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            /** @type {LayoutComponent} */
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildView('cms:header_banner_bottom', function CMSMainView() {
                    return new MainView({ container: container });
                });

                layout.on('afterShowContent', function afterShowContent() {
                });
            }
        }
    };
});
