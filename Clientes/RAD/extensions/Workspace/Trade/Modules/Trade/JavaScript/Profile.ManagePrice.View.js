define('Profile.ManagePrice.View', [
    'GlobalViews.Message.View',

    'profile_manage_price.tpl',

    'Backbone',
    'Backbone.FormView',
    'jQuery',
    'underscore',

    'Utils'
], function ProfileManagePriceView(
    GlobalViewsMessageView,

    profileManagePriceTpl,

    Backbone,
    BackboneFormView,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: profileManagePriceTpl,

        events: {
            'change [data-action="disablePrice"]': 'disablePrice',
            'change [data-action="disableRetailPrice"]': 'disableRetailPrice'
        },

        initialize: function initialize() {
            BackboneFormView.add(this);
        },

        disablePrice: function disablePrice(e, isRetailPrice) {
            var self = this;
            var element = jQuery(e.currentTarget);
            var wrapFieldset = element.closest('fieldset');
            var promise;

            e.preventDefault();
            e.stopPropagation();

            this.model.set(
                isRetailPrice ? 'retailPriceEnabled' : 'pricingDisabled',
                element.is(':checked') ? 'T' : 'F'
            );
            // diasble element during profile update
            wrapFieldset.prop('disabled', true);

            promise = this.model.save();
            promise.done(function promiseDone() {
                self.showError(_('Invalid date format.').translate());
            }).fail(function promiseFail(error) {
                self.showError(error);
            }).always(function promiseAlways() {
                wrapFieldset.prop('disabled', false);
                jQuery(window).trigger('price_change');
            });
        },

        disableRetailPrice: function disableRetailPrice(e) {
            this.disablePrice(e, true);
        },

        showSuccess: function showSuccess() {
            var globalViewMessage;

            if (this.$savingForm) {
                globalViewMessage = new GlobalViewsMessageView({
                    message: _('Price display successfully updated!').translate(),
                    type: 'success',
                    closable: true
                });
                this.showContent();
                this.$('[data-type="alert-placeholder"]').append(globalViewMessage.render().$el.html());
            }
        },

        getContext: function getContext() {
            var customFields = this.model.get('customfields');
            var priceDisabled = customFields && _.findWhere(customFields, {
                name: 'custentity_pricing_disabled'
            });
            var useRetailPriceEnabled = customFields && _.findWhere(customFields, {
                name: 'custentity_catalog_retail_price_enabled'
            });

            return {
                priceDisabled: priceDisabled && priceDisabled.value === 'T',
                useRetailPriceEnabled: useRetailPriceEnabled && useRetailPriceEnabled.value === 'T'
            };
        }
    });
});
