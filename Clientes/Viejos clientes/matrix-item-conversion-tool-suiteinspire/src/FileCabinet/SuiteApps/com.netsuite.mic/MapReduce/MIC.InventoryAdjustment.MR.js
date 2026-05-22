/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define([
    'N/record',
    'N/search',
    'N/log',
    'N/format',
    'N/runtime'
], function mrIntenvoryAdjusment(
    nRecord,
    nSearch,
    nLog,
    nFormat,
    nRuntime
) {
    'use strict';

    function getInputData() {
        var searchId = nRuntime.getCurrentScript().getParameter('custscript_saved_search_id');
        var date = nRuntime.getCurrentScript().getParameter('custscript_date');
        var postingPeriod = nRuntime.getCurrentScript().getParameter('custscript_posting_period');
        var account = nRuntime.getCurrentScript().getParameter('custscript_account');
        var subsidiariesParameter = nRuntime.getCurrentScript().getParameter('custscript_mic_inventory_adjustment_sub');
        var inventoryAdjustmentId = nRuntime.getCurrentScript().getParameter('custscript_mic_inventory_adjustment_rec');

        nRecord.submitFields({
            type: 'customrecord_mic_inventory_adjustment',
            id: inventoryAdjustmentId,
            values: {
                custrecord_mic_inventory_adjst_status: 'Started'
            },
            options: {
                enableSourcing: false,
                ignoreMandatoryFields : true
            }
        });

        var mySearch = nSearch.load({
            id: searchId
        });

        var data = [];

        mySearch.run().each(function(result) {
        	var loopObj = {
        		oldItemId: result.getValue({ name: 'internalid', summary: nSearch.Summary.GROUP}),
        		locationName: result.getValue(mySearch.columns[2]),
        		quantityToAdjustOldItemBy: result.getValue(mySearch.columns[3]),
        		quantityToAdjustNewItemBy: result.getValue(mySearch.columns[4]),
        		newItemId: result.getValue(mySearch.columns[7]),
        		serialNumber: result.getText(mySearch.columns[8]) === null ? '- None -' : result.getText(mySearch.columns[8]),
        		account: account,
        		postingPeriod: postingPeriod,
        		date: date,
        		binNumber: result.getValue(mySearch.columns[9]) == '' ? '- None -' : result.getValue(mySearch.columns[9]),
        		estimatedUnitCost : result.getValue(mySearch.columns[10]),
				useSubsidiary: subsidiariesParameter,
				inventoryAdjustmentId: inventoryAdjustmentId
        	}
        	data.push(loopObj);

            return true;
        });

		if(data.length === 0) {
			nRecord.submitFields({
				type: 'customrecord_mic_inventory_adjustment',
				id: inventoryAdjustmentId,
				values: {
					custrecord_mic_inventory_adjst_status: 'No Search Results'
				},
				options: {
					enableSourcing: false,
					ignoreMandatoryFields : true
				}
			});
		}
        return data;
    }

    function map(context) {
	    try {
	      var searchResult = JSON.parse(context.value);
	      var locSub = getLocSub(searchResult.locationName, searchResult.useSubsidiary);
	      searchResult.location = locSub.location;
	      searchResult.subsidiaryName = locSub.subsidiaryName;
	      searchResult.subsidiary = locSub.subsidiary;

	      context.write({
	          key: context.key,
	          value: searchResult,
	        });

	    } catch (error) {
	      log.error({ title: logTitle, details: error });
	    }
  }

    function reduce(context) {

        var data = JSON.parse(context.values[0]);

        nRecord.submitFields({
            type: 'customrecord_mic_inventory_adjustment',
            id: data.inventoryAdjustmentId,
            values: {
                custrecord_mic_inventory_adjst_status: 'Processing'
            },
            options: {
                enableSourcing: false,
                ignoreMandatoryFields : true
            }
        });

        try {
			var inventoryAdjustmentRecord = nRecord.create({
				type: nRecord.Type.INVENTORY_ADJUSTMENT,
				isDynamic: true
			});

			if(data.subsidiary) {
				inventoryAdjustmentRecord.setValue({
					fieldId: 'subsidiary',
					value: data.subsidiary,
					ignoreFieldChange: false
				});
			}

			inventoryAdjustmentRecord.setValue({
				fieldId: 'account',
				value: data.account,
				ignoreFieldChange: false
			});

			var date = nFormat.parse({
				value: data.date,
				type: nFormat.Type.DATE
			});

			inventoryAdjustmentRecord.setValue({
				fieldId: 'trandate',
				value: date,
				ignoreFieldChange: false
			});

			inventoryAdjustmentRecord.setValue({
				fieldId: 'postingperiod',
				value: data.postingPeriod,
				ignoreFieldChange: false
			});

			inventoryAdjustmentRecord.selectLine({
				sublistId: 'inventory',
				line: 0
			});

			inventoryAdjustmentRecord.setCurrentSublistValue({
				sublistId: 'inventory',
				fieldId: 'item',
				value: data.oldItemId
			});
			inventoryAdjustmentRecord.setCurrentSublistValue({
				sublistId: 'inventory',
				fieldId: 'adjustqtyby',
				value: data.quantityToAdjustOldItemBy
			});
			inventoryAdjustmentRecord.setCurrentSublistValue({
				sublistId: 'inventory',
				fieldId: 'location',
				value: data.location,
				ignoreFieldChange: false
			});
			if(data.serialNumber !== '- None -' || data.binNumber !== '- None -') {
				var inventoryDetailOldItemRecord = inventoryAdjustmentRecord.getCurrentSublistSubrecord({
					sublistId: 'inventory',
					fieldId: 'inventorydetail'
				});
				inventoryDetailOldItemRecord.setValue({
					fieldId: 'location',
					value: data.location,
					ignoreFieldChange: false
				});
				inventoryDetailOldItemRecord.setValue({
					fieldId: 'item',
					value: data.oldItemId,
					ignoreFieldChange: false
				});
				inventoryDetailOldItemRecord.selectNewLine({
					sublistId: 'inventoryassignment'
				});
				if(data.serialNumber !== '- None -') {
					inventoryDetailOldItemRecord.setCurrentSublistValue({
						sublistId: 'inventoryassignment',
						fieldId: 'receiptinventorynumber',
						value: data.serialNumber
					});
				}
				if(data.binNumber !== '- None -') {
					inventoryDetailOldItemRecord.setCurrentSublistValue({
						sublistId: 'inventoryassignment',
						fieldId: 'binnumber',
						value:  data.binNumber
					});
				}
				inventoryDetailOldItemRecord.setCurrentSublistValue({
					sublistId: 'inventoryassignment',
					fieldId: 'inventorystatus',
					value: 1
				});
				inventoryDetailOldItemRecord.setCurrentSublistValue({
					sublistId: 'inventoryassignment',
					fieldId: 'quantity',
					value: data.quantityToAdjustOldItemBy
				});
				inventoryDetailOldItemRecord.commitLine({
					sublistId: 'inventoryassignment'
				});
			}
			inventoryAdjustmentRecord.commitLine({
				sublistId: 'inventory'
			});
			inventoryAdjustmentRecord.selectLine({
				sublistId: 'inventory',
				line: 1
			});
			inventoryAdjustmentRecord.setCurrentSublistValue({
				sublistId: 'inventory',
				fieldId: 'item',
				value: data.newItemId
			});
			inventoryAdjustmentRecord.setCurrentSublistValue({
				sublistId: 'inventory',
				fieldId: 'adjustqtyby',
				value: data.quantityToAdjustNewItemBy
			});

			inventoryAdjustmentRecord.setCurrentSublistValue({
				sublistId: 'inventory',
				fieldId: 'unitcost',
				value: parseFloat(data.estimatedUnitCost)
			});
			inventoryAdjustmentRecord.setCurrentSublistValue({
				sublistId: 'inventory',
				fieldId: 'location',
				value: data.location,
				ignoreFieldChange: false
			});
			if(data.serialNumber !== '- None -' || data.binNumber !== '- None -') {
				var inventoryDetailNewItemRecord = inventoryAdjustmentRecord.getCurrentSublistSubrecord({
					sublistId: 'inventory',
					fieldId: 'inventorydetail'
				});
				inventoryDetailNewItemRecord.selectNewLine({
					sublistId: 'inventoryassignment'
				});
				if(data.serialNumber !== '- None -') {
					inventoryDetailNewItemRecord.setCurrentSublistValue({
						sublistId: 'inventoryassignment',
						fieldId: 'receiptinventorynumber',
						value: data.serialNumber
					});
				}
				if(data.binNumber !== '- None -') {
					inventoryDetailNewItemRecord.setCurrentSublistValue({
						sublistId: 'inventoryassignment',
						fieldId: 'binnumber',
						value: parseInt(data.binNumber)
					});
				}
				inventoryDetailNewItemRecord.setCurrentSublistValue({
					sublistId: 'inventoryassignment',
					fieldId: 'inventorystatus',
					value: 1
				});
				inventoryDetailNewItemRecord.setCurrentSublistValue({
					sublistId: 'inventoryassignment',
					fieldId: 'quantity',
					value: data.quantityToAdjustNewItemBy
				});

				inventoryDetailNewItemRecord.commitLine({
					sublistId: 'inventoryassignment'
				});
			}
			inventoryAdjustmentRecord.commitLine({
				sublistId: 'inventory'
			});
			var inventoryAdjustmentRecId = inventoryAdjustmentRecord.save({
				enableSourcing: true,
				ignoreMandatoryFields: true
			});

			nRecord.submitFields({
				type: 'customrecord_mic_inventory_adjustment',
				id: data.inventoryAdjustmentId,
				values: {
					custrecord_mic_inventory_adjst_status: 'Completed',
					custrecord_mic_inventory_adjst_record: inventoryAdjustmentRecId
				},
				options: {
					enableSourcing: false,
					ignoreMandatoryFields : true
				}
			});

		} catch(ex) {
			nLog.error('error', JSON.stringify(ex));
		}
    }

	function summarize(context) {
		nLog.debug('context',context);

		nLog.debug('entered','summarize function');
  //       var data = JSON.parse(context.value);

		// if(data.inventoryAdjustmentRecId !== ''){
		// 	nRecord.submitFields({
		// 		type: 'customrecord_mic_inventory_adjustment',
		// 		id: inventoryAdjustmentId,
		// 		values: {
		// 			custrecord_mic_inventory_adjst_status: 'Completed',
		// 			custrecord_mic_inventory_adjst_record: inventoryAdjustmentRecId
		// 		},
		// 		options: {
		// 			enableSourcing: false,
		// 			ignoreMandatoryFields : true
		// 		}
		// 	});
		// } else {
		// 	nRecord.submitFields({
		// 		type: 'customrecord_mic_inventory_adjustment',
		// 		id: data.inventoryAdjustmentId,
		// 		values: {
		// 			custrecord_mic_inventory_adjst_status: 'No Search Results'
		// 		},
		// 		options: {
		// 			enableSourcing: false,
		// 			ignoreMandatoryFields : true
		// 		}
		// 	});
		// }
    }

    function getLocSub(locationName, useSubsidiary) {

		var locations = [];
        var subsidiaries = [];
        var subsidiaryNames = [];
    	var filterLocations = [];
    	var filter = [
                'name', nSearch.Operator.IS, locationName
            ];

        var myLocationSearch;

        if(useSubsidiary) {
            myLocationSearch = nSearch.create({
                type: nSearch.Type.LOCATION,
                columns: [{
                    name: 'internalid'
                }, {
                    name: 'name'
                }, {
                    name: 'subsidiary'
                }],
                filters: [filter]
            });
        } else {
            myLocationSearch = nSearch.create({
                type: nSearch.Type.LOCATION,
                columns: [{
                    name: 'internalid'
                }, {
                    name: 'name'
                }],
                filters: [filter]
            });
        }

        myLocationSearch.run().each(function(location) {
            if(useSubsidiary) {
                locations.push(
                    {
                        'name': location.getValue({name: 'name'}),
                        'internalid': location.getValue({name:'internalid'}),
                        'subsidiary': location.getValue({name:'subsidiary'})
                    }
                );
                subsidiaryNames.push(location.getValue({name:'subsidiary'}));
            }else{
                locations.push(
                    {
                        'name': location.getValue({name: 'name'}),
                        'internalid': location.getValue({name:'internalid'})
                    }
                );
            }
            return true;
        });
        if(useSubsidiary) {
            var filterSubsidiaries = [];
            subsidiaryNames.forEach(function eachLocationName(subsidiaryName) {
                var filter = [
                    'name', nSearch.Operator.CONTAINS, subsidiaryName
                ];
                if (filterSubsidiaries.length) {
                    filterSubsidiaries.push('or', filter);
                } else {
                    filterSubsidiaries.push(filter);
                }
            });
            var mySubsidiarySearch = nSearch.create({
                type: nSearch.Type.SUBSIDIARY,
                columns: [{
                    name: 'internalid'
                }, {
                    name: 'name'
                }],
                filters: [filterSubsidiaries]
            });
            mySubsidiarySearch.run().each(function(subsidiary) {
                subsidiaries.push(
                    {
                        'internalid': subsidiary.getValue({name:'internalid'}),
                        'name': subsidiary.getValue({name:'name'}),
                    }
                );
                return true;
            });
        }

        return {
        	location : locations[0].internalid,
        	subsidiaryName: useSubsidiary ? locations[0].subsidiary : '',
        	subsidiary: useSubsidiary ? subsidiaries[0].internalid : ''
        }
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
