/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/search',
    'N/runtime',
    'N/file',
    'N/log'
], function CoolingCalculatorModel(
    nSearch,
    nRuntime,
    nFile,
    log
) {
    'use strict';

    var Configuration = {
        tlcRecordTypeId: 'customrecord_thermal_load_calc',
        tlcRecordFields: {
            internalid: 'internalid',
            tlcId: 'custrecord_tlc_code',
            formId: 'custrecord_tlc_store_form_id',
            totalLoad: 'custrecord_tlc_total_load',
            isPreview: 'custrecord_tlc_preview'
        },
        tlcRecordItemTypeId: 'customrecord_recommended_cooling_unit',
        tlcRecordItemFields: {
            parentId: 'custrecord_rcu_tlc_parent',
            id: 'custrecord_rcu_item',
            name: {
                name: 'storedisplayname',
                join: 'custrecord_rcu_item'
            },
            units: 'custrecord_rcu_units',
            unitType: 'custrecord_rcu_split_type',
            btuh: 'custrecord_rcu_unit_btuh_adjusted',
            temp: 'custrecord_rcu_desired_temp',
            exposure: 'custrecord_rcu_interior_exterior',
            airflowsCold: 'custrecord_rcu_cold_ductable',
            airflowsHot: 'custrecord_rcu_hot_ductable',
            notes: 'custrecord_rcu_notes',
            thumbnail: {
                name: 'storedisplaythumbnail',
                join: 'custrecord_rcu_item'
            }
        },
        rValueRecordId: 'customrecord_material_r_value',
        rValueRecordFields: {
            rValue: 'custrecord_r_value',
            material: 'custrecord_material',
            location: 'custrecord_material_location',
            thickness: 'custrecord_compulse_thickness'
        }
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
        getThermalRecordFieldValue: function getThermalRecordFieldValue(fieldName, filters) {
            var thermalRecordSearch;
            var thermalRecordSearchResults = [];
            var thermalRecordFieldValue = '';

            thermalRecordSearch = nSearch.create({
                type: Configuration.tlcRecordTypeId,
                columns: [fieldName],
                filters: filters
            });
            thermalRecordSearchResults = getAllSearchResults(thermalRecordSearch.run());

            if (thermalRecordSearchResults.length) {
                thermalRecordSearchResults.forEach(function eachRecord(record) {
                    thermalRecordFieldValue = record.getValue(fieldName);
                    return false;
                });
            }
            return thermalRecordFieldValue;
        },

        getThermalRecordTLCIdByFormId: function getThermalRecordIdByFormId(formId) {
            return this.getThermalRecordFieldValue(Configuration.tlcRecordFields.tlcId, [
                [
                    Configuration.tlcRecordFields.formId, nSearch.Operator.IS, String(formId)
                ]
            ]);
        },

        getThermalRecordByTLC: function getThermalRecordByTLC(tlcId) {
            var thermalRecordSearch;
            var thermalRecordSearchResults = [];
            var thermalRecord = {};

            thermalRecordSearch = nSearch.create({
                type: Configuration.tlcRecordTypeId,
                columns: [
                    Configuration.tlcRecordFields.internalid,
                    Configuration.tlcRecordFields.formId,
                    Configuration.tlcRecordFields.totalLoad,
                    Configuration.tlcRecordFields.tlcId,
                    Configuration.tlcRecordFields.isPreview
                ],
                filters: [
                    Configuration.tlcRecordFields.tlcId, nSearch.Operator.IS, String(tlcId)
                ]
            });
            thermalRecordSearchResults = getAllSearchResults(thermalRecordSearch.run());

            if (thermalRecordSearchResults.length) {
                thermalRecordSearchResults.forEach(function eachRecord(record) {
                    var keys = Object.keys(Configuration.tlcRecordFields);
                    var currentKey;
                    var i;

                    for (i = 0; i < keys.length; i++) {
                        currentKey = keys[i];
                        thermalRecord[currentKey] = record.getValue(Configuration.tlcRecordFields[currentKey]);
                    }

                    return false;
                });
            }

            return thermalRecord;
        },

        getImageUrl: function getImageUrl(imageId) {
            var imageUrl;
            var image;

            try {
                if (imageId) {
                    image = nFile.load({ id: imageId });
                    imageUrl = image.url;
                }
            } catch (e) {
                log.error('Error while loading an image', e.message);
            }

            return imageUrl;
        },

        getTLCItemDetails: function getTLCItemDetails(tlcId) {
            var itemDetails = [];
            var thermalRecord = this.getThermalRecordByTLC(tlcId);
            var thermalRecordItemSearch;
            var thermalRecordItemSearchResults = [];
            var self = this;

            log.error('thermalRecord', JSON.stringify(thermalRecord));

            if (thermalRecord.internalid) {
                thermalRecordItemSearch = nSearch.create({
                    type: Configuration.tlcRecordItemTypeId,
                    columns: [
                        Configuration.tlcRecordItemFields.id,
                        Configuration.tlcRecordItemFields.name,
                        Configuration.tlcRecordItemFields.units,
                        Configuration.tlcRecordItemFields.unitType,
                        Configuration.tlcRecordItemFields.btuh,
                        Configuration.tlcRecordItemFields.temp,
                        Configuration.tlcRecordItemFields.exposure,
                        Configuration.tlcRecordItemFields.airflowsCold,
                        Configuration.tlcRecordItemFields.airflowsHot,
                        Configuration.tlcRecordItemFields.notes,
                        Configuration.tlcRecordItemFields.thumbnail
                    ],
                    filters: [
                        [
                            Configuration.tlcRecordItemFields.parentId, nSearch.Operator.IS, thermalRecord.internalid
                        ], 'and', [
                            'isinactive', nSearch.Operator.IS, 'F'
                        ]
                    ]
                });
                thermalRecordItemSearchResults = getAllSearchResults(thermalRecordItemSearch.run());

                if (thermalRecordItemSearchResults.length) {
                    thermalRecordItemSearchResults.forEach(function eachRecord(record) {
                        itemDetails.push({
                            id: record.getValue(
                                Configuration.tlcRecordItemFields.id
                            ),
                            name: record.getValue(
                                Configuration.tlcRecordItemFields.name
                            ),
                            units: record.getValue(
                                Configuration.tlcRecordItemFields.units
                            ) || 1,
                            unitType: record.getValue(
                                Configuration.tlcRecordItemFields.unitType
                            ),
                            unitType_text: record.getText(
                                Configuration.tlcRecordItemFields.unitType
                            ),
                            btuh: record.getValue(
                                Configuration.tlcRecordItemFields.btuh
                            ),
                            temp: record.getValue(
                                Configuration.tlcRecordItemFields.temp
                            ),
                            exposure: record.getValue(
                                Configuration.tlcRecordItemFields.exposure
                            ),
                            exposure_text: record.getText(
                                Configuration.tlcRecordItemFields.exposure
                            ),
                            airflowsCold: record.getValue(
                                Configuration.tlcRecordItemFields.airflowsCold
                            ),
                            airflowsHot: record.getValue(
                                Configuration.tlcRecordItemFields.airflowsHot
                            ),
                            notes: record.getValue(
                                Configuration.tlcRecordItemFields.notes
                            ),
                            showNotes: !!record.getValue(
                                Configuration.tlcRecordItemFields.notes
                            ),
                            thumbnail: self.getImageUrl(record.getValue(
                                Configuration.tlcRecordItemFields.thumbnail
                            ))
                        });
                    });
                }
            }
            return {
                tlcId: tlcId,
                totalLoad: thermalRecord.totalLoad,
                items: itemDetails,
                isPreview: !!thermalRecord.isPreview
            };
        },

        getMaterialRValues: function getMaterialRValues() {
            var rValuesRecordSearch = nSearch.create({
                type: Configuration.rValueRecordId,
                columns: [
                    Configuration.rValueRecordFields.rValue,
                    Configuration.rValueRecordFields.material,
                    Configuration.rValueRecordFields.location,
                    Configuration.rValueRecordFields.thickness
                ],
                filters: [
                    [
                        'isinactive', nSearch.Operator.IS, 'F'
                    ]
                ]
            });
            var rValuesRecordSearchResults = getAllSearchResults(rValuesRecordSearch.run());
            var rValues = [];

            if (rValuesRecordSearchResults.length) {
                rValuesRecordSearchResults.forEach(function eachRecord(record) {
                    rValues.push({
                        rValue: record.getValue(
                            Configuration.rValueRecordFields.rValue
                        ),
                        thickness: record.getValue(
                            Configuration.rValueRecordFields.thickness
                        ),
                        material: record.getValue(
                            Configuration.rValueRecordFields.material
                        ),
                        material_text: record.getText(
                            Configuration.rValueRecordFields.material
                        ),
                        location: record.getValue(
                            Configuration.rValueRecordFields.location
                        ).split(','),
                        location_text: record.getText(
                            Configuration.rValueRecordFields.location
                        ).split(',')
                    });
                });
            }
            return {
                rValues: rValues
            };
        }
    };
});
