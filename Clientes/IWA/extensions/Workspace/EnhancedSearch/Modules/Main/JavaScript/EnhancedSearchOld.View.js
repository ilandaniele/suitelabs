define('EnhancedSearch.View', [
    'SCView',
    'EnhancedSearch.Model',
    'enhanced_search.tpl',
    'underscore',
    'jQuery'
], function EnhancedSearchViewModule(
    SCViewComponent,
    EnhancedSearchModel,
    EnhancedSearchTpl,
    _,
    jQuery
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function EnhancedSearchView(options) {
        var self = this;
        SCView.call(this);
        this.options = options || {};

        this.template = EnhancedSearchTpl;
        this.model = new EnhancedSearchModel();

        this.show = false;
        this.categories = [];
        this.products = [];

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

        this.options.layout.on('afterShowContent', function afterShowContent() {
            // jQuery('.typeahead').on('focus', function focus() {
            //     jQuery(this).typeahead('val', ''); // para forzar render inicial
            //     jQuery('.typeahead').typeahead('open');
            //     // self.show = true;
            //     // self.render();
            // });

            // jQuery('.typeahead').on('blur', function blur() {
            //     // self.show = false;
            //     // self.render();
            //     jQuery('.typeahead').typeahead('close');
            // });

            // jQuery('.typeahead').on('change', function blur() {
            //     var query = jQuery(this).val();
            //     if (query === '') {
            //         self.show = false;
            //     } else {
            //         self.show = true;
            //         self.searchItems(query);
            //     }
            //     self.render();
            // });
            jQuery('.typeahead').typeahead(
                {
                    minLength: 0,
                    highlight: true
                },
                // Primer dataset: Categorías
                {
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
                },
                // Segundo dataset: Productos
                {
                    name: 'products',
                    source: function source(query, syncResults) {
                        var matches = self.products.filter(function filterItems(item) {
                            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                        });
                        syncResults(matches);
                    },
                    display: 'name',
                    templates: {
                        header: '<div class="typeahead-section-title"><strong>Trending Products</strong></div>',
                        suggestion: function suggest(item) {
                            // return '<div>' + item.name + '</div>';

                            return '<li class="typeahead-product-item"> <a href="' + item.url + '" class="typeahead-product-link">' +
                                '<div class="typeahead-product-info">' +
                                    '<div class="typeahead-product-name">' + item.name + '</div>' +
                                    '<div class="typeahead-product-sku">SKU: ' + item.sku + '</div>' +
                                    '<div class="typeahead-product-manufacturer">Manufactured by ' + item.manufacturer + '</div>' +
                                ' </div>' +
                                '</a> </div>';
                        }
                    }
                }
            );
        });

        // this.model.fetch({
        //     data: {
        //         action: 'getTrendingProductsAndCategories'
        //     }
        // }).done(function enhancedSearchPromise() {
        //     self.products = self.model.get('trendingProducts');
        //     self.categories = self.model.get('trendingCategories');
        //     self.render();
        // });
    }

    EnhancedSearchView.prototype = Object.create(SCView.prototype);
    EnhancedSearchView.prototype.constructor = EnhancedSearchView;

    EnhancedSearchView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        // this.getTrendingProductsAndCategories().always(function afterGetTrendingProductsAndCategories() {
        SCView.prototype.render.apply(self, args);
        // });
    };

    EnhancedSearchView.prototype.searchItems = function searchItems(query) {
        // var results;
        // var allItems = categories.concat(products);
        var searchQuery = query.toLowerCase();

        // Filtrar categorías
        this.categories = this.categories.filter(function filterItems(item) {
            var name = item.name.toLowerCase();
            return name === searchQuery || name.indexOf(searchQuery) !== -1;
        });

        // Filtrar productos
        this.products = this.products.filter(function filterItems(item) {
            var name = item.name.toLowerCase();
            return name === searchQuery || name.indexOf(searchQuery) !== -1;
        });
    };
    // EnhancedSearchView.prototype.getTrendingProductsAndCategories = function getTrendingProductsAndCategories() {
    //     var self = this;
    //     var item = this.options.PDPComponent.getItemInfo();
    //     var enhancedSearchPromise = jQuery.Deferred();

    //     var properties = {
    //         width: item.item.custitem_pacejet_item_width,
    //         height: item.item.custitem_pacejet_item_height,
    //         length: item.item.custitem_pacejet_item_length,
    //         weight: item.item.weight,
    //         id: item.item.internalid,
    //         quantity: item.quantity
    //     };

    //     this.options.EnhancedSearchModel.fetch({
    //         data: {
    //             action: 'getZipCodeAndPajecetData',
    //             item: JSON.stringify(properties)
    //         }
    //     }).done(function enhancedSearchSuccessfull() {
    //         self.zipCode = self.options.EnhancedSearchModel.get('zipCode');
    //         self.rates = self.options.EnhancedSearchModel.get('rates');
    //         if (!self.zipCode) {
    //             self.show = false;
    //         }
    //     }).always(function enhancedSearchAlways() {
    //         enhancedSearchPromise.resolve();
    //     });
    //     return enhancedSearchPromise;
    // };

    EnhancedSearchView.prototype.getContext = function getContext() {
        // var environment = this.options.container.getComponent('Environment');
        // var EnhancedSearch = environment.getConfig('enhancedSearch');

        return {
            show: this.show,
            trendingCategoriesLabel: 'Trending Categories', // EnhancedSearch.extensions.trendingCategoriesLabel,
            trendingProductsLabel: 'Trending Products', // EnhancedSearch.extensions.trendingProductsLabel,
            hasCategories: this.categories.length > 0, // EnhancedSearch.extensions.categories.length > 0,
            hasProducts: this.products.length > 0, // EnhancedSearch.extensions.products.length > 0,
            categories: this.categories, // EnhancedSearch.extensions.categories,
            products: this.products // EnhancedSearch.extensions.products
        };
    };

    return EnhancedSearchView;
});
