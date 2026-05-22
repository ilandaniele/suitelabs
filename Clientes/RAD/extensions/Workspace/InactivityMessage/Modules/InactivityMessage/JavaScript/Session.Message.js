define('Session.Message', [
    'session_message.tpl',
    'InactivityMessage.ProfileModel',
    'Dialog.Service',
    'InactivityMessage.Model',
    'underscore',
    'Backbone',
    'jQuery',
    'Utils'
], function SessionMessage(
    sessionMessageTpl,
    ProfileModel,
    DialogService,
    InactivityMessageModel,
    _,
    Backbone,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: sessionMessageTpl,
        title: _('Session Timeout').translate(),
        attributes: {
            'class': 'SessionMessageView'
        },
        modalClass: 'session-timeout',
        initialize: function initialize(application) {
            var self = this;
            this.application = application;
            this.sessionExpired = false;
            this.sessionMantained = false;
            this.inactivityMessageModel = new InactivityMessageModel();
            this.waitConfirmationLogout();
            this.on('afterViewRender', function afterViewRender() {
                _.defer(function deferEvent() {
                    jQuery('#modal').on('hidden.bs.modal', function hideModal() {
                        if (!self.sessionMantained) {
                            self.logOut();
                        }
                    });
                });
            });
        },

        events: {
            'click [data-action="maintain-session"]': 'keepSessionAlive'
        },

        keepSessionAlive: function keepSessionAlive() {
            var profileModel = new ProfileModel();
            var self = this;
            profileModel.fetch().done(function onDone() {
                if (profileModel.get('isLoggedIn') !== 'T') {
                    self.sessionExpired = true;
                    self.render();
                    return;
                }
                self.inactivityMessageModel.fetch().done(function onFetchDone() {
                    self.sessionMantained = true;
                    jQuery('#modal').modal('toggle');
                    if (profileModel.get('isPendingTradeApproval')) {
                        new DialogService(self.application)
                            .openDialog('Pending Trade Approval - Session Timeout');
                    }
                });
            });
        },

        waitConfirmationLogout: function waitConfirmationLogout() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.logOut();
            }, 30000);
        },

        logOut: function logOut() {
            var environmentComponent = this.application.getComponent('Environment');
            var logoutURL = environmentComponent.getSiteSetting('touchpoints.logout');

            window.location.href = logoutURL;
        },

        getContext: function getContext() {
            return {
                sessionExpired: this.sessionExpired,
                sessionMantained: this.sessionMantained
            };
        }
    });
});
