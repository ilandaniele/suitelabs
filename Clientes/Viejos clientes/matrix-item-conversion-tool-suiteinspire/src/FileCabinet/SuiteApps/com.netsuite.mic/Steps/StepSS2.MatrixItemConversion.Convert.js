/**
 *@NApiVersion 2.x
 *@NModuleScope TargetAccount
 */
define(
    [
        './StepSS2',
        'N/ui/serverWidget',
        '../Helpers/MatrixConvertingHelperSS2',
        '../Services/MatrixItemConvertApiSS2',
        '../third_parties/underscore.js'
    ],function(
        Step,
        serverWidget,
        MatrixConvertingHelperSS2,
        MatrixItemConvertApiSS2,
        _
    )
    {
        var new_conversion = {

            renderItemIdDelimiterSelect: function(form){
                var itemIdDelimiterField = form.addField({
                    id: 'custpage_matrix_delimiter',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Item ID Delimiter'
                });
                itemIdDelimiterField.isMandatory = true;

                itemIdDelimiterField.updateLayoutType({
                    layoutType: serverWidget.FieldLayoutType.OUTSIDE
                });

                itemIdDelimiterField.updateBreakType({
                    breakType: serverWidget.FieldBreakType.STARTROW
                });
                itemIdDelimiterField.addSelectOption({
                    value: '',
                    text: 'Pick one'
                });

                itemIdDelimiterField.addSelectOption({
                    value: '-',
                    text: '-'
                });
                itemIdDelimiterField.addSelectOption({
                    value: ':',
                    text: ':'
                });
                itemIdDelimiterField.addSelectOption({
                    value: '#',
                    text: '#'
                });
            },

            renderStep: function(request) {
                var form = serverWidget.createForm({ title: 'MIC Matrix Item Converting' });

                this.renderItemIdDelimiterSelect(form);

                form.addField({
                    id: 'service_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Service Name'
                }).updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.HIDDEN
                }).defaultValue = 'ConvertMatrix';

                form.addSubmitButton({
                    label: 'Convert Items'
                });

                form.addButton({
                    id : 'custpage_mic_item_converting_cancel_button',
                    label : 'Cancel',
                    functionName: 'cancelMICConverting'
                });

                form.clientScriptModulePath = '../Client/newConversion.js';
                return form;
            },

            redirectStep: function(request) {
                var params = request.parameters;
                var itemidDelimiter = params.custpage_matrix_delimiter;

                var next_step_data = {};

                log.debug({
                    title: 'redirectStep - MatrixConverting',
                    details: {
                        itemidDelimiter: itemidDelimiter
                    }
                });

                MatrixConvertingHelperSS2.convertItems(itemidDelimiter);
                next_step_data.service_name = 'ItemConversions';
                return next_step_data;
            }

        };

        return _.extend({}, Step, new_conversion);
    });