var extensions = {};

extensions['SSD.BackbonePluginInstaller.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/BackbonePluginInstaller/1.0.0/' + asset;
}


define(
	'BackbonePluginInstaller'
,   [
		'Backbone.PluginInstaller'
	]
,   function (
		BackbonePluginInstaller
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{

		}
	};
});


define('Backbone.PluginInstaller', [
    'PluginContainer',
    'Backbone',
    'underscore',
    'Backbone.View.render'

], function BackbonePluginInstaller(
    PluginContainer,
    Backbone,
    _
) {
    'use strict';

    var installPlugin = {
        installPlugin: function installPlugin(container, plugin) {
            if (!this[container]) {
                this[container] = new PluginContainer();
            }
            this[container].install(plugin);
        }
    };
    _.extend(Backbone.Model.prototype, installPlugin);
    _.extend(Backbone.View.prototype, installPlugin);
    _.extend(Backbone.Router.prototype, installPlugin);
});


};

extensions['SSD.CustomCSSFileExtension.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/CustomCSSFileExtension/1.0.0/' + asset;
}


define(
	'CustomCSSFileExtension'
	, [

	]
	, function (

	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
                var environmentComponent = container.getComponent("Environment");
				
                container.getLayout().on('beforeRender', function () {
                    var url = environmentComponent.getConfig("customCssFile.stylesheetUrl") || "";
                    if(url && url.length > 0) {
                        jQuery('head').append('<link rel="stylesheet" href="' + url + '">');
                    }
                });
			}
		};
	});


};

extensions['SuiteLabs.HeaderReorganization.1.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/HeaderReorganization/1.0.1/' + asset;
}

define('HeaderReorganization.Header.Profile.View', [
    'Header.Profile.View',
    'header_reorganization_header_profile.tpl',
    'underscore'
], function HeaderReorganizationHeaderProfileView(
    HeaderProfileView,
    HeaderReorganizationHeaderProfileTpl,
    _
) {
    'use strict';

    _.extend(HeaderProfileView.prototype, {
        template: HeaderReorganizationHeaderProfileTpl
    });
});


define('SuiteLabs.HeaderReorganization.Main', [
    'Header.Profile.View',
    'SC.Configuration',
    'HeaderReorganization.Header.Profile.View'
], function SuiteLabsHeaderReorganizationMain(
    HeaderProfileView,
    Configuration
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var application = container.getLayout().application;

            if (layout) {
                layout.addChildView('Header.Reorganization', function HeaderReorganization() {
                    return new HeaderProfileView({
                        attributes: {
                            'class': 'header-menu-profile'
                        },
                        showMyAccountMenu: true,
                        application: application
                    });
                });

                layout.addToViewContextDefinition('Header.Profile.View', 'headerWelcomeText', 'string', function addContextDefinition() {
                    return Configuration.header.welcomeText;
                });

                layout.addToViewContextDefinition('Header.View', 'headerWelcomeText', 'string', function addContextDefinition() {
                    return Configuration.header.welcomeText;
                });
            }
        }
    };
});


};

extensions['NSeComm.MegaMenu.1.0.3'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/NSeComm/MegaMenu/1.0.3/' + asset;
}

/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.MegaMenu', [
    'Header.Menu.View',
    'mega_menu.tpl',
    'underscore'
], function NSeCommMegaMenu(
    HeaderMenuView,
    megaMenuTpl,
    _
) {
    'use strict';

    _.extend(HeaderMenuView.prototype, {
        template: megaMenuTpl
    });
});


};

extensions['NSeComm.Path2ResponsePixel.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/NSeComm/Path2ResponsePixel/1.0.0/' + asset;
}

/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.Path2ResponsePixel.Main', [
    'jQuery'
],
function Path2ResponsePixel(
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
            var url = environment.getConfig('pathTwoResponse.url');

            if (layout) {
                layout.on('afterShowContent', function path2ResponsePixel() {
                    jQuery('#path2ResponsePixel').remove();
                    jQuery('#main').append('<img id="path2ResponsePixel" height="1" width="1" class="hide" src="' + url + '"/>');
                });
            }
        }
    };
});


};

extensions['ACS.RemovePOForNonB2B.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/RemovePOForNonB2B/1.0.0/' + asset;
}

define('RemovePOForNonB2B', [
    'underscore'
], function InfiniteScrollFix(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {

            try {

                var SuiteCommerceCustomFieldsCheckoutGroupView = require('SuiteCommerce.CustomFields.Checkout.Group.View');
                var Instrumentation_1 = require('SuiteCommerce.CustomFields.Instrumentation');

                if (SuiteCommerceCustomFieldsCheckoutGroupView) {
                    _(SuiteCommerceCustomFieldsCheckoutGroupView.GroupView.prototype).extend({
                        fetchModel: function () {
                            var userprofilecomponent = container.getComponent('UserProfile');
                            var self = this;

                            userprofilecomponent.getUserProfile().then(function (profile) {
                                var that = self;
                                
                                var _this = that;
                                var fieldIds = that.model.fields
                                    .map(function (field) {
                                        return field.fieldId;
                                    })
                                    .join(',');

                                var fetchCustomField = Instrumentation_1.default.getLog('fetchCustomField');
                                fetchCustomField.startTimer();
                                that.setIsLoading(true);
                                that.setIsLoadingError(false);
                                that.model
                                    .fetch({
                                        data: {
                                            fields: fieldIds,
                                        },
                                    })
                                    .fail(function () {
                                        _this.setIsLoadingError(true);
                                    })
                                    .always(function () {
                                        fetchCustomField.endTimer();
                                        fetchCustomField.setParameters({
                                            activity: 'Checkout Custom Field Loaded',
                                            totalTime: fetchCustomField.getElapsedTimeForTimer(),
                                        });
                                        fetchCustomField.submit();
                                        _this.setIsLoading(false);
                                        _this.refresh();

                                        var isb2b = profile.customfields.find(function (cf) {
                                            return cf.id == 'custentity_cu_type'
                                        });
                                        var showPO = isb2b && isb2b.value && isb2b.value != '1';

                                        if(!showPO){
                                            jQuery('#custom-fields-checkout-custbody24').hide();
                                        }else{
                                            jQuery('#custom-fields-checkout-custbody24').show();
                                        } 
                                    });
                            });
                        }
                    });
                }
            } catch (e) {

            }
        }
    };
});


};

