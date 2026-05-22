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

extensions['ACS.CustomFieldsPlacement.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/CustomFieldsPlacement/1.0.0/' + asset;
}


define('ACS.CustomFieldsPlacement', [
    'underscore',
    'jQuery'
], function CustomFieldsPlacement(
    _,
    jQuery
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var checkout = container.getComponent('Checkout');
            var $topElem;
            var $customfields;
            var isIWA;
            if (layout) {
                layout.on('afterShowContent', function afterShowContent() {
                    _.defer(function defer() {
                        checkout.getCurrentStep().then(function getCurrentStepThen(step) {
                            if (step.url === 'review') {
                                $topElem = jQuery('[class*="OrderWizard.Module.ShowPayments"]');
                                $customfields = jQuery('.order-wizard-checkoutfieldmanagement').parent();
                                isIWA = window.location.host.indexOf('iwawine') > -1;
                                if (isIWA) {
                                    $customfields = jQuery('.custom-fields-checkout-order-wizard').parent();
                                }
                                if ($customfields) {
                                    $topElem.insertAfter($customfields);
                                }
                            }
                        });
                    });
                });
            }
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

extensions['SuiteLabs.Klaviyo.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/Klaviyo/1.0.0/' + asset;
}

define('Klaviyo.Tracker', [
    'GoogleTagManager',
    'Configuration',
    'LiveOrder.Model',
    'Profile.Model',
    'underscore'
], function KlaviyoTracker(
    GoogleTagManager,
    Configuration,
    LiveOrderModel,
    ProfileModel,
    _
) {
    'use strict';

    var getItems = function getItems() {
        var liveOrder = LiveOrderModel.getInstance();
        var lines = liveOrder.get('lines');
        var result = [];

        lines.each(function eachLine(line) {
            var item = line.get('item');

            result.push({
                'ProductID': item.get('itemid'),
                'SKU': item.get('_sku'),
                'ProductName': item.get('_name'),
                'Quantity': line.get('quantity'),
                'ItemPrice': line.get('rate'),
                'RowTotal': line.get('amount'),
                'ProductURL': window.location.protocol + '//' + window.location.host + item.get('_url')
            });
        });

        return result;
    };

    return {
        trackAddToCart: function trackAddToCart(line) {
            var eventName = 'klaviyoAddToCart';
            var liveOrder;
            var eventData;
            var item;

            if (line) {
                liveOrder = LiveOrderModel.getInstance();
                item = line.get('item');

                eventData = {
                    event: eventName,
                    ecommerce: {
                        currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                        add: {
                            data: {
                                '$value': liveOrder.get('summary').subtotal,
                                'AddedItemSKU': item.get('itemid'),
                                'AddedItemProductID': item.get('itemid'),
                                'AddedItemProductName': item.get('_name'),
                                'AddedItemPrice': line.get('rate'),
                                'AddedItemQuantity': line.get('quantity'),
                                'Items': getItems()
                            }
                        }
                    }
                };

                GoogleTagManager.pushData(eventData);
            }
        },

        trackProceedToCheckout: function trackProceedToCheckout() {
            var eventName = 'klaviyoProceedToCheckout';
            var liveOrder;
            var eventData;
            var profile;
            var items;

            liveOrder = LiveOrderModel.getInstance();
            profile = ProfileModel.getInstance();
            items = getItems();

            eventData = {
                event: eventName,
                ecommerce: {
                    currencyCode: SC.ENVIRONMENT.currencyCodeSpecifiedOnUrl,
                    add: {
                        data: {
                            '$event_id': profile.get('email') + '_' + parseInt(Date.now() / 1000, 10),
                            '$value': liveOrder.get('summary').subtotal,
                            'ItemNames': _.pluck(items, 'ProductName'),
                            'CheckoutURL': window.location.protocol
                                + '//'
                                + window.location.host
                                + Configuration.siteSettings.touchpoints.checkout,
                            'Items': items
                        }
                    }
                }
            };

            GoogleTagManager.pushData(eventData);
        }
    };
});


define('SuiteLabs.Klaviyo.Checkout', [
    'Tracker'
], function SuiteLabsKlaviyoCheckout(
    Tracker
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var profileComponent = container.getComponent('UserProfile');
            var profile;

            profileComponent.getUserProfile().then(function getUserProfile(userProfile) {
                profile = userProfile;
            });

            Tracker.on('transaction', function onTransaction(dataLayer) {
                if (
                    dataLayer
                    && dataLayer.ecommerce
                    && dataLayer.ecommerce.purchase
                    && dataLayer.ecommerce.purchase.actionField
                ) {
                    dataLayer.ecommerce.purchase.actionField.email = profile.email;
                    dataLayer.ecommerce.purchase.actionField.phone = profile.phoneinfo && profile.phoneinfo.phone;
                }
            });
        }
    };
});


};

