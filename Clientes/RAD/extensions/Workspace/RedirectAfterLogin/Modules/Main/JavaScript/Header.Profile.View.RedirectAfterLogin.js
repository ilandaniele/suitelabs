
define('Header.Profile.View.RedirectAfterLogin', [
    'Backbone',
    'underscore'
], function HeaderProfileViewRedirectAfterLogin(
    Backbone,
    _
) {
    'use strict';

    var AdvancedSignUpHeaderView;
    var HeaderViewToExtend;

    try {
        AdvancedSignUpHeaderView = require('SuiteCommerce.AdvancedSignUp.AccessPoints.Header.View');

        if (AdvancedSignUpHeaderView) {
            HeaderViewToExtend = AdvancedSignUpHeaderView.HeaderView || AdvancedSignUpHeaderView;
        }
    } catch (e) {
        console.info('Redirect After Login: AdvancedSignUp is not enabled, leveraging native header module');
    }

    if (!HeaderViewToExtend) {
        try {
            HeaderViewToExtend = require('Header.Profile.View');
        } catch (e) {
            console.info('Redirect After Login: Native header module could not be loaded');
        }
    }

    if (HeaderViewToExtend) {
        _.extend(HeaderViewToExtend.prototype, {
            initialize: _.wrap(HeaderViewToExtend.prototype.initialize, function initialize(fn, options) {
                this.environment = options.application.getComponent('Environment');

                return fn.apply(this, _.toArray(arguments).slice(1));
            }),

            events: _.extend({}, HeaderViewToExtend.prototype.events, {
                'click .header-profile-register-link': 'updateRegisterUrl',
                'click .header-profile-login-link': 'updateLoginUrl',
                'click .header-menu-myaccount-signout-link': 'updateSignOutUrl'
            }),

            updateLoginUrl: function updateLoginUrl(e) {
                var $elem = this.$(e.currentTarget);
                $elem.attr('data-navigation', 'ignore-click');
                $elem.attr('href', this.generateLoginUrl());
            },

            updateRegisterUrl: function updateRegisterUrl(e) {
                var $elem = this.$(e.currentTarget);
                $elem.attr('data-navigation', 'ignore-click');
                $elem.attr('href', this.generateRegisterUrl());
            },

            updateSignOutUrl: function updateLoginUrl(e) {
                var $elem = this.$(e.currentTarget);
                $elem.attr('data-navigation', 'ignore-click');
                $elem.attr('href', this.generateSignOutUrl());
            },

            generateSignOutUrl: function generateSignOutUrl() {
                var touchpoint = this.environment.getSiteSetting('touchpoints.logout');
                var hash = Backbone.history.fragment;
                var signOutUrl = touchpoint.replace('logOut', 'customLogOut') + '&redirecturl=/' + encodeURIComponent(hash);

                return signOutUrl;
            },

            generateRegisterUrl: function generateRegisterUrl() {
                var register = this.environment.getSiteSetting('touchpoints.register');
                var registerUrl = this.generateUrl(register);

                return registerUrl;
            },

            generateLoginUrl: function generateLoginUrl() {
                var login = this.environment.getSiteSetting('touchpoints.login');
                var loginUrl = this.generateUrl(login);

                return loginUrl;
            },

            generateUrl: function generateUrl(touchpoint) {
                var origin = this.environment.getConfig('currentTouchpoint');
                var hash = Backbone.history.fragment;
                var loginUrl = touchpoint + '&origin=' + origin + '&origin_hash=' + encodeURIComponent(hash);

                return loginUrl;
            },

            getContext: _.wrap(HeaderViewToExtend.prototype.getContext, function getContext(fn) {
                var context = fn.apply(this, _.toArray(arguments).slice(1));

                context.loginUrl = this.generateLoginUrl();
                context.registerUrl = this.generateRegisterUrl();
                context.signOutUrl = this.generateSignOutUrl();

                return context;
            })
        });
    }
});
