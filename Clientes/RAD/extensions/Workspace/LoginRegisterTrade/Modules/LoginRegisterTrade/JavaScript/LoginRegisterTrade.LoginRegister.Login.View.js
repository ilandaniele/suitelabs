define('LoginRegisterTrade.LoginRegister.Login.View', [
    'LoginRegister.Login.View',
    'Dialog.Service',
    'Utils',
    'underscore'
], function LoginRegisterTradeLoginRegisterLoginView(
    LoginRegisterLoginView,
    DialogService,
    Utils,
    _
) {
    'use strict';

    _.extend(LoginRegisterLoginView.prototype, {
        redirect: function redirect(context, response) {
            var self = this;

            var performTrackedRedirection = function performTrackedRedirection() {
                var urlOptions = Utils.parseUrlOptions(window.location.search);
                var touchpoints = response.touchpoints;
                var isPasswordReset = urlOptions.passwdret;
                var url;

                // Track Login Event
                self.trackEvent(function trackEvent() {
                    if (
                        !isPasswordReset &&
                        (urlOptions.is === 'checkout' || urlOptions.origin === 'checkout')
                    ) {
                        self.refreshApplication(response);
                    } else if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                        // we save the URL to that touchpoint
                        url = touchpoints[urlOptions.origin];
                        // if there is an specific hash
                        if (urlOptions.origin_hash) {
                            // we add it to the URL as a fragment
                            url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                        }
                        window.location.href = url;
                    } else {
                        // otherwise we need to take it to home
                        window.location.href = touchpoints.home;
                    }
                });
            };

            // If user is pending trade approval, before redirecting, display a popup dialog
            if (context.get('user').isPendingTradeApproval) {
                new DialogService(this.application).openDialog({
                    name: 'Pending Trade Approval - Logged In',
                    onClose: function onClose() {
                        performTrackedRedirection();
                    }
                });
            } else {
                performTrackedRedirection();
            }
        }
    });
});
