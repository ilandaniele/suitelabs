define('GeoIPLocation.Account.Model', [
    'Account.Model',
    'GeoIPLocation.Model',
    'underscore',
    'SC.Models.Init'
], function GeoIPLocationAccountModel(
    AccountModel,
    GeoIPLocationModel,
    _,
    ModelsInit
) {
    'use strict';

    var unapprovedTradeCustomer = {
        status: 500,
        code: 'ERR_USER_PENDING_APPROVAL',
        message: 'Your user is still pending approval'
    };

    _.extend(AccountModel, {
        login: _.wrap(AccountModel.login, function loginWrap(fn) {
            var ipData = GeoIPLocationModel.get();
            var pendingApprovalField;
            var loginRes;
            if (ipData.isRestricted) {
                return {
                    touchpoints: {
                        home: ipData.redirectUrl,
                        customercenter: ipData.redirectUrl
                    },
                    user: {}
                };
            }
            loginRes = fn.apply(this, _.toArray(arguments).slice(1));
            pendingApprovalField = loginRes && loginRes.user &&
                _.findWhere(loginRes.user.customfields, { name: 'custentity_ps_cust_aprv' });
            if (pendingApprovalField.value === 'F') {
                ModelsInit.session.logout();
                throw unapprovedTradeCustomer;
            }

            return loginRes;
        })
    });
});
