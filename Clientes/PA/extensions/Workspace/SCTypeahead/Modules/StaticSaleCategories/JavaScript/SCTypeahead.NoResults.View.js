define('SCTypeahead.NoResults.View'
,	[
        'sc_typeahead_noresults.tpl'
    ,   'sc_typeahead_categories_row.tpl'
    ,   'sc_typeahead_categories_cell.tpl'
    ,   'SCTypeahead.Categories.ActiveSale.View'
    ,	'SC.Configuration'
    ,   'Backbone.CollectionView'
	,	'Utils'
	,	'jQuery'	
	,	'Backbone'
	,	'underscore'
    ]
, function (
        sc_typeahead_noresults_tpl
    ,   sc_typeahead_categories_row_tpl
    ,   sc_typeahead_categories_cell_tpl
    ,   CategoriesActiveSaleView
    ,	Configuration
    ,   BackboneCollectionView
	,	Utils
	,	jQuery
	,	Backbone
	,	_
)
{
    'use strict';

	return Backbone.View.extend({

        template: sc_typeahead_noresults_tpl

    ,   childViews: {
            'Categories.ActiveSale': function()
            {
                return new BackboneCollectionView({
                    collection: this.collection,
                    childView: CategoriesActiveSaleView,
                    cellTemplate: sc_typeahead_categories_cell_tpl,
                    rowTemplate: sc_typeahead_categories_row_tpl,
                    viewsPerRow: (Utils.isDesktopDevice() ? 3 : Utils.isTabletDevice() ? 2 : 1)
                });
            }
        }

	,	initialize: function () 
		{
            this.collection = this.options.collection;           
		}

	,	getContext: function getContext()
		{

			return {    

			};
		}
	});
});
