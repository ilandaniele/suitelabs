define('AwaLabs.Inactivity.Message', [
    'Session.Message',
    'underscore',
    'jQuery'
], function AwaLabsInactivityMessage(
    SessionMessage,
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            this.application = application;
            this.checkSession();
        },

        checkSession: function checkSession() {
            var userProfile = this.application.getComponent('UserProfile');
            var self = this;
            userProfile.getUserProfile().then(function afterGetUserProfile(user) {
                if (!user || !user.isloggedin) {
                    return;
                }
                self.setNewSessionTimeoutHandler();
                jQuery(document).ajaxSuccess(function onSuccess() {
                    self.setNewSessionTimeoutHandler();
                });
            });
        },

        addDefinitionsToModalView: function addDefinitionsToModalView() {
            var self = this;
            var layout = this.application.getComponent('Layout');

            layout.addToViewContextDefinition('GlobalViews.Modal.View', 'closeAction', 'string', function addCloseAction(context) {
                return context.modalDialogClass === 'session-timeout' ? 'log-out' : '';
            });

            layout.addToViewEventsDefinition('GlobalViews.Modal.View', 'click [data-action="log-out"]', function logOut() {
                var environmentComponent = self.application.getComponent('Environment');
                window.location.href = environmentComponent.getSiteSetting('touchpoints.logout');
            });
        },

        setNewSessionTimeoutHandler: function setNewSessionTimeoutHandler() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.showModalDialog();
                self.addDefinitionsToModalView(); // add context properties to global view to trigger logout on dismiss modal button.
            }, 600000);
        },

        showModalDialog: function showModalDialog() {
            var view = new SessionMessage(this.application);
            var options = {
                modalOptions: {
                    backdrop: 'static',
                    keyboard: false
                }
            };

            this.application.getLayout().showInModal(view, options);
        }
    };
});
