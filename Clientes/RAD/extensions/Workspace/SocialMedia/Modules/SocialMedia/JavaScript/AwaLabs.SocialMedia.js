define('AwaLabs.SocialMedia', [
    'SocialMedia.View'
], function SocialMedia(
    SocialMediaView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'SocialMedia': {
                        'SocialMedia': {
                            childViewIndex: 1,
                            childViewConstructor: function socialMedia() {
                                return new SocialMediaView({
                                    environment: container.getComponent('Environment')
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});
