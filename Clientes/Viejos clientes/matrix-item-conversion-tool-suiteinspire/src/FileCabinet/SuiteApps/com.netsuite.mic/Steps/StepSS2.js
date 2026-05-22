/**
 *@NApiVersion 2.x
 */
define(
    [
        'N/ui/serverWidget'
        ,   'N/runtime'
        ,   'N/redirect'
        ,   'N/search'
        ,   '../third_parties/underscore.js'
    ]
    ,   function(
        serverWidget
        ,   runtime
        ,   redirect
        ,   search
        ,   _
    )
    {
        var step = {

            renderStep: function(form) {
                return form;
            },

            redirectStep: function() {
                return {};
            },

            handleErrors: function(form, error) {
                var error_field = form.getField({id : 'custpage_error'});
                if(error_field) {
                    return;
                }

                form.addField({
                    id: 'custpage_error',
                    type: serverWidget.FieldType.LONGTEXT,
                    label: 'custpage_error'
                }).updateDisplayType({displayType : serverWidget.FieldDisplayType.HIDDEN});

                form.updateDefaultValues({
                    custpage_error: JSON.stringify(error)
                });
            },

            renderStepLabel: function(form) {

            },

            goToStep: function(next_step_data) {
                var script = runtime.getCurrentScript();

                redirect.toSuitelet({
                    scriptId: script.id,
                    deploymentId: script.deploymentId,
                    parameters: next_step_data
                });
            },

            onRequest: function(context) {
                log.debug({
                    title: 'AssistantSS2 - onRequest - context.request',
                    details: JSON.stringify(context.request)
                });

                log.debug({
                    title: 'AssistantSS2 - onRequest - context.request.parameters',
                    details: JSON.stringify(context.request.parameters)
                });


                if (context.request.method === 'GET') {

                    var form = serverWidget.createForm({
                        title: 'SB2SC Migration'
                    });

                    var error = context.request.parameters.error;

                    if(error) {
                        this.handleErrors( form, JSON.parse(error) );
                    }

                    form.addField({
                        id: 'service_name',
                        type: serverWidget.FieldType.TEXT,
                        label: 'service_name'
                    }).updateDisplayType({displayType : serverWidget.FieldDisplayType.HIDDEN});

                    var script = runtime.getCurrentScript();
                    var service_name = context.request.parameters.service_name || script.getParameter({name: 'custscript_sb2sc_service_name'});

                    form.updateDefaultValues({
                        service_name: service_name
                    });

                    form = this.renderStep(context.request, form);

                    context.response.writePage(form);
                } else {
                    log.debug({
                        title: 'AssistantSS2 - onRequest - In Post',
                        details: JSON.stringify(context.request.parameters)
                    });
                    var params = context.request.parameters;
                    var next_step_data = {
                        sb_website: params.custpage_sb_website,
                        commercecatalog: params.custpage_commercecatalog
                    };

                    log.debug({
                        title: 'AssistantSS2 - onRequest - In Post - next_step_data',
                        details: JSON.stringify(next_step_data)
                    });
                    var new_step_data = this.redirectStep(context.request);
                    if(new_step_data.error) {
                        return this.handleErrors( form, JSON.parse(new_step_data.error) );
                    }
                    next_step_data = _.extend(next_step_data, new_step_data);
                    //Removes null values
                    next_step_data = _.pick(next_step_data, _.identity);
                    this.goToStep(next_step_data);
                }
            }

        };

        return step;
    });