var extensions = {};

extensions['AwaLabs.AwaCaseForm.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/AwaCaseForm/2.1.0/' + asset;
}

define('CaseForm.Case.Model', [
    'underscore',
    'Case.Model',
    'Case.Fields.Model',
    'Utils'
], function CaseFormCaseModel(
    _,
    CaseModel,
    CaseFieldsModel,
    Utils
) {
    'use strict';

    _.extend(CaseModel.CaseModel.prototype, {
        sync: _.wrap(CaseModel.CaseModel.prototype.sync, function sync(fn) {
            var original = _.toArray(arguments).slice(1);
            original[1].urlRoot = function urlRoot() { return Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CaseForm.Case.Service.ss')); };
            return fn.apply(this, original);
        })
    });

    _.extend(CaseFieldsModel.CaseFieldsModel.prototype, {
        sync: _.wrap(CaseFieldsModel.CaseFieldsModel.prototype.sync, function sync(fn) {
            var original = _.toArray(arguments).slice(1);
            original[2].urlRoot = function urlRoot() { return Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CaseForm.Case.Service.ss')); };
            return fn.apply(this, original);
        })
    });
});


define('CaseForm.Case.Collection', [
    'underscore',
    'Case.Collection',
    'Utils'
], function CaseFormCaseCollection(
    _,
    CaseCollection,
    Utils
) {
    'use strict';

    _.extend(CaseCollection.CaseCollection.prototype, {
        sync: _.wrap(CaseCollection.CaseCollection.prototype.sync, function sync(fn) {
            var original = _.toArray(arguments).slice(1);
            original[1].url = Utils.getAbsoluteUrl(getExtensionAssetsPath('services/CaseForm.Case.Service.ss'));
            return fn.apply(this, original);
        })
    });
});


define('CaseForm.Case.Create.View', [
    'Case.Create.View',
    'SC.Configuration',
    'FileUpload.File.View',
    'jQuery',
    'underscore'
], function CaseFormCaseCreateView(
    CaseCreateView,
    Configuration,
    FileUploadFileView,
    jQuery,
    _
) {
    'use strict';

    _.extend(CaseCreateView.CaseCreateView.prototype, {
        getEvents: _.wrap(CaseCreateView.CaseCreateView.prototype.getEvents, function getEvents(fn) {
            var originalReturn = fn.apply(this, _.toArray(arguments).slice(1));
            originalReturn['change [data-action="change-category"]'] = 'changeCategory';
            return originalReturn;
        }),
        getChildViews: function getChildViews() {
            return {
                'FileUpload.View': function childViewImageUpload() {
                    return new FileUploadFileView({
                        application: this.application,
                        model: this.formModel
                    });
                }
            };
        },
        changeCategory: function changeCategory(e) {
            var type;
            this.typesOfInquiries = Configuration.get('cases.uploadFileTypesOfInquiries') || [];
            type = _.findWhere(this.typesOfInquiries, { id: jQuery(e.target).val() });
            if (type) {
                this.$('#file_upload').removeClass('hidden', type);
            } else {
                this.$('#file_upload').addClass('hidden', type);
            }
        }
    });
});


define('AwaLabs.CaseForm', [
    'CaseForm.Case.Collection',
    'CaseForm.Case.Model',
    'CaseForm.Case.Create.View'
], function AwaLabsCaseForm(
) {
    'use strict';
});


};

extensions['AwaLabs.AwaFileUpload.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/AwaFileUpload/2.1.0/' + asset;
}

define('FileUpload.File.Collection', [
    'Backbone',
    'FileUpload.File.Model',
    'underscore',
    'Utils'
], function FileUploadFileCollection(
    Backbone,
    FileUploadFileModel
) {
    'use strict';

    return Backbone.Collection.extend({
        url: function url() {
            var urlSuitelet = SC.ENVIRONMENT.published.file_upload_suitelet_url;
            var urlObject = new URL(urlSuitelet);
            urlObject.hostname = Backbone.history.location.host;
            return urlObject.toString();
        },

        model: FileUploadFileModel
    });
});


define('FileUpload.File.Model', [
    'Backbone'
], function FileUploadFileModel(
    Backbone
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: function getUrlRoot() {
            var url = SC.ENVIRONMENT.published.file_upload_suitelet_url;
            var urlObject = new URL(url);
            urlObject.hostname = Backbone.history.location.host;
            return urlObject.toString();
        }
    });
});


define('FileUpload.File.Thumbnail.View', [
    'fileupload_image_thumbnail.tpl',
    'Backbone',
    'GlobalViews.Confirmation.View',
    'underscore'
], function FileUploadThumbnailView(
    fileuploadimagethumbnailtpl,
    Backbone,
    ConfirmationView,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: fileuploadimagethumbnailtpl,

        events: {
            'click [data-action="fileupload-file-remove-file"]': 'removeFileUpload'
        },

        getContext: function getContext() {
            return {
                isNew: this.options.isNew ? this.options.isNew : false,
                name: this.model.get('name'),
                fileID: this.model.get('internalid')
            };
        },

        removeFileUpload: function removeFileUpload(e) {
            var view;
            var model = this.model;

            e.preventDefault();
            view = new ConfirmationView({
                title: _.translate('Remove File Upload'),
                body: _.translate('Are you sure you want to remove this file?'),
                callBack: this.removeFile,
                className: 'credit-application-modal',
                callBackParameters: {
                    context: this,
                    model: model
                },
                autohide: true
            });
            this.options.application.getLayout().showInModal(view);
        },

        removeFile: function removeFile(options) {
            options.model.destroy();
        }

    });
});


define('FileUpload.File.View', [
    'fileupload.tpl',
    'FileUpload.File.Collection',
    'FileUpload.File.Model',
    'FileUpload.File.Thumbnail.View',
    'Backbone.CollectionView',
    'Backbone',
    'underscore',
    'jQuery'
], function FileUploadFileView(
    fileuploadtpl,
    FileUploadFileCollection,
    FileUploadFileModel,
    FileUploadFileThumbnailView,
    BackboneCollectionView,
    Backbone,
    _,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: fileuploadtpl,

        events: {
            'change [name="fileupload-uploader"]': 'uploadFile'
        },

        childViews: {
            'FileUpload.FileThumbnail': function fnFileUploadFileThumbnailView() {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: FileUploadFileThumbnailView,
                    viewsPerRow: 5,
                    childViewOptions: {
                        application: this.application,
                        isNew: true
                    }
                });
            }
        },

        initialize: function initialize(options) {
            var self = this;
            this.collection = new FileUploadFileCollection();
            this.model = options.model;
            this.application = options.application;
            this.maxFiles = options.maxFiles || 1;

            this.collection.on('add sync remove', function reRender() {
                self.render();
                self.model.set('files', self.collection.map(function setAttr(model) {
                    return model.attributes;
                }));
            });
        },

        uploadFile: function uploadFile(e) {
            var files = e.currentTarget.files;
            var File;
            var formData;
            var self = this;
            jQuery('#loading_file').toggleClass('hidden');
            jQuery(e.currentTarget).attr('disabled', true);
            if (files && files.length > self.maxFiles) {
                jQuery('#loading_file').toggleClass('hidden');
                self.showError(_(self.maxFiles + ' file(s) limit has been exceeded').translate());
            } else {
                _.each(files, function eachFile(file) {
                    if (self.collection.length >= self.maxFiles) {
                        jQuery('#loading_file').toggleClass('hidden');
                        self.showError(_(self.maxFiles + ' file(s) limit has been exceeded').translate());
                    } else {
                        File = new FileUploadFileModel(file);
                        formData = new FormData();
                        formData.append('file', file);

                        File.save(file, {
                            processData: false,
                            contentType: false,
                            cache: false,
                            data: formData,
                            beforeSend: function beforeSend() {}
                        }).done(function caseFileSaveDone(data) {
                            jQuery(e.currentTarget).attr('disabled', false);
                            jQuery('#loading_file').toggleClass('hidden');
                            if (self.collection.length <= 9) {
                                self.collection.add(new FileUploadFileModel(_.extend(data, { internalid: data.internalid })));
                            } else {
                                self.showError(_('10 files limit has been exceeded').translate());
                            }
                        });
                    }
                });
            }
        }
    });
});


define('AwaLabs.FileUpload', [
    'FileUpload.File.View'
], function AwaLabsFileUpload() {
    'use strict';
});


};

extensions['AwaLabs.CartToQuote.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CartToQuote/2.1.0/' + asset;
}

define('CartToQuote.RequestQuoteWizard.Module.Items', [
    'underscore',
    'RequestQuoteWizard.Module.Items',
    'Utils',
    'Profile.Model',
    'jQuery',
    'Product.Model',
    'GlobalViews.Message.View',
    'LiveOrder.Model',
    'Backbone.CollectionView',
    'Transaction.Line.Views.Cell.Actionable.Expanded.View',
    'RequestQuoteWizard.Module.Items.Line.Quantity.View',
    'RequestQuoteWizard.Module.Items.Line.Actions.View'
], function CartToQuoteRequestQuoteWizardModuleItems(
    _,
    RequestQuoteWizardModuleItems,
    Utils,
    ProfileModel,
    jQuery,
    ProductModel,
    GlobalViewsMessageView,
    LiveOrderModel,
    BackboneCollectionView,
    TransactionLineViewsCellActionableExpandedView,
    RequestQuoteWizardModuleItemsLineQuantityView,
    RequestQuoteWizardModuleItemsLineActionsView
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItems.prototype, {
        events: {
            'click [data-action="add-items-to-cart"]': 'addItemsToCartBulkHandler',
            'change [data-action="select-all"]': 'selectAll',
            'change [data-action="unselect-all"]': 'unselectAll',
            'change [data-action="select"]': 'selectLine'
        },

        childViews: {
            'Items.Collection': function ItemsCollectionFN(options) {
                return new BackboneCollectionView({
                    collection: this.model.get('lines'),
                    viewsPerRow: 1,
                    childView: TransactionLineViewsCellActionableExpandedView,
                    childViewOptions: {
                        navigable: true,
                        application: this.wizard.application,
                        SummaryView: RequestQuoteWizardModuleItemsLineQuantityView,
                        ActionsView: RequestQuoteWizardModuleItemsLineActionsView,
                        showAlert: false,
                        generalClass: options.generalClass || 'requestquote-wizard-module-items-item',
                        showCheckbox: true
                    }
                });
            }
        },

        getContext: _.wrap(RequestQuoteWizardModuleItems.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            var collection = this.model.get('lines').models || [];
            var totalPrice = 0;

            context.isPriceEnabled = !user.hidePrices();
            context.showSelectAll = this.wizard.model.get('lines').length > 1;
            context.unselectedLength = this.getUnselectedLength();
            context.collectionLength = this.getCollectionLength();
            context.allselected = this._areAllselected();
            context.isAtLeastOneItemChecked = context.unselectedLength !== context.collectionLength;
            context.allowShare = !!context.collectionLength;
            context.totalPrice = this.wizard.model.get('lines').length * 100;

            if (context.isPriceEnabled) {
                try {
                    _.each(collection, function eachCollection(line) {
                        var qty = line.get('quantity');
                        var item = line.get('item');
                        var price = useRetailPrices ?
                            item.get('pricelevel4') :
                            item.get('onlinecustomerprice_detail').onlinecustomerprice;
                        totalPrice += qty * price;
                    });
                    totalPrice = _.formatCurrency(totalPrice);
                } catch (e) {
                    totalPrice = 'No total price available';
                }
            }
            context.totalPrice = totalPrice;
            return context;
        }),

        getUnselectedLength: function getUnselectedLength() {
            return this.wizard.model.get('lines').filter(function filterLinesFn(record) {
                return !record.checked;
            }).length;
        },

        getUnselectedItems: function getUnselectedLength() {
            var unselected = [];
            this.wizard.model.get('lines').filter(function filterFn(record) {
                if (!record.checked && record.get('item')) {
                    unselected.push(record.get('item').get('internalid'));
                }
                return true;
            });
            return unselected;
        },

        getCollectionLength: function getCollectionLength() {
            return this.wizard.model.get('lines').length;
        },

        unselectAll: function unselectAll() {
            this.toggleCollectionsEvent(false);
            _.each(this.wizard.model.get('lines').models, function eachLinesFn(line) {
                line.checked = false;
            });
            this.toggleCollectionsEvent(true);
            this.render();
        },

        selectAll: function selectAll() {
            this.toggleCollectionsEvent(false);
            _.each(this.wizard.model.get('lines').models, function eachLinesFn(line) {
                line.checked = true;
            });
            this.toggleCollectionsEvent(true);
            this.render();
        },

        selectLine: function selectLine(e) {
            var self = this;
            var isChecked = e.target.checked || false;
            var elem = jQuery(e.target);
            var line = elem.closest('[data-item-id="' + elem.attr('value') + '"]');
            var lineId = line.attr('id');

            e.preventDefault();
            e.stopPropagation();

            _.each(self.wizard.model.get('lines').models, function eachLineFn(currentLine) {
                if (currentLine.id === lineId) {
                    currentLine.checked = isChecked;
                }
            });
            this.render();
        },

        toggleCollectionsEvent: function toggleCollectionsEvent(on) {
            if (on) {
                this.wizard.model.get('lines').on('add remove change', this.render, this);
            } else {
                this.wizard.model.get('lines').off('add remove change', this.render, this);
            }
        },

        _areAllselected: function _areAllselected() {
            var linesSelected = _.filter(this.wizard.model.get('lines').models, function eachLinesFn(line) {
                return !!line.checked;
            });
            return this.wizard.model.get('lines').models.length === linesSelected.length;
        },

        _getSelection: function _getSelection() {
            var lines = [];
            var itemsForCart = [];
            var buttonSelector = [];
            var item;
            var itemForCart;
            _.each(this.wizard.model.get('lines').models, function eachModelFn(plLine) {
                if (plLine.checked !== true) {
                    return;
                }
                lines.push(plLine);
                item = plLine.get('item');
                itemForCart = new ProductModel({
                    internalid: item.id,
                    item: item,
                    quantity: plLine.get('quantity'),
                    _optionsDetails: item.get('itemoptions_detail'),
                    options: plLine.get('options').toJSON()
                });
                itemsForCart.push(itemForCart);
            });
            return {
                lines: lines,
                items_for_cart: itemsForCart,
                button_selector: buttonSelector
            };
        },

        addItemsToCartBulkHandler: function addItemsToCartBulkHandler(e) {
            var self = this;
            var selectedModels = this._getSelection();
            var buttonSelector = e.currentTarget;
            var addToCartPromise;

            this.cart = LiveOrderModel.getInstance();

            e.preventDefault();

            if (selectedModels.lines.length < 1) {
                return;
            }
            addToCartPromise = this.cart.addProducts(selectedModels.items_for_cart);
            this._showWaitMessage();

            addToCartPromise.done(function done() {
                self.unselectAll();
                self.removeItems(selectedModels, true);
                // eslint-disable-next-line no-underscore-dangle
                self._showSuccessMessage();
            });

            if (addToCartPromise) {
                this.disableElementsOnPromise(addToCartPromise, buttonSelector);
            }
        },

        _showWaitMessage: function showWaitMessage() {
            this._showMessage(Utils.translate('Your items are moving to the cart, please be patient.'));
        },

        _showSuccessMessage: function showSuccessMessage() {
            this._showMessage(Utils.translate('Products have been added to cart.'));
        },

        _showMessage: function showMessage(message) {
            var placeholder = this.$('[data-type="alert-placeholder-header"]');
            var globalViewMessage = new GlobalViewsMessageView({
                message: Utils.translate(message),
                type: 'success',
                closable: false
            });
            placeholder.append(globalViewMessage.render().$el.html());
        },

        removeItems: function removeItems(selectedModels, render) {
            this.wizard.model.get('lines').remove(selectedModels.lines);
            if (render) {
                // this.childViewInstances['Items.Collection'].render();
                this.renderChildViewContainer('Items.Collection');

            }

            if (this.wizard.model.get('lines').length === 0) {
                setTimeout(function redirectDelay() {
                    window.location.href = SC.SESSION.touchpoints.viewcart;
                }, 5000);
            }
        }
    });
});


define('CartToQuote.RequestQuoteWizard.Module.Items.Line.Action.View', [
    'underscore',
    'RequestQuoteWizard.Module.Items.Line.Actions.View',
    'LiveOrder.Model',
    'Profile.Model'
], function CartToQuoteRequestQuoteWizardModuleItemsLineActionView(
    _,
    RequestQuoteWizardModuleItemsLineActionsView,
    LiveOrderModel,
    ProfileModel
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItemsLineActionsView.prototype, {
        events: _.extend(RequestQuoteWizardModuleItemsLineActionsView.prototype.events, {
            'click [data-action="add-item-to-cart"]': 'addItemToCart'
        }),
        addItemToCart: function addItemToCart(e) {
            var self = this;
            var cart = LiveOrderModel.getInstance();
            var addToCartPromise;
            e.preventDefault();
            e.stopPropagation();
            addToCartPromise = cart.addLine(this.model);
            addToCartPromise.then(function thenFn() {
                self.options.model.collection.remove(self.options.model);
            });
            if (addToCartPromise) {
                self.disableElementsOnPromise(addToCartPromise, '[data-line="' + self.model.id + '"]');
            }
        },
        getContext: _.wrap(RequestQuoteWizardModuleItemsLineActionsView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var profile = ProfileModel.getInstance();
            context.lineId = this.options.model.id;
            context.isTradeAndNotIsBackOrderable = profile.get('isTrade') &&
                this.model.get('item') &&
                !this.model.get('item').get('isbackorderable') &&
                this.model.get('item').get('quantityavailable') === 0;
            return context;
        })
    });
});


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


define('CartToQuote.Transaction.Line.Views.Cell.Actionable.Expanded.View', [
    'underscore',
    'Transaction.Line.Views.Cell.Actionable.Expanded.View',
    'Profile.Model'
], function CartToQuoteTransactionLineViewsCellActionableExpandedView(
    _,
    TransactionLineViewsCellActionableExpandedView,
    ProfileModel
) {
    'use strict';

    _.extend(TransactionLineViewsCellActionableExpandedView.prototype, {
        getContext: _.wrap(TransactionLineViewsCellActionableExpandedView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var profile = ProfileModel.getInstance();
            context.showCheckbox = !!this.options.showCheckbox;
            context.isChecked = this.model.checked;
            context.isTradeAndNotIsBackOrderable = profile.get('isTrade') &&
                this.model.get('item') &&
                !this.model.get('item').get('isbackorderable') &&
                this.model.get('item').get('quantityavailable') === 0
            ;
            return context;
        })
    });
});


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


define('CartToQuote.ProductList.Item.Model', [
    'ProductList.Item.Model',
    'Item.Model',
    'Product.Model',
    'underscore'
], function CartToQuoteProductListItemModel(
    ProductListItemModel,
    Item,
    ProductModel,
    _
) {
    'use strict';

    _.extend(ProductListItemModel.prototype, {
        initialize: function initialize(attributes) {
            var itemAux;
            var itemOptions;
            // This workaround is made to maintain the compatility with product lists saving the child item in the record
            if (attributes && attributes.item && attributes.item.matrix_parent) {
                attributes.item.originalid = attributes.item.internalid;
                attributes.item = _.extend(attributes.item, attributes.item.matrix_parent);
                delete attributes.item.matrix_parent;
            }

            itemAux = new Item(attributes.item);
            itemOptions = itemAux.get('options');

            itemOptions.each(function itemOptionsEach(itemOption) {
                var option;
                var optionLine;
                _.any(attributes.options, function anyOption(opt, l) {
                    if (opt.cartOptionId === itemOption.get('cartOptionId')) {
                        option = opt;
                        optionLine = l;
                        return true;
                    }
                    return false;
                });
                if (!option) {
                    attributes.options.push(itemOption.toJSON());
                } else if (optionLine && _.isObject(option.value) && _.isEmpty(option.value)) {
                    attributes.options[optionLine] = itemOption.toJSON();
                }
            });

            ProductModel.prototype.initialize.apply(this, arguments);
        }
    });
});


define('CartToQuote.RequestQuoteWizard.View', [
    'RequestQuoteWizard.View',
    'underscore',
    'Utils'
], function CartToQuoteRequestQuoteWizardView(
    RequestQuoteWizardView,
    _,
    Utils
) {
    'use strict';

    _.extend(RequestQuoteWizardView.prototype, {
        getTitle: function getTitle() {
            return Utils.translate('Market Wizard');
        },
        getBreadcrumbPages: function getBreadcrumbPages() {
            return { href: '/request-a-quote', text: Utils.translate('Market Wizard') };
        }
    });
});


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


