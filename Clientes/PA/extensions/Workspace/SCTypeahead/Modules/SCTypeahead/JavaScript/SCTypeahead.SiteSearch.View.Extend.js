define('SCTypeahead.SiteSearch.View.Extend', [
    'SiteSearch.View',
    'ItemsSearcher.View',
    'SCTypeahead.TrendingSearch.View',
    'SCTypeahead.TrendingSearchFeature.Model',
    'sc_typeahead_site_search.tpl',
    'SC.Configuration',
    'Backbone.CompositeView',
    'Tracker',
    'Session',
    'Utils',
    'underscore'
], function(
    SiteSearchView,
    ItemsSearcherView,
    TrendingSearchView,
    TrendingSearchFeatureModel,
    sc_typeahead_site_search_tpl,
    Configuration,
    BackboneCompositeView,
    Tracker,
    Session,
    Utils,
    _
) {
    'use strict';


    var allowFullscreenSearchMobile = Configuration.get('sctypeahead.searchbargeneral.allowFullscreenSearchMobile');
    var enableBackToSearchResult = Configuration.get('sctypeahead.backtosearchresults.enableBackToSearchResult');
    var enableRecentlySearchedKeyword = Configuration.get('sctypeahead.recentlySearched.enableRecentlySearchedKeyword');
    var numberOfRecentlySearchedKeyword =Configuration.get('sctypeahead.recentlySearched.numberOfRecentlySearchedKeyword') ?  parseInt(Configuration.get('sctypeahead.recentlySearched.numberOfRecentlySearchedKeyword')) : 10;
    var expiryOfRecentlySearchedKeywordCookie = Configuration.get('sctypeahead.recentlySearched.expiryOfRecentlySearchedKeywordCookie') ?  parseInt(Configuration.get('sctypeahead.recentlySearched.expiryOfRecentlySearchedKeywordCookie')) : 365;
    var showTrendingCategories = Configuration.get('sctypeahead.trendingSearches.categories.enableTrendingCategories');
    var allowUpdateTrendingCategories = Configuration.get('sctypeahead.trendingSearches.categories.allowUpdateCategories');
    var showTrendingProducts = Configuration.get('sctypeahead.trendingSearches.products.enableTrendingProducts');
    var allowUpdateTrendingProducts = Configuration.get('sctypeahead.trendingSearches.products.allowUpdateProducts');
    
    _.extend(SiteSearchView.prototype,{

        template: sc_typeahead_site_search_tpl,

        events: _.extend(SiteSearchView.prototype.events,{
            'focus .itemssearcher-input-sample': 'openWebsiteSearchPopup'  
            ,'focus [data-type="search-input"]': 'toggleTrendingSearches'
            ,'keyup [data-type="search-input"]': 'toggleTrendingSearches'
            ,'click [data-action="close-trending-searches"]': 'closeTrendingSearches'          
        }),

        childViews: _.extend(SiteSearchView.prototype.childViews || {}, {
            'Trending.Recently.Searches': function() 
            {
                return new TrendingSearchView({
                    model: this.model_trending_view
                });
            }
        }),

        toggleTrendingSearches: _.debounce(function(e) 
        {
            var searchElement = this.$('#websiteSearch');
            if( searchElement && (!searchElement.val() || searchElement.val().trim() === ''))
            {
                this.showTrendingSearches();
            }
            else
            {
                this.hideTrendingSearches();
            }  
            return false;
        }, 500),

        showTrendingSearches: function()
        {
            this.model_trending_view.set('show', true);
            return false;
        },

        closeTrendingSearches: function(e)
        {
            e.preventDefault();
            this.hideTrendingSearches();
        },

        hideTrendingSearches: function()
        {
            this.model_trending_view.set('show', false);
            return false;
        },

        openWebsiteSearchPopup: function(e)
        {
            e.preventDefault();
            return false;
        },

        searchEventHandler: _.wrap(SiteSearchView.prototype.searchEventHandler, function(fn)
        {            
            var search_term = this.itemsSearcherComponent.getCurrentQuery();
          
            if (search_term.length > 0 && enableRecentlySearchedKeyword) 
            {
                Utils.setRecentlySearchKeywordOnCookie(search_term, 'add', numberOfRecentlySearchedKeyword, expiryOfRecentlySearchedKeywordCookie);
            }
            
            fn.apply(this, _.toArray(arguments).slice(1));

            if( allowFullscreenSearchMobile )
            {
                var goback = this.$el.find('[data-action="sc-pusher-dismiss"]');

                goback && setTimeout(function(){
                    goback.click();
                },1000);  
                
                this.resetHandle();
            }  
            if (search_term.length) 
            {
                Tracker.getInstance().trackEvent({
                    category: 'SearchItem-end',
                    action: 'render',
                    currentQuery: search_term,
                    searchString:true
                });
            }
                      
        }),

        getContext: _.wrap(SiteSearchView.prototype.getContext, function(fn)
        {
            var parent_context = fn.apply(this, _.toArray(arguments).slice(1));
            var is_phone_device = Utils.isPhoneDevice() || Utils.isTabletDevice();

            var updated_context = _.extend(parent_context, {
                extraClass: (Utils.isPhoneDevice() || Utils.isTabletDevice()) && allowFullscreenSearchMobile? 'fullscreen': null,
                showRecentKeywords: enableRecentlySearchedKeyword,
                allowFullscreenSearchMobile: allowFullscreenSearchMobile && is_phone_device
            });

            return updated_context;
        }),

        initialize: _.wrap(SiteSearchView.prototype.initialize, function(fn)
        {
            var isMobile = Utils.isPhoneDevice() || Utils.isTabletDevice();
            var maxProductTobeShown = Configuration.get('sctypeahead.topsearchedproducts.maxProductsToBeShown', 3);
            var maxProductTobeShownMobile = Configuration.get('sctypeahead.topsearchedproducts.maxProductsToBeShownMobile', 10);
            
            this.itemsSearcherComponent = new ItemsSearcherView({
                minLength: Configuration.get('typeahead.minLength', 3),
                maxLength: Configuration.get('searchPrefs.maxLength', 0),
                limit: isMobile && allowFullscreenSearchMobile ? maxProductTobeShownMobile : maxProductTobeShown,
                componentId: 'websiteSearch',
                componentName: 'websiteSearch',
                sort: Configuration.get('typeahead.sort', 'relevance:desc'),
                application: this.options.application,
                highlight: Configuration.get('typeahead.highlight', true)
            });

            this.model_trending_view = new Backbone.Model();
            this.model_trending_view.set('show', false);
            

            this.itemsSearcherComponent.on('itemSelected', this.onItemSelected, this);
            this.itemsSearcherComponent.on('keyUp', this.showReset, this);
            this.itemsSearcherComponent.on('keyDown', this.cleanSearchOnEnter, this);
            this.itemsSearcherComponent.on('typeahead_render_callback', this.hideTrendingSearches, this);
    
            this.application = this.options.application;
            // Listening the magnifying glass interactions
            this.application.getLayout().on('toggleItemSearcher', this.toggleItemSearcher, this);
            this.application.getLayout().on('hideItemSearcher', this.hideItemSearcher, this);

            if(!SC.isPageGenerator())
            {
                this.on('afterViewRender',this.initPlugins, this);
            }            

            this.windowWidth = jQuery(window).width();

            var windowResizeHandler = _.throttle(function() {

                Utils.resetViewportWidth();

                this.initPlugins();

                this.windowWidth = jQuery(window).width();

            }, 500);

            this._windowResizeHandler = _.bind(windowResizeHandler, this);

            jQuery(window).on('resize', this._windowResizeHandler);  

            BackboneCompositeView.add(this);

            var self = this;
            var body_click = _.throttle(function(e) {
                var hide_trending_container = false;
                var isSearchBoxClicked = e && e.target && e.target.nodeName === 'INPUT';
                var is_trending_category = e && e.target && e.target.classList.contains('trending-category-link');
                var is_trending_product = e && e.target && e.target.classList.contains('trending-product-link');

                var container_trending_searches = self.$('[data-view="Trending.Recently.Searches"]') && self.$('[data-view="Trending.Recently.Searches"]').get(0);
                var is_clicked_inside_trending_container = container_trending_searches && container_trending_searches.contains(e.target);
                
                if( is_trending_category || is_trending_product || (!isSearchBoxClicked && !is_clicked_inside_trending_container) )
                {
                    hide_trending_container = true;
                }
                
                if( hide_trending_container )
                {
                    self.hideTrendingSearches();
                    self.removeFocus();
                }
                
                if(is_trending_category)
                {
                    
                }
            }, 500);

            this._body_click = _.bind(body_click, this);

            jQuery(document.body).on('click', this._body_click);
        }),

        initPlugins: function initPlugins() 
        {
            var self = this;

            setTimeout(function(){
                self.$el.find('[data-action="pushable"]').scPush(
                    { 
                        target: 'tablet',
                        afterOpen: _.bind(self.afterOpenSearchPopup, self)
                    }
                );
                self.$el.find('.sc-site-search-nav-pusher-wrapper').show();
            },1000);            
        },

        afterOpenSearchPopup: function(e)
        {
            var self = this;

            var isBlurNotSupported = Utils.isiOS() && (Utils.isPhoneDevice() || Utils.isTabletDevice());

            setTimeout(function(){
                self.showSiteSearch();
                isBlurNotSupported && self.clickSearchbox();
            },250);            
        },

        clickSearchbox: function()
        {
            var searchElement = self.$('[data-type="search-input"]');
            searchElement && searchElement.click();  
        },

        onItemSelected: _.wrap(SiteSearchView.prototype.onItemSelected, function(fn)
        {
            this.onSCItemSelected.apply(this, _.toArray(arguments).slice(1));
        }),

        removeFocus: function()
        {
            var searchElement = self.$('[data-type="search-input"]');
            searchElement && searchElement.blur();  
        },

        destroy: _.wrap(SiteSearchView.prototype.destroy, function(fn)
        {
            fn.apply(this, _.toArray(arguments).slice(1));

            jQuery(window).off('resize', this._windowResizeHandler);

            this.off('afterViewRender',this.initPlugins, this);

            jQuery(document.body).off('click', this._body_click);
        }),

        executeSearch: function(keywords) 
        {
            var self = this;

            if (keywords)
            {
                self._executeSearch(keywords);     
            }                   
        },

        encodeComponent: function encodeComponent(val) {
            try {
                return encodeURIComponent(val).replace(/[^a-zA-Z0-9-.~_·%]/g, function (v) {
                    return ( '%' + v.charCodeAt(0).toString(16).toUpperCase());
                });
            }catch(e){
                console.warn('Error due to encodeComponent function shared by ACS team',e);
            }
        },

        _executeSearch: function(keywords) 
        {
            var search_url = Utils.getPathFromObject(Configuration, 'defaultSearchUrl');
            var delimiters = Utils.getPathFromObject(Configuration, 'facetDelimiters');
            var keywordsDelimited = delimiters
                ? delimiters.betweenFacetsAndOptions + 'keywords' + delimiters.betweenOptionNameAndValue
                : '?keywords=';
            var hash_fragment = null;
            var keywordsEncoded = this.encodeComponent(keywords);
            
            if (Utils.getPathFromObject(Configuration, 'currentTouchpoint') !== 'home') 
            {
                hash_fragment = search_url + keywordsDelimited + keywordsEncoded;
                
                window.location.href = Session.get('touchpoints.home') + '#' + hash_fragment;
            }
            // Else we stay in the same app
            else 
            {
                // We navigate to the default search url passing the keywords
                hash_fragment = search_url + keywordsDelimited + keywordsEncoded + this.getCurrentSearchOptions();

                Backbone.history.navigate(hash_fragment, { trigger: true });
            }

            if(enableBackToSearchResult && hash_fragment) 
            {
                Utils.setSearchResultUrlCookie(hash_fragment + '');
            }

            this.hideTrendingSearches();

            this.removeFocus();
        },

        onSCItemSelected: function(result)
        {
            var item = result.selectedItem;
            var category = result.selectedCategory;
            var collection = result['collection']
            ,   categories_collection = result['categories_collection'];
            var query = result.currentQuery;

            enableRecentlySearchedKeyword && Utils.setRecentlySearchKeywordOnCookie(jQuery.trim(query), 'add', numberOfRecentlySearchedKeyword, expiryOfRecentlySearchedKeywordCookie);

            this.$('[data-type="search-reset"]').hide();
            this.itemsSearcherComponent.cleanSearch(true); 

            if (item) 
            {
                var path = item.get('_url');

                if(item && item.get('internalid'))
                {
                    var item_type = item.get('itemtype');

                    var is_serialized_item = !!item.get('isserialitem');

                    var record_type = 'inventoryitem';

                    if (is_serialized_item) 
                    {
                        record_type = 'serializedinventoryitem';
                    } 
                    else if (item_type == 'Kit') 
                    {
                        record_type = 'kititem';
                    }
                    else if(item_type == 'NonInvtPart')
                    {
                        record_type = 'noninventoryitem';
                    }

                    if( allowUpdateTrendingProducts && showTrendingProducts )
                    {
                        try 
                        {
                            var product_model = new TrendingSearchFeatureModel();
                                product_model.set('recordType', record_type);
                                product_model.set('recordID', item.get('internalid'));
                                product_model.set('popularityCountFieldId', 'custitem_popularity_count'); 
                    
                            product_model.save().done(function()
                            {

                            })
                            .fail(function(ex)
                            { 
                                console.warn("error while updating product popularity count");
                            });
                        } 
                        catch (ex) 
                        {
                            console.log('exception caught during saving item record : ',ex);
                        }                        
                    }
                }

                if (Configuration.get('currentTouchpoint', '') !== 'home') 
                {
                    window.location.href = Session.get('touchpoints.home') + '#' + path;
                } 
                else 
                {
                    Backbone.history.navigate(path, { trigger: true });
                }
            } 
            else 
            {
                if( category )
                {
                    var path = category.get('relatedLink');

                    if(!!category && category.get('internalId'))
                    {
                        if( allowUpdateTrendingCategories && showTrendingCategories )
                        {
                            var category_model = new TrendingSearchFeatureModel();
                                category_model.set('recordType', 'customrecord_suite_commerce_search_data');
                                category_model.set('recordID', category.get('internalId'));
                                category_model.set('popularityCountFieldId', 'custrecord_popularity_count');
                        
                            category_model.save().done(function()
                            {

                            })
                            .fail(function(ex)
                            { 
                                console.warn("error while updating category popularity count");
                            });
                        }
                    }

                    if(enableBackToSearchResult) 
                    {
                        Utils.setSearchResultUrlCookie(path + '');
                    }

                    if (Configuration.get('currentTouchpoint', '') !== 'home') 
                    {
                        window.location.href = Session.get('touchpoints.home') + '#' + path;
                    } 
                    else 
                    {
                        Backbone.history.navigate(path, { trigger: true });
                    }
                }
                else
                {	
                    try
                    {
                        if (!collection.length && result.isResultCompleted) 
                        {
                            return false;
                        }
                        this.executeSearch(query);
                    }
                    catch(er)
                    {

                    }
                }                
            }

            if( allowFullscreenSearchMobile && query.trim() !== "" )
            {
                var goback = this.$el.find('[data-action="sc-pusher-dismiss"]');

                goback && _.defer(function(){
                    goback.click();
                });                
            }
            
            this.removeFocus();   

            this.hideTrendingSearches();                   
        }
    });
});
