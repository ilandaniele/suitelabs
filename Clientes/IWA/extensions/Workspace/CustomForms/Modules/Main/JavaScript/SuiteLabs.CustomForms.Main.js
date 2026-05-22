define('SuiteLabs.CustomForms.Main', [
    'CustomForms.View'
], function SuiteLabsCustomFormsMain(
    CustomFormsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cms = container.getComponent('CMS');
            var environment = container.getComponent('Environment');

            if (cms) {
                // attach environment component into CustomFormsView
                CustomFormsView.prototype.environment = environment;

                cms.registerCustomContentType({
                    id: 'CMS_CUSTOM_FORM',
                    view: CustomFormsView
                });
            }
        }
    };
});
