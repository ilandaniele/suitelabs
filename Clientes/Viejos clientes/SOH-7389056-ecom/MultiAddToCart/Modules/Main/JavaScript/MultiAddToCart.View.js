/*
    © 2021 Oracle Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('MultiAddToCart.View', [
    'PageType.Base.View',
    'MultiAddToCart.Display.View',
    'MultiAddToCart.Model',
    'multiaddtocart.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function MultiAddToCartView(
    PageTypeBaseView,
    MultiAddToCartDisplayView,
    MultiAddToCartModel,
    multiaddtocartTpl,
    Backbone,
    jQuery,
    _
) {
    return PageTypeBaseView.PageTypeBaseView.extend({
        template: multiaddtocartTpl,

        beforeShowContent: function beforeShowContent() {
            var self = this;
            var promise = jQuery.Deferred();
            var categoryFullurl = this.options.routerArguments[0];
            var container = this.options.container;
            var env = container.getComponent('Environment');
            var commerceCategories = env.getConfig('multipleAddToCart.commerceCategories');
            this.container = container;
            this.childViews = {
                'MultiAddToCart.Display.View': function MultiAddToCartDisplayViewConstructor() {
                    return new MultiAddToCartDisplayView({
                        model: self.model
                    });
                }
            };
            if (!_.contains(commerceCategories, categoryFullurl)) {
                this.options.application.layout.notFound();
                return jQuery.Deferred().reject();
            }
            this.cart = container.getComponent('Cart');
            this.model = new MultiAddToCartModel();
            this.cartPromise = this.cart.getLines();
            this.modelPromise = this.model.fetch({
                data: {
                    fullurl: categoryFullurl
                }
            });
            this.listenTo(Backbone, 'multiaddto:discard', function checkUnaddedItems(status) {
                if (self.hasUnaddedItems()) {
                    status.unaddedItems = true;
                    status.msg = 'Your items have not been added to cart yet, are you sure to leave?';
                }
            });
            jQuery.when(this.modelPromise).done(function afterPromises(cartResponse) {
                var categories;
                self.lines = cartResponse;
                categories = self.model.get('categories');
                // self.mergeWithCart(categories);
                self.model.set('categories', categories);
                self.model.set('items', []);
                // self.model.on('change', this.render, this);
                promise.resolve();
            });
            return promise;
        },

        hasUnaddedItems: function hasUnaddedItems() {
            var items = this.model.get('items') || [];
            return items.length > 0;
        },

        getEvents: function getEvents() {
            return {
                'click .multipaddto-subcategory-name': 'toggleItems',
                'change input.multipaddto-item-quantity': 'updateItemQuantity',
                'click .multipaddto-add-all': 'multipleAddToCart'
            };
        },
        initializeProgressBar: function initializeProgressBar() {
            var width = 0;
            function updateProgressBar(value) {
                if (width < 100) {
                    width += value;
                    jQuery('#progress-bar').css('width', width + '%');
                }
            }

            jQuery('#progress-bar-container').show();
            jQuery('#progress-bar-legend').show();
            return setInterval(updateProgressBar, 250, 20);
        },

        finalizeProgressBar: function finalizeProgressBar(interval) {
            jQuery('#progress-bar-container').hide();
            jQuery('#progress-bar-legend').hide();
            jQuery('#progress-bar-legend').trigger('change');
            clearInterval(interval);
        },

        multipleAddToCart: function multipleAddToCart(e) {
            var self = this;
            var cart = this.container.getComponent('Cart');
            var items = this.model.get('items');
            var lines;
            var interval;

            // e.preventDefault();
            jQuery(e.target).html(_.translate('Adding to Cart')).prop('disabled', true);

            interval = self.initializeProgressBar();
            lines = _.map(items, function mapLines(item) {
                return {
                    quantity: parseInt(item.quantity, 10),
                    item: {
                        internalid: item.internalid
                    }
                };
            });

            cart.addLines({
                lines: lines
            }).done(function afterLinesAdded() {
                self.finalizeProgressBar(interval);
                self.model.set('items', []);
                self.model.trigger('change:items');
                self.render();
            });
        },

        // Event handler for quantity input updated
        updateItemQuantity: function updateItemQuantity(e) {
            var internalid;
            var name;
            var quantity;
            var items = this.model.get('items') || [];
            var updatedItem;
            e.preventDefault();
            internalid = jQuery(e.target).data('item');
            name = jQuery(e.target).data('name');
            quantity = jQuery(e.target).val();
            updatedItem = _.find(items, function findUpdatedItem(item) {
                return item.internalid === internalid;
            });
            if (updatedItem) {
                if (quantity > 0) {
                    updatedItem.quantity = quantity;
                } else {
                    // if the quantity set to 0 remove it from the list
                    items = _.without(items, _.findWhere(items, {
                        internalid: internalid
                    }));
                }
            } else {
                items.push({
                    internalid: internalid,
                    name: name,
                    quantity: quantity
                });
            }
            this.model.set('items', items);
            this.model.trigger('change:items');
        },

        toggleItems: function toggleItems(e) {
            var subcategoryId;
            var openedSubcategoryId;
            var openedCategoryId;
            e.preventDefault();
            subcategoryId = jQuery(e.target).data('id');
            openedSubcategoryId = this.model.get('openCategory');
            openedCategoryId = jQuery(e.target).parents('.multipaddto-category-0');
            jQuery('.multipaddto-items').hide();
            // eslint-disable-next-line eqeqeq
            if (!openedSubcategoryId || openedSubcategoryId != subcategoryId) {
                jQuery('.multipaddto-items[data-section="' + subcategoryId + '"').toggle();
                jQuery('i[data-id="' + openedSubcategoryId + '"]').removeClass('category-dropdown-up-icon').addClass('category-dropdown-down-icon');
                jQuery('i[data-id="' + subcategoryId + '"]').removeClass('category-dropdown-down-icon').addClass('category-dropdown-up-icon');
                this.model.set('openCategory', subcategoryId);
            } else {
                this.model.unset('openCategory');
                jQuery('i[data-id="' + subcategoryId + '"]').removeClass('category-dropdown-up-icon').addClass('category-dropdown-down-icon');
            }
            // change the view cart button
            if (openedCategoryId.length) {
                // eslint-disable-next-line eqeqeq
                if (openedSubcategoryId != subcategoryId) {
                    jQuery('.multipaddto-category-view-cart-first').hide();
                    jQuery('.multipaddto-category-view-cart-last').show();
                } else {
                    jQuery('.multipaddto-category-view-cart-first').show();
                    jQuery('.multipaddto-category-view-cart-last').hide();
                }
            } else {
                jQuery('.multipaddto-category-view-cart-first').show();
                jQuery('.multipaddto-category-view-cart-last').hide();
            }
        },

        getContext: function getContext() {
            var categories = this.model.get('categories');
            var openCategory = this.model.get('openCategory');
            var topCategory = categories;
            // This is to build the same data structure for subcategory
            if (categories && categories[0] && categories[0].categories.length === 0) {
                topCategory.categories = categories;
                topCategory.fullurl = this.model.get('fullurl');
                topCategory.internalid = this.model.get('internalid');
                topCategory.name = this.model.get('name');
                topCategory = [topCategory];
            }
            return {
                categories: topCategory,
                openCategory: openCategory,
                categoriesTotal: (categories && categories.length) || 0
            };
        }
    });
});