define('AwaLabs.Quotes.MyAccount', [
    'ErrorManagement.PageNotFound.View',
    'Profile.Model',
    'MyAccountMenu',
    'Utils',
    'Quote.Collection',
    'MenuTree.View',
    'CartToQuote.RequestQuoteWizard.Module.Items',
    'CartToQuote.RequestQuoteWizard.Module.Items.Line.Action.View',
    'CartToQuote.RequestQuoteWizard',
    'CartToQuote.Transaction.Line.Views.Cell.Actionable.Expanded.View',
    'CartToQuote.RequestQuoteWizard.View',
    'CartToQuote.Module.Items.Line.Quantity.View'
], function AwaLabsQuotesMyAccount(
    PageNotFoundView,
    ProfileModel,
    MyAccountMenu,
    Utils,
    QuoteCollection,
    MenuTreeView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(conteiner) {
            var profile = ProfileModel.getInstance();
            var pageType = conteiner.getComponent('PageType');
            var layout = conteiner.getComponent('Layout');
            var environment = conteiner.getComponent('Environment');
            var menu = MyAccountMenu.getInstance();
            var quotesCollection = new QuoteCollection();
            var subEntryQuote = {
                entryId: 'orders',
                id: 'quotes',
                url: 'quotes',
                index: 5,
                permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
            };
            var SubEntryMarketWizard = {
                entryId: 'orders',
                id: 'marketwizard',
                url: 'request-a-quote',
                index: 6,
                name: Utils.translate('Market Wizard'),
                permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
            };
            var isLoggedIn = profile.get('isLoggedIn') === 'T' && profile.get('isGuest') === 'F';

            if (layout) {
                layout.addToViewContextDefinition('RequestQuoteWizard.Module.Message', 'message', 'string', function fn() {
                    return environment.getConfig('marketWizardTopMessage');
                });
                layout.addToViewContextDefinition('RequestQuoteWizard.Module.Header', 'title', 'string', function fn() {
                    return Utils.translate('Market Wizard');
                });
            }

            if (isLoggedIn && profile.get('isTrade')) {
                menu.addSubEntry(SubEntryMarketWizard);
                quotesCollection.fetch().done(function doneFn() {
                    subEntryQuote.name = quotesCollection.length > 0 ? Utils.translate('Quotes($(0))', quotesCollection.length) : Utils.translate('Quotes');
                    menu.addSubEntry(subEntryQuote);
                    MenuTreeView.getInstance().updateMenuItemsUI();
                });
            } else {
                pageType.registerPageType({
                    'name': 'Quotes',
                    'routes': ['quotes', 'quotes?:options', 'quotes/:id', 'request-quote-wizard'],
                    'view': PageNotFoundView,
                    'defaultTemplate': {
                        'name': 'error_management_page_not_found.tpl',
                        'displayName': 'Page not found'
                    }
                });
            }
        }

    };
});


};

extensions['AwaLabs.CaseCustom.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/CaseCustom/2.1.0/' + asset;
}

define('CaseCustom.Case.List.View', [
    'Case.List.View',
    'underscore',
    'CaseListItemsCollectionView',
    'Utils'
], function CaseCustomCaseListView(
    CaseListView,
    _,
    CaseListItemsCollectionView,
    Utils
) {
    'use strict';

    _.extend(CaseListView.CaseListView.prototype, {
        getChildViews: _.wrap(CaseListView.CaseListView.prototype.getChildViews, function getChildViews(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context['Case.List.Items'] = function CaseListItems() {
                var recordsCollection = this.collection.map(function mapFn(currentCase) {
                    return {
                        touchpoint: 'customercenter',
                        title: Utils.translate('Case #$(0)', currentCase.get('caseNumber')),
                        detailsURL: '#/cases/' + currentCase.get('internalid'),
                        internalid: currentCase.get('internalid'),

                        columns: [
                            {
                                label: Utils.translate('Type of Inquiry:'),
                                type: 'category',
                                name: 'category',
                                value: _.isObject(currentCase.get('category')) ? currentCase.get('category').name : currentCase.get('category').name
                            },
                            {
                                label: Utils.translate('Subject:'),
                                type: 'subject',
                                name: 'subject',
                                value: currentCase.get('title')
                            },
                            {
                                label: Utils.translate('Creation Date:'),
                                type: 'creation-date',
                                name: 'creation-date',
                                value: currentCase.get('createdDate').split(' ')[0]
                            },
                            {
                                label: Utils.translate('Last Message:'),
                                type: 'date',
                                name: 'last-message',
                                value: currentCase.get('lastMessageDate').split(' ')[0]
                            },
                            {
                                label: Utils.translate('Status:'),
                                type: 'status',
                                name: 'status',
                                value: _.isObject(currentCase.get('status')) ? currentCase.get('status').name : currentCase.get('status').name
                            }
                        ]
                    };
                });
                return new CaseListItemsCollectionView.CaseListItemsCollectionView(recordsCollection);
            };
            return context;
        })
    });
});


define('AwaLabs.CaseCustom', [
    'CaseCustom.Case.List.View'
], function AwaLabsCaseCustom() {});


};

extensions['AwaLabs.Dialog.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Dialog/2.0.0/' + asset;
}

define('Dialog.View', [
    'Backbone',
    'dialog.tpl',
    'jQuery',
    'Utils'
], function DialogView(
    Backbone,
    dialogTpl,
    jQuery,
    Utils
) {
    'use strict';

    /** @class DialogView @extend Backbone.View */
    return Backbone.View.extend({

        template: dialogTpl,

        attributes: {
            'class': 'DialogView'
        },

        events: {
            'click .dialog-footer-cancel-button': 'onCancelButtonClickedHandler',
            'click .dialog-footer-ok-button': 'onOkButtonClickedHandler',
            'click .global-views-modal-content-header-close': 'onClose'
        },
        resolveBodyHtml: function resolveBodyHtml() {
            return this.options.bodyHtml ||
                jQuery('<p>').html(this.options.bodyText || Utils.translate('Proceeding with your request...')).prop('outerHTML');
        },

        initialize: function initialize(options) {
            var doNothingFunction = function doNothing() {};
            this.hasName = !!options.name;
            this.name = options.name;
            this.headerText = options.headerText;
            this.hasHeaderText = !!this.headerText;
            this.bodyHtml = this.resolveBodyHtml();
            if (options.buttons) {
                this.hasOkButton = !!options.buttons.ok;
                if (this.hasOkButton) {
                    this.okButtonText = options.buttons.ok.text || Utils.translate('OK');
                    this.onOkButtonClicked = options.buttons.ok.onClick || doNothingFunction;
                }
                this.hasCancelButton = !!options.buttons.cancel;
                if (this.hasCancelButton) {
                    this.cancelButtonText = options.buttons.cancel.text || Utils.translate('CANCEL');
                    this.onCancelButtonClicked = options.buttons.cancel.onClick || doNothingFunction;
                }
            } else {
                this.hasOkButton = !options.hideOkButton;
                this.okButtonText = Utils.translate('OK');
                this.onOkButtonClicked = doNothingFunction;
                this.hasCancelButton = false;
            }
            this.onClose = options.onClose || doNothingFunction;
        },

        onCancelButtonClickedHandler: function onCancelButtonClickedHandler() {
            this.onCancelButtonClicked();
            this.onClose();
        },

        onOkButtonClickedHandler: function onOkButtonClickedHandler() {
            this.onOkButtonClicked();
            this.onClose();
        },

        getContext: function getContext() {
            return {
                hasName: this.hasName,
                name: this.name,
                hasHeaderText: this.hasHeaderText,
                headerText: this.headerText,
                bodyHtml: this.bodyHtml,
                hasOkButton: !!this.hasOkButton,
                okButtonText: this.okButtonText,
                hasCancelButton: !!this.hasCancelButton,
                cancelButtonText: this.cancelButtonText
            };
        }

    });
});


define('Dialog.Service', [
    'Dialog.View',
    'underscore'
], function Dialog(
    DialogView,
    _
) {
    'use strict';

    var DialogService = function DialogService(application) {
        this.application = application;
    };

    _.extend(DialogService.prototype, {
        getConfigData: function getConfigData(name) {
            var configuration = this.application.getComponent('Environment');
            var config = _.findWhere(configuration.getConfig('dialogsConfig'), { name: name });
            var buttons = {};
            if (config) {
                if (config.hasOkBtn) {
                    buttons.ok = {
                        text: config.okBtnText
                    };
                }
                if (config.hasCancelBtn) {
                    buttons.cancel = {
                        text: config.cancelBtnText
                    };
                }
                config.buttons = buttons;
                return config;
            }
            return {};
        },
        openModalDialog: function openModalDialog(viewOptions) {
            this.application.getLayout().showInModal(
                new DialogView(viewOptions), {
                    modalOptions: {
                        backdrop: 'static',
                        keyboard: false
                    }
                }
            );
        },
        openDialog: function openDialog(params) {
            var options;
            var dialogConfig;
            if (_.isString(params)) {
                options = {
                    name: params
                };
            } else {
                options = {
                    name: params.name,
                    headerText: params.headerText,
                    bodyHtml: params.bodyHtml || params.bodyText,
                    buttons: params.buttons,
                    onClose: params.onClose,
                    hideOkButton: params.hideOkButton
                };
            }
            if (options.name) {
                dialogConfig = this.getConfigData(options.name);
                _.extend(options, {
                    headerText: dialogConfig.headerText || options.headerText,
                    bodyHtml: dialogConfig.bodyHtml || options.bodyHtml || dialogConfig.body,
                    buttons: dialogConfig.buttons || options.buttons
                });
                if (dialogConfig.buttons && dialogConfig.buttons.ok && options.buttons && options.buttons.ok) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            ok: {
                                text: dialogConfig.buttons.ok.text || options.buttons.ok.text,
                                onClick: options.buttons.ok.onClick
                            }
                        })
                    });
                }
                if (dialogConfig.buttons && dialogConfig.buttons.cancel && options.buttons && options.buttons.cancel) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            cancel: {
                                text: dialogConfig.buttons.cancel.text || options.buttons.cancel.text,
                                onClick: options.buttons.cancel.onClick
                            }
                        })
                    });
                }
                this.openModalDialog(options);
            } else {
                this.openModalDialog(options);
            }
        }
    });
    return DialogService;
});


define('AwaLabs.Dialog', [
    'Dialog.Service'
], function AwaLabsDialog() {
    'use strict';
});


};

extensions['ACS.ExpectedShipDate.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/ExpectedShipDate/1.0.0/' + asset;
}

define('ExpectedShipDate', [
], function ExpectedShipDate(
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Actionable.View', 'expectedShipDate', 'string', function fn(context) {
                    var expectedShipDate;
                    if (context.model) {
                        expectedShipDate = context.model.expectedShipDate;
                    }
                    return expectedShipDate;
                });
            }
        }
    };
});


};

extensions['AwaLabs.Favicon.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Favicon/2.0.0/' + asset;
}

define('AwaLabs.Favicon', [
], function Favicon(
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            var faviconHtml = '<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">' +
            '<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">' +
            '<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">' +
            '<link rel="manifest" href="/favicon/site.webmanifest">' +
            '<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000">' +
            '<link rel="shortcut icon" href="/favicon/favicon.ico">' +
            '<meta name="msapplication-TileColor" content="#ffffff">' +
            '<meta name="msapplication-config" content="/favicon/browserconfig.xml">' +
            '<meta name="theme-color" content="#ffffff">';
            jQuery('[rel="shortcut icon"]').replaceWith(faviconHtml);
        }
    };
});


};

extensions['AwaLabs.FavoritesList.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/FavoritesList/2.1.0/' + asset;
}

define('FavoritesList.ProductList.Utils', [
    'ProductList.Utils',
    'underscore',
    'ProductList.Item.Model',
    'FavoritesList.ControlSingle.View',
    'ProductList.Control.View',
    'ProductList.Model',
    'MyAccountMenu',
    'ProductList.Collection',
    'jQuery',
    'Utils',
    'MenuTree.View'
], function FavoritesListProductListUtils(
    ProductListUtils,
    _,
    ProductListItemModel,
    FavoritesListControlSingleView,
    ProductListControlView,
    ProductListModel,
    MyAccountMenu,
    ProductListCollection,
    jQuery,
    Utils,
    MenuTreeView
) {
    'use strict';

    var productListsInstance;

    _.extend(ProductListUtils.ProductListUtils.prototype, {
        profileModelPromiseDone: function profileModelPromiseDone() {
            var utils = this.application.ProductListModule.Utils;
            var layout = this.application.getLayout();
            if (!utils.isProductListEnabled()) {
                return;
            }
            utils.renderProductLists();
            layout.on('afterAppendView', function afterAppendViewFn(view) {
                utils.renderProductLists(view);
            });
            layout.on('afterAppendToDom', function afterAppendToDomFn() {
                utils.renderProductLists();
            });
            // Put this code block outside afterAppendView to avoid infinite loop!
            utils.getProductListsPromise().done(function doneFn() {
                utils.productListsPromiseDone();
                utils.favoritesListPromiseDone();
            });
            ProductListItemModel.prototype.keyMapping = this.application.getConfig(
                'itemKeyMapping',
                {}
            );
            ProductListItemModel.prototype.itemOptionsConfig = this.application.getConfig(
                'itemOptions',
                []
            );
        },
        getProjetsLists: function getProjetsLists() {
            var application = this.application;
            var defaultTemplate = application.getConfig('productList.listTemplates')[0];
            var result;
            if (productListsInstance) {
                result = _.filter(productListsInstance.models, function filterProductListsInstances(list) {
                    var listName = list.get('name') ? list.get('name').toLocaleLowerCase() : '';
                    var defaultName = (defaultTemplate && defaultTemplate.name && defaultTemplate.name.toLocaleLowerCase()) || 'my favorites';
                    var defaultLegacyName = 'my list';
                    return listName !== defaultName && listName !== defaultLegacyName;
                });
                return new ProductListCollection(result);
            }
            return null;
        },
        favoritesListPromiseDone: function favoritesListPromiseDone() {
            var menu = MyAccountMenu.getInstance();
            var layout = this.application.getLayout();
            var utils = this.application.ProductListModule.Utils;
            var favoriteLists = utils.getFavoriteList();
            var singleList = favoriteLists && favoriteLists.length && favoriteLists[0];
            var productListMenuItem = layout.$('.header-profile-single-productlist');
            var productListHashtag = '#favorite/' + (singleList.get('internalid') ?
                singleList.get('internalid') :
                ('tmpl_' + singleList.get('templateid')));

            menu.addEntry({
                id: 'productlist_' +
                        (singleList.get('internalid') ?
                            singleList.get('internalid') :
                            ('tmpl_' + singleList.get('templateid'))),
                name: 'Favorites (' + singleList.get('items').length + ')',
                url: 'favoriteslist/' + (singleList.get('internalid') ?
                        singleList.get('internalid') :
                        ('tmpl_' + singleList.get('templateId'))),
                index: 2.5
            });

            if (utils.isSingleList()) {
                if (singleList && productListMenuItem) {
                    productListMenuItem.text(singleList.get('name'));
                    productListMenuItem.attr('data-hashtag', productListHashtag);
                }
            }
        },
        getFavoriteList: function getFavoriteList() {
            productListsInstance = this.application.ProductListModule.Utils.getProductLists();
            if (productListsInstance) {
                return _.filter(productListsInstance.models, function filterProductListsInstances(list) {
                    var listName = list.get('name') ? list.get('name').toLocaleLowerCase() : '';
                    var defaultName = 'my favorites';
                    var defaultLegacyName = 'my list';
                    return listName === defaultName || listName === defaultLegacyName;
                });
            }

            return null;
        },
        renderControl: function renderControl(view_) {
            var utils = this.application.ProductListModule.Utils;
            var self = this;
            var $favoritesContainer;
            var $projectsContainer;
            var projectsControl = null;
            var productListsPromise = utils.getProductListsPromise();
            var view = view_ || this.application.getLayout().currentView;
            var isSingleListMode = utils.isSingleList();
            this.placeholder = {
                projectsControl: '[data-type="productlists-control"]',
                favoritesControl: '[data-type="favorites-control"]'
            };
            jQuery(this.placeholder.favoritesControl).each(function eachFavoritControl() {
                var favoritesControl = null;
                $favoritesContainer = jQuery(this);

                productListsPromise.done(function productListsPromiseDone() {
                    // this control needs a reference to the StoreItem model !
                    if (view && view.model) {
                        favoritesControl = new FavoritesListControlSingleView({
                            collection: utils.getProductLists(),
                            product: view.model,
                            application: self.application
                        });
                        $favoritesContainer.empty().append(favoritesControl.$el);
                        favoritesControl.render();
                    }
                });
            });
            if ($favoritesContainer && productListsPromise.state() === 'pending') {
                $favoritesContainer.empty().append('<button class="product-list-control-button-wishlist">' +
                    _('Loading Favorites...').translate() + '</button>');
            }
            jQuery(this.placeholder.projectsControl).each(function projectControlsDone() {
                $projectsContainer = jQuery(this);
                productListsPromise.done(function productListsPromiseDone() {
                    // this control needs a reference to the StoreItem model !
                    if (view && view.model) {
                        view.countedClicks = {};

                        projectsControl = new ProductListControlView({
                            collection: utils.getProductLists(),
                            product: view.model,
                            application: this.application,
                            isDisabledWishlistButton: !!jQuery(utils.placeholder.control).data(
                                'disabledbutton'
                            ),
                            countedClicks: view.countedClicks
                        });
                    }

                    $projectsContainer.empty().append(projectsControl.$el);
                    projectsControl.render();
                });
            });

            if ($projectsContainer && productListsPromise.state() === 'pending') {
                $projectsContainer
                    .empty()
                    .append(
                        '<button class="product-list-control-button-wishlist">' +
                        (isSingleListMode
                            ? Utils.translate('Loading List...')
                            : Utils.translate('Loading Lists...')) +
                        '</button>'
                    );
            }
        },
        getSavedForLaterProductList: function getSavedForLaterProductList() {
            var productList = new ProductListModel();
            var favoritesList = this.getFavoriteList();
            if (favoritesList.length) {
                favoritesList = favoritesList[0];
            }
            productList.set('internalid', favoritesList.id);
            return productList.fetch();
        },
        buildSubMenuEntry: function buildSubMenuEntry(productlist, entryId) {
            return {
                entryId: entryId,
                id:
                    'productlist_' +
                    (productlist.get('internalid') || 'tmpl_' + productlist.get('templateId')),
                url:
                    'project/' +
                    (productlist.get('internalid') || 'tmpl_' + productlist.get('templateId')),
                name:
                    (productlist.get('name') === 'My list'
                        ? Utils.translate('My list')
                        : productlist.get('name')) +
                    ' (' +
                    productlist.get('items').length +
                    ')',
                index: 2
            };
        },
        updateProductListMenu: function updateProductListMenu() {
            var utils = this;
            var productLists = utils.getProjetsLists();
            var menu = MyAccountMenu.getInstance();
            var newMenuEntry;
            var self = this;
            function buildNewEntry() {
                return {
                    id: 'productlists',
                    name: Utils.translate('Projects'),
                    url: '',
                    // Index of the menu item for menu order
                    index: 2
                };
            }
            function buildSingleListNewEntry() {
                var theSingleList = productLists.at(0);
                return {
                    id:
                        'productlist_' +
                        (theSingleList.get('internalid')
                            ? theSingleList.get('internalid')
                            : 'tmpl_' + theSingleList.get('templateId')),
                    name: theSingleList.get('name'),
                    url:
                        'project/' +
                        (theSingleList.get('internalid')
                            ? theSingleList.get('internalid')
                            : 'tmpl_' + theSingleList.get('templateId')),
                    // Index of the menu item for menu order
                    index: 2
                };
            }
            if (!utils.isProductListEnabled()) {
                menu.removeEntry('product_list_dummy');
            } else {
                newMenuEntry = utils.isSingleList() ? buildSingleListNewEntry() : buildNewEntry();
                this.entryId = newMenuEntry.id;
                if (productLists && productLists.models) {
                    menu.replaceEntry('product_list_dummy', {
                        id: newMenuEntry.id,
                        name: newMenuEntry.name +
                        ' (' +
                        productLists.models.length +
                        ')',
                        index: newMenuEntry.index,
                        url: newMenuEntry.url
                    });
                }

                if (!utils.isSingleList()) {
                    productLists.each(function eachProductLists(productlist) {
                        menu.addSubEntry(
                            utils.buildSubMenuEntry(productlist, newMenuEntry.id)
                        );
                    });
                }
            }
            _.each(productLists.models, function eachProductListModel(list) {
                list.get('items').on('add remove', function addRemoveItems() {
                    var subMenuEntry = utils.buildSubMenuEntry(list, self.entryId);
                    MyAccountMenu.getInstance().replaceSubEntry(subMenuEntry.id, subMenuEntry);
                    MenuTreeView.getInstance().updateMenuItemsUI();
                });
            });
            MenuTreeView.getInstance().updateMenuItemsUI();

            productLists.on('add', function addProductLists(model) {
                MyAccountMenu.getInstance().addSubEntry(
                    utils.buildSubMenuEntry(model, self.entryId)
                );

                menu.replaceEntry(newMenuEntry.id, {
                    id: newMenuEntry.id,
                    name: newMenuEntry.name +
                    ' (' +
                    productLists.models.length +
                    ')',
                    index: newMenuEntry.index,
                    url: newMenuEntry.url
                });
                MenuTreeView.getInstance().updateMenuItemsUI();
            });
            productLists.on('remove', function removeProductLists(model) {
                MyAccountMenu.getInstance().removeSubEntry(
                    utils.buildSubMenuEntry(model, self.entryId).id
                );

                menu.replaceEntry(newMenuEntry.id, {
                    id: newMenuEntry.id,
                    name: newMenuEntry.name +
                    ' (' +
                    productLists.models.length +
                    ')',
                    index: newMenuEntry.index,
                    url: newMenuEntry.url
                });

                MenuTreeView.getInstance().updateMenuItemsUI();
            });
        }

    });
});


