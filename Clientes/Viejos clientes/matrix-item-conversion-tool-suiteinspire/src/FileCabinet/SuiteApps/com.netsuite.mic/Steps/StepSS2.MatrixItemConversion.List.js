/**
 *@NApiVersion 2.x
 *@NModuleScope TargetAccount
 */

// Step 0 - List all the item conversion activities with the "New Converting" button entry
define(
    [
        './StepSS2',
        'N/ui/serverWidget',
        'N/runtime',
        'N/url',
        'N/log',
        '../Helpers/MatrixConvertingHelperSS2',
        '../Services/MatrixItemConvertApiSS2',
        '../third_parties/underscore.js'
    ],function(
        Step,
        serverWidget,
        runtime,
        url,
        log,
        MatrixConvertingHelperSS2,
        MatrixItemConvertApiSS2,
        _
    ) {
        var step_list_item_conversions = {

            loadItemConversionData: function(request) {
                this.matrixItemConversions = MatrixItemConvertApiSS2.getAllMatrixItemConversion();
                log.debug({
                    title: 'this.loadItemConversionData',
                    details: JSON.stringify(this.matrixItemConversions)
                });
            },
            
            initializeStates: function() {
                var states = {};
                states[MatrixConvertingHelperSS2.FINISHED_STATUS] = 'Completed';
                states[MatrixConvertingHelperSS2.ERROR_STATUS] = 'Error';
                states[MatrixConvertingHelperSS2.CANCELLED_STATUS] = 'Canceled';
                states[MatrixConvertingHelperSS2.PROCESSING_STATUS] = 'Started';
                states[MatrixConvertingHelperSS2.PENDING_STATUS] = 'Pending';
                return states;
            },

            initializeColors: function(states) {
                var colors = {};
                colors[states[MatrixConvertingHelperSS2.FINISHED_STATUS]] = 'green';
                colors[states[MatrixConvertingHelperSS2.ERROR_STATUS]] = 'red';
                colors[states[MatrixConvertingHelperSS2.CANCELLED_STATUS]] = 'red';
                colors[states[MatrixConvertingHelperSS2.PROCESSING_STATUS]] = 'black';
                colors[states[MatrixConvertingHelperSS2.PENDING_STATUS]] = 'black';
                return colors;
            },

            fillList: function(list) {
                var self = this;
                log.debug({
                    title: 'this.convert matrix',
                    details: JSON.stringify(this.matrixItemConversions)
                });
                this.matrixItemConversions = _.sortBy(this.matrixItemConversions, function (matrixItemConversion){
                    return matrixItemConversion.id;
                });

                var rowData = []
                var states = self.initializeStates();
                var colors = self.initializeColors(states);
                var view_tpl = _.template('<span><a href="<%= convertDetailUrl %>">View</a></span>');
                var total_standalone_items_tpl = _.template('<span><%= totalStandaloneItems%></span>');
                var total_converted_items_tpl = _.template('<span><%= totalConvertedItems%></span>');
                var matrix_itemid_delimiter_tpl = _.template('<span><%= matrixItemidDelimiter%></span>');
                var conversion_user_tpl = _.template('<span><%= convertedBy %></span>');
                var status_tpl = _.template('<span style="color: <%= color %>"><%= status %></span>');
                var timestamp_tpl = _.template('<span><%= convertedTime %></span>');

                this.matrixItemConversions = _.filter(_.map(this.matrixItemConversions, function (matrixItemConversion){
                    var newConversion = {};
                    newConversion.view_conversion =  view_tpl({
                        convertDetailUrl: url.resolveRecord({
                            recordType: 'customrecord_mic_matrix_conversion',
                            recordId: matrixItemConversion.id,
                            isEditMode: false
                        })
                    });

                    newConversion.total_standalone_items = total_standalone_items_tpl({
                        totalStandaloneItems: matrixItemConversion.totalStandaloneItems
                    });

                    newConversion.total_converted_items = total_converted_items_tpl({
                        totalConvertedItems: matrixItemConversion.totalConvertedItems
                    });

                    newConversion.matrix_itemid_delimiter = matrix_itemid_delimiter_tpl({
                        matrixItemidDelimiter: matrixItemConversion.matrixItemidDelimiter
                    });

                    newConversion.converted_by = conversion_user_tpl({
                        convertedBy: matrixItemConversion.convertRunner
                    });

                    newConversion.status = status_tpl({
                        color: colors[matrixItemConversion.convertStatus],
                        status: matrixItemConversion.convertStatus
                    });

                    newConversion.lastmodified = timestamp_tpl({
                        convertedTime: matrixItemConversion.convertTime
                    });
                    return newConversion;

                }), _.identity);

                log.debug({
                    title: 'this.matrixItemConversions',
                    details: JSON.stringify(this.matrixItemConversions)
                });
                // Rows

                try{
                    list.addRows({
                        rows: _.values(this.matrixItemConversions)
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
                    title : 'MIC - Matrix Item Conversion'
                });

                // Columns
                var view_url = list.addColumn({
                    id: 'view_conversion',
                    label: 'View',
                    type: serverWidget.FieldType.URL
                });

                var script = runtime.getCurrentScript();

                list.addColumn({
                    id: 'total_standalone_items',
                    label: 'Total items to be converted',
                    type: serverWidget.FieldType.TEXT
                });
                list.addColumn({
                    id: 'total_converted_items',
                    label: 'Total Converted Items',
                    type: serverWidget.FieldType.TEXT
                });

                list.addColumn({
                    id: 'matrix_itemid_delimiter',
                    label: 'Matrix Item Name Delimiter',
                    type: serverWidget.FieldType.TEXT
                });


                list.addColumn({
                    id: 'converted_by',
                    label: 'Converted By',
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
                    id : 'new_conversion',
                    label : 'New Conversion',
                    functionName: 'new_conversion'
                });

                this.loadItemConversionData(request);
                this.fillList(list);

                list.clientScriptModulePath = '../Client/listConversions.js';

                return list;
            }

        };

        return _.extend({}, Step, step_list_item_conversions);
    });