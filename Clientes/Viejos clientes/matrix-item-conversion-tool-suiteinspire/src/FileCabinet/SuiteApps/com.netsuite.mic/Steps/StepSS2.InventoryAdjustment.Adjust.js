/**
 *@NApiVersion 2.x
 *@NModuleScope TargetAccount
 */
define(
    [
        './StepSS2',
        'N/ui/serverWidget',
        '../Helpers/InventoryAdjustmentHelperSS2',
        '../Services/InventoryAdjustmentApiSS2',
        '../third_parties/underscore.js'
    ],function(
        Step,
        serverWidget,
        InventoryAdjustmentHelperSS2,
        InventoryAdjustmentApiSS2,
        _
    )
    {
        var new_conversion = {


            // Rendering the fields required by Inventory Adjustment Record
            renderInventoryAdjustmentAccount: function (form) {
                var adjAccountField = form.addField({
                    id: 'custpage_adjustment_account',
                    label: 'Adjustment Account',
                    type: serverWidget.FieldType.SELECT,
                    source: 'account'
                });
                adjAccountField.isMandatory = true;
                adjAccountField.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.OUTSIDE
                });
                adjAccountField.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.STARTROW
                });

                var adjPostingDate = form.addField({
                    id: 'custpage_posting_date',
                    label: 'Inventory Adjust Date',
                    type: serverWidget.FieldType.DATE
                });
                adjPostingDate.isMandatory = true;
                adjPostingDate.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.OUTSIDE
                });
                adjPostingDate.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.STARTROW
                });
				
				adjPostingDate.defaultValue = new Date();

                var adjPostingPeriod = form.addField({
                    id: 'custpage_posting_period',
                    label: 'Posting Period',
                    type: serverWidget.FieldType.SELECT,
                    source:'accountingperiod'
                });
                adjPostingPeriod.isMandatory = true;
                adjPostingPeriod.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.OUTSIDE
                });
                adjPostingPeriod.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.STARTROW
                });

                var subsidiary = form.addField({
                    id: 'custpage_subsidiary',
                    label: 'Subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    source:'subsidiary'
                });
                subsidiary.isMandatory = false;
                subsidiary.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.OUTSIDE
                });
                subsidiary.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.STARTROW
                });

            },

            renderStep: function(request) {

                var form = serverWidget.createForm({ title: 'MIC Item Inventory Adjustment' });

                this.renderInventoryAdjustmentAccount(form);

                form.addField({
                    id: 'service_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Service Name'
                }).updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                }).defaultValue = 'AdjustInventory';

                form.addSubmitButton({
                    label: 'Adjust Inventory'
                });

                form.addButton({
                    id : 'custpage_mic_inventory_adjustment_cancel_button',
                    label : 'Cancel',
                    functionName: 'cancelMicAdjustment'
                });

                form.clientScriptModulePath = '../Client/newAdjustment.js';
                return form;
            },

            redirectStep: function(request) {
                var params = request.parameters;
                var adjustmentAccount = params.custpage_adjustment_account;
                var postingDate = params.custpage_posting_date;
                var postingPeriod = params.custpage_posting_period;
                var subsidiary = params.custpage_subsidiary;
                var next_step_data = {};

                log.debug({
                    title: 'redirectStep - Inventory Adjustment',
                    details: {
                        adjustmentAccount: adjustmentAccount,
                        postingDate: postingDate,
                        postingPeriod: postingPeriod,
                        subsidiary: subsidiary
                    }
                });

                InventoryAdjustmentHelperSS2.adjustInventory(adjustmentAccount, postingDate, postingPeriod, subsidiary);
                next_step_data.service_name = 'InventoryAdjustments';
                return next_step_data;
            }

        };

        return _.extend({}, Step, new_conversion);
    });