define('FavoritesList.ProductList.Details.View', [
    'ProductList.Details.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'GlobalViews.Confirmation.View',
    'ProductList.Model',
    'Profile.Model',
    'MenuTree.View',
    'Backbone',
    'Configuration',
    'ListHeader.View',
    'ProductList.BulkActions.View',
    'Handlebars',
    'underscore'
], function FavoritesListProductListDetailsView(
    ProductListDetailsView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    GlobalViewsConfirmationView,
    ProductListModel,
    ProfileModel,
    MenuTreeView,
    Backbone,
    Configuration,
    ListHeaderView,
    ProductListBulkActionsView,
    Handlebars,
    _
) {
    'use strict';

    _.extend(ProductListDetailsView.prototype, {
        events: _.extend(ProductListDetailsView.prototype.events, {
            'click [data-action="delete-project"]': 'askDeleteList',
            'click [data-action="add-items-to-quote"]': 'addItemsToQuotetBulkHandler'
        }),
        childViews: _.extend(ProductListDetailsView.prototype.childViews, {
            'ProductList.DynamicDisplay': function ProductListDynamicDisplay() {
                var displayOption = this.getDisplayOption();
                var rows = parseInt(displayOption.columns, 10) || 3;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    collection: this.collection.models,
                    viewsPerRow: rows,
                    childViewOptions: {
                        application: this.application,
                        show_edit_action: true,
                        show_move_action: true,
                        listId: this.model.id,
                        parentView: this,
                        isFavorite: this.options.isFavorite || false
                    }
                });
            }
        }),

        setupListHeader: function setupListHeader(collection) {
            var self = this;
            this.listHeader = new ListHeaderView({
                view: this,
                displays: true,
                application: this.application,
                avoidFirstFetch: true,
                headerMarkup: function headerMarkup() {
                    var view = new ProductListBulkActionsView({ model: self.model });
                    view.render();
                    return new Handlebars.SafeString(view.$el.html());
                },
                hideFilterExpandable: function hideFilterExpandable() {
                    return this.collection.length < 2;
                },
                selectable: true,
                collection: collection,
                sorts: this.sortOptions
            });
        },

        showContent: _.wrap(ProductListDetailsView.prototype.showContent, function showContent(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.collection.on('all', this.collectionEventsHandler, this);
        }),

        askDeleteList: function askDeleteList(e) {
            this.deleteConfirmationView = new GlobalViewsConfirmationView({
                callBackParameters: {
                    target: e.target,
                    context: this
                },
                callBack: this.deleteListHandler,
                title: _('Delete list').translate(),
                autohide: true,
                body: _('Are you sure you want to remove the project?').translate()
            });
            this.application.getLayout().showInModal(this.deleteConfirmationView);
        },

        deleteListHandler: function deleteListHandler(options) {
            var self = options.context;
            var projectsList = self.application.ProductListModule.Utils.getProductLists();
            var projectsListIntances;
            var project = self.getProject(self.model.id, projectsList);

            projectsList.remove(project);
            project.url = ProductListModel.prototype.url;

            project.destroy().done(function projectDestroy() {
                MenuTreeView.getInstance().updateMenuItemsUI();
                self.deleted = true;
                self.render();
                if (self.deleteConfirmationView && self.deleteConfirmationView.$containerModal) {
                    self.deleteConfirmationView.$containerModal.modal('hide');
                }

                Backbone.history.navigate('overview', { trigger: false });
                projectsListIntances = self.application.ProductListModule.Utils.getProductLists();
                projectsListIntances.trigger('change');
            });
        },
        getProject: function getProject(listId, projectsList) {
            return projectsList.where({ internalid: listId })[0];
        },
        showConfirmationMessage: _.wrap(ProductListDetailsView.prototype.showConfirmationMessage, function showConfirmationMessage(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.notifiyChangeToHeaders();
        }),
        collectionEventsHandler: function collectionEventsHandler(eventName) {
            switch (eventName) {
            case 'update':
                if (this.options.isFavorite) {
                    this.notifiyChangeToHeaders();
                }
                break;
            case 'destroy':
                this.notifiyChangeToHeaders();
                break;
            default:
                break;
            }
        },
        notifiyChangeToHeaders: function notifiyChangeToHeaders() {
            var projectsListIntances = this.application.ProductListModule.Utils.getProductLists();
            projectsListIntances.trigger('change');
        },
        showConfirmationHelper: _.wrap(ProductListDetailsView.prototype.showConfirmationHelper, function showConfirmationHelper(fn) {
            // eslint-disable-next-line no-undef
            if (!!SC && !!SC.SESSION && !!SC.SESSION.touchpoints && !!SC.SESSION.touchpoints.viewcart) {
                // eslint-disable-next-line no-undef
                window.location.href = SC.SESSION.touchpoints.viewcart;
            } else {
                fn.apply(this, _.toArray(arguments).slice(1));
            }
        }),
        getContext: _.wrap(ProductListDetailsView.prototype.getContext, function getContext(fn) {
            var user = ProfileModel.getInstance();
            var collection = this.model.get('items').models || [];
            var totalPrice = 0;
            var isPriceEnabled = !user.hidePrices();
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var useRetailPrices = user.get('isEnabledRetailPrices');
            if (isPriceEnabled) {
                try {
                    _.each(collection, function eachCollection(line) {
                        var qty = line.get('quantity');
                        var item = line.getItem();
                        var price = useRetailPrices ? item.get(retailPricelevel) : item.get('onlinecustomerprice_detail').onlinecustomerprice;
                        totalPrice += qty * price;
                    });
                    totalPrice = _.formatCurrency(totalPrice);
                } catch (e) {
                    totalPrice = _.translate('No total price available');
                }
            }
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isPriceEnabled: isPriceEnabled,
                useRetailPrices: useRetailPrices,
                totalPrice: totalPrice,
                deleted: this.deleted
            });
        }),
        setButtonToDisabled: function setButtonToDisabled() {
            var addToCartButton = this.$el.find('.product-list-bulk-actions-button-addtocart');
            var addToCartExpander = this.$el.find('.product-list-bulk-actions-button-expander');
            var removeButton = this.$el.find('.product-list-bulk-actions-button-remove');
            var collectionLength = this.collection.models.length;
            var modelIndex = 0;
            var setDisabled = true;
            while (modelIndex < collectionLength && setDisabled) {
                if (this.collection.models[modelIndex].get('checked') === true) {
                    setDisabled = false;
                }
                modelIndex++;
            }
            addToCartButton.attr('disabled', setDisabled);
            addToCartExpander.attr('disabled', setDisabled);
            removeButton.attr('disabled', setDisabled);
        }
    });
});


define('Project.ProductList.Lists.View', [
    'ProductList.Lists.View',
    'Backbone.CollectionView',
    'ProductList.ListDetails.View',
    'Utils',
    'Backbone',
    'underscore'
], function ProjectProductListListsView(
    ProductListListsView,
    BackboneCollectionView,
    ProductListListDetailsView,
    Utils,
    Backbone,
    _
) {
    'use strict';

    _.extend(ProductListListsView.prototype, {
        childViews: _.extend(ProductListListsView.prototype.childViews, {
            'ProductList.ListDetails': function ProductListListDetails() {
                var noFavoriteCollection = this.collection.clone();
                var defaultTemplate = this.application.getConfig('productList.listTemplates');
                defaultTemplate = defaultTemplate && defaultTemplate.length && defaultTemplate[0];
                if (defaultTemplate && defaultTemplate.name) {
                    noFavoriteCollection.remove(this.collection.findWhere({ name: defaultTemplate.name }));
                }
                return new BackboneCollectionView({
                    childView: ProductListListDetailsView,
                    viewsPerRow: 1,
                    collection: noFavoriteCollection
                });
            }
        }),
        navigateToItems: function navigateToItems(e) {
            var list;
            var internalid;
            var url;
            if (Utils.isTargetActionable(e)) {
                return;
            }
            list = this.getCurrentList(e);
            internalid = list.get('internalid');
            url = '/project/' + (internalid || 'tmpl_' + list.get('templateid'));
            Backbone.history.navigate(url, { trigger: true });
        }
    });
});


define('FavoritesList.BulkActions.Extended.View', [
    'ProductList.BulkActions.View',
    'ShareFavorites.Model',
    'Profile.Model',
    'underscore'
], function FavoritesListBulkActionsExtendedView(
    BulkActionsExtendedView,
    ShareFavoritesModel,
    ProfileModel,
    _
) {
    'use strict';

    _.extend(BulkActionsExtendedView.prototype, {
        getContext: _.wrap(BulkActionsExtendedView.prototype.getContext, function getContext(fn) {
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices') ? 'T' : 'F';
            var share = new ShareFavoritesModel();
            var url = _.translate(share.url() + '?userid=$(0)&listid=$(1)&enableprice=$(2)&useretailprice=$(3)',
                user.get('internalid'), this.model.id, !user.hidePrices() ? 'T' : 'F', useRetailPrices);
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isFavorite: this.model.get('templateId') === '1',
                isPriceEnabled: !user.hidePrices(),
                pdfUrl: url
            });
        })
    });
});


define('FavoritesList.AddedToCart.Improved.View', [
    'ProductList.AddedToCart.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'underscore'
], function FavoritesListAddedToCartImprovedView(
    ProductListAddedToCartView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    _
) {
    'use strict';

    _.extend(ProductListAddedToCartView.prototype, {
        childViews: _.extend(ProductListAddedToCartView.prototype.childViews, {
            'ProductList.ItemsAddedToCart': function ProductListItemsAddedToCart() {
                var list = this.options.list;
                var isItem = !list;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    childViewOptions: {
                        application: this.application,
                        hide_rating: true,
                        hide_added_on: true,
                        hide_checkbox: true,
                        id: 'list',
                        name: 'List',
                        icon: 'icon-th-list',
                        isDefault: true,
                        isItemsAddedToCart: true,
                        hideStock: true
                    },
                    viewsPerRow: 1,
                    collection: isItem
                        ? [this.options.item]
                        : list.get('items').models.filter(this.isPurchasable)
                });
            }
        }),

        getContext: function getContext() {
            var list = this.options.list;
            var isItem = !list;
            var models = isItem ? [this.options.item] : list.get('items').models.filter(this.isPurchasable);

            return {
                isItem: isItem,
                hasMoreThanOneModel: models.length > 1,
                listName: !isItem ? list.get('name') : this.options.item.get('item').displayname,
                modelsLength: models.length,
                isItemsAddedToCart: this.options.isItemsAddedToCart || false
            };
        }
    });
});


define('FavoritesList.ControlSingle.View', [
    'ProductList.ControlSingle.View',
    'favorites_list_control_single.tpl',
    'ProductList.Control.View',
    'underscore',
    'jQuery'
], function FavoritesListControlSingleView(
    ProductListControlSingleView,
    favoritesListControlSingleTpl,
    ProductListControlView,
    _,
    jQuery
) {
    'use strict';

    return ProductListControlSingleView.extend({
        template: favoritesListControlSingleTpl,
        events: {
            'click [data-type="add-product-to-single-list"]': 'addRemoveProduct'
        },
        triggerChange: ProductListControlView.prototype.triggerChange,
        initialize: _.wrap(ProductListControlSingleView.prototype.initialize, function initialize(fn) {
            var favoriteslist;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.utils = this.options.application.ProductListModule.Utils;
            favoriteslist = this.utils.getFavoriteList();
            this.single_list = this.utils.getProductLists().length === 1 ? this.collection.at(0) : _.find(this.collection.models, function findModel(list) {
                return list.get('name') === favoriteslist[0].get('name');
            });
            this.on('afterViewRender', function fnAfterViewRender() {
                _.defer(function fnDefer() {
                    if (jQuery('.stock-notifications-accordion').length) {
                        jQuery('.favorites-wrap').addClass('no-stock');
                    }
                });
            });
        }),
        isProductAlreadyAdded: function isProductAlreadyAdded() {
            return !!this.single_list && this.single_list.checked(this.product);
        },
        addRemoveProduct: function addRemoveProduct(e) {
            if (!this.isProductAlreadyAdded()) {
                this.addItemToSingleList(e);
            } else {
                this.removeItemFromList(this.product, e);
            }
        },
        removeItemFromList: function removeItemFromList(product, e) {
            var self = this;
            var productId = this.getProductId(product);
            var productItem = this.single_list.get('items').find(function findSingleList(item) {
                return (
                    parseInt(item.get('item').get('internalid'), 10) === parseInt(productId, 10)
                    || parseInt(item.get('item').get('originalid'), 10) === parseInt(productId, 10));
            });
            e.preventDefault();

            if (productItem) {
                productItem.set('productList', {
                    id: self.single_list.get('internalid') || self.single_list.get('originalid'),
                    owner: self.single_list.get('owner').id
                });
                this.single_list.get('items').remove(productItem);

                productItem.destroy().done(function destroyItemDone() {
                    self.single_list.collection.trigger('changed');
                    self.render();
                    self.triggerChange();
                });
            } else {
                self.render();
            }
        },
        getContext: function getContext() {
            var model = this.single_list;
            return {
                isProductAlreadyAdded: this.isProductAlreadyAdded(),
                name: model && model.get('name'),
                id: model && model.get('internalid')
            };
        }
    });
});


define('ShareFavorites.Model', [
    'Backbone',
    'underscore'
], function ShareFavoritesModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/ShareFavorites.Service.ss'))
    });
});


define('FavoritesList.CartSaveForLater.View', [
    'Cart.Detailed.View',
    'underscore'
], function FavoritesListCartSaveForLaterView(
    CartDetailedView,
    _
) {
    'use strict';

    _.extend(CartDetailedView.prototype, {
        disableElementsOnPromise: _.wrap(CartDetailedView.prototype.disableElementsOnPromise, function disableElementsOnPromise(fn, wholePromise) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            wholePromise.done(function wholePromiseDone() {
                var projectsListIntances = self.application.ProductListModule.Utils.getProductLists();
                projectsListIntances.trigger('change');
            });
        })
    });
});


define('FavoritesList.ProductList.DetailsLater.View', [
    'ProductList.DetailsLater.View',
    'Profile.Model',
    'underscore'
], function FavoritesListProductListDetailsLaterView(
    ProductListDetailsLaterView,
    ProfileModel,
    _
) {
    'use strict';

    var favoritesPromise;
    _.extend(ProductListDetailsLaterView.prototype, {
        loadProductList: _.wrap(ProductListDetailsLaterView.prototype.loadProductList, function loadProductList(fn) {
            var self = this;
            if (this.model.get('typeName') !== 'default' && this.model.get('name') !== 'Favorites') {
                return fn.apply(this, _.toArray(arguments).slice(1));
            }
            if (!favoritesPromise) {
                ProfileModel.getPromise().done(function profileGetPromiseDone() {
                    if (ProfileModel.getInstance().get('isLoggedIn') === 'T') {
                        self.favoritesUtils = self.options.application.ProductListModule.Utils;

                        self.favoritesUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                            var favoritesList = self.favoritesUtils.getFavoriteList();
                            if (favoritesList.length) {
                                favoritesList = favoritesList[0];
                                favoritesPromise = self.favoritesUtils.getProductList(favoritesList.id).done(function getProductListDone(favoriteList) {
                                    favoriteList.name = _.translate('Favorites');
                                    self.favoriteList = favoriteList;
                                    self.isLoading = false;
                                    self.model.set(favoriteList);
                                    self.render();
                                });
                            }
                        });
                    }
                });
            }

            return favoritesPromise;
        }),
        disableElementsOnPromise: _.wrap(ProductListDetailsLaterView.prototype.disableElementsOnPromise, function disableElementsOnPromise(fn, wholePromise) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            wholePromise.done(function wholePromiseDone() {
                self.notifiyChangeToHeaders();
            });
        }),
        showConfirmationMessage: _.wrap(ProductListDetailsLaterView.prototype.showConfirmationMessage, function showConfirmationMessage(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.notifiyChangeToHeaders();
        }),
        notifiyChangeToHeaders: function notifiyChangeToHeaders() {
            var projectsListIntances = this.application.ProductListModule.Utils.getProductLists();
            projectsListIntances.trigger('change');
        },
        getContext: _.wrap(ProductListDetailsLaterView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            originalRet.name = this.model.get('name');
            return originalRet;
        })
    });
});


define('FavoritesList.ProductList.Control.View', [
    'ProductList.Control.View',
    'ProductList.ControlSingle.View',
    'FavoritesList.ControlSingle.View',
    'ProductList.Collection',
    'Tracker',
    'underscore',
    'Utils'
], function FavoritesListProductListControlView(
    ProductListControlView,
    ProductListControlSingleView,
    FavoritesListControlSingleView,
    ProductListCollection,
    Tracker,
    _,
    Utils
) {
    'use strict';

    var ControlViewFunctions = {
        addNewProductToList: function addNewProductToList(newList) {
            this.addItemToList(this.product, newList, true);
            this.saveAndShowConfirmationMessage(
                this.$('.ul-product-lists [type="checkbox"]:checked').length > 1
                    ? Utils.translate('Success! You added this item to your Projects')
                    : Utils.translate('Success! You added this item to your Project')
            );
        },
        doAddItemToList: function doAddItemToList(product, productList, dontShowMessage) {
            var self = this;
            var alreadyAdded = false;
            var productListLineToSave = this.getNewItemData(product, productList);
            var productLists = this.utils.getProductLists();
            if (!productLists.get(productList.get('internalid'))) {
                productLists.add(productList);
                alreadyAdded = true;
            }
            return productListLineToSave.save(null, {
                // Note this is lack of validation is require to not validate the JSON returned from the
                // services as it will lack the Model/Collection structure required to run the
                // validation. for example the list of options will be an array and not a collection
                // as the event handle that parse them didn't run yet
                validate: false,
                success: function productListSave(productListLine) {
                    if (!alreadyAdded) {
                        productList.get('items').add(productListLine);
                    } else {
                        productList.set('items', [productListLine]);
                    }

                    Tracker.getInstance().trackAddToWishlist(self.product);

                    self.collection.trigger('changed');
                    self.render();
                    self.triggerChange();
                    if (!dontShowMessage) {
                        self.saveAndShowConfirmationMessage(
                            self.$('.ul-product-lists [type="checkbox"]:checked').length > 1
                                ? Utils.translate('Success! You added this item to your product lists')
                                : Utils.translate('Success! You added this item to your product list')
                        );
                    }
                }
            });
        },
        showFlyout: _.wrap(ProductListControlView.prototype.showFlyout, function showFlyout(fn) {
            if (this.isDisabledWishlistButton) {
                return;
            }
            fn.apply(this, _.toArray(arguments).slice(1));
        }),
        triggerChange: function triggerChange() {
            var productListsInstance = this.utils.getProductLists();
            productListsInstance.trigger('change');
        }
    };

    _.extend(ProductListControlView.prototype, {
        initialize: _.wrap(ProductListControlView.prototype.initialize, function initialize(fn) {
            var favorites;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.utils = this.utils ? this.utils : this.options.application.ProductListModule.Utils;
            favorites = this.utils.getFavoriteList();
            favorites = favorites && favorites.length ? favorites[0] : null;
            if (favorites) {
                this.collection = this.collection.filter(function filterFavorites(model) {
                    return (!!favorites && favorites.id !== model.id);
                });

                if (!(this.collection instanceof ProductListCollection)) {
                    this.collection = new ProductListCollection(this.collection);
                }
            }
        }),
        events: _.extend(ProductListControlView.prototype.events, {
            'click [data-action="close-message"]': function hideMessage() {
                this.hideConfirmationMessage();
            }
        })
    });

    _.extend(ProductListControlView.prototype, ControlViewFunctions);
    _.extend(ProductListControlSingleView.prototype, ControlViewFunctions);
    _.extend(FavoritesListControlSingleView.prototype, ControlViewFunctions);
});


