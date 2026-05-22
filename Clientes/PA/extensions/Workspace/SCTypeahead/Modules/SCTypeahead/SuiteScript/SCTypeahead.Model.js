/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

define('SCTypeahead.Model', [

    'SC.Model',

    'Application',

    'StoreItem.Model',

    'SiteSettings.Model',

    'Configuration',

    'Utils',

    'underscore'

], function (SCModel, Application, StoreItem, SiteSettingsModel, Configuration, Utils, _) {

    'use strict';

    return SCModel.extend({

        name: 'SCTypeahead.Model',

        getKeywordSuggestion: function( keyword )
        {
            if( keyword && keyword.trim() !== "")
            {
                return this.searchHelper( keyword );
            }
            return [];
        },

        searchHelper: function( keyword ) 
        {
            var siteSettings = SiteSettingsModel.get();

            var site_id = siteSettings.siteid;

            var keyword_original = keyword;

            var keyword_lowercase = keyword_original.toLowerCase();
            
            var keywords_array = keyword_lowercase.split(/\s+/); //separating keyword by spaces
            
            keywords_array = keywords_array.concat(keyword_lowercase.match(/[a-zA-Z]+/gi)); //pulling all words

            keywords_array = keywords_array.concat(keyword_lowercase.match(/[\d|.|\+]+/gi)); //pulling all numerics
            
            keywords_array = _.uniq(_.without(keywords_array, null, false, "undefined", ""," ")) || []; //removing falsey and duplicated keywords
            
            keywords_array = keywords_array.filter(function(individual_keyword){
                return individual_keyword && individual_keyword.length >= 2;
            });; //removing single character word

            var splitKeywordForSearching = Configuration.get('sctypeahead.topsearchedcategories.splitKeywordForSearching');

            var is_multi_keyword = keywords_array && keywords_array.length;

            var filterExpression = [
                [
                    ["formulatext: LOWER({custrecord_scsd_search_query})","contains", keyword_lowercase],
                    "OR",
                    ["formulatext: LOWER({custrecord_scsd_corrected_search_term})","contains", keyword_lowercase],
                ],
                "AND", 
                ["custrecord_scsd_related_cat_link","isnotempty",""],
                "AND", 
                ["isinactive","is","F"],
                "AND", 
                ["custrecord_scsd_website","anyof",site_id,"@NONE@"]
            ];

            if( is_multi_keyword && splitKeywordForSearching) 
            {
                for( var i=0; i<keywords_array.length; i++)
                {
                    var individual_keyword = keywords_array[i] && keywords_array[i].trim();

                    if( individual_keyword && individual_keyword.length >= 2)
                    {
                        filterExpression[0].push('OR', ["formulatext: LOWER({custrecord_scsd_corrected_search_term})","contains", individual_keyword], 'OR', ["formulatext: LOWER({custrecord_scsd_search_query})","contains", individual_keyword]);                        
                    }            
                }
            }

            var columns = [
                new nlobjSearchColumn("name"), 
                new nlobjSearchColumn("custrecord_scsd_search_query"), 
                new nlobjSearchColumn("custrecord_scsd_corrected_search_term"), 
                new nlobjSearchColumn("custrecord_scsd_related_cat_link"),
                new nlobjSearchColumn("custrecord_scsd_top_searched_products"), 
                new nlobjSearchColumn("created").setSort(true) //sorting by date created, descending. it means latest created record would be on top
            ];

            var keywords_suggestion_rows = [];

            var result = nlapiSearchRecord('customrecord_suite_commerce_search_data', null, filterExpression, columns);

            if (result) 
            {
                result.forEach(function( keywords_suggestion ) 
                {
                    var keywords_suggestion_row = {};

                    keywords_suggestion_row.internalId = keywords_suggestion.getId();

                    keywords_suggestion_row.name = keywords_suggestion.getValue('name');

                    keywords_suggestion_row.popularityCount = keywords_suggestion.getValue('custrecord_popularity_count');

                    keywords_suggestion_row.searchQuery = keywords_suggestion.getValue('custrecord_scsd_search_query');

                    keywords_suggestion_row.correctedSearchTerm = keywords_suggestion.getValue('custrecord_scsd_corrected_search_term');

                    keywords_suggestion_row.relatedLink = keywords_suggestion.getValue('custrecord_scsd_related_cat_link');

                    keywords_suggestion_row.topSearchedProductUrl = keywords_suggestion.getValue('custrecord_scsd_top_searched_products');

                    keywords_suggestion_row.dateCreated = keywords_suggestion.getValue('created');

                    if( keywords_suggestion_row.relatedLink && keywords_suggestion_row.relatedLink.trim() !== "" && keywords_suggestion_row.correctedSearchTerm && keywords_suggestion_row.correctedSearchTerm.trim() !== "") //Filtering invalid rows
                    {
                        keywords_suggestion_rows.push(keywords_suggestion_row);
                    }
                    
                });
                //removing identical rows
                keywords_suggestion_rows = _.uniq(keywords_suggestion_rows, function(result){
                    return result.correctedSearchTerm;
                });
            }
            return keywords_suggestion_rows;
        },

    });

});
