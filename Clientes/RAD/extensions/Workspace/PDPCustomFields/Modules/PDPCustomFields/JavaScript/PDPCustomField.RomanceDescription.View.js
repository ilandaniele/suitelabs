define('PDPCustomField.RomanceDescription.View', [
    'PDPCustomField.Base.View',
    'pdp_custom_field_romance_description.tpl'
], function PDPCustomFieldRomanceDescriptionViewModule(
    BaseView,
    RomanceDescriptionTpl
) {
    'use strict';

    function RomanceDescriptionView(options) {
        BaseView.call(this, options);
        this.template = RomanceDescriptionTpl;
    }

    RomanceDescriptionView.prototype = Object.create(BaseView.prototype);

    RomanceDescriptionView.prototype.constructor = RomanceDescriptionView;

    RomanceDescriptionView.prototype.getContext = function getContext() {
        return {
            romanceDescription: this.getItem().custitem_retail_romance_desc
        };
    };

    return RomanceDescriptionView;
});
