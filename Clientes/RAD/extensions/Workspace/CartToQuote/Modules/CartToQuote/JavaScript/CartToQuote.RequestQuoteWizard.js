define('CartToQuote.RequestQuoteWizard', [
    'underscore',
    'RequestQuoteWizard',
    'ProductList.Model',
    'Transaction.Line.Model'
], function CartToQuoteRequestQuoteWizard(
    _,
    RequestQuoteWizard,
    ProductListModel,
    TransactionLineModel
) {
    'use strict';

    _.extend(RequestQuoteWizard, {
        setupPersistence: function setupPersistence(application, model) {
            var self = this;
            this.pl_internalid = null;
            this.pl_json = null;

            model.on('init', function init() {
                application.ProductListModule.Utils.getRequestAQuoteProductList().done(function getRequestAQuoteProductListDone(json) {
                    var products;
                    self.pl_json = json;
                    self.pl_internalid = json.internalid;
                    products = new ProductListModel(json).get('items').models;
                    // set model list id
                    model.set('plInternalId', self.pl_internalid);

                    // Turn the events momentarily off
                    model.get('lines').off('add', self.addLines, self);
                    model.get('lines').off('change', self.changeQuantity, self);
                    model.get('lines').off('remove', self.doRemoveItemFromList, self);
                    model.off('submit', self.doRemoveList, self);

                    _.each(products, function fnEach(product, i) {
                        var selectedLine = TransactionLineModel.createFromProduct(product);
                        selectedLine.set('internalid', _.uniqueId('item_line'));
                        selectedLine.set('pl_item_internalid', product.get('internalid'));

                        model.get('lines').add(selectedLine, { silent: i < products.length - 1 });
                    });

                    // Turn the events on again
                    model.get('lines').on('change', self.changeQuantity, self);
                    model.get('lines').on('add', self.addLines, self);
                    model.get('lines').on('remove', self.doRemoveItemFromList, self);
                    model.on('submit', self.doRemoveList, self);
                });
            });
        }
    });
});
