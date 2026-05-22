define('PLPCustomFields.View', [
    'plp_custom_fields.tpl',
    'Backbone'
], function PLPCustomFieldsView(
    PLPCustomFieldsTpl,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        template: PLPCustomFieldsTpl,

        attributes: {
            'id': 'productlist-custom-plp-fields',
            'class': 'view productlist-custom-plp-fields',
            'data-view': 'PLPCustomFields',
            'data-root-component-id': 'PLPCustomFields'
        },

        contextDataRequest: ['item'],

        initialize: function initialize(options) {
            var self = this;
            self.options = options || {};
            self.additionalFields = options.additionalFields;
        },

        getFieldsFromConfiguration: function getFieldsFromConfiguration() {
            var self = this;
            var arrFieldsFromConfig = self.additionalFields || [];
            var additionalCustomFields = [];
            var item = self.contextData.item();
            var x;
            var fieldID;
            var fieldValue;

            for (x = 0; x < arrFieldsFromConfig.length; x++) {
                fieldID = arrFieldsFromConfig[x].fieldID;
                fieldValue = fieldValue = item[fieldID];

                if (arrFieldsFromConfig[x] && item[fieldID]) {
                    fieldValue = item[fieldID];
                }

                additionalCustomFields.push({
                    fieldLabel: arrFieldsFromConfig[x] ? arrFieldsFromConfig[x].fieldLabel : '',
                    fieldID: fieldValue || '',
                    showLabel: arrFieldsFromConfig[x].showLabel,
                    show: arrFieldsFromConfig[x].show
                });
            }

            return additionalCustomFields;
        },

        getContext: function getContext() {
            var self = this;

            return {
                additionalFields: self.getFieldsFromConfiguration()
            };
        }
    });
});
