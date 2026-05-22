define('ACS.DefaultAddress', [
    'Application',
    'SC.Models.Init',
    'Address.Model',
    'underscore'
], function ACSDefaultAddress(
    Application,
    ModelInits,
    AddressModel,
    _
) {
    'use strict';

    function getDefaultValues(profile) {
        var x;
        var shipBillDefaults = {};
        var profileCustomFields = profile.customfields;
        var profileAddresses = AddressModel.list();
        var defaultShip = _.find(profileCustomFields, {
            name: 'custentity_cs_default_shipaddress'
        });
        var defaultBill = _.find(profileCustomFields, {
            name: 'custentity_cs_default_billaddress'
        });
        for (x = 0; x < profileAddresses.length; x++) {
            if (parseInt(profileAddresses[x].internalid, 10) === parseInt(defaultBill.value, 10)) {
                shipBillDefaults.defaultBillingData = profileAddresses[x];
                shipBillDefaults.defaultBillingData.defaultbilling = 'T';
            }
            if (parseInt(profileAddresses[x].internalid, 10) === parseInt(defaultShip.value, 10)) {
                shipBillDefaults.defaultShippingData = profileAddresses[x];
                shipBillDefaults.defaultShippingData.defaultshipping = 'T';
            }
        }

        return shipBillDefaults;
    }

    function unwrapAddressee(address) {
        if (address.company && address.company.trim().length > 0) {
            address.attention = address.fullname;
            address.addressee = address.company;
        } else {
            address.addressee = address.fullname;
            address.attention = null;
        }
        delete address.fullname;
        delete address.company;
        delete address.check;
        return address;
    }

    function setSessionObject(profile) {
        var userDefaults = ModelInits.context.getSessionObject('profileDefaultAddress');
        var defaultValues;
        var profileModel;
        if (!userDefaults) {
            if (!profile) {
                // eslint-disable-next-line global-require
                profileModel = require('Profile.Model').get();
            } else {
                profileModel = profile;
            }
            defaultValues = getDefaultValues(profileModel);
            ModelInits.context.setSessionObject('profileDefaultAddress', JSON.stringify(defaultValues));
        }
        return JSON.parse(userDefaults) || defaultValues;
    }

    function setDefaultAddress() {
        var userDefaults;
        var unwrapAddressBilling;
        var unwrapAddressShipping;
        try {
            userDefaults = setSessionObject();
            unwrapAddressBilling = unwrapAddressee(userDefaults.defaultBillingData);
            unwrapAddressShipping = unwrapAddressee(userDefaults.defaultShippingData);
            ModelInits.customer.updateAddress(unwrapAddressBilling);
            ModelInits.customer.updateAddress(unwrapAddressShipping);
        } catch (e) {
            nlapiLogExecution('ERROR', 'Address update error', JSON.stringify(e));
        }
    }

    Application.on('after:LiveOrder.submit', function afterLiveOrderSubmit() {
        setDefaultAddress();
    });

    Application.on('after:ProfileModel.get', function afterProfileModelGet(profile) {
        setSessionObject(profile);
    });
});
