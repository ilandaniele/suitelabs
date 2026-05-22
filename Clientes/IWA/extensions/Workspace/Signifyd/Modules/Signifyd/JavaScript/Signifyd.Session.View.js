define('Signifyd.Session.View'
    , [
        'Wizard.Module'
        , 'signifyd_session_view.tpl'
    ]
    , function (
        WizardModule
        , signifyd_session_view_tpl
    )
    {
        'use strict';
        return WizardModule.extend({
            template: signifyd_session_view_tpl
            , getContext: function getContext()
            {
                var sessionId = window.sessionStorage.getItem('signifydsessionid');
                this.model.get('options').custbody_f3_signifyd_session_id = sessionId;
                return {
                    isReview: this.step.step_url == 'review'
                };
            }
        });
    });
