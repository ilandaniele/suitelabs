
define('SuiteLabs.StickyScroll.Main', [
    'Facets.Browse.View',
    'Facets.ItemCell.View',
    'ProductDetails.Base.View',
    'Backbone',
    'jQuery',
    'underscore'
], function SuiteLabsStickyScrollMain(
    FacetsBrowseView,
    FacetsItemCellView,
    ProductDetailsBaseView,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    // Window.sessionStorage
    var globalStorage = sessionStorage;

    var latestProductVisited;
    var latestProductFound;

    var InfiniteScrollItemsHandler;

    if (!SC.isPageGenerator()) {
        /* eslint-disable global-require, no-console */
        try {
            InfiniteScrollItemsHandler = require('SuiteCommerce.InfiniteScroll.ItemsHandler');

            _.extend(InfiniteScrollItemsHandler.default, {
                loadPage: _.wrap(InfiniteScrollItemsHandler.default.loadPage, function loadPage(fn, _searchApiUrl, pageNumber) {
                    var self = this;
                    var promise = fn.apply(this, _.toArray(arguments).slice(1));

                    return promise.then(function itemPageMapping() {
                        var itemMap = JSON.parse(globalStorage.getItem('itemPageMapping') || '{}');

                        self.collection.forEach(function forEachItem(itemModel) {
                            var itemId = String(itemModel.get('internalid'));

                            itemMap[itemId] = pageNumber;
                        });
                        globalStorage.setItem('itemPageMapping', JSON.stringify(itemMap));
                    });
                })
            });
        } catch (e) {
            if (debugMode) {
                console.warn('InfiniteScroll was not found.');
            }
        }
        /* eslint-enable global-require, no-console */

        _.extend(FacetsBrowseView.prototype, {
            initialize: _.wrap(FacetsBrowseView.prototype.initialize, function initialize(fn) {
                var ret = fn.apply(this, _.toArray(arguments).slice(1));
                var self = this;

                this.on('afterCompositeViewRender', function afterViewRender() {
                    var application = self.getApplication();

                    return application && application.getLayout().trigger('itemListRendered');
                });

                return ret;
            }),

            getApplication: function getApplication() {
                return (this.options && this.options.application) || (SC && SC.Application);
            }
        });

        _.extend(FacetsItemCellView.prototype, {
            initialize: _.wrap(FacetsItemCellView.prototype.initialize, function initialize(fn) {
                var ret = fn.apply(this, _.toArray(arguments).slice(1));
                var self = this;

                this.on('afterViewRender', function afterViewRender() {
                    var application = self.getApplication();
                    var itemId = self.model.get('internalid');

                    return application && application.getLayout().trigger('cellRendered', itemId);
                });

                return ret;
            }),

            getApplication: function getApplication() {
                return (this.options && this.options.application) || (SC && SC.Application);
            }
        });

        _.extend(ProductDetailsBaseView.prototype, {
            initialize: _.wrap(ProductDetailsBaseView.prototype.initialize, function initialize(fn) {
                var self = this;
                var ret = fn.apply(this, _.toArray(arguments).slice(1));

                this.on('afterViewRender', function afterViewRender() {
                    var item = self.model.get('item');
                    var itemId = item.get('internalid');
                    latestProductVisited = itemId;
                    latestProductFound = false;
                });

                return ret;
            })
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getLayout();
            var layoutPromise;
            var cellPromise;

            if (!SC.isPageGenerator()) {
                layout.on('beforeAppendView', function beforeAppendView() {
                    layoutPromise = jQuery.Deferred();
                    cellPromise = jQuery.Deferred();

                    jQuery.when(layoutPromise, cellPromise).then(
                        function scrollTo() {
                            var elem = document.querySelector('[data-item-id="' + latestProductVisited + '"]');

                            if (elem) {
                                _.defer(function elemScroll() {
                                    elem.scrollIntoView();
                                });
                            }
                            globalStorage.setItem('nextPage.' + latestProductVisited, '');
                        },
                        function loadNextPage() {
                            var fragment = Backbone.history.fragment;
                            var pageRegExp = /([?|&])page=(\d+)/;
                            var pageValues = pageRegExp.exec(fragment);

                            var itemId = String(latestProductVisited);
                            var itemMap = JSON.parse(globalStorage.getItem('itemPageMapping') || '{}');
                            var nextPage = itemMap[itemId] || 1;
                            var nextFragment;

                            // If we do not come from a PDP, we stop the loop.
                            if (!latestProductVisited) {
                                return true;
                            }

                            // If the current nextPage value is equal than the previous attempt, we stop the loop.
                            if (String(globalStorage.getItem('nextPage.' + itemId)) === String(nextPage)) {
                                return true;
                            }
                            globalStorage.setItem('nextPage.' + itemId, nextPage);

                            if (pageValues) {
                                nextFragment = fragment.replace(pageRegExp, pageValues[1] + 'page=' + nextPage);
                            } else {
                                nextFragment = fragment + (fragment.indexOf('?') !== -1 ? '&' : '?') + 'page=' + nextPage;
                            }
                            return Backbone.history.navigate(nextFragment, { trigger: true });
                        }
                    );
                });

                layout.on('itemListRendered', function itemListRendered() {
                    if (!cellPromise) {
                        return true;
                    }
                    return latestProductFound ? cellPromise.resolve() : cellPromise.reject();
                });

                layout.on('cellRendered', function cellRendered(itemId) {
                    if (itemId === latestProductVisited) {
                        latestProductFound = true;
                    } else {
                        latestProductFound = latestProductFound || false;
                    }
                });

                layout.on('afterAppendView', function afterAppendView() {
                    layoutPromise.resolve();
                });
            }
        }
    };
});
