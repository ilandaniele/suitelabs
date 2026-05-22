define('AwaLabs.FooterCopyright', [
    'FooterCopyright.View'
], function FooterCopyright(
    FooterCopyrightView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'FooterCopyright': {
                        'FooterCopyright': {
                            childViewIndex: 1,
                            childViewConstructor: function footerCopyright() {
                                return new FooterCopyrightView({
                                    application: container
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});
