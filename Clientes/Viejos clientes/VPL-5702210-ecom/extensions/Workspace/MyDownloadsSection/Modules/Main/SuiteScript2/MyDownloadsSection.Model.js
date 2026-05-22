/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/record',
    'N/search',
    'N/runtime',
    'N/log'
], function MyDownloadsSectionModel(
    nRecord,
    nSearch,
    nRuntime
) {
    'use strict';

    var SAVED_SEARCH_ID = 'customsearch_my_downloads';
    var SAVED_SEARCH_LABELS = {
        customer: 'Customer',
        date: 'Date',
        fileName: 'File',
        fileUrl: 'File URL',
        description: 'Description',
        licenseCode: 'License Code'
    };

    // var log = function log(title, details) {
    //     nLog.debug({ title: '[MyDownloadsSection] ' + title, details: details });
    // };

    var labelToKey = function labelToKey(label) {
        return label[0].toLowerCase() + label.replace(/ /g, '').substr(1);
    };

    var getAllSearchResults = function getAllSearchResults(searchResult, limit) {
        var stop = false;
        var intMaxReg = 1000;
        var intMinReg = 0;
        var result = [];
        var extras;

        while (!stop && nRuntime.getCurrentScript().getRemainingUsage() > 10) {
            // First loop get 1000 rows (from 0 to 1000), the second loop starts at 1001 to 2000 gets another 1000 rows and the same for the next loops
            extras = searchResult.getRange(intMinReg, intMaxReg);

            result = result.concat(extras);
            intMinReg = intMaxReg;
            intMaxReg += 1000;

            // If the execution reach the the last result set stop the execution
            if (extras.length < 1000 || (limit && result.length >= limit)) {
                stop = true;
            }
        }
        return result;
    };

    return {
        getDownloadableItemsFromSavedSearch: function getDownloadableItemsFromSavedSearch() {
            var currentUser = nRuntime.getCurrentUser();

            var myDownloadsSearch = nSearch.load({
                id: SAVED_SEARCH_ID
            });

            var results;

            myDownloadsSearch.filters.push(
                nSearch.createFilter({
                    name: 'entity',
                    operator: nSearch.Operator.IS,
                    values: [
                        currentUser.id
                    ]
                })
            );

            results = getAllSearchResults(myDownloadsSearch.run()).map(function eachResult(result) {
                var item = {};

                result.columns.forEach(function eachColumn(column) {
                    var key = labelToKey(column.label);

                    item[key] = {
                        label: column.label,
                        value: result.getValue(column)
                    };
                });
                return item;
            });

            return {
                downloadableItems: results
            };
        },

        getDownloadableItemsFromCustomer: function getDownloadableItemsFromCustomer() {
            var currentUser = nRuntime.getCurrentUser();

            var customerRecord;
            var customerFilesCount;
            var fileId;
            var fileIds = [];
            var fileData = {};
            var i;

            var fileSearch;
            var fileSearchFilters = [];
            var fileSearchResults = [];

            // customer = nlapiLoadRecord('customer', 1356)
            customerRecord = nRecord.load({
                type: nRecord.Type.CUSTOMER,
                id: currentUser.id
            });

            // customer.getLineItemCount('download')
            customerFilesCount = customerRecord ? customerRecord.getLineCount({
                sublistId: 'download'
            }) : 0;

            // fileId = customer.getLineItemValue('download', 'file', 1)
            for (i = 0; i < customerFilesCount; i++) {
                fileId = customerRecord.getSublistValue({
                    sublistId: 'download',
                    fieldId: 'file',
                    line: i
                });

                fileData[fileId] = {
                    id: fileId,
                    licenseCode: customerRecord.getSublistValue({
                        sublistId: 'download',
                        fieldId: 'licensecode',
                        line: i
                    })
                };
                fileIds.push(fileId);
            }

            // nlapiSearchRecord('file', null, [ [['internalid', 'is', 30124], 'or', ['internalid', 'is', 26133]] ], [])
            fileIds.forEach(function eachFileId(id) {
                var filter = [
                    'internalid', nSearch.Operator.IS, id
                ];

                if (fileSearchFilters.length) {
                    fileSearchFilters.push('or', filter);
                } else {
                    fileSearchFilters.push(filter);
                }
            });

            fileSearch = nSearch.create({
                type: 'file',
                columns: [
                    'internalid',
                    {
                        name: 'name',
                        sort: nSearch.Sort.ASC
                    },
                    'url',
                    'description',
                    'created'
                ],
                filters: fileSearchFilters
            });

            fileSearchResults = getAllSearchResults(fileSearch.run()).map(function eachResult(result) {
                var item = {};

                fileId = result.getValue('internalid');

                item[labelToKey(SAVED_SEARCH_LABELS.customer)] = {
                    label: SAVED_SEARCH_LABELS.customer,
                    value: currentUser.id
                };
                item[labelToKey(SAVED_SEARCH_LABELS.fileName)] = {
                    label: SAVED_SEARCH_LABELS.fileName,
                    value: result.getValue('name')
                };
                item[labelToKey(SAVED_SEARCH_LABELS.fileUrl)] = {
                    label: SAVED_SEARCH_LABELS.fileUrl,
                    value: result.getValue('url')
                };
                item[labelToKey(SAVED_SEARCH_LABELS.description)] = {
                    label: SAVED_SEARCH_LABELS.description,
                    value: result.getValue('description')
                };
                item[labelToKey(SAVED_SEARCH_LABELS.date)] = {
                    label: SAVED_SEARCH_LABELS.date,
                    value: result.getValue('created')
                };
                item[labelToKey(SAVED_SEARCH_LABELS.licenseCode)] = {
                    label: SAVED_SEARCH_LABELS.licenseCode,
                    value: fileData[fileId].licenseCode || ''
                };

                return item;
            });

            return {
                downloadableItems: fileSearchResults
            };
        }
    };
});