extensions['SuiteLabs.SearchRecommendations.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/SearchRecommendations/1.0.0/' + asset;
}

define('SearchRecommendations.View', [
    'SCView',
    'search_recommendations.tpl'
], function SearchRecommendationsViewModule(
    SCViewComponent,
    SearchRecommendationsTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function SearchRecommendationsView() {
        SCView.call(this);
        this.template = SearchRecommendationsTpl;
    }

    SearchRecommendationsView.prototype = Object.create(SCView.prototype);

    SearchRecommendationsView.prototype.constructor = SearchRecommendationsView;

    SearchRecommendationsView.prototype.getContext = function getContext() {
        return {};
    };

    return SearchRecommendationsView;
});


define('SuiteLabs.SearchRecommendations.Main', [
    'SearchRecommendations.View'
], function SuiteLabsSearchRecommendationsMain(
    SearchRecommendationsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            if (layout) {
                layout.addChildView('SiteSearch', function addSearchRecommendationsView() {
                    return new SearchRecommendationsView({ container: container });
                });
            }
        }
    };
});


};

extensions['SSD.SignifydTrackerExtension.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/SignifydTrackerExtension/1.0.0/' + asset;
}

define(
    'OrderWizard.SignifydTracker'
    ,	[	'Wizard.Module'
        ,	'underscore'
    ]
    ,	function (
        WizardModule
        ,	_
    )
    {
        'use strict';
        return WizardModule.extend(
            {
                initialize: function()
                {
                    var self = this;
                    WizardModule.prototype.initialize.apply(this, arguments);
                    self.application = self.options.wizard.application;
                },

                render: function () {
                    if (!SC.isPageGenerator()) {
                        var self = this;
                        var options = self.options.wizard.model.get("options");
                        if(options) {
                            var signifyd_session_id = options.custbody_f3_signifyd_session_id ? options.custbody_f3_signifyd_session_id : "";
                            if(signifyd_session_id.length <= 0) {
                                options.custbody_f3_signifyd_session_id = jQuery.cookie("SignifydSessionId");
                                self.options.wizard.model.set("options", options);   
                                self.options.wizard.model.save().done(function (response) {
                                    
                                });
                            }
                        }
                    }
                },

            	getContext: function ()
                {
                    return { };
                }
            });
    });


define( 'SignifydTracker', [
    'SignifydTracker.Model',
	'Tracker',
	'underscore',
	'jQuery'

], function (
    SignifydTrackerModel,
    Tracker,
    _,
    jQuery

) {

    var SignifydTracker = {
        trackTransaction: function ( order ) {
            if ( SC.ENVIRONMENT.jsEnvironment === 'browser' ) {
                try {
                    var config = this.application.getConfig( 'signifyd' );
                    if (config && config.enableSignifyd) {
                        var self = this;
                        //console.log("order", order);
                        var signifydTrackerModel = new SignifydTrackerModel();
                        var request = {
                            "purchase": {
                                "orderSessionId": $.cookie("SignifydSessionId"),
                                "browserIpAddress": "192.168.1.1",
                                "orderId": order.get('confirmationNumber'),
                                "createdAt": (new Date).toISOString(),
                                "transactionId": order.get('confirmationNumber'),
                                "currency": "USD",
                                "orderChannel": "WEB",
                                "totalPrice": order.get('total').toFixed(2).toString(),
                                "discountcodes": self.getDiscountCodes(order),
                                "shipments": self.getShipments(order),
                                "products": self.getProducts(order),
                            }
                        };
                        var promise = signifydTrackerModel.save(request);
                        if(promise) {
                            promise.always(function (response) {
                                //console.log("response", response);
                            });
                        }
                    }
                }
                catch (ex) {
                    console.log(ex);
                }
            }
            
            jQuery.cookie("SignifydSessionId", null, {path:'/'});
            return this;
        },

        getDiscountCodes: function (order) {
            var output = [];
            return output;
        },

        getShipments: function (order) {
            var output = [];

            return output;
        },

        getProducts: function (order) {
            var output = [];
            order.get( 'products' ).each( function ( product ) {
                output.push({
                    "itemId": product.get('sku').toString(),
                    "itemName": product.get('name').toString(),
                    "itemIsDigital": false,
                    "itemCategory": product.get('category') || '',
                    "itemQuantity": product.get('quantity').toString(),
                    "itemPrice": product.get('rate').toString(),
                    "shipmentId": ""
                });
            });

            return output;
        },
        setCookie: function (key, value, expiry) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
        },
    
        getCookie: function (key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        },

        setUp: function () {
            
            var signifydSessionId = this.getCookie("SignifydSessionId");
            if(signifydSessionId == null || signifydSessionId == "null") {
                signifydSessionId = Math.random().toString(36).substr(2, 9) + "_" + Math.random().toString(36).substr(2, 9);
                this.setCookie("SignifydSessionId", signifydSessionId, 7);
            }
            if(signifydSessionId != null && document.getElementById('sig-api') == null) {
                var s = document.createElement('script');
                var e = !document.body ? document.querySelector('head') : document.body;
                s.src = 'https://cdn-scripts.signifyd.com/api/script-tag.js';
                s.defer = true;
                s.id="sig-api";
                s.setAttribute("data-order-session-id", signifydSessionId);
                //e.appendChild(s);

                jQuery("head").append(s);
            }
        }
    };

    return SignifydTracker;
} );


