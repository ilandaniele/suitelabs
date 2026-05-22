define('ACS.StrikeThrough.Prices.Helper', [
    'Utils',
    'underscore'
], function ACSStrikeThroughPricesHelper(
    Utils,
    _
) {
    'use strict';

    return {
        getComparePriceInfo: function getComparePriceInfo(options) {
            var onlinePriceInfo = this.getOnlinePrice(options);

            if (!_.isEmpty(onlinePriceInfo) && options.context.price < onlinePriceInfo.actualOnlinePrice) {
                return onlinePriceInfo;
            }
            return false;
        },

        isMatrixItem: function isMatrixItem(context) {
            var item = context && context.model && context.model.item;
            return item && item.matrixchilditems_detail && item.matrixchilditems_detail.length;
        },

        isPLP: function isPLP(PLPComponent) {
            return !_.isEmpty(PLPComponent.getItemsInfo());
        },

        isPDP: function isPDP(PDPComponent) {
            return !_.isEmpty(PDPComponent.getItemInfo());
        },

        getOnlinePrice: function getOnlinePrice(options) {
            var onlinePriceInfo = {};
            var item = options.context.model && options.context.model.item;
            var matrixChildren;

            if (options.isPDPView) {
                matrixChildren = options.PDPComponent.getSelectedMatrixChilds();

                if (matrixChildren && matrixChildren.length === 1) {
                    item = _.first(matrixChildren);
                }
            }

            if (item && item[options.priceLevel]) {
                onlinePriceInfo.actualOnlinePrice = item[options.priceLevel];
                onlinePriceInfo.actualOnlinePriceFormatted = item[options.priceLevel + '_formatted'] || Utils.formatCurrency(onlinePriceInfo.actualOnlinePrice);
                onlinePriceInfo.showComparePrice = true;
            }
            return onlinePriceInfo;
        }
    };
});
