
define(
	'StockStatusExtension.Shopping'
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
				this.initPDP(layout, environmentComponent);
				this.initCart(layout, environmentComponent);
				this.initQuickView(layout, environmentComponent);
			}
		}
	,	initPDP: function (layout, environmentComponent) {
			layout.addToViewContextDefinition('ProductDetails.Full.View', 'showInStock', 'boolean', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 1
						|| item_model.custitem_acs_stock_status == 2
						|| item_model.custitem_acs_stock_status == 4) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('ProductDetails.Full.View', 'showBackorder', 'boolean', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart != true) { 
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('ProductDetails.Full.View', 'showUnavailable', 'boolean', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart == true) { 
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('ProductDetails.Full.View', 'leadTimes', 'string', function (context) { 
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitemstockleadtimes) {
						return item_model.custitemstockleadtimes;
					}
				}
				return "";
			});
			layout.addToViewContextDefinition('ProductDetails.Full.View', 'stockStatus', 'string', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitemstockstatus) {
						return item_model.custitemstockstatus;
					}
				}
				return "";
			});	
			layout.addToViewContextDefinition('ProductDetails.Full.View', 'inStockDate', 'string', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitem25) {
						return item_model.custitem25;
					}
				}
				return "";
			});	
	}
	,	initCart: function (layout, environmentComponent) {
			layout.addToViewContextDefinition('Cart.Lines.View', 'showInStock', 'boolean', function (context) {
				if (context.item) {
					var item_model = context.item;
					if (item_model.custitem_acs_stock_status == 1 
						|| item_model.custitem_acs_stock_status == 2
						|| item_model.custitem_acs_stock_status == 4) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('Cart.Lines.View', 'showBackorder', 'boolean', function (context) {
				if (context.item) {
					var item_model = context.item;
					if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart != true) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('Cart.Lines.View', 'showUnavailable', 'boolean', function (context) {
				if (context.model) {
					var item_model = context.model.item;
						if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart == true) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('Cart.Lines.View', 'leadTimes', 'string', function (context) {
				if (context.item) {
					var item_model = context.item;
					if (item_model.custitemstockleadtimes) {
						return item_model.custitemstockleadtimes;
					}
				}
				return "";
			});
			layout.addToViewContextDefinition('Cart.Lines.View', 'stockStatus', 'string', function (context, model) {
				if (context.item) {
					var item_model = context.item;
					if (item_model.custitemstockstatus) {
						return item_model.custitemstockstatus;
					}
				}
				return "";
			});	
			layout.addToViewContextDefinition('Cart.Lines.View', 'inStockDate', 'string', function (context) {
				if (context.item) {
					var item_model = context.item;
					if (item_model.custitem25) {
						return item_model.custitem25;
					}
				}
				return "";
			});	
		}
	,	initQuickView: function (layout, environmentComponent) {
			layout.addToViewContextDefinition('ProductDetails.QuickView.View', 'showInStock', 'boolean', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 1
						|| item_model.custitem_acs_stock_status == 2
						|| item_model.custitem_acs_stock_status == 4 ) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('ProductDetails.QuickView.View', 'showBackorder', 'boolean', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart != true) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('ProductDetails.QuickView.View', 'showUnavailable', 'boolean', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitem_acs_stock_status == 3 && item_model.custitemitemhideaddtocart == true) {
						return true;
					}
				}
				return false;
			});
			layout.addToViewContextDefinition('ProductDetails.QuickView.View', 'leadTimes', 'string', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitemstockleadtimes) {
						return item_model.custitemstockleadtimes;
					}
				}
				return "";
			});
			layout.addToViewContextDefinition('ProductDetails.QuickView.View', 'stockStatus', 'string', function (context) {
				if (context.model) {
					var item_model = context.model.item;
					if (item_model.custitemstockstatus) {
						return item_model.custitemstockstatus;
					}
				}
				return "";
			});	
			layout.addToViewContextDefinition('ProductDetails.QuickView.View', 'inStockDate', 'string', function (context) {
				if (context.model) {
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
