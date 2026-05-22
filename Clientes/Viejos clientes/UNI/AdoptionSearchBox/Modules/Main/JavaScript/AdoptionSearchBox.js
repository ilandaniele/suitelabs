define('AdoptionSearchBox', [
    'AdoptionSearchBox.View'
], function AdoptionSearchBoxModule(
    AdoptionSearchBoxView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            if (layout) {
                layout.addChildView('Notifications', function addAdoptionSearchBoxView() {
                    return new AdoptionSearchBoxView({
                        container: container
                    });
                });
            }
        }
    };
});