extensions['ACS.ManageScreenErrors.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/ManageScreenErrors/1.0.0/' + asset;
}


define('Utils.Extend', [
    'Utils',
    'jQuery',
    'underscore'
], function UtilsExtend(
    Utils,
    jQuery,
    _
) {
    'use strict';

    var isScreenScrolling = false;
    _.extend(Utils, {
        animatedScroll: function animatedScroll(element) {
            var top;
            this.animateToError();
            if (!this.isInCheckout()) {
                top = jQuery(element).offset().top;
                if (!isScreenScrolling && top) {
                    isScreenScrolling = true;
                    jQuery('html, body').animate({
                        scrollTop: top
                    }, 600, 'swing', function done() {
                        isScreenScrolling = false;
                    });
                }
            } else {
                this.animateToError();
            }
        },

        animateToError: function animateToError() {
            var messageError = jQuery('.global-views-message-error');
            if (messageError.length > 0 && messageError.length !== jQuery('.global-views-message-error [hidden]').length) {
                jQuery('html, body').animate({
                    scrollTop: jQuery('.global-views-message-error').offset().top
                }, 500);
            } else if (jQuery('p[data-validation-error]').length > 0) {
                jQuery('html, body').animate({
                    scrollTop: jQuery('p[data-validation-error]').closest('div[data-validation*="control-group"]').offset().top
                }, 500);
            }
        }
    });
});



