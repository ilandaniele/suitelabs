/**
 *@NApiVersion 2.x
 *@NModuleScope TargetAccount
 */

// Step 0 - List all the transcaction update activities with the "New Updating" button entry
define(
    [
        './StepSS2',
        'N/ui/serverWidget',
        'N/runtime',
        'N/url',
        'N/log',
        '../Helpers/TransactionUpdateHelperSS2',
        '../Services/TransactionUpdateApiSS2',
        '../third_parties/underscore.js'
    ],function(
        Step,
        serverWidget,
        runtime,
        url,
        log,
        TransactionUpdateHelperSS2,
        TransactionUpdateApiSS2,
        _
    ) {
        var step_list_transaction_updates = {

            loadTransactionUpdateData: function(request) {
                this.transactionUpdates = TransactionUpdateApiSS2.getAllTransactionUpdate();
                log.debug({
                    title: 'this.loadTransactionUpdateData',
                    details: JSON.stringify(this.transactionUpdates)
                });
            },
            
            initializeStates: function() {
                var states = {};
                states[TransactionUpdateHelperSS2.FINISHED_STATUS] = 'Completed';
                states[TransactionUpdateHelperSS2.ERROR_STATUS] = 'Error';
                states[TransactionUpdateHelperSS2.CANCELLED_STATUS] = 'Canceled';
                states[TransactionUpdateHelperSS2.PROCESSING_STATUS] = 'Started';
                states[TransactionUpdateHelperSS2.PENDING_STATUS] = 'Pending';
                return states;
            },

            initializeColors: function(states) {
                var colors = {};
                colors[states[TransactionUpdateHelperSS2.FINISHED_STATUS]] = 'green';
                colors[states[TransactionUpdateHelperSS2.ERROR_STATUS]] = 'red';
                colors[states[TransactionUpdateHelperSS2.CANCELLED_STATUS]] = 'red';
                colors[states[TransactionUpdateHelperSS2.PROCESSING_STATUS]] = 'black';
                colors[states[TransactionUpdateHelperSS2.PENDING_STATUS]] = 'black';
                return colors;
            },

            fillList: function(list) {
                var self = this;
                log.debug({
                    title: 'this.update transaction',
                    details: JSON.stringify(this.transactionUpdates)
                });
                this.transactionUpdates = _.sortBy(this.transactionUpdates, function (transactionUpdate){
                    return transactionUpdate.id;
                });

                var rowData = []
                var states = self.initializeStates();
                var colors = self.initializeColors(states);
                var view_tpl = _.template('<span><a href="<%= updateDetailUrl %>">View</a></span>');
                // var total_standalone_transactions_tpl = _.template('<span><%= totalStandaloneTranactions%></span>');
                var total_updated_transactions_tpl = _.template('<span><%= totalUpdatedTranactions%></span>');
                // var matrix_transactionid_delimiter_tpl = _.template('<span><%= matrixTranactionidDelimiter%></span>');
                var update_user_tpl = _.template('<span><%= updatedBy %></span>');
                var status_tpl = _.template('<span style="color: <%= color %>"><%= status %></span>');
                var timestamp_tpl = _.template('<span><%= updatedTime %></span>');

                this.transactionUpdates = _.filter(_.map(this.transactionUpdates, function (transactionUpdate){
                    var newUpdate = {};
                    newUpdate.view_update =  view_tpl({
                        updateDetailUrl: url.resolveRecord({
                            recordType: 'customrecord_mic_transction_update',
                            recordId: transactionUpdate.id,
                            isEditMode: false
                        })
                    });

                    // newUpdate.total_standalone_transactions = total_standalone_transactions_tpl({
                    //     totalStandaloneTranactions: transactionUpdate.totalStandaloneTranactions
                    // });

                    newUpdate.total_updated_transactions = total_updated_transactions_tpl({
                        totalUpdatedTranactions: transactionUpdate.totalUpdatedTranactions
                    });

                    // newUpdate.matrix_transactionid_delimiter = matrix_transactionid_delimiter_tpl({
                    //     matrixTranactionidDelimiter: transactionUpdate.matrixTranactionidDelimiter
                    // });

                    newUpdate.updated_by = update_user_tpl({
                        updatedBy: transactionUpdate.updateRunner
                    });

                    newUpdate.status = status_tpl({
                        color: colors[transactionUpdate.updateStatus],
                        status: transactionUpdate.updateStatus
                    });

                    newUpdate.lastmodified = timestamp_tpl({
                        updatedTime: transactionUpdate.updateTime
                    });
                    return newUpdate;

                }), _.identity);

                log.debug({
                    title: 'this.transactionUpdates',
                    details: JSON.stringify(this.transactionUpdates)
                });
                // Rows

                try{
                    list.addRows({
                        rows: _.values(this.transactionUpdates)
                    });
                }catch(ex) {
                    log.error({
                        title: 'adding rows error',
                        details: JSON.stringify(ex)
                    });
                }


            },

            renderStep: function(request) {
                var list = serverWidget.createList({
                    title : 'MIC - Transaction Update'
                });

                // Columns
                var view_url = list.addColumn({
                    id: 'view_update',
                    label: 'View',
                    type: serverWidget.FieldType.URL
                });

                var script = runtime.getCurrentScript();

                // list.addColumn({
                //     id: 'total_standalone_transactions',
                //     label: 'Total transactions to be Updated',
                //     type: serverWidget.FieldType.TEXT
                // });
                list.addColumn({
                    id: 'total_updated_transactions',
                    label: 'Total Updated Tranactions',
                    type: serverWidget.FieldType.TEXT
                });

                // list.addColumn({
                //     id: 'matrix_transactionid_delimiter',
                //     label: 'Matrix Tranaction Name Delimiter',
                //     type: serverWidget.FieldType.TEXT
                // });


                list.addColumn({
                    id: 'updated_by',
                    label: 'Updated By',
                    type: serverWidget.FieldType.TEXT
                });
                list.addColumn({
                    id: 'lastmodified',
                    label: 'Last Modified',
                    type: serverWidget.FieldType.TEXT
                });

                list.addColumn({
                    id: 'status',
                    label: 'Status',
                    type: serverWidget.FieldType.LONGTEXT
                });


                list.addButton({
                    id : 'new_update',
                    label : 'New Update',
                    functionName: 'new_update'
                });

                this.loadTransactionUpdateData(request);
                this.fillList(list);

                list.clientScriptModulePath = '../Client/listUpdates.js';

                return list;
            }

        };

        return _.extend({}, Step, step_list_transaction_updates);
    });