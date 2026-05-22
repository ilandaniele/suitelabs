define('ContactUsLoggedIn.Page.View', [
    'Backbone',
    'Utils',
    'contact_us_logged_in_page.tpl',
    'jQuery'
], function ContactUsLoggedInPageView(
    Backbone,
    Utils,
    ContactusLoggedInPageTpl,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: ContactusLoggedInPageTpl,

        initialize: function initialize(options) {
            this.container = options.container || options.application;
        },

        getBreadcrumbPages: function getBreadcrumbPages() {
            return [{
                href: 'contact-us',
                text: Utils.translate('Contact Us')
            }];
        },

        beforeShowContent: function beforeShowContent() {
            var userProfileComponent = this.container.getComponent('UserProfile');
            var environmentComponent = this.container.getComponent('Environment');
            var self = this;
            var promise = jQuery.Deferred();

            if (userProfileComponent) {
                userProfileComponent
                    .getUserProfile()
                    .then(function afterGetUserProfile(profile) {
                        self.userProfile = profile;

                        if (profile.isloggedin) {
                            window.location.href = environmentComponent.getConfig('siteSettings.touchpoints.customercenter') + '#newcase';
                        }
                    })
                    .always(function alwaysGetUserProfile() {
                        promise.resolve();
                    });
            } else {
                promise.resolve();
            }

            return promise;
        },

        getContext: function getContext() {
            return {
                showCaseForm: this.userProfile && this.userProfile.isloggedin
            };
        }
    });
});
