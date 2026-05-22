define('SCTypeahead.Categories.ActiveSale.View'
,	[
		'sc_typeahead_categories_activesale.tpl'
    ,	'SC.Configuration'
    ,   'Backbone.CollectionView'
	,	'Utils'
	,	'jQuery'	
	,	'Backbone'
	,	'underscore'
    ]
, function (
        sc_typeahead_categories_activesale_tpl
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

        template: sc_typeahead_categories_activesale_tpl


	,	initialize: function () 
		{

		}

	,	getContext: function getContext()
		{
			return {    
				categoryBackgroundUrl: this.model.get('categoryBackgroundUrl') || '',
				categoryLabel: this.model.get('categoryLabel') || '',
				categoryDescription: this.model.get('categoryDescription') || null,
				categoryRedirectUrl: this.model.get('categoryRedirectUrl') || '',
			};
		}
	});
});
