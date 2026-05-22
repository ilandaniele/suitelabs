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