define('FavoritesList.ProductList.DisplayFull.View', [
    'ProductList.DisplayFull.View',
    'LiveOrder.Model',
    'MenuTree.View',
    'ProductList.AddedToCart.View',
    'ProductList.Item.Model',
    'jQuery',
    'underscore',
    'Profile.Model'
], function FavoritesListProductListDisplayFullView(
    ProductListDisplayFullView,
    LiveOrderModel,
    MenuTreeView,
    ProductListAddedToCartView,
    ProductListItemModel,
    jQuery,
    _,
    ProfileModel
) {
    'use strict';

    _.extend(ProductListDisplayFullView.prototype, {
        events: {
            'click [data-action="add-this-to-cart"]': 'addItemToCartHandler',
            'click [data-action="delete-item"]': 'deleteItemsHandler',
            'change [name="quantity"]': 'updateQuantity',
            'keypress [name="quantity"]': 'ignoreEnter'
        },
        initialize: _.wrap(ProductListDisplayFullView.prototype.initialize, function initialize(fn) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            this.cart = LiveOrderModel.getInstance();
            this.application = self.options.application;
        }),
        getOptionsArray: function getOptionsArray() {
            // Iterate on the stored Product List Item options and create an id/value object compatible with the existing options renderer...
            var optionValues = [];
            var selectedOptions = this.model.get('options');
            selectedOptions.each(function eachSelectedOptions(value) {
                optionValues.push({
                    id: value.get('cartOptionId'),
                    value: value.get('value') && value.get('value').id,
                    displayvalue: value.get('value') && value.get('value').label
                });
            });
            return optionValues;
        },
        addItemToCartHandler: function addItemToCartHandler(e) {
            var self = this;
            var selectedProductListItem = this.model;
            var selectedItem = selectedProductListItem.get('item');
            var selectedItemInternalid = selectedItem.get('internalid');
            var addToCartPromise = this.cart.addProduct(selectedProductListItem);
            var wholePromise = jQuery.when(addToCartPromise).then(jQuery.proxy(self, 'showConfirmationHelper', selectedProductListItem));

            e.stopPropagation();
            e.preventDefault();

            if (wholePromise) {
                this.disableElementsOnPromise(wholePromise, 'tr[data-item-id="' + selectedItemInternalid + '"] button');
            }
        },
        deleteItemsHandler: function deleteItemsHandler(e) {
            var self = this;
            var selectedModel = self.model;
            var deletePromise;
            var item;
            var appItemList;
            e.stopPropagation();
            e.preventDefault();
            if (!selectedModel) {
                return;
            }

            // there are two collections with the same information this.model and the one on application
            // should remove the item on both
            appItemList = _.findWhere(self.application.ProductListModule.Utils.getProductLists().models, { id: self.options.listId });
            item = selectedModel;
            // fix already used in "deleteListItem"
            item.url = ProductListItemModel.prototype.url;

            if (appItemList) {
                appItemList.get('items').remove(item);
            }
            deletePromise = item.destroy().promise();

            jQuery.when.apply(jQuery, deletePromise).then(function deletePromiseThen() {
                self.options.parentView.render();
                MenuTreeView.getInstance().updateMenuItemsUI();
                self.showConfirmationMessage(_('The selected items were removed from your product list').translate());
            });
        },
        showConfirmationHelper: function showConfirmationHelper(selectedItem) {
            this.showConfirmationMessage(_('Success! The item were successfully added to your cart.' +
                ' You can continue to <a href="#" data-touchpoint="viewcart">view cart and checkout</a>').translate());
            // selected item may be undefined
            if (_.isUndefined(selectedItem) === true) {
                return;
            }

            this.addedToCartView = new ProductListAddedToCartView({
                application: this.application,
                parentView: this,
                item: selectedItem
            });

            this.application.getLayout().showInModal(this.addedToCartView);
        },
        updateQuantity: function updateQuantity(e) {
            var newQuantity = parseInt(jQuery(e.target).val(), 10);
            var currentQuantity = this.model.get('quantity');
            e.preventDefault();
            e.stopPropagation();

            jQuery(e.target).val(newQuantity);

            if (newQuantity !== currentQuantity) {
                this.model.set('quantity', newQuantity);
            }
        },
        showAddToCart: function showAddToCart() {
            var profile = ProfileModel.getInstance();
            if (profile.get('isTrade')) {
                return true;
            }
            return this.model.get('item') && this.model.get('item').get('isinstock');
        },
        getContext: _.wrap(ProductListDisplayFullView.prototype.getContext, function getContext(fn) {
            var self = this;
            var profile = ProfileModel.getInstance();
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var itemDetails = self.model.get('item');
            var stockInfo = itemDetails.getStockInfo();
            context.stockAvailability = !!stockInfo && typeof (stockInfo.stock) !== 'undefined' ? stockInfo.stock : 'loading ...';
            context.isItemsAddedToCart = this.options.isItemsAddedToCart || false;
            context.hideStock = this.options.hideStock || false;
            context.isFavorite = this.options.isFavorite || false;
            context.sku = itemDetails ? itemDetails.get('itemid') : '';
            context.showAddToCart = this.showAddToCart();
            context.isTradeAndNotIsBackOrderable = profile.get('isTrade') &&
                self.model.get('item') &&
                !self.model.get('item').get('isbackorderable') &&
                self.model.get('item').get('quantityavailable') === 0;
            return context;
        })
    });
});


define('Header.MiniFavorites.View', [
    'Header.MiniFavoritesItemCell.View',
    'Profile.Model',
    'Configuration',
    'header_mini_favorites.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
],
function HeaderMiniFavoritesView(
    HeaderMiniFavoritesItemCellView,
    ProfileModel,
    Configuration,
    headerMiniFavoritesTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniFavoritesTpl,
        favoriteList: null,
        initialize: function initialize() {
            var self = this;
            this.FavoritesUtils = this.options.application.ProductListModule.Utils;
            // for loading status
            this.isLoading = true;
            this.ItemsCount = 0;
            // Favorites Favorites promise
            this.FavoritesUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                var FavoritesList = self.FavoritesUtils.getFavoriteList();
                var productListsInstance = self.FavoritesUtils.getProductLists();
                if (FavoritesList.length) {
                    FavoritesList = FavoritesList[0];
                    self.FavoritesUtils.getProductList(FavoritesList.id).done(function getProductListDone(favoriteList) {
                        self.favoriteList = favoriteList;
                        self.isLoading = false;
                        self.render();
                    });
                }

                productListsInstance.on('change', function productListsInstanceChange() {
                    FavoritesList = self.FavoritesUtils.getFavoriteList();
                    if (FavoritesList.length) {
                        FavoritesList = FavoritesList[0];
                        self.FavoritesUtils.getProductList(FavoritesList.id).done(function getProductListDone2(favoriteList) {
                            self.favoriteList = favoriteList;
                            self.isLoading = false;
                            self.render();
                        });
                    }
                });
            });

            BackboneCompositeView.add(this);
        },

        render: function render() {
            Backbone.View.prototype.render.apply(this, arguments);
            // on tablet or desktop make the minicart dropdown
            if (_.isTabletDevice() || _.isDesktopDevice()) {
                this.$('[data-type="mini-favorites"]').attr('data-toggle', 'dropdown');
            }
        },
        getItemsSummary: function getItemsSummary() {
            var count = 0;
            var cost = 0;
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            var totalCost = 0;
            if (!this.isLoading) {
                _.each(this.favoriteList.items, function eachFavoriteItem(line) {
                    count += line.quantity;
                    cost = useRetailPrices ? line.item[retailPricelevel] : line.item.onlinecustomerprice_detail.onlinecustomerprice;
                    totalCost += line.quantity * cost;
                });
            }
            return {
                count: count,
                totalCost: totalCost
            };
        },
        childViews: {
            'Header.MiniFavoritesItemCell': function HeaderMiniFavoritesItemCell() {
                var favoriteList = this.favoriteList;
                var lines = favoriteList.items;
                return new BackboneCollectionView({
                    collection: !this.isLoading ? new Backbone.Collection(lines) : new Backbone.Collection(),
                    childView: HeaderMiniFavoritesItemCellView,
                    viewsPerRow: 1
                });
            }
        },
        getContext: function getContext() {
            var summary = this.getItemsSummary();
            return {
                url: this.favoriteList ? 'favoriteslist/' + (this.favoriteList.internalid || 'tmpl_' + this.favoriteList.templateid) : '',
                ItemsCount: summary.count,
                totalCost: _.formatCurrency(summary.totalCost),
                isLoading: this.isLoading,
                showLines: summary.count > 0,
                id: !!this.favoriteList && this.favoriteList.internalid,
                showCost: !ProfileModel.getInstance().hidePrices()
            };
        }
    });
});


define('Header.MiniFavoritesItemCell.View', [
    'Configuration',
    'Transaction.Line.Views.Option.View',
    'Profile.Model',
    'Item.Model',
    'header_mini_favorites_item_cell.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
],
function HeaderMiniFavoritesItemCellView(
    Configuration,
    ItemViewsSelectedOptionView,
    ProfileModel,
    ItemDetailsModel,
    headerMiniFavoritesItemCellTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniFavoritesItemCellTpl,
        initialize: function initialize() {
            var item = this.model.get('item');
            var itemDetails = new ItemDetailsModel(item);
            this.model.set('itemDetails', itemDetails);
            BackboneCompositeView.add(this);
        },
        childViews: {
            'Item.SelectedOptions': function ItemSelectedOptions() {
                return new BackboneCollectionView({
                    collection: this.model.get('itemDetails').getPosibleOptions(),
                    childView: ItemViewsSelectedOptionView,
                    viewsPerRow: 1,
                    childViewOptions: {
                        cartLine: this.model,
                        templateName: 'selected'
                    }
                });
            }
        },
        getContext: function getContext() {
            var line = this.model;
            var item = line.get('item');
            var itemDetails = line.get('itemDetails');
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            return {
                loading: false,
                formattedPrice: useRetailPrices ? item[retailPricelevel + '_formatted'] : item.onlinecustomerprice_detail.onlinecustomerprice_formatted,
                name: item.displayname,
                itemType: item.itemtype,
                url: itemDetails.get('_thumbnail').url,
                altimagetext: itemDetails.get('_thumbnail').altimagetext,
                itemId: itemDetails.id,
                linkAttributes: itemDetails.getFullLink({
                    quantity: null,
                    location: null,
                    fulfillmentChoice: null
                }),
                quantity: line.get('quantity'),
                isPriceEnabled: !ProfileModel.getInstance().hidePrices()
            };
        }
    });
});


define('Header.MiniProjects.View', [
    'LiveOrder.Model',
    'Header.MiniCartSummary.View',
    'Header.MiniProjectsItemCell.View',
    'Profile.Model',
    'Configuration',
    'header_mini_projects.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
], function HeaderMiniProjectsView(
    LiveOrderModel,
    HeaderMiniCartSummaryView,
    HeaderMiniProjectsItemCellView,
    ProfileModel,
    Configuration,
    headerMiniProjectsTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniProjectsTpl,
        initialize: function initialize() {
            var self = this;
            this.projectsUtils = this.options.application.ProductListModule.Utils;
            // for loading status
            this.isLoading = true;
            this.projectsCount = 0;
            // projects projects promise
            this.projectsUtils.getProductListsPromise().done(function getProductListsPromiseDone() {
                var projectsList = self.projectsUtils.getProjetsLists();
                var productListsInstance = self.projectsUtils.getProductLists();
                self.projectsCount = projectsList.length;
                self.isLoading = false;
                self.render();
                productListsInstance.on('change', function productListsInstanceChange() {
                    projectsList = self.projectsUtils.getProjetsLists();
                    self.projectsCount = projectsList.length;
                    self.render();
                });
            });
            BackboneCompositeView.add(this);
        },
        render: function render() {
            Backbone.View.prototype.render.apply(this, arguments);
            // on tablet or desktop make the minicart dropdown
            if (_.isTabletDevice() || _.isDesktopDevice()) {
                this.$('[data-type="mini-projects"]').attr('data-toggle', 'dropdown');
            }
        },
        childViews: {
            'Header.MiniProjectsItemCell': function HeaderMiniProjectsItemCell() {
                var projects = this.projectsUtils.getProjetsLists();
                var collection = projects.map(function getProjetsListsMap(project) {
                    var id = project.id;
                    var name = project.get('name');
                    var itemsCount = project.get('items').length;
                    return {
                        id: id,
                        name: name,
                        itemsCount: itemsCount
                    };
                });
                return new BackboneCollectionView({
                    collection: !this.isLoading ? new Backbone.Collection(collection) : new Backbone.Collection(),
                    childView: HeaderMiniProjectsItemCellView,
                    viewsPerRow: 1
                });
            }
        },
        getContext: function getContext() {
            return {
                projectsCount: this.projectsCount,
                isLoading: this.isLoading,
                showLines: this.projectsCount > 0
            };
        }
    });
});


define('Header.MiniProjectsItemCell.View', [
    'header_mini_projects_item_cell.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView'
], function HeaderMiniProjectsItemCellView(
    headerMiniProjectsItemCellTpl,
    _,
    Backbone,
    BackboneCompositeView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniProjectsItemCellTpl,
        initialize: function initialize() {
            BackboneCompositeView.add(this);
        },
        getContext: function getContext() {
            var name = this.model.get('name');
            var id = this.model.get('id');
            var itemsCount = this.model.get('itemsCount');
            return {
                id: id,
                text: _('$(0) ($(1))').translate(name, itemsCount)
            };
        }
    });
});


define('Favorites.ProductList.Details.View', [
    'ProductList.Details.View',
    'Backbone.CollectionView',
    'ProductList.DisplayFull.View',
    'ProductList.Model',
    'Backbone',
    'underscore',
    'FavoritesList.ProductList.Details.View'
], function FavoritesProductListDetailsView(
    ProductListDetailsView,
    BackboneCollectionView,
    ProductListDisplayFullView,
    ProductListModel,
    Backbone,
    _
) {
    'use strict';


    return ProductListDetailsView.extend({
        childViews: _.extend(ProductListDetailsView.prototype.childViews, {
            'ProductList.DynamicDisplay': function ProductListDynamicDisplay() {
                var displayOption = this.getDisplayOption();
                var rows = parseInt(displayOption.columns, 10) || 3;
                return new BackboneCollectionView({
                    childView: ProductListDisplayFullView,
                    collection: this.collection.models,
                    viewsPerRow: rows,
                    childViewOptions: {
                        application: this.application,
                        show_edit_action: true,
                        show_move_action: true,
                        listId: this.model.id,
                        parentView: this,
                        isFavorite: true
                    }
                });
            }
        }),

        getContext: _.wrap(ProductListDetailsView.prototype.getContext, function getContext(fn) {
            return _.extend(fn.apply(this, _.toArray(arguments).slice(1)), {
                isFavorite: true
            });
        })
    });
});


define('FavoritesList.ProductList.Model', [
    'ProductList.Model',
    'underscore'
], function FavoritesListProductListModel(
    ProductListModel,
    _
) {
    'use strict';

    _.extend(ProductListModel.prototype, {
        getProductId: function getProductId(line) {
            if (line.getItemId) {
                return line.getItemId();
            }
            if (this.application.ProductListModule) {
                return this.application.ProductListModule.Utils.internalGetProductId(line);
            }
            return line.get('_id') + '';
        },
        getItemOptions: function getItemOptions(line) {
            var selectedOptions = line.get('options').filter(function filterOptions(option) {
                return !!option.get('value') && !!option.get('value').internalid;
            });

            return _.reduce(
                selectedOptions,
                function reduceOptions(acc, option) {
                    var value = option.get('value') || {};

                    acc[option.get('cartOptionId')] = {
                        value: value.internalid,
                        displayvalue: value.label
                    };

                    return acc;
                },
                {}
            );
        },
        checked: function checked(line) {
            var itemToAddId = this.getProductId(line);
            var itemToAddOptions = this.getItemOptions(line);
            var self = this;
            var pliOptions;
            return this.get('items').some(function someItem(pli) {
                if (
                    pli.get('item').get('internalid') === itemToAddId
                    || pli.get('item').get('originalid') === itemToAddId
                ) {
                    pliOptions = self.getItemOptions(pli);
                    if (_.isEmpty(pliOptions) && _.isEmpty(itemToAddOptions)) {
                        return true;
                    }
                    return _.isEqual(pliOptions, itemToAddOptions);
                }

                return false;
            });
        }
    });
});


define('FavoritesList.ProductList.ControlItem.View', [
    'ProductList.ControlItem.View',
    'jQuery',
    'underscore'
], function FavoritesListProductListControlItemView(
    ProductListControlItemView,
    jQuery,
    _
) {
    'use strict';

    _.extend(ProductListControlItemView.prototype, {
        pListItemHandler: function pListItemHandler(e) {
            e.preventDefault();
            e.stopPropagation();
            this.pListItemHandlerAddRemove(e);
        },
        pListItemHandlerAddRemove: _.debounce(function pListItemHandlerAddRemove(e) {
            var self = this;
            var checkbox = jQuery(e.target);
            if (self.parentView.mode === 'move') {
                self.moveProduct();
            } else {
                self.addRemoveProduct(checkbox);
            }
        }, 600),
        removeItemFromList: function removeItemFromList(product) {
            var self = this;
            var productId = this.parentView.getProductId(product);
            var productItem = self.model.get('items').find(function findItem(item) {
                return parseInt(item.get('item').get('internalid'), 10) === parseInt(productId, 10);
            });
            var productListsInstance = this.parentView.utils.getProductLists();

            if (productItem) {
                productItem.set('productList', {
                    id: self.model.get('internalid'),
                    owner: self.model.get('owner').id
                });
                this.model.get('items').remove(productItem);

                productItem.destroy().done(function productItemDestroy() {
                    self.model.collection.trigger('changed');
                    productListsInstance.trigger('change');
                    self.parentView.render();
                    self.parentView.hideConfirmationMessage();
                });
            } else {
                self.parentView.render();
            }
        }
    });
});


define('FavoritesList.RequestQuoteWizard.Module.Items', [
    'underscore',
    'ShareFavorites.Model',
    'RequestQuoteWizard.Module.Items',
    'Profile.Model'
], function FavoritesListRequestQuoteWizardModuleItems(
    _,
    ShareFavoritesModel,
    RequestQuoteWizardModuleItems,
    ProfileModel
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItems.prototype, {
        generatePdfUrl: function generatePdfUrl(user, useRetailPrices) {
            var pdfModel = new ShareFavoritesModel();
            var url = pdfModel.url();

            var urlParams = {
                userid: user.get('internalid'),
                listid: this.model.get('plInternalId'),
                enableprice: !user.hidePrices() ? 'T' : 'F',
                useretailprice: useRetailPrices
            };
            var urlSearchParams = new URLSearchParams(urlParams);
            url += '?' + urlSearchParams.toString();
            return url;
        },

        getContext: _.wrap(RequestQuoteWizardModuleItems.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');

            context.pdfUrl = this.generatePdfUrl(user, useRetailPrices);
            return context;
        })
    });
});


define('AwaLabs.FavoritesList', [
    'Profile.Model',
    'Utils',
    'ProductList.Details.View',
    'Favorites.ProductList.Details.View',
    'ProductList.Lists.View',
    'Header.MiniProjects.View',
    'Header.MiniFavorites.View',
    'ErrorManagement.PageNotFound.View',
    'underscore',
    'ProductList.Utils',
    'FavoritesList.ProductList.Utils',
    'FavoritesList.ProductList.Details.View',
    'Project.ProductList.Lists.View',
    'FavoritesList.AddedToCart.Improved.View',
    'FavoritesList.BulkActions.Extended.View',
    'FavoritesList.ProductList.DetailsLater.View',
    'FavoritesList.CartSaveForLater.View',
    'FavoritesList.ProductList.Control.View',
    'FavoritesList.ProductList.DisplayFull.View',
    'FavoritesList.ProductList.Model',
    'FavoritesList.ProductList.ControlItem.View'
], function AwaLabsFavoritesList(
    ProfileModel,
    Utils,
    ProductListDetailsView,
    FavoritesListProductListDetailsView,
    ProductListListsView,
    HeaderMiniProjectsView,
    HeaderMiniFavoritesView,
    PageNotFoundView,
    _
) {
    'use strict';

    return {
        MenuItems: {
            name: _('My Favorites').translate(),
            id: 'favoriteslist',
            index: 3,
            url: 'balance'
        },

        mountToApp: function mountToApp(application) {
            var pageType = application.getComponent('PageType');
            var layout = application.getComponent('Layout');

            pageType.registerPageType({
                name: 'Favorites',
                routes: ['favoriteslist/:id'],
                view: FavoritesListProductListDetailsView,
                options: {
                    isFavorite: true
                }
            });

            pageType.registerPageType({
                name: 'Favorites',
                routes: ['project/:id', 'project/:id/?*options'],
                view: ProductListDetailsView,
                options: {
                    isFavorite: false
                }
            });

            pageType.registerPageType({
                name: 'Projects',
                routes: ['project', 'project/?*options'],
                view: ProductListListsView,
                defaultTemplate: {
                    name: 'product_list_lists.tpl',
                    displayName: 'Projects List',
                    thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/default-layout-wishlist.png'
                    )
                }
            });

            pageType.registerPageType({
                name: 'ProjectDetails',
                routes: ['project/:id', 'project/:id/?*options'],
                view: ProductListDetailsView,
                defaultTemplate: {
                    name: 'product_list_details_tpl',
                    displayName: 'Project Details',
                    thumbnail: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/default-layout-wishlist-detail.png'
                    )
                }
            });

            pageType.registerPageType({
                'name': 'Wishlist',
                'routes': ['wishlist', 'wishlist/?*options', 'wishlist/:id', 'wishlist/:id/?*options'],
                'view': PageNotFoundView,
                'defaultTemplate': {
                    'name': 'error_management_page_not_found.tpl',
                    'displayName': 'Page not found'
                }
            });

            if (layout) {
                layout.addChildViews(
                    layout.ALL_VIEWS, {
                        'Header.MiniProjects': {
                            'Header.MiniProjects': {
                                childViewIndex: 1,
                                childViewConstructor: function headerMiniProject() {
                                    return new HeaderMiniProjectsView({
                                        application: application
                                    });
                                }
                            }
                        },
                        'Header.MiniFavorites': {
                            'Header.MiniFavorites': {
                                childViewIndex: 1,
                                childViewConstructor: function cmsHomeSlider() {
                                    return new HeaderMiniFavoritesView({
                                        application: application
                                    });
                                }
                            }
                        }
                    }
                );

                layout.addToViewContextDefinition('Header.View', 'showMiniCart', 'boolean', function showMiniCart() {
                    var profile = ProfileModel.getInstance();
                    return profile.get('isLoggedIn') === 'T';
                });
            }
        }
    };
});


};

extensions['AwaLabs.FooterCopyright.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/FooterCopyright/2.1.0/' + asset;
}

define('FooterCopyright.View', [
    'SCView',
    'footer_copyright.tpl'
], function FooterCopyrightViewModule(
    SCViewComponent,
    FooterCopyrightTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function FooterCopyrightView(options) {
        SCView.call(this);
        this.options = options;
        this.template = FooterCopyrightTpl;
    }

    FooterCopyrightView.prototype = Object.create(SCView.prototype);

    FooterCopyrightView.prototype.constructor = FooterCopyrightView;

    FooterCopyrightView.prototype.getContext = function getContext() {
        var environmentComponent = this.options.application.getComponent('Environment');
        return {
            copyrightText: (environmentComponent.getConfig('footer.copyrightText') || '').replace('[YEAR]', new Date().getFullYear())
        };
    };

    return FooterCopyrightView;
});


