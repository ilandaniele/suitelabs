/* eslint-disable max-len */
define('StrikeThroughPrice', [
    'ACS.StrikeThrough.Prices.Helper'
], function StrikeThroughPrice(
    PriceHelper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var PDPComponent = container.getComponent('PDP');
            var PLPComponent = container.getComponent('PLP');
            var Environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            var onlinePriceInfo;
            var priceLevel = Environment.getConfig('priceLevel.default');

            if (layout && PLPComponent && PDPComponent) {
                layout.addToViewContextDefinition('ProductViews.Price.View', 'comparePrice', 'number', function productViewsPriceComparePrice(context) {
                    if (PriceHelper.isMatrixItem(context) && !context.isPriceRange && context.price) {
                        if (PriceHelper.isPLP(PLPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel
                            });
                        } else if (PriceHelper.isPDP(PDPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel,
                                isPDPView: true,
                                PDPComponent: PDPComponent
                            });
                        }
                        context.comparePrice = onlinePriceInfo ? onlinePriceInfo.actualOnlinePrice : context.comparePrice;
                    }
                    return context.comparePrice;
                });

                layout.addToViewContextDefinition('ProductViews.Price.View', 'comparePriceFormatted', 'string', function productViewsPriceComparePriceFormatted(context) {
                    if (PriceHelper.isMatrixItem(context) && !context.isPriceRange && context.price) {
                        if (PriceHelper.isPLP(PLPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel
                            });
                        } else if (PriceHelper.isPDP(PDPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel,
                                isPDPView: true,
                                PDPComponent: PDPComponent
                            });
                        }
                        context.comparePriceFormatted = onlinePriceInfo ? onlinePriceInfo.actualOnlinePriceFormatted : context.comparePriceFormatted;
                    }
                    return context.comparePriceFormatted;
                });

                layout.addToViewContextDefinition('ProductViews.Price.View', 'showComparePrice', 'boolean', function productViewsPriceShowComparePrice(context) {
                    if (PriceHelper.isMatrixItem(context) && !context.isPriceRange && context.price) {
                        if (PriceHelper.isPLP(PLPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel
                            });
                        } else if (PriceHelper.isPDP(PDPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel,
                                isPDPView: true,
                                PDPComponent: PDPComponent
                            });
                        }
                        context.showComparePrice = onlinePriceInfo ? onlinePriceInfo.showComparePrice : context.showComparePrice;
                    }
                    return context.showComparePrice;
                });
            }
        }
    };
});
