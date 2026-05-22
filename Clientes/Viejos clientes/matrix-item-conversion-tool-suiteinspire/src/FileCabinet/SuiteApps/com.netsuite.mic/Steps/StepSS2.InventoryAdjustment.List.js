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
        '../Helpers/InventoryAdjustmentHelperSS2',
        '../Services/InventoryAdjustmentApiSS2',
        '../third_parties/underscore.js'
    ],function(
        Step,
        serverWidget,
        runtime,
        url,
        log,
        InventoryAdjustmentHelperSS2,
        InventoryAdjustmentApiSS2,
        _
    ) {
        var step_list_image_renamings = {

            loadInventoryAdjustmentData: function(request) {
                this.inventoryAdjustments = InventoryAdjustmentApiSS2.getAllInventoryAdjustments();
                log.debug({
                    title: 'this.loadInventoryAdjustmentData',
                    details: JSON.stringify(this.inventoryAdjustments)
                });
            },
            
            initializeStates: function() {
                var states = {};
                states[InventoryAdjustmentHelperSS2.FINISHED_STATUS] = 'Completed';
                states[InventoryAdjustmentHelperSS2.ERROR_STATUS] = 'Error';
                states[InventoryAdjustmentHelperSS2.CANCELLED_STATUS] = 'Canceled';
                states[InventoryAdjustmentHelperSS2.PROCESSING_STATUS] = 'Started';
                states[InventoryAdjustmentHelperSS2.PENDING_STATUS] = 'Pending';
                return states;
            },

            initializeColors: function(states) {
                var colors = {};
                colors[states[InventoryAdjustmentHelperSS2.FINISHED_STATUS]] = 'green';
                colors[states[InventoryAdjustmentHelperSS2.ERROR_STATUS]] = 'red';
                colors[states[InventoryAdjustmentHelperSS2.CANCELLED_STATUS]] = 'red';
                colors[states[InventoryAdjustmentHelperSS2.PROCESSING_STATUS]] = 'black';
                colors[states[InventoryAdjustmentHelperSS2.PENDING_STATUS]] = 'black';
                return colors;
            },

            fillList: function(list) {
                var self = this;
                log.debug({
                    title: 'this.fillList inventory adjustments',
                    details: JSON.stringify(this.inventoryAdjustments)
                });
                this.inventoryAdjustments = _.sortBy(this.inventoryAdjustments, function (inventoryAdjustment){
                    return inventoryAdjustment.id;
                });

                var rowData = []
                var states = self.initializeStates();
                var colors = self.initializeColors(states);
                var view_tpl = _.template('<span><a href="<%= convertDetailUrl %>">View</a></span>');
                var adjustment_account = _.template('<span><%= adjustmentAccount%></span>');

                var adjusted_by_tpl = _.template('<span><%= adjustedBy %></span>');

                var posting_date_tpl = _.template('<span><%= postingDate %></span>');
                var posting_period_tpl = _.template('<span><%= postingPeriod %></span>');

                var status_tpl = _.template('<span style="color: <%= color %>"><%= status %></span>');
                var timestamp_tpl = _.template('<span><%= lastmodified %></span>');
                var subsidiary_tpl = _.template('<span><%= subsidiary %></span>');

                var view_inventoryadjustment_tpl = _.template('<span><a href="<%= inventoryAdjustmentUrl %>">Inventory Adjustment</a></span>');



                this.inventoryAdjustments = _.filter(_.map(this.inventoryAdjustments, function (inventoryAdjustment){
                    var newAdjustment = {};
                    newAdjustment.view_adjustment =  view_tpl({
                        convertDetailUrl: url.resolveRecord({
                            recordType: 'customrecord_mic_inventory_adjustment',
                            recordId: inventoryAdjustment.id,
                            isEditMode: false
                        })
                    });

                    newAdjustment.adjustment_account = adjustment_account({
                        adjustmentAccount: inventoryAdjustment.adjustmentAccount
                    });

                    newAdjustment.posting_date = posting_date_tpl({
                        postingDate: inventoryAdjustment.adjustmentPostDate
                    });

                    newAdjustment.posting_period = posting_period_tpl({
                        postingPeriod: inventoryAdjustment.adjustmentPeriod
                    });
                    
                    newAdjustment.adjusted_by = adjusted_by_tpl({
                        adjustedBy: inventoryAdjustment.adjustmentBy
                    });

                    newAdjustment.status = status_tpl({
                        color: colors[inventoryAdjustment.adjustmentStatus],
                        status: inventoryAdjustment.adjustmentStatus
                    });

                    newAdjustment.lastmodified = timestamp_tpl({
                        lastmodified: inventoryAdjustment.adjustmentDatetime
                    });

                    newAdjustment.subsidiary = subsidiary_tpl({
                        subsidiary: inventoryAdjustment.adjustmentSubsidiary
                    });
                    newAdjustment.inventoryadjustment = view_inventoryadjustment_tpl({
                        inventoryAdjustmentUrl: url.resolveRecord({
                            recordType: 'inventoryadjustment',
                            recordId: inventoryAdjustment.inventoryAdjustmentRec,
                            isEditMode: false
                        })
                    });

                    return newAdjustment;

                }), _.identity);

                log.debug({
                    title: 'this.inventoryAdjustments',
                    details: JSON.stringify(this.inventoryAdjustments)
                });
                // Rows

                try{
                    list.addRows({
                        rows: _.values(this.inventoryAdjustments)
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
                    title : 'MIC - Inventory Adjustment'
                });

                // Columns
                var view_url = list.addColumn({
                    id: 'view_adjustment',
                    label: 'View',
                    type: serverWidget.FieldType.URL
                });

                var script = runtime.getCurrentScript();

                list.addColumn({
                    id: 'adjustment_account',
                    label: 'Adjustment Account',
                    type: serverWidget.FieldType.TEXT,
                });

                list.addColumn({
                    id: 'posting_date',
                    label: 'Inventory Adjust Date',
                    type: serverWidget.FieldType.TEXT
                });

                list.addColumn({
                    id: 'posting_period',
                    label: 'Posting Period',
                    type: serverWidget.FieldType.TEXT,
                });

                list.addColumn({
                    id: 'subsidiary',
                    label: 'Subsidiary',
                    type: serverWidget.FieldType.TEXT,
                });

                list.addColumn({
                    id: 'adjusted_by',
                    label: 'Adjusted By',
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

                list.addColumn({
                    id: 'inventoryadjustment',
                    label: 'Inventory Adjustment',
                    type: serverWidget.FieldType.URL
                });

                list.addButton({
                    id : 'new_adjustment',
                    label : 'New Adjustment',
                    functionName: 'new_adjustment'
                });

                this.loadInventoryAdjustmentData(request);
                this.fillList(list);

                list.clientScriptModulePath = '../Client/listAdjustments.js';

                return list;
            }

        };

        return _.extend({}, Step, step_list_image_renamings);
    });