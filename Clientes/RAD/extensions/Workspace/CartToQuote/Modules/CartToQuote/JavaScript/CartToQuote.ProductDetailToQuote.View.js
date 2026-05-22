define('CartToQuote.ProductDetailToQuote.View', [
    'ProductDetailToQuote.View',
    'Utils',
    'ProductList.Item.Model',
    'ProductList.Model',
    'underscore'
], function CartToQuoteProductDetailToQuoteView(
    ProductDetailToQuoteView,
    Utils,
    ProductListItemModel,
    ProductListModel,
    _
) {
    'use strict';

    _.extend(ProductDetailToQuoteView.prototype, {
        areOptionsEqual: function areOptionsEqual(options1, options2) {
            var optionsA = _.map(options1, function mapOptions1(option) {
                option.values = option.values || [];
                option.value = option.value || {};
                return option;
            });

            var optionsB = _.map(options2, function mapOptions2(option) {
                option.values = option.values || [];
                option.value = option.value || {};
                return option;
            });
            return _.isEqual(optionsA, optionsB);
        },

        itemToQuote: function itemToQuote(e) {
            var self = this;
            var environment = this.application.getComponent('Environment');
            var phone;
            var email;
            var productListLine;
            var productListModel;
            var productListLineJson;
            var itemPresentInList;

            e.preventDefault();

            this.state.feedbackMessage = '';

            // if user is logged in but isn't allowed to quote, we warn him.
            if (this.profile_model.get('isLoggedIn') === 'T' && !this.state.quote_permissions) {
                phone = environment.getConfig('quote.defaultPhone', '');
                email = environment.getConfig('quote.defaultEmail', '');

                this.state.feedbackMessageType = 'warning';
                this.state.feedbackMessage = Utils.translate(
                    'Sorry, you don\'t have sufficient permissions to request a quote online. <br/> ' +
                    'For immediate assistance <strong>call us at $(0)</strong> or email us to <strong>$(1)</strong>',
                    phone,
                    email
                );
                this.render();
            } else if (this.model.isSelectionComplete() && this.isQuotable() && this.validateLogin()) {
                this.application.ProductListModule.Utils.getRequestAQuoteProductList().done(function getRequestAQuoteProductListDone(
                    productListJson
                ) {
                    productListLine = ProductListItemModel.createFromProduct(self.model);

                    if (!productListJson.internalid) {
                        productListModel = new ProductListModel(productListJson);

                        productListModel.save().done(function productListModelSave(productList) {
                            self.addItemToQuote(productList, productListLine, self.model);
                        });
                    } else {
                        productListLineJson = productListLine.toJSON();
                        itemPresentInList = _.find(productListJson.items, function findProductListJson(
                            productListLineAux
                        ) {
                            return (
                                parseInt(productListLineAux.item.internalid, 10) ===
                                productListLineJson.item.internalid &&
                                self.areOptionsEqual(productListLineJson.options, productListLineAux.options)
                            );
                        });

                        if (itemPresentInList) {
                            self.updateItemInQuote(itemPresentInList);
                        } else {
                            self.addItemToQuote(productListJson, productListLine, self.model);
                        }
                    }
                });
            }
        }
    });
});
