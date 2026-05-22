define('NSeComm.CartRestriction', [
    'CartRestriction.Model',
    'jQuery',
    'CartRestrictionPopUp.View',
    'underscore'
], function CertRestrictionModule(
    CartRestrictionModel,
    jQuery,
    CartRestrictionPopUpView,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var cart = container.getComponent('Cart');
            var search = container.getComponent('Search');
            var orderType = '';
            var errorMessage = _('CART_RESTRICTION_MESSAGE').translate();
            var cartRestrictionPopUpViewModal;
            var productViews = ['ProductDetails.QuickView.View', 'ProductDetails.Full.View', 'Cart.Confirmation.View'];
            var isOnProductView;
            var currentViewId;
            var addToCart;


            if (layout && cart && search) {
                cart.on('beforeAddLine', function lineAdded(line) {
                    var promise = jQuery.Deferred();
                    var internalID = line.line.item.internalid;

                    var searchParams = {
                        id: internalID,
                        fields: 'custitem_order_type'
                    };

                    var searchUrl = search.getUrl(searchParams);
                    var cartRestrictionModel = new CartRestrictionModel(searchUrl);

                    jQuery.when(cartRestrictionModel.fetch(), cart.getLines()).then(function afterExecution(response, lines) {
                        orderType = response[0].items[0].custitem_order_type;
                        addToCart = _(lines).chain().filter(function filter(filterLine) {
                            return filterLine.internalid;
                        }).every(function every(everyLine) {
                            return orderType === everyLine.item.extras.custitem_order_type;
                        })
                        .value();

                        if (addToCart) {
                            promise.resolve();
                        } else {
                            currentViewId = container.getLayout().getCurrentView().attributes.id;
                            isOnProductView = productViews.indexOf(currentViewId) !== -1;
                            if (isOnProductView) {
                                promise.reject(errorMessage);
                            } else {
                                cartRestrictionPopUpViewModal = new CartRestrictionPopUpView({
                                    container: container,
                                    message: errorMessage
                                });
                                layout.showContent(cartRestrictionPopUpViewModal, {
                                    showInModal: true,
                                    options: {
                                        className: 'cart-restriction-pop-up-modal',
                                        modalOptions: {
                                            keyboard: false,
                                            backdrop: 'static'
                                        }
                                    }
                                });
                                promise.reject();
                            }
                        }
                    });
                    return promise;
                });
            }
        }
    };
});