define('AwaLabs.FooterCopyright', [
    'FooterCopyright.View'
], function FooterCopyright(
    FooterCopyrightView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'FooterCopyright': {
                        'FooterCopyright': {
                            childViewIndex: 1,
                            childViewConstructor: function footerCopyright() {
                                return new FooterCopyrightView({
                                    application: container
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});


};

extensions['AwaLabs.GeoIPLocation.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/GeoIPLocation/2.1.0/' + asset;
}

define('AwaLabs.GeoIpLocation', [
    'jQuery',
    'underscore',
    'Utils'
], function AwaLabsGeoIpLocation(
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            jQuery.getScript(_.getAbsoluteUrl(getExtensionAssetsPath('services/restrictedIp.ssp')));
        }
    };
});


};

extensions['AwaLabs.HeadContentByApplication.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/HeadContentByApplication/2.1.0/' + asset;
}

define('AwaLabs.HeadContentByApplication', [
    'jQuery',
    'Utils'
], function AwaLabsHeadContentByApplication(
    jQuery
) {
    'use strict';

    function isOnCMS() {
        return (parent && parent.location && parent.location.href.match(/\/cms\/[0-9]\/admin\/cms/ig))
            || location.href.match(/\/cms\/[0-9]\/admin\/cms/ig);
    }

    return {
        mountToApp: function mountToApp(container) {
            var $head = jQuery('head');
            var environmentComponent = container.getComponent('Environment');
            var headHtml = environmentComponent.getConfig('HeadContentByApplication.' + SC.ENVIRONMENT.SCTouchpoint);
            var $headHtmlAdd;
            if (SC.ENVIRONMENT.jsEnvironment === 'browser' && !isOnCMS() && headHtml) {
                $headHtmlAdd = jQuery(headHtml);
                $head.append($headHtmlAdd);
            }
        }
    };
});


};

extensions['AwaLabs.HeaderCustomizations.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/HeaderCustomizations/2.0.0/' + asset;
}

define('HeaderCustomizations.Header.View', [
    'Header.View',
    'underscore',
    'jQuery'
], function HeaderCustomizationsHeaderView(
    HeaderView,
    _,
    jQuery
) {
    'use strict';

    _.extend(HeaderView.prototype, {
        initialize: _.wrap(HeaderView.prototype.initialize, function initialize(fn) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            jQuery(window).on('price_change', function priceChange() {
                self.render();
            });
        })
    });
});


define('HeaderCustomizations.MyAccount.Menu', [
    'underscore'
], function HeaderCustomizationsMyAccountMenu(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            var userComponent = container.getComponent('UserProfile');
            var customerTypeFieldId = environment.getConfig('headerCustomization.customerTypeFieldId');
            var accountBalanceName = environment.getConfig('headerCustomization.accountBalanceName');
            var printStatementName = environment.getConfig('headerCustomization.printStatementName');

            userComponent.getUserProfile().then(function thenFn(user) {
                var userType = _.findWhere(user.customfields, { id: customerTypeFieldId });
                var userIsCustomer = userType && userType.value === '1';
                if (userIsCustomer) {
                    layout.addToViewContextDefinition('Header.Menu.MyAccount.View', 'entries', 'array', function fn(context) {
                        return _.map(context.entries, function mapEntries(entry) {
                            if (entry.name === 'Billing') {
                                entry.children = _.reject(entry.children, { name: accountBalanceName });
                                entry.children = _.reject(entry.children, { name: printStatementName });
                            }

                            return entry;
                        });
                    });

                    layout.addToViewContextDefinition('MenuTree.Node.View', 'node', 'array', function fn(context) {
                        var node = context.node;
                        return node.name === accountBalanceName || node.name === printStatementName ? {} : node;
                    });
                }
            });
        }
    };
});


define('AwaLabs.HeaderCustomizations', [
    'underscore',
    'Profile.Model',
    'Header.Menu.View',
    'SC.Configuration',
    'Categories',
    'HeaderCustomizations.MyAccount.Menu',
    'HeaderCustomizations.Header.View'
], function HeaderCustomizations(
    _,
    ProfileModel,
    HeaderMenuView,
    Configuration,
    Categories,
    HeaderCustomizationsMyAccountMenu
) {
    'use strict';

    return {
        addImageToRootCategories: function addImageToRootCategories() {
            var arrayImagesObject = SC.ENVIRONMENT.published.SCCategoryConfiguration;
            var imageObject;
            _.each(Configuration.navigationData, function eachNav(nav) {
                imageObject = _.find(arrayImagesObject, function findImageObject(imageObj) {
                    return imageObj.siteCategory && imageObj.siteCategory.toUpperCase() === nav.text.toUpperCase();
                });
                if (imageObject) {
                    nav.image = imageObject;
                }
            });
        },
        mountToApp: function mountToApp(container) {
            var self = this;
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();
            var showMyAccount = !profile.get('contactId') || (!!profile.get('contactId')() && profile.allowPriceControl());
            Categories.getCategoriesPromise().done(function dnFn() {
                self.addImageToRootCategories();
            });
            if (!showMyAccount) {
                HeaderMenuView.removeChildView('Header.Menu.MyAccount', 'Header.Menu.MyAccount');
            }
            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.View', 'showMyAccount', 'boolean', function fn() {
                    return showMyAccount;
                });

                layout.addToViewContextDefinition('RequestQuoteAccessPoints.HeaderLink.View', 'DisplayLink', 'boolean', function fn() {
                    return profile.get('isLoggedIn') === 'T';
                });
            }

            HeaderCustomizationsMyAccountMenu.mountToApp(container);
        }
    };
});


};

extensions['AwaLabs.InactivityMessage.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/InactivityMessage/2.1.0/' + asset;
}

define('Session.Message', [
    'session_message.tpl',
    'InactivityMessage.ProfileModel',
    'Dialog.Service',
    'InactivityMessage.Model',
    'underscore',
    'Backbone',
    'jQuery',
    'Utils'
], function SessionMessage(
    sessionMessageTpl,
    ProfileModel,
    DialogService,
    InactivityMessageModel,
    _,
    Backbone,
    jQuery
) {
    'use strict';

    return Backbone.View.extend({
        template: sessionMessageTpl,
        title: _('Session Timeout').translate(),
        attributes: {
            'class': 'SessionMessageView'
        },
        modalClass: 'session-timeout',
        initialize: function initialize(application) {
            var self = this;
            this.application = application;
            this.sessionExpired = false;
            this.sessionMantained = false;
            this.inactivityMessageModel = new InactivityMessageModel();
            this.waitConfirmationLogout();
            this.on('afterViewRender', function afterViewRender() {
                _.defer(function deferEvent() {
                    jQuery('#modal').on('hidden.bs.modal', function hideModal() {
                        if (!self.sessionMantained) {
                            self.logOut();
                        }
                    });
                });
            });
        },

        events: {
            'click [data-action="maintain-session"]': 'keepSessionAlive'
        },

        keepSessionAlive: function keepSessionAlive() {
            var profileModel = new ProfileModel();
            var self = this;
            profileModel.fetch().done(function onDone() {
                if (profileModel.get('isLoggedIn') !== 'T') {
                    self.sessionExpired = true;
                    self.render();
                    return;
                }
                self.inactivityMessageModel.fetch().done(function onFetchDone() {
                    self.sessionMantained = true;
                    jQuery('#modal').modal('toggle');
                    if (profileModel.get('isPendingTradeApproval')) {
                        new DialogService(self.application)
                            .openDialog('Pending Trade Approval - Session Timeout');
                    }
                });
            });
        },

        waitConfirmationLogout: function waitConfirmationLogout() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.logOut();
            }, 30000);
        },

        logOut: function logOut() {
            var environmentComponent = this.application.getComponent('Environment');
            var logoutURL = environmentComponent.getSiteSetting('touchpoints.logout');

            window.location.href = logoutURL;
        },

        getContext: function getContext() {
            return {
                sessionExpired: this.sessionExpired,
                sessionMantained: this.sessionMantained
            };
        }
    });
});


define('InactivityMessage.Model', [
    'Backbone',
    'underscore'
], function InactivityMessageModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl(getExtensionAssetsPath('services/InactivityMessage.Service.ss'))
    });
});


define('InactivityMessage.ProfileModel', [
    'Backbone',
    'underscore'
], function InactivityMessageProfileModel(
    Backbone,
    _
) {
    'use strict';

    return Backbone.Model.extend({
        urlRoot: _.getAbsoluteUrl('services/Profile.Service.ss')
    });
});


define('AwaLabs.Inactivity.Message', [
    'Session.Message',
    'underscore',
    'jQuery'
], function AwaLabsInactivityMessage(
    SessionMessage,
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            this.application = application;
            this.checkSession();
        },

        checkSession: function checkSession() {
            var userProfile = this.application.getComponent('UserProfile');
            var self = this;
            userProfile.getUserProfile().then(function afterGetUserProfile(user) {
                if (!user || !user.isloggedin) {
                    return;
                }
                self.setNewSessionTimeoutHandler();
                jQuery(document).ajaxSuccess(function onSuccess() {
                    self.setNewSessionTimeoutHandler();
                });
            });
        },

        addDefinitionsToModalView: function addDefinitionsToModalView() {
            var self = this;
            var layout = this.application.getComponent('Layout');

            layout.addToViewContextDefinition('GlobalViews.Modal.View', 'closeAction', 'string', function addCloseAction(context) {
                return context.modalDialogClass === 'session-timeout' ? 'log-out' : '';
            });

            layout.addToViewEventsDefinition('GlobalViews.Modal.View', 'click [data-action="log-out"]', function logOut() {
                var environmentComponent = self.application.getComponent('Environment');
                window.location.href = environmentComponent.getSiteSetting('touchpoints.logout');
            });
        },

        setNewSessionTimeoutHandler: function setNewSessionTimeoutHandler() {
            var self = this;
            window.clearTimeout(window.timeoutHandle);
            window.timeoutHandle = window.setTimeout(function fnTimeOut() {
                self.showModalDialog();
                self.addDefinitionsToModalView(); // add context properties to global view to trigger logout on dismiss modal button.
            }, 600000);
        },

        showModalDialog: function showModalDialog() {
            var view = new SessionMessage(this.application);
            var options = {
                modalOptions: {
                    backdrop: 'static',
                    keyboard: false
                }
            };

            this.application.getLayout().showInModal(view, options);
        }
    };
});


};

extensions['AwaLabs.ItemSearchAutoAdd.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/ItemSearchAutoAdd/2.1.0/' + asset;
}

define('ItemSearchAutoAdd.ItemSearcher.View', [
    'ItemsSearcher.View',
    'ItemsSearcher.Utils',
    'Tracker',
    'jQuery',
    'underscore'
], function ItemSearchAutoAddItemSearcherView(
    ItemsSearcherView,
    ItemsSearcherUtils,
    Tracker,
    jQuery,
    _
) {
    'use strict';

    _.extend(ItemsSearcherView.prototype, {
        loadSuggestionItemsSource: function loadSuggestionItemsSource(query, callback, callbackAsync) {
            var self = this;

            Tracker.getInstance().trackSearch(query);

            self.options.ajaxDone = false;
            self.options.results = {};
            self.options.query = ItemsSearcherUtils.formatKeywords(query);
            this.collection = new this.options.collection([], this.options.collectionOptions);
            if (self.options.query.length >= self.options.minLength) {
                self.options.labels = ['see-all-' + self.options.query];
                callback(self.options.labels);
            }
            self.collection.fetch(
                {
                    data: {
                        q: jQuery.trim(self.options.query),
                        sort: self.options.sort,
                        limit: self.options.limit,
                        offset: 0
                    },
                    killerId: _.uniqueId('ajax_killer_')
                }, {
                    silent: true
                }).done(function onDone() {
                    var triggerSingle = 0;
                    var itemid = '';
                    var name = '';

                    self.collection =
                        self.postItemsSuggestionObtained.executeAll(self.collection, self.options) ||
                        self.collection;

                    self.options.ajaxDone = true;
                    self.options.labels = self.options.showSeeAll
                        ? ['see-all-' + self.options.query].concat(self.getItemIds(self.collection))
                        : self.getItemIds(self.collection);

                    if (self.options.labels.length) {
                        triggerSingle = self.options.labels.length;
                    } else {
                        self.options.labels = ['see-all-' + self.options.query];
                    }

                    callbackAsync(self.options.labels);
                    self.selectFirstIfRequire();

                    if (triggerSingle === 1) {
                        _.each(self.collection.models, function fnEach(model) {
                            var childItem = model.getSelectedMatrixChilds();
                            var selectedItem = childItem && childItem.length === 1 ? childItem[0] : model.get('item');

                            itemid = selectedItem ? selectedItem.get('itemid') : '';
                            name = selectedItem ? selectedItem.get('storedisplayname2') : '';
                        });
                        if (String(itemid) === String(self.options.query)
                            || name.toLocaleLowerCase() === self.options.query.toLocaleLowerCase()) {
                            self.onItemSelectedAutoAdd(self.options.labels[0]);
                        }
                    }
                }
            );
        },

        onItemSelectedAutoAdd: function onItemSelectedAutoAdd(itemId) {
            this.options.selectedItem = this.collection.get(itemId);
            this.trigger('itemSelectedAutoAdd', {
                selectedItem: this.collection.get(itemId),
                collection: this.collection.models,
                currentQuery: this.options.query
            });
        },

        setFocus: function setFocus() {
            var self = this;

            if (!SC.isPageGenerator()) {
                setTimeout(function setFocusOnTimeout() {
                    self.$('[data-type="search-input"]').focus();
                });
            }
        }
    });
});


define('ItemSearchAutoAdd.QuickAdd.View', [
    'QuickAdd.View',
    'underscore'
], function ItemSearchAutoAddQuickAddView(
    QuickAddView,
    _
) {
    'use strict';

    _.extend(QuickAddView.prototype, {
        initialize: _.wrap(QuickAddView.prototype.initialize, function fnInitialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.itemsSearcherComponent.on('itemSelectedAutoAdd', this.onItemSelectedAutoAdd, this);
        }),

        onItemSelectedAutoAdd: function onItemSelectedAutoAdd(result) {
            var item = result.selectedItem;
            var selectedValue;
            var possibleOptions;
            var options;
            var minimumQuantity;
            var selectedItem = item && item.getSelectedMatrixChilds();

            if (selectedItem && selectedItem.length === 1) {
                possibleOptions = item.getVisibleOptions();
                options = item.get('options');
                item.set('item', selectedItem[0]);
                item.set('options', options);
                _.each(possibleOptions, function eachOption(option) {
                    if (option.get('isMatrixDimension') && option.get('itemOptionId')) {
                        selectedValue = option.get('values') && _.findWhere(option.get('values'), {
                            label: selectedItem[0].get(option.get('itemOptionId'))
                        });
                        if (selectedValue && selectedValue.internalid) {
                            item.setOption(option.get('cartOptionId'), selectedValue.internalid);
                        }
                    }
                });
            }

            if (item && item.get('item')) {
                this.model.set('quickaddSearch', item.get('item').get('_name'));
                this.model.set('selectedProduct', item);
                this.setDefaultQuantity(
                    item.get('item').get('_minimumQuantity', true),
                    item.get('item').get('internalid')
                );
                this.$('[name="quantity"]').focus();
                this.selectAll();

                minimumQuantity = this.model.get('selectedProduct').get('_minimumQuantity', true);
                if (minimumQuantity > 1) {
                    this.$('.quick-add-box-minimum').html(
                        _('Minimum of $(0) required').translate(minimumQuantity)
                    );
                }

                this.$('[data-validation-error="block"]').remove();
                this.$('[data-type="search-input"]').val(item.get('item').get('_sku'));
                this.$el.find('form').submit();
            } else {
                this.model.unset('selectedProduct');
                this.$('.quick-add-box-minimum').empty();
            }
        }
    });
});


define('ItemSearchAutoAdd.Product.Model', [
    'Product.Model',
    'Product.Option.Collection',
    'underscore'
], function ItemSearchAutoAddProductModel(
    ProductModel,
    ProductOptionCollection,
    _
) {
    'use strict';

    _.extend(ProductModel.prototype, {
        setOptionsValidation: function setOptionsValidation() {
            var self = this;

            self.get('options').each(function fnEach(option) {
                self.validation[option.get('cartOptionId')] = {
                    fn: function optionValidationFunction(_value, cartOptionId, computedState) {
                        var validation;
                        var selectedOption;
                        var options = computedState && computedState.options && computedState.options.models
                             ? computedState.options
                             : new ProductOptionCollection(computedState.options || []);

                        selectedOption = options.findWhere({
                            cartOptionId: cartOptionId
                        });
                        validation = options && options.models && selectedOption.validate();

                        return validation && validation['value.internalid'];
                    }
                };
            });
        }
    });
});


define('AwaLabs.ItemSearchAutoAdd', [
    'ItemSearchAutoAdd.ItemSearcher.View',
    'ItemSearchAutoAdd.QuickAdd.View',
    'ItemSearchAutoAdd.Product.Model'
], function ItemSearchAutoAddQuickAddView() {});


};

extensions['AwaLabs.Jewelry.2.1.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Jewelry/2.1.1/' + asset;
}

define('Jewelry.Utils', [

], function JewelryItemKeyMapping(

) {
    'use strict';

    return {
        isJewelry: function isJewelry(item, environmentComponent) {
            var jewelryConfig = environmentComponent.getConfig('jewelry');
            var productCategory = item[jewelryConfig.productTypeFieldId];

            return productCategory && productCategory === jewelryConfig.productTypeFieldValue;
        },

        getJewelrySummary: function getJewelrySummary(summary) {
            var summaryJewelry = summary && summary.jewelry;

            if (summaryJewelry) {
                summaryJewelry.singleItem = summaryJewelry.jewelry_count && summaryJewelry.jewelry_count <= 1;
            }
            return summaryJewelry;
        },

        getNewItemCount: function getNewItemCount(itemCount, summary) {
            var summaryJewelry = summary && summary.jewelry;

            return itemCount - (summaryJewelry && summaryJewelry.jewelry_count ? summaryJewelry.jewelry_count : 0);
        },

        cartContextDefinitions: function cartContextDefinitions(cart) {
            var self = this;
            
            cart.addToViewContextDefinition('Cart.Summary.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.summary);
            });

            cart.addToViewContextDefinition('Cart.Summary.View', 'itemCount', 'number', function itemCount(context) {
                return self.getNewItemCount(context.itemCount, context.summary);
            });
        },

        layoutContextDefinitions: function layoutContextDefinitions(layout, environment) {
            var self = this;

            layout.addToViewContextDefinition('Header.MiniCart.View', 'jewelry', 'object', function jewelry(context) {
                return self.getJewelrySummary(context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'radItems', 'number', function itemsInCart(context) {
                return self.getNewItemCount(context.itemsInCart, context.model.summary);
            });

            layout.addToViewContextDefinition('Header.MiniCart.View', 'showPluraLabel', 'number', function showPluraLabel(context) {
                var radItems = self.getNewItemCount(context.itemsInCart, context.model.summary);
                return radItems === 0 || radItems > 1;
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'isJewelry', 'boolean', function isJewelry(context) {
                return self.isJewelry(context.model.item || context.model, environment);
            });

            layout.addToViewContextDefinition('ProductLine.Stock.View', 'shippingWarning', 'string', function shippingWarning() {
                return environment.getConfig('jewelry.shippingWarning');
            });
        }
    };
});


define('OrderWizard.Module.Confirmation.Jewelry', [
    'OrderWizard.Module.Confirmation',
    'Backbone',
    'Tracker',
    'underscore'
], function OrderWizardModuleConfirmationJewelry(
    OrderWizardModuleConfirmation,
    Backbone,
    Tracker,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleConfirmation.prototype, {
        trackTransaction: function trackTransaction(confirmation) {
            var summary = confirmation.get('summary');
            var lines = confirmation.get('lines').filter(function eachLine(line) {
                return line.get('rate') > 0;
            });
            var transaction = {
                confirmationNumber: confirmation.get('tranid'),
                subTotal: summary && (summary.totalSubtotal || summary.subtotal),
                total: summary && summary.total,
                taxTotal: summary && summary.taxtotal,
                shippingCost: summary && summary.shippingcost,
                handlingCost: summary && summary.handlingcost,
                products: new Backbone.Collection(),
                promocodes: confirmation.get('promocodes')
            };
            var transactionModel = new Backbone.Model(transaction);

            _(lines).each(function eachLine(line) {
                var options = [];

                line.get('options').each(function eachOption(option) {
                    if (option.get('value').label) {
                        options.push(option.get('value').label);
                    }
                });

                transactionModel.get('products').add(
                    new Backbone.Model({
                        name: line.get('item').get('_name'),
                        id: line.get('item').get('itemid'),
                        rate: line.get('rate'),
                        category: '/' + line.get('item').get('urlcomponent'),
                        options: options.sort().join(', '),
                        quantity: line.get('quantity')
                    })
                );
            });

            Tracker.getInstance().trackTransaction(transactionModel);
        }
    });
});


define('AwaLabs.Jewelry.MyAccount', [
    'Header.MiniCart.View',
    'Backbone.View',
    'Jewelry.Utils'
], function AwaLabsJewelryMyAccount(
    HeaderMiniCartView,
    BackboneView,
    JewelryUtils
) {
    'use strict';

    HeaderMiniCartView.addExtraContextProperty = BackboneView.addExtraContextProperty;

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');

            if (layout) {
                JewelryUtils.layoutContextDefinitions(layout, environment);

                layout.addToViewContextDefinition('OrderHistory.Summary.View', 'jewelry', 'object', function jewelry(context) {
                    return JewelryUtils.getJewelrySummary(context.model.summary);
                });
            }
        }
    };
});


};

