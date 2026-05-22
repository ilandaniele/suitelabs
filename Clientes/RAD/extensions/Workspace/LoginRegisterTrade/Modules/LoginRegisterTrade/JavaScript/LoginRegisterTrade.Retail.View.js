define('LoginRegisterTrade.Retail.View', [
    'LoginRegister.Register.View',
    'loginregister_retail.tpl',
    'Dialog.Service',
    'Loggers',
    'Profile.Model',
    'LiveOrder.Model',
    'Backbone',
    'Utils',
    'underscore'
], function LoginRegisterTradeView(
    LoginRegisterRegisterView,
    loginRegisterRetailTpl,
    DialogService,
    Loggers,
    ProfileModel,
    LiveOrderModel,
    Backbone,
    Utils,
    _
) {
    'use strict';

    return LoginRegisterRegisterView.extend({
        template: loginRegisterRetailTpl,

        events: _.extend(LoginRegisterRegisterView.prototype.events, {
            'submit form': 'customSaveForm'
        }),
        bindings: _.extend(LoginRegisterRegisterView.prototype.bindings, {
            '[name="email2"]': 'email2'
        }),

        redirect: function redirect(_context, response) {
            var self = this;
            var url;

            return this.cancelableTrigger('after:LoginRegister.register').then(function event() {
                var urlOptions = Utils.parseUrlOptions(window.location.search);
                var application = self.application;
                var profileModel;

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
                    self.trackEvent(function track() {
                        application.Configuration.currentTouchpoint = 'checkout';
                    });
                } else {
                    // Track Login Event
                    self.trackEvent(function trackEvent() {
                        var touchpoints = response.touchpoints;

                        // if we know from which touchpoint the user is coming from
                        if (urlOptions.origin && touchpoints[urlOptions.origin]) {
                            // we save the url to that touchpoint
                            url = touchpoints[urlOptions.origin];
                            // if there is an specific hash
                            if (urlOptions.origin_hash) {
                                // we add it to the url as a fragment
                                url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                            }
                        }
                    });
                }
            });
        },

        customSaveForm: function customSaveForm(e, model, props) {
            var application = this.application;
            var environment = application.getComponent('Environment');
            var customRegisterMessage = environment.getConfig('tradeCustomerTradeRegisterText');
            var promise = this.saveForm(e, model, props);
            var self = this;

            e.preventDefault();

            return promise && promise.done(function promiseSuccessCallback(data) {
                var loggers = Loggers && Loggers.Loggers.getLogger();
                var actionId = loggers.start('Customer Registration');

                if (data.user && data.user.internalid) {
                    loggers.end(actionId, {
                        operationIds: self.model.getOperationIds(),
                        status: 'success'
                    });
                    new DialogService(self.options.application).openDialog({
                        name: Utils.translate('Pending Retail Approval - Logged In'),
                        bodyHtml: Utils.translate(customRegisterMessage),
                        headerText: Utils.translate(''),
                        hideOkButton: true,
                        onClose: function onClose() {
                            var urlOptions = Utils.parseUrlOptions(window.location.search);
                            var url;

                            if (urlOptions.is && urlOptions.is === 'checkout') {
                                application.Configuration.currentTouchpoint = 'checkout';
                                Backbone.history.navigate('', { trigger: true });
                            } else if (urlOptions.origin && data.touchpoints[urlOptions.origin]) {
                                url = data.touchpoints[urlOptions.origin];
                                if (urlOptions.origin_hash) {
                                    url = Utils.addParamsToUrl(url, { fragment: urlOptions.origin_hash });
                                }
                                window.location.href = url;
                            } else {
                                window.location.href = data.touchpoints.home;
                            }
                        }
                    });
                } else {
                    self.showError(data.errorMessage || 'Error creating your account.');
                }
            });
        }
    });
});
