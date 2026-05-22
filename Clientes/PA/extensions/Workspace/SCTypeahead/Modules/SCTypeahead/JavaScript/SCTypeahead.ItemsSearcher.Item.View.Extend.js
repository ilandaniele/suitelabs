define('SCTypeahead.ItemsSearcher.Item.View.Extend', [
    'ItemsSearcher.Item.View',
    'SCTypeahead.NoResults.View',
    'SC.Configuration',
    'Backbone',
    'Utils',
    'underscore'
], function(
    ItemsSearcherItemView,
    NoResultsView,
    Configuration,
    Backbone,
    Utils,
    _
) {
    'use strict';

    var allowStaticCategoriesWhenNoResult = Configuration.get('sctypeahead.noresults.allowStaticCategoriesWhenNoResult');

    var categories_noresults = Configuration.get('sctypeahead.noresults.staticCategories');

    var message_noresults = Configuration.get('sctypeahead.noresults.message');

    _.extend(ItemsSearcherItemView.prototype,{

        childViews: _.extend(ItemsSearcherItemView.prototype.childViews, {

            'Categories.NoResults': function()
            {
                var collection_categories_noresults = new Backbone.Collection( allowStaticCategoriesWhenNoResult ? categories_noresults : []);

                return new NoResultsView({
                    collection: collection_categories_noresults
                });
            }
        }),

        getContext: _.wrap(ItemsSearcherItemView.prototype.getContext, function(fn)
        {
            var parent_context = fn.apply(this, _.toArray(arguments).slice(1));

            var is_category = false, correctedSearchTerm = '', words_correctedSearchTerm = [], words_currentQuery = [], common = [], needHighlight = true;

            if( !!this.model )
            {
                is_category = !!this.model.get('correctedSearchTerm');

                if( is_category ) 
                {
                    correctedSearchTerm = this.model.get('correctedSearchTerm').toLowerCase();
                }
            }

            var currentQuery = parent_context.currentQuery;

            if( is_category && correctedSearchTerm )
            {
                currentQuery = currentQuery.toLowerCase();

                words_correctedSearchTerm = correctedSearchTerm.split(/\s+/g);
                words_currentQuery = currentQuery.split(/\s+/g);
                common = _.intersection(words_correctedSearchTerm, words_currentQuery);
                needHighlight = currentQuery !== correctedSearchTerm;
                
                if( common && common.length && needHighlight )
                {
                    //currentQuery = common[0];
                }
            }

            if( !allowStaticCategoriesWhenNoResult )
            {
                message_noresults = 'No Products Found';
            }   

            var updated_context = _.extend(parent_context,{
                currentQuery: currentQuery,
                isExtensionEnabled: true,
                message_noresults: Utils.translate(message_noresults, currentQuery),
                common_keywords: common
            });

            return updated_context;
        })        
    });
});