extensions['Tavano.Klaviyo.3.0.7'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/Tavano/Klaviyo/3.0.7/' + asset;
}


define('Tavano.Klaviyo.Cart.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

    var isCartUpdateInProgress = false;

	var KlaviyoCartSync = {

		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},

		addCustomFields : function(line,parentItem,environment_component,klaviyoObject,isMatrixChild){

			
			try{
				var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];
				

				_.each(customFields,function(customField){
					
					if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){
	
						klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]
	
					}else{

						if (customField && customField.nsid == "displayname"){
							klaviyoObject[customField.klaviyokey] = line.item.displayname
						}else{
							klaviyoObject[customField.klaviyokey] = line.item.extras[customField.nsid]
						}
						
					}
					
				})
			}catch(e){
				console.log("Impossible to add custom fields");
				console.log(JSON.stringify(e))
			}
        },


        sendAddLineEvent:  function(cart,environment_component){

			var self = this;



			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);

			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {


					var klaviyoObject = {};


					var session = environment_component.getSession()

					// ---------------------------
					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
					// ---------------------------
					// Currency
					// ---------------------------
					var currency_code = session.currency.code;
					var currency_name = session.currency.currencyname
					var currency_symbol = session.currency.symbol
					

					klaviyoObject["currency_code"] = currency_code;
					klaviyoObject["currency_name"] = currency_name;
					klaviyoObject["currency_symbol"] = currency_symbol;
					
					// ---------------------------
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;

					

					var Items = [];
				
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						
						var matrixParent = line.item.extras.matrix_parent;

						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine)


						// Handle Images
						
						if (matrixParent){

							var allImages = self.getParentImages(matrixParent.itemimages_detail);

							var matrixOptionValues = [];
							_.each(line.options,function(option){
								if (option && option.isMatrixDimension && option.value)
									matrixOptionValues.push(option.value.label)
							})

							
							
							var mainImage
							// Now we only have to pick the Image from the entire list of images
							for (var i=0 ; i< allImages.length; i++){
								var allCheck = true;
								for (var j = 0; j < matrixOptionValues.length; j++){
									if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
										
										
									}else{
										allCheck = false;
									}
								}

								if (allCheck){
									mainImage = allImages[i]
								}


							}
							
		
							if (mainImage){
								Items[lineIndex]["ImageURL"] = mainImage
							}else{
								// If we didn't found the image, we assign the first that we can
								if (allImages && allImages.length > 0)
									Items[lineIndex]["ImageURL"] = allImages[0];
		
							}
						}

						// End Handle Images

					})
	
					

					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					
					// Add new Line row
					// Not necessary
					// if (lines && lines.length > 0){
					// 	klaviyoObject["AddedItemProductName"] = lines[0].item.extras.keyMapping_name;
					// 	klaviyoObject["AddedItemProductID"] = lines[0].item.itemid;
					// 	klaviyoObject["AddedItemSKU"] = lines[0].item.extras.keyMapping_sku;
					// 	klaviyoObject["AddedItemImageURL"] = lines[0].item.extras.keyMapping_images.length > 0 ?lines[0].item.extras.keyMapping_images[0].url:"";
					// 	klaviyoObject["AddedItemURL"] = lines[0].item.extras.keyMapping_url;
					// 	klaviyoObject["AddedItemPrice"] = lines[0].rate;
					// 	klaviyoObject["AddedItemQuantity"] = lines[0].quantity;
					// }
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;
	
	
					cart.getSummary().then(function(summary) {
	
						
	
						klaviyoObject["$value"] = summary.subtotal;
	
	
	
						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},

        sendUpdateLineEvent:  function(cart,environment_component){

			var self = this;
		

			setTimeout(function(){
				
				isCartUpdateInProgress = false
			 }, 3000);


			 
			 if (!isCartUpdateInProgress){
				isCartUpdateInProgress = true;

				cart.getLines().then(function(lines) {

					var klaviyoObject = {};

					var session = environment_component.getSession()

					// SiteID and Domain
					// ---------------------------
					var siteId = environment_component.getConfig("siteSettings.siteid");
					var domain = location.protocol + "//" + location.host;
					
					klaviyoObject["site_id"] = siteId;
					klaviyoObject["domain"] = domain;
                
					// ---------------------------
					// Currency
					// ---------------------------
					var currency_code = session.currency.code;
					var currency_name = session.currency.currencyname
					var currency_symbol = session.currency.symbol
					

					klaviyoObject["currency_code"] = currency_code;
					klaviyoObject["currency_name"] = currency_name;
					klaviyoObject["currency_symbol"] = currency_symbol;
					
					// ---------------------------
					// Language
					// ---------------------------
					var language_name = session.language.name;
					klaviyoObject["language_name"] = language_name;



					var Items = [];

					
					
					_.each(lines,function(line,lineIndex){

						var dataLine = {
							"ProductID" : line.item.internalid,
							"SKU": line.item.extras.keyMapping_sku,
							"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
							"Quantity":line.quantity,
							"ItemPrice":line.rate,
							"RowTotal":line.amount,
							"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
							"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
						}
						
						var matrixParent = line.item.extras.matrix_parent;


						self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)
						Items.push(dataLine);


						// Handle Images
						
						if (matrixParent){

							var allImages = self.getParentImages(matrixParent.itemimages_detail)

							var matrixOptionValues = [];
							_.each(line.options,function(option){
								if (option && option.isMatrixDimension && option.value)
									matrixOptionValues.push(option.value.label)
							})

							
							
							var mainImage
							// Now we only have to pick the Image from the entire list of images
							for (var i=0 ; i< allImages.length; i++){
								var allCheck = true;
								for (var j = 0; j < matrixOptionValues.length; j++){
									if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
										
										
									}else{
										allCheck = false;
									}
								}

								if (allCheck){
									mainImage = allImages[i]
								}


							}
							
		
							if (mainImage){
								Items[lineIndex]["ImageURL"] = mainImage
							}else{
								// If we didn't found the image, we assign the first that we can
								if (allImages && allImages.length > 0)
									Items[lineIndex]["ImageURL"] = allImages[0];
		
							}
						}

						// End Handle Images

					})
				
					var ItemNames = _.map(Items,function(item){
						return item["ProductName"]
					})
	
					klaviyoObject["ItemNames"] = ItemNames;
					klaviyoObject["Items"] = Items;



					
					
	
	
					cart.getSummary().then(function(summary) {
	
						klaviyoObject["$value"] = summary.subtotal;
	

						var addedToCartEventData = {
							'event':'klaviyoAddedToCart',
							'klaviyo_data': klaviyoObject
						};
						window["dataLayer"].push(addedToCartEventData);
	
					});

				});



			 }
			 
			 
		},



    }

	return KlaviyoCartSync;
});



define('Tavano.Klaviyo.ProductView.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProductViewSync = {


        addPossiblePriceLevels: function(line,session,klaviyoObject){

            for (var i=1; i < 50; i++ ){

                var priceLevel = line.item["pricelevel" + i];
                var priceLevelFormatted = line.item["pricelevel" + i + "_formatted"];

                if (priceLevel && priceLevelFormatted){
                    klaviyoObject["pricelevel" + i] = priceLevel;
                    klaviyoObject["pricelevel" + i + "_formatted"] = priceLevelFormatted;

                    // Adding the price level assigned to the customer in a new variable
                    // if ( i.toString() == session.priceLevel ){
                    //     klaviyoObject["PriceForCustomer"] = priceLevel;
                    //     klaviyoObject["PriceForCustomer_formatted"] = priceLevelFormatted;
                    // }
                }
                
            }
        },


        addCustomFields : function(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixChild){
            
            var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];

            _.each(customFields,function(customField){
                if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){

                    klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]

                }else{
                    klaviyoObject[customField.klaviyokey] = itemToSend[customField.nsid]
                }
                
            })

        },
        
        sendProductDetailsInfo : function(pdp,environment_component,klaviyoObject){
            
            var line = pdp.getItemInfo();

            if (!line)
                return
            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;

            
            
            if (line){

                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var parentItem = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })

                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                
                

                // storedisplayname || storedisplayname2 || displayname
                var klaviyoObject = {
                    "ProductName": itemToSend.displayname || itemToSend.storedisplayname || itemToSend.storedisplayname2 ,
                    "ProductID" : itemToSend.internalid,
                    "SKU": itemToSend.keyMapping_sku,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "URL":location.href,
                    "Price":itemToSend.keyMapping_price,
                    // "CompareAtPrice": line.item.keyMapping_comparePriceAgainst
                    
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);

                // Sending always all the images available in custom attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }
                


                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }
                

                var session = environment_component.getSession()

                // ---------------------------
                // SiteID and Domain
                // ---------------------------
                var siteId = environment_component.getConfig("siteSettings.siteid");
                var domain = location.protocol + "//" + location.host;

                klaviyoObject["site_id"] = siteId;
                klaviyoObject["domain"] = domain;
                
                // ---------------------------
                // Currency
                // ---------------------------
                var currency_code = session.currency.code;
                var currency_name = session.currency.currencyname
                var currency_symbol = session.currency.symbol
                

                klaviyoObject["currency_code"] = currency_code;
                klaviyoObject["currency_name"] = currency_name;
                klaviyoObject["currency_symbol"] = currency_symbol;
                
                // ---------------------------
                // Language
                // ---------------------------
                var language_name = session.language.name;
                klaviyoObject["language_name"] = language_name;

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------
                var price_levelInternalId = session.priceLevel;

                klaviyoObject["pricelevelID"] = price_levelInternalId;

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);
                


                var eventData = {
                    'event':'klaviyoProductViewed',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        },
        sendViewedItem : function(pdp,environment_component){
            var line = pdp.getItemInfo();
            var parentItem = line;
            
            if (!line)
                return

            var isMatrixItem = pdp.getAllMatrixChilds().length > 0;
            var isSelectionComplete = pdp.getSelectedMatrixChilds().length == 1;
            

            
            
            if (line){


                var categories ;
                var allImages = [];
                var itemToSend = line.item;
                var multiImageOptionValues = [];

                if (line.item.commercecategory && line.item.commercecategory.categories && line.item.commercecategory.categories.length > 0){
                    categories = _.map(line.item.commercecategory.categories,function(category){
                        return category.name
                    })
                }

                var allImages = _.map(line.item.keyMapping_images,function(image){
                    return image.url
                })


                // If the item is matrix, we use that info instead of the parent info
                if (isMatrixItem && isSelectionComplete){
                    itemToSend = pdp.getSelectedMatrixChilds()[0];
                }
                var klaviyoObject = {
                    "Title": itemToSend.itemid,
                    "ItemId": itemToSend.internalid,
                    "ImageURL":itemToSend.keyMapping_images.length > 0 ?itemToSend.keyMapping_images[0].url:"",
                    "Metadata": {
                        "Price": itemToSend.keyMapping_price,
                        // "CompareAtPrice": itemToSend.keyMapping_comparePriceAgainst
                    }
                };

                this.addCustomFields(itemToSend,parentItem,environment_component,klaviyoObject,isMatrixItem);


                // Sending always all the images available in custome attributes
                // IMG_1 to IMG_N
                _.each(allImages,function(image,i){
                    klaviyoObject["IMG_" + (i + 1).toString()] = image;
                    
                })

                // If it's a child Item, we have to modify the primary Image
                if (isMatrixItem && isSelectionComplete){
                    var multiImageOptions = environment_component.getConfig("tavanoKlaviyo").itemOptions;
                    
                    
                    _.each(multiImageOptions,function(multiImageOption){
                        multiImageOptionValues.push(itemToSend[multiImageOption])
                    })
                    // Remove empty parameters
                    multiImageOptionValues = _.filter(multiImageOptionValues,function(value){return value});
                    var mainImage
                    // Now we only have to pick the Image from the entire list of images
                    for (var i=0 ; i< allImages.length; i++){
                        var allCheck = true;
                        for (var j = 0; j < multiImageOptionValues.length; j++){
                            if (allImages[i] && allImages[i].toLowerCase().indexOf(multiImageOptionValues[j].toLowerCase())!= -1){
                                // mainImage = allImages[i];
                                
                            }else{
                                allCheck = false;
                            }
                        }

                        if (allCheck){
                            mainImage = allImages[i]
                        }
                    }

                    if (mainImage){
                        klaviyoObject["ImageURL"] = mainImage;
                    }else{
                        // If we didn't found the image, we assign the first that we can
                        if (allImages && allImages.length > 0)
                            klaviyoObject["ImageURL"] = allImages[0];

                    }
                }

                if (categories && categories.length > 0){
                    klaviyoObject["Categories"] = categories
                }

                var session = environment_component.getSession()
                
                // ---------------------------
                // Currency
                // ---------------------------
                var currency_code = session.currency.code;
                var currency_name = session.currency.currencyname
                var currency_symbol = session.currency.symbol
                

                klaviyoObject["currency_code"] = currency_code;
                klaviyoObject["currency_name"] = currency_name;
                klaviyoObject["currency_symbol"] = currency_symbol;
                
                // ---------------------------
                // Language
                // ---------------------------
                var language_name = session.language.name;
                klaviyoObject["language_name"] = language_name;

                // ---------------------------
                // Assigned Price Level ID
                // ---------------------------

                var price_levelInternalId = session.priceLevel;
                klaviyoObject["pricelevelID"] = price_levelInternalId;
                

                // ---------------------------
                // Add possible price level
                // ---------------------------
                this.addPossiblePriceLevels(line,session,klaviyoObject);

                var eventData = {
                    'event':'klaviyoViewedItem',
                    'klaviyo_data': klaviyoObject
                };

                window["dataLayer"].push(eventData);
            }
        }
    }

	return TavanoKlaviyoProductViewSync;
});



define('Tavano.Klaviyo.LoaderSync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoLoaderSync = {
        
        addLoader : function(){
            
            
            var loadScriptEventData = {
                'event':'klaviyoLoadScript',
                'klaviyo_data': {}
            };
            !window.loaderCompleted && window["dataLayer"].push(loadScriptEventData);
            window.loaderCompleted = true;

            Backbone.trigger("KlaviyoLoaderCompleted")
            
        }
    }

	return TavanoKlaviyoLoaderSync;
});



define('Tavano.Klaviyo.Checkout.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoCheckoutSync = {




		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},
        
        sendCheckoutInfo: function(cart,environment_component){

			var self = this;

			var session = environment_component.getSession()
			

			var klaviyoObject = {};
			
			// ---------------------------
			// Currency
			// ---------------------------
			var currency_code = session.currency.code;
			var currency_name = session.currency.currencyname
			var currency_symbol = session.currency.symbol
			

			klaviyoObject["currency_code"] = currency_code;
			klaviyoObject["currency_name"] = currency_name;
			klaviyoObject["currency_symbol"] = currency_symbol;


			// ---------------------------
			// SiteID and Domain
			// ---------------------------
			var siteId = environment_component.getConfig("siteSettings.siteid");
			var domain = location.protocol + "//" + location.host;
			
			klaviyoObject["site_id"] = siteId;
			klaviyoObject["domain"] = domain;
			
			// ---------------------------
			// Language
			// ---------------------------
			var language_name = session.language.name;

			klaviyoObject["language_name"] = language_name;

			cart.getSummary().then(function(summary) {

				klaviyoObject["$event_id"] = Date.now().toString();
				klaviyoObject["$value"] = summary.total;
				klaviyoObject["items_subtotal"] = summary.subtotal;
				klaviyoObject["$CheckoutURL"] = location.href;
				
			});

			

			cart.getLines().then(function(lines) {


				var Items = [];
				
				_.each(lines,function(line,lineIndex){

					Items.push({
						"ProductID" : line.item.itemid,
						"SKU": line.item.extras.keyMapping_sku,
						"ProductName": line.item.itemid,
						"Quantity":line.quantity,
						"ItemPrice":line.rate,
						"RowTotal":line.amount,
						"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
						"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
					})


					// Handle Images

					var matrixParent = line.item.extras.matrix_parent;
					
					if (matrixParent){

						// In this case the all images are related to the child
						// var allImages = _.map(line.item.extras.keyMapping_images,function(image){
						// 	return image.url
						// })
						

						var allImages = self.getParentImages(matrixParent.itemimages_detail)

						var matrixOptionValues = [];
						_.each(line.options,function(option){
							if (option && option.isMatrixDimension && option.value)
								matrixOptionValues.push(option.value.label)
						})

						
						
						var mainImage
						// Now we only have to pick the Image from the entire list of images
						for (var i=0 ; i< allImages.length; i++){
							var allCheck = true;
							for (var j = 0; j < matrixOptionValues.length; j++){
								if (allImages[i] && allImages[i].toLowerCase().indexOf(matrixOptionValues[j].toLowerCase())!= -1){
									
									
								}else{
									allCheck = false;
								}
							}

							if (allCheck){
								mainImage = allImages[i]
							}


						}
						
	
						if (mainImage){
							Items[lineIndex]["ImageURL"] = mainImage
						}else{
							// If we didn't found the image, we assign the first that we can
							if (allImages && allImages.length > 0)
								Items[lineIndex]["ImageURL"] = allImages[0];
	
						}
					}

					// End Handle Images

				})

				var ItemNames = _.map(lines,function(line){
					return line.item.itemid
				})

				klaviyoObject["ItemNames"] = ItemNames;
				klaviyoObject["Items"] = Items;

				var eventData = {
					'event':'klaviyoStartedCheckout',
					'klaviyo_data': klaviyoObject
				};


				
				!window.checkoutStarted && window["dataLayer"].push(eventData);
				window.checkoutStarted = true;
				


			});

        }
       
    }

	return TavanoKlaviyoCheckoutSync;
});



define('Tavano.Klaviyo.Order.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoOrderSync = {
        
        sendOrderDetailsInfo : function(cart,userprofilecomponent){

            self.cart = cart;

            if (cart){

                cart.on("beforeSubmit",function(data){

                    // Pre-save the following information
                    // Shipping Address
                    // Billing Address
                    // Customer Information

                    userprofilecomponent.getUserProfile().then(function(profile) {
                        
                        var profile = {
                            "$email": profile.email,
                            "$first_name": profile.firstname,
                            "$last_name": profile.lastname,
                            "$phone_number": profile.phoneinfo ? profile.phoneinfo.phone : "",
                            "$address1": profile.addresses.length > 0 ? profile.addresses[0].addr1 : "",
                            "$address2": profile.addresses.length > 0 ? profile.addresses[0].addr2 : "",
                            "$city": profile.addresses.length > 0 ? profile.addresses[0].city : "",
                            "$zip": profile.addresses.length > 0 ? profile.addresses[0].zip : "",
                            "$region":profile.addresses.length > 0 ? profile.addresses[0].state : "",
                            "$country": profile.addresses.length > 0 ? profile.addresses[0].country : "",
                        }

                        sessionStorage.setItem('customer_properties', JSON.stringify(profile));    
                        
                    });


                    self.cart.getShipAddress().then(function(shippingAddress) {
                        sessionStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));    
                    })

                    self.cart.getBillAddress().then(function(billingAddress) {
                        sessionStorage.setItem('billingAddress', JSON.stringify(billingAddress));    
                    })



                    cart.getLines().then(function(lines) {

                        

                        var Items = _.map(lines,function(line){
                            return {
                                "ProductID" : line.item.itemid,
                                "SKU": line.item.extras.keyMapping_sku,
                                "ProductName": line.item.extras.keyMapping_name,
                                "Quantity":line.quantity,
                                "ItemPrice":line.rate,
                                "RowTotal":line.amount,
                                "ProductURL":line.item.extras.keyMapping_url,
                                "ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
                            }
                        })
        
                        var ItemNames = _.map(lines,function(line){
                            return line.item.extras.keyMapping_name
                        })

                        sessionStorage.setItem('ItemNames', JSON.stringify(ItemNames));    

                        sessionStorage.setItem('Items', JSON.stringify(Items));    



                        
                    })

                })
    
                cart.on("afterSubmit",function(data){

                    
                    
                    var klaviyoObject = {};


                    klaviyoObject["$value"] = data.confirmation.summary.total;
                    klaviyoObject["OrderId"] = data.confirmation.tranid;

                    if (data.promocodes && data.promocodes.length > 0){

                        klaviyoObject["DiscountCode"] = "";
                        klaviyoObject["DiscountValue"] = data.confirmation.summary.extras.discounttotal_formatted;
                    }

                    
        
                    // Adding Shipping and Billing Addresses

                    var billingAddress = JSON.parse(sessionStorage.getItem('billingAddress'));
                    var shippingAddress = JSON.parse(sessionStorage.getItem('shippingAddress'));
                    var customer_properties = JSON.parse(sessionStorage.getItem('customer_properties'));
                    var Items = JSON.parse(sessionStorage.getItem('Items'));
                    var ItemNames = JSON.parse(sessionStorage.getItem('ItemNames'));


                    klaviyoObject["ItemNames"] = ItemNames;
                    klaviyoObject["Items"] = Items;
                    

                    klaviyoObject["BillingAddress"] = {

                        "FirstName": billingAddress.fullname,
                        "LastName": billingAddress.fullname,
                        "Company": billingAddress.company,
                        "Address1": billingAddress.addr1,
                        "Address2": billingAddress.addr2,
                        "City": billingAddress.city,
                        "Region": billingAddress.state,
                        "RegionCode":billingAddress.state,
                        "Country": billingAddress.country,
                        "CountryCode": billingAddress.country,
                        "Zip": billingAddress.zip,
                        "Phone": billingAddress.phone,
                    };

                    klaviyoObject["ShippingAddress"] = {
                        
                        "FirstName": shippingAddress.fullname,
                        "LastName": shippingAddress.fullname,
                        "Company": shippingAddress.company,
                        "Address1": shippingAddress.addr1,
                        "Address2": shippingAddress.addr2,
                        "City": shippingAddress.city,
                        "Region": shippingAddress.state,
                        "RegionCode":shippingAddress.state,
                        "Country": shippingAddress.country,
                        "CountryCode": shippingAddress.country,
                        "Zip": shippingAddress.zip,
                        "Phone": shippingAddress.phone,
                    };



                    // Not necessary
                    // klaviyoObject["customer_properties"] = customer_properties;

                    var addedToCartEventData = {
                        'event':'klaviyoPlacedOrder',
                        'klaviyo_data': klaviyoObject
                    };
                    // window["dataLayer"].push(addedToCartEventData);


                })

            }
        }
    }

	return TavanoKlaviyoOrderSync;
});