define('ManageCheckoutErrors.Main', [
    'Utils.Extend'
], function ManageCheckoutErrorsMain(
) {
    'use strict';
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

extensions['SuiteLabs.PayPalExpressPatch.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/PayPalExpressPatch/1.0.0/' + asset;
}


define('SuiteLabs.PayPalExpressPatch.Main', [
    'OrderWizard.Module.PaymentMethod.Selector',
    'Utils',
    'underscore'
], function SuiteLabsPayPalExpressPatchMain(
    OrderWizardModulePaymentMethodSelector,
    Utils,
    _
) {
    'use strict';

    _.extend(OrderWizardModulePaymentMethodSelector.prototype, {
        render: function render() {
            var selectedModule;
            var selectedPayment;
            var selectedType;
            var otherModule;
            var type;

            if (this.wizard.hidePayment()) {
                this.$el.empty();
                this.trigger('change_label_continue');
                return;
            }

            // We do this here so we give time for information to be bootstrapped
            _.each(this.modules, function eachModule(module) {
                module.isActive = module.instance.isActive();
            });

            if (!this.selectedModule) {
                // CASE #5433539: The following line was modified from the original version to patch the PayPal Express issue
                selectedPayment = this.model.get('paymentmethods').findWhere({ primary: true });

                if (selectedPayment) {
                    selectedType = this.isOthersModule(selectedPayment.get('type'))
                        ? 'others'
                        : selectedPayment.get('type');
                } else if (this.wizard.options.profile.get('paymentterms')) {
                    selectedType = 'invoice';
                }

                this.setModuleByType(selectedType, true);
            } else if (this.selectedModule.type === 'paypal' && !this.model.get('isPaypalComplete')) {
                this.trigger('change_label_continue', Utils.translate('Continue to Paypal'));
            } else {
                this.trigger('change_label_continue');
            }

            if (this.isOthersModule(this.selectedModule.type)) {
                type = this.selectedModule.type;
                otherModule = _.findWhere(this.modules, {
                    type: 'others'
                });

                otherModule.isSelected = true;

                this.selectedModule = otherModule;
                this._render();

                this.renderModule(otherModule);
                if (type !== 'others') {
                    this.setModuleByType(type, true);
                }
            } else {
                this._render();

                selectedModule = _.findWhere(this.modules, { isSelected: true });
                this.renderModule(selectedModule);
            }

            if (
                Utils.getParameterByName(window.location.href, 'externalPayment') === 'FAIL' &&
                this.showExternalPaymentErrorMessage
            ) {
                this.showExternalPaymentErrorMessage = false;
                this.manageError(this.externalPaymentErrorMessage);
            }
        }
    });
});


};

extensions['SuiteLabs.PepperjamExtension.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/PepperjamExtension/1.0.0/' + asset;
}

define('PepperJamTracker', [
    'jQuery',
    'LiveOrder.Model',
    'Configuration',
    'underscore'
], function PepperJamTracker(
    jQuery,
    LiveOrderModel,
    Configuration,
    _
) {

    var getItemsInStringFormat = function getItems() {
        var lines = JSON.parse(sessionStorage.getItem('cartLines'));
        var items = '';

        _.each(lines, function eachLine(line, idx) {
            var itemNumber = idx + 1;
            var item = line.item;
                items += '&ITEM_ID' + itemNumber + '=' + item.internalid + '&' +
                'ITEM_PRICE' + itemNumber + '=' + line.rate + '&' +
                'QUANTITY' + itemNumber + '=' + line.quantity;
        });

        return items;
    };

    return {
        trackTransaction: function trackTransaction(transaction) {
            var liveOrderInstance = LiveOrderModel.getInstance();
            var pepperJamConfiguration = Configuration.get('PepperJamTracking');
            var clickIdParameter = sessionStorage.getItem('clickId');
            var items = getItemsInStringFormat(liveOrderInstance);
            var soId = transaction.get('confirmationNumber');

            var iframeCode = '<iframe src="' + pepperJamConfiguration.baseUrl + 
                         '?' + 'INT=' + pepperJamConfiguration.integrationType + 
                         '&' + 'PROGRAM_ID' + '=' + pepperJamConfiguration.programId +
                         '&' + 'ORDER_ID' + '=' + soId +
                         '&' + 'CLICK_ID' + '=' + clickIdParameter +
                         items + 
                         '" width="1" height="1" frameborder="0"></iframe>';
            _.defer(function() {
                jQuery('[data-view="OrderWizard.AfterConfirmation"]').append(iframeCode);
                sessionStorage.removeItem('clickId');
                sessionStorage.removeItem('cartLines');
            });
        }
    }

});


define('PepperjamExtension.EntryPoint', [
    'PepperJamTracker',
    'Tracker',
    'Utils'
], function PepperjamExtensionEntryPoint(
    PepperJamTracker,
    Tracker,
    Utils
) {
    'use strict';

    return {
        mountToApp: function mountToApp (container) {
            if (!SC.isPageGenerator()) {
                var url = window.location.href;
                var checkoutComponent = container.getComponent('Checkout');
                var clickIdParameter = Utils.getParameterByName(url, 'clickId');
                if (clickIdParameter) {
                    sessionStorage.setItem('clickId', clickIdParameter);
                } else if (sessionStorage.getItem('clickId')) {
                    clickIdParameter = sessionStorage.getItem('clickId');
                }
                if (checkoutComponent) {
                    var cartComponent = container.getComponent('Cart');
                    cartComponent.getLines().then(function(lines) {
                        if (lines && lines.length > 0) {
                            sessionStorage.setItem('cartLines', JSON.stringify(lines)); // Cart lines are not present in confirmation page.
                        }
                    });
                }
                if (clickIdParameter) {
                    Tracker.getInstance().trackers.push(PepperJamTracker);

                // Code not working when no click id is present.
                // } else {
                //     var layoutComponent = container.getComponent('Layout');
                //     var environmentComponent = container.getComponent('Environment');
                //     layoutComponent.on('afterShowContent', function afterShowContent() {
                //         var impressionId = environmentComponent.getConfig('PepperJamTracking.impressionId');
                //         jQuery.getScript('//container.pepperjam.com/' + impressionId);
                //     });
                }
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

extensions['SSD.ShippingMethodExtension.1.0.7'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/ShippingMethodExtension/1.0.7/' + asset;
}


/* eslint-disable */
define('OrderWizard.Module.CartSummary.Site', [
    'OrderWizard.Module.CartSummary',
    'underscore'
],
    function CartSummaryViewSite(
        View,
        _
    ) {
        'use strict';

        View.prototype.installPlugin('postContext', {
            name: 'themeHorizonContext',
            priority: 10,
            execute: function execute(context, view) {
                var modelOption = context.model,
                    summary = modelOption.get('summary'),
                    totalShippingCost = _.formatCurrency(summary.shippingcost + summary.handlingcost);
                _.extend(context, {
                    totalShippingCost: totalShippingCost,
                    confirmationStep: view.options.wizard.currentStep == 'confirmation'
                });
            }
        });

        _.extend(View.prototype, {
            getContext: _.wrap(View.prototype.getContext, function (fn) {
                var currentContext = fn.apply(this, _.toArray(arguments).slice(1));

                var hash = window.location.hash;
                var summary = currentContext.model.get("summary");
                var totalShippingCost = _.formatCurrency(summary.shippingcost + summary.handlingcost);
                return _.extend(currentContext, {
                    isShippingAddressPage: hash.indexOf('#shipping/address') >= 0,
                    totalShippingCost: totalShippingCost
                });
            })
        });


    });


define('OrderWizard.Module.Shipmethod.Site', [
    'OrderWizard.Module.Shipmethod',
    'underscore'
], function OrderWizardModuleShipmethodSite(
    OrderWizardModuleShipmethod,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleShipmethod.prototype, {
        getContext: _.wrap(OrderWizardModuleShipmethod.prototype.getContext, function (fn) {
            var currentContext = fn.apply(this, _.toArray(arguments).slice(1));
            var shippingMethodsFiltered = currentContext.model.get('shipmethods').models.map(function (shipmethod) {
                return {
                    name: shipmethod.get('name'),
                    rate_formatted: shipmethod.get('rate_formatted'),
                    internalid: shipmethod.get('internalid'),
                    isActive: shipmethod.get('internalid') === currentContext.model.get('shipmethod'),
                    rate: shipmethod.get('rate')
                };
            });
            shippingMethodsFiltered = _.sortBy(shippingMethodsFiltered, function (ship) {
                return ship.rate;
            });
            return _.extend(currentContext, {
                shippingMethods: shippingMethodsFiltered
            });
        })
    });


});


define('OrderWizard.Module.ShowShipments.Site', [
    'OrderWizard.Module.ShowShipments',
    'Wizard.Module',
    'Backbone.CompositeView',
    'underscore'
], function OrderWizardModuleShowShipmentsSite(
    OrderWizardModuleShowShipments,
    WizardModule,
    BackboneCompositeView,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleShowShipments.prototype, {
        initialize: function ()
		{
			WizardModule.prototype.initialize.apply(this, arguments);

			this.application = this.wizard.application;
			this.options.application = this.wizard.application;

            this.addressSource = this.wizard.options.profile.get('addresses');

			this.wizard.model.on('ismultishiptoUpdated', this.render, this);
			this.wizard.model.on('promocodeUpdated', this.render, this);
		},
        getContext: _.wrap(OrderWizardModuleShowShipments.prototype.getContext, function (fn) {
            var currentContext = fn.apply(this, _.toArray(arguments).slice(1));
            var shippingMethodsFiltered = currentContext.model.get('shipmethods').models.map(function (shipmethod) {
                return {
                    name: shipmethod.get('name'),
                    rate_formatted: shipmethod.get('rate_formatted'),
                    internalid: shipmethod.get('internalid'),
                    isActive: shipmethod.get('internalid') === currentContext.model.get('shipmethod'),
                    rate: shipmethod.get('rate')
                };
            });
            shippingMethodsFiltered = _.sortBy(shippingMethodsFiltered, function (ship) {
                return ship.rate;
            });
            
            currentContext.model.trigger('showShipmentsLoaded');
            return _.extend(currentContext, {
                shippingMethods: shippingMethodsFiltered
            });
        })
    });


});


define('ShippingMethodExtension.View'
,	[
		'OrderWizard.Module.Shipmethod'
	
	,	'Backbone'
    ,   'Utils'
    ,   'underscore'
    ]
, function (
    OrderWizardModuleShipmethod
	
	,	Backbone
    ,   Utils
    ,   _
)
{
    'use strict';

    // @class ssd.ProductDetailsExtension.ProductDetails.View @extends Backbone.View
    _.extend(OrderWizardModuleShipmethod.prototype, {

        getContext: function getContext() {
            var self = this;
            var show_enter_shipping_address_first =
                !this.model.get('isEstimating') &&
                !this.profileModel.get('addresses').get(this.model.get('shipaddress'));
            var shipping_methods = this.wizard.model.get('shipmethods').map(function(shipmethod) {
                return {
                    name: shipmethod.get('name'),
                    rate_formatted: shipmethod.get('rate_formatted'),
                    internalid: shipmethod.get('internalid'),
                    isActive: shipmethod.get('internalid') === self.model.get('shipmethod')
                };
            });

            var isDealer = true; //TODO: add dealer and local pickup logic 
            var filtered_shipping_methods = shipping_methods;
            if(!isDealer)
            {
                var filtered_shipping_methods = _.find(shipping_methods, function(shipMethod){
                    return shipMethod.internalid != 1898 && shipMethod.internalid != 772; //Local Pickup && Customer Prepaid
                });
            }
            
            var sorted_filtered_shipping_methods = filtered_shipping_methods;
            if (filtered_shipping_methods.length > 1){
                sorted_filtered_shipping_methods = _.sortBy(filtered_shipping_methods, function(shipmethod){
                    return shipmethod.rate_formatted;
                    
                });
            }
    
            // @class OrderWizard.Module.Shipmethod.Context
            return {
                // @property {LiveOrder.Model} model
                model: this.model,
                // @property {Boolean} showEnterShippingAddressFirst
                showEnterShippingAddressFirst: show_enter_shipping_address_first,
                // @property {Boolean} showLoadingMethods
                showLoadingMethods: this.reloadingMethods,
                // @property {Boolean} hasShippingMethods
                hasShippingMethods: !!sorted_filtered_shipping_methods.length,
                // @property {Boolean} display select instead of radio buttons
                showSelectForShippingMethod: sorted_filtered_shipping_methods.length > 5,
                // @property {Array} shippingMethods
                shippingMethods: sorted_filtered_shipping_methods,
                // @property {Boolean} showTitle
                showTitle: !this.options.hide_title,
                // @property {Straing} title
                title: this.options.title || Utils.translate('Delivery Method')
            };
            // @class OrderWizard.Module.Shipmethod
        }
    });
});


/*
 © 2017 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
 */

/* eslint-disable */
// @module Cart

define(
    'Cart.ShippingMethodForm.View.Site',
    [
        'cart_shippingMethod_form.tpl',
        'Profile.Model',
        'Backbone',
        'Backbone.CompositeView',
        'jQuery',
        'Handlebars'
    ],
    /* eslint-disable */
    function (
        /* eslint-enable */
        cartShippingMethodFormTpl,
        ProfileModel,
        Backbone,
        BackboneCompositeView,
        jQuery, Handlebars
    ) {
        'use strict';

        Handlebars.registerHelper('equalsShipMethod', function (val1, val2) {
            return val1 === val2;
        });

        return Backbone.View.extend({
            template: cartShippingMethodFormTpl,
            /* eslint-disable */
            initialize: function (options) {
                /* eslint-enable */
                this.model = options.model;
            },

            getContext: function () {
                var shipAddress = this.model.get('shipaddress'),
                    shipMethod = this.model.get('shipmethod'),
                    profileModel = ProfileModel.getInstance(),
                    isLoggedIn = profileModel.get('isLoggedIn') === 'T';

                var self = this,
                    shipping_methods = this.model.get('shipmethods').map(function (shipmethod) {
                        return {
                            name: shipmethod.get('name')
                            , rate: shipmethod.get('rate')
                            , rate_formatted: shipmethod.get('rate_formatted')
                            , internalid: shipmethod.get('internalid')
                            , isActive: shipmethod.get('internalid') === self.model.get('shipmethod')
                        };
                    });

                var shipping_methods_sorted = _.sortBy(shipping_methods, 'rate');

                var noShipAddress = function () {
                    if (!shipMethod || !shipAddress || (shipAddress === "-------null") || (shipAddress === "US-------null")) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                if (shipping_methods_sorted.length > 0 && !shipping_methods_sorted[0].internalid) {
                    var self = this;
                    this.model.save().always(function () {
                        /* eslint-disable */
                        self.showContent();
                    });
                }
                return {
                    //  @propery {Boolean} shipAddress
                    noShipAddress: noShipAddress(),
                    //  @propery {String} shipAddress
                    ShipAddress: this.model.get('shipaddress'),
                    //  @propery {String} shipMethod
                    shipMethod: shipMethod,
                    //  @propery {Array} shippingMethods
                    ShippingMethods: shipping_methods_sorted,
                    //  @propery {Boolean} noShippingMethods
                    oneShippingMethod: this.model.get('shipmethods').length === 1,
                    //  @propery {Boolean} noShippingMethods
                    noShippingMethods: this.model.get('shipmethods').length === 0,
                    //  @propery {Boolean} isLoggedIn
                    isLoggedIn: isLoggedIn
                }
            }
        });
    });


    //@class Cart.PromocodeForm.View.Initialization.options
    //@property {LiveOrder.Model} model
    //@property {ApplicationSkeleton} application


/**
 * Created by ammann on 7/7/17.
 */
/* eslint-disable */
define('Cart.Summary.View.Site', [
    'Cart.Summary.View',
    'Profile.Model',
    'Cart.ShippingMethodForm.View.Site',
    'underscore'
],
    function CartSummaryViewSite(
        View,
        ProfileModel,
        ShippingMethodFormView,
        _
    ) {
        'use strict';

        _.extend(View.prototype, {
            childViews: _.extend(View.prototype.childViews || {}, {
                'Cart.ShippingMethods': function () {
                    return new ShippingMethodFormView({
                        model: this.model
                    })
                }
            })
        });

        View.prototype.installPlugin('postContext', {
            name: 'themeHorizonContext',
            priority: 10,
            execute: function execute(context, view) {
                var modelOption = view.model,
                    shipAddress = modelOption.get('shipaddress'),
                    shipMethod = modelOption.get('shipmethod'),
                    summary = modelOption.get('summary'),
                    profileModel = ProfileModel.getInstance(),
                    isLoggedIn = profileModel.get('isLoggedIn') === 'T';

                var customerCategory = profileModel.attributes.category;
                var custPriceLevel = profileModel.attributes.priceLevel;

                var noShipAddress = function () {
                    if (!shipMethod || !shipAddress || (shipAddress === "-------null") || (shipAddress === "US-------null")) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                    totalShippingCost = _.formatCurrency(summary.shippingcost + summary.handlingcost),
                    hidePromo = isLoggedIn && profileModel.get('priceLevel') != '1' && profileModel.get('priceLevel') != '5';

                // remove existing promocode
                var promocodes = view.model.get('promocodes') || [];
                if (hidePromo && promocodes.length > 0) {
                    view.model
                        .save({ 'promocodes': [] })
                        .always(function promocodeSaveFinished() {
                            view.model.trigger('promocodeUpdated', 'removed');
                        });
                }

                _.extend(context, {
                    noShipAddress: noShipAddress,
                    totalShippingCost: totalShippingCost,
                    //  @propery {Boolean} isLoggedIn
                    isLoggedIn: isLoggedIn,
                    showPromocodeForm: context.showPromocodeForm && !hidePromo,
                    //  @property {Boolean} isDealer
                    isDealer: custPriceLevel != 1 && custPriceLevel != 5 //customerCategory === 'Dealer (Approved)'
                });
            }
        });
    });



define(
	'ShippingMethodExtension.Checkout',   
	[ 
		'Profile.Model',
		'OrderWizard.Module.CartSummary.Site',
		'OrderWizard.Module.Shipmethod.Site',
		'OrderWizard.Module.ShowShipments.Site',
		'Cart.ShippingMethodForm.View.Site',
		'Cart.Summary.View.Site'

	]
,   function 
	(
		ProfileModel,
		OrderWizardModuleCartSummarySite,
		OrderWizardModuleShipmethodSite,
		OrderWizardModuleShowShipmentsSite,
		CartShippingMethodFormViewSite,
		CartSummaryViewSite
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			
		}
	};
});



};

extensions['Folio3.Signifyd.1.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/Folio3/Signifyd/1.0.1/' + asset;
}

// @module Folio3.Signifyd.MyCoolModule
define('Signifyd.View'
    , [
        'signifyd.tpl'
        , 'Backbone'
        , 'jQuery'
        , 'underscore'
    ]
    , function (
        signifyd_tpl
        , Backbone
        , jQuery
        , _
    ) {
        'use strict';

        // @class Folio3.Signifyd.MyCoolModule.View @extends Backbone.View
        return Backbone.View.extend({

            template: signifyd_tpl

            , initialize: function (options) {
                this.application = options.container;

                //this.cart = LiveOrderModel.getInstance();
            }

            , events: {}

            , bindings: {}

            , childViews: {}

            //@method getContext @return Folio3.Signifyd.MyCoolModule.View.Context
            , getContext: function getContext() {
                var cart = this.application.getComponent('Cart');
                var lines = cart.getLines();
                var self = this;
                if(!this.showScript) {
                    lines.then(function (lines) {
                        if (!!lines && lines.length > 0) {
                            var baseURL = SC.ENVIRONMENT.siteSettings.touchpoints.home;
                            if (SC.ENVIRONMENT.siteSettings.touchpoints.home.indexOf('?') > -1) {
                                baseURL = SC.ENVIRONMENT.siteSettings.touchpoints.home.substr(0, SC.ENVIRONMENT.siteSettings.touchpoints.home.indexOf('?'));
                            }
                            var hostingURL = btoa(baseURL);
                            console.log(hostingURL);
                            self.sessionId = 'SIG-SCC-' + hostingURL + "-";
                            var id = lines[0].internalid;
                            self.sessionId += id;
                            if (!!window && !!window.sessionStorage) {
                                window.sessionStorage.setItem('signifydsessionid', self.sessionId);
                            }
                            // try {
                            //     for (var i = 0; i < lines.length; i++) {
                            //         if (!!lines[i].options && lines[i].options.length > 0) {
                            //             lines[i].options = lines[i].options.filter(function (option) {
                            //                 if (option.cartOptionId === 'custcol_f3_signifyd_session_id') {
                            //                     option.value = sessionId;
                            //                 }
                            //                 return true;
                            //             });
                            //         }
                            //         cart.updateLine(lines[i]);
                            //     }
                            // } catch (e) {
                            // }
                            self.showScript = true;
                            self.render();
                        }

                    });
                }
                return {
                    sessionId: this.sessionId,
                    showScript : this.showScript
                };
            }
        });
    });


define('Signifyd.Session.View'
    , [
        'Wizard.Module'
        , 'signifyd_session_view.tpl'
    ]
    , function (
        WizardModule
        , signifyd_session_view_tpl
    )
    {
        'use strict';
        return WizardModule.extend({
            template: signifyd_session_view_tpl
            , getContext: function getContext()
            {
                var sessionId = window.sessionStorage.getItem('signifydsessionid');
                this.model.get('options').custbody_f3_signifyd_session_id = sessionId;
                return {
                    isReview: this.step.step_url == 'review'
                };
            }
        });
    });



define(
	'Signifyd'
,   [
		'Signifyd.View'
	]
,   function (
		SignifydView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');

			if(layout)
			{
				layout.addChildView('Header.Logo', function() {
					return new SignifydView({ container: container });
				});
			}

			var checkout = container.getComponent('Checkout');
			checkout.addModuleToStep(
				{
					step_url: 'opc'
					, module: {
						id: 'SessionView'
						, index: 6
						, classname: 'Signifyd.Session.View'
					}
				});
			checkout.addModuleToStep(
				{
					step_url: 'review'
					, module: {
						id: 'SessionView'
						, index: 99
						, classname: 'Signifyd.Session.View'
					}
				});


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

SC.ENVIRONMENT.EXTENSIONS_JS_MODULE_NAMES = ["BackbonePluginInstaller","HeaderReorganization.Header.Profile.View","Klaviyo.Tracker","Utils.Extend","PepperJamTracker","SearchRecommendations.View","OrderWizard.Module.CartSummary.Site","OrderWizard.Module.Shipmethod.Site","OrderWizard.Module.ShowShipments.Site","ShippingMethodExtension.View","Cart.ShippingMethodForm.View.Site","Cart.Summary.View.Site","Signifyd.View","Signifyd.Session.View","OrderWizard.SignifydTracker","SignifydTracker","SignifydTracker.Model","SignifydTrackerExtension","Facets.ItemCell.View.Extension","NSeComm.ThemeHelper.Main","ThemeHelper.ProductDetails.Full.View","ThemeHelper.Cart.Lines.View","ThemeHelper.ProductDetails.QuickView.View","ThemeHelper.Transaction.Line.Views.Cell.Navigable.View","ThemeHelper.Cart.Item.Summary.View","ThemeHelper.Facets.Browse.View","NSeComm.ThemeHelper.MyAccount","ThemeHelper.Transaction.Line.Views.Cell.Actionable.View","ThemeHelper.Cart.Summary.View","ThemeHelper.OrderWizard.Module.CartSummary","ThemeHelper.LoginRegister.Register.View","ThemeHelper.Header.View","ThemeHelper.OrderWizard.Module.Address","ThemeHelper.CreditCard.Edit.Form.SecurityCode.View","ThemeHelper.CreditCard.Edit.Form.View","ThemeHelper.GoogleTagManager","ThemeHelper.Cart.Detailed.View","ThemeHelper.ProductReviews.Review.View","ThemeHelper.ProductDetails.Quantity.View","ThemeHelper.ProductHideAddToCart.Checker","ThemeHelper.ProductReviews.Center.View","ThemeHelper.Footer.View","ThemeHelper.ProductList.View","ThemeHelper.Facets.FacetedNavigationItemCategory.View","ThemeHelper.Address.Edit.Fields.View"];
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
	extensions['ACS.CustomFieldsPlacement.1.0.0']();
	SC.addExtensionModule('ACS.CustomFieldsPlacement');
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
	extensions['SuiteLabs.Klaviyo.1.0.0']();
	SC.addExtensionModule('SuiteLabs.Klaviyo.Checkout');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.ManageScreenErrors.1.0.0']();
	SC.addExtensionModule('ManageCheckoutErrors.Main');
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
	extensions['SuiteLabs.PayPalExpressPatch.1.0.0']();
	SC.addExtensionModule('SuiteLabs.PayPalExpressPatch.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.PepperjamExtension.1.0.0']();
	SC.addExtensionModule('PepperjamExtension.EntryPoint');
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
	extensions['SSD.ShippingMethodExtension.1.0.7']();
	SC.addExtensionModule('ShippingMethodExtension.Checkout');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['Folio3.Signifyd.1.0.1']();
	SC.addExtensionModule('Signifyd');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.SignifydTrackerExtension.1.0.0']();
	SC.addExtensionModule('SignifydTrackerExtension.Checkout');
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
	SC.addExtensionModule('NSeComm.ThemeHelper.Checkout');
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

