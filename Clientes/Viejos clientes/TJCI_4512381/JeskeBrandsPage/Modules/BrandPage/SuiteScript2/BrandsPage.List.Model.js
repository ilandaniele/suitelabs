/*
    © 2021 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

/**
* @NApiVersion 2.x
*BrandsPage.List.Model.js
*/
define([
    'N/search',
    'N/runtime',
    'N/record',
    'N/cache',
    'N/log',
    'N/file'
], function BrandsPageListModel(
    Search,
    Runtime,
    Record,
    Cache,
    Log,
    File
) {
    'use strict';


    return {
        get: function () {
            var type = 'customrecord_brands_list';
            var filters = [
                { name: 'isinactive', operator: Search.Operator.IS, values: 'F' }
            ];
            var columns = ['internalid', 'custrecord_brand_image', 'custrecord_page_link',
        { name: 'custrecord_sort_order', sort: Search.Sort.ASC }, { name: 'name', sort: Search.Sort.ASC }]

            var searchResults = Search.create({
                type: type,
                filters: filters,
                columns: columns
            }).run().getRange({ start: 0, end: 1000 });

            var mappedResults = searchResults.map(function (result) {
                var imageId = result.getValue('custrecord_brand_image') || null;
                var imageURL;

                if (imageId) {
                    imageURL = File.load({
                        id: result.getValue('custrecord_brand_image')
                    });
                }

                return {
                    internalid: result.getValue('internalid'),
                    brand: result.getValue('name'),
                    image: imageURL ? imageURL.url : null,
                    link: result.getValue('custrecord_page_link'),
                    sortorder: result.getValue('custrecord_sort_order')
                };
            });
            return mappedResults.length === 1 ? mappedResults[0] : mappedResults;
        }
    };
});
