define('LoginRegisterTrade.Account.Model', [
    'Account.Model',
    'SC.Models.Init',
    'underscore',
    'Configuration'
], function LoginRegisterTradeAccountModel(
    AccountModel,
    ModelsInit,
    _,
    Configuration
) {
    'use strict';

    _.extend(AccountModel, {
        register: _.wrap(AccountModel.register, function register(fn, userData) {
            var result;
            var user;
            var customfields = {};

            userData.custentity_rad_web_customer_type = Configuration.get('tradeCustomerTypeId');
            userData.custentity_ps_cust_aprv = 'T';
            userData.emailsubscribe = userData.emailsubscribe && userData.emailsubscribe === 'F' ? 'F' : 'T';

            if (userData.custentity_rad_pending_trade_approval) {
                _.each(userData, function eachUserData(data, index) {
                    if (index.substring(0, 10) === 'custentity') {
                        customfields[index] = data;
                    }
                });

                user = {
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    companyname: userData.companyname,
                    email: userData.email,
                    password: userData.password,
                    password2: userData.password2,
                    emailsubscribe: userData.emailsubscribe && userData.emailsubscribe !== 'F' ? 'T' : 'F'
                };
                user = _.extend(user, customfields);
                result = ModelsInit.session.registerCustomer(user);

                ModelsInit.customer.updateProfile({
                    internalid: result.customerid,
                    phoneinfo: userData.phoneinfo,
                    customfields: {
                        category: userData.category,
                        resalenumber: userData.resalenumber,
                        vatregnumber: userData.vatregnumber,
                        url: userData.url
                    }
                });

                return result;
            }
            return fn.apply(this, [userData]);
        })
    });
});
