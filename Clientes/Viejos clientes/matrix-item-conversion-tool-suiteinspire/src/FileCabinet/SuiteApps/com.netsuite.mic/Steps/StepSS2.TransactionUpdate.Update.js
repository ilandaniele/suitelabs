/**
 *@NApiVersion 2.x
 *@NModuleScope TargetAccount
 */
define(
    [
        './StepSS2',
        'N/ui/serverWidget',
        '../Helpers/TransactionUpdateHelperSS2',
        '../Services/TransactionUpdateApiSS2',
        '../third_parties/underscore.js'
    ],function(
        Step,
        serverWidget,
        TransactionUpdateHelperSS2,
        TransactionUpdateApiSS2,
        _
    )
    {
        var new_update = {

            // renderItemIdDelimiterSelect: function(form){
            //     var itemIdDelimiterField = form.addField({
            //         id: 'custpage_matrix_delimiter',
            //         type: serverWidget.FieldType.SELECT,
            //         label: 'Item ID Delimiter'
            //     });
            //     itemIdDelimiterField.isMandatory = true;

            //     itemIdDelimiterField.updateLayoutType({
            //         layoutType: serverWidget.FieldLayoutType.OUTSIDE
            //     });

            //     itemIdDelimiterField.updateBreakType({
            //         breakType: serverWidget.FieldBreakType.STARTROW
            //     });
            //     itemIdDelimiterField.addSelectOption({
            //         value: '',
            //         text: 'Pick one'
            //     });

            //     itemIdDelimiterField.addSelectOption({
            //         value: '-',
            //         text: '-'
            //     });
            //     itemIdDelimiterField.addSelectOption({
            //         value: ':',
            //         text: ':'
            //     });
            //     itemIdDelimiterField.addSelectOption({
            //         value: '#',
            //         text: '#'
            //     });
            // },

            renderStep: function(request) {
                var form = serverWidget.createForm({ title: 'MIC Transaction Updating' });

                // this.renderItemIdDelimiterSelect(form);

                form.addField({
                    id: 'service_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Service Name'
                }).updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                }).defaultValue = 'UpdateTransactions';

                form.addSubmitButton({
                    label: 'Update Transactions'
                });

                form.addButton({
                    id : 'custpage_transaction_updating_cancel_button',
                    label : 'Cancel',
                    functionName: 'cancelMICUpdating'
                });

                form.clientScriptModulePath = '../Client/newUpdate.js';
                return form;
            },

            redirectStep: function(request) {
                var params = request.parameters;
                // var itemidDelimiter = params.custpage_matrix_delimiter;

                var next_step_data = {};

                log.debug({
                    title: 'redirectStep - TransactionUpdating',
                    details: {
                        // itemidDelimiter: itemidDelimiter
                    }
                });

                TransactionUpdateHelperSS2.updateTransactions();
                next_step_data.service_name = 'TransactionUpdates';
                return next_step_data;
            }

        };

        return _.extend({}, Step, new_update);
    });