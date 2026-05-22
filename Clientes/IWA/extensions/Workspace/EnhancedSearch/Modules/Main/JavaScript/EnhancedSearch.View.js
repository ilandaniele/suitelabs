define('EnhancedSearch.View', [
    'ItemsSearcher.View',
    'underscore'
], function EnhancedSearchViewModule(
    ItemsSearcherView,
    _
) {
    'use strict';

    // @class ItemRelations.Related.View @extends Backbone.CollectionView
    return ItemsSearcherView.extend({
        // defaultOptions: {
        //     // @property {String} placeholderLabel
        //     placeholderLabel: Utils.translate('Search for products'),
        //     // @property {Number} minLength
        //     minLength: 3,
        //     // @property {Number} maxLength
        //     maxLength: 10,
        //     // @property {Number} limit
        //     limit: 10,
        //     // @property {String} sort
        //     sort: 'relevance:desc',
        //     // @property {Array} labels
        //     labels: [],
        //     // @property {ItemsSearcher.Collection} collection
        //     collection: ItemsSearcherCollection,
        //     // @property {String} query
        //     query: '',
        //     // @property {Boolean} ajaxDone
        //     ajaxDone: false,
        //     // @property {Boolean} showMenuOnClick
        //     showMenuOnClick: false,
        //     // @property {ItemsSearcher.Item.View} itemView
        //     itemView: ItemsSearcherItemView,
        //     // @property {Boolean} highlight
        //     highlight: true,
        //     // @property {Function} template
        //     template: itemssearcher_tpl,
        //     // @property {Void} componentId
        //     componentId: void 0,
        //     // @property {Void} componentName
        //     componentName: void 0,
        //     // @property {Boolean} showSeeAll Indicate if the first result should be the "See All" option
        //     showSeeAll: true,
        //     // @property {Boolean} highlightFirst
        //     highlightFirst: false,
        //     // @property {ItemsSearcher.View.Options.Item.View.Option} itemViewOptions
        //     itemViewOptions: {},
        //     // @property {ItemsSearcher.View.Options.Collection.Option} collectionOptions
        //     collectionOptions: {},
        //     // @property {Function<Item.Model, String, String>} getItemDisplayName This function give the chance to
        //     // change the way items display name is returned
        //     getItemDisplayName: null
        // },

        // initialize: function initialize(options) {
        //     this.options = _.defaults(options || {}, this.defaultOptions);
        //     this.collection = new this.options.collection([], this.options.collectionOptions);
        //     this.template = this.options.template;
        //     this.on('afterViewRender', this.configureTypeahead, this);
        //     this.installPlugins();
        // },

        getTypeAheadConfiguration: function getTypeAheadConfiguration() {
            var self = this;
            this.categories = [
                { name: 'Holosun Red dot', url: '/holosun-red-dot' },
                { name: 'Geissele Automatics', url: '/geissele-automatics' },
                { name: 'AR-15 Bolt Carriers', url: '/ar15-bolt-carriers' },
                { name: 'Geissele Triggers', url: '/geissele-triggers' },
                { name: 'AR-15 Charging Handles', url: '/ar15-charging-handles' },
                { name: 'EOTech', url: '/eotech' },
                { name: 'Bravo Company Manufacturing - Upper Receivers', url: '/bcm-upper-receivers' },
                { name: 'Surefire Weapon Lights & Switches', url: '/surefire-lights' },
                { name: 'Upper Receivers', url: '/upper-receivers' },
                { name: 'AR-15 Upper Receivers', url: '/ar15-upper-receivers' }
            ];

            this.products = [
                {
                    name: 'LaRue Tactical MBT-2S AR-15 Trigger - Straight Bow',
                    sku: 'LT-MBT-2S-SB',
                    manufacturer: 'LaRue Tactical',
                    url: '/larue-tactical-mbt-2s-straight'
                },
                {
                    name: 'LaRue Tactical MBT-2S AR-15 Trigger - Curved',
                    sku: 'LT-MBT-2S',
                    manufacturer: 'LaRue Tactical',
                    url: '/larue-tactical-mbt-2s-curved'
                },
                {
                    name: 'Primary Arms Compact PLXC 1-8x24 FFP Rifle Scope',
                    sku: 'PA-PLXC-1-8X24F-RAPTOR-5.56Y',
                    manufacturer: 'Primary Arms',
                    url: '/primary-arms-plxc-1-8x24'
                }
            ];

            return {
                name: 'categories',
                source: function source(query, syncResults) {
                    var matches = self.categories.filter(function filterItems(item) {
                        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                    });
                    syncResults(matches);
                },
                display: 'name',
                templates: {
                    header: '<div class="typeahead-section-title"><strong>Trending Categories</strong></div>',
                    suggestion: function suggest(item) {
                        return '<li class="typeahead-category-item">' +
                                '<a href="' + item.url + '" class="typeahead-category-link">' +
                                    '<span class="typeahead-checkmark">✔</span> ' + item.name +
                                '</a>' +
                            '</li>';
                    }
                }
            };
        }
    });
});
