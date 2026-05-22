/*
    © 2020 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

define('UPSAddressValidation.Address.ServiceController', [
    'Address.ServiceController',
    'Address.Model',
    'underscore'
], function UPSAddressValidationAddressServiceController(
    AddressServiceController,
    AddressModel,
    _
) {
    'use strict';

    return _(AddressServiceController).extend({
        name: 'UPSAddressValidation.Address.ServiceController',

        post: function AddressPost() {
            var validationData = AddressModel.create(this.data);
            var id = validationData.id;
            var addressData = AddressModel.get(id);
            _.extend(addressData, validationData);
            // Do not return anything here, we need send content with status 201
            this.sendContent(addressData, {
                'status': 201
            });
        },

        put: function AddressPut() {
            var id = this.request.getParameter('internalid');
            var data = _.omit(this.data, ['id', 'UPSValidationAddresses', 'UPSValidationError']);
            var validationData = AddressModel.update(id, data);
            var addressData = AddressModel.get(id);
            _.extend(addressData, validationData);
            return addressData;
        }
    });
});
