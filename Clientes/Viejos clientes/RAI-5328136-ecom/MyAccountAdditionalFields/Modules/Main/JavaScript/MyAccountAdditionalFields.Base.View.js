define('MyAccountAdditionalFields.Base.View', [
    'PageType.Base.View',
    'MyAccountAdditionalFields.Model',
    'MyAccountAdditionalFields.Form.View',
    'additional_fields_base.tpl'
], function MyAccountAdditionalFieldsBaseView(
    PageTypeBaseView,
    MyAccountAdditionalFieldsModel,
    MyAccountAdditionalFieldsFormView,
    MyAccountAdditionalFieldsBaseTpl
) {
    'use strict';

    return PageTypeBaseView.PageTypeBaseView.extend({
        template: MyAccountAdditionalFieldsBaseTpl,

        constructor: function constructor(options) {
            this.options = options;
            this.model = this.options.model;
            PageTypeBaseView.PageTypeBaseView.prototype.constructor.apply(this, arguments);
        },

        getChildViews: function getChildViews() {
            return {
                'MyAccountAdditionalFieldsForm': function MyAccountAdditionalFieldsForm() {
                    return new MyAccountAdditionalFieldsFormView({
                        model: this.model
                    });
                }
            };
        }
    });
});
