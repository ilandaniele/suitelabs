/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.Address.Edit.View', [
    'Address.Edit.View',
    'UPSAddressValidation.Options.View',
    'underscore'
], function UPSAddressValidationAddressEditView(
    AddressEditView,
    UPSAddressValidationOptionsView,
    _
) {
    'use strict';

    var viewPrototye = AddressEditView.prototype;

    _(viewPrototye).extend({
        initialize: _.wrap(viewPrototye.initialize, function wrapInitialized(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.model.once('saveCompleted', _.bind(this.validationResults, this));
        }),

        validationResults: function validationResults() {
            var error = this.model.get('UPSValidationError');
            var validAddresses = this.model.get('UPSValidationAddresses');
            var view;
            var layout = this.application.getLayout();

            this.model.set('skipaddress', 'F');
            this.model.set('UPSValidationAddresses', []);

            if (!error && validAddresses && validAddresses.length) {
                view = new UPSAddressValidationOptionsView({
                    application: this.options.application,
                    validAddresses: validAddresses,
                    model: this.model,
                    parentView: this
                });
                if (layout.$containerModal && layout.$containerModal.length) {
                    layout.$containerModal.modal('hide');
                }
                layout.showInModal(view);
            }
        }
    });

    return AddressEditView;
});
