define('SCTypeahead.Categories.Collection', [
    'Backbone',
    'Backbone.CachedCollection',
    'SC.Configuration',
    'SCTypeahead.Categories.Model',
    'SCTypeahead.StringLookup.Utils',
    'underscore',
    'Utils'
], function(
    Backbone,
    BackboneCachedCollection,
    Configuration,
    SCTypeaheadCategoriesModel,
    StringLooupUtilities,
    _,
    Utils
) {
    'use strict';

    var original_fetch = BackboneCachedCollection.prototype.fetch;

    return BackboneCachedCollection.extend({
        
        model: SCTypeaheadCategoriesModel,

        url: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/SCTypeahead.Service.ss"
            )
        ),

        options: { cache: true },

        fetch: function(options) 
        {
            _.extend(this.options, options || {});

            return original_fetch.apply(this, arguments);
        },

        sortByRelevency: function(categories)
        {
            //EXAMPLE - Keyword => Lower Receiver
            
            var search_keyword = this.options.data.keyword.toString().toLowerCase().replace(/[^\w\s]/gi, '');; //converting to lowercase and replacing special characters => lower receiver

            var words = search_keyword.split(/\s+/); //separating keyword by space => ['lower', 'receiver'];

            var minimumWeightageRequiredForSuggestion_Percent = Configuration.get('sctypeahead.topsearchedcategories.minimumWeightage') || 25;

            var filterCategoriesByWeightage = Configuration.get('sctypeahead.topsearchedcategories.filterCategoriesByWeightage');

            var minimumWeightageRequiredForSuggestion = Math.floor( minimumWeightageRequiredForSuggestion_Percent/100 * search_keyword.replace(/\s+/g, '').length );

            for( var i=0; i<categories.length; i++)
            {
                var category = categories[i];

                var correctedSearchTerm = category.correctedSearchTerm.toString().toLowerCase().replace(/[^\w\s]/gi, ''); //converting to lowercase and replacing special characters
                
                var searchQuery = category.searchQuery.toString().toLowerCase().replace(/[^\w\s]/gi, ''); //converting to lowercase and replacing special characters

                var weightage_correctedSearchTerm = StringLooupUtilities.getStringCompareScore(correctedSearchTerm, search_keyword); //compare 'lower receiver' against column correctedSearchTerm

                var weightage_searchQuery = StringLooupUtilities.getStringCompareScore(searchQuery, search_keyword); //compare 'lower receiver' against column searchQuery

                var weightage_final = Math.max(weightage_searchQuery, weightage_correctedSearchTerm); //comparing both the columns to see if we get higher relevency

                category.weightage = weightage_final;   //pickup the column having higher weightage

                category.word_count = 0;

                category.startsWithCount = 0;

                if( correctedSearchTerm.indexOf(search_keyword) === 0 ) //pulling all the categories up in the order which are starting with "lower receiver"
                {
                    category.startsWithCount++;
                }

                if( words.length > 2 && correctedSearchTerm.indexOf(words[0]) === 0 && correctedSearchTerm.indexOf(words[words.length-1]) >= 0 ) // checking first and last word, if any catgory which is starting with first word and ending with last word then pull it up. i.e. 9mm complete upper
                {
                    category.startsWithCount++;
                }

                for( var j=0; j<words.length; j++) //check for individual keyword match for ['lower', 'receiver'];
                {
                    var word = words[j];
                    
                    if( searchQuery.indexOf(word) >=0 )
                    {
                        category.word_count++;
                    }

                    if( correctedSearchTerm.indexOf(word) >= 0 )
                    {
                        category.word_count++;
                    }
                }
            }

            var categories_relevent = categories.sort(function(a,b){
                
                return  b.startsWithCount - a.startsWithCount || //show suggestion starting with search keyword & with maximum similarity 1st in the order => Lower Receiver
                        b.weightage - a.weightage || //show suggestion which are not starting with keyword but has maximum similarity 2nd in the order => AR-15 Lower Receiver
                        b.word_count - a.word_count ||  //show suggestion which neither starting with keyword nor has maximum similarity but has related keywords, 3rd in the order = >AR-15 Lower Part, AR-15 Upper Receiver
                        a.correctedSearchTerm.length - b.correctedSearchTerm.length; //sort by displayed term size, so that smaller and accurate one shall appear on top => Lower Receiver, AR-15 Lower Receiver, AR-308 Lower Receiver
            });

            if( filterCategoriesByWeightage )
            {
                console.log('minimumWeightageRequiredForSuggestion : ',minimumWeightageRequiredForSuggestion);

                categories_relevent = categories_relevent.slice().filter(function(category){

                    return category.weightage >= minimumWeightageRequiredForSuggestion;
    
                });
            }
            
            return categories_relevent;
        },

        parse: function(response) 
        {
            var isMobile = Utils.isPhoneDevice() || Utils.isTabletDevice();

            var max_results = 25;

            if( isMobile )
            {
                max_results = Configuration.get('sctypeahead.topsearchedcategories.maxCategoriesToBeShownMobile') || 6;
            }
            else
            {
                max_results = Configuration.get('sctypeahead.topsearchedcategories.maxCategoriesToBeShown') || 25;
            }

            var categories = _.filter(response, function(category) 
            {
            	return category.correctedSearchTerm.trim() !== "" && category.relatedLink.trim() !== "";
            });

            var categories_filtered = _.without(categories, null, "") || [];

            var categories_sorted = this.sortByRelevency(categories_filtered).slice(0,max_results);

            return categories_sorted;
        }
    });
});
