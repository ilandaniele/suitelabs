/**
* @NApiVersion 2.x
* @NScriptType MapReduceScript
*/
define([
    'N/record',
    'N/search',
    'N/file'
], function CategoriesThumbnailUpdate(
    Record,
    Search,
    File
) {
    'use strict';
​
    function getInputData() {
        return File.load({
            id: '469727'
        });
    }
​
    function map(context) {
        var csvData = context.value.split(',');
        var categoryName = csvData[0];
        var categoryPath = csvData[2];
        var categoryImageFormat = categoryPath.split('.').pop();
        var categoryImage = 'Web Site Hosting Files/Live Hosting Files/site/Category images/' + csvData[1] + '.' + categoryImageFormat;
        var categoryIds = [];
        var i;

        Search.create({
            type: Search.Type.COMMERCE_CATEGORY,
            columns: [{
                name: 'internalid'
            }],
            filters: [{
                name: 'name',
                operator: 'is',
                values: categoryName
            }]
        }).run().each(function eachCategory(category) {
            categoryIds.push(category.getValue({ name: 'internalid' }));
            return true;
        });

        for (i = 0; i < categoryIds.length; i++) {
            context.write({
                key: categoryIds[i],
                value: categoryImage
            });
        }

    };
​
    function reduce(context) {
        try{
            var file = File.load({
                id: context.values[0]
            });

            Record.submitFields({
                type: Record.Type.COMMERCE_CATEGORY,
                id: context.key,
                values: {
                    thumbnail: file.id
                }
            });
        } catch(ex) {
             log.error('error', JSON.stringify(ex));
        }
    }
​
    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce
    };
});
