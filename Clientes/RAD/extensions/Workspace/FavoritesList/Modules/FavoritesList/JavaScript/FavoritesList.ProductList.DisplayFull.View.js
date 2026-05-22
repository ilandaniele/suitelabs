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
