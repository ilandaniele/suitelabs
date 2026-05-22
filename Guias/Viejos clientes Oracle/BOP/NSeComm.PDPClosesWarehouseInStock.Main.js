define('NSeComm.PDPClosestWarehouseInStock', [
    'PDPClosestWarehouseInStock.Model',
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
            var user = container.getComponent('UserProfile');
            
            var errorMessage = _('CART_RESTRICTION_MESSAGE').translate();
            var cartRestrictionPopUpViewModal;
            // var productViews = ['ProductDetails.QuickView.View', 'ProductDetails.Full.View', 'Cart.Confirmation.View'];
            // var isOnProductView;
            // var currentViewId;
            var defaultAddress; // fill up later with data
            var closestWarehouse; //calculate from default address
            var addToCart;
            
            if (layout && user) {
                
                user.getUserProfile().then(function getUserData(userData) {
                    
                    
                    if (pdp) {
                        // add to view context add pdp tab and comment
                        
                        PDP.addChildViews(PDP.PDP_FULL_VIEW, {
                            'Product.Stock.Info': {
                                'Pacejet.View': {
                                    childViewIndex: 1,
                                    childViewConstructor: function childViewConstructor() {
                                        return new PacejetView(
                                            {
                                                'PacejetModel': new PacejetModel(),
                                                'PDPComponent': PDP
                                            }
                                        );
                                    }
                                }
                            }
                        });
                    }
                });
                
                
                if (cart) {
                    
                    cart.on('beforeAddLine', function lineAdded(line) { 
                        var promise = jQuery.Deferred();
                        
                        closestWarehouse;
                        
                        return promise;
                    });
                }
                
            }
            
            

            if (layout && cart && user) {
                cart.on('beforeAddLine', function lineAdded(line) {
                    // Analyze user's ship address
                    
                    var promise = jQuery.Deferred();
                    var internalID = line.line.item.internalid;

                    
                    var cartRestrictionModel = new CartRestrictionModel(searchUrl);

                    jQuery.when(user.getUserProfile(), cart.getLines()).then(function afterExecution(userData, lines) {
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
