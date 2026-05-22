/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Facets
define(
	'Facets.ItemCell.View.Extension'
,	[
        'Facets.ItemCell.View'
	,	'SC.Configuration'
	,	'Utils'

	,	'Backbone'
	,	'Backbone.CompositeView'
	,	'Backbone.CollectionView'
	,	'underscore'
	]
,	function (
        FacetsItemCellView
	,	Configuration
	,	Utils

	,	Backbone
	,	BackboneCompositeView
	,	BackboneCollectionView
	,	_
	)
{
	'use strict';

	_.extend(FacetsItemCellView.prototype, {

		getContext: _.wrap(FacetsItemCellView.prototype.getContext, function (fn) {
			var currentContext = fn.apply(this, _.toArray(arguments).slice(1));
			if (!SC.isPageGenerator()) {
				if(SC && SC.SESSION && SC.SESSION.touchpoints) {
					var catThumbUrl = SC.SESSION.touchpoints.home + this.model.get("custitemcatthumb");
					return _.extend(currentContext, {
						stockStatus: this.model.get("custitemstockstatus"),
						showUnavailable: this.model.get("custitem_acs_stock_status") === 3 && this.model.get("custitemitemhideaddtocart") == true,
						custitemcatthumb: catThumbUrl, //category thumbnail image, customization for cellarpro
						custitemswatches_category: this.model.get("custitemswatches_category"), //swatches for lecache
						custitem_capacity: this.model.get("custitem_capacity"),
						custitem_size: this.model.get("custitem_size") 
					});
				}
			}
			
			return currentContext;
		})
	});
});
