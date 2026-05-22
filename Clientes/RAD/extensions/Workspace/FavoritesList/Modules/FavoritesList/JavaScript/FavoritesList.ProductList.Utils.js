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
