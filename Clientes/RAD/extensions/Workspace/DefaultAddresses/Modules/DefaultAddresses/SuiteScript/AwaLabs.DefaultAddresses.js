define('AwaLabs.DefaultAddresses', [
    'Application',
    'underscore',
    'SC.Models.Init'
], function DefaultAddresses(
    Application,
    _,
    SCModelsInit
) {
    'use strict';

    var Utils = {
        updateProfileAddress: function updateProfileAddress(data) {
            var customerUpdated = false;
            var customerUpdate = {
                internalid: parseInt(nlapiGetUser(), 10),
                customfields: {}
            };

            if (data.defaultshipping === 'T') {
                customerUpdate.customfields = _.extend(customerUpdate.customfields, {
                    'custentity_cs_default_shipaddress': data.internalid
                });
                customerUpdated = true;
            }
            if (data.defaultbilling === 'T') {
                customerUpdate.customfields = _.extend(customerUpdate.customfields, {
                    'custentity_cs_default_billaddress': data.internalid
                });
                customerUpdated = true;
            }
            if (customerUpdated) {
                SCModelsInit.customer.updateProfile(customerUpdate);
            }
        }
    };

    Application.on('after:Address.update', function AddressUpdate(Model, result, id, data) {
        data.internalid = id;
        Utils.updateProfileAddress(data);
        return result;
    });

    Application.on('after:Address.create', function AddressCreate(Model, result, data) {
        data.internalid = result;
        Utils.updateProfileAddress(data);
        return result;
    });
});
