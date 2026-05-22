define('SCTypeahead.RecentlySearched.View'
,	[
        'sc_typeahead_recently_searched.tpl'
    ,   'SC.Configuration'
    ,   'SCTypeahead.RecentlySearched.Collection'
	,	'Utils'
	,	'jQuery'	
	,	'Backbone'
	,	'underscore'
    ]
, function (
        sc_typeahead_recently_searched_tpl
    ,   Configuration
    ,   RecentlySearchedCollection
	,	Utils
	,	jQuery
	,	Backbone
	,	_
)
{
    'use strict';

    var enableRecentlySearchedKeyword = Configuration.get('sctypeahead.recentlySearched.enableRecentlySearchedKeyword');
    var numberOfRecentlySearchedKeyword = Configuration.get('sctypeahead.recentlySearched.numberOfRecentlySearchedKeyword') ?  parseInt(Configuration.get('sctypeahead.recentlySearched.numberOfRecentlySearchedKeyword')) : 10;
    var expiryOfRecentlySearchedKeywordCookie = Configuration.get('sctypeahead.recentlySearched.expiryOfRecentlySearchedKeywordCookie') ?  parseInt(Configuration.get('sctypeahead.recentlySearched.expiryOfRecentlySearchedKeywordCookie')) : 365;

	return Backbone.View.extend({

        template: sc_typeahead_recently_searched_tpl

    ,   initialize: function(options)
        {
            this.collection = new RecentlySearchedCollection(Utils.getRecentlySearchKeywordFromCookie(), {parse: true});
        }

    ,   events: {
            'click [data-action="apply-rencent-search"]': 'onClickingRecentKeyword',
            'click [data-action="remove-key"]': 'removeRecentlySearchKeyword'
        }

    ,   onClickingRecentKeyword: function(e)
        {
            e.preventDefault();

            var self = this,
                keywordText = jQuery(e.target).text(),
                searchElement = self.$el.closest('[data-type="site-search"]').find('[data-type="search-input"]'),
                resetElement = self.$el.closest('[data-type="site-search"]').find('[data-type="search-reset"]');

            searchElement.val("");
            _.delay(function(e) {
                searchElement.val(keywordText);
                searchElement.focus();
                resetElement.show();
                _.delay(function(e) {
                    searchElement.trigger("input");        
                }, 200);      
            }, 300);

            return false;
        }

    ,   removeRecentlySearchKeyword: function(e)
        {
            e.preventDefault();
            var targetElement = jQuery(e.target);
            var data_index = targetElement && parseInt(targetElement.attr('data-index'), 10);
            var data_key = targetElement && targetElement.attr('data-key');

            if( data_index >=0 && this.collection.length > 0)
            {
                data_key && Utils.setRecentlySearchKeywordOnCookie(data_key, 'remove', numberOfRecentlySearchedKeyword,  expiryOfRecentlySearchedKeywordCookie);

                this.collection.remove(this.collection.at(data_index));
                
                Backbone.trigger('recently_searched_collection_changed');
            }
            return false;
        }

	,	getContext: function getContext()
		{
            return {    
                recentKeywordsPositiveLength: this.collection.length > 0 ? true : false,
                recentKeywords: this.collection
			};
		}
	});
});
