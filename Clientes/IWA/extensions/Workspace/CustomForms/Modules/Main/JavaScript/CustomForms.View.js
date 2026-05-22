define('CustomForms.View', [
    'CustomForms.Form.View',

    'customforms.tpl',

    'CustomContentType.Base.View'
], function CustomFormsView(
    CustomFormsFormView,

    template,

    CustomContentTypeBaseView
) {
    'use strict';

    return CustomContentTypeBaseView.extend({
        template: template,

        getChildViews: function getChildViews() {
            return {
                'CustomForms.Form': function getCustomFormsFormView() {
                    return new CustomFormsFormView({
                        settings: this.settings,
                        environment: this.environment
                    });
                }
            };
        },

        getContext: function getContext() {
            return {
                containerClass: this.settings.custrecord_custom_form_class || 'cctcustomforms-layout'
            };
        }
    });
});
