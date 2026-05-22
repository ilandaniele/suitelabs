define('LoginRegisterTrade.Trade.View', [
    'loginregister_trade.tpl',
    'LoginRegisterTrade.Model',
    'LoginRegisterTrade.Form.Model',
    'Dialog.Service',
    'GlobalViews.CountriesDropdown.View',
    'GlobalViews.States.View',
    'Backbone',
    'Backbone.FormView',
    'AjaxRequestsKiller',
    'Utils',
    'jQuery',
    'underscore'
], function LoginRegisterTradeView(
    loginRegisterTradeTpl,
    LoginRegisterTradeModel,
    LoginRegisterTradeFormModel,
    DialogService,
    CountriesDropdownView,
    GlobalViewsStatesView,
    Backbone,
    BackboneFormView,
    AjaxRequestsKiller,
    Utils,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        title: Utils.translate('Register Trade'),

        pageTitle: Utils.translate('Register Trade'),

        template: loginRegisterTradeTpl,

        events: {
            'submit form': 'customSaveForm',
            'blur [data-action="formatPhoneOffice"]': 'formatPhone',
            'blur [data-action="formatPhoneCell"]': 'formatPhone',
            'change [data-action="selectstate"]': 'eraseZip',
            'change [data-action="inputstate"]': 'eraseZip',
            'change [data-action="selectcountry"]': 'updateStatesEvent'
        },

        childViews: {
            'CountriesDropdown': function CountriesDropdown() {
                return new CountriesDropdownView({
                    countries: this.countries,
                    selectedCountry: this.selectedCountry,
                    manage: false
                });
            },
            'StatesView': function StatesView() {
                return new GlobalViewsStatesView({
                    countries: this.countries,
                    selectedCountry: this.selectedCountry,
                    selectedState: this.model.get('state'),
                    manage: false
                });
            }
        },

        bindings: {
            '[name="firstName"]': 'firstName',
            '[name="lastName"]': 'lastName',
            '[name="companyName"]': 'companyName',
            '[name="webSite"]': 'webSite',
            '[name="businessType"]': 'businessType',
            '[name="taxId"]': 'taxId',
            '[name="taxResaleNumber"]': 'taxResaleNumber',
            '[name="officePhone"]': 'officePhone',
            '[name="email"]': 'email',
            '[name="email2"]': 'email2',
            '[name="password"]': 'password',
            '[name="password2"]': 'password2',
            '[name="street"]': 'street',
            '[name="street2"]': 'street2',
            '[name="city"]': 'city',
            '[name="country"]': 'country',
            '[name="zip"]': 'zip'
        },

        initialize: function initialize(options) {
            this.environment = options.environment;
            this.countries = this.environment.getSiteSetting('countries');
            this.model = new LoginRegisterTradeModel();
            this.formModel = new LoginRegisterTradeFormModel();
            this.selectedCountry = this.environment.getConfig('siteSettings.defaultshipcountry') || _.first(_.keys(this.countries));
            this.selectedCountryGroup = this.selectedCountry === 'US' ? 'US' : 'Other';
            this.selectedCountry = this.selectedCountry || 'US';
            this.model.set('country', this.selectedCountry);
            BackboneFormView.add(this);
        },

        updateStatesEvent: function updateStatesEvent(e) {
            var value = this.$(e.currentTarget).val();

            this.updateStates(value);
        },

        updateStates: function updateStates(selectedCountry) {
            this.getChildViewInstance('StatesView').options.selectedCountry = selectedCountry;
            this.getChildViewInstance('StatesView').render();
            this.eraseZip();
        },

        customSaveForm: function customSaveForm(e) {
            var promise = BackboneFormView.saveForm.apply(this, arguments);
            var self = this;

            e.preventDefault();

            return promise && promise.done(function promiseSuccessCallback(data) {
                var performTrackedRedirection;

                if (data.success === true) {
                    performTrackedRedirection = function performTrackedRedirectionFn() {
                        var urlOptions = Utils.parseUrlOptions(window.location.search);
                        var touchpoints = SC.ENVIRONMENT.siteSettings.touchpoints;
                        var url;

                        if (urlOptions.origin && touchpoints[urlOptions.origin]) {
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
                    };

                    new DialogService(self.options.application).openDialog({
                        name: Utils.translate('Pending Trade Approval - Logged In'),
                        bodyHtml: Utils.translate('You will receive an email confirmation requesting copies ' +
                            ' of your business information to speed up the approval process <br>' +
                            '1. Current Business Licence, <br>' +
                            '2. Resale or Sales Certificate, OR <br>' +
                            '3. W9, Federal ID Form or EIN Form ' +
                            '(<a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" target="_blank">download a blank W9 here</a>)'),
                        headerText: Utils.translate('Thank you! Your application has been received.'),
                        onClose: function onClose() {
                            performTrackedRedirection();
                        }
                    });
                } else {
                    self.showError(data.errorMessage || 'Error creating your account.');
                }
            });
        },

        formatPhone: function formatPhone(e) {
            var target = jQuery(e.target);

            target.val(Utils.formatPhone(target.val(), '(123) 456-7890'));
        },

        eraseZip: function eraseZip() {
            var selectedCountry = this.$('[name="country"]').val();
            var countries = this.countries;
            var zipFieldset = this.$('[data-input="zip"]');
            var zipInput = this.$('input[name="zip"]', zipFieldset);

            zipInput.val('');

            if (countries[selectedCountry] && countries[selectedCountry].isziprequired === 'F') {
                zipFieldset.hide();
            } else {
                zipFieldset.show();
            }
        },

        beforeShowContent: function beforeShowContent() {
            return this.formModel.fetch({
                killerId: AjaxRequestsKiller.getKillerId()
            });
        },

        getContext: function getContext() {
            return {
                businessOptions: this.formModel.get('businessOptions') || [],
                selectedCountryGroupUS: this.selectedCountryGroup === 'US'
            };
        }
    });
});