define(
	'SignifydTracker.Model'
,	[
		'underscore'
	,	'Backbone'
	,	'Utils'
	]
,	function (
		_
	,	Backbone
	,	Utils
	)
{
	'use strict';

	return Backbone.Model.extend({

        urlRoot: Utils.getAbsoluteUrl('services/SignifydTracker.Service.ss')
	});
});



define(
	'SignifydTrackerExtension.Checkout',   
	[ 
		'SignifydTracker',
        'Tracker'
	]
,   function 
	(
		SignifydTracker,
        Tracker
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			var layout = container.getComponent('Layout');
            var environmentComponent = container.getComponent('Environment');
            var pdp = container.getComponent('PDP');
            var cart = container.getComponent('Cart');
            var isSessionIdSet;

            if (!SC.isPageGenerator()) {

                SignifydTracker.application = container;
                SignifydTracker.setUp();

                Tracker.getInstance().trackers.push( SignifydTracker );

                var sessionId = SignifydTracker.getCookie("SignifydSessionId");
                var data = {
                    fieldId: "custbody_f3_signifyd_session_id",
                    type: "string",
                    value: sessionId
                }
                
                layout.on('afterShowContent', function afterShowContent() {
                    if (!isSessionIdSet) {
                        isSessionIdSet = true;
                        cart.setTransactionBodyField(data).then(function() {
                            console.log(data.fieldId + ' was set to ' + data.value);
                        }).fail(function(error) {
                            console.log('setTransactionBodyField failed.');
                        });
                    }
                });
            }
		}
	};
});




define(
	'SignifydTrackerExtension',   
	[ 
		'SignifydTracker.Model',
		'SignifydTracker',
        'Tracker'
	]
,   function 
	(
		SignifydTrackerModel,
		SignifydTracker,
        Tracker
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			if (!SC.isPageGenerator()) {

                SignifydTracker.application = container;
                SignifydTracker.setUp();

                Tracker.getInstance().trackers.push( SignifydTracker );
            }
		}
	};
});



};

extensions['SSD.StockStatusExtension.1.0.3'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/StockStatusExtension/1.0.3/' + asset;
}

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


};

extensions['NSeComm.ThemeHelper.1.0.18'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/NSeComm/ThemeHelper/1.0.18/' + asset;
}

