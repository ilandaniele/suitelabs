define('RemovePOForNonB2B', [
    'underscore'
], function InfiniteScrollFix(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {

            try {

                var SuiteCommerceCustomFieldsCheckoutGroupView = require('SuiteCommerce.CustomFields.Checkout.Group.View');
                var Instrumentation_1 = require('SuiteCommerce.CustomFields.Instrumentation');

                if (SuiteCommerceCustomFieldsCheckoutGroupView) {
                    _(SuiteCommerceCustomFieldsCheckoutGroupView.GroupView.prototype).extend({
                        fetchModel: function () {
                            var userprofilecomponent = container.getComponent('UserProfile');
                            var self = this;

                            userprofilecomponent.getUserProfile().then(function (profile) {
                                var that = self;
                                
                                var _this = that;
                                var fieldIds = that.model.fields
                                    .map(function (field) {
                                        return field.fieldId;
                                    })
                                    .join(',');

                                var fetchCustomField = Instrumentation_1.default.getLog('fetchCustomField');
                                fetchCustomField.startTimer();
                                that.setIsLoading(true);
                                that.setIsLoadingError(false);
                                that.model
                                    .fetch({
                                        data: {
                                            fields: fieldIds,
                                        },
                                    })
                                    .fail(function () {
                                        _this.setIsLoadingError(true);
                                    })
                                    .always(function () {
                                        fetchCustomField.endTimer();
                                        fetchCustomField.setParameters({
                                            activity: 'Checkout Custom Field Loaded',
                                            totalTime: fetchCustomField.getElapsedTimeForTimer(),
                                        });
                                        fetchCustomField.submit();
                                        _this.setIsLoading(false);
                                        _this.refresh();

                                        var isb2b = profile.customfields.find(function (cf) {
                                            return cf.id == 'custentity_cu_type'
                                        });
                                        var showPO = isb2b && isb2b.value && isb2b.value != '1';

                                        if(!showPO){
                                            jQuery('#custom-fields-checkout-custbody24').hide();
                                        }else{
                                            jQuery('#custom-fields-checkout-custbody24').show();
                                        } 
                                    });
                            });
                        }
                    });
                }
            } catch (e) {

            }
        }
    };
});
