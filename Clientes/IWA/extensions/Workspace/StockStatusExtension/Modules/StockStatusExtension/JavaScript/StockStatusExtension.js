
define(
	'StockStatusExtension'
,   [
		'Facets.ItemCell.View.Extension'
	]
,   function (
		FacetsItemCellViewExtension
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			var layout = container.getComponent('Layout');
			var environmentComponent = container.getComponent('Environment');
			if(layout) {
				var checkout = container.getComponent('Checkout');
				if(checkout) {
					this.initTransactionLines(layout, environmentComponent);
				}
			}
		}
	,	initTransactionLines: function (layout, environmentComponent) {
			layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Navigable.View', 'showInStock', 'boolean', function (context) {
				if (context.model.item) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 1
						|| item_model.custitem_acs_stock_status == 2
						|| item_model.custitem_acs_stock_status == 4 ) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Navigable.View', 'showBackorder', 'boolean', function (context) {
				if (context.model.item) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart != true) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Navigable.View', 'showUnavailable', 'boolean', function (context) {
				if (context.model.item) {
					var item_model = context.model.item;
						if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart == true) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Navigable.View', 'leadTimes', 'string', function (context) {
				if (context.model.item) {
					var item_model = context.model.item;
					if (item_model.custitemstockleadtimes) {
						return item_model.custitemstockleadtimes;
					}
				}
				return "";
			});
			layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Navigable.View', 'stockStatus', 'string', function (context, model) {
				if (context.model.item) {
					var item_model = context.model.item;
					if (item_model.custitemstockstatus) {
						return item_model.custitemstockstatus;
					}
				}
				return "";
			});	
			layout.addToViewContextDefinition('Transaction.Line.Views.Cell.Navigable.View', 'inStockDate', 'string', function (context) {
				if (context.model.item) {
					var item_model = context.model.item;
					if (item_model.custitem25) {
						return item_model.custitem25;
					}
				}
				return "";
			});
		}
	};
});
