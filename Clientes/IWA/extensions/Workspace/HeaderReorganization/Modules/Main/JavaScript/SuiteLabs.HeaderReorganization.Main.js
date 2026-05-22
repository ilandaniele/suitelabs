define('SuiteLabs.HeaderReorganization.Main', [
    'Header.Profile.View',
    'SC.Configuration',
    'HeaderReorganization.Header.Profile.View'
], function SuiteLabsHeaderReorganizationMain(
    HeaderProfileView,
    Configuration
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var application = container.getLayout().application;

            if (layout) {
                layout.addChildView('Header.Reorganization', function HeaderReorganization() {
                    return new HeaderProfileView({
                        attributes: {
                            'class': 'header-menu-profile'
                        },
                        showMyAccountMenu: true,
                        application: application
                    });
                });

                layout.addToViewContextDefinition('Header.Profile.View', 'headerWelcomeText', 'string', function addContextDefinition() {
                    return Configuration.header.welcomeText;
                });

                layout.addToViewContextDefinition('Header.View', 'headerWelcomeText', 'string', function addContextDefinition() {
                    return Configuration.header.welcomeText;
                });
            }
        }
    };
});
