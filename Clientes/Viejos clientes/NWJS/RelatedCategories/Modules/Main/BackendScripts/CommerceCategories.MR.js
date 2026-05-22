/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*/
define([
    'N/record',
    'N/search',
    'N/runtime',
    'N/log'
], function mrRelatedCategories(
    nRecord,
    nSearch,
    nRuntime,
    nLog
) {
    'use strict';

    var loadItemRecord = function loadItemRecord(id) {
        var record = null;
        [nRecord.Type.INVENTORY_ITEM, nRecord.Type.NON_INVENTORY_ITEM, nRecord.Type.ASSEMBLY_ITEM].forEach(function itemTypes(itemType) {
            if (record === null) {
                try {
                    record = nRecord.load({
                        type: itemType,
                        id: id,
                        isDynamic: true
                    });
                } catch (e) {
                    record = null;
                }
            }
        });
        return record;
    };

    function getInputData() {
        var categoryID = nRuntime.getCurrentScript().getParameter('custscript_related_category_id');

        var categorySearch = nSearch.create({
            type: 'customrecord_nssc_related_commerce_cate',
            columns: [{
                name: 'custrecord_nssc_item'
            }],
            filters: [{
                name: 'custrecord_nssc_commerce_category',
                operator: nSearch.Operator.IS,
                values: categoryID
            }, {
                name: 'isinactive',
                operator: nSearch.Operator.IS,
                values: 'F'
            }]
        });

        nLog.audit({
            title: 'getInputData for category:',
            details: categoryID
        });

        return categorySearch;
    }

    function map(context) {
        var searchResult = JSON.parse(context.value);

        var itemID = searchResult.values.custrecord_nssc_item.value;
        var itemRecord = {};
        var jsonRelatedCommerceCategoryList = '';
        var jsonData = [];

        var relatedCategoryValues = nRuntime.getCurrentScript().getParameter('custscript_related_category_values');
        var relatedCategoryValuesJSON = {};
        try {
            relatedCategoryValuesJSON = JSON.parse(relatedCategoryValues);
        } catch (e) {
            relatedCategoryValuesJSON = {};
        }

        // Usage Example: relatedCategoryValuesJSON.urlComponent

        if (itemID !== '') {
            // Replicar la lógica sabiendo que estás parado en un item en particular
            nLog.audit({
                title: 'map for item:',
                details: itemID
            });

            // Load item record
            itemRecord = loadItemRecord(itemID);

            if (itemRecord !== null) {
                nLog.audit({
                    title: 'item record',
                    details: itemRecord
                });
           // get Item value for RELATED COMMERCE CATEGORY LIST JSON
                jsonRelatedCommerceCategoryList = itemRecord.getValue({
                    fieldId: 'custitem_nssc_related_commerce_json'
                });
                try {
                    jsonData = JSON.parse(jsonRelatedCommerceCategoryList);
                } catch (e) {
                    jsonData = [];
                }

                // Update custitem_nssc_related_commerce_json field
                try {
                    jsonData = (jsonData).map(function each(item) {
                        if (item.urlcomponent === relatedCategoryValuesJSON.urlComponentOld) {
                            item.urlcomponent = relatedCategoryValuesJSON.urlComponent;
                            item.name = relatedCategoryValuesJSON.name;
                            item.img = relatedCategoryValuesJSON.imageUrl;
                        }
                        return item;
                    });
                } catch (e) {
                    jsonData = [];
                }


           // Save item record
                itemRecord.setValue({
                    fieldId: 'custitem_nssc_related_commerce_json',
                    value: JSON.stringify(jsonData),
                    ignoreFieldChange: true
                });

                itemRecord.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
            }
        }

        context.write({
            key: 'Updated-Items',
            value: 1
        });
    }

    function reduce(context) {
        context.write({
            key: context.key,
            value: context.values.length
        });
    }

    function summarize(context) {
        nLog.audit({
            title: 'Usage units consumed',
            details: context.usage
        });
        nLog.audit({
            title: 'Concurrency',
            details: context.concurrency
        });
        nLog.audit({
            title: 'Number of yields',
            details: context.yields
        });

        context.output.iterator().each(function eachOutput(key, value) {
            nLog.audit({
                title: key,
                details: value
            });
            return true;
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
