define('AwaLabs.PDPCustomFields', [
    'PDPCustomField.View',
    'PDPCustomField.FutureAvailability.View',
    'PDPCustomField.Vectary3dModel.View',
    'PDPCustomField.RomanceDescription.View',
    'PDPCustomField.Stock.Messaging.View'
], function AwaLabsPDPCustomFields(
    PDPCustomFieldView,
    PDPCustomFieldFutureAvailabilityView,
    PDPCustomFieldVectary3dModelView,
    PDPCustomFieldRomanceDescriptionView,
    PDPCustomFieldStockMessagingView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var pdp = application.getComponent('PDP');
            var layout = application.getComponent('Layout');

            if (pdp && layout) {
                pdp.addToViewContextDefinition('ProductDetails.Full.View', 'showInStockMessage', 'string', function fnField(context) {
                    return context.model.item.isinstock;
                });

                pdp.addToViewContextDefinition('ProductDetails.Full.View', 'showquantityAvailable', 'string', function fnField(context) {
                    return !!context.model.item.quantityavailable || context.model.item.quantityavailable === 0;
                });

                pdp.addChildView('Stock.Messaging', function StockMessaging() {
                    return new PDPCustomFieldStockMessagingView({ application: application, pdp: pdp });
                });

                layout.addChildViews(layout.ALL_VIEWS, {
                    'Product.Stock.Info': {
                        'PDPCustomFieldFutureAvailabilityView': {
                            childViewIndex: 10,
                            childViewConstructor: function pdpCustomFieldFutureAvailabilityView() {
                                return new PDPCustomFieldFutureAvailabilityView({ application: application });
                            }
                        }
                    },
                    'PDPCustomFieldVectary3dModelView': {
                        'PDPCustomFieldVectary3dModelView': {
                            childViewConstructor: function pdpCustomFieldVectary3dModelView() {
                                return new PDPCustomFieldVectary3dModelView({ application: application });
                            }
                        }
                    },
                    'Romance.Description': {
                        'PDPCustomFieldRomanceDescriptionView': {
                            childViewConstructor: function pdpCustomFieldRomanceDescriptionView() {
                                return new PDPCustomFieldRomanceDescriptionView({ application: application });
                            }
                        }
                    },
                    'PDPCustomFields': {
                        'PDPCustomFields': {
                            childViewConstructor: function pdpCustomFields() {
                                return new PDPCustomFieldView({
                                    application: application,
                                    quickView: false
                                });
                            }
                        }
                    },
                    'Product.Details': {
                        'PDPCustomFieldQuickViewView': {
                            childViewConstructor: function pdpCustomFieldQuickViewView() {
                                return new PDPCustomFieldView({
                                    application: application,
                                    quickView: true
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});

