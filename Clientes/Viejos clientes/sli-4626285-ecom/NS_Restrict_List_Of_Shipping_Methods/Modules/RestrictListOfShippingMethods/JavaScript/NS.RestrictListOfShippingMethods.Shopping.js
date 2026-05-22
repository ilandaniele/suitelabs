define('NS.RestrictListOfShippingMethods.Shopping', [
    'underscore'
], function NSRestrictListOfShippingMethodsShopping (
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var plp = container.getComponent('PLP');
            var pdp = container.getComponent('PDP');

            if (plp) {
                plp.cancelableOn('afterShowContent', function () {
                    if (plp.getCategoryInfo() && plp.getCategoryInfo().internalid == 768) {
                    // if (plp.getCategoryInfo() && plp.getCategoryInfo().urlfragment == 'flaming-hot-sale') {
                        console.log(plp.getItemsInfo())
                        jQuery('.cart-quickaddtocart-price').addClass('flaming-hot-sale-price');
                    }
                });
            }

            if (pdp) {
                pdp.addToViewContextDefinition('ProductViews.Price.View', 'isOnSale', 'boolean', function (context) {
                    var iteminfo = pdp.getItemInfo();
                    if (iteminfo) {
                        var itemModel = iteminfo.item;
                        var categories = itemModel.commercecategory && itemModel.commercecategory.categories;
                        var isOnSale = _.some(categories, function(cat) {
                            return cat.id === 768;
                        });

                        if (isOnSale) {
                            _.defer(function (){
                                jQuery('.product-views-price').addClass('flaming-hot-sale-price');
                            })
                        }
                        // console.log('iteminfo', itemModel)
                    }
                });
            }
        }
    };
});