define('Tavano.Klaviyo.Profile.Sync'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProfileSync = {
        
        addProfile : function(profile,environment_component){
            
            if ( profile && profile.isloggedin){


                var session = environment_component.getSession()

                var price_levelInternalId = session.priceLevel;

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname,
                        "pricelevelID" : price_levelInternalId
    
                    }
                };
                
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
        },
        addProfileFromService : function(profile){

            // If it's logged in
            if (profile && profile.email){

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname
                    }
                };
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
            
        }
    }

	return TavanoKlaviyoProfileSync;
});


define('Tavano.Klaviyo.AddOrderSource.Checkout'
, [
    'Tavano.Klaviyo.OrderSource.View'
  ]
,   function
  (
    TavanoKlaviyoOrderSourceView
  )
{
  'use strict';


  var TavanoKlaviyoAddOrderSource = {

    addOrderSourceModule : function(checkout,environment_component){

        // // ----------------------------------------
        // // Add source origin to environment
        // // We allow up to 5 sites
        // // ----------------------------------------


        // var siteSource = environment_component.getConfig('Klaviyo.websource');
        
        
        

        // if (siteSource && siteSource.length > 0) 
        //     siteSource = siteSource[0]

        // var siteSourceValue;

        // switch(siteSource) {
        //     case "Site A":
        //         siteSourceValue = "1";
        //       break;
        //       case "Site B":
        //         siteSourceValue = "2";
        //       break;
        //       case "Site C":
        //         siteSourceValue = "3";
        //       break;
        //       case "Site D":
        //         siteSourceValue = "4";
        //       break;
        //       case "Site E":
        //         siteSourceValue = "5";
        //       break;
        //     default:
        //         siteSourceValue = "1";
        //   }

        // window.siteSource = siteSourceValue;


        // try{

        //     checkout.addModuleToStep(
        //         {
        //             step_url: 'opc'
        //             , module: {
        //                 id: 'TavanoKlaviyoOrderSourceView'
        //                 , index: 6
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });
        
        //         checkout.addModuleToStep(
        //         {
        //             step_url: 'review'
        //             , module: {
        //                 id: 'Tavano.KlaviyoOrderSourceView'
        //                 , index: 99
        //                 , classname: 'Tavano.Klaviyo.OrderSource.View'
        //             }
        //         });

        // }catch(e){

        // }
    }
 }


  return TavanoKlaviyoAddOrderSource

});





define('Tavano.Klaviyo.Checkout.Sync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoCheckoutSync = {




		getParentImages : function(parentImages){

			var finalImagesProcessed = [];

			for (var prop in parentImages) {
				if (Object.prototype.hasOwnProperty.call(parentImages, prop)) {
					

					// Level 2

					for (var propLevel2 in parentImages[prop]) {
						if (Object.prototype.hasOwnProperty.call(parentImages[prop], propLevel2)) {
							
							if (propLevel2 == "url"){
								finalImagesProcessed.push(parentImages[prop][propLevel2])
								
							}else{


								// Level 3

								for (var propLevel3 in parentImages[prop][propLevel2]) {
								if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2], propLevel3)) {
									
									if (propLevel3 == "url"){

										finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3])
										
										}else{

											// Level 4

											for (var propLevel4 in parentImages[prop][propLevel2][propLevel3]) {
											if (Object.prototype.hasOwnProperty.call(parentImages[prop][propLevel2][propLevel3], propLevel4)) {
												
												if (propLevel4 == "url"){

													finalImagesProcessed.push(parentImages[prop][propLevel2][propLevel3][propLevel4])
													
													}else{
														// Add more levels nestede here

													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}


			return finalImagesProcessed;



		},

		addCustomFields : function(line,parentItem,environment_component,klaviyoObject,isMatrixChild){

			
			try{
				var customFields = environment_component.getConfig("tavanoKlaviyo").columns.customFields || [];

				_.each(customFields,function(customField){
					if (isMatrixChild && customField.nsidparent && customField.nsidparent != ""){
	
						klaviyoObject[customField.klaviyokey] = parentItem[customField.nsidparent]
	
					}else{
						
						if (customField && customField.nsid == "displayname"){
							klaviyoObject[customField.klaviyokey] = line.item.displayname
						}else{
							klaviyoObject[customField.klaviyokey] = line.item.extras[customField.nsid]
						}

					}
					
				})
			}catch(e){
				console.log("Impossible to add custom fields");
				console.log(JSON.stringify(e))
			}
        },
        
        sendCheckoutInfo: function(cart,environment_component){

			var self = this;

			var session = environment_component.getSession()
			

			var klaviyoObject = {};
			
			// ---------------------------
			// Currency
			// ---------------------------
			var currency_code = session.currency.code;
			var currency_name = session.currency.currencyname
			var currency_symbol = session.currency.symbol
			

			klaviyoObject["currency_code"] = currency_code;
			klaviyoObject["currency_name"] = currency_name;
			klaviyoObject["currency_symbol"] = currency_symbol;


			// ---------------------------
			// SiteID and Domain
			// ---------------------------
			var siteId = environment_component.getConfig("siteSettings.siteid");
			var domain = location.protocol + "//" + location.host;
			
			klaviyoObject["site_id"] = siteId;
			klaviyoObject["domain"] = domain;
			
			// ---------------------------
			// Language
			// ---------------------------
			var language_name = session.language.name;

			klaviyoObject["language_name"] = language_name;

			cart.getSummary().then(function(summary) {

				klaviyoObject["$event_id"] = Date.now().toString();
				klaviyoObject["$value"] = summary.total;
				klaviyoObject["items_subtotal"] = summary.subtotal;
				klaviyoObject["$CheckoutURL"] = location.href;
				
			});

			

			cart.getLines().then(function(lines) {


				var Items = [];
				
				_.each(lines,function(line,lineIndex){

					var dataLine = {
						"ProductID" : line.item.internalid,
						"SKU": line.item.extras.keyMapping_sku,
						"ProductName": line.item.extras.displayname || line.item.extras.storedisplayname || line.item.extras.storedisplayname2,
						"Quantity":line.quantity,
						"ItemPrice":line.rate,
						"RowTotal":line.amount,
						"ProductURL":klaviyoObject["domain"] + line.item.extras.keyMapping_url,
						"ImageURL":line.item.extras.keyMapping_images.length > 0 ?line.item.extras.keyMapping_images[0].url:"",
					}
					
					// Handle Images

					var matrixParent = line.item.extras.matrix_parent;
					
					self.addCustomFields(line,matrixParent,environment_component,dataLine,matrixParent)

					Items.push(dataLine)
					
					if (matrixParent){

						// In this case the all images are related to the child
						// var allImages = _.map(line.item.extras.keyMapping_images,function(image){
						// 	return image.url
						// })
						

						var allImages = self.getParentImages(matrixParent.itemimages_detail)

						var matrixOptionValues = [];
						_.each(line.options,function(option){
							if (option && option.isMatrixDimension && option.value)
								matrixOptionValues.push(option.value.label)
						})

						
						
						var mainImage
						// Now we only have to pick the Image from the entire list of images
						for (var i=0 ; i< allImages.length; i++){
							var allCheck = true;
							for (var j = 0; j < matrixOptionValues.length; j++){
								if (allImages[i].indexOf(matrixOptionValues[j])!= -1){
									
									
								}else{
									allCheck = false;
								}
							}

							if (allCheck){
								mainImage = allImages[i]
							}


						}
						
	
						if (mainImage){
							Items[lineIndex]["ImageURL"] = mainImage
						}else{
							// If we didn't found the image, we assign the first that we can
							if (allImages && allImages.length > 0)
								Items[lineIndex]["ImageURL"] = allImages[0];
	
						}
					}

					// End Handle Images

				})

				var ItemNames = _.map(Items,function(item){
					return item["ProductName"]
				})

				klaviyoObject["ItemNames"] = ItemNames;
				klaviyoObject["Items"] = Items;

				var eventData = {
					'event':'klaviyoStartedCheckout',
					'klaviyo_data': klaviyoObject
				};


				
				!window.checkoutStarted && window["dataLayer"].push(eventData);
				window.checkoutStarted = true;
				


			});

        }
       
    }

	return TavanoKlaviyoCheckoutSync;
});



define(
	'Tavano.Klaviyo.Klaviyo.Checkout'
,   [
		
		
		'Tavano.Klaviyo.LoaderSync.Checkout',
		'Tavano.Klaviyo.Checkout.Sync.Checkout',
		
		'Tavano.Klaviyo.Profile.Sync.Checkout',
		'Tavano.Klaviyo.AddOrderSource.Checkout',
		'Tavano.Klaviyo.Checkout.Profile.Model'
		
	]
,   function (
		
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoCheckoutSync,
		
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoAddOrderSourceCheckout,
		TavanoKlaviyoCheckoutProfileModel
		
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{
			

			var userprofilecomponent = container.getComponent("UserProfile");
			var checkout = container.getComponent('Checkout');
			var cart = container.getComponent('Cart');
			var environment_component = container.getComponent("Environment");



			// ---------------------
			// Order Source
			// ---------------------
			
			TavanoKlaviyoAddOrderSourceCheckout.addOrderSourceModule(checkout,environment_component)



			// Manage Guest Checkout
			// Manage Login/Register
			checkout && checkout.on("afterShowContent", function() {


				if (userprofilecomponent){

					userprofilecomponent.getUserProfile().then(function(profile) {
					

						if (!window.isProfileLoaded && profile && profile.isloggedin){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					});

				}else{

					// We might be in a version with no support for UserProfile Component
					var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
					klaviyoProfileModel.fetch().done(function(result){


						
						if (!window.isProfileLoaded && result && result.email){
							TavanoKlaviyoLoaderSync.addLoader()
						}
					})

				}

			})

			
			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					

					
					if (userprofilecomponent){

						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && profile && profile.isloggedin){

								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
								
							}

						});

					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoCheckoutProfileModel();
						klaviyoProfileModel.fetch().done(function(result){


							TavanoKlaviyoProfileSync.addProfileFromService(result);


							// ---------------------
							// Checkout Started
							// ---------------------
							
							
							if (checkout && result && result.email){
								
								setTimeout(function(){
									TavanoKlaviyoCheckoutSync.sendCheckoutInfo(cart,environment_component)
								}, 2000);
								
							}


						})
					}

					
				}, 2000);

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});



define('Tavano.Klaviyo.LoaderSync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoLoaderSync = {
        
        addLoader : function(){
            
            
            var loadScriptEventData = {
                'event':'klaviyoLoadScript',
                'klaviyo_data': {}
            };
            !window.loaderCompleted && window["dataLayer"].push(loadScriptEventData);
            window.loaderCompleted = true;

            Backbone.trigger("KlaviyoLoaderCompleted")
            
        }
    }

	return TavanoKlaviyoLoaderSync;
});


define('Tavano.Klaviyo.OrderSource.View'
, [
    'Wizard.Module'

  , 'tavano_klaviyo_klaviyoordersource.tpl'
  ]
, function (
    WizardModule

  , tavano_klaviyo_klaviyoordersource
  )
{
  'use strict';

  return WizardModule.extend({

    template: tavano_klaviyo_klaviyoordersource,

   
    

   getContext: function getContext()
    {
      try{
          
        // if (this && this.model){
        //   var wizardModule = this.model;
        //   var options = wizardModule.get('options');
          

        //   options.custbody_tt_klaviyo_order_source = window.siteSource;

        //   wizardModule.set('options',options);
        // }
          
      }catch(e){
          // console.log("Klaviyo Error trying to set order source: ");
          console.log(e);
      }
        
      return {};
    }
  });
});



define('Tavano.Klaviyo.Profile.Sync.Checkout'
,	[
]
,	function (
	
	)
{
    'use strict';
    

	var TavanoKlaviyoProfileSync = {
        
        addProfile : function(profile,environment_component){
            
            if ( profile && profile.isloggedin){


                var session = environment_component.getSession()

                var price_levelInternalId = session.priceLevel;

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname,
                        "pricelevelID" : price_levelInternalId
    
                    }
                };
                
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
        },
        addProfileFromService : function(profile){

            // If it's logged in
            if (profile && profile.email){

                var loadScriptEventData = {
                    'event':'klaviyoLoadProfile',
                    'klaviyo_profile_data': {
                        "$email" : profile.email,
                        "$first_name" : profile.firstname,
                        "$last_name" : profile.lastname
                    }
                };
                
                !window.isProfileLoaded && window["dataLayer"].push(loadScriptEventData);
                window.isProfileLoaded = true;
            }
            
        }
    }

	return TavanoKlaviyoProfileSync;
});


// @module Tavano.Klaviyo.Profile.Model
define(
	'Tavano.Klaviyo.Profile.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	,	Utils
	)
{
  return Backbone.Model.extend({

    url: function url ()
    {
      // var url = _.getAbsoluteUrl(getExtensionAssetsPath('services/QuestionsAndAnswers.Service.ss'));
        var urlRoot = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
							"services/KlaviyoProfile.Service.ss"
					)
			)

      return urlRoot;
    }
  })


});


// @module Tavano.Klaviyo.Checkout.Profile.Model
define(
	'Tavano.Klaviyo.Checkout.Profile.Model'
,	[
		'Backbone'
	,	'underscore'
	,	'Utils'
	]
,	function (
		Backbone
	,	_
	,	Utils
	)
{
  return Backbone.Model.extend({

    url: function url ()
    {
      // var url = _.getAbsoluteUrl(getExtensionAssetsPath('services/QuestionsAndAnswers.Service.ss'));
        var urlRoot = Utils.getAbsoluteUrl(
					getExtensionAssetsPath(
							"services/KlaviyoProfile.Service.ss"
					)
			)

      return urlRoot;
    }
  })


});


// Model.js
// -----------------------
// @module Case
define("Tavano.Klaviyo.KlaviyoProfile.Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/KlaviyoProfile.Service.ss"
            )
        )
        
});
});



define(
	'Tavano.Klaviyo.Klaviyo'
,   [
		'Tavano.Klaviyo.Cart.Sync',
		'Tavano.Klaviyo.ProductView.Sync',
		'Tavano.Klaviyo.LoaderSync',
		'Tavano.Klaviyo.Order.Sync',
		'Tavano.Klaviyo.Profile.Sync',
		'Tavano.Klaviyo.Profile.Model'
	]
,   function (
		TavanoKlaviyoCartSync,
		TavanoKlaviyoProductViewSync,
		TavanoKlaviyoLoaderSync,
		TavanoKlaviyoOrderSync,
		TavanoKlaviyoProfileSync,
		TavanoKlaviyoProfileModel
		
	)
{
	'use strict';



	return  {

		

	mountToApp: function mountToApp (container)
		{

			var registerEvent = true;

			if (SC.isPageGenerator())
				return
			

			var userprofilecomponent = container.getComponent("UserProfile");
			
			var cart = container.getComponent('Cart');
			var pdp = container.getComponent('PDP');
			var layout = container.getComponent('Layout');
			
			
			var environment_component = container.getComponent("Environment");


			// ---------------------
			// Order Submission
			// ---------------------
			TavanoKlaviyoOrderSync.sendOrderDetailsInfo(cart,userprofilecomponent)


			// ---------------------
			// Add To Cart
			// ---------------------
			
			cart.on("afterAddLine",function(){
				TavanoKlaviyoCartSync.sendAddLineEvent(cart,environment_component)
			})


			// ---------------------
			// Update Line
			// ---------------------
			
			cart.on("afterUpdateLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})

			// ---------------------
			// Remove Line
			// ---------------------
			
			cart.on("afterRemoveLine",function(){
				TavanoKlaviyoCartSync.sendUpdateLineEvent(cart,environment_component)
			})


			Backbone.on("KlaviyoLoaderCompleted",function(){

			

				setTimeout(function(){

					
					

					if (userprofilecomponent){
						// Add Profile
						userprofilecomponent.getUserProfile().then(function(profile) {
							TavanoKlaviyoProfileSync.addProfile(profile,environment_component);
						});
					}else{

						// We might be in a version with no support for UserProfile Component
						var klaviyoProfileModel = new TavanoKlaviyoProfileModel();
						klaviyoProfileModel.fetch().done(function(result){
							TavanoKlaviyoProfileSync.addProfileFromService(result);
						})

					}
					
				}, 2000);

				

				layout.on('afterShowContent', function() {
					if (pdp){
						TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp,environment_component);
						TavanoKlaviyoProductViewSync.sendViewedItem(pdp,environment_component);
						if (pdp && registerEvent) {
							registerEvent = false;
							pdp.on('afterOptionSelection', _.debounce(function (event) {
								TavanoKlaviyoProductViewSync.sendProductDetailsInfo(pdp, environment_component);
								TavanoKlaviyoProductViewSync.sendViewedItem(pdp, environment_component);
								return true
							}), 200)
						}
					}
				});

			})

			// ---------------------
			// Load Script
			// ---------------------
			
			TavanoKlaviyoLoaderSync.addLoader()

		}
	};
});


};

extensions['AwaLabs.LayoutClass.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/LayoutClass/2.0.0/' + asset;
}

define("AwaLabs.LayoutClass", [
    'underscore'
], function AwaLabsLayoutClass(
    _
){
    'use strict';

    return {
        addClassToLayout: function addClassToLayout(Layout,view){
            Layout.$('#layout').removeClass().addClass(this.layoutClass).addClass('sec_'+view.template.Name);
        },
        mountToApp: function(application){
            var Layout = application.getLayout();
            var self = this;
            Layout.once('afterAppendView',function(view){
                self.layoutClass = Layout.$('#layout').attr('class');
                self.addClassToLayout(Layout,view);
                Layout.on('afterAppendView',function(view){
                    if(!view.inModal){
                        self.addClassToLayout(Layout,view);
                    }
                });
            });
        }
    }
});


};

extensions['AwaLabs.OrderStatusImprovementsHandlebarsExtras.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/OrderStatusImprovementsHandlebarsExtras/2.0.0/' + asset;
}

define('AwaLabs.OrderStatusImprovementsHandlebarsExtras', [
    'Utils',
    'Handlebars'
], function AwaLabsOrderStatusImprovementsHandlebarsExtras(
    Utils,
    Handlebars
) {
    'use strict';

    Handlebars.registerHelper('formatPriceDecimals', function formatPriceDecimals(priceString) {
        var price = (priceString && priceString[0] === '$') ? priceString.substr(1) : priceString;
        price = parseFloat(price.split(',').join('')).toFixed(2); // removed commas
        return new Handlebars.SafeString(Utils.formatCurrency(price));
    });
});


};

extensions['SuiteLabs.OuterCSS.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/OuterCSS/1.0.0/' + asset;
}

define('SuiteLabs.OuterCSS.Checkout', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSCheckout(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.checkout');
        }
    };
});


define('SuiteLabs.OuterCSS.Shopping', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSShopping(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.shopping');
        }
    };
});


define('SuiteLabs.OuterCSS.Helper', [
    'jQuery'
], function SuiteLabsOuterCSSHelper(
    jQuery
) {
    'use strict';

    return {
        appendOuterFile: function appendOuterFile(container, configKey) {
            var environment = container.getComponent('Environment');
            var element;
            var outerFile = environment ?
                environment.getConfig(configKey) :
                container.getConfig(configKey);

            if (!outerFile || (typeof outerFile !== 'string')) {
                return;
            }

            element = jQuery('link[id=outercss]');

            if (!element.length) {
                jQuery('<link id="outercss" rel="stylesheet">').attr('href', outerFile).appendTo(jQuery('head'));
            } else {
                element.attr('href', outerFile);
            }
        }
    };
});


define('SuiteLabs.OuterCSS.MyAccount', [
    'SuiteLabs.OuterCSS.Helper'
], function SuiteLabsOuterCSSMyAccount(
    Helper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            Helper.appendOuterFile(container, 'outercss.myaccount');
        }
    };
});


};

extensions['AwaLabs.PriceToggle.2.1.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/PriceToggle/2.1.1/' + asset;
}

