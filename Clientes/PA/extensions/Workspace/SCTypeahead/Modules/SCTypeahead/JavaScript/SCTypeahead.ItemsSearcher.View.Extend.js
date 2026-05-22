define('SCTypeahead.ItemsSearcher.View.Extend', [
    'ItemsSearcher.View',
    'ItemsSearcher.Utils',
    'itemssearcher.tpl',
    'Facets.Model',
    'Tracker',
    'AjaxRequestsKiller',
    'PluginContainer',
    'SCTypeahead.Categories.Collection',
    'SCTypeahead.Categories.Model',
    'sc_typeahead_item.tpl',
    'sc_typeahead_categories.tpl',
    'sc_typeahead_itemssearcher.tpl',
    'SC.Configuration',
    'Utils',
    'underscore'
], function(
    ItemsSearcherView,
    ItemsSearcherUtils,
    itemssearcher_tpl,
    FacetsModel,
    Tracker,
    AjaxRequestsKiller,
    PluginContainer,
    SCTypeaheadCategoriesCollection,
    SCTypeaheadCategoriesModel,
    sc_typeahead_item_tpl,
    sc_typeahead_categories_tpl,
    sc_typeahead_itemssearcher_tpl,
    Configuration,
    Utils,
    _
) {
    'use strict';

    var allowFullscreenSearchMobile = Configuration.get('sctypeahead.searchbargeneral.allowFullscreenSearchMobile');
    var enableBackToSearchResult = Configuration.get('sctypeahead.backtosearchresults.enableBackToSearchResult');
    var enableRecentlySearched = Configuration.get('sctypeahead.recentlySearched.enableRecentlySearchedKeyword');
    var retailDeliveryFeeItems = Configuration.get('retailDeliveryFee.items') || [];
    var isAdditionalFeeRequired = Configuration.get('retailDeliveryFee.enabled');

    _.extend(ItemsSearcherView.prototype,{

        defaultOptions: _.extend(ItemsSearcherView.prototype.defaultOptions,{
            
            categoriesLabels: [],

            relatedCategoriesLabels: [],
            
            ajaxDoneCategories: false,

            typeaheadCallbacks: [],

            inputHandler: null,
            
            ajaxDoneItems: false,

            template: (Utils.isPhoneDevice() || Utils.isTabletDevice()) && allowFullscreenSearchMobile ? sc_typeahead_itemssearcher_tpl : itemssearcher_tpl,

            categories_collection: SCTypeaheadCategoriesCollection,

            related_categories_collection: SCTypeaheadCategoriesCollection
        }),

        events: _.extend(ItemsSearcherView.prototype.events,{
            'click [data-action="see-all-products"]': 'seeAllProducts'
        }),

        seeAllProducts: function(e) //NEW METHOD
        {
            this.onItemSelected.apply(this, _.toArray(arguments).slice(1));
        },

        installPlugins: _.wrap(ItemsSearcherView.prototype.installPlugins,function(fn)
        {					
            fn.apply(this,_.toArray(arguments).slice(1));

            this.postCategoriesSuggestionObtained = new PluginContainer();
        }),

        showSuggestions: function()
        {    
            var self = this;
            if(!this.$searchElement)
            {
                this.$searchElement = this.$('[data-type="search-input"]');
            }

            if( this.$searchElement )
            {
                _(function() {
                    _.delay(openSuggestionDropdown, 250);
                    function openSuggestionDropdown()
                    {
                        var theVal = self.$searchElement.val();
                        self.$searchElement.typeahead('val', '');
                        self.$searchElement.focus().typeahead('val',theVal).focus().trigger("input").typeahead('open');                        
                    }
                }).defer();
            }

        },

        initialize: _.wrap(ItemsSearcherView.prototype.initialize,function(fn)
        {					
            fn.apply(this,_.toArray(arguments).slice(1));

            this.categories_collection = new this.options.categories_collection([], this.options.categoriesCollectionOptions);
            this.related_categories_collection = new this.options.related_categories_collection([]);

            this.on('typeahead_render_callback', this.typeaheadRenderCallback, this);

            this.website_facets_model = new FacetsModel();
            this.promise_item_fetch = jQuery.Deferred();
            this.promise_categories_fetch = jQuery.Deferred();

            var self = this;

            var touchmoved = false;

            var minQueryLength = Configuration.get('typeahead.minLength', 3);

            var touchStart = _.throttle(function(e) {
                touchmoved = false;
            }, 500);

            var touchMove = _.throttle(function(e) {
                touchmoved = true;
            }, 500);

            var touchEnd = _.throttle(function(e) {

                if( !touchmoved && this.options['componentId'] === "websiteSearch")
                {
                    var d = document.getElementsByClassName('tt-dropdown-menu');

                    var f = document.getElementsByClassName('sc-site-search-nav-pusher-wrapper');

                    var c = d && d.length > 0 ? d[0] : null;

                    var b = f && f.length > 0 ? f[0] : null;

                    var is_clicked_inside_search_panel = (c && c.contains(e.target)) || (b && b.contains(e.target));
                    
                    //if( e.currentTarget.id !== self.$searchElement.id && !is_clicked_inside_search_panel )
                    if( (e.target && e.target.id !== self.$searchElement.attr('id')) && !is_clicked_inside_search_panel)
                    {
                        self.hideSearchResults();
                    }
                    else if( e.target && e.target.id === self.$searchElement.attr('id') && self.options.query && self.options.query.toString().trim().length >= minQueryLength )
                    {
                        if( self.$el.find('.tt-dropdown-menu').height() < 10) //typeahead hack to show suggestion
                        {
                            self.showSuggestions();
                        }
                        else
                        {
                            this.$searchElement.focus();
                        }

                        return false;
                    }
                }
            }, 500);

            this._touchStart = _.bind(touchStart, this);
            this._touchMove = _.bind(touchMove, this);
            this._touchEnd = _.bind(touchEnd, this);
        
            jQuery(document.body).on('touchstart', this._touchStart);
            jQuery(document.body).on('touchmove', this._touchMove);
            jQuery(document.body).on('touchend', this._touchEnd);
            jQuery(document.body).on('mouseup', this._touchEnd);
            
        }),

        hideSearchResults: function()
        {
            if( this.$searchElement && this.$searchElement.data('ttTypeahead') && this.$searchElement.data('ttTypeahead').input)
            {
                this.$searchElement.data('ttTypeahead').input.trigger('blurred',this.$searchElement);
            }
        },

        isQuerySKUNumber: function(query)
        {
            var query_lower = query.toString().trim().toLowerCase();
            var item_ids = _.pluck(this.collection.toJSON(),'itemid');
            var item_ids_lower = _.map(item_ids, function(itemid){ return itemid.toString().toLowerCase(); });
            var item_index = item_ids_lower.indexOf(query_lower);   
            return item_index >= 0;
        },

        typeaheadRenderCallback: function() //NEW METHOD
        {
            var self = this;

            if(this.options.ajaxDoneItems && this.options.ajaxDoneCategories)
            {
                if( this.collection.length )
                {
                    self.$el.find('.tt-dropdown-menu').removeClass('no-items');
                }

                if( this.categories_collection.length || this.related_categories_collection.length )
                {
                    self.$el.find('.tt-dropdown-menu').removeClass('no-categories');
                }

                for(var i=0; i<this.options.typeaheadCallbacks.length; i++)
                {
                    var fn = this.options.typeaheadCallbacks[i]['fn'];
                    var param = this.options.typeaheadCallbacks[i]['param'];                    
                    fn.call(self, param);
                }

                this.wrapTypeahedSCCallback();

                this.options.typeaheadCallbacks = [];
            }
        },

        wrapTypeahedSCCallback: function()
        {
            var self = this;
            if( self.$el.find('.tt-dropdown-menu').children().length > 2 )
            {
                var children_tt_categories = self.$el.find('.tt-dropdown-menu').children().slice(0,2);
                var children_tt_items = self.$el.find('.tt-dropdown-menu').children().slice(2,3);
                self.$el.find('.tt-dropdown-menu').append('<div class="tt-categories-section"></div>');
                self.$el.find('.tt-dropdown-menu').append('<div class="tt-items-section"></div>');

                self.$el.find('.tt-dropdown-menu').find('.tt-categories-section').append(children_tt_categories);
                self.$el.find('.tt-dropdown-menu').find('.tt-items-section').append(children_tt_items);
            }
        },

        destroy: _.wrap(ItemsSearcherView.prototype.destroy,function(fn)
        {					
            fn.apply(this,_.toArray(arguments).slice(1));

            this.off('typeahead_render_callback', this.typeaheadRenderCallback, this);

            jQuery(document.body).off('touchstart', this._touchStart);
            jQuery(document.body).off('touchmove', this._touchMove);
            jQuery(document.body).off('touchend', this._touchEnd);

            this.categories_collection && this.categories_collection.off && this.categories_collection.off(null, null, this);
            this.related_categories_collection && this.related_categories_collection.off && this.related_categories_collection.off(null, null, this);
        }),

        configureTypeahead: _.wrap(ItemsSearcherView.prototype.configureTypeahead,function(fn)
        {
            var self = this;
            var typeaheadOptions = {
                highlight: this.options.highlight,
                minLength: this.options.minLength
            };

            // @property {jQuery} $searchElement
            self.$searchElement = self.$('[data-type="search-input"]');

            // after the layout has be rendered, we initialize the plugin
            if (SC.ENVIRONMENT.jsEnvironment !== 'server') {
                if(this.options['componentId'] != "websiteSearch")
                {
                    self.$searchElement
                    .typeahead(typeaheadOptions, this.getTypeAheadConfiguration())
                    .on('typeahead:selected', _.bind(self.onItemSelected, self));
                }
                else
                {
                    self.$searchElement
                    .typeahead(typeaheadOptions, this.getTypeAheadConfigurationRelatedCategories(), this.getTypeAheadConfigurationCategories(), this.getTypeAheadConfigurationItems())
                    .on('typeahead:selected', _.bind(self.onItemSelected, self));
                }                

                self.$searchElement.on('focus', _.bind(self.selectFirstIfRequire, self));

                // TYPE AHEAD HACKS
                var drop = self.$searchElement.data('ttTypeahead').dropdown;
                drop.$menu.off('click.tt', '.tt-suggestion').on(
                    'click.tt',
                    '.tt-suggestion',
                    _.bind(function($e) {
                        var g = document.getElementsByClassName('categories-noresults');

                        var h = g && g.length > 0 ? g[0] : null;

                        var is_clicked_sale_categories = h && h.contains($e.target);

                        $e.preventDefault();
                        $e.stopPropagation();
                        //drop.trigger('suggestionClicked', jQuery($e.currentTarget));

                        if( !is_clicked_sale_categories )
                        {
                            drop.trigger('suggestionClicked', jQuery($e.currentTarget));
                        }     
                        else
                        {
                            var hash_fragment = jQuery($e.target).attr('href') || jQuery($e.target).closest('.panel').find('.panel-footer a').attr('href');
                            if( hash_fragment )
                            {
                                if(enableBackToSearchResult) 
                                {
                                    Utils.setSearchResultUrlCookie(hash_fragment+'');
                                }

                                Backbone.history.navigate(hash_fragment,{
                                    trigger: true
                                });

                                if( allowFullscreenSearchMobile && (Utils.isPhoneDevice() || Utils.isTabletDevice()))
                                {
                                    var goback = jQuery('.sc-site-search-nav-pusher-wrapper').find('[data-action="sc-pusher-dismiss"]');

                                    goback && _.defer(function(){
                                        goback.click();
                                    });                
                                }
                            }
                            var currentQuery = self.getCurrentQuery();
                            if(enableRecentlySearched && typeof(Utils.setRecentlySearchKeywordOnCookie) === "function" && !!currentQuery) 
                            {
                                Utils.setRecentlySearchKeywordOnCookie(currentQuery, 'add', self.numberOfRecentlySearchedKeyword, self.expiryOfRecentlySearchedKeywordCookie);
                            }   

                            if(!jQuery($e.target).is('[class*="backbone-collection-view-cell-span"]')) 
                            {
                                self.hideSearchResults();
                            }
                        }  
                    }, drop)
                );
                
                var input = self.$searchElement.data('ttTypeahead').input;

                if(self.options['componentId'] === "websiteSearch")
                {
                    input.$input.off('blur.tt');
                }

                // Display menu when selected the input hack
                if (self.options.showMenuOnClick) {
                    self.$searchElement.focus(function() {
                        var ev = jQuery.Event('keydown');

                        ev.keyCode = ev.which = 40;
                        jQuery(this).trigger(ev);
                        return true;
                    });
                }
            }
        }),

        getTypeAheadConfigurationCategories: function() //NEW METHOD
        {
            var self = this;			
            return {            
                source: _.debounce(_.bind(self.loadSCSuggestionCategoriesSource, self), 500),            
                displayKey: _.bind(self.getSelectedItemDisplayText, self),            
                templates: {
                    header: '<div class="search-categories-title">Top Searched Categories</div>',
                    suggestion: _.bind(self.getSCSuggestionCategoryTemplate, self)
                }
            };
        },

        getTypeAheadConfigurationRelatedCategories: function() //NEW METHOD
        {
            var self = this;			
            return {            
                source: _.debounce(_.bind(self.loadSCSuggestionRelatedCategoriesSource, self), 750),            
                displayKey: _.bind(self.getSelectedItemDisplayText, self),            
                templates: {
                    header: '<div class="search-categories-title">Related Categories</div>',
                    suggestion: _.bind(self.getSCSuggestionRelatedCategoryTemplate, self)
                }
            };
        },

        getTypeAheadConfigurationItems: function() //NEW METHOD
        {
            var self = this;			
            return {            
                source: _.debounce(_.bind(self.loadSCSuggestionItemsSource, self), 500),            
                displayKey: _.bind(self.getSelectedItemDisplayText, self), 
                templates: {
                    header: '<div class="flex-title"><div class="home-merch-title search-items-title">Top Searched Products</div><div class="home-merch-title search-items-title show-all-wrapper"><a class="header-see-all-link" data-action="see-all-products"><span class="home-merch-title-seeAll">Click here to show all<i class="fa fa-arrow-right" aria-hidden="true"></i></span></a></div></div>',
                    suggestion: _.bind(self.getSCSuggestionItemTemplate, self)
                }
                /*templates: {
                    header: '<div class="home-merch-title search-items-title"><span class="header-title">Top Searched Products</span><a class="header-see-all-link" data-action="see-all-products"><span class="home-merch-title-seeAll">Show All<i class="fa fa-arrow-right" aria-hidden="true"></i></span></a></div>',
                    suggestion: _.bind(self.getSCSuggestionItemTemplate, self)
                }*/
            };
        },

        fetchAllFacets: function()
        {
            var plp_model = this.website_facets_model;

            var params = {
                limit: 12,
                offset: 0,
                sort: "custitem_ranking_score:desc"
            }

            plp_model.options = {
                data: params,
                killerId: AjaxRequestsKiller.getKillerId(),
                pageGeneratorPreload: true
            };

            return plp_model.fetch({cache: true}).fail(function(jqXhr){
                jqXhr.preventDefault = true;
                console.warn('Unable to fetch plp_model');
            });;
        },

        loadSCSuggestionRelatedCategoriesSource: function(query, callback)
        {
            var self = this;
            var isquery_sku = false;
            var showRelatedCategories = Configuration.get('sctypeahead.relatedcategories.showRelatedCategoriesBySku');
            var showInstructionWhenDuplicates = Configuration.get('sctypeahead.relatedcategories.showInstructionWhenDuplicates'); 
            var showInstructionAll = Configuration.get('sctypeahead.relatedcategories.showInstruction'); 
            var instructionTextCategories = Configuration.get('sctypeahead.relatedcategories.instructionTextCategories') || '(in categories)'; 
            var instructionTextSubCategories = Configuration.get('sctypeahead.relatedcategories.instructionTextSubCategories') || '(in sub-categories)';
            var promise_facets_fetch = this.fetchAllFacets();
            var promise_items_categories = jQuery.when.apply(jQuery, [this.promise_categories_fetch, this.promise_item_fetch, promise_facets_fetch]);            
            self.related_categories_collection = new self.options.related_categories_collection([]);
            self.options.relatedCategoriesLabels = [];
            if (self.options.query.length >= self.options.minLength) 
            {
                self.options.relatedCategoriesLabels = ['see-all-' + self.options.query];
            }
            showRelatedCategories && promise_items_categories.done(function(){
                var facets = self.website_facets_model.get('facets');
                var facet_list_custitem_1 = facets && _.findWhere(facets, {id: 'custitem_1'});
                var facet_list_custitem_2 = facets && _.findWhere(facets, {id: 'custitem_2'});
                isquery_sku = self.isQuerySKUNumber(query);
                if( isquery_sku )
                {
                    var item = self.collection.at(0);
                    var commercecategory = item.get('commercecategory');
                    var categories = commercecategory.categories || [];
                    _.each(categories.slice(0,3), function(category){
                        if( category ){
                            var relatedLink = category.urls[0];
                            var correctedSearchTerm = category.name;
                            var name = 'category-tt-' + correctedSearchTerm;
                            var instruction = showInstructionAll && !showInstructionWhenDuplicates ? instructionTextCategories : '';
                            var model_category = new SCTypeaheadCategoriesModel();
                                model_category.set('correctedSearchTerm', correctedSearchTerm);
                                model_category.set('name', name);
                                model_category.set('type', 'category');
                                model_category.set('instruction', instruction);
                                model_category.set('relatedLink', relatedLink);
                            self.related_categories_collection.add(model_category);
                        }
                    })
                    /*var category_labels = _.compact(_.uniq(_.pluck(self.collection.toJSON(),'custitem_1')));
                    var subcategory_labels = _.compact(_.uniq(_.pluck(self.collection.toJSON(),'custitem_2')));
                    _.each(category_labels, function(category_label){
                        var facet_category = facet_list_custitem_1 && facet_list_custitem_1.values && _.findWhere(facet_list_custitem_1.values, {label: category_label});
                        if( facet_category ){
                            var relatedLink = '/1+' + facet_category.url;
                            var correctedSearchTerm = facet_category.label;
                            var name = 'category-tt-' + correctedSearchTerm;
                            var instruction = showInstructionAll && !showInstructionWhenDuplicates ? instructionTextCategories : '';
                            var model_category = new SCTypeaheadCategoriesModel();
                                model_category.set('correctedSearchTerm', correctedSearchTerm);
                                model_category.set('name', name);
                                model_category.set('type', 'category');
                                model_category.set('instruction', instruction);
                                model_category.set('relatedLink', relatedLink);
                            self.related_categories_collection.add(model_category);
                        }
                    });
                    _.each(subcategory_labels, function(subcategory_label){
                        var facet_subcategory = facet_list_custitem_2 && facet_list_custitem_2.values && _.findWhere(facet_list_custitem_2.values, {label: subcategory_label});
                        if( facet_subcategory ){
                            var relatedLink = '/2+' + facet_subcategory.url;
                            var correctedSearchTerm = facet_subcategory.label;
                            var name = 'subcategory-tt-' + correctedSearchTerm;
                            var instruction = showInstructionAll && !showInstructionWhenDuplicates ? instructionTextSubCategories : '';
                            var model_subcategory = new SCTypeaheadCategoriesModel();
                                model_subcategory.set('correctedSearchTerm', correctedSearchTerm);
                                model_subcategory.set('name', name);
                                model_subcategory.set('type', 'subcategory');
                                model_subcategory.set('instruction', instruction);
                                model_subcategory.set('relatedLink', relatedLink);
                            self.related_categories_collection.add(model_subcategory);
                        }
                    });
                    if( showInstructionWhenDuplicates && !showInstructionAll ){
                        var groups = _.groupBy(self.related_categories_collection.toJSON(), function(category){ return category.correctedSearchTerm; });                    
                        _.mapObject(groups, function(val, key) {
                            if( !_.isEmpty(val) && _.isArray(val) && val.length > 1 )
                            {
                                _.each(val, function(category){
                                    var model_category = self.related_categories_collection.findWhere({ name: category.name });
                                    var is_category = model_category && model_category.get('type') === 'category';
                                    var is_subcategory = model_category && model_category.get('type') === 'subcategory';
                                    var instruction = '';
                                    if( is_category ){
                                        instruction = instructionTextCategories;
                                    }else if(is_subcategory){
                                        instruction = instructionTextSubCategories;
                                    }
                                    model_category && model_category.set('instruction', instruction);
                                });
                            }                        
                        });
                    }*/
                    self.options.relatedCategoriesLabels = self.related_categories_collection.pluck('name');
                    // if(self.options.relatedCategoriesLabels && self.options.relatedCategoriesLabels.length)
                    // {
                    //     self.options.relatedCategoriesLabels.unshift('Related Categories');
                    // }
                    self.options.typeaheadCallbacks.push({
                        fn: callback,
                        param: self.options.relatedCategoriesLabels
                    });    
                    self.trigger('typeahead_render_callback'); 
                }             
            }); 
            return promise_items_categories;         
        },

        loadSCSuggestionCategoriesSource: function(query, callback) //NEW METHOD
        {
            var self = this;
            self.options.query = ItemsSearcherUtils.formatKeywords(query);
            self.options.ajaxDoneCategories = false;
            self.options.categoriesLabels = [];
            this.categories_collection = new this.options.categories_collection([], this.options.categoriesCollectionOptions);

            var dataObject = {
                keyword: self.options.query.trim()
            }

            self.$el.find('.tt-dropdown-menu').addClass('no-categories');

            if (self.options.query.length >= self.options.minLength) 
            {
                self.options.categoriesLabels = ['see-all-' + self.options.query];
                //callback(self.options.categoriesLabels);
            }
            
            this.promise_categories_fetch = this.categories_collection.fetch(
                {
                    data: dataObject,
                    killerId: _.uniqueId('ajax_killer_')
                },
                {
                    silent: true
                }
            )
            .done(function()
            {
                self.categories_collection = self.postCategoriesSuggestionObtained.executeAll(self.categories_collection, self.options) || self.categories_collection;

                self.options.ajaxDoneCategories = true;

                self.options.categoriesLabels = self.categories_collection.pluck('name');

                // if(self.options.categoriesLabels && self.options.categoriesLabels.length)
                // {
                //     self.options.categoriesLabels.unshift('Top Searched Categories');
                // }

                // if(!self.options.categoriesLabels.length)
                // {
                //     self.options.categoriesLabels = ['see-all-' + self.options.query];
                // }

                //if( self.categories_collection.length )
                //{
                    //callback(self.options.categoriesLabels);
                    
                    self.options.typeaheadCallbacks.push({
                        fn: callback,
                        param: self.options.categoriesLabels
                    });
                //}
                self.trigger('typeahead_render_callback');
            })
            .fail(function(jqXhr)
            {
                jqXhr.preventDefault = true;
                console.warn('The keyword service failed to fetch response in valid format');
            })
            .always(function()
            {
                self.$searchElement.attr("readonly",false);
            });;

            return this.promise_categories_fetch;
        },

        removeDeliveryFee: function()
        {
            if(isAdditionalFeeRequired)
            {
                var collection = this.collection.filter(function(item)
                {
                    var internalid = item.get('internalid').toString();

                    var is_retail_delivery_fee = _.findWhere(retailDeliveryFeeItems, { itemid: internalid.toString() });

                    return !is_retail_delivery_fee;
                });

                this.collection.reset(collection, {silent: true});
            }            
        },

        loadSCSuggestionItemsSource: function(query, callback) //NEW METHOD
        {
            var self = this;
            self.options.query = ItemsSearcherUtils.formatKeywords(query);
            self.options.ajaxDoneItems = false;
            self.options.labels = [];
            self.options.requestCount = 0;
            this.collection = new this.options.collection([], this.options.collectionOptions);

            var dataObject = {
                q: jQuery.trim(self.options.query),
                sort: self.options.sort,
                limit: self.options.limit,
                offset: 0
            };

            self.$el.find('.tt-dropdown-menu').addClass('no-items');

            if (self.options.query.length >= self.options.minLength) 
            {
                self.options.labels = ['see-all-' + self.options.query];
                callback(self.options.labels);
            }

            this.promise_item_fetch = this.collection
                .fetch(
                    {
                        data: dataObject,
                        killerId: _.uniqueId('ajax_killer_')
                    },
                    {
                        silent: true
                    }
                )
                .done(function() 
                {
                    self.collection = self.postItemsSuggestionObtained.executeAll(self.collection, self.options) || self.collection;

                    Utils.removeVerifiedDiscontinuedItem(self.collection);

                    self.removeDeliveryFee();

                    self.options.ajaxDoneItems = true;

                    if( self.options.showSeeAll )
                    {
                        self.options.labels = self.getItemIds(self.collection).concat(['see-all-' + self.options.query])
                    }
                    else
                    {
                        self.options.labels = self.getItemIds(self.collection);
                    }
                    
                    // if( self.collection && self.collection.length )
                    // {
                    //     self.options.labels.unshift('Top Searched Products');
                    // }							
                    
                    if (!self.options.labels.length) 
                    {
                        self.options.labels = ['see-all-' + self.options.query];
                    }

                    self.options.typeaheadCallbacks.push({
                        fn: callback,
                        param: self.options.labels
                    });

                    self.trigger('typeahead_render_callback');

                    //callback(self.options.labels);

                }).always(function()
                {
                    self.$searchElement.attr("readonly",false);
                });
            return this.promise_item_fetch;
        },

        getSCSuggestionRelatedCategoryTemplate: function(category_id) //NEW METHOD
        {	
            var category_model = this.related_categories_collection.findWhere({ name: category_id });
            var item_view_options = _.extend({}, this.options.itemViewOptions, {
                model: category_model,
                query: this.options.query,
                areResults: !!this.related_categories_collection.length,
                template: sc_typeahead_categories_tpl,
                isAjaxDone: this.options.ajaxDoneCategories
            });
            var items_searcher_item = new this.options.itemView(item_view_options);
    
            items_searcher_item.render();
            
            return items_searcher_item.$el;
        },

        getSCSuggestionCategoryTemplate: function(category_id) //NEW METHOD
        {	
            var category_model = this.categories_collection.findWhere({ name: category_id });
            var item_view_options = _.extend({}, this.options.itemViewOptions, {
                model: category_model,
                query: this.options.query,
                areResults: !!this.categories_collection.length,
                template: sc_typeahead_categories_tpl,
                isAjaxDone: this.options.ajaxDoneCategories
            });
            var items_searcher_item = new this.options.itemView(item_view_options);
    
            items_searcher_item.render();
            
            return items_searcher_item.$el;
        },

        getSCSuggestionItemTemplate: function(item_id) //NEW METHOD
        {
            var item_model = this.collection.get(item_id);
            var item_view_options = _.extend({}, this.options.itemViewOptions, {
                model: item_model,
                query: this.options.query,
                areResults: !!this.collection.length,
                template: sc_typeahead_item_tpl,
                isAjaxDone: this.options.ajaxDoneItems
            });
            var items_searcher_item = new this.options.itemView(item_view_options);
    
            items_searcher_item.render();
            
            return items_searcher_item.$el;
        },

        onItemSelected: _.wrap(ItemsSearcherView.prototype.onItemSelected, function(fn)
        {
            if(this.options['componentId'] != "websiteSearch")
            {
                fn.apply(this, _.toArray(arguments).slice(1));
            }
            else
            {
                this.onSCItemSelected.apply(this, _.toArray(arguments).slice(1));
            }
        }),

        onSCItemSelected: function(e, item_id) //NEW METHOD
        {
            this.options.selectedItem = this.collection.get(item_id);

            var selected_category = this.categories_collection.findWhere({ name: item_id }) || this.related_categories_collection.findWhere({ name: item_id });

            this.options.selectedCategory = selected_category;
            var searchTerm = this.options.query;
            this.trigger(
                'itemSelected',
                {
                    selectedItem: this.collection.get(item_id),

                    selectedCategory: selected_category,

                    collection: this.collection.models ,

                    categories_collection: this.categories_collection.add(this.related_categories_collection.models).models,

                    currentQuery: this.options.query,

                    isResultCompleted: this.options.ajaxDoneCategories && this.options.ajaxDoneItems
                }
            );
            Tracker.getInstance().trackEvent({
                category: 'SearchItem-end',
                action: 'render',
                currentQuery: searchTerm,
                searchString:true
            });
            this.hideSearchResults();
        }
        
    });
});