/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.ThemeHelper.Main', [
    'jQuery',
    'ThemeHelper.ProductHideAddToCart.Checker',
    'ThemeHelper.ProductDetails.Full.View',
    'ThemeHelper.Cart.Lines.View',
    'ThemeHelper.ProductDetails.QuickView.View',
    'ThemeHelper.Facets.Browse.View',
    'ThemeHelper.Cart.Summary.View',
    'ThemeHelper.Header.View',
    'ThemeHelper.Footer.View',
    'ThemeHelper.GoogleTagManager',
    'ThemeHelper.Cart.Detailed.View',
    'ThemeHelper.ProductReviews.Review.View',
    'ThemeHelper.ProductDetails.Quantity.View',
    'ThemeHelper.ProductReviews.Center.View',
    'ThemeHelper.ProductList.View',
    'ThemeHelper.ProductViews.Price.View',
    'ThemeHelper.Facets.FacetedNavigationItemCategory.View'

],
    function NSeCommThemeHelperMain(
        jQuery,
        ThemeHelperProductHideAddToCartChecker
    ) {
        'use strict';

        return {
            mountToApp: function mountToApp(container) {
                var config = container.getConfig();
                var plp = container.getComponent('PLP');
                var itemsInfo;
                var categoryInfo;
                var filters;

                config.itemKeyMapping = config.itemKeyMapping || {};

                config.itemKeyMapping._stock = function stock(item) { // eslint-disable-line no-underscore-dangle
                    var showStock = ThemeHelperProductHideAddToCartChecker.showAddToCart(item);
                    return showStock ? item.get('quantityavailable') : 0;
                };
                config.itemKeyMapping._isPurchasable = function isPurchasable(item) { // eslint-disable-line no-underscore-dangle
                    var showStock = ThemeHelperProductHideAddToCartChecker.showAddToCart(item);
                    return showStock ? item.get('ispurchasable') : 0;
                };

                if (plp) {
                    plp.cancelableOn('afterShowContent', function () {
                        itemsInfo = plp.getItemsInfo();
                        categoryInfo = plp.getCategoryInfo();
                        filters = plp.getFilters();
                        
                        if (!itemsInfo.length && categoryInfo && categoryInfo.fullurl && !filters.length) {
                            jQuery('.facets-facet-browse-content').remove();
                            jQuery('.facets-browse-category-heading-list-header').remove();
                        }
                    });
                }
            }
        };
    });


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductDetails.Full.View', [
    'ProductDetails.Full.View',
    'themehelper_product_details_full_view.tpl',
    'ThemeHelper.ProductHideAddToCart.Checker',
    'underscore'
], function ThemeHelperProductDetailsFullView(
    ProductDetailsFullView,
    productDetailsFullTpl,
    ThemeHelperProductHideAddToCartChecker,
    _
) {
    'use strict';

    _.extend(ProductDetailsFullView.prototype, {
        template: productDetailsFullTpl,

        getContext: _.wrap(ProductDetailsFullView.prototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var item = context.model.attributes.item;
            var showAddToCart = ThemeHelperProductHideAddToCartChecker.showAddToCart(item);
            var isActiveItem = ThemeHelperProductHideAddToCartChecker.isActiveItem(item);
            var itemOnBackorer = item.get('custitem_acs_stock_status') == 3;
            var stockMessage =  !showAddToCart ? _.translate('This item currently not available') : item.get('custitemstockstatus');
            
            context.stock = itemOnBackorer ? item.get('custitemstockstatus') : stockMessage;
            context.isHideAddToCart = !showAddToCart;
            context.showAddToCart = showAddToCart;
            context.isActiveItem = isActiveItem;

            return context;
        })
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Cart.Lines.View', [
    'Cart.Lines.View',
    'themehelper_cart_lines.tpl',
    'underscore'
], function ThemeHelperCartLinesView(
    CartLinesView,
    CartLinesTpl,
    _
) {
    'use strict';

    _.extend(CartLinesView.prototype, {
        template: CartLinesTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductDetails.QuickView.View', [
    'ProductDetails.QuickView.View',
    'themehelper_product_details_quickview.tpl',
    'underscore'
], function ThemeHelperProductDetailsQuickViewView(
    ProductDetailsQuickViewView,
    ProductDetailsQuickViewTpl,
    _
) {
    'use strict';

    _.extend(ProductDetailsQuickViewView.prototype, {
        template: ProductDetailsQuickViewTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Transaction.Line.Views.Cell.Navigable.View', [
    'Transaction.Line.Views.Cell.Navigable.View',
    'themehelper_transaction_line_views_cell_navigable.tpl',
    'underscore'
], function ThemeHelperTransactionLineViewsCellNavigableView(
    TransactionLineViewsCellNavigableView,
    TransactionLineViewsCellNavigableViewTpl,
    _
) {
    'use strict';

    _.extend(TransactionLineViewsCellNavigableView.prototype, {
        template: TransactionLineViewsCellNavigableViewTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Cart.Item.Summary.View', [
    'Cart.Item.Summary.View',
    'themehelper_cart_lines.tpl',
    'underscore'
], function ThemeHelperCartItemSummaryView(
    CartItemSummaryView,
    CartLinesTpl,
    _
) {
    'use strict';

    _.extend(CartItemSummaryView.prototype, {
        template: CartLinesTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Facets.Browse.View', [
    'Facets.Browse.View',
    'themehelper_facets_facet_browse.tpl',
    'facets_items_collection.tpl',
    'facets_items_collection_view_cell.tpl',
    'facets_items_collection_view_row.tpl',
    'Facets.ItemCell.View',
    'Backbone.CollectionView',
    'underscore',
    'themehelper_facets_item_cell_grid.tpl',
    'themehelper_facets_item_cell_list.tpl',
    'themehelper_facets_item_cell_table.tpl'
], function ThemeHelperFacetsBrowseView(
    FacetsBrowseView,
    facetsBrowseViewTpl,
    facetsItemsCollectionTpl,
    facetsItemsCollectionViewCellTpl,
    facetsItemsCollectionViewRowTpl,
    FacetsItemCellView,
    BackboneCollectionView,
    _
) {
    'use strict';

    _.extend(FacetsBrowseView.prototype, {
        template: facetsBrowseViewTpl,

        childViews: _.extend(FacetsBrowseView.prototype.childViews || {}, {
            'Facets.Items': function FacetsItems() {
                var self = this;
                var displayOption;

                this.itemsDisplayOptions[0].template = 'themehelper_facets_item_cell_list.tpl';
                this.itemsDisplayOptions[1].template = 'themehelper_facets_item_cell_table.tpl';
                this.itemsDisplayOptions[2].template = 'themehelper_facets_item_cell_grid.tpl';

                displayOption = _.find(this.itemsDisplayOptions, function find(option) {
                    return option.id === self.translator.getOptionValue('display');
                });

                return new BackboneCollectionView({
                    childTemplate: displayOption.template,
                    childView: FacetsItemCellView,
                    childViewOptions: {
                        application: this.application
                    },
                    viewsPerRow: parseInt(displayOption.columns, 10),
                    collection: this.model.get('items'),
                    cellTemplate: facetsItemsCollectionViewCellTpl,
                    rowTemplate: facetsItemsCollectionViewRowTpl,
                    template: facetsItemsCollectionTpl,
                    context: {
                        keywords: this.translator.getOptionValue('keywords')
                    }
                });
            }
        })
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Transaction.Line.Views.Cell.Actionable.View', [
    'Transaction.Line.Views.Cell.Actionable.View',
    'themehelper_transaction_line_views_cell_actionable.tpl',
    'underscore'
], function ThemeHelperTransactionLineViewsCellActionableView(
    TransactionLineViewsCellActionableView,
    TransactionLineViewsCellActionableViewTpl,
    _
) {
    'use strict';

    _.extend(TransactionLineViewsCellActionableView.prototype, {
        template: TransactionLineViewsCellActionableViewTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Cart.Summary.View', [
    'Cart.Summary.View',
    'themehelper_cart_summary.tpl',
    'underscore'
], function ThemeHelperCartSummaryView(
    CartSummaryView,
    CartSummaryTpl,
    _
) {
    'use strict';

    _.extend(CartSummaryView.prototype, {
        template: CartSummaryTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.OrderWizard.Module.CartSummary', [
    'OrderWizard.Module.CartSummary',
    'themehelper_order_wizard_cart_summary.tpl',
    'underscore'
], function ThemeHelperOrderWizardModuleCartSummary(
    OrderWizardModuleCartSummary,
    OrderWizardCartSummaryTpl,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleCartSummary.prototype, {
        template: OrderWizardCartSummaryTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.LoginRegister.Register.View', [
    'LoginRegister.Register.View',
    'themehelper_login_register_register.tpl',
    'underscore'
], function ThemeHelperLoginRegisterRegisterView(
    LoginRegisterRegisterView,
    LoginRegisterRegisterViewTpl,
    _
) {
    'use strict';

    _.extend(LoginRegisterRegisterView.prototype, {
        template: LoginRegisterRegisterViewTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.ThemeHelper.Checkout', [
    'ThemeHelper.Transaction.Line.Views.Cell.Navigable.View',
    'ThemeHelper.OrderWizard.Module.CartSummary',
    'ThemeHelper.LoginRegister.Register.View',
    'ThemeHelper.OrderWizard.Module.Address',
    'ThemeHelper.CreditCard.Edit.Form.View',
    'ThemeHelper.CreditCard.Edit.Form.SecurityCode.View',
    'ThemeHelper.GoogleTagManager',
    'ThemeHelper.Header.View',
    'ThemeHelper.Address.Edit.Fields.View'
],
function NSeCommThemeHelperCheckout(
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {}
    };
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Header.View', [
    'Header.View',
    'themehelper_header.tpl',
    'underscore'
], function ThemeHelperHeaderView(
    HeaderView,
    ThemehelperHeader,
    _
) {
    'use strict';

    _.extend(HeaderView.prototype, {
        template: ThemehelperHeader
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.OrderWizard.Module.Address', [
    'OrderWizard.Module.Address',
    'themehelper_order_wizard_address_module.tpl',
    'underscore'
], function ThemeHelperOrderWizardModuleAddress(
    OrderWizardModuleAddress,
    OrderWizardModuleAddressTpl,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleAddress.prototype, {
        template: OrderWizardModuleAddressTpl,

        getContext: _.wrap(OrderWizardModuleAddress.prototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.homeUrl = this.wizard.model.get('touchpoints').home;
            return context;
        })
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.CreditCard.Edit.Form.SecurityCode.View', [
    'CreditCard.Edit.Form.SecurityCode.View',
    'themehelper_creditcard_edit_form_securitycode.tpl',
    'underscore'
], function ThemeHelperCreditCardEditFormSecurityCodeView(
    CreditCardEditFormSecurityCodeView,
    CreditcardEditFormSecuritycodeTpl,
    _
) {
    'use strict';

    _.extend(CreditCardEditFormSecurityCodeView.prototype, {
        template: CreditcardEditFormSecuritycodeTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.CreditCard.Edit.Form.View', [
    'CreditCard.Edit.Form.View',
    'themehelper_creditcard_edit_form.tpl',
    'underscore'
], function ThemeHelperCreditCardEditFormView(
    CreditCardEditFormView,
    CreditcardEditFormTpl,
    _
) {
    'use strict';

    _.extend(CreditCardEditFormView.prototype, {
        template: CreditcardEditFormTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.GoogleTagManager', [
    'Profile.Model',
    'GoogleTagManager',
    'Tracker',
    'underscore'
], function ThemeHelperGoogleTagManager(
    ProfileModel,
    GoogleTagManager,
    Tracker,
    _
) {
    'use strict';

    GoogleTagManager.trackAddToWishlist = function trackAddToWishlist(line) {
        var item;
        var eventName;
        var eventData;
        if (line) {
            item = line.get('item');
            eventName = 'addToWishlist';
            eventData = {
                event: eventName,
                data: {
                    action: 'Add To Wishlist',
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    sku: item.get('itemid'),
                    id: item.get('itemid'),
                    name: item.get('_name'),
                    price: item.get('_priceDetails').onlinecustomerprice,
                    category: 'Shopping - User Interaction',
                    item_category: this.getCategory()
                },
                ecommerce: {
                    items: [
                        {
                            action: 'Add To Wishlist',
                            currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                            sku: item.get('itemid'),
                            id: item.get('itemid'),
                            name: item.get('_name'),
                            price: item.get('_priceDetails').onlinecustomerprice,
                            category: 'Shopping - User Interaction',
                            item_category: this.getCategory()
                        }
                    ]
                }
            };
            // Triggers a Backbone.Event so others can subscribe to this event and add/replace
            // data before is send it to Google Tag Manager
            Tracker.trigger(eventName, eventData, line);
            this.pushData(eventData);
        }
        return this;
    };

    GoogleTagManager.trackAddToCart = function trackAddToCart(line) {
        var selectedOptions;
        var item;
        var eventName;
        var eventData;
        if (line) {
            selectedOptions = line.get('options').filter(function filter(option) {
                return option.get('value') && option.get('value').label;
            });
            item = line.get('item');
            eventName = 'addToCart';
            eventData = {
                event: eventName,
                ecommerce: {
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    add: {
                        products: [
                            {
                                sku: item.get('itemid'),
                                id: item.get('itemid'),
                                name: item.get('_name'),
                                price: item.get('_priceDetails').onlinecustomerprice,
                                variant: _.map(selectedOptions, function map(option) {
                                    return option.get('value').label;
                                }).join(', '),
                                category: this.getCategory(),
                                quantity: line.get('quantity'),
                                currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
                            }
                        ]
                    }
                }
            };
            // Triggers a Backbone.Event so others can subscribe to this event and add/replace
            // data before is send it to Google Tag Manager
            Tracker.trigger(eventName, eventData, line);
            this.pushData(eventData);
        }
        return this;
    };

    GoogleTagManager.trackProductClick = function trackProductClick(item) {
        var eventName = 'productClick';
        var eventData = {
            event: eventName,
            ecommerce: {
                click: {
                    actionField: { list: item.get('list') },
                    products: [
                        {
                            name: item.get('name'),
                            price: item.get('price'),
                            sku: item.get('sku', true),
                            id: item.get('sku', true),
                            category: item.get('category'),
                            position: item.get('position'),
                            currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
                        }
                    ]
                }
            }
        };
        // We set this item in this Tracker to later be read it by the trackProductView event
        this.item = item;
        // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
        this.pushData(eventData);
        Tracker.trigger(eventName, eventData, item);
        return this;
    };

    GoogleTagManager.trackPageviewForCart = function trackPageviewForCart(data) {
        var eventName;
        var eventData1;
        if (_.isString(data.url)) {
            eventName = 'cartView';
            eventData1 = {
                event: eventName,
                data: {
                    page: data.url,
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    total: data.total || '',
                    items: []
                }
            };
            if (data.items && data.items.length) {
                data.items.each(function each(item) {
                    eventData1.data.items.push({
                        sku: item.get('item').get('itemid'),
                        id: item.get('item').get('itemid'),
                        title: item.get('item').get('displayname'),
                        price: item.get('rate_formatted'),
                        quantity: item.get('quantity'),
                        image: (item.get('item').get('itemimages_detail').urls &&
                            item.get('item').get('itemimages_detail').urls.length &&
                            item.get('item').get('itemimages_detail').urls[0].url) ||
                            '',
                        currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
                    });
                });
            }
            // Triggers a Backbone.Event so others can subscribe to this event and add/replace data
            // before is send it to Google Tag Manager
            Tracker.trigger(eventName, eventData1, data.url);
            this.pushData(eventData1);
        }
        return this;
    };

    GoogleTagManager.trackProductView = function trackProductView(product) {
        var item = product.getItem();
        var eventName;
        var selectedOptions;
        var price;
        var result;
        var itemList;
        var eventData;
        if (this.item && this.item.get('itemId') === item.get('_id')) {
            item.set('category', this.item.get('category'), { silent: true });
            item.set('list', this.item.get('list'), { silent: true });
        }
        eventName = 'productView';
        selectedOptions = product.get('options').filter(function filter(option) {
            return option.get('value') && option.get('value').label;
        });
        price = product.getPrice();
        result = this.findCategoryAndListInDataLayer(product);
        itemList = item.get('list') || (result ? result.list : '');
        eventData = {
            event: eventName,
            ecommerce: {
                detail: {
                    actionField: {
                        list: itemList
                    },
                    products: [
                        {
                            name: item.get('_name'),
                            sku: product.getSku(),
                            id: product.getSku(),
                            category: item.get('category') || (result ? result.category : ''),
                            variant: _.map(selectedOptions, function map(option) {
                                return option.get('value').label;
                            }).join(', '),
                            price: (price.price ? price.price : 0).toFixed(2),
                            currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                            item_list_name: itemList
                        }
                    ]
                }
            },
            page: this.getCategory()
        };
        this.item = null;
        // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
        Tracker.trigger(eventName, eventData, item);
        this.pushData(eventData);
        return this;
    };

    GoogleTagManager.trackTransaction = function trackTransaction(transaction) {
        var self = this;
        var profile = ProfileModel.getInstance();
        var eventName = 'transaction';
        var eventData = {
            event: eventName,
            ecommerce: {
                purchase: {
                    actionField: {
                        id: transaction.get('confirmationNumber'),
                        email: profile.get('email'),
                        phone: profile.get('phone'),
                        affiliation: '',
                        revenue: transaction.get('subTotal') +
                            transaction.get('taxTotal') +
                            transaction.get('shippingCost') +
                            transaction.get('handlingCost'),
                        currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                        subtotal: transaction.get('subTotal'),
                        tax: transaction.get('taxTotal'),
                        shipping: transaction.get('shippingCost') + transaction.get('handlingCost'),
                        coupon: []
                    },
                    products: []
                }
            }
        };
        _.each(transaction.get('promocodes'), function get(promo) {
            eventData.ecommerce.purchase.actionField.coupon.push(promo.code);
        });
        transaction.get('products').each(function each(product) {
            var result = self.findCategoryAndListInDataLayer(product);
            eventData.ecommerce.purchase.products.push({
                name: product.get('name'),
                sku: product.get('sku'),
                id: product.get('internalid'),
                price: product.get('rate'),
                category: result ? result.category || '' : '',
                variant: product.get('options'),
                quantity: product.get('quantity'),
                currency: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl
            });
        });
        // Triggers a Backbone.Event so others can subscribe to this event and add/replace data before is send it to Google Tag Manager
        Tracker.trigger(eventName, eventData, transaction);
        this.pushData(eventData);
        return this;
    };
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Cart.Detailed.View', [
    'Cart.Detailed.View',
    'themehelper_cart_detailed.tpl',
    'underscore'
], function ThemeHelperCartDetailedView(
    CartDetailedView,
    CartDetailedTpl,
    _
) {
    'use strict';

    _.extend(CartDetailedView.prototype, {
        template: CartDetailedTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductReviews.Review.View', [
    'ProductReviews.Review.View',
    'underscore'
], function ThemeHelperProductReviewsReviewView(
    ProductReviewsReviewView,
    _
) {
    'use strict';

    _.extend(ProductReviewsReviewView.prototype, {
        getContext: _.wrap(ProductReviewsReviewView.prototype.getContext, function wrapGetContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            context.reviewCreatedOn = context.reviewCreatedOn.split(' ')[0];
            context.reviewText = this.model.get('text');
            return context;
        })
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductDetails.Quantity.View', [
    'ProductDetails.Quantity.View',
    'underscore',
    'ThemeHelper.ProductHideAddToCart.Checker'
], function ThemeHelperProductDetailsQuantityView(
    ProductDetails,
    _,
    ProductHideAddToCartChecker
) {
    'use strict';

    return _.extend(ProductDetails.prototype, {
        getContext: _(ProductDetails.prototype.getContext).wrap(function getContext(fn) {
            var context = fn.apply(this, _(arguments).toArray().slice(1));
            var showQty = ProductHideAddToCartChecker.showAddToCart(context.model.get('item'));

            if (!showQty) {
                context.showQuantity = false;
            }
            return context;
        })
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.ProductHideAddToCart.Checker', [
], function ThemeHelperProductDetailsExtend() {
    'use strict';

    return {
        showAddToCart: function showAddToCart(item) {
            var hideAddToCart;
            var stockType;
            try {
                hideAddToCart = item.get('custitemitemhideaddtocart');
                stockType = item.get('custitem_acs_stock_status');

                if (stockType == 3) {
                    return !hideAddToCart;
                }
                
                if (stockType == 9) {
                    return false;
                }
                
                if (hideAddToCart && stockType > 4) {
                    return false;
                }
                return true;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(e);
                return true;
            }
        },
        isActiveItem: function isActiveItem(item) {
            var hideAddToCart;
            var stockType;
            try {
                hideAddToCart = item.get('custitemitemhideaddtocart');
                stockType = item.get('custitem_acs_stock_status');
                
                if (stockType == 9) {
                    return true;
                }
                
                return false;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(e);
                return true;
            }
        }
    };
});


define('ThemeHelper.ProductReviews.Center.View', [
    'ProductReviews.Center.View',
    'themehelper_product_reviews_center.tpl',
    'underscore'
], function ThemeHelperProductReviewsCenterView(
    ProductReviewsCenterView,
    ProductReviewsCenterTpl,
    _
) {
    'use strict';

    return _(ProductReviewsCenterView.prototype).extend({
        initialize: _(ProductReviewsCenterView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.template = ProductReviewsCenterTpl;

                return init;
            }
        )
    });
});


/*
    © 2024 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('ThemeHelper.Footer.View', [
    'themehelper_footer.tpl',
    'Footer.View',
    'underscore'
], function ThemeHelperFooterView(
    FooterTpl,
    FooterView,
    _
) {
    'use strict';

    _.extend(FooterView.prototype, {
        render: _.wrap(FooterView.prototype.render, function render(fn) {
            var ret;

            this.template = FooterTpl;
            ret = fn.apply(this, _.toArray(arguments).slice(1));            

            return ret;
        })
    });
});


define('ThemeHelper.ProductList.View', [
    'ProductList.Control.View',
    'themehelper_product_list_control.tpl',
    'underscore'
], function ThemeHelperProductListView(
    ProductListControlView,
    Template,
    _
) {
    'use strict';

    _.extend(ProductListControlView.prototype, {
        template: Template
    });
});


define('ThemeHelper.Facets.FacetedNavigationItemCategory.View', [
    'Facets.FacetedNavigationItemCategory.View',
    'themehelper_facets_faceted_navigation_item_category.tpl',
    'underscore'
], function ThemeHelperFacetsFacetedNavigationItemCategoryView(
    FacetsFacetedNavigationItemCategoryView,
    ThemeHelperthemeHelperProductViewsPriceTpl,
    _
) {
    'use strict';

    _.extend(FacetsFacetedNavigationItemCategoryView.prototype, {
        template: ThemeHelperthemeHelperProductViewsPriceTpl
    });
});


define('ThemeHelper.Address.Edit.Fields.View', [
    'Address.Edit.Fields.View',
    'theme_helper_address_edit_fields.tpl',
    'underscore'
], function ThemeHelperAddressEditFieldsView(
    AddressEditFieldsView,
    AddressEditFieldsTpl,
    _
) {
    'use strict';

    _.extend(AddressEditFieldsView.prototype, {
        template: AddressEditFieldsTpl
    });
});


/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.ThemeHelper.MyAccount', [
    'ThemeHelper.Transaction.Line.Views.Cell.Actionable.View',
    'ThemeHelper.GoogleTagManager',
    'ThemeHelper.Header.View',
    'ThemeHelper.Address.Edit.Fields.View'
],
function NSeCommThemeHelperMyAccount(
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {}
    };
});


};

extensions['SSD.VelaroChat.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/VelaroChat/1.0.0/' + asset;
}

define('VelaroChat',
    [
        'SC.Configuration',
        'jQuery'
    ],
    function (
        Configuration,
        jQuery
) {
        var VelaroChat = {

            loadScript: function loadVelaroChat() {
                var v;
                var siteId = Configuration.get('velarochat.siteid');
                var groupId = Configuration.get('velarochat.groupid');
                // var self = this;
                return SC.ENVIRONMENT.jsEnvironment === 'browser' && (function () {
                    var w = window; var d = document;
                    var s;
                    var x;
                    if (w.Velaro) { return; }
                    v = function () { return v.c(arguments); };
                    v.q = []; v.c = function (args) { v.q.push(args); }; w.Velaro = v;
                    v.endpoints = {
                        mainApi: 'https://api-main-us-east.velaro.com/',
                        cdn: 'https://eastprodcdn.azureedge.net/'
                    };
                    if (siteId && groupId) {
                        s = d.createElement('script');
                        s.type = 'text/javascript';
                        s.async = true;
                        s.src = v.endpoints.cdn + 'widgets/shim';
                        x = d.getElementsByTagName('script')[0];
                        x.parentNode.insertBefore(s, x);
                    }
                    // eslint-disable-next-line
                    Velaro('boot', {
                        siteId: siteId,
                        groupId: groupId

                    });
                }());
            },

            mountToApp: function (application) {
                if (!SC.isPageGenerator()) {
                    application.getLayout().once('afterAppendView', jQuery.proxy(VelaroChat, 'loadScript'));
                }
            }
        };

        return VelaroChat;
    });

/*
    <script>
    (function () {
        var w = window; var d = document;
        if (w.Velaro) { return; }
        var v = function () { return v.c(arguments) };
        v.q = []; v.c = function (args) { v.q.push(args) }; w.Velaro = v;
        v.endpoints = {
            mainApi: 'https://api-main-us-east.velaro.com/',
            cdn: 'https://eastprodcdn.azureedge.net/'
        };
        w.addEventListener('load', function () {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = v.endpoints.cdn + 'widgets/shim';
            var x = d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        });

        Velaro('boot', {
            siteId: 20957,
            groupId: 6929,
            // customVars are optional.

        });
    }());
</script> */


};

SC.ENVIRONMENT.EXTENSIONS_JS_MODULE_NAMES = ["BackbonePluginInstaller","HeaderReorganization.Header.Profile.View","SearchRecommendations.View","OrderWizard.SignifydTracker","SignifydTracker","SignifydTracker.Model","SignifydTrackerExtension.Checkout","Facets.ItemCell.View.Extension","NSeComm.ThemeHelper.Main","ThemeHelper.ProductDetails.Full.View","ThemeHelper.Cart.Lines.View","ThemeHelper.ProductDetails.QuickView.View","ThemeHelper.Transaction.Line.Views.Cell.Navigable.View","ThemeHelper.Cart.Item.Summary.View","ThemeHelper.Facets.Browse.View","ThemeHelper.Transaction.Line.Views.Cell.Actionable.View","ThemeHelper.Cart.Summary.View","ThemeHelper.OrderWizard.Module.CartSummary","ThemeHelper.LoginRegister.Register.View","NSeComm.ThemeHelper.Checkout","ThemeHelper.Header.View","ThemeHelper.OrderWizard.Module.Address","ThemeHelper.CreditCard.Edit.Form.SecurityCode.View","ThemeHelper.CreditCard.Edit.Form.View","ThemeHelper.GoogleTagManager","ThemeHelper.Cart.Detailed.View","ThemeHelper.ProductReviews.Review.View","ThemeHelper.ProductDetails.Quantity.View","ThemeHelper.ProductHideAddToCart.Checker","ThemeHelper.ProductReviews.Center.View","ThemeHelper.Footer.View","ThemeHelper.ProductList.View","ThemeHelper.Facets.FacetedNavigationItemCategory.View","ThemeHelper.Address.Edit.Fields.View"];
try{
	extensions['SSD.BackbonePluginInstaller.1.0.0']();
	SC.addExtensionModule('Backbone.PluginInstaller');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.CustomCSSFileExtension.1.0.0']();
	SC.addExtensionModule('CustomCSSFileExtension');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.HeaderReorganization.1.0.1']();
	SC.addExtensionModule('SuiteLabs.HeaderReorganization.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['NSeComm.MegaMenu.1.0.3']();
	SC.addExtensionModule('NSeComm.MegaMenu');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['NSeComm.Path2ResponsePixel.1.0.0']();
	SC.addExtensionModule('NSeComm.Path2ResponsePixel.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.RemovePOForNonB2B.1.0.0']();
	SC.addExtensionModule('RemovePOForNonB2B');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.SearchRecommendations.1.0.0']();
	SC.addExtensionModule('SuiteLabs.SearchRecommendations.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.SignifydTrackerExtension.1.0.0']();
	SC.addExtensionModule('SignifydTrackerExtension');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.StockStatusExtension.1.0.3']();
	SC.addExtensionModule('StockStatusExtension');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['NSeComm.ThemeHelper.1.0.18']();
	SC.addExtensionModule('NSeComm.ThemeHelper.MyAccount');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.VelaroChat.1.0.0']();
	SC.addExtensionModule('VelaroChat');
}
catch(error)
{
	console.error(error);
}

