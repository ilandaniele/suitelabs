define('CartToQuote.MarketWizard.View', [
    'ProductList.DetailsLater.View',
    'ProductList.Model',
    'ProductList.Item.Model',
    'Profile.Model',
    'underscore',
    'jQuery',
    'Backbone',
    'Utils',
    'CartToQuote.Utils',
    'LiveOrder.Model',
    '_carttoquote_market_wizard_view.tpl',
    'CartToQuote.ProductList.DetailsLater.View'
], function CartToQuoteMarketWizardView(
    ProductListDetailsLaterView,
    ProductListModel,
    ProductListItemModel,
    ProfileModel,
    _,
    jQuery,
    Backbone,
    Utils,
    CartToQuoteUtils,
    LiveOrderModel,
    cartToQuoteMarketWizardViewTpl
) {
    'use strict';

    return Backbone.View.extend({
        template: cartToQuoteMarketWizardViewTpl,

        childViews: {
            'Market.Wizard.ProductListDetailsView': function marketWizardProductListDetailsViewFn() {
                return new ProductListDetailsLaterView({
                    application: this.application,
                    model: this.plModel,
                    isMarketWizard: true
                });
            }
        },

        initialize: function initialize(options) {
            var self = this;
            this.application = options.application;
            this.model = LiveOrderModel.getInstance();
            this.profile = ProfileModel.getInstance();
            this.plModel = new ProductListModel();
            this.updateMarketList();
            Backbone.Events.on('cartToQuote:moveToMarketWizard', function moveMarketWizard(object) {
                self.checkIsLoggedIn();
                return self.moveMarketWizard(object.id);
            });
        },

        checkIsLoggedIn: function checkIsLoggedIn() {
            if (this.profile.get('isLoggedIn') !== 'T') {
                CartToQuoteUtils.goToLogin(this.application);
            }
        },

        updateMarketList: function updateMarketList() {
            var self = this;
            ProfileModel.getPromise().done(function profileGetPromiseDone(profile) {
                if (profile.isLoggedIn === 'T') {
                    self.application.ProductListModule.Utils.getRequestAQuoteProductList().done(function onAfterGotRequestAQuoteProductList(quoteListReturn) {
                        self.plModel = new ProductListModel(quoteListReturn);
                        self.plModel.set('name', Utils.translate('Market Wizard'));
                        self.render();
                    });
                }
            });
        },

        moveMarketWizard: function moveMarketWizard(internalid) {
            var product;
            var self = this;
            var environment = this.application.getComponent('Environment');
            this.checkIsLoggedIn();
            product = this.model.get('lines').get(internalid);
            this.moveMarketWizardItemHelper(product).done(function doneFn() {
                self.application.getLayout().showConfirmationMessage(environment.getConfig('marketWizardConfirmationMessage'));
                self.updateMarketList();
            });
        },

        moveMarketWizardItemHelper: function moveMarketWizardItemHelper(product) {
            return jQuery.when(this.model.removeLine(product), this.addCartItemToQuote(product));
        },

        addCartItemToQuote: function addCartItemToQuote(product) {
            var itemOptions;
            var itemListOptions;
            var itemPresentInList;
            var idProductSelected = product.get('item').get('matrix_parent') ?
                product.get('item').get('matrix_parent').internalid :
                product.get('item').get('internalid');
            var promise = jQuery.Deferred();
            var productListLine;

            var idMatch;
            var optionsMatch;

            if (CartToQuoteUtils.validateGiftCertificate(product)) {
                productListLine = ProductListItemModel.createFromProduct(product);
                itemOptions = productListLine.toJSON().options;
                itemPresentInList = _.find(this.plModel.get('items').models, function findInProductListJsonItems(itemList) {
                    itemListOptions = itemList.toJSON().options;
                    idMatch = parseInt(itemList.get('item').id, 10) ===
                        parseInt(idProductSelected, 10);
                    optionsMatch = _.isEqual(itemOptions, itemListOptions);
                    return idMatch && optionsMatch;
                });
                if (itemPresentInList) {
                    return this.updateItemInQuote(itemPresentInList);
                }
                return this.addItemToQuote(product);
            }
            return promise.resolve();
        },

        addItemToQuote: function addItemToQuote(product) {
            var quantityToAdd;
            var productListLine = ProductListItemModel.createFromProduct(product);

            if (product.get('item').get('matrix_parent') &&
                product.get('item').get('matrix_parent').internalid) {
                productListLine.set('item', product.get('item').get('_matrixParent'), {
                    silent: true
                });
            }

            if (product.get('quantity') < product.get('_minimumQuantity')) {
                quantityToAdd = product.get('_minimumQuantity');
            } else {
                quantityToAdd = product.get('quantity');
            }
            productListLine.set('quantity', quantityToAdd);
            productListLine.set('productList', {
                id: this.plModel.get('internalid')
            });

            return productListLine.save(null, {
                validate: false
            });
        },

        updateItemInQuote: function updateItemInQuote(itemInList) {
            var quantityToAdd = this.model.get('quantity');
            var newQuantity = parseInt(itemInList.quantity, 10) + parseInt(quantityToAdd, 10);
            var productListItemModel = new ProductListItemModel({
                'internalid': itemInList.internalid
            });
            productListItemModel.set('quantity', newQuantity);
            return productListItemModel.save();
        }
    });
});
