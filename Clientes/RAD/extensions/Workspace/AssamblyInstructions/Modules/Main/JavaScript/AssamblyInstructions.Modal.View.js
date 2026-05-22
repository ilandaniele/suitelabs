define('AssamblyInstructions.Modal.View', [
    'awalabs_assambly_modal.tpl',
    'Backbone'
], function AssamblyInstructionsView(
    awalabsAssamblyInstructionsModalTpl,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({
        events: {
            'click [data-action="goToLogin"]': 'redirectToLogin'
        },
        template: awalabsAssamblyInstructionsModalTpl,
        initialize: function initialize(options) {
            this.application = options.application;
        },
        redirectToLogin: function redirectToLogin(e) {
            // To redirect the login to the item once the user logs in.
            var environmentComponent = this.application.getComponent('Environment');
            var login = environmentComponent.getConfig('siteSettings.touchpoints.login') +
                '&origin=' + environmentComponent.getConfig('currentTouchpoint') +
                '&origin_hash=' + encodeURIComponent(Backbone.history.fragment);
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();

            window.location.href = login;
        },
        getContext: function getContext() {
            var environmentComponent = this.application.getComponent('Environment');
            return {
                assamblyInstructionMessage: environmentComponent.getConfig('assamblyInstructions.message')
            };
        }
    });
});
