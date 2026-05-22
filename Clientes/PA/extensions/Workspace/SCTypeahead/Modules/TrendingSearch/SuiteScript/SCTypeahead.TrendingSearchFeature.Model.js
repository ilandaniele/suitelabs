/*
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

define('SCTypeahead.TrendingSearchFeature.Model', [

    'SC.Model'

], function (SCModel) {

    'use strict';

    return SCModel.extend({

        name: 'SCTypeahead.TrendingSearchFeature.Model',

        update: function(data)
        {
            if(data.recordType && data.recordID)
            {
                var current_popularity_count = nlapiLookupField( data.recordType, data.recordID, data.popularityCountFieldId);

                if(!!current_popularity_count)
                {
                    nlapiSubmitField( data.recordType, data.recordID, data.popularityCountFieldId, parseInt(current_popularity_count, 10) + 1 || 1 );
                }
                else
                {
                    nlapiSubmitField( data.recordType, data.recordID, data.popularityCountFieldId, 1);
                }
                return {};
            }
            
            return {};
        },

        get: function(data) 
        {
            var column_names = data.columns || [];
            var record_type = data.recordType;
            var search_limit = data.recordLimit;

            var columns = [ 
                new nlobjSearchColumn('internalid').setSort(false) 
            ];
            var filters = [];

            for( var i=0; i<column_names.length; i++)
            {
                columns.push( new nlobjSearchColumn(column_names[i]) );

                filters.push([column_names[i], "isnotempty", ""]);

                if( i < column_names.length - 1)
                {
                    filters.push("AND");
                }
            }

            var recordValues = nlapiSearchRecord( record_type, null, filters, columns);
            var result = [];

            if(!!recordValues)
            {
                for ( var i = 0; i <  Math.min( search_limit, recordValues.length); i++) 
                {
                    var tempObject = {};
                    tempObject['internalId'] = recordValues[i].getId();
                    
                    for( var j=0; j<column_names.length; j++)
                    {
                        if( column_names[j] === 'custrecord_tsi_item_name')
                        {
                            tempObject[column_names[j]] = recordValues[i].getText(column_names[j]);
                        }
                        else
                        {
                            tempObject[column_names[j]] = recordValues[i].getValue(column_names[j]);
                        }                        
                    }
                    result.push(tempObject);                    
                }
            }

            return result;
        }
    });

}); 
