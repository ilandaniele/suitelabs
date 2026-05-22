    /**
     * @NApiVersion 2.x
     * @NScriptType MapReduceScript
     */
    define(['N/search', 'N/record', 'N/email', 'N/runtime', 'N/error', 'N/log'],
        function(search, record, email, runtime, error, log)
        {

            function handleErrorIfAny(summary)
            {
                var inputSummary = summary.inputSummary;
                var mapSummary = summary.mapSummary;
                var reduceSummary = summary.reduceSummary;

                if (inputSummary.error)
                {
                    var e = error.create({
                        name: 'INPUT_STAGE_FAILED',
                        message: inputSummary.error
                    });
                    // handleErrorAndSendNotification(e, 'getInputData');
                }

                handleErrorInStage('map', mapSummary);
                handleErrorInStage('reduce', reduceSummary);
            }

            function handleErrorInStage(stage, summary)
            {
                var errorMsg = [];
                summary.errors.iterator().each(function(key, value){
                    var msg = 'Failure: ' + key + '. Error was: ' + JSON.parse(value).message + '\n';
                    errorMsg.push(msg);
                    return true;
                });
                if (errorMsg.length > 0)
                {
                    var e = error.create({
                        name: 'Script Failure',
                        message: JSON.stringify(errorMsg)
                    });
                    log.error('error', errorMsg);

                    // handleErrorAndSendNotification(e, stage);
                }
            }

            function createSummaryRecord(summary)
            {
                try
                {
                    var script = runtime.getCurrentScript();
                    var convertTrackerId = script.getParameter({name: 'custscript_mic_transaction_update'});
       
                    var convertedTransactionSearch = search.create({
                        type: 'transaction',
                        columns: ['tranid'],
                        filters: [
                            ['custbody_mic_conversion_job', 'is', convertTrackerId]
                        ]
                    });
       
                    var convertedTransactionSearchResult = convertedTransactionSearch.runPaged();
                    if(convertTrackerId) {
                        record.submitFields({
                            type: 'customrecord_mic_transction_update',
                            id: convertTrackerId,
                            values: {
                                custrecord_mic_transaction_update_status: 'Completed',
                                custrecord_mic_total_transactions: convertedTransactionSearchResult.count
                            },
                            options: {
                                enableSourcing: false,
                                ignoreMandatoryFields : true
                            }
                        });
                    }       

                }
                catch(e)
                {
                    // handleErrorAndSendNotification(e, 'summarize');
                }
            }

            function applyUpdatedMatrixItemId(testMode, recordType, recordId, itemId, linenumber, newMatrixItemId)
            {
                try
                {
                    var script = runtime.getCurrentScript();
                    var convertTrackerId = script.getParameter({name: 'custscript_mic_transaction_update'});
       
                    log.debug('starting applyUpdatedMatrixItemId', 'starting applyUpdatedMatrixItemId');

                    switch(recordType) {
                        case 'salesorder':
                            recordType = record.Type.SALES_ORDER;
                            break;
                        case 'cashsale':
                            recordType = record.Type.CASH_SALE;
                            break;
                        case 'invoice':
                            recordType = record.Type.INVOICE;
                            break;
                        case 'opportunity':
                            recordType = record.Type.OPPORTUNITY;
                            break;
                        case 'estimate':
                            recordType = record.Type.ESTIMATE;
                            break;
                        case 'creditmemo':
                            recordType = record.Type.CREDIT_MEMO;
                            break;
                        case 'purchaseorder':
                            recordType = record.Type.PURCHASE_ORDER;
                            break;
                        case 'returnauthorization':
                            recordType = record.Type.RETURN_AUTHORIZATION;
                            break;
                            default:
                    }
                    var e = false;
                    var transaction = record.load({
                        type: recordType,
                        id: recordId,
                        isDynamic: true
                    });
                    log.debug('transaction', transaction);

                    var itemDetails = new Object();
                    var numLines = transaction.getLineCount({
                        sublistId : 'item'
                    }); // to get sublist line number 
                    if (numLines > 0) {
                        for (var i = 0; i < numLines; i++) {

                            var selectLine = transaction.selectLine({
                                sublistId: 'item',
                                line: i
                            });
                            log.debug('selectLine', selectLine);


                        // this can be used to get all item column field values and store in itemDetails object 
                            var fields = transaction.getSublistFields({
                                sublistId: 'item'
                            });

                            function getFieldValues(field) {
                                itemDetails[field] = transaction.getCurrentSublistValue({
                                    sublistId : 'item',
                                    fieldId : field
                                });
                            }
                            fields.forEach(getFieldValues);

                            if(!itemDetails.quantitybilled && !itemDetails.quantityfulfilled && (itemId == itemDetails.item)) {
                                // fields to set first in sequence   
                                transaction.setCurrentSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'item',
                                    value: newMatrixItemId
                                });

                                // set all fields
                                function setFieldValues(field) {
                                    if (field !== 'item') {
                                        transaction.setCurrentSublistValue({
                                            sublistId : 'item',
                                            fieldId : field,
                                            value: itemDetails[field]
                                        });
                                    }
                                }
                                fields.forEach(setFieldValues);

                                // fields to set last in sequence
                                if('excludefromraterequest' in itemDetails){
                                    transaction.setCurrentSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'excludefromraterequest',
                                        value: itemDetails.excludefromraterequest
                                    });
                                }

                            
                                transaction.setValue({
                                    fieldId: 'custbody_mic_conversion_job',
                                    value: convertTrackerId
                                });

                                transaction.commitLine({
                                    sublistId: 'item'
                                });

                                if(!testMode) {
                                    transaction.save();
                                }
                            }
                        }
                    }
                } catch(e)
                {
                    log.error('error', recordType + ' ' + recordId + ' failed to update with newMatrixItemId - ' + newMatrixItemId);
                    log.error('error', JSON.parse(e));
                } finally {
                    if (e) {
                    } else {
                        log.debug('success', recordType + ' ' + recordId + ' has been updated with newMatrixItemId - ' + newMatrixItemId);
                    }
                }
            }

            function getFeaturesInEffect(feature)
            {
                var featureInEffect = runtime.isFeatureInEffect({
                    feature: feature
                });
                return featureInEffect;

                // var featuresInEffect = new Object();

                // featuresInEffect.accountingPeriod = runtime.isFeatureInEffect({
                //     feature: 'ACCOUNTINGPERIODS'
                // });
                // featuresInEffect.pickPackShip = runtime.isFeatureInEffect({
                //     feature: 'PICKPACKSHIP'
                // });
                // featuresInEffect.subsidiaries = runtime.isFeatureInEffect({
                //     feature: 'SUBSIDIARIES'
                // });
                // featuresInEffect.multiprice = runtime.isFeatureInEffect({
                //     feature: 'MULTIPRICE'
                // });
                // // log.debug('featuresInEffect', 'ACCOUNTINGPERIODS: ' + featuresInEffect.accountingPeriod + ' PICKPACKSHIP: ' + featuresInEffect.pickPackShip + ' SUBSIDIARIES: ' + featuresInEffect.subsidiaries + ' MULTIPRICE: ' + featuresInEffect.multiprice );
                // return featuresInEffect;


            }

            function getInputData()
            {
                var script = runtime.getCurrentScript();
                var transactionUpdateRecord = script.getParameter({name: 'custscript_mic_transaction_update'});

                // getFeaturesInEffect();

                var filters = [];
                var columns = [
                        { name: 'formulanumericLineNumber',
                          formula: 'RANK() OVER (PARTITION by {internalid} ORDER BY {linesequencenumber})'
                        }, 
                        'type',
                        'status',
                        'internalid',
                        'item.custitem_mic_new_matrix_item',
                        'item.internalid',
                        'linesequencenumber'
                    ];
                var searchId = 'customsearch_mic_trans_search';

                if (searchId) {
                    var userProvidedSearch = search.load({
                        id: searchId
                    });
                    var filterExpression = userProvidedSearch.filterExpression;
                    filters.push(filterExpression);
                }
                log.debug('filters', filters);


                var transactionUpdateSearch = search.create({
                    type: 'transaction',
                    filters: filters,
                    columns: columns,
                    title: 'Transaction Search'
                });
                var transactionUpdateSearchResult = transactionUpdateSearch.runPaged();

                record.submitFields({
                    type: 'customrecord_mic_transction_update',
                    id: transactionUpdateRecord,
                    values: {
                        custrecord_mic_transaction_update_status: 'Started',
                        custrecord_mic_total_transactions: transactionUpdateSearchResult.count
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields : true
                    }
                });

                return transactionUpdateSearch;
                
            }

            function map(context)
            {
                var searchResult = JSON.parse(context.value);
                log.debug('searchResult', searchResult);
                var script = runtime.getCurrentScript();
                var transactionUpdateRecord = script.getParameter({name: 'custscript_mic_transaction_update'});
                var testMode = script.getParameter({name: 'custscript_mic_trans_testmode'});
                // var testMode = false;

                var recordType = searchResult.recordType;
                var transactionId = searchResult.id;
                var itemId = searchResult.values['internalid.item'].value;
                var linenumber = searchResult.values.formulanumericLineNumber - 1; // item array starts at 0 in SS 2.0
                var newMatrixItemId = searchResult.values['custitem_mic_new_matrix_item.item'].value;

                log.debug('preprocess', 'updating ' + recordType + ' ' + transactionId + ' itemID: ' + itemId + ' on line: ' + linenumber + ' with newMatrixItemId: ' + newMatrixItemId );

                record.submitFields({
                    type: 'customrecord_mic_transction_update',
                    id: transactionUpdateRecord,
                    values: {
                        custrecord_mic_transaction_update_status: 'Processing'
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields : true
                    }
                });

                if (itemId !== newMatrixItemId){
                    applyUpdatedMatrixItemId(testMode, recordType, transactionId, itemId, linenumber, newMatrixItemId);
                }

                context.write({
                    key: transactionId,
                    value: itemId
                });

            }

            function summarize(summary)
            {
                handleErrorIfAny(summary);
                createSummaryRecord(summary);
            }

            return {
                getInputData: getInputData,
                map: map,
                summarize: summarize
            };
        });
