define('PDPCustomField.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field.tpl',
    'underscore'
], function PDPCustomFieldViewModule(
    BaseView,
    CustomFieldQuickViewTpl,
    _
) {
    'use strict';

    function PDPCustomFieldView(options) {
        BaseView.call(this, options);
        this.template = CustomFieldQuickViewTpl;
    }

    PDPCustomFieldView.prototype = Object.create(BaseView.prototype);

    PDPCustomFieldView.prototype.constructor = PDPCustomFieldView;

    PDPCustomFieldView.prototype.getContext = function getContext() {
        var item = this.getItem();
        var pdpCustomFieldsList = this.environment.getConfig('pdpCustomFieldsList', []);
        var pdpCustomFieldListByOrder = [];

        if (
            pdpCustomFieldsList
            && pdpCustomFieldsList.length > 0
        ) {
            _.each(pdpCustomFieldsList, function eachField(field) {
                field.data = item[field.internalId];
                if (field.order) {
                    pdpCustomFieldListByOrder[parseInt(field.order, 10)] = field;
                }
            });
        }
        return {
            quickView: this.options.quickView,
            pdpCustomFieldsList: pdpCustomFieldListByOrder,
            showCustomFields: pdpCustomFieldListByOrder && pdpCustomFieldListByOrder.length > 0
        };
    };

    return PDPCustomFieldView;
});
