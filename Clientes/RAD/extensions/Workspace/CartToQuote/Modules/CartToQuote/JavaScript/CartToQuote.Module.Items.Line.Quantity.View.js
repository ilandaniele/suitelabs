define('CartToQuote.Module.Items.Line.Quantity.View', [
    'RequestQuoteWizard.Module.Items.Line.Quantity.View',
    'ProductList.Item.Model',
    'underscore'
], function CartToQuoteModel(
    RequestQuoteWizardModuleItemsLineQuantityView,
    ProductListItemModel,
    _
) {
    'use strict';

    return _.extend(RequestQuoteWizardModuleItemsLineQuantityView.prototype, {
        setQuantity: _.wrap(RequestQuoteWizardModuleItemsLineQuantityView.prototype.setQuantity, function fnWrap(fn) {
            var strQuantity = this.$('[data-type="quantity-input"]').val();
            var quantity = parseInt(strQuantity, 10);
            var productListLine;
            fn.apply(this, _.toArray(arguments).slice(1));

            if (!_.isNaN(quantity) && _.isNumber(quantity)) {
                productListLine = ProductListItemModel.createFromTransactionLine(this.model);
                productListLine.set('quantity', quantity);
                productListLine.set('internalid', this.model.get('pl_item_internalid'));
                productListLine.save();
            }
        })
    });
});
