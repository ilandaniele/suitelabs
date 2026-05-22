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
