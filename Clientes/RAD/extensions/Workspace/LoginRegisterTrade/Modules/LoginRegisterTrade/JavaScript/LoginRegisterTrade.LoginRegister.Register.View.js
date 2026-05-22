define('LoginRegisterTrade.LoginRegister.Register.View', [
    'LoginRegister.Register.View',
    'Profile.Model',
    'LiveOrder.Model',
    'Configuration',
    'Backbone',
    'Utils',
    'underscore'
], function LoginRegisterTradeLoginRegisterRegisterView(
    LoginRegisterRegisterView,
    ProfileModel,
    LiveOrderModel,
    Configuration,
    Backbone,
    Utils,
    _
) {
    'use strict';

    _.extend(LoginRegisterRegisterView.prototype, {
        redirect: function redirect(_context, response) {
            var self = this;

            return this.cancelableTrigger('after:LoginRegister.register').then(function thenFn() {
                var urlOptions = Utils.parseUrlOptions(window.location.search);
                var touchpoints = response.touchpoints;
                var application = self.application;
                var profileModel;
                var url;

                if (urlOptions.is && urlOptions.is === 'checkout') {
                    profileModel = ProfileModel.getInstance();

                    if (response.user) {
                        profileModel.set(response.user);
                    }
                    if (response.cart) {
                        LiveOrderModel.getInstance().set(response.cart);
                    }
                    if (response.address) {
                        profileModel.get('addresses').reset(response.address);
                    }
                    if (response.paymentmethod) {
                        profileModel.get('paymentmethods').reset(response.paymentmethod);
                    }

                    // Track Guest Checkout Event
                    self.trackEvent(function trackEvent() {
                        application.Configuration.currentTouchpoint = 'checkout';
                        Backbone.history.navigate('', { trigger: true });
                    });
                } else {
                    // Track Login Event
                    self.trackEvent(function trackEventFn() {
                        // if we know from which touchpoint the user is coming from
                        if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                            // we save the url to that touchpoint
                            url = touchpoints[urlOptions.origin];
                            // if there is an specific hash
                            if (urlOptions.origin_hash) {
                                // we add it to the url as a fragment
                                url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                            }
                            window.location.href = url;
                        } else if (
                            Configuration.getRegistrationType() !== 'disabled' &&
                            SC.ENVIRONMENT.siteSettings.siteloginrequired === 'T'
                        ) {
                            window.location.href = touchpoints.home;
                        } else {
                            // otherwise we need to take it to the login page
                            window.location.href = touchpoints.login;
                        }
                    });
                }
            });
        }
    });
});
