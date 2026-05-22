define('CartToQuote.Utils', [
    'ProductList.Model',
    'ProductList.Item.Model',
    'underscore',
    'jQuery',
    'Utils',
    'Backbone',
    'Session'
], function CartToQuoteUtils(
    ProductListModel,
    ProductListItemModel,
    _,
    jQuery,
    Utils,
    Backbone,
    Session
) {
    'use strict';

    return {

        linesToQuote: function quoteToCart(plJson, plInternalid, lines) {
            var self = this;
            var promises = [];
            var deferred = jQuery.Deferred();

            var quoteListPromise = self.createProductList(plJson);
            quoteListPromise.done(function QuoteListCreated(json) {
                if (!plInternalid) {
                    deferred.reject(Utils.translate('Quote List fails to be created'));
                }
                _.each(lines, function eachLine(line) {
                    promises.push(self.doAddLineToQuoteList(line, json.internalid, json));
                });

                jQuery.when(promises).done(function then() {
                    deferred.resolve();
                });
            });

            return deferred;
        },

        createProductList: function createProductList(plJson) {
            var deferred = jQuery.Deferred();
            var plModel;
            var plInternalId = plJson.internalid;

            if (!plInternalId) {
                plModel = new ProductListModel(plJson);
                plModel.save().done(function onSave(json) {
                    deferred.resolve(json);
                });
            } else {
                deferred.resolve(plJson);
            }
            return deferred;
        },

        addItemToQuote: function addItemToQuote(productList, productListLine, product) {
            var quantityToAdd;

            if (product.get('item').get('_matrixParent').internalid) {
                productListLine.set('item', product.get('item').get('_matrixParent'), {
                    silent: true
                });
            }

            if (product.get('quantity') < product.get('_minimumQuantity')) {
                quantityToAdd = product.get('_minimumQuantity');
            } else {
                quantityToAdd = product.get('quantity');
            }

            productListLine.set('productList', {
                id: productList.internalid
            });
            productListLine.set('quantity', quantityToAdd);

            return productListLine
                .save(null, {
                    validate: false
                });
        },

        doAddLineToQuoteList: function doAddLineToQuoteList(line, plInternalId, plJson) {
            var itemId = line.get('item') ?
                line.get('item').get('internalid') :
                line.get('internalid');
            var currentItemId;
            var options;
            var deferred = jQuery.Deferred();
            var productListLine;
            var lineToUpdate = _.find(plJson.items, function fnFind(item) {
                currentItemId = item.item ?
                    item.item.internalid :
                    item.internalid;
                options = item.options;
                return (currentItemId === itemId && _.isEqual(line.get('options'), options));
            });
            if (lineToUpdate) {
                lineToUpdate.quantity += line.get('quantity');
                this.updateItemInQuote(lineToUpdate, line).done(function doneFn() {
                    deferred.resolve();
                });
            } else {
                productListLine = ProductListItemModel.createFromProduct(line);
                this.addItemToQuote(plJson, productListLine, line).done(function doneFn(obj) {
                    line.set('pl_item_internalid', obj.internalid, { silent: true });
                    deferred.resolve();
                });
            }
            return deferred;
        },

        updateItemInQuote: function updateItemInQuote(itemInList, line) {
            var quantityToAdd = line.get('quantity');
            var newQuantity = parseInt(itemInList.quantity, 10) + parseInt(quantityToAdd, 10);
            var productListItemModel = new ProductListItemModel({
                internalid: itemInList.internalid
            });
            productListItemModel.set('quantity', newQuantity);
            productListItemModel.set('options', line.get('options'));
            return productListItemModel.save();
        },

        goToLogin: function goToLogin(application) {
            var login = Session.get('touchpoints.login');
            login += '&origin=' + application.getConfig('currentTouchpoint');
            login += '&origin_hash=' + encodeURIComponent(Backbone.history.fragment);
            window.location.href = login;
        },

        validateGiftCertificate: function validateGiftCertificate(item) {
            if (item.itemOptions && item.itemOptions.GIFTCERTRECIPIENTEMAIL) {
                if (!Backbone.Validation.patterns.email.test(item.itemOptions.GIFTCERTRECIPIENTEMAIL.label)) {
                    return false;
                }
            }
            return true;
        }
    };
});
