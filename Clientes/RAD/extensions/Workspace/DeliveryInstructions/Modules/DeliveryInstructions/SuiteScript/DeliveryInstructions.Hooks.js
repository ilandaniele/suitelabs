define('DeliveryInstructions.Hooks', [
    'SC.Models.Init',
    'DeliveryInstructions.Adapter',
    'Application',
    'LiveOrder.Model',
    'Configuration',
    'underscore'
], function DeliveryInstructionsLiveOrder(
    ModelsInit,
    Adapter,
    Application,
    LiveOrderModel,
    Configuration,
    _
) {
    'use strict';

    return {
        installHooks: function installHooks() {
            Application.on('before:LiveOrder.update', function onBeforeLiveOrderUpdate(Model, requestData) {
                Model.afterUpdateActions = {
                    liftGate: requestData.liftGate,
                    residentialAddress: requestData.residentialAddress
                };
            });

            Application.on('after:LiveOrder.update', function onAfterLiveOrderUpdates(Model) {
                if (ModelsInit.session.isLoggedIn2() && Model.isSecure) {
                    Adapter.checkItemsInOrder(Model.afterUpdateActions);
                }
            });

            Application.on('before:LiveOrder.get', function beforeLiveOrderGet(Model) {
                var isWhiteGloveOption;
                var profileCustomFields = ModelsInit.session.isLoggedIn2() && ModelsInit.customer.getCustomFields();
                var isTradeField = profileCustomFields && _.findWhere(profileCustomFields, { name: 'custentity_rad_web_customer_type' });
                var isTradeCustomer = isTradeField && isTradeField.value === Configuration.get('ProfileUtilsTradeCustomerType');
                var options = LiveOrderModel.getTransactionBodyField();
                Adapter.integrityCheck(ModelsInit.session.isLoggedIn2() && Model.isSecure);
                isWhiteGloveOption = !isTradeCustomer || (isTradeCustomer && options && options.custbody_awa_white_glove);
                if (Configuration.get('deliveryinstructions.whiteGlove.enabled')) {
                    Adapter.freightItem(isWhiteGloveOption);
                }
            });

            Application.on('after:LiveOrder.get', function afterLiveOrderGet(Model, result) {
                Adapter.adjustHandling(result);
                return result;
            });

            Application.on(
                'before:LiveOrder.confirmationCreateResult',
                function onGetConfirmation(Model, placedOrderRecord) {
                    Model.lastPlacedOrder = placedOrderRecord;
                }
            );
            Application.on(
                'after:LiveOrder.confirmationCreateResult',
                function onGetConfirmation(Model, result) {
                    Adapter.recreateConfirmationLines(Model, Model.lastPlacedOrder, result);
                }
            );

            Application.on(
                'after:LiveOrder.getConfirmation',
                function onGetConfirmation(Model, result) {
                    Adapter.adjustHandling(result);
                }
            );

            Application.on('after:Transaction.get', function onGetTransaction(Model, result) {
                Adapter.adjustHandling(result);
            });
        }
    };
});
