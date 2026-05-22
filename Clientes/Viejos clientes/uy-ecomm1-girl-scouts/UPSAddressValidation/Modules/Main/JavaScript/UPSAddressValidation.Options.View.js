/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.Options.View', [
    'ups_address_validation_options.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function UPSAddressValidationOptionsView(
    UPSAddressValidationOptionsTpl,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        events: {
            'click [data-action="navigate"]': 'updateAddress'
        },

        template: UPSAddressValidationOptionsTpl,

        initialize: function initialize(options) {
            var self = this;
            this.application = options.applications;
            this.model = options.model;
            this.validAddresses = _.map(options.validAddresses, function mapAddress(value) {
                return {
                    addr1: (value.addr1) ? value.addr1 : self.model.get('addr1'),
                    addr2: (value.addr2) ? value.addr2 : self.model.get('addr2'),
                    city: value.city,
                    state: value.state,
                    zipcode: value.zip
                };
            });
        },

        updateAddress: function updateAddress(e) {
            var self = this;
            var $target = jQuery(e.currentTarget);
            var addr1 = $target.data('addr1');
            var addr2 = $target.data('addr2');
            var city = $target.data('city');
            var state = $target.data('state');
            var zipcode = $target.data('zipcode');

            this.model.set('city', city);
            this.model.set('state', state);
            this.model.set('zip', zipcode);
            this.model.set('skipaddress', 'T');

            if (addr1) {
                this.model.set('addr1', addr1);
            }
            if (addr2) {
                this.model.set('addr2', addr2);
            }

            this.model.save().done(function saveDone(model) {
                if (self.$containerModal) {
                    self.$containerModal.modal('hide');
                }
                self.model.set('skipaddress', 'F');
                self.model.trigger('UPSAddressSelected', model);
            });
        },

        getContext: function getContext() {
            return {
                validAddresses: this.validAddresses,
                currentAdd1: this.model.get('addr1'),
                currentAdd2: this.model.get('addr2'),
                currentCity: this.model.get('city'),
                currentState: this.model.get('state'),
                currentZipcode: this.model.get('zip')
            };
        }
    });
});
