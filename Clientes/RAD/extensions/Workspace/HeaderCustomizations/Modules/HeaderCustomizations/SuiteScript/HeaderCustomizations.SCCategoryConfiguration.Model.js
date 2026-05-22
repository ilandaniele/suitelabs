define('HeaderCustomizations.SCCategoryConfiguration.Model', [
    'underscore'
], function HeaderCustomizationsSCCategoryConfigurationModel(
    _
) {
    'use strict';

    return {
        get: function get() {
            var result = [];
            var search = nlapiSearchRecord(
                'customrecord_sc_category_configuration',
                null,
                [
                    ['isinactive', 'is', 'F']
                ],
                [
                    new nlobjSearchColumn('custrecord_sc_cc_site_category'),
                    new nlobjSearchColumn('custrecord_sc_cc_order'),
                    new nlobjSearchColumn('custrecord_sc_cc_image'),
                    new nlobjSearchColumn('custrecord_sc_cc_image_link'),
                    new nlobjSearchColumn('custrecord_sc_cc_image_text')
                ]
            );
            if (search && search.length > 0) {
                _.each(search, function eachItem(item) {
                    result.push({
                        id: item.id,
                        siteCategory: item.getText('custrecord_sc_cc_site_category'),
                        order: item.getValue('custrecord_sc_cc_order'),
                        image: item.getText('custrecord_sc_cc_image'),
                        imageLink: item.getValue('custrecord_sc_cc_image_link'),
                        imageText: item.getValue('custrecord_sc_cc_image_text')
                    });
                });
            }
            return result;
        }
    };
});

