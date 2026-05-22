define('PDPCustomField.Vectary3dModel.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_vectary_3d_model.tpl',
    'underscore'
], function PDPCustomFieldStockMessagingViewModule(
    BaseView,
    Vectary3dModelTpl,
    _
) {
    'use strict';

    function Vectary3dModelView(options) {
        BaseView.call(this, options);
        this.template = Vectary3dModelTpl;
    }

    Vectary3dModelView.prototype = Object.create(BaseView.prototype);

    Vectary3dModelView.prototype.constructor = Vectary3dModelView;

    Vectary3dModelView.prototype.getContext = function getContext() {
        var item = this.getItem();
        var finishArray = [];
        var pdpCustomFieldsFinishes = [];
        var pdpCustomFieldsFinishesTmp = [];

        if (item.custitem_vectary_3d_model_advanced) {
            finishArray = JSON.parse(item.custitem_vectary_3d_model_advanced);

            if (finishArray.Configurations) {
                _.each(finishArray.Configurations, function eachConfiguration(configuration) {
                    pdpCustomFieldsFinishes.push(configuration);
                });
            } else {
                _.each(finishArray.Finishes, function eachFinish(finish) {
                    pdpCustomFieldsFinishesTmp.push(finish);
                });

                pdpCustomFieldsFinishes.push({ name: 'Finish', Finishes: pdpCustomFieldsFinishesTmp });
            }
        }

        return {
            pdpCustomFieldsFinishes: pdpCustomFieldsFinishes,
            showFinishes: pdpCustomFieldsFinishes && pdpCustomFieldsFinishes.length > 0
        };
    };

    return Vectary3dModelView;
});
