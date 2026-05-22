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
