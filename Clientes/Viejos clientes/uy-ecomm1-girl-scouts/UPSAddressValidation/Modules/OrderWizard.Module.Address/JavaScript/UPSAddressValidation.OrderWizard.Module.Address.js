/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.OrderWizard.Module.Address', [
    'OrderWizard.Module.Address',
    'jQuery',
    'underscore'
], function UPSAddressValidationOrderWizardModuleAddress(
    OrderWizardModuleAddress,
    jQuery,
    _
) {
    'use strict';

    var viewPrototye = OrderWizardModuleAddress.prototype;

    _(viewPrototye).extend({
        submit: function submit() {
            var self = this;
            var fakeEvent;
            var result;
            var saveResult;
            var addOptions;
            var originalModel;

            if (!this.isActive()) {
                return jQuery.Deferred().resolve();
            }

            // its a new address
            if (this.addressView) {
                originalModel = this.addressView.model;
                // The saveForm function expects the event to be in an element of the form or the form itself,
                // But in this case it may be in a button outside of the form (as the nav buttons live in the step)
                // or triggered by a module ready event, so we need to create a fake event which the target is the form itself
                fakeEvent = jQuery.Event('submit', {
                    target: this.addressView.$('form').get(0)
                });

                // Calls the saveForm, this may kick the backbone.validation, and it may return false if there were errors,
                // other ways it will return an Ajax promise
                result = this.addressView.saveForm(fakeEvent);

                saveResult = jQuery.Deferred();

                originalModel.on('UPSAddressSelected', function onUPSAddressSelected(model) {
                    self.addresses.reset(model);
                    saveResult.resolve();
                });

                // Went well, so there is a promise we can return, before returning we will set the address in the model
                // and add the model to the profile collection
                if (result && !result.frontEndValidationError) {
                    result.done(function saveFormCb(model) {
                        // Set Address id to the order model. This has to go before the following self.addresses.add() as it triggers the render
                        self.setAddress(model.internalid);

                        // we only want to trigger an event on add() when the user has some address and is not guest because if not,
                        // in OPC case (two instances of this module in the same page), the triggered re-render erase the module errors.
                        addOptions = (self.isGuest || self.addresses.length === 0) ? {
                            silent: true
                        } : null;
                        self.addresses.add(model, addOptions);

                        self.model.set('temp' + self.manage, null);

                        if (self.newAddressCreated) {
                            self.newAddressCreated(model.internalid, addOptions);
                        }

                        self.render();

                        if (!model.UPSValidationAddresses || !model.UPSValidationAddresses.length) {
                            saveResult.resolve();
                        }
                    });
                } else {
                    // There were errors so we return a rejected promise
                    saveResult.reject({
                        errorCode: 'ERR_CHK_INCOMPLETE_ADDRESS',
                        errorMessage: _('The address is incomplete').translate()
                    });
                }

                return saveResult;
            }

            return this.isValid();
        }
    });

    return OrderWizardModuleAddress;
});