define('PriceToggle.Item.Model', [
    'Item.Model',
    'Profile.Model',
    'Configuration',
    'Utils',
    'underscore'
], function PriceToggleItemModel(
    ItemModel,
    ProfileModel,
    Configuration,
    Utils,
    _
) {
    'use strict';

    _.extend(ItemModel.prototype, {
        priceDetailsRetail: function priceDetailsRetail() {
            var priceLevel = Configuration.get('priceTogglePriceToggle', 'pricelevel4');
            var retailPrice = this.get(priceLevel);
            var retailPriceFormatted = this.get(priceLevel + '_formatted') || (
                retailPrice ? Utils.formatCurrency(retailPrice) : ''
            );
            var result;

            if (retailPrice && retailPriceFormatted) {
                result = {
                    onlinecustomerprice: retailPrice,
                    onlinecustomerprice_formatted: retailPriceFormatted
                };
            }

            return result;
        },

        getDefaultPrice: _.wrap(ItemModel.prototype.getDefaultPrice, function getDefaultPrice(fn, detailsObject) {
            var profile = ProfileModel.getInstance();
            var retailDetailsObject;

            if (profile.get('isEnabledRetailPrices')) {
                retailDetailsObject = this.priceDetailsRetail();
            }

            return fn.apply(this, [retailDetailsObject || detailsObject]);
        })
    });
});


define('AwaLabs.PriceToggle.MyAccount', [
    'PriceToggle.Item.Model'
], function PriceToggleMyAccount() {});


};

extensions['AwaLabs.ProfileUtils.2.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/ProfileUtils/2.0.1/' + asset;
}

define('AwaLabs.ProfileUtils', [
    'Profile.Model',
    'LiveOrder.Model',
    'underscore'
], function ProfileUtils(
    ProfileModel,
    LiveOrderModel,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var profile = ProfileModel.getInstance();
            if (layout) {
                layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'showProcedToCheckoutButton', 'string', function fnAddToContext() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'useRetailPrices', 'string', function fnAddToContext() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'showProcedToCheckoutButton', 'string', function fnAddToContext() {
                    return profile.get('allowProceedToCheckout') && !profile.hidePrices();
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'useRetailPrices', 'string', function fnAddToContext() {
                    return profile.get('isEnabledRetailPrices');
                });
                layout.addToViewContextDefinition('Header.MiniCart.View', 'retailSubTotalFormatted', 'string', function fnAddToContext() {
                    var cart = LiveOrderModel.getInstance();
                    var summary = cart.get('summary');
                    return !!summary && summary.retailSubTotalFormatted;
                });
            }
        }
    }
});


};

extensions['AwaLabs.SEOImprovements.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/SEOImprovements/2.0.0/' + asset;
}

define('AwaLabs.SEOImprovements', [
], function SEOImprovements() {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var environmentComponent = application.getComponent('Environment');
            if (layout) {
                layout.addToViewContextDefinition('Header.Logo.View', 'logoUrl', 'string', function fn() {
                    return environmentComponent.getConfig('header.logoUrl');
                });
                layout.addToViewContextDefinition('Header.Logo.View', 'siteName', 'string', function fn(context) {
                    return context.headerLinkTitle || environmentComponent.getConfig('seo.siteTitle');
                });
            }
        }
    };
});


};

extensions['ACS.ShowAllTransactions.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/ShowAllTransactions/1.0.0/' + asset;
}

define('ShowAllTransactions', [], function ShowAllTransactions() {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addToViewContextDefinition('TransactionHistory.List.View', 'hasTerms', 'boolean', function hasTerms() {
                    return true;
                });
            }
        }
    };
});


};

extensions['AwaLabs.SocialMedia.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/SocialMedia/2.1.0/' + asset;
}

define('SocialMedia.View', [
    'SCView',
    'social-media.tpl'
], function SocialMediaViewModule(
    SCViewComponent,
    SocialMediaTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function SocialMediaView(options) {
        SCView.call(this);
        this.environment = options.environment;
        this.template = SocialMediaTpl;
    }

    SocialMediaView.prototype = Object.create(SCView.prototype);

    SocialMediaView.prototype.constructor = SocialMediaView;

    SocialMediaView.prototype.getContext = function getContext() {
        return {
            facebookUrl: this.environment.getConfig('socialmedia.facebookUrl'),
            linkedinUrl: this.environment.getConfig('socialmedia.linkedinUrl'),
            youtubeUrl: this.environment.getConfig('socialmedia.youtubeUrl'),
            twitterUrl: this.environment.getConfig('socialmedia.twitterUrl'),
            instagramUrl: this.environment.getConfig('socialmedia.instagramUrl'),
            googleUrl: this.environment.getConfig('socialmedia.googleUrl'),
            pinterestUrl: this.environment.getConfig('socialmedia.pinterestUrl')
        };
    };

    return SocialMediaView;
});


define('AwaLabs.SocialMedia', [
    'SocialMedia.View'
], function SocialMedia(
    SocialMediaView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(layout.ALL_VIEWS, {
                    'SocialMedia': {
                        'SocialMedia': {
                            childViewIndex: 1,
                            childViewConstructor: function socialMedia() {
                                return new SocialMediaView({
                                    environment: container.getComponent('Environment')
                                });
                            }
                        }
                    }
                });
            }
        }
    };
});


};

extensions['AwaLabs.StickyHeader.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/StickyHeader/2.0.0/' + asset;
}

define('AwaLabs.StickyHeader', [
    'Header.View',
    'Profile.Model',
    'Header.Profile.View',
    'Header.Menu.MyAccount.View',
    'Handlebars',
    'jQuery'
], function AwaLabsStickyHeader(
    HeaderView,
    ProfileModel,
    HeaderProfileView,
    HeaderMenuMyAccountView,
    Handlebars,
    jQuery
) {
    'use strict';
    return {
        mountToApp: function mountToApp(container) {
            var Layout;
            /* eslint-disable no-underscore-dangle */
            if (container.layout) {
                Layout = container.getLayout();
                /* eslint-enable no-underscore-dangle */
                Layout.once('afterAppendView', function afterAppendView() {
                    jQuery(document).on('scroll', function stickyScroll() {
                        var $headerMainNavWrapper;
                        var $headerMainWrapper;
                        if (jQuery('html').hasClass('ns_is-edit')) {
                            return;
                        }

                        $headerMainNavWrapper = Layout.$('#site-header');
                        $headerMainWrapper = Layout.$('.header-main-wrapper');

                        $headerMainWrapper.css({
                            'minHeight': $headerMainWrapper.height()
                        });


                        if (jQuery(document).scrollTop() > 0) {
                            $headerMainNavWrapper.addClass('sticky-header');
                            $headerMainNavWrapper.next().addClass('less-padding');
                        } else {
                            $headerMainNavWrapper.removeClass('sticky-header');
                            $headerMainNavWrapper.next().removeClass('less-padding');
                        }
                    });
                });
            }
        }
    };
});


};

extensions['AwaLabs.TrackingNumbers.1.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/TrackingNumbers/1.1.0/' + asset;
}

define('TrackingNumbers.OrderHistory.List.View', [
    'OrderHistory.List.View',
    'RecordViews.View',
    'underscore'
], function TrackingNumbersOrderHistoryListViewFn(
    OrderHistoryListView,
    RecordViewsView,
    _
) {
    'use strict';

    _.extend(OrderHistoryListView.prototype, {
        // eslint-disable-next-line no-underscore-dangle
        _buildResultsView: _.wrap(OrderHistoryListView.prototype._buildResultsView, function _buildResultsView(fn) {
            var resultsView = fn.apply(this, _.toArray(arguments).slice(1));

            resultsView.childView = RecordViewsView;

            return resultsView;
        })
    });
});


define('AwaLabs.TrackingNumbers', [
    'underscore',
    'TrackingNumbers.OrderHistory.List.View'
], function AwaLabsTrackingNumbers(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');

            if (layout) {
                layout.addToViewContextDefinition('OrderHistory.List.Tracking.Number.View', 'showTracking', 'boolean', function context(context) {
                    var showTracking = false;

                    if (context.trackingNumbers && context.trackingNumbers.length) {
                        showTracking = _.every(context.trackingNumbers, function everyTracking(track) {
                            return track && track.trackingNumber && track.trackingNumber.value;
                        });
                    }

                    return showTracking;
                });
            }
        }
    };
});


};

extensions['AwaLabs.Trade.2.1.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/AwaLabs/Trade/2.1.0/' + asset;
}

define('AwaLabs.Trade', [
    'Profile.Model',
    'MyAccountMenu',
    'Dialog.Service',
    'Profile.Model.HidePrices'
], function AwaLabsTrade(
    ProfileModel,
    MyAccountMenu,
    DialogService
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container, showContactAndTradingInfo) {
            var checkout = container.getComponent('Checkout');
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (checkout) {
                checkout.on('afterShowContent', function beforeShowContent() {
                    checkout.getCurrentStep().done(function getCurrentStepDone(currentStep) {
                        if (currentStep && currentStep.url === 'shipping/address' && profile && profile.get('isPendingTradeApproval')) {
                            new DialogService(container).openDialog('Pending Trade Approval - Checkout');
                        }
                    });
                });
            }

            if (layout) {
                layout.addToViewContextDefinition('Header.Menu.MyAccount.View', showContactAndTradingInfo || 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade') && (!showContactAndTradingInfo || !!profile.get('contactId'));
                });

                layout.addToViewContextDefinition('Header.Menu.View', 'isTrade', 'boolean', function fn() {
                    return profile.get('isTrade');
                });
            }

            if (!profile.get('isTrade')) {
                MyAccountMenu.getInstance().removeSubEntry('quotes');
            }
        }
    };
});


define('Profile.ManagePrice.View', [
    'GlobalViews.Message.View',

    'profile_manage_price.tpl',

    'Backbone',
    'Backbone.FormView',
    'jQuery',
    'underscore',

    'Utils'
], function ProfileManagePriceView(
    GlobalViewsMessageView,

    profileManagePriceTpl,

    Backbone,
    BackboneFormView,
    jQuery,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: profileManagePriceTpl,

        events: {
            'change [data-action="disablePrice"]': 'disablePrice',
            'change [data-action="disableRetailPrice"]': 'disableRetailPrice'
        },

        initialize: function initialize() {
            BackboneFormView.add(this);
        },

        disablePrice: function disablePrice(e, isRetailPrice) {
            var self = this;
            var element = jQuery(e.currentTarget);
            var wrapFieldset = element.closest('fieldset');
            var promise;

            e.preventDefault();
            e.stopPropagation();

            this.model.set(
                isRetailPrice ? 'retailPriceEnabled' : 'pricingDisabled',
                element.is(':checked') ? 'T' : 'F'
            );
            // diasble element during profile update
            wrapFieldset.prop('disabled', true);

            promise = this.model.save();
            promise.done(function promiseDone() {
                self.showError(_('Invalid date format.').translate());
            }).fail(function promiseFail(error) {
                self.showError(error);
            }).always(function promiseAlways() {
                wrapFieldset.prop('disabled', false);
                jQuery(window).trigger('price_change');
            });
        },

        disableRetailPrice: function disableRetailPrice(e) {
            this.disablePrice(e, true);
        },

        showSuccess: function showSuccess() {
            var globalViewMessage;

            if (this.$savingForm) {
                globalViewMessage = new GlobalViewsMessageView({
                    message: _('Price display successfully updated!').translate(),
                    type: 'success',
                    closable: true
                });
                this.showContent();
                this.$('[data-type="alert-placeholder"]').append(globalViewMessage.render().$el.html());
            }
        },

        getContext: function getContext() {
            var customFields = this.model.get('customfields');
            var priceDisabled = customFields && _.findWhere(customFields, {
                name: 'custentity_pricing_disabled'
            });
            var useRetailPriceEnabled = customFields && _.findWhere(customFields, {
                name: 'custentity_catalog_retail_price_enabled'
            });

            return {
                priceDisabled: priceDisabled && priceDisabled.value === 'T',
                useRetailPriceEnabled: useRetailPriceEnabled && useRetailPriceEnabled.value === 'T'
            };
        }
    });
});


define('Profile.Model.HidePrices', [
    'Profile.Model',
    'underscore'
], function ProfileModelHidePrices(
    ProfileModel,
    _
) {
    _.extend(ProfileModel.prototype, {
        hidePrices: _.wrap(ProfileModel.prototype.hidePrices, function hidePrices(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var customfields = this.get('customfields');
            var pricingDisabled = customfields && _.findWhere(customfields, {
                name: 'custentity_pricing_disabled'
            });
            var disabled = pricingDisabled && pricingDisabled.value === 'T';

            return disabled || ret;
        })
    });
});


define('Trade.Link.View', [
    'trade_link_view.tpl',
    'SCView',
    'Backbone'
], function TradeLinkViewModule(
    TradeLinkViewTpl,
    SCViewComponent,
    Backbone
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function TradeLinkView(options) {
        SCView.call(this);

        this.options = options || {};
        this.environment = options.environment;
        this.template = TradeLinkViewTpl;
    }

    TradeLinkView.prototype = Object.create(SCView.prototype);

    TradeLinkView.prototype.constructor = TradeLinkView;

    TradeLinkView.prototype.getEvents = function getEvents() {
        return {
            'click [data-action="trade-signin"]': 'tradeSignIn',
            'click [data-action="trade-apply"]': 'tradeApply'
        };
    };

    TradeLinkView.prototype.render = function render() {
        if (!this.options.profile || !(this.options.profile.get('isLoggedIn') === 'T')) {
            SCView.prototype.render.apply(this, arguments);
        }
    };

    TradeLinkView.prototype.tradeSignIn = function tradeSignIn() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl;
    };

    TradeLinkView.prototype.tradeApply = function tradeApply() {
        var login = this.environment.getSiteSetting('touchpoints.login');
        var loginUrl = this.generateUrl(login);

        window.location.href = loginUrl + '&fragment=register-trade';
    };

    TradeLinkView.prototype.generateUrl = function generateUrl(touchpoint) {
        var origin = this.environment.getConfig('currentTouchpoint');
        var hash = Backbone.history.fragment;
        var loginUrl = touchpoint + '&origin=' + origin + '&origin_hash=' + encodeURIComponent(hash);

        return loginUrl;
    };

    TradeLinkView.prototype.getContext = function getContext() {
        return {};
    };

    return TradeLinkView;
});


define('AwaLabs.Trade.MyAccount', [
    'AwaLabs.Trade',
    'Profile.Model',
    'Profile.ManagePrice.View',
    'Profile.Model.HidePrices'
], function AwaLabsTradeMyAccount(
    AwaLabsTrade,
    ProfileModel,
    ProfileManagePriceView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var profile = ProfileModel.getInstance();

            if (layout) {
                layout.addToViewContextDefinition('Overview.Home.View', 'isTrade', 'boolean', function isTrade() {
                    return profile.get('isTrade');
                });

                if (profile.get('isAllowPriceControl')) {
                    layout.addChildViews('Overview.Home.View', {
                        'Profile.ManagePrice': {
                            'Profile.ManagePrice': {
                                childViewConstructor: function ProfileManagePrice() {
                                    return new ProfileManagePriceView({ model: profile });
                                }
                            }
                        }
                    });
                }
            }
            AwaLabsTrade.mountToApp(container, 'showContactAndTradingInfo');
        }
    };
});


};

SC.ENVIRONMENT.EXTENSIONS_JS_MODULE_NAMES = ["CaseForm.Case.Model","CaseForm.Case.Collection","CaseForm.Case.Create.View","FileUpload.File.Collection","FileUpload.File.Model","FileUpload.File.Thumbnail.View","FileUpload.File.View","CartToQuote.RequestQuoteWizard.Module.Items","CartToQuote.RequestQuoteWizard.Module.Items.Line.Action.View","CartToQuote.RequestQuoteWizard","CartToQuote.Transaction.Line.Views.Cell.Actionable.Expanded.View","CartToQuote.MarketWizard.View","CartToQuote.ProductList.Item.Model","CartToQuote.RequestQuoteWizard.View","CartToQuote.ProductDetailToQuote.View","CartToQuote.Module.Items.Line.Quantity.View","CaseCustom.Case.List.View","Dialog.View","Dialog.Service","FavoritesList.ProductList.Utils","FavoritesList.ProductList.Details.View","Project.ProductList.Lists.View","FavoritesList.BulkActions.Extended.View","FavoritesList.AddedToCart.Improved.View","FavoritesList.ControlSingle.View","ShareFavorites.Model","FavoritesList.CartSaveForLater.View","FavoritesList.ProductList.DetailsLater.View","FavoritesList.ProductList.Control.View","FavoritesList.ProductList.DisplayFull.View","Header.MiniFavorites.View","Header.MiniFavoritesItemCell.View","Header.MiniProjects.View","Header.MiniProjectsItemCell.View","Favorites.ProductList.Details.View","FavoritesList.ProductList.Model","FavoritesList.ProductList.ControlItem.View","FavoritesList.RequestQuoteWizard.Module.Items","FooterCopyright.View","HeaderCustomizations.Header.View","HeaderCustomizations.MyAccount.Menu","Session.Message","InactivityMessage.Model","InactivityMessage.ProfileModel","ItemSearchAutoAdd.ItemSearcher.View","ItemSearchAutoAdd.QuickAdd.View","ItemSearchAutoAdd.Product.Model","Jewelry.Utils","OrderWizard.Module.Confirmation.Jewelry","Tavano.Klaviyo.Cart.Sync","Tavano.Klaviyo.ProductView.Sync","Tavano.Klaviyo.LoaderSync","Tavano.Klaviyo.Checkout.Sync","Tavano.Klaviyo.Order.Sync","Tavano.Klaviyo.Profile.Sync","Tavano.Klaviyo.AddOrderSource.Checkout","Tavano.Klaviyo.Checkout.Sync.Checkout","Tavano.Klaviyo.Klaviyo.Checkout","Tavano.Klaviyo.LoaderSync.Checkout","Tavano.Klaviyo.OrderSource.View","Tavano.Klaviyo.Profile.Sync.Checkout","Tavano.Klaviyo.Profile.Model","Tavano.Klaviyo.Checkout.Profile.Model","Tavano.Klaviyo.KlaviyoProfile.Model","SuiteLabs.OuterCSS.Checkout","SuiteLabs.OuterCSS.Shopping","SuiteLabs.OuterCSS.Helper","PriceToggle.Item.Model","SocialMedia.View","TrackingNumbers.OrderHistory.List.View","AwaLabs.Trade","Profile.ManagePrice.View","Profile.Model.HidePrices","Trade.Link.View"];
try{
	extensions['AwaLabs.AwaCaseForm.2.1.0']();
	SC.addExtensionModule('AwaLabs.CaseForm');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.AwaFileUpload.2.1.0']();
	SC.addExtensionModule('AwaLabs.FileUpload');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CartToQuote.2.1.0']();
	SC.addExtensionModule('AwaLabs.Quotes.MyAccount');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.CaseCustom.2.1.0']();
	SC.addExtensionModule('AwaLabs.CaseCustom');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Dialog.2.0.0']();
	SC.addExtensionModule('AwaLabs.Dialog');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.ExpectedShipDate.1.0.0']();
	SC.addExtensionModule('ExpectedShipDate');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Favicon.2.0.0']();
	SC.addExtensionModule('AwaLabs.Favicon');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.FavoritesList.2.1.0']();
	SC.addExtensionModule('AwaLabs.FavoritesList');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.FooterCopyright.2.1.0']();
	SC.addExtensionModule('AwaLabs.FooterCopyright');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.GeoIPLocation.2.1.0']();
	SC.addExtensionModule('AwaLabs.GeoIpLocation');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.HeadContentByApplication.2.1.0']();
	SC.addExtensionModule('AwaLabs.HeadContentByApplication');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.HeaderCustomizations.2.0.0']();
	SC.addExtensionModule('AwaLabs.HeaderCustomizations');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.InactivityMessage.2.1.0']();
	SC.addExtensionModule('AwaLabs.Inactivity.Message');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.ItemSearchAutoAdd.2.1.0']();
	SC.addExtensionModule('AwaLabs.ItemSearchAutoAdd');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Jewelry.2.1.1']();
	SC.addExtensionModule('AwaLabs.Jewelry.MyAccount');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['Tavano.Klaviyo.3.0.7']();
	SC.addExtensionModule('Tavano.Klaviyo.Klaviyo');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.LayoutClass.2.0.0']();
	SC.addExtensionModule('AwaLabs.LayoutClass');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.OrderStatusImprovementsHandlebarsExtras.2.0.0']();
	SC.addExtensionModule('AwaLabs.OrderStatusImprovementsHandlebarsExtras');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.OuterCSS.1.0.0']();
	SC.addExtensionModule('SuiteLabs.OuterCSS.MyAccount');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.PriceToggle.2.1.1']();
	SC.addExtensionModule('AwaLabs.PriceToggle.MyAccount');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.ProfileUtils.2.0.1']();
	SC.addExtensionModule('AwaLabs.ProfileUtils');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.SEOImprovements.2.0.0']();
	SC.addExtensionModule('AwaLabs.SEOImprovements');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.ShowAllTransactions.1.0.0']();
	SC.addExtensionModule('ShowAllTransactions');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.SocialMedia.2.1.0']();
	SC.addExtensionModule('AwaLabs.SocialMedia');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.StickyHeader.2.0.0']();
	SC.addExtensionModule('AwaLabs.StickyHeader');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.TrackingNumbers.1.1.0']();
	SC.addExtensionModule('AwaLabs.TrackingNumbers');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['AwaLabs.Trade.2.1.0']();
	SC.addExtensionModule('AwaLabs.Trade.MyAccount');
}
catch(error)
{
	console.error(error);
}

