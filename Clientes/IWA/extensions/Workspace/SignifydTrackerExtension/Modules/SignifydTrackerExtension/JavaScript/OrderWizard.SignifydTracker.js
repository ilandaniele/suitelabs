define(
    'OrderWizard.SignifydTracker'
    ,	[	'Wizard.Module'
        ,	'underscore'
    ]
    ,	function (
        WizardModule
        ,	_
    )
    {
        'use strict';
        return WizardModule.extend(
            {
                initialize: function()
                {
                    var self = this;
                    WizardModule.prototype.initialize.apply(this, arguments);
                    self.application = self.options.wizard.application;
                },

                render: function () {
                    if (!SC.isPageGenerator()) {
                        var self = this;
                        var options = self.options.wizard.model.get("options");
                        if(options) {
                            var signifyd_session_id = options.custbody_f3_signifyd_session_id ? options.custbody_f3_signifyd_session_id : "";
                            if(signifyd_session_id.length <= 0) {
                                options.custbody_f3_signifyd_session_id = jQuery.cookie("SignifydSessionId");
                                self.options.wizard.model.set("options", options);   
                                self.options.wizard.model.save().done(function (response) {
                                    
                                });
                            }
                        }
                    }
                },

            	getContext: function ()
                {
                    return { };
                }
            });
    });
