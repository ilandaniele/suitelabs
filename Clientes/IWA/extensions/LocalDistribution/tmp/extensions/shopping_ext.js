var extensions = {};

extensions['SSD.AvailableFinishesExtension.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/AvailableFinishesExtension/1.0.0/' + asset;
}

/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

//@module Finishes
define( 'ItemRelations.Finishes.Collection', [

	'Backbone',
	'underscore',
	'Utils'

], function (

    Backbone, _, Utils

) {
    'use strict';

    // @extend Backbone.Model
    return Backbone.Collection.extend( {

        initialize: function ( options ) {

            this.internalid = options.internalid;

        },

        //@property {String} urlRoot
        url: function () {
            return Utils.getAbsoluteUrl( 
                getExtensionAssetsPath('services/Finishes.Service.ss' )) + '?n=' + SC.ENVIRONMENT.siteSettings.siteid + '&internalid=' + this.internalid;
        },

        parse: function ( response ) {

            this.itemsIds = response;

            return response;

        }

    } );
} );


/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module ItemRelations
define( 'ItemRelations.Finishes.View', [

	'ItemRelations.Finishes.Collection',
	'ItemRelations.Related.View',
	'Backbone.CollectionView',
	'ItemRelations.RelatedItem.View',
	'ItemRelations.Related.Finishes.Collection',
	'SC.Configuration',
	'Tracker',

	'item_relations_finishes_related.tpl',
	'item_relations_row.tpl',
	'item_relations_cell.tpl',

	'jQuery',
	'Backbone',
	'underscore',
	'Utils'

], function (

    ItemRelationsFinishesCollection,

    ItemRelationsRelatedView,
    BackboneCollectionView,
    ItemRelationsRelatedItemView,
    ItemRelationsRelatedCollection,
    Configuration,
    Tracker,

    item_relations_related_tpl,
    item_relations_row_tpl,
    item_relations_cell_tpl,

    jQuery,
    Backbone,
    _,
    Utils
) {
    'use strict';

    // @class ItemRelations.Related.View @extends Backbone.CollectionView
    return ItemRelationsRelatedView.extend( {

        template: item_relations_related_tpl,

        initialize: function (container) {

            var self = this;

            this.is_sca_advance = SC.CONFIGURATION.siteSettings.sitetype === 'ADVANCED';

            var layout = this.options.application.getLayout();

            var collection = new ItemRelationsRelatedCollection( {
                itemsIds: []
            } );

            var finishesCollection = new ItemRelationsFinishesCollection( {
                internalid: this.options.parentItemId
            } );

            BackboneCollectionView.prototype.initialize.call( this, {
                collection: collection,
                viewsPerRow: Infinity,
                cellTemplate: item_relations_cell_tpl,
                rowTemplate: item_relations_row_tpl,
                childView: ItemRelationsRelatedItemView,
                template: item_relations_related_tpl
            } );
            if (!SC.isPageGenerator()) {
                finishesCollection.fetch().then( function () {

                    if ( finishesCollection.itemsIds && finishesCollection.itemsIds.length ) {

                        collection.itemsIds = finishesCollection.itemsIds;

                        self.loadRelatedItem();

                        self.$el.fadeIn();
                        
                        

                    } else {
                        self.$el.remove();
                    }

                });
            }
        },
        render: function() {
            BackboneCollectionView.prototype.render.call(this);
            if (SC.CONFIGURATION.siteSettings.sitetype === 'ADVANCED') {
                var layout = this.options.application.getLayout();
                if (!jQuery.contains(document.documentElement, this.$el[0])) {
                    layout.once('afterAppendView', this.carouselInitialize, this);
                } else {
                    this.carouselInitialize();
                }
            }
            return this;
        },
    	carouselInitialize: function carouselInitialize() {
			var carousel = $('.finishes-items [data-type="carousel-items"]');
	        $(carousel).bxSlider(SC.CONFIGURATION.bxSliderDefaults);
			console.log("carouselInitialize");
		}

    } );
} );


/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module ItemRelations
define( 'ItemRelations.Related.Finishes.Collection', [

	'SC.Configuration',
	'Item.Collection',
	'underscore',
	'Utils'

], function (

    Configuration,
    ItemCollection,
    _

) {

    'use strict';

    //@class ItemRelations.Related.Collection @extends Item.Collection
    return ItemCollection.extend( {

        initialize: function ( options ) {
            this.searchApiMasterOptions = Configuration.searchApiMasterOptions.typeAhead;
            this.itemsIds = _.isArray( options.itemsIds ) ? _.sortBy( options.itemsIds, function ( id ) {
                return id;
            } ) : [ options.itemsIds ];
        },

        fetchItems: function () {
            return this.fetch( {
                data: {
                    id: this.itemsIds.join( ',' )
                }
            } );
        },

        parse: function ( response ) //This method has been patched to fix sorting of related items, patch sent by support team
        {
            var original_items = _.compact( response.items );

            if ( original_items.length === 0 ) {
                return []; // No items. Return an empty array, nothing else to do here.
            }

            if ( original_items.length === 1 ) {
                return original_items[ 0 ]; // Same order is preserved.
            }

            // This is to avoid repeated related items among different items. (Cart page)
            var self = this,
                items = {};

            _.each( original_items, function ( item ) {
                items[ item.internalid ] = item;
            } );

            return _.toArray( items );

        }
    } );
} );


/* eslint-disable */
define( 'ProductDetails.View.Site', [
    'ProductDetails.Full.View', 'ItemRelations.Finishes.View', 'jQuery', 'underscore' , 'Utils'
], function ( ProductDetailsFullView, ItemRelationsFinishesView, jQuery, _, Utils ) {
    'use strict';



    ProductDetailsFullView.prototype.childViews = _.extend( ProductDetailsFullView.prototype.childViews, {

        'Finishes.Related.View': function ( options ) {

            return new ItemRelationsFinishesView( {

                parentItemId: this.model.get( 'item' ).get( 'internalid' ),

                application: this.application

            } );
        }

    } )


    return {
        mountToApp: function mountToApp() {
            
            
            
            ProductDetailsFullView.prototype.installPlugin( 'postContext', {
                name: 'productDetailsSiteContext',
                priority: 10,
                execute: function execute( context ) {
                    var item = context.model.attributes.item;
                    var isMobileDevice = Utils.isPhoneDevice();
                    _.extend( context, {
                        backorder: item.get( 'custitemstockstatus' ) === "On Backorder",
                        instockdate: item.get( 'custitem25' ),
                        stockleadtime: item.get( 'custitemstockleadtimes' ),
                        shipping: item.get( 'custitemship_method_web' ),
                        couponcode: item.get( 'custitem75' ),
                        atf: item.get( 'custitematf' ),
                        cutoffdate: item.get( 'custitemcutoff_date' ),
                        itemId: item.id,
                        urlComponent: item.get( 'urlcomponent' ),
                        showImageStock: ( item.get( 'custitemstockstatus' ) == "In Stock" || item.get( 'custitemstockstatus' ) == "Preorder" || item.get( 'custitemstockstatus' ) == "Low Inventory" ) ? true : false,
                        headerCouponCode: item.get('custitem_header_coupon_code'),
                        itemid: item.get('itemid'),
                        brand: item.get('custitem84'),
                        isMobileDevice: isMobileDevice
                    } );
                }
            } );
        }
    };
} );



define(
	'AvailableFinishesExtension'
,   [
		'ItemRelations.Finishes.Collection',
		'ItemRelations.Finishes.View',
		'ItemRelations.Related.Finishes.Collection',
		'ProductDetails.View.Site'
	]
,   function (
		ItemRelationsFinishesCollection,
		ItemRelationsFinishesView,
		ItemRelationsRelatedFinishesCollection,
		ProductDetailsViewSite
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

extensions['SuiteLabs.CoolingCalculator.1.0.2'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/CoolingCalculator/1.0.2/' + asset;
}

define('CoolingCalculator.Results.View', [
    'CoolingCalculator.Results.Model',
    'cooling_calculator_results.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function CoolingCalculatorResultsViewModule(
    CoolingCalculatorResultsModel,
    CoolingCalculatorResultsTpl,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    var PageTypeBaseView = Backbone.View;

    return PageTypeBaseView.extend({
        template: CoolingCalculatorResultsTpl,

        initialize: function initialize(options) {
            this.options = options || {};
            this.tlcId = options.routerArguments[0];

            this.model = new CoolingCalculatorResultsModel({
                internalid: this.tlcId
            });
        },

        beforeShowContent: function beforeShowContent() {
            var promise = jQuery.Deferred();

            this.model.fetch({
                data: {
                    action: 'getThermalDetails',
                    tlcId: this.tlcId
                }
            }).always(function afterFetch() {
                promise.resolve();
            });
            return promise;
        },

        getContext: function getContext() {
            var items = this.model.get('items');
            var itemsByType = {};
            var isPreview = this.tlcId && this.model.get('isPreview');

            _(items).chain()
            .sortBy(function sortByBTUH(item) {
                return parseInt(item.btuh, 0);
            })
            .each(function eachItem(item) {
                var unitType = item.unitType;

                itemsByType[unitType] = itemsByType[unitType] || {
                    unitType: item.unitType_text,
                    itemList: []
                };

                item.exposure_text = item.exposure_text.split(',').join(' / ');

                if (item.notes) {
                    try {
                        item.notes = jQuery(item.notes).text();
                    } catch (e) {}
                }

                itemsByType[unitType].itemList.push(item);
            });
            items = _(_(itemsByType).toArray()).compact();

            return {
                tlcId: this.model.get('tlcId'),
                totalLoad: this.model.get('totalLoad'),
                items: items,
                hasItems: items.length > 0,
                isPreview: isPreview
            };
        }
    });
});


define('CoolingCalculator.View', [
    'CoolingCalculator.Results.Model',
    'cooling_calculator.tpl',
    'PageType.Base.View',
    'jQuery'
], function CoolingCalculatorViewModule(
    CoolingCalculatorModel,
    CoolingCalculatorTpl,
    PageTypeBaseViewComponent,
    jQuery
) {
    'use strict';

    var PageTypeBaseView = PageTypeBaseViewComponent.__esModule ? // eslint-disable-line no-underscore-dangle
        PageTypeBaseViewComponent.PageTypeBaseView :
        PageTypeBaseViewComponent;

    return PageTypeBaseView.extend({
        template: CoolingCalculatorTpl,

        initialize: function initialize() {
            this.model = new CoolingCalculatorModel();
        },

        getTitle: function getTitle() {
            return this.options.pageInfo.title;
        },

        beforeShowContent: function beforeShowContent() {
            var promise = jQuery.Deferred();

            this.options.pageInfo = {
                title: 'Thermal Load Calculation Worksheet',
                url: 'cellar-sizing-tool'
            };

            this.model.fetch({
                data: {
                    action: 'getRValues'
                }
            }).always(function afterFetch(data) {
                SC.SESSION = SC.SESSION || {};
                SC.SESSION.rValues = data.rValues;
                promise.resolve();
            });
            return promise;
        },

        getContext: function getContext() {
            return {};
        }
    });
});


/* globals getExtensionAssetsPath */
define('CoolingCalculator.Results.Model', [
    'SCModel',
    'Utils'
], function CoolingCalculatorResultsModelDefinition(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    var ChildItemsModel = function ChildItemsModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('Modules/Main/SuiteScript2/CoolingCalculator.Results.Service.ss'),
                true
            );
        };
    };

    ChildItemsModel.prototype = Object.create(SCModel.prototype);

    ChildItemsModel.prototype.constructor = ChildItemsModel;

    return ChildItemsModel;
});


/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/search',
    'N/runtime',
    'N/file',
    'N/log'
], function CoolingCalculatorModel(
    nSearch,
    nRuntime,
    nFile,
    log
) {
    'use strict';

    var Configuration = {
        tlcRecordTypeId: 'customrecord_thermal_load_calc',
        tlcRecordFields: {
            internalid: 'internalid',
            tlcId: 'custrecord_tlc_code',
            formId: 'custrecord_tlc_store_form_id',
            totalLoad: 'custrecord_tlc_total_load',
            isPreview: 'custrecord_tlc_preview'
        },
        tlcRecordItemTypeId: 'customrecord_recommended_cooling_unit',
        tlcRecordItemFields: {
            parentId: 'custrecord_rcu_tlc_parent',
            id: 'custrecord_rcu_item',
            name: {
                name: 'storedisplayname',
                join: 'custrecord_rcu_item'
            },
            units: 'custrecord_rcu_units',
            unitType: 'custrecord_rcu_split_type',
            btuh: 'custrecord_rcu_unit_btuh_adjusted',
            temp: 'custrecord_rcu_desired_temp',
            exposure: 'custrecord_rcu_interior_exterior',
            airflowsCold: 'custrecord_rcu_cold_ductable',
            airflowsHot: 'custrecord_rcu_hot_ductable',
            notes: 'custrecord_rcu_notes',
            thumbnail: {
                name: 'storedisplaythumbnail',
                join: 'custrecord_rcu_item'
            }
        },
        rValueRecordId: 'customrecord_material_r_value',
        rValueRecordFields: {
            rValue: 'custrecord_r_value',
            material: 'custrecord_material',
            location: 'custrecord_material_location',
            thickness: 'custrecord_compulse_thickness'
        }
    };

    var getAllSearchResults = function getAllSearchResults(searchResult, limit) {
        var stop = false;
        var intMaxReg = 1000;
        var intMinReg = 0;
        var result = [];
        var extras;

        while (!stop && nRuntime.getCurrentScript().getRemainingUsage() > 10) {
            // First loop get 1000 rows (from 0 to 1000), the second loop starts at 1001 to 2000 gets another 1000 rows and the same for the next loops
            extras = searchResult.getRange(intMinReg, intMaxReg);

            result = result.concat(extras);
            intMinReg = intMaxReg;
            intMaxReg += 1000;

            // If the execution reach the the last result set stop the execution
            if (extras.length < 1000 || (limit && result.length >= limit)) {
                stop = true;
            }
        }
        return result;
    };

    return {
        getThermalRecordFieldValue: function getThermalRecordFieldValue(fieldName, filters) {
            var thermalRecordSearch;
            var thermalRecordSearchResults = [];
            var thermalRecordFieldValue = '';

            thermalRecordSearch = nSearch.create({
                type: Configuration.tlcRecordTypeId,
                columns: [fieldName],
                filters: filters
            });
            thermalRecordSearchResults = getAllSearchResults(thermalRecordSearch.run());

            if (thermalRecordSearchResults.length) {
                thermalRecordSearchResults.forEach(function eachRecord(record) {
                    thermalRecordFieldValue = record.getValue(fieldName);
                    return false;
                });
            }
            return thermalRecordFieldValue;
        },

        getThermalRecordTLCIdByFormId: function getThermalRecordIdByFormId(formId) {
            return this.getThermalRecordFieldValue(Configuration.tlcRecordFields.tlcId, [
                [
                    Configuration.tlcRecordFields.formId, nSearch.Operator.IS, String(formId)
                ]
            ]);
        },

        getThermalRecordByTLC: function getThermalRecordByTLC(tlcId) {
            var thermalRecordSearch;
            var thermalRecordSearchResults = [];
            var thermalRecord = {};

            thermalRecordSearch = nSearch.create({
                type: Configuration.tlcRecordTypeId,
                columns: [
                    Configuration.tlcRecordFields.internalid,
                    Configuration.tlcRecordFields.formId,
                    Configuration.tlcRecordFields.totalLoad,
                    Configuration.tlcRecordFields.tlcId,
                    Configuration.tlcRecordFields.isPreview
                ],
                filters: [
                    Configuration.tlcRecordFields.tlcId, nSearch.Operator.IS, String(tlcId)
                ]
            });
            thermalRecordSearchResults = getAllSearchResults(thermalRecordSearch.run());

            if (thermalRecordSearchResults.length) {
                thermalRecordSearchResults.forEach(function eachRecord(record) {
                    var keys = Object.keys(Configuration.tlcRecordFields);
                    var currentKey;
                    var i;

                    for (i = 0; i < keys.length; i++) {
                        currentKey = keys[i];
                        thermalRecord[currentKey] = record.getValue(Configuration.tlcRecordFields[currentKey]);
                    }

                    return false;
                });
            }

            return thermalRecord;
        },

        getImageUrl: function getImageUrl(imageId) {
            var imageUrl;
            var image;

            try {
                if (imageId) {
                    image = nFile.load({ id: imageId });
                    imageUrl = image.url;
                }
            } catch (e) {
                log.error('Error while loading an image', e.message);
            }

            return imageUrl;
        },

        getTLCItemDetails: function getTLCItemDetails(tlcId) {
            var itemDetails = [];
            var thermalRecord = this.getThermalRecordByTLC(tlcId);
            var thermalRecordItemSearch;
            var thermalRecordItemSearchResults = [];
            var self = this;

            log.error('thermalRecord', JSON.stringify(thermalRecord));

            if (thermalRecord.internalid) {
                thermalRecordItemSearch = nSearch.create({
                    type: Configuration.tlcRecordItemTypeId,
                    columns: [
                        Configuration.tlcRecordItemFields.id,
                        Configuration.tlcRecordItemFields.name,
                        Configuration.tlcRecordItemFields.units,
                        Configuration.tlcRecordItemFields.unitType,
                        Configuration.tlcRecordItemFields.btuh,
                        Configuration.tlcRecordItemFields.temp,
                        Configuration.tlcRecordItemFields.exposure,
                        Configuration.tlcRecordItemFields.airflowsCold,
                        Configuration.tlcRecordItemFields.airflowsHot,
                        Configuration.tlcRecordItemFields.notes,
                        Configuration.tlcRecordItemFields.thumbnail
                    ],
                    filters: [
                        [
                            Configuration.tlcRecordItemFields.parentId, nSearch.Operator.IS, thermalRecord.internalid
                        ], 'and', [
                            'isinactive', nSearch.Operator.IS, 'F'
                        ]
                    ]
                });
                thermalRecordItemSearchResults = getAllSearchResults(thermalRecordItemSearch.run());

                if (thermalRecordItemSearchResults.length) {
                    thermalRecordItemSearchResults.forEach(function eachRecord(record) {
                        itemDetails.push({
                            id: record.getValue(
                                Configuration.tlcRecordItemFields.id
                            ),
                            name: record.getValue(
                                Configuration.tlcRecordItemFields.name
                            ),
                            units: record.getValue(
                                Configuration.tlcRecordItemFields.units
                            ) || 1,
                            unitType: record.getValue(
                                Configuration.tlcRecordItemFields.unitType
                            ),
                            unitType_text: record.getText(
                                Configuration.tlcRecordItemFields.unitType
                            ),
                            btuh: record.getValue(
                                Configuration.tlcRecordItemFields.btuh
                            ),
                            temp: record.getValue(
                                Configuration.tlcRecordItemFields.temp
                            ),
                            exposure: record.getValue(
                                Configuration.tlcRecordItemFields.exposure
                            ),
                            exposure_text: record.getText(
                                Configuration.tlcRecordItemFields.exposure
                            ),
                            airflowsCold: record.getValue(
                                Configuration.tlcRecordItemFields.airflowsCold
                            ),
                            airflowsHot: record.getValue(
                                Configuration.tlcRecordItemFields.airflowsHot
                            ),
                            notes: record.getValue(
                                Configuration.tlcRecordItemFields.notes
                            ),
                            showNotes: !!record.getValue(
                                Configuration.tlcRecordItemFields.notes
                            ),
                            thumbnail: self.getImageUrl(record.getValue(
                                Configuration.tlcRecordItemFields.thumbnail
                            ))
                        });
                    });
                }
            }
            return {
                tlcId: tlcId,
                totalLoad: thermalRecord.totalLoad,
                items: itemDetails,
                isPreview: !!thermalRecord.isPreview
            };
        },

        getMaterialRValues: function getMaterialRValues() {
            var rValuesRecordSearch = nSearch.create({
                type: Configuration.rValueRecordId,
                columns: [
                    Configuration.rValueRecordFields.rValue,
                    Configuration.rValueRecordFields.material,
                    Configuration.rValueRecordFields.location,
                    Configuration.rValueRecordFields.thickness
                ],
                filters: [
                    [
                        'isinactive', nSearch.Operator.IS, 'F'
                    ]
                ]
            });
            var rValuesRecordSearchResults = getAllSearchResults(rValuesRecordSearch.run());
            var rValues = [];

            if (rValuesRecordSearchResults.length) {
                rValuesRecordSearchResults.forEach(function eachRecord(record) {
                    rValues.push({
                        rValue: record.getValue(
                            Configuration.rValueRecordFields.rValue
                        ),
                        thickness: record.getValue(
                            Configuration.rValueRecordFields.thickness
                        ),
                        material: record.getValue(
                            Configuration.rValueRecordFields.material
                        ),
                        material_text: record.getText(
                            Configuration.rValueRecordFields.material
                        ),
                        location: record.getValue(
                            Configuration.rValueRecordFields.location
                        ).split(','),
                        location_text: record.getText(
                            Configuration.rValueRecordFields.location
                        ).split(',')
                    });
                });
            }
            return {
                rValues: rValues
            };
        }
    };
});


define('SuiteLabs.CoolingCalculator.Main', [
    'CoolingCalculator.View',
    'CoolingCalculator.Results.View',
    'CoolingCalculator.Results.Model',
    'Backbone',
    'jQuery',
    'underscore'
], function SuiteLabsCoolingCalculatorMain(
    CoolingCalculatorView,
    CoolingCalculatorResultsView,
    CoolingCalculatorResultsModel,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    var FORM_PAGE_FRAGMENT = 'cellar-sizing-tool';

    var CCID_FORM_META_ATTR = 'data-ccid';
    var CCID_ENTITY_FIELD = 'custentity_ccalc_id';
    var DATA_ENTITY_FIELD = 'custentity_ccalc_data';

    var FORM_INSULATION_CONCRETE_BLOCK_4 = '10';
    var FORM_INSULATION_CONCRETE_BLOCK_8 = '11';
    var FORM_INSULATION_CONCRETE_BLOCK_12 = '12';
    var FORM_INSULATION_POURED_CONCRETE = '13';
    var FORM_INSULATION_ENTER_RVALUE_ID = '23';

    var FORM_EXPOSURE_BELOW_GRADE = '3';
    var FORM_EXPOSURE_ON_GRADE = '4';

    var displayError = function displayError($container, errorCode, errorMessage, $targetInput, inlineStyles, noFocus) {
        var className = 'message-error';
        var noError = !errorMessage;
        var errorId = $targetInput ? $targetInput.attr('id') || $targetInput.attr('name') || 'generic-error' : 'generic-error';
        var errorData = 'data-error="' + errorCode + '.' + errorId + '"';
        var $errorContainer;

        var inputHasAnotherError = function inputHasAnotherError() {
            var idRegExp = new RegExp('.' + errorId + '$');
            var hasError = false;

            $container.parent().find('[data-error]').each(function eachInput() {
                var inputDataError = jQuery(this).data('error');
                hasError = hasError || idRegExp.test(inputDataError);
            });
            return hasError;
        };

        $errorContainer = $container.parent().find('[' + errorData + ']');
        if (noError) {
            $errorContainer.remove();
        } else if ($errorContainer.length) {
            $errorContainer.html(errorMessage);
        } else {
            $container.after(
                '<div ' + errorData + ' class="' + className + '" style="' + inlineStyles + '">'
                    + errorMessage +
                '</div>'
            );
        }

        if (noError) {
            if ($targetInput && !inputHasAnotherError()) {
                $targetInput.removeClass(className);
            }
        } else if ($targetInput) {
            $targetInput.addClass(className);
            if (!noFocus) { $targetInput.focus(); }
        }
    };

    var getFieldValue = function getFieldValue($field) {
        var ret;

        if ($field.attr('type') !== 'checkbox') {
            ret = $field.val();
        } else {
            ret = $field.is(':checked');
        }

        return ret;
    };

    var setAutocalculatedFields = function setAutocalculatedFields(jsonData) {
        return jsonData;
    };

    // Returns the R value for the material and thickness and location
    var getMaterialRValue = function getMaterialRValue(material, thickness, location) {
        var r;
        var results;

        if (!material || material === FORM_INSULATION_ENTER_RVALUE_ID) {
            return '';
        }

        results = SC.SESSION.rValues.filter(function eachValue(rData) {
            return rData.material === material && (!location || rData.location.indexOf(location) !== -1);
        });

        if (results.length) {
            r = (Number(results[0].rValue)) * (Number(results[0].thickness) || Number(thickness));
        }

        return r || '';
    };

    var calculateR = function calculateR($this) {
        var $row = $this.closest('.row');
        var material = $row.find('[name*="Insulation"]').val();
        var thickness = $row.find('[name*="Thickness"]').val();
        var location = $row.find('[name*="Exposure"]').val();

        return getMaterialRValue(material, thickness, location);
    };

    var recalcThiknessesAndRValues = function recalcThiknessesAndRValues($this, thikness, disabled) {
        var $row = $this.closest('.row');
        var $rValue = $row.find('[name*="RValue"]');
        var $thickness = $row.find('[name*="Thickness"]');
        var rValue;

        $thickness.prop('disabled', disabled).val(
            thikness || $thickness.data('default-value')
        );

        rValue = calculateR($rValue, 'material');
        $rValue.prop('disabled', disabled || !thikness).val(rValue).trigger('change');
    };

    // Use the Pythagorean theorem to calculate the length of the hypotenuse
    var pythagorean = function pythagorean(sideA, sideB) {
        return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
    };

    var onCellarDimsChange = function onCellarDimsChange($form) {
        var shape = $form.find('[name="shape"]').val();
        var depth;
        var width;
        var height1;
        var height2;
        var heightAverage;
        var hypotenuse;
        var volume;
        var wallAreas = [];
        var wallAreaFields = [
            'frontWallArea',
            'leftWallArea',
            'rearWallArea',
            'rightWallArea',
            'ceilingArea',
            'floorArea'
        ];
        var i;

        if (shape === '1') {  // 1 = rectangular
            $form.find('[name="height2"]').val(
                $form.find('[name="height1"]').val()
            );
        }

        depth = Number($form.find('[name="depth"]').val() || 0);
        width = Number($form.find('[name="width"]').val() || 0);
        height1 = Number($form.find('[name="height1"]').val() || 0);
        height2 = Number($form.find('[name="height2"]').val() || 0);

        heightAverage = (height1 + height2) / 2;
        wallAreas[0] = width * heightAverage;
        wallAreas[1] = depth * height1;
        wallAreas[2] = width * heightAverage;
        wallAreas[3] = depth * height2;

        hypotenuse = pythagorean((height1 - height2), width);
        wallAreas[4] = hypotenuse * depth;
        wallAreas[5] = depth * width;

        volume = depth * width * heightAverage;

        for (i = 0; i < wallAreaFields.length; i++) {
            $form.find('[name="' + wallAreaFields[i] + '"]').val(
                Math.round(wallAreas[i], 1)
            );
        }
        $form.find('[name="volume"]').val(
            Math.round(volume, 1)
        );
    };

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var pageType = container.getComponent('PageType');

            pageType.registerPageType({
                name: 'CoolingCalculator',
                view: CoolingCalculatorView,
                routes: [FORM_PAGE_FRAGMENT]
            });

            pageType.registerPageType({
                name: 'CoolingCalculator',
                view: CoolingCalculatorResultsView,
                routes: [FORM_PAGE_FRAGMENT + '/:id']
            });

            if (environment) {
                environment.coolingCalculatorModel = new CoolingCalculatorResultsModel();

                environment.on('customFormAfterSubmit', function afterFormSubmit() {
                    var model = environment.coolingCalculatorModel;
                    var $form = jQuery('form[data-form-id]');
                    var $preview = $form.find('#preview-button');
                    var isPreview = $form.find('[name="custentity_ccalc_preview"]').val() === 'T';
                    
                    // Reset the preview flags immediately to ensure the form stays clean
                    if (isPreview) {
                        $form.find('[name="custentity_ccalc_preview"]').val('');
                        $form.find('[data-prevent-clear-fields]').val('false');
                    }

                    model.fetch({
                        data: {
                            action: 'getTLCId',
                            formId: model.get('formId')
                        }
                    }).always(function afterFetch(tlcId) {
                        if (tlcId) {
                            var resultsUrl = '/' + FORM_PAGE_FRAGMENT + '/' + tlcId;

                            if (isPreview) {
                                // For preview, open in a new window and leave the form as is
                                window.open(resultsUrl, '_blank');
                                var buttonCheckInterval = $form.data('button-check-interval');
                                if (buttonCheckInterval) {
                                    clearInterval(buttonCheckInterval);
                                }
                                $preview.prop('disabled', false).text($preview.data('original-text'));
                            } else {
                                // For normal submit, navigate to the results page
                                Backbone.history.navigate(resultsUrl, {
                                    trigger: true
                                });
                            }
                        } else {
                            setTimeout(function customFormAfterSubmit() {
                                environment.cancelableTrigger('customFormAfterSubmit');
                            }, 3000);
                        }
                    });
                });

                environment.on('customFormBeforeSubmit', function beforeFormSubmit(options) {
                    var ccid;
                    var jsonData = {};
                    var $form;
                    var $deferred = jQuery.Deferred();
                    var isValidFormData = true;
                    var model;
                    var config = environment.getConfig('coolingCalculator');
                    var errorMessages = {};
                    var isPreview = false;

                    if (options.triggeringForm === config.formId) {
                        $form = jQuery('form[data-form-id]');
                        model = environment.coolingCalculatorModel;
                        $form.find('[name]').each(function eachField() {
                            var $field = jQuery(this);
                            var name = $field.attr('name');

                            if (name === 'custentity_ccalc_preview' && $field.val() === 'T') {
                                isPreview = true;
                            }

                            if (name !== DATA_ENTITY_FIELD && name !== CCID_ENTITY_FIELD) {
                                jsonData[name] = getFieldValue($field);
                            }
                        });

                        // Field validation

                        $form.find('#cooling-calc-construction-info').find('input[min], input[max]').each(function eachInput() {
                            var $input = jQuery(this);
                            var $row = $input.closest('.row');
                            var inputName = $input.attr('name');
                            var inputIsDisabled = $input.is(':disabled');
                            var min = inputIsDisabled ? NaN : parseFloat($input.attr('min'));
                            var max = inputIsDisabled ? NaN : parseFloat($input.attr('max'));
                            var val = parseFloat($input.val());
                            var errorStyle = 'display:block; margin: -6px 0 4px;';
                            var errorCode = 'limitValue.' + inputName;
                            var errorMessage;

                            var getErrorMessage = function getErrorMessage(min, max) {
                                var nanErrorMessage = '$(0) must be between $(1) and $(2)';
                                var minErrorMessage = '$(0) must be greater than or equal to $(1)';
                                var maxErrorMessage = '$(0) must be less than or equal to $(2)';

                                return isNaN(min) ? maxErrorMessage : (isNaN(max) ? minErrorMessage : nanErrorMessage);
                            };

                            if ((isNaN(val) && !(isNaN(min) && isNaN(max)))
                                || (!isNaN(min) && min > val)
                                || (!isNaN(max) && val > max)) {
                                    isValidFormData = false;
                                    errorMessage = _.translate(
                                        getErrorMessage(min, max),
                                        $input.data('label') || inputName, min, max
                                    );
                                    displayError(
                                        $row,
                                        errorCode,
                                        errorMessage,
                                        $input,
                                        errorStyle,
                                        true
                                    );
                                    errorMessages[errorCode] = errorMessage;
                            } else {
                                displayError($row, errorCode, '', $input);
                            }
                        });

                        // [
                        //     'frontWallRValue', 'leftWallRValue',
                        //     'rearWallRValue', 'rightWallRValue',
                        //     'ceilingRValue', 'floorRValue'
                        // ].forEach(function eachRValue(fieldName) {
                        //     var $row = $form.find('[name="' + fieldName + '"]').closest('.row');
                        //     var $insulation = $row.find('[name*="Insulation"]');
                        //     var $rValue = $row.find('[name*="RValue"]');
                        //     var errorCode = 'rValue';
                        //     var errorStyle = 'display:block; margin: -6px 0 4px;';
                        //     var errorMessage = 'Chosen insulation requires an R-Value';

                        //     if ($insulation.val() === FORM_INSULATION_ENTER_RVALUE_ID && !$rValue.val().trim()) {
                        //         isValidFormData = false;
                        //         displayError(
                        //             $row,
                        //             errorCode,
                        //             errorMessage,
                        //             $rValue,
                        //             errorStyle,
                        //             true
                        //         );
                        //         errorMessages[errorCode] = errorMessage;
                        //     } else {
                        //         displayError($row, errorCode, '', $rValue);
                        //     }
                        // });

                        [
                            'frontWallArea', 'leftWallArea',
                            'rearWallArea', 'rightWallArea'
                        ].forEach(function eachWallArea(fieldName) {
                            var $row = $form.find('[name="' + fieldName + '"]').closest('.row');
                            var $wallArea = $row.find('[name*="WallArea"]');
                            var $glassArea = $row.find('[name*="GlassArea"]');
                            var errorCode = 'wallArea';
                            var errorStyle = 'display:block; margin: -6px 0 4px;';
                            var errorMessage = 'Glass Area cannot exceed Wall Area';

                            if (Number($glassArea.val()) > Number($wallArea.val())) {
                                isValidFormData = false;
                                displayError(
                                    $row,
                                    errorCode,
                                    errorMessage,
                                    $glassArea,
                                    errorStyle,
                                    true
                                );
                                errorMessages[errorCode] = errorMessage;
                            } else {
                                displayError($row, errorCode, '', $glassArea);
                            }
                        });

                        // ----------------

                        if (isValidFormData) {
                            jsonData = setAutocalculatedFields(jsonData, $form);
                                                        
                            // Store isPreview flag in the data
                            jsonData.isPreview = isPreview;
                            
                            $form.find('[name="' + DATA_ENTITY_FIELD + '"]').val(
                                JSON.stringify(jsonData)
                            );

                            ccid = $form.find('[' + CCID_FORM_META_ATTR + ']').val().trim();
                            model.set('formId', ccid.toLowerCase() + '#' + String(new Date().getTime()));
                            model.set('isPreview', isPreview);
                            $form.find('[name="' + CCID_ENTITY_FIELD + '"]').val(model.get('formId'));

                            $deferred.resolve();
                        } else {
                            $deferred.reject(
                                _(_(errorMessages).toArray()).uniq().join(' / ') || 'Your request cannot be sent'
                            );
                        }
                    }
                    return $deferred;
                });
            }

            window.addEventListener('afterShowCoolingCalculatorForm', function afterShowCoolingCalculatorForm() {
                var $form = jQuery('form[data-form-id]');
                var rValue = '';

                $form.find('[name*="Insulation"]').on('change', function onInsulationChange(e, silent) {
                    var $this = jQuery(this);
                    var insulationValue = jQuery(this).val();

                    var $allInsulations = $form.find('[name*="Insulation"]');

                    var $closestRValue = $this.closest('.row').find('[name*="RValue"]');
                    var $closestThikness = $this.closest('.row').find('[name*="Thickness"]');

                    // Copy the values just once to make things easier for the user,
                    // once the user has made a selection then that decision should be preserved
                    if (this.name === 'frontWallInsulation') {
                        $allInsulations.each(function eachInsulation() {
                            var $each = jQuery(this);

                            $closestRValue = $each.closest('.row').find('[name*="RValue"]');
                            $closestThikness = $each.closest('.row').find('[name*="Thickness"]');

                            if ($each.data('freeze') !== 'T') {
                                $each.val(insulationValue);
                                switch ($each.val()) {
                                case FORM_INSULATION_ENTER_RVALUE_ID:
                                    $closestRValue.prop('disabled', false).val('');
                                    $closestThikness.prop('disabled', true).val('');
                                    break;
                                case FORM_INSULATION_CONCRETE_BLOCK_4:
                                    recalcThiknessesAndRValues($each, '4', true);
                                    break;
                                case FORM_INSULATION_CONCRETE_BLOCK_8:
                                    recalcThiknessesAndRValues($each, '8', true);
                                    break;
                                case FORM_INSULATION_CONCRETE_BLOCK_12:
                                    recalcThiknessesAndRValues($each, '12', true);
                                    break;
                                default:
                                    recalcThiknessesAndRValues($each, '', false);
                                    break;
                                }
                            }
                        });
                    } else {
                        switch ($this.val()) {
                        case FORM_INSULATION_ENTER_RVALUE_ID:
                            $closestRValue.prop('disabled', false).val('');
                            $closestThikness.prop('disabled', true).val('');
                            break;
                        case FORM_INSULATION_CONCRETE_BLOCK_4:
                            recalcThiknessesAndRValues($this, '4', true);
                            break;
                        case FORM_INSULATION_CONCRETE_BLOCK_8:
                            recalcThiknessesAndRValues($this, '8', true);
                            break;
                        case FORM_INSULATION_CONCRETE_BLOCK_12:
                            recalcThiknessesAndRValues($this, '12', true);
                            break;
                        default:
                            recalcThiknessesAndRValues($this, '', false);
                            break;
                        }
                        $this.attr('data-freeze', 'T');

                        if (this.name === 'floorInsulation') {
                            $this.closest('.row').find('[name="floorExposure"]').trigger('change');
                        }
                    }
                });

                $form.find('[name*="Thickness"]').on('change', function onThicknessChange() {
                    var $this = jQuery(this);
                    var $rValue = $this.closest('.row').find('[name*="RValue"]');

                    rValue = calculateR($this, 'thickness');
                    return rValue ? $rValue.val(rValue).trigger('change') : '';
                });

                $form.find('[name*="RValue"]').on('change', function onThicknessChange() {
                    var $this = jQuery(this);
                    var $insulation = $this.closest('.row').find('[name*="Insulation"]');
                    var isFrontWall = $insulation.attr('name') === 'frontWallInsulation';

                    return $insulation.attr('data-freeze', isFrontWall ? 'F' : 'T');
                });

                $form.find('[name*="Exposure"]').on('change', function onExposureChange() {
                    var $this = jQuery(this);
                    var $rValue = $this.closest('.row').find('[name*="RValue"]');

                    rValue = $this.val() ? calculateR($this, 'location') : '';
                    return rValue ? $rValue.val(rValue) : '';
                });

                $form.find(
                    '[name="depth"],'
                    + '[name="width"],'
                    + '[name="height1"],'
                    + '[name="height2"]'
                ).on('change', function onCellarDimensionChange() {
                    onCellarDimsChange($form);
                });

                $form.find('[name="shape"]').on('change', function onCellarShapeChange() {
                    var $this = jQuery(this);
                    var shape = $form.find('[name="shape"]').val();
                    var cellarDimFields = [
                        'depth',
                        'width',
                        'height1',
                        'height2'
                    ];
                    var wallAreaFields = [
                        'frontWallArea',
                        'leftWallArea',
                        'rearWallArea',
                        'rightWallArea',
                        'ceilingArea',
                        'floorArea'
                    ];
                    var newState = [];
                    var i;

                    switch (String($this.val())) {
                    case '1': // 1 = rectangular
                        newState = [false, false, false, true];
                        break;
                    case '2': // 2 = other
                        newState = [true, true, true, true];
                        break;
                    case '3': // 3 = under stairs
                        newState = [false, false, false, false];
                        break;
                    default:
                        // Do nothing
                    }

                    for (i = 0; i < cellarDimFields.length; i++) {
                        $form.find('[name="' + cellarDimFields[i] + '"]').prop('disabled', newState[i]);
                    }
                    for (i = 0; i < wallAreaFields.length; i++) {
                        $form.find('[name="' + wallAreaFields[i] + '"]').prop('disabled', !newState[0]); // note this is set opposite
                    }
                    $form.find('[name="volume"]').prop('disabled', !newState[0]); // note this is set opposite

                    if (shape === '3') {  // 3 = Under stairs
                        $form.find('.cooling-calc-height2-container').show();
                        $form.find('[name="height2"]').attr('data-validate-required', true);
                        $form.find('[name="height2"]').attr('data-validate-required-message', _.translate('Height is required'));
                    } else {
                        $form.find('.cooling-calc-height2-container').hide();
                        $form.find('[name="height2"]').removeAttr('data-validate-required');
                        $form.find('[name="height2"]').removeAttr('data-validate-required-message');
                        $form.find('[name="height2"]').val(''); // Clear the value
                    }

                    onCellarDimsChange($form);
                });

                $form.find('[name*="GlassArea"]').change(function onGlassAreaChange() {
                    var $glassArea = jQuery(this);
                    var $glassType = $glassArea.closest('.row').find('[name*="GlassType"]');
                    var areaIsZero = !Number($glassArea.val());

                    if (areaIsZero) {
                        $glassType.val('');
                    }
                    $glassType.prop('disabled', areaIsZero);
                });

                $form.find('[name="floorExposure"]').change(function onFloorExposureChange() {
                    var $row = jQuery(this).closest('.row');
                    var $exposure = $row.find('[name*="Exposure"]');
                    var $thickness = $row.find('[name*="Thickness"]');
                    var $insulation = $row.find('[name*="Insulation"]');

                    if (String($insulation.val()) === FORM_INSULATION_POURED_CONCRETE &&
                        [FORM_EXPOSURE_BELOW_GRADE, FORM_EXPOSURE_ON_GRADE].indexOf(String($exposure.val())) !== -1) {
                        $thickness.attr('disabled', 'T');
                    } else {
                        $thickness.removeAttr('disabled');
                    }
                });

                $form.find('#cooling-calc-construction-info').find('input[min], input[max]').each(function eachInput() {
                    var $input = jQuery(this);

                    $input.change(function onChange() {
                        var $row = $input.closest('.row');
                        var inputName = $input.attr('name');
                        var inputIsDisabled = $input.is(':disabled');
                        var min = inputIsDisabled ? NaN : parseFloat($input.attr('min'));
                        var max = inputIsDisabled ? NaN : parseFloat($input.attr('max'));
                        var val = parseFloat($input.val());
                        var errorStyle = 'display:block; margin: -6px 0 4px;';
                        var errorCode = 'limitValue.' + inputName;
                        var errorMessage;

                        var getErrorMessage = function getErrorMessage(min, max) {
                            var nanErrorMessage = '$(0) must be between $(1) and $(2)';
                            var minErrorMessage = '$(0) must be greater than or equal to $(1)';
                            var maxErrorMessage = '$(0) must be less than or equal to $(2)';

                            return isNaN(min) ? maxErrorMessage : (isNaN(max) ? minErrorMessage : nanErrorMessage);
                        };

                        if ((isNaN(val) && !(isNaN(min) && isNaN(max)))
                            || (!isNaN(min) && min > val)
                            || (!isNaN(max) && val > max)) {
                                errorMessage = _.translate(
                                    getErrorMessage(min, max),
                                    $input.data('label') || inputName, min, max
                                );
                                displayError(
                                    $row,
                                    errorCode,
                                    errorMessage,
                                    $input,
                                    errorStyle
                                );
                        } else {
                            displayError($row, errorCode, '', $input);
                        }
                    });
                });

                // ['frontWallRValue', 'leftWallRValue', 'rearWallRValue', 'rightWallRValue', 'ceilingRValue', 'floorRValue'].forEach(
                //     function eachRValue(fieldName) {
                //         $form.find('[name="' + fieldName + '"]').change(function onChange() {
                //             var $row = jQuery(this).closest('.row');
                //             var $insulation = $row.find('[name*="Insulation"]');
                //             var $rValue = $row.find('[name*="RValue"]');
                //             var errorCode = 'rValue';
                //             var errorStyle = 'display:block; margin: -6px 0 4px;';

                //             if ($insulation.val() === FORM_INSULATION_ENTER_RVALUE_ID && !$rValue.val().trim()) {
                //                 displayError(
                //                     $row,
                //                     errorCode,
                //                     'Chosen insulation requires an R-Value',
                //                     $rValue,
                //                     errorStyle
                //                 );
                //             } else {
                //                 displayError($row, errorCode, '', $rValue);
                //             }
                //         });
                //     }
                // );

                ['frontWallArea', 'leftWallArea', 'rearWallArea', 'rightWallArea',
                 'frontWallGlassArea', 'leftWallGlassArea', 'rearWallGlassArea', 'rightWallGlassArea'].forEach(
                    function eachWallArea(fieldName) {
                        // Create a debounced validation function
                        var debouncedValidation = _.debounce(function validateGlassArea() {
                            var $row = jQuery(this).closest('.row');
                            var $wallArea = $row.find('[name*="WallArea"]');
                            var $glassArea = $row.find('[name*="GlassArea"]');
                            var errorCode = 'wallArea';
                            var errorStyle = 'display:block; margin: -6px 0 4px;';

                            if (Number($glassArea.val()) > Number($wallArea.val())) {
                                displayError(
                                    $row,
                                    errorCode,
                                    'Glass Area cannot exceed Wall Area',
                                    $glassArea,
                                    errorStyle
                                );
                            } else {
                                displayError($row, errorCode, '', $glassArea);
                            }
                        }, 500);

                        // Bind both input and change events to the debounced function
                        $form.find('[name="' + fieldName + '"]')
                            .on('input', debouncedValidation)
                            .on('change', debouncedValidation);
                    }
                );

                $form.find('#preview-button').on('click', function onPreviewButtonClick(e) {
                    e.preventDefault();
                    var $form = jQuery('form[data-form-id]');
                    
                    // Set both preview flags to true
                    $form.find('[name="custentity_ccalc_preview"]').val('T');
                    $form.find('[data-prevent-clear-fields]').val('true');

                    $form.submit();
                });

                environment.on('customFormBeforeSubmit', function beforeFormSubmit(options) {
                    var $form = jQuery('form[data-form-id]');
                    var $submit = $form.find('[type="submit"]');
                    var $preview = $form.find('#preview-button');
                    
                    // Store original text
                    $submit.data('original-text', $submit.text());
                    $preview.data('original-text', $preview.text());

                    $submit.prop('disabled', true);
                    $preview.prop('disabled', true);
                    
                    // If the preview flag is true, then we need to show the preview button with a processing message
                    // and then restore the button text to the original text after the request is complete
                    // also avoid changing the text for the submit button
                    if ( $form.find('[name="custentity_ccalc_preview"]').val() == 'T') {
                        $preview.text('Processing...');
                        var buttonCheckInterval = setInterval(function() {
                            if ($submit.text() !== $submit.data('original-text')) {
                                $submit.text($submit.data('original-text'));
                                clearInterval(buttonCheckInterval);
                            }
                        }, 50);
                        $form.data('button-check-interval', buttonCheckInterval);
                    }

                });

                environment.on('customFormAfterSubmit', function afterFormSubmit() {
                    var $form = jQuery('form[data-form-id]');
                    var $submit = $form.find('[type="submit"]');
                    var $preview = $form.find('#preview-button');
                    var buttonCheckInterval = $form.data('button-check-interval');

                    if (buttonCheckInterval) {
                        clearInterval(buttonCheckInterval);
                    }
                    
                    // Restore buttons to original state
                    $submit.prop('disabled', false).text($submit.data('original-text'));
                    $preview.prop('disabled', false).text($preview.data('original-text'));
                });
            });

            environment.on('customFormAfterLoadLists', function afterLoadLists() {
                var $form = jQuery('form[data-form-id]');
                $form.find('[data-trigger="change"]').trigger('change', true);
            });
        }
    };
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

extensions['SuiteLabs.CustomForms.2.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/CustomForms/2.0.0/' + asset;
}

define('CustomForms.Form.View', [
    'Backbone',

    'CustomForms.Model',

    'customforms_form.tpl',

    'SCFormView',
    'Utils',
    'jQuery',
    'underscore'
], function CustomFormsFormViewModule(
    Backbone,

    CustomFormsModel,

    template,

    FormViewModule,
    Utils,
    jQuery,
    _
) {
    'use strict';

    /**
     * data-validate-required-message="message"
     * data-validate-required
     * data-validate-state
     * data-validate-zip
     * data-validate-phone
     * data-validate-email
     */

    var SCFormView = FormViewModule.SCFormView;
    var FORM_TYPE = {
        CASE: '1',
        LEAD: '2'
    };
    var FILEID_FIELD_NAME;

    function insertIntoFormAndGetFileId(data, $form) {
        var fileId = Number(data) ? data : '';
        var $inputsFound = $form.find('input[name="' + FILEID_FIELD_NAME + '"]');

        if ($inputsFound.length) {
            $inputsFound.first().val(fileId);
        } else {
            $form.append(jQuery('<input>').attr({
                type: 'hidden',
                name: FILEID_FIELD_NAME,
                value: fileId
            }));
        }
        return fileId;
    }

    function CustomFormsFormView(options) {
        SCFormView.call(this, new CustomFormsModel());

        this.options = options || {};
        this.template = template;
        this.customFormDataPromise = jQuery.Deferred();

        FILEID_FIELD_NAME = this.options.settings.custrecord_custom_form_type === FORM_TYPE.CASE ? 'custevent_crm_file_id' : 'custentity_lead_file_id';

        this.validators = {
            validateEmail: function validateEmail(value) {
                var emailRegex = new RegExp('^[-a-z0-9!#$%&\'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&\'' + // eslint-disable-line no-useless-escape
                    '*+/=?^_`{|}~]+)*@(?:[a-z0-9]+(?:-+[a-z0-9]+)*\.)+(?:xn--[a-z0-9]+|' + // eslint-disable-line no-useless-escape
                    '[a-z]{2,16})$', 'i');

                if (value && !emailRegex.test(value)) {
                    return 'A valid email address is required';
                }

                return '';
            },

            validatePhone: function validatePhone(value) {
                return value ? Utils.validatePhone.apply(Utils, arguments) : '';
            },

            validateState: function validateState(value) {
                return value ? Utils.validateState.apply(Utils, arguments) : '';
            },

            validateZipCode: function validateZipCode(value) {
                return value ? Utils.validateZipCode.apply(Utils, arguments) : '';
            }
        };

        this.attributes = {
            id: 'CustomFormsFormView',
            'class': 'CustomForms-Form-View'
        };
    }

    CustomFormsFormView.prototype = Object.create(SCFormView.prototype);

    CustomFormsFormView.prototype.constructor = CustomFormsFormView;

    CustomFormsFormView.prototype.getEvents = function getEvents() {
        return {
            'blur [type="date"]': 'normalizeDate',
            'blur [type="time"]': 'normalizeTime',
            'blur [type="number"]': 'normalizeNumber',
            'blur [type="datetime"]': 'normalizeDateTime',
            'blur [data-validate-datetime]': 'normalizeDateTime',
            'blur [data-validate-integer]': 'normalizeInteger',
            'blur [data-validate-link]': 'normalizeLink',
            'blur [data-validate-percent]': 'normalizePercent',
            'blur [name]': 'onFormFieldChange',

            'submit form': 'submitForm',

            'change [data-list-id="country"]': 'updateStates'
        };
    };

    CustomFormsFormView.prototype.render = function render() {
        SCFormView.prototype.render.apply(this, arguments);

        this.afterRender();
    };

    CustomFormsFormView.prototype.afterRender = function afterRender() {
        var settings = this.options.settings;

        this.fetchCustomFormData();
        this.applyTranslations();

        // Form configuration
        this.formModel.set('formId', settings.custrecord_custom_form_id);
        this.formModel.set('formHash', settings.custrecord_custom_form_hash);
        this.formModel.set('formType', settings.custrecord_custom_form_type);

        // Auto-populated fields
        this.setCurrency();
        this.setSubsidiary();
        this.setCurrentDomain();

        // Field validations
        this.applyValidations();

        this.loadSelectCustomLists();
        this.setSettingsRecordId();
        this.googleReCAPTCHALoadPromise = this.loadGoogleReCAPTCHA();

        this.setTooltips();
    };

    CustomFormsFormView.prototype.setTooltips = function setTooltips() {
        this.$('[data-tooltip]').each(function eachTooltip() {
            var $this = jQuery(this);
            var fieldId = $this.data('tooltip');

            jQuery.get('/core/help/fieldhelp.nl?f=' + fieldId + '&amp;NS_VER=2021.2.0').done(
                function onFieldHelpFetch(response) {
                    var tempElement = document.createElement('html');
                    var textElement;
                    var text;

                    tempElement.innerHTML = response;
                    textElement = tempElement.getElementsByClassName('text');
                    text = textElement && textElement.length && _.translate(textElement[0].textContent).trim();

                    if (text) {
                        $this.attr('data-placement', 'auto').attr('data-toggle', 'tooltip').addClass('custom-form-tooltip');
                        $this.attr('title', text).tooltip({ html: true });
                    } else {
                        $this.remove();
                    }
                }
            );
        });
    };

    CustomFormsFormView.prototype.getCustomLists = function getCustomLists() {
        return _(this.$('select[data-list-id]'))
            .chain()
            .map(function mapElementToCustomListId(element) {
                return jQuery(element).data('listId');
            })
            .join(',')
            .value();
    };

    CustomFormsFormView.prototype.fetchCustomFormData = function fetchCustomFormData() {
        var deferred = this.customFormDataPromise;
        var customFormsModel = new CustomFormsModel();
        var customLists = this.getCustomLists();
        var settings = this.options.settings;

        return customFormsModel.fetch({
            data: {
                customLists: customLists,
                formId: settings.custrecord_custom_form_id,
                formType: settings.custrecord_custom_form_type,
                formHash: settings.custrecord_custom_form_hash
            }
        }).then(
            function onSuccess(data) {
                deferred.resolve(data);
            },
            function onReject() {
                deferred.reject();
            }
        );
    };

    CustomFormsFormView.prototype.applyTranslations = function applyTranslations() {
        this.$('[data-translate]').each(function eachValidateRequired() {
            var $this = jQuery(this);
            var text = _($this.text().trim()).translate();

            $this.text(text);
        });
    };

    CustomFormsFormView.prototype.setCurrency = function setCurrency() {
        var environment = this.options.environment;
        var $currency = this.$('[name="currency"]');
        var currencies = environment.getSiteSetting('currencies') || [];
        var currency;

        if (!_.isEmpty($currency) && currencies.length) {
            currency = _(currencies).findWhere({ isdefault: 'T' });
            if (!_.isEmpty(currency)) {
                $currency.val(currency.internalid);
            }
        }
    };

    CustomFormsFormView.prototype.setSubsidiary = function setSubsidiary() {
        var environment = this.options.environment;
        var $subsidiary = this.$('[name="subsidiary"]');
        var subsidiaries = environment.getSiteSetting('subsidiaries') || [];
        var subsidiary;

        if (!_.isEmpty($subsidiary) && subsidiaries.length) {
            subsidiary = _(subsidiaries).findWhere({ isdefault: 'T' });
            if (!_.isEmpty(subsidiary)) {
                $subsidiary.val(subsidiary.internalid);
            }
        }
    };

    CustomFormsFormView.prototype.setCurrentDomain = function setCurrentDomain() {
        var environment = this.options.environment;
        var $currentDomain = jQuery('<input>').attr({
            type: 'hidden',
            name: 'currentDomain',
            value: ''
        });
        var customerCenterTouchpoint = environment.getSiteSetting('touchpoints.customercenter') || '';
        var currentDomainMatch = customerCenterTouchpoint.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
        var currentDomain = currentDomainMatch && currentDomainMatch[0];

        $currentDomain.val(currentDomain);

        this.$('form').append($currentDomain);
    };

    CustomFormsFormView.prototype.setSettingsRecordId = function setSettingsRecordId() {
        var $settingsRecordId = jQuery('<input>').attr({
            type: 'hidden',
            name: 'settingsRecordId',
            value: ''
        });

        this.customFormDataPromise.then(function afterFetch(customFormData) {
            $settingsRecordId.val(customFormData.settingsRecordId);
        });

        this.$('form').append($settingsRecordId);
    };

    CustomFormsFormView.prototype.loadSelectCustomLists = function loadSelectCustomLists() {
        var self = this;

        this.customFormDataPromise.then(function afterFetch(customFormData) {
            var customLists = customFormData.customLists;
            var environment = self.options.environment;

            if (customLists.country && customLists.state) {
                // remove states so they are not rendered first time load
                customLists = _({}).extend(customLists, { state: [] });
            }

            _(customLists).each(function forEachCustomList(customListValues, customListId) {
                var defaultLabel = self.$('select[data-list-id="' + customListId + '"]').data('default-label');

                self.$('select[data-list-id="' + customListId + '"]')
                    .children().remove().end();

                if (defaultLabel) {
                    self.$('select[data-list-id="' + customListId + '"]')
                    .append(
                        '<option value="">'
                        + defaultLabel
                        + '</option>'
                    );
                }

                _(customListValues).each(function forEachCustomListValue(customListValue) {
                    var id = String(customListValue[customListId === 'country' ? 'code' : 'id']);
                    var $selectAll = self.$('select[data-list-id="' + customListId + '"]');

                    $selectAll.each(function eachSelect() {
                        var $select = jQuery(this);
                        var optionsToHide = $select.data('hide-option') !== undefined ? String($select.data('hide-option')).split(',') : [];

                        if (optionsToHide.length === 0 || optionsToHide.indexOf(id) === -1) {
                            $select.append(
                                '<option value="' + id + '">' + customListValue.name + '</option>'
                            );
                        }
                        if (optionsToHide.indexOf('') !== -1) {
                            $select.find('[value=""]').remove();
                        }
                    });
                });
            });

            self.$('select[data-default-value]').each(function forEachListDefaultValue() {
                var $this = self.$(this);
                var defaultValue = $this.data('default-value');
                var listId = $this.data('list-id');

                $this.find('option[value=' + defaultValue + ']').prop('selected', true);

                if (listId === 'country') {
                    self.updateStates(null, 'US');
                }
            });

            environment.cancelableTrigger('customFormAfterLoadLists');
        });
    };

    CustomFormsFormView.prototype.loadGoogleReCAPTCHA = function loadGoogleReCAPTCHA() {
        var settings = this.options.settings;

        if (settings.custrecord_custom_form_gr_enabled === 'T') {
            return jQuery.getScript('https://www.google.com/recaptcha/api.js?render=' + settings.custrecord_custom_form_gr_site_key);
        }

        return jQuery.Deferred().resolve();
    };

    CustomFormsFormView.prototype.updateStates = function updateStates(e, selectedCountry) {
        var country = e ? jQuery(e.target).val() : selectedCountry;
        var self = this;

        this.$('select[data-list-id="state"]').children().remove();

        this.customFormDataPromise.then(function afterFetch(customFormData) {
            var customLists = customFormData.customLists;
            var states = _(customLists.state).where({ country: country });

            self.$('select[data-list-id="state"]').append(
                '<option value=""></option>'
            );

            _(states).each(function forEachCustomListValue(customListValue) {
                self.$('select[data-list-id="state"]').append(
                    '<option value="' + customListValue.id + '">' + customListValue.name + '</option>'
                );
            });
        });
    };

    // loop over the form html and generate an object to be stored in this.validation to be used later on when validating
    CustomFormsFormView.prototype.applyValidations = function applyValidations() {
        var self = this;
        var validationObject = {};
        var setInputValidation = function setInputValidation($input, name, data) {
            // This generic condition can be changed to a more specific criteria like data-ignore-validation
            if ($input.parent().attr('data-validation')) {
                validationObject[name] = _(validationObject[name] || {}).extend(data);
            }
        };

        this.$('[data-validate-required]').each(function eachValidateRequired() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = (name + ' is required');

            setInputValidation($this, name, {
                required: true,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('input[min]').each(function eachMinValue() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var min = parseInt($this.attr('min'), 10);

            setInputValidation($this, name, {
                min: min,
                minMsg: _('Value must be greater than or equal to $(0)').translate(min)
            });
        });

        this.$('input[max]').each(function eachMaxValue() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var max = parseInt($this.attr('max'), 10);

            setInputValidation($this, name, {
                max: max,
                maxMsg: _('Value must be less than or equal to $(0)').translate(max)
            });
        });

        this.$('[data-validate-state]').each(function eachValidateState() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid state is required');

            setInputValidation($this, name, {
                fn: self.validators.validateState,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('[data-validate-zip]').each(function eachValidateZip() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid zip code is required');

            setInputValidation($this, name, {
                fn: self.validators.validateZipCode,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('[data-validate-phone]').each(function eachValidatePhone() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid phone number is required');

            setInputValidation($this, name, {
                fn: self.validators.validatePhone,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.$('[data-validate-email]').each(function eachValidateEmail() {
            var $this = jQuery(this);
            var name = $this.attr('name');
            var defaultValue = ('A valid email address is required');

            setInputValidation($this, name, {
                fn: self.validators.validateEmail,
                msg: _($this.data('validateRequiredMessage') || defaultValue).translate()
            });
        });

        this.validation = validationObject;
    };

    CustomFormsFormView.prototype.normalizeDate = function normalizeDate(e) {
        var $input = this.$(e.target);
        var date = new Date($input.val());
        var value;

        if (date.getDate()) {
            value = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        } else {
            value = '';
        }
        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizeTime = function normalizeTime(e) {
        var self = this;
        var $input = this.$(e.target);
        var date = new Date('1/1/2000 ' + $input.val().replace(/(am|pm)/, ''));
        var value;
        var hours;
        var pad = function pad(num) {
            return ('0' + num).substr(-2);
        };

        if (date.getDate()) {
            hours = date.getHours();
            hours += /pm/.test($input.val()) && hours < 12 ? 12 : 0;
            value = (hours > 12 ? hours - 12 : hours || 12) + ':' + pad(date.getMinutes());
            value += ' ' + (hours > 11 ? 'pm' : 'am');
        } else {
            value = '';
        }
        $input.prop('type', value ? 'time' : 'text').val(value);
        $input.off('blur').on('blur', function onBlur(ev) { self.normalizeTime(ev); });
    };

    CustomFormsFormView.prototype.normalizeNumber = function normalizeNumber(e) {
        var self = this;
        var $input = this.$(e.target);
        var parsedNumber = Number($input.val().replace(/[^0-9.]/g, ''));
        var value = parsedNumber >= 0 ? parsedNumber : '';

        $input.prop('type', value ? 'number' : 'text').val(value);
        $input.off('blur').on('blur', function onBlur(ev) { self.normalizeNumber(ev); });
    };

    CustomFormsFormView.prototype.normalizeDateTime = function normalizeDateTime(e) {
        var $input = this.$(e.target);
        var date = new Date($input.val().replace(/(am|pm)/, ''));
        var value;
        var hours;
        var pad = function pad(num) {
            return ('0' + num).substr(-2);
        };

        if (date.getDate()) {
            hours = date.getHours();
            hours += /pm/.test($input.val()) && hours < 12 ? 12 : 0;
            value = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            value += ' ' + (hours > 12 ? hours - 12 : hours || 12) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
            value += ' ' + (hours > 11 ? 'pm' : 'am');
        } else {
            value = '';
        }
        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizeInteger = function normalizeInteger(e) {
        var $input = this.$(e.target);
        var value = parseInt($input.val(), 10) || '';

        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizeLink = function normalizeLink(e) {
        var $input = this.$(e.target);
        var value = $input.val();

        if (!/^https?:\/\//.test(value)) {
            value = 'http://' + value;
        }
        $input.val(value);
    };

    CustomFormsFormView.prototype.normalizePercent = function normalizePercent(e) {
        var $input = this.$(e.target);
        var value = Number($input.val().replace(/%$/, '')) || '';

        if (value) {
            value += '%';
        }
        $input.val(value);
    };

    // CustomFormsFormView.prototype.submit = function submit(e) {
    //     var settings = this.options.settings;

    //     e.preventDefault();

    //     if (settings.custrecord_custom_form_gr_enabled === 'T') {
    //         this.submitFormWithReCAPTCHA(e);
    //     } else {
    //         this.submitForm(e);
    //     }
    // };

    CustomFormsFormView.prototype.generateReCAPTCHA = function generateReCAPTCHA(action, callback) {
        var settings = this.options.settings;

        this.googleReCAPTCHALoadPromise.done(function afterReCAPTCHALoaded() {
            window.grecaptcha.ready(function onReCAPTCHAReady() {
                window.grecaptcha.execute(settings.custrecord_custom_form_gr_site_key, { action: action }).then(function afterReCAPTCHAExecute(token) {
                    var $reCAPTCHAToken = jQuery('[name="gReCAPTCHAToken"]');

                    if (!$reCAPTCHAToken.length) {
                        $reCAPTCHAToken = jQuery('<input>').attr({
                            type: 'hidden',
                            name: 'gReCAPTCHAToken'
                        }).appendTo(self.$('form'));
                    }

                    $reCAPTCHAToken.val(token);

                    callback();
                });
            });
        });
    };


    // CustomFormsFormView.prototype.submitFormWithReCAPTCHA = function submitFormWithReCAPTCHA(e) {
    //     var self = this;

    //     this.generateReCAPTCHA('submit', function callback() {
    //         self.submitForm(e);
    //     });
    // };

    CustomFormsFormView.prototype.uploadFile = function uploadFile($form, $deferred) {
        var settings = this.options.settings;
        var self = this;
        var $reCAPTCHADeferred = jQuery.Deferred();

        if (settings.custrecord_custom_form_gr_enabled === 'T') {
            this.generateReCAPTCHA('file_upload', function callback() {
                $reCAPTCHADeferred.resolve();
            });
        } else {
            $reCAPTCHADeferred.resolve();
        }

        $reCAPTCHADeferred.done(function onReCAPTCHADone() {
            self.customFormDataPromise.then(function afterFetch(customFormData) {
                var formData = new FormData($form[0]);

                jQuery.ajax({
                    data: formData,
                    dataType: 'json',
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    beforeSend: function beforeSend(jqXHR) {
                        jqXHR.setRequestHeader('X-SC-Touchpoint', SC.ENVIRONMENT.SCTouchpoint);
                    },
                    url: customFormData.url,
                    success: function success(data) {
                        var fileId = insertIntoFormAndGetFileId(data, $form);
                        $deferred.resolve(fileId);
                    },

                    error: function error(jqXhr) {
                        $deferred.reject(jqXhr);
                    }
                });
            });
        });
    };

    CustomFormsFormView.prototype.submitForm = function submitForm(e) {
        var settings = this.options.settings;
        var environment = this.options.environment;
        var $deferred = jQuery.Deferred();
        var beforeSubmitPromise;
        var $form = this.$(e.target);
        var $triggerBeforeSubmitElem = $form.find('[data-trigger-before-submit]');
        var triggerBeforeSubmit = $triggerBeforeSubmitElem.data('trigger-before-submit');
        var self = this;
        var promise;

        // Re-apply validations in case that there is a dynamic data-validate attribute
        this.applyValidations();

        // in case of any error we call the saveForm so it validates again and prevent form submission and display error messages
        if (this.getFormValues($form).errorCode) {
            return this.saveForm(e);
        }

        beforeSubmitPromise = triggerBeforeSubmit ? environment.cancelableTrigger('customFormBeforeSubmit', {
            triggeringForm: settings.custrecord_custom_form_id
        }) : jQuery.Deferred();

        beforeSubmitPromise.done(function beforeSubmitDone() {
            if ($form.find('input[type="file"]').val()) {
                this.uploadFile($form, $deferred);
            } else {
                $deferred.resolve();
            }

            $deferred.done(function onFilesUploaded() {
                if (settings.custrecord_custom_form_gr_enabled === 'T') {
                    promise = jQuery.Deferred();
                    self.generateReCAPTCHA('submit', function callback() {
                        self.saveForm(e).then(
                            function saveFormSuccess() {
                                promise.resolve.apply(promise, arguments);
                            },
                            function saveFormError() {
                                promise.reject.apply(promise, arguments);
                            }
                        );
                    });
                } else {
                    promise = self.saveForm(e);
                }

                if (promise) {
                    promise.done(function done(result) {
                        var redirectURL = settings.custrecord_custom_form_redirect_url;

                        self.statusMessage = {
                            code: (result.code === 'ERR_RECAPTCHA_FORM' ? 'error' : 'success'),
                            message: result.message || 'CUSTOM_CASE_SUMISSION_SUCCESS'
                        };

                        if (self.statusMessage.code === 'success' && redirectURL) {
                            Backbone.history.navigate(redirectURL, { trigger: true });
                        } else {

                            if ( !$form.find('[data-prevent-clear-fields]').length ) {
                                self.$('input:visible, select:visible, textarea:visible, input[name="' + FILEID_FIELD_NAME + '"]').val('');
                            }
                            
                            $form.trigger('customreset');
                            environment.cancelableTrigger('customFormAfterSubmit');
                        }
                    }).fail(function fail(jqXhr) {
                        self.statusMessage = {
                            code: 'error',
                            message: jqXhr.responseJSON
                            ? jqXhr.responseJSON.errorMessage
                            : 'Something went wrong processing your request, please try again later.'
                        };
                        jqXhr.preventDefault = true;
                    }).always(function always() {
                        self.showStatusMessage();
                    });
                }
            }).fail(function fail(jqXhr) {
                self.statusMessage = {
                    code: 'error',
                    message: jqXhr.responseJSON ? jqXhr.responseJSON.errorMessage : 'Something went wrong uploading your file, please try again later.'
                };
                jqXhr.preventDefault = true;
                self.showStatusMessage();
            });
        });

        beforeSubmitPromise.fail(function beforeSubmitFail(errorMessage) {
            self.statusMessage = {
                code: 'error',
                message: errorMessage || 'Something went wrong, please try again later or contact support.'
            };
            self.showStatusMessage();
        });

        if (!triggerBeforeSubmit) {
            beforeSubmitPromise.resolve();
        }

        return e.stopPropagation() || e.preventDefault();
    };

    CustomFormsFormView.prototype.showStatusMessage = function showStatusMessage() {
        var $alert = this.$('[data-type="alert-placeholder"]').removeClass('hide message-success message-error');

        $alert.addClass(this.statusMessage.code === 'success' ? 'message-success' : 'message-error');
        $alert.html(_(this.statusMessage.message).translate()).fadeIn(400).delay(10000).fadeOut();
    };

    CustomFormsFormView.prototype.validateField = function validateField(_validationData, fieldName, fieldValue) {
        var required = this.validation[fieldName].required;
        var customFunctionValdiation = this.validation[fieldName].fn;
        var minValidation = this.validation[fieldName].min;
        var maxValidation = this.validation[fieldName].max;
        var error = this.validation[fieldName].msg;
        var errorMinMsg = this.validation[fieldName].minMsg;
        var errorMaxMsg = this.validation[fieldName].maxMsg;

        if (required && !fieldValue) {
            return error;
        }

        if (minValidation && (fieldValue < minValidation)) {
            return errorMinMsg;
        }

        if (maxValidation && (fieldValue > maxValidation)) {
            return errorMaxMsg;
        }

        if (customFunctionValdiation && fieldValue) {
            error = customFunctionValdiation(fieldValue);

            if (error) {
                return error;
            }
        }

        // no error
        return '';
    };

    CustomFormsFormView.prototype.getFormFieldValue = function getFormFieldValue($input) {
        var name = $input.attr('name');
        var value = $input.val().trim();
        var error;

        if (!this.validation[name]) {
            return {
                name: name,
                value: value
            };
        }

        error = this.validateField(this.validation[name], name, value);

        if (error) {
            return {
                name: name,
                error: error
            };
        }

        return {
            name: name,
            value: value
        };
    };

    CustomFormsFormView.prototype.getFormValues = function getFormValues($form) {
        var self = this;
        var formValues = _($form.serializeObject()).extend({
            'custom-file': $form.find('[type="file"]').val()
        });
        var errors = {};

        _(this.validation).each(function forEachValidation(validationData, fieldName) {
            var fieldValue = formValues[fieldName];
            var error = self.validateField(validationData, fieldName, fieldValue);

            if (error) {
                errors[fieldName] = error;
            }
        });

        if (!_(errors).isEmpty()) {
            return {
                errorCode: 1,
                errors: errors
            };
        }

        return formValues;
    };

    CustomFormsFormView.prototype.getContext = function getContext() {
        var settings = this.options.settings;

        return {
            formId: settings.custrecord_custom_form_id,
            formContent: settings.custrecord_custom_form_html,
            hideBadge: settings.custrecord_custom_form_gr_hide_badge === 'T'
        };
    };

    return CustomFormsFormView;
});


/* globals getExtensionAssetsPath */
define('CustomForms.Model', [
    'SCModel',
    'Utils'
],
function CustomFormsModelModule(
    SCModelComponent,
    Utils
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;

    function CustomFormsModel() {
        SCModel.call(this);

        this.urlRoot = function urlRoot() {
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath('services/CustomForms.Service.ss')
            );
        };
    }

    CustomFormsModel.prototype = Object.create(SCModel.prototype);

    CustomFormsModel.prototype.constructor = CustomFormsModel;

    return CustomFormsModel;
});


define('CustomForms.View', [
    'CustomForms.Form.View',

    'customforms.tpl',

    'CustomContentType.Base.View'
], function CustomFormsView(
    CustomFormsFormView,

    template,

    CustomContentTypeBaseView
) {
    'use strict';

    return CustomContentTypeBaseView.extend({
        template: template,

        getChildViews: function getChildViews() {
            return {
                'CustomForms.Form': function getCustomFormsFormView() {
                    return new CustomFormsFormView({
                        settings: this.settings,
                        environment: this.environment
                    });
                }
            };
        },

        getContext: function getContext() {
            return {
                containerClass: this.settings.custrecord_custom_form_class || 'cctcustomforms-layout'
            };
        }
    });
});


define('SuiteLabs.CustomForms.Main', [
    'CustomForms.View'
], function SuiteLabsCustomFormsMain(
    CustomFormsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cms = container.getComponent('CMS');
            var environment = container.getComponent('Environment');

            if (cms) {
                // attach environment component into CustomFormsView
                CustomFormsView.prototype.environment = environment;

                cms.registerCustomContentType({
                    id: 'CMS_CUSTOM_FORM',
                    view: CustomFormsView
                });
            }
        }
    };
});


};

extensions['SuiteLabs.DisplayPriceLevels.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/DisplayPriceLevels/1.0.0/' + asset;
}

define('DisplayPriceLevels.EntryPoint', [
    'ProductViews.Price.View',
    'themehelper_product_views_price.tpl',
    'underscore'
], function DisplayPriceLevelsEntryPoint(
    ProductViewsPriceView,
    Template,
    _
) {
    'use strict';

    _.extend(ProductViewsPriceView.prototype, {
        render: _.wrap(ProductViewsPriceView.prototype.render, function render(fn) {
            if (this.template.Name !== 'themehelper_product_views_price') {
                this.template = Template;
            }

            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });

    return  {
        mountToApp: function mountToApp (container) {
            var pdpComponent = container.getComponent('PDP');
            var userProfileComponent = container.getComponent('UserProfile');
            var environmentComponent = container.getComponent("Environment");


            if(pdpComponent && userProfileComponent && environmentComponent) {
                userProfileComponent.getUserProfile().then(function(profileInformation) {
                    if (profileInformation.isloggedin === true) {
                        var usersPriceLevel = profileInformation.pricelevel;
                        var priceLevelConfiguration = environmentComponent.getConfig('priceLevels.textMapping');
                        var priceLevelData = _.findWhere(priceLevelConfiguration, { id: usersPriceLevel });
                        if (priceLevelData) {
                            pdpComponent.addToViewContextDefinition('ProductViews.Price.View', 'showPriceLevelName', 'boolean', function showPriceLevelNameCtxDef(context) {
                                return priceLevelData.enabled;
                            });
                            pdpComponent.addToViewContextDefinition('ProductViews.Price.View', 'priceLevelName', 'string', function priceLevelNameCtxDef(context) {
                                return priceLevelData.displayName;
                            });
                        }
                    }
                });
            }

        }
    };
});


};

extensions['SuiteLabs.EnhancedPDP.1.0.3'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/EnhancedPDP/1.0.3/' + asset;
}

/*!
    By André Rinas, www.andrerinas.de
    Documentation, www.simplelightbox.com
    Available for use under the MIT License
    Version 2.14.2
*/
define('External.SimpleLightbox', [

], function ExternalSimpleLightbox(

) {
    'use strict';

    var result;

    /* eslint-disable */
    (function () {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = 'function' == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw ((a.code = 'MODULE_NOT_FOUND'), a);
                    }
                    var p = (n[i] = { exports: {} });
                    e[i][0].call(
                        p.exports,
                        function (r) {
                            var n = e[i][1][r];
                            return o(n || r);
                        },
                        p,
                        p.exports,
                        r,
                        e,
                        n,
                        t
                    );
                }
                return n[i].exports;
            }
            for (
                var u = 'function' == typeof require && require, i = 0;
                i < t.length;
                i++
            )
                o(t[i]);
            return o;
        }
        return r;
    })()(
        {
            1: [
                function (require, module, exports) {
                    (function (global) {
                        (function () {
                            'use strict';

                            Object.defineProperty(exports, '__esModule', {
                                value: true
                            });
                            exports['default'] = void 0;
                            function _typeof(obj) {
                                '@babel/helpers - typeof';
                                return (
                                    (_typeof =
                                        'function' == typeof Symbol &&
                                        'symbol' == typeof Symbol.iterator
                                            ? function (obj) {
                                                  return typeof obj;
                                              }
                                            : function (obj) {
                                                  return obj &&
                                                      'function' ==
                                                          typeof Symbol &&
                                                      obj.constructor ===
                                                          Symbol &&
                                                      obj !== Symbol.prototype
                                                      ? 'symbol'
                                                      : typeof obj;
                                              }),
                                    _typeof(obj)
                                );
                            }
                            function _createForOfIteratorHelper(
                                o,
                                allowArrayLike
                            ) {
                                var it =
                                    (typeof Symbol !== 'undefined' &&
                                        o[Symbol.iterator]) ||
                                    o['@@iterator'];
                                if (!it) {
                                    if (
                                        Array.isArray(o) ||
                                        (it = _unsupportedIterableToArray(o)) ||
                                        (allowArrayLike &&
                                            o &&
                                            typeof o.length === 'number')
                                    ) {
                                        if (it) o = it;
                                        var i = 0;
                                        var F = function F() {};
                                        return {
                                            s: F,
                                            n: function n() {
                                                if (i >= o.length)
                                                    return { done: true };
                                                return {
                                                    done: false,
                                                    value: o[i++]
                                                };
                                            },
                                            e: function e(_e) {
                                                throw _e;
                                            },
                                            f: F
                                        };
                                    }
                                    throw new TypeError(
                                        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                    );
                                }
                                var normalCompletion = true,
                                    didErr = false,
                                    err;
                                return {
                                    s: function s() {
                                        it = it.call(o);
                                    },
                                    n: function n() {
                                        var step = it.next();
                                        normalCompletion = step.done;
                                        return step;
                                    },
                                    e: function e(_e2) {
                                        didErr = true;
                                        err = _e2;
                                    },
                                    f: function f() {
                                        try {
                                            if (
                                                !normalCompletion &&
                                                it['return'] != null
                                            )
                                                it['return']();
                                        } finally {
                                            if (didErr) throw err;
                                        }
                                    }
                                };
                            }
                            function _toConsumableArray(arr) {
                                return (
                                    _arrayWithoutHoles(arr) ||
                                    _iterableToArray(arr) ||
                                    _unsupportedIterableToArray(arr) ||
                                    _nonIterableSpread()
                                );
                            }
                            function _nonIterableSpread() {
                                throw new TypeError(
                                    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                                );
                            }
                            function _unsupportedIterableToArray(o, minLen) {
                                if (!o) return;
                                if (typeof o === 'string')
                                    return _arrayLikeToArray(o, minLen);
                                var n = Object.prototype.toString
                                    .call(o)
                                    .slice(8, -1);
                                if (n === 'Object' && o.constructor)
                                    n = o.constructor.name;
                                if (n === 'Map' || n === 'Set')
                                    return Array.from(o);
                                if (
                                    n === 'Arguments' ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                        n
                                    )
                                )
                                    return _arrayLikeToArray(o, minLen);
                            }
                            function _iterableToArray(iter) {
                                if (
                                    (typeof Symbol !== 'undefined' &&
                                        iter[Symbol.iterator] != null) ||
                                    iter['@@iterator'] != null
                                )
                                    return Array.from(iter);
                            }
                            function _arrayWithoutHoles(arr) {
                                if (Array.isArray(arr))
                                    return _arrayLikeToArray(arr);
                            }
                            function _arrayLikeToArray(arr, len) {
                                if (len == null || len > arr.length)
                                    len = arr.length;
                                for (
                                    var i = 0, arr2 = new Array(len);
                                    i < len;
                                    i++
                                ) {
                                    arr2[i] = arr[i];
                                }
                                return arr2;
                            }
                            function _classCallCheck(instance, Constructor) {
                                if (!(instance instanceof Constructor)) {
                                    throw new TypeError(
                                        'Cannot call a class as a function'
                                    );
                                }
                            }
                            function _defineProperties(target, props) {
                                for (var i = 0; i < props.length; i++) {
                                    var descriptor = props[i];
                                    descriptor.enumerable =
                                        descriptor.enumerable || false;
                                    descriptor.configurable = true;
                                    if ('value' in descriptor)
                                        descriptor.writable = true;
                                    Object.defineProperty(
                                        target,
                                        descriptor.key,
                                        descriptor
                                    );
                                }
                            }
                            function _createClass(
                                Constructor,
                                protoProps,
                                staticProps
                            ) {
                                if (protoProps)
                                    _defineProperties(
                                        Constructor.prototype,
                                        protoProps
                                    );
                                if (staticProps)
                                    _defineProperties(Constructor, staticProps);
                                Object.defineProperty(
                                    Constructor,
                                    'prototype',
                                    { writable: false }
                                );
                                return Constructor;
                            }
                            function _defineProperty(obj, key, value) {
                                if (key in obj) {
                                    Object.defineProperty(obj, key, {
                                        value: value,
                                        enumerable: true,
                                        configurable: true,
                                        writable: true
                                    });
                                } else {
                                    obj[key] = value;
                                }
                                return obj;
                            }
                            var SimpleLightbox = /*#__PURE__*/ (function () {
                                function SimpleLightbox(elements, options) {
                                    var _this = this;
                                    _classCallCheck(this, SimpleLightbox);
                                    _defineProperty(this, 'defaultOptions', {
                                        sourceAttr: 'href',
                                        overlay: true,
                                        overlayOpacity: 0.7,
                                        spinner: true,
                                        nav: true,
                                        navText: ['&lsaquo;', '&rsaquo;'],
                                        captions: true,
                                        captionDelay: 0,
                                        captionSelector: 'img',
                                        captionType: 'attr',
                                        captionsData: 'title',
                                        captionPosition: 'bottom',
                                        captionClass: '',
                                        captionHTML: true,
                                        close: true,
                                        closeText: '&times;',
                                        swipeClose: true,
                                        showCounter: true,
                                        fileExt: 'png|jpg|jpeg|gif|webp',
                                        animationSlide: true,
                                        animationSpeed: 250,
                                        preloading: true,
                                        enableKeyboard: true,
                                        loop: true,
                                        rel: false,
                                        docClose: true,
                                        swipeTolerance: 50,
                                        className: 'simple-lightbox',
                                        widthRatio: 0.8,
                                        heightRatio: 0.9,
                                        scaleImageToRatio: false,
                                        disableRightClick: false,
                                        disableScroll: true,
                                        alertError: true,
                                        alertErrorMessage:
                                            'Image not found, next image will be loaded',
                                        additionalHtml: false,
                                        history: true,
                                        throttleInterval: 0,
                                        doubleTapZoom: 2,
                                        maxZoom: 10,
                                        htmlClass: 'has-lightbox',
                                        rtl: false,
                                        fixedClass: 'sl-fixed',
                                        fadeSpeed: 300,
                                        uniqueImages: true,
                                        focus: true,
                                        scrollZoom: true,
                                        scrollZoomFactor: 0.5,
                                        download: false
                                    });
                                    _defineProperty(
                                        this,
                                        'transitionPrefix',
                                        void 0
                                    );
                                    _defineProperty(
                                        this,
                                        'isPassiveEventsSupported',
                                        void 0
                                    );
                                    _defineProperty(
                                        this,
                                        'transitionCapable',
                                        false
                                    );
                                    _defineProperty(
                                        this,
                                        'isTouchDevice',
                                        'ontouchstart' in window
                                    );
                                    _defineProperty(
                                        this,
                                        'isAppleDevice',
                                        /(Mac|iPhone|iPod|iPad)/i.test(
                                            navigator.platform
                                        )
                                    );
                                    _defineProperty(
                                        this,
                                        'initialLocationHash',
                                        void 0
                                    );
                                    _defineProperty(
                                        this,
                                        'pushStateSupport',
                                        'pushState' in history
                                    );
                                    _defineProperty(this, 'isOpen', false);
                                    _defineProperty(this, 'isAnimating', false);
                                    _defineProperty(this, 'isClosing', false);
                                    _defineProperty(this, 'isFadeIn', false);
                                    _defineProperty(
                                        this,
                                        'urlChangedOnce',
                                        false
                                    );
                                    _defineProperty(this, 'hashReseted', false);
                                    _defineProperty(
                                        this,
                                        'historyHasChanges',
                                        false
                                    );
                                    _defineProperty(
                                        this,
                                        'historyUpdateTimeout',
                                        null
                                    );
                                    _defineProperty(
                                        this,
                                        'currentImage',
                                        void 0
                                    );
                                    _defineProperty(
                                        this,
                                        'eventNamespace',
                                        'simplelightbox'
                                    );
                                    _defineProperty(this, 'domNodes', {});
                                    _defineProperty(this, 'loadedImages', []);
                                    _defineProperty(
                                        this,
                                        'initialImageIndex',
                                        0
                                    );
                                    _defineProperty(
                                        this,
                                        'currentImageIndex',
                                        0
                                    );
                                    _defineProperty(
                                        this,
                                        'initialSelector',
                                        null
                                    );
                                    _defineProperty(
                                        this,
                                        'globalScrollbarWidth',
                                        0
                                    );
                                    _defineProperty(
                                        this,
                                        'controlCoordinates',
                                        {
                                            swipeDiff: 0,
                                            swipeYDiff: 0,
                                            swipeStart: 0,
                                            swipeEnd: 0,
                                            swipeYStart: 0,
                                            swipeYEnd: 0,
                                            mousedown: false,
                                            imageLeft: 0,
                                            zoomed: false,
                                            containerHeight: 0,
                                            containerWidth: 0,
                                            containerOffsetX: 0,
                                            containerOffsetY: 0,
                                            imgHeight: 0,
                                            imgWidth: 0,
                                            capture: false,
                                            initialOffsetX: 0,
                                            initialOffsetY: 0,
                                            initialPointerOffsetX: 0,
                                            initialPointerOffsetY: 0,
                                            initialPointerOffsetX2: 0,
                                            initialPointerOffsetY2: 0,
                                            initialScale: 1,
                                            initialPinchDistance: 0,
                                            pointerOffsetX: 0,
                                            pointerOffsetY: 0,
                                            pointerOffsetX2: 0,
                                            pointerOffsetY2: 0,
                                            targetOffsetX: 0,
                                            targetOffsetY: 0,
                                            targetScale: 0,
                                            pinchOffsetX: 0,
                                            pinchOffsetY: 0,
                                            limitOffsetX: 0,
                                            limitOffsetY: 0,
                                            scaleDifference: 0,
                                            targetPinchDistance: 0,
                                            touchCount: 0,
                                            doubleTapped: false,
                                            touchmoveCount: 0
                                        }
                                    );
                                    this.options = Object.assign(
                                        this.defaultOptions,
                                        options
                                    );
                                    this.isPassiveEventsSupported =
                                        this.checkPassiveEventsSupport();
                                    if (typeof elements === 'string') {
                                        this.initialSelector = elements;
                                        this.elements = Array.from(
                                            document.querySelectorAll(elements)
                                        );
                                    } else {
                                        this.elements =
                                            typeof elements.length !==
                                                'undefined' &&
                                            elements.length > 0
                                                ? Array.from(elements)
                                                : [elements];
                                    }
                                    this.relatedElements = [];
                                    this.transitionPrefix =
                                        this.calculateTransitionPrefix();
                                    this.transitionCapable =
                                        this.transitionPrefix !== false;
                                    this.initialLocationHash = this.hash;

                                    // this should be handled by attribute selector IMHO! => 'a[rel=bla]'...
                                    if (this.options.rel) {
                                        this.elements = this.getRelated(
                                            this.options.rel
                                        );
                                    }
                                    if (this.options.uniqueImages) {
                                        var imgArr = [];
                                        this.elements = Array.from(
                                            this.elements
                                        ).filter(function (element) {
                                            var src = element.getAttribute(
                                                _this.options.sourceAttr
                                            );
                                            if (imgArr.indexOf(src) === -1) {
                                                imgArr.push(src);
                                                return true;
                                            }
                                            return false;
                                        });
                                    }
                                    this.createDomNodes();
                                    if (this.options.close) {
                                        this.domNodes.wrapper.appendChild(
                                            this.domNodes.closeButton
                                        );
                                    }
                                    if (this.options.nav) {
                                        this.domNodes.wrapper.appendChild(
                                            this.domNodes.navigation
                                        );
                                    }
                                    if (this.options.spinner) {
                                        this.domNodes.wrapper.appendChild(
                                            this.domNodes.spinner
                                        );
                                    }
                                    this.addEventListener(
                                        this.elements,
                                        'click.' + this.eventNamespace,
                                        function (event) {
                                            if (
                                                _this.isValidLink(
                                                    event.currentTarget
                                                )
                                            ) {
                                                event.preventDefault();
                                                if (_this.isAnimating) {
                                                    return false;
                                                }
                                                _this.initialImageIndex =
                                                    _this.elements.indexOf(
                                                        event.currentTarget
                                                    );
                                                _this.openImage(
                                                    event.currentTarget
                                                );
                                            }
                                        }
                                    );

                                    // close addEventListener click addEventListener doc
                                    if (this.options.docClose) {
                                        this.addEventListener(
                                            this.domNodes.wrapper,
                                            [
                                                'click.' + this.eventNamespace,
                                                'touchstart.' +
                                                    this.eventNamespace
                                            ],
                                            function (event) {
                                                if (
                                                    _this.isOpen &&
                                                    event.target ===
                                                        event.currentTarget
                                                ) {
                                                    _this.close();
                                                }
                                            }
                                        );
                                    }

                                    // disable rightclick
                                    if (this.options.disableRightClick) {
                                        this.addEventListener(
                                            document.body,
                                            'contextmenu.' +
                                                this.eventNamespace,
                                            function (event) {
                                                if (
                                                    event.target.parentElement.classList.contains(
                                                        'sl-image'
                                                    )
                                                ) {
                                                    event.preventDefault();
                                                }
                                            }
                                        );
                                    }

                                    // keyboard-control
                                    if (this.options.enableKeyboard) {
                                        this.addEventListener(
                                            document.body,
                                            'keyup.' + this.eventNamespace,
                                            this.throttle(function (event) {
                                                _this.controlCoordinates.swipeDiff = 0;
                                                // keyboard control only if lightbox is open

                                                if (
                                                    _this.isAnimating &&
                                                    event.key === 'Escape'
                                                ) {
                                                    _this.currentImage.setAttribute(
                                                        'src',
                                                        ''
                                                    );
                                                    _this.isAnimating = false;
                                                    _this.close();
                                                    return;
                                                }
                                                if (_this.isOpen) {
                                                    event.preventDefault();
                                                    if (
                                                        event.key === 'Escape'
                                                    ) {
                                                        _this.close();
                                                    }
                                                    if (
                                                        !_this.isAnimating &&
                                                        [
                                                            'ArrowLeft',
                                                            'ArrowRight'
                                                        ].indexOf(event.key) >
                                                            -1
                                                    ) {
                                                        _this.loadImage(
                                                            event.key ===
                                                                'ArrowRight'
                                                                ? 1
                                                                : -1
                                                        );
                                                    }
                                                }
                                            }, this.options.throttleInterval)
                                        );
                                    }
                                    this.addEvents();
                                }
                                _createClass(SimpleLightbox, [
                                    {
                                        key: 'checkPassiveEventsSupport',
                                        value: function checkPassiveEventsSupport() {
                                            // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
                                            // Test via a getter in the options object to see if the passive property is accessed
                                            var supportsPassive = false;
                                            try {
                                                var opts =
                                                    Object.defineProperty(
                                                        {},
                                                        'passive',
                                                        {
                                                            get: function get() {
                                                                supportsPassive = true;
                                                            }
                                                        }
                                                    );
                                                window.addEventListener(
                                                    'testPassive',
                                                    null,
                                                    opts
                                                );
                                                window.removeEventListener(
                                                    'testPassive',
                                                    null,
                                                    opts
                                                );
                                            } catch (e) {}
                                            return supportsPassive;
                                        }
                                    },
                                    {
                                        key: 'getCaptionElement',
                                        value: function getCaptionElement(
                                            elem
                                        ) {
                                            // look at sibling selector
                                            if (
                                                this.options.captionSelector.startsWith(
                                                    '+'
                                                )
                                            ) {
                                                var selector =
                                                    this.options.captionSelector
                                                        .replace(/^\+/, '')
                                                        .trimStart();
                                                var sibling =
                                                    elem.nextElementSibling;
                                                if (
                                                    sibling &&
                                                    sibling.matches(selector)
                                                ) {
                                                    return sibling;
                                                }
                                                return false;
                                            } else if (
                                                this.options.captionSelector.startsWith(
                                                    '>'
                                                )
                                            ) {
                                                var _selector =
                                                    this.options.captionSelector
                                                        .replace(/^>/, '')
                                                        .trimStart();
                                                return elem.querySelector(
                                                    _selector
                                                );
                                            } else {
                                                return elem.querySelector(
                                                    this.options.captionSelector
                                                );
                                            }
                                        }
                                    },
                                    {
                                        key: 'generateQuerySelector',
                                        value: function generateQuerySelector(
                                            elem
                                        ) {
                                            var tagName = elem.tagName,
                                                id = elem.id,
                                                className = elem.className,
                                                parentNode = elem.parentNode;
                                            if (tagName === 'HTML')
                                                return 'HTML';
                                            var str = tagName;
                                            str +=
                                                id !== '' ? '#'.concat(id) : '';
                                            if (className) {
                                                var classes = className
                                                    .trim()
                                                    .split(/\s/);
                                                for (
                                                    var i = 0;
                                                    i < classes.length;
                                                    i++
                                                ) {
                                                    str += '.'.concat(
                                                        classes[i]
                                                    );
                                                }
                                            }
                                            var childIndex = 1;
                                            for (
                                                var e = elem;
                                                e.previousElementSibling;
                                                e = e.previousElementSibling
                                            ) {
                                                childIndex += 1;
                                            }
                                            str += ':nth-child('.concat(
                                                childIndex,
                                                ')'
                                            );
                                            return ''
                                                .concat(
                                                    this.generateQuerySelector(
                                                        parentNode
                                                    ),
                                                    ' > '
                                                )
                                                .concat(str);
                                        }
                                    },
                                    {
                                        key: 'createDomNodes',
                                        value: function createDomNodes() {
                                            this.domNodes.overlay =
                                                document.createElement('div');
                                            this.domNodes.overlay.classList.add(
                                                'sl-overlay'
                                            );
                                            this.domNodes.overlay.dataset.opacityTarget =
                                                this.options.overlayOpacity;
                                            this.domNodes.closeButton =
                                                document.createElement(
                                                    'button'
                                                );
                                            this.domNodes.closeButton.classList.add(
                                                'sl-close'
                                            );
                                            this.domNodes.closeButton.innerHTML =
                                                this.options.closeText;
                                            this.domNodes.spinner =
                                                document.createElement('div');
                                            this.domNodes.spinner.classList.add(
                                                'sl-spinner'
                                            );
                                            this.domNodes.spinner.innerHTML =
                                                '<div></div>';
                                            this.domNodes.navigation =
                                                document.createElement('div');
                                            this.domNodes.navigation.classList.add(
                                                'sl-navigation'
                                            );
                                            this.domNodes.navigation.innerHTML =
                                                '<button class="sl-prev">'
                                                    .concat(
                                                        this.options.navText[0],
                                                        '</button><button class="sl-next">'
                                                    )
                                                    .concat(
                                                        this.options.navText[1],
                                                        '</button>'
                                                    );
                                            this.domNodes.counter =
                                                document.createElement('div');
                                            this.domNodes.counter.classList.add(
                                                'sl-counter'
                                            );
                                            this.domNodes.counter.innerHTML =
                                                '<span class="sl-current"></span>/<span class="sl-total"></span>';
                                            this.domNodes.download =
                                                document.createElement('div');
                                            this.domNodes.download.classList.add(
                                                'sl-download'
                                            );
                                            this.domNodes.downloadLink =
                                                document.createElement('a');
                                            this.domNodes.downloadLink.setAttribute(
                                                'download',
                                                ''
                                            );
                                            this.domNodes.downloadLink.textContent =
                                                this.options.download;
                                            this.domNodes.download.appendChild(
                                                this.domNodes.downloadLink
                                            );
                                            this.domNodes.caption =
                                                document.createElement('div');
                                            this.domNodes.caption.classList.add(
                                                'sl-caption',
                                                'pos-' +
                                                    this.options.captionPosition
                                            );
                                            if (this.options.captionClass) {
                                                var _this$domNodes$captio;
                                                var captionClasses =
                                                    this.options.captionClass.split(
                                                        /[\s,]+/
                                                    );
                                                (_this$domNodes$captio =
                                                    this.domNodes.caption
                                                        .classList).add.apply(
                                                    _this$domNodes$captio,
                                                    _toConsumableArray(
                                                        captionClasses
                                                    )
                                                );
                                            }
                                            this.domNodes.image =
                                                document.createElement('div');
                                            this.domNodes.image.classList.add(
                                                'sl-image'
                                            );
                                            this.domNodes.wrapper =
                                                document.createElement('div');
                                            this.domNodes.wrapper.classList.add(
                                                'sl-wrapper'
                                            );
                                            this.domNodes.wrapper.setAttribute(
                                                'tabindex',
                                                -1
                                            );
                                            this.domNodes.wrapper.setAttribute(
                                                'role',
                                                'dialog'
                                            );
                                            this.domNodes.wrapper.setAttribute(
                                                'aria-hidden',
                                                false
                                            );
                                            if (this.options.className) {
                                                this.domNodes.wrapper.classList.add(
                                                    this.options.className
                                                );
                                            }
                                            if (this.options.rtl) {
                                                this.domNodes.wrapper.classList.add(
                                                    'sl-dir-rtl'
                                                );
                                            }
                                        }
                                    },
                                    {
                                        key: 'throttle',
                                        value: function throttle(func, limit) {
                                            var inThrottle;
                                            return function () {
                                                if (!inThrottle) {
                                                    func.apply(this, arguments);
                                                    inThrottle = true;
                                                    setTimeout(function () {
                                                        return (inThrottle = false);
                                                    }, limit);
                                                }
                                            };
                                        }
                                    },
                                    {
                                        key: 'isValidLink',
                                        value: function isValidLink(element) {
                                            return (
                                                !this.options.fileExt ||
                                                (element.getAttribute(
                                                    this.options.sourceAttr
                                                ) &&
                                                    new RegExp(
                                                        '(' +
                                                            this.options
                                                                .fileExt +
                                                            ')($|\\?.*$)',
                                                        'i'
                                                    ).test(
                                                        element.getAttribute(
                                                            this.options
                                                                .sourceAttr
                                                        )
                                                    ))
                                            );
                                        }
                                    },
                                    {
                                        key: 'calculateTransitionPrefix',
                                        value: function calculateTransitionPrefix() {
                                            var s = (
                                                document.body ||
                                                document.documentElement
                                            ).style;
                                            return 'transition' in s
                                                ? ''
                                                : 'WebkitTransition' in s
                                                ? '-webkit-'
                                                : 'MozTransition' in s
                                                ? '-moz-'
                                                : 'OTransition' in s
                                                ? '-o'
                                                : false;
                                        }
                                    },
                                    {
                                        key: 'getScrollbarWidth',
                                        value: function getScrollbarWidth() {
                                            var scrollbarWidth = 0;
                                            var scrollDiv =
                                                document.createElement('div');
                                            scrollDiv.classList.add(
                                                'sl-scrollbar-measure'
                                            );
                                            document.body.appendChild(
                                                scrollDiv
                                            );
                                            scrollbarWidth =
                                                scrollDiv.offsetWidth -
                                                scrollDiv.clientWidth;
                                            document.body.removeChild(
                                                scrollDiv
                                            );
                                            return scrollbarWidth;
                                        }
                                    },
                                    {
                                        key: 'toggleScrollbar',
                                        value: function toggleScrollbar(type) {
                                            var scrollbarWidth = 0;
                                            var fixedElements = [].slice.call(
                                                document.querySelectorAll(
                                                    '.' +
                                                        this.options.fixedClass
                                                )
                                            );
                                            if (type === 'hide') {
                                                var fullWindowWidth =
                                                    window.innerWidth;
                                                if (!fullWindowWidth) {
                                                    var documentElementRect =
                                                        document.documentElement.getBoundingClientRect();
                                                    fullWindowWidth =
                                                        documentElementRect.right -
                                                        Math.abs(
                                                            documentElementRect.left
                                                        );
                                                }
                                                if (
                                                    document.body.clientWidth <
                                                        fullWindowWidth ||
                                                    this.isAppleDevice
                                                ) {
                                                    var paddingRight = parseInt(
                                                        window.getComputedStyle(
                                                            document.body
                                                        ).paddingRight || 0,
                                                        10
                                                    );
                                                    scrollbarWidth =
                                                        this.getScrollbarWidth();
                                                    document.body.dataset.originalPaddingRight =
                                                        paddingRight;
                                                    if (
                                                        scrollbarWidth > 0 ||
                                                        (scrollbarWidth == 0 &&
                                                            this.isAppleDevice)
                                                    ) {
                                                        document.body.classList.add(
                                                            'hidden-scroll'
                                                        );
                                                        document.body.style.paddingRight =
                                                            paddingRight +
                                                            scrollbarWidth +
                                                            'px';
                                                        fixedElements.forEach(
                                                            function (element) {
                                                                var actualPadding =
                                                                    element
                                                                        .style
                                                                        .paddingRight;
                                                                var calculatedPadding =
                                                                    window.getComputedStyle(
                                                                        element
                                                                    )[
                                                                        'padding-right'
                                                                    ];
                                                                element.dataset.originalPaddingRight =
                                                                    actualPadding;
                                                                element.style.paddingRight =
                                                                    ''.concat(
                                                                        parseFloat(
                                                                            calculatedPadding
                                                                        ) +
                                                                            scrollbarWidth,
                                                                        'px'
                                                                    );
                                                            }
                                                        );
                                                    }
                                                }
                                            } else {
                                                document.body.classList.remove(
                                                    'hidden-scroll'
                                                );
                                                document.body.style.paddingRight =
                                                    document.body.dataset
                                                        .originalPaddingRight +
                                                    'px';
                                                fixedElements.forEach(function (
                                                    element
                                                ) {
                                                    var padding =
                                                        element.dataset
                                                            .originalPaddingRight;
                                                    if (
                                                        typeof padding !==
                                                        'undefined'
                                                    ) {
                                                        element.style.paddingRight =
                                                            padding;
                                                    }
                                                });
                                            }
                                            return scrollbarWidth;
                                        }
                                    },
                                    {
                                        key: 'close',
                                        value: function close() {
                                            var _this2 = this;
                                            if (
                                                !this.isOpen ||
                                                this.isAnimating ||
                                                this.isClosing
                                            ) {
                                                return false;
                                            }
                                            this.isClosing = true;
                                            var element =
                                                this.relatedElements[
                                                    this.currentImageIndex
                                                ];
                                            element.dispatchEvent(
                                                new Event(
                                                    'close.simplelightbox'
                                                )
                                            );
                                            if (this.options.history) {
                                                this.historyHasChanges = false;
                                                if (!this.hashReseted) {
                                                    this.resetHash();
                                                }
                                            }
                                            this.removeEventListener(
                                                document,
                                                'focusin.' + this.eventNamespace
                                            );
                                            this.fadeOut(
                                                this.domNodes.overlay,
                                                this.options.fadeSpeed
                                            );
                                            this.fadeOut(
                                                document.querySelectorAll(
                                                    '.sl-image img,  .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter'
                                                ),
                                                this.options.fadeSpeed,
                                                function () {
                                                    if (
                                                        _this2.options
                                                            .disableScroll
                                                    ) {
                                                        _this2.toggleScrollbar(
                                                            'show'
                                                        );
                                                    }
                                                    if (
                                                        _this2.options
                                                            .htmlClass &&
                                                        _this2.options
                                                            .htmlClass !== ''
                                                    ) {
                                                        document
                                                            .querySelector(
                                                                'html'
                                                            )
                                                            .classList.remove(
                                                                _this2.options
                                                                    .htmlClass
                                                            );
                                                    }
                                                    document.body.removeChild(
                                                        _this2.domNodes.wrapper
                                                    );
                                                    if (
                                                        _this2.options.overlay
                                                    ) {
                                                        document.body.removeChild(
                                                            _this2.domNodes
                                                                .overlay
                                                        );
                                                    }
                                                    _this2.domNodes.additionalHtml =
                                                        null;
                                                    _this2.domNodes.download =
                                                        null;
                                                    element.dispatchEvent(
                                                        new Event(
                                                            'closed.simplelightbox'
                                                        )
                                                    );
                                                    _this2.isClosing = false;
                                                }
                                            );
                                            this.currentImage = null;
                                            this.isOpen = false;
                                            this.isAnimating = false;

                                            // reset touchcontrol coordinates
                                            for (var key in this
                                                .controlCoordinates) {
                                                this.controlCoordinates[
                                                    key
                                                ] = 0;
                                            }
                                            this.controlCoordinates.mousedown = false;
                                            this.controlCoordinates.zoomed = false;
                                            this.controlCoordinates.capture = false;
                                            this.controlCoordinates.initialScale =
                                                this.minMax(
                                                    1,
                                                    1,
                                                    this.options.maxZoom
                                                );
                                            this.controlCoordinates.doubleTapped = false;
                                        }
                                    },
                                    {
                                        key: 'hash',
                                        get: function get() {
                                            return window.location.hash.substring(
                                                1
                                            );
                                        }
                                    },
                                    {
                                        key: 'preload',
                                        value: function preload() {
                                            var _this3 = this;
                                            var index = this.currentImageIndex,
                                                length =
                                                    this.relatedElements.length,
                                                next =
                                                    index + 1 < 0
                                                        ? length - 1
                                                        : index + 1 >=
                                                          length - 1
                                                        ? 0
                                                        : index + 1,
                                                prev =
                                                    index - 1 < 0
                                                        ? length - 1
                                                        : index - 1 >=
                                                          length - 1
                                                        ? 0
                                                        : index - 1,
                                                nextImage = new Image(),
                                                prevImage = new Image();
                                            nextImage.addEventListener(
                                                'load',
                                                function (event) {
                                                    var src =
                                                        event.target.getAttribute(
                                                            'src'
                                                        );
                                                    if (
                                                        _this3.loadedImages.indexOf(
                                                            src
                                                        ) === -1
                                                    ) {
                                                        //is this condition even required... setting multiple times will not change usage...
                                                        _this3.loadedImages.push(
                                                            src
                                                        );
                                                    }
                                                    _this3.relatedElements[
                                                        index
                                                    ].dispatchEvent(
                                                        new Event(
                                                            'nextImageLoaded.' +
                                                                _this3.eventNamespace
                                                        )
                                                    );
                                                }
                                            );
                                            nextImage.setAttribute(
                                                'src',
                                                this.relatedElements[
                                                    next
                                                ].getAttribute(
                                                    this.options.sourceAttr
                                                )
                                            );
                                            prevImage.addEventListener(
                                                'load',
                                                function (event) {
                                                    var src =
                                                        event.target.getAttribute(
                                                            'src'
                                                        );
                                                    if (
                                                        _this3.loadedImages.indexOf(
                                                            src
                                                        ) === -1
                                                    ) {
                                                        _this3.loadedImages.push(
                                                            src
                                                        );
                                                    }
                                                    _this3.relatedElements[
                                                        index
                                                    ].dispatchEvent(
                                                        new Event(
                                                            'prevImageLoaded.' +
                                                                _this3.eventNamespace
                                                        )
                                                    );
                                                }
                                            );
                                            prevImage.setAttribute(
                                                'src',
                                                this.relatedElements[
                                                    prev
                                                ].getAttribute(
                                                    this.options.sourceAttr
                                                )
                                            );
                                        }
                                    },
                                    {
                                        key: 'loadImage',
                                        value: function loadImage(direction) {
                                            var _this4 = this;
                                            var slideDirection = direction;
                                            if (this.options.rtl) {
                                                direction = -direction;
                                            }
                                            this.relatedElements[
                                                this.currentImageIndex
                                            ].dispatchEvent(
                                                new Event(
                                                    'change.' +
                                                        this.eventNamespace
                                                )
                                            );
                                            this.relatedElements[
                                                this.currentImageIndex
                                            ].dispatchEvent(
                                                new Event(
                                                    (direction === 1
                                                        ? 'next'
                                                        : 'prev') +
                                                        '.' +
                                                        this.eventNamespace
                                                )
                                            );
                                            var newIndex =
                                                this.currentImageIndex +
                                                direction;
                                            if (
                                                this.isAnimating ||
                                                ((newIndex < 0 ||
                                                    newIndex >=
                                                        this.relatedElements
                                                            .length) &&
                                                    this.options.loop === false)
                                            ) {
                                                return false;
                                            }
                                            this.currentImageIndex =
                                                newIndex < 0
                                                    ? this.relatedElements
                                                          .length - 1
                                                    : newIndex >
                                                      this.relatedElements
                                                          .length -
                                                          1
                                                    ? 0
                                                    : newIndex;
                                            this.domNodes.counter.querySelector(
                                                '.sl-current'
                                            ).innerHTML =
                                                this.currentImageIndex + 1;
                                            if (this.options.animationSlide) {
                                                this.slide(
                                                    this.options
                                                        .animationSpeed / 1000,
                                                    -100 * slideDirection -
                                                        this.controlCoordinates
                                                            .swipeDiff +
                                                        'px'
                                                );
                                            }
                                            this.fadeOut(
                                                this.domNodes.image,
                                                this.options.fadeSpeed,
                                                function () {
                                                    _this4.isAnimating = true;
                                                    if (!_this4.isClosing) {
                                                        setTimeout(function () {
                                                            var element =
                                                                _this4
                                                                    .relatedElements[
                                                                    _this4
                                                                        .currentImageIndex
                                                                ];
                                                            if (
                                                                !_this4.currentImage
                                                            )
                                                                return;
                                                            _this4.currentImage.setAttribute(
                                                                'src',
                                                                element.getAttribute(
                                                                    _this4
                                                                        .options
                                                                        .sourceAttr
                                                                )
                                                            );
                                                            if (
                                                                _this4.loadedImages.indexOf(
                                                                    element.getAttribute(
                                                                        _this4
                                                                            .options
                                                                            .sourceAttr
                                                                    )
                                                                ) === -1
                                                            ) {
                                                                _this4.show(
                                                                    _this4
                                                                        .domNodes
                                                                        .spinner
                                                                );
                                                            }
                                                            if (
                                                                _this4.domNodes.image.contains(
                                                                    _this4
                                                                        .domNodes
                                                                        .caption
                                                                )
                                                            ) {
                                                                _this4.domNodes.image.removeChild(
                                                                    _this4
                                                                        .domNodes
                                                                        .caption
                                                                );
                                                            }
                                                            _this4.adjustImage(
                                                                slideDirection
                                                            );
                                                            if (
                                                                _this4.options
                                                                    .preloading
                                                            )
                                                                _this4.preload();
                                                        }, 100);
                                                    } else {
                                                        _this4.isAnimating = false;
                                                    }
                                                }
                                            );
                                        }
                                    },
                                    {
                                        key: 'adjustImage',
                                        value: function adjustImage(direction) {
                                            var _this5 = this;
                                            if (!this.currentImage) {
                                                return false;
                                            }
                                            var tmpImage = new Image(),
                                                windowWidth =
                                                    window.innerWidth *
                                                    this.options.widthRatio,
                                                windowHeight =
                                                    window.innerHeight *
                                                    this.options.heightRatio;
                                            tmpImage.setAttribute(
                                                'src',
                                                this.currentImage.getAttribute(
                                                    'src'
                                                )
                                            );
                                            this.currentImage.dataset.scale = 1;
                                            this.currentImage.dataset.translateX = 0;
                                            this.currentImage.dataset.translateY = 0;
                                            this.zoomPanElement(0, 0, 1);
                                            tmpImage.addEventListener(
                                                'error',
                                                function (event) {
                                                    _this5.relatedElements[
                                                        _this5.currentImageIndex
                                                    ].dispatchEvent(
                                                        new Event(
                                                            'error.' +
                                                                _this5.eventNamespace
                                                        )
                                                    );
                                                    _this5.isAnimating = false;
                                                    _this5.isOpen = true;
                                                    _this5.domNodes.spinner.style.display =
                                                        'none';
                                                    var dirIsDefined =
                                                        direction === 1 ||
                                                        direction === -1;
                                                    if (
                                                        _this5.initialImageIndex ===
                                                            _this5.currentImageIndex &&
                                                        dirIsDefined
                                                    ) {
                                                        return _this5.close();
                                                    }
                                                    if (
                                                        _this5.options
                                                            .alertError
                                                    ) {
                                                        alert(
                                                            _this5.options
                                                                .alertErrorMessage
                                                        );
                                                    }
                                                    _this5.loadImage(
                                                        dirIsDefined
                                                            ? direction
                                                            : 1
                                                    );
                                                }
                                            );
                                            tmpImage.addEventListener(
                                                'load',
                                                function (event) {
                                                    if (
                                                        typeof direction !==
                                                        'undefined'
                                                    ) {
                                                        _this5.relatedElements[
                                                            _this5
                                                                .currentImageIndex
                                                        ].dispatchEvent(
                                                            new Event(
                                                                'changed.' +
                                                                    _this5.eventNamespace
                                                            )
                                                        );
                                                        _this5.relatedElements[
                                                            _this5
                                                                .currentImageIndex
                                                        ].dispatchEvent(
                                                            new Event(
                                                                (direction === 1
                                                                    ? 'nextDone'
                                                                    : 'prevDone') +
                                                                    '.' +
                                                                    _this5.eventNamespace
                                                            )
                                                        );
                                                    }

                                                    // history
                                                    if (
                                                        _this5.options.history
                                                    ) {
                                                        _this5.updateURL();
                                                    }
                                                    if (
                                                        _this5.loadedImages.indexOf(
                                                            _this5.currentImage.getAttribute(
                                                                'src'
                                                            )
                                                        ) === -1
                                                    ) {
                                                        _this5.loadedImages.push(
                                                            _this5.currentImage.getAttribute(
                                                                'src'
                                                            )
                                                        );
                                                    }
                                                    var imageWidth =
                                                            event.target.width,
                                                        imageHeight =
                                                            event.target.height;
                                                    if (
                                                        _this5.options
                                                            .scaleImageToRatio ||
                                                        imageWidth >
                                                            windowWidth ||
                                                        imageHeight >
                                                            windowHeight
                                                    ) {
                                                        var ratio =
                                                            imageWidth /
                                                                imageHeight >
                                                            windowWidth /
                                                                windowHeight
                                                                ? imageWidth /
                                                                  windowWidth
                                                                : imageHeight /
                                                                  windowHeight;
                                                        imageWidth /= ratio;
                                                        imageHeight /= ratio;
                                                    }
                                                    _this5.domNodes.image.style.top =
                                                        (window.innerHeight -
                                                            imageHeight) /
                                                            2 +
                                                        'px';
                                                    _this5.domNodes.image.style.left =
                                                        (window.innerWidth -
                                                            imageWidth -
                                                            _this5.globalScrollbarWidth) /
                                                            2 +
                                                        'px';
                                                    _this5.domNodes.image.style.width =
                                                        imageWidth + 'px';
                                                    _this5.domNodes.image.style.height =
                                                        imageHeight + 'px';
                                                    _this5.domNodes.spinner.style.display =
                                                        'none';
                                                    if (_this5.options.focus) {
                                                        _this5.forceFocus();
                                                    }
                                                    _this5.fadeIn(
                                                        _this5.currentImage,
                                                        _this5.options
                                                            .fadeSpeed,
                                                        function () {
                                                            if (
                                                                _this5.options
                                                                    .focus
                                                            ) {
                                                                _this5.domNodes.wrapper.focus();
                                                            }
                                                        }
                                                    );
                                                    _this5.isOpen = true;
                                                    var captionContainer,
                                                        captionText;
                                                    if (
                                                        typeof _this5.options
                                                            .captionSelector ===
                                                        'string'
                                                    ) {
                                                        captionContainer =
                                                            _this5.options
                                                                .captionSelector ===
                                                            'self'
                                                                ? _this5
                                                                      .relatedElements[
                                                                      _this5
                                                                          .currentImageIndex
                                                                  ]
                                                                : _this5.getCaptionElement(
                                                                      _this5
                                                                          .relatedElements[
                                                                          _this5
                                                                              .currentImageIndex
                                                                      ]
                                                                  );
                                                    } else if (
                                                        typeof _this5.options
                                                            .captionSelector ===
                                                        'function'
                                                    ) {
                                                        captionContainer =
                                                            _this5.options.captionSelector(
                                                                _this5
                                                                    .relatedElements[
                                                                    _this5
                                                                        .currentImageIndex
                                                                ]
                                                            );
                                                    }
                                                    if (
                                                        _this5.options
                                                            .captions &&
                                                        captionContainer
                                                    ) {
                                                        if (
                                                            _this5.options
                                                                .captionType ===
                                                            'data'
                                                        ) {
                                                            captionText =
                                                                captionContainer
                                                                    .dataset[
                                                                    _this5
                                                                        .options
                                                                        .captionsData
                                                                ];
                                                        } else if (
                                                            _this5.options
                                                                .captionType ===
                                                            'text'
                                                        ) {
                                                            captionText =
                                                                captionContainer.innerHTML;
                                                        } else {
                                                            captionText =
                                                                captionContainer.getAttribute(
                                                                    _this5
                                                                        .options
                                                                        .captionsData
                                                                );
                                                        }
                                                    }
                                                    if (!_this5.options.loop) {
                                                        if (
                                                            _this5.currentImageIndex ===
                                                            0
                                                        ) {
                                                            _this5.hide(
                                                                _this5.domNodes.navigation.querySelector(
                                                                    '.sl-prev'
                                                                )
                                                            );
                                                        }
                                                        if (
                                                            _this5.currentImageIndex >=
                                                            _this5
                                                                .relatedElements
                                                                .length -
                                                                1
                                                        ) {
                                                            _this5.hide(
                                                                _this5.domNodes.navigation.querySelector(
                                                                    '.sl-next'
                                                                )
                                                            );
                                                        }
                                                        if (
                                                            _this5.currentImageIndex >
                                                            0
                                                        ) {
                                                            _this5.show(
                                                                _this5.domNodes.navigation.querySelector(
                                                                    '.sl-prev'
                                                                )
                                                            );
                                                        }
                                                        if (
                                                            _this5.currentImageIndex <
                                                            _this5
                                                                .relatedElements
                                                                .length -
                                                                1
                                                        ) {
                                                            _this5.show(
                                                                _this5.domNodes.navigation.querySelector(
                                                                    '.sl-next'
                                                                )
                                                            );
                                                        }
                                                    } else {
                                                        if (
                                                            _this5
                                                                .relatedElements
                                                                .length === 1
                                                        ) {
                                                            _this5.hide(
                                                                _this5.domNodes.navigation.querySelectorAll(
                                                                    '.sl-prev, .sl-next'
                                                                )
                                                            );
                                                        } else {
                                                            _this5.show(
                                                                _this5.domNodes.navigation.querySelectorAll(
                                                                    '.sl-prev, .sl-next'
                                                                )
                                                            );
                                                        }
                                                    }
                                                    if (
                                                        direction === 1 ||
                                                        direction === -1
                                                    ) {
                                                        if (
                                                            _this5.options
                                                                .animationSlide
                                                        ) {
                                                            _this5.slide(
                                                                0,
                                                                100 *
                                                                    direction +
                                                                    'px'
                                                            );
                                                            setTimeout(
                                                                function () {
                                                                    _this5.slide(
                                                                        _this5
                                                                            .options
                                                                            .animationSpeed /
                                                                            1000,
                                                                        0 + 'px'
                                                                    );
                                                                },
                                                                50
                                                            );
                                                        }
                                                        _this5.fadeIn(
                                                            _this5.domNodes
                                                                .image,
                                                            _this5.options
                                                                .fadeSpeed,
                                                            function () {
                                                                _this5.isAnimating = false;
                                                                _this5.setCaption(
                                                                    captionText,
                                                                    imageWidth
                                                                );
                                                            }
                                                        );
                                                    } else {
                                                        _this5.isAnimating = false;
                                                        _this5.setCaption(
                                                            captionText,
                                                            imageWidth
                                                        );
                                                    }
                                                    if (
                                                        _this5.options
                                                            .additionalHtml &&
                                                        !_this5.domNodes
                                                            .additionalHtml
                                                    ) {
                                                        _this5.domNodes.additionalHtml =
                                                            document.createElement(
                                                                'div'
                                                            );
                                                        _this5.domNodes.additionalHtml.classList.add(
                                                            'sl-additional-html'
                                                        );
                                                        _this5.domNodes.additionalHtml.innerHTML =
                                                            _this5.options.additionalHtml;
                                                        _this5.domNodes.image.appendChild(
                                                            _this5.domNodes
                                                                .additionalHtml
                                                        );
                                                    }
                                                    if (
                                                        _this5.options.download
                                                    ) {
                                                        _this5.domNodes.downloadLink.setAttribute(
                                                            'href',
                                                            _this5.currentImage.getAttribute(
                                                                'src'
                                                            )
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    },
                                    {
                                        key: 'zoomPanElement',
                                        value: function zoomPanElement(
                                            targetOffsetX,
                                            targetOffsetY,
                                            targetScale
                                        ) {
                                            this.currentImage.style[
                                                this.transitionPrefix +
                                                    'transform'
                                            ] =
                                                'translate(' +
                                                targetOffsetX +
                                                ',' +
                                                targetOffsetY +
                                                ') scale(' +
                                                targetScale +
                                                ')';
                                        }
                                    },
                                    {
                                        key: 'minMax',
                                        value: function minMax(
                                            value,
                                            min,
                                            max
                                        ) {
                                            return value < min
                                                ? min
                                                : value > max
                                                ? max
                                                : value;
                                        }
                                    },
                                    {
                                        key: 'setZoomData',
                                        value: function setZoomData(
                                            initialScale,
                                            targetOffsetX,
                                            targetOffsetY
                                        ) {
                                            this.currentImage.dataset.scale =
                                                initialScale;
                                            this.currentImage.dataset.translateX =
                                                targetOffsetX;
                                            this.currentImage.dataset.translateY =
                                                targetOffsetY;
                                        }
                                    },
                                    {
                                        key: 'hashchangeHandler',
                                        value: function hashchangeHandler() {
                                            if (
                                                this.isOpen &&
                                                this.hash ===
                                                    this.initialLocationHash
                                            ) {
                                                this.hashReseted = true;
                                                this.close();
                                            }
                                        }
                                    },
                                    {
                                        key: 'addEvents',
                                        value: function addEvents() {
                                            var _this6 = this;
                                            // resize/responsive
                                            this.addEventListener(
                                                window,
                                                'resize.' + this.eventNamespace,
                                                function (event) {
                                                    //this.adjustImage.bind(this)
                                                    if (_this6.isOpen) {
                                                        _this6.adjustImage();
                                                    }
                                                }
                                            );
                                            this.addEventListener(
                                                this.domNodes.closeButton,
                                                [
                                                    'click.' +
                                                        this.eventNamespace,
                                                    'touchstart.' +
                                                        this.eventNamespace
                                                ],
                                                this.close.bind(this)
                                            );
                                            if (this.options.history) {
                                                setTimeout(function () {
                                                    _this6.addEventListener(
                                                        window,
                                                        'hashchange.' +
                                                            _this6.eventNamespace,
                                                        function (event) {
                                                            if (_this6.isOpen) {
                                                                _this6.hashchangeHandler();
                                                            }
                                                        }
                                                    );
                                                }, 40);
                                            }
                                            this.addEventListener(
                                                this.domNodes.navigation.getElementsByTagName(
                                                    'button'
                                                ),
                                                'click.' + this.eventNamespace,
                                                function (event) {
                                                    if (
                                                        !event.currentTarget.tagName.match(
                                                            /button/i
                                                        )
                                                    ) {
                                                        return true;
                                                    }
                                                    event.preventDefault();
                                                    _this6.controlCoordinates.swipeDiff = 0;
                                                    _this6.loadImage(
                                                        event.currentTarget.classList.contains(
                                                            'sl-next'
                                                        )
                                                            ? 1
                                                            : -1
                                                    );
                                                }
                                            );
                                            if (this.options.scrollZoom) {
                                                var scale = 1;
                                                this.addEventListener(
                                                    this.domNodes.image,
                                                    [
                                                        'mousewheel',
                                                        'DOMMouseScroll'
                                                    ],
                                                    function (event) {
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .mousedown ||
                                                            _this6.isAnimating ||
                                                            _this6.isClosing ||
                                                            !_this6.isOpen
                                                        ) {
                                                            return true;
                                                        }
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .containerHeight ==
                                                            0
                                                        ) {
                                                            _this6.controlCoordinates.containerHeight =
                                                                _this6.getDimensions(
                                                                    _this6
                                                                        .domNodes
                                                                        .image
                                                                ).height;
                                                            _this6.controlCoordinates.containerWidth =
                                                                _this6.getDimensions(
                                                                    _this6
                                                                        .domNodes
                                                                        .image
                                                                ).width;
                                                            _this6.controlCoordinates.imgHeight =
                                                                _this6.getDimensions(
                                                                    _this6.currentImage
                                                                ).height;
                                                            _this6.controlCoordinates.imgWidth =
                                                                _this6.getDimensions(
                                                                    _this6.currentImage
                                                                ).width;
                                                            _this6.controlCoordinates.containerOffsetX =
                                                                _this6.domNodes.image.offsetLeft;
                                                            _this6.controlCoordinates.containerOffsetY =
                                                                _this6.domNodes.image.offsetTop;
                                                            _this6.controlCoordinates.initialOffsetX =
                                                                parseFloat(
                                                                    _this6
                                                                        .currentImage
                                                                        .dataset
                                                                        .translateX
                                                                );
                                                            _this6.controlCoordinates.initialOffsetY =
                                                                parseFloat(
                                                                    _this6
                                                                        .currentImage
                                                                        .dataset
                                                                        .translateY
                                                                );
                                                        }
                                                        // event.preventDefault();

                                                        var delta =
                                                            event.delta ||
                                                            event.wheelDelta;
                                                        if (
                                                            delta === undefined
                                                        ) {
                                                            //we are on firefox
                                                            delta =
                                                                event.detail;
                                                        }
                                                        delta = Math.max(
                                                            -1,
                                                            Math.min(1, delta)
                                                        ); // cap the delta to [-1,1] for cross browser consistency

                                                        // apply zoom
                                                        scale +=
                                                            delta *
                                                            _this6.options
                                                                .scrollZoomFactor *
                                                            scale;
                                                        scale = Math.max(
                                                            1,
                                                            Math.min(
                                                                _this6.options
                                                                    .maxZoom,
                                                                scale
                                                            )
                                                        );
                                                        _this6.controlCoordinates.targetScale =
                                                            scale;
                                                        var scrollTopPos =
                                                            document
                                                                .documentElement
                                                                .scrollTop ||
                                                            document.body
                                                                .scrollTop;
                                                        _this6.controlCoordinates.pinchOffsetX =
                                                            event.pageX;
                                                        _this6.controlCoordinates.pinchOffsetY =
                                                            event.pageY -
                                                                scrollTopPos ||
                                                            0; // need to substract the scroll position

                                                        _this6.controlCoordinates.limitOffsetX =
                                                            (_this6
                                                                .controlCoordinates
                                                                .imgWidth *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale -
                                                                _this6
                                                                    .controlCoordinates
                                                                    .containerWidth) /
                                                            2;
                                                        _this6.controlCoordinates.limitOffsetY =
                                                            (_this6
                                                                .controlCoordinates
                                                                .imgHeight *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale -
                                                                _this6
                                                                    .controlCoordinates
                                                                    .containerHeight) /
                                                            2;
                                                        _this6.controlCoordinates.scaleDifference =
                                                            _this6
                                                                .controlCoordinates
                                                                .targetScale -
                                                            _this6
                                                                .controlCoordinates
                                                                .initialScale;
                                                        _this6.controlCoordinates.targetOffsetX =
                                                            _this6
                                                                .controlCoordinates
                                                                .imgWidth *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale <=
                                                            _this6
                                                                .controlCoordinates
                                                                .containerWidth
                                                                ? 0
                                                                : _this6.minMax(
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .initialOffsetX -
                                                                          ((_this6
                                                                              .controlCoordinates
                                                                              .pinchOffsetX -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .containerOffsetX -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .containerWidth /
                                                                                  2 -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .initialOffsetX) /
                                                                              (_this6
                                                                                  .controlCoordinates
                                                                                  .targetScale -
                                                                                  _this6
                                                                                      .controlCoordinates
                                                                                      .scaleDifference)) *
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .scaleDifference,
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetX *
                                                                          -1,
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetX
                                                                  );
                                                        _this6.controlCoordinates.targetOffsetY =
                                                            _this6
                                                                .controlCoordinates
                                                                .imgHeight *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale <=
                                                            _this6
                                                                .controlCoordinates
                                                                .containerHeight
                                                                ? 0
                                                                : _this6.minMax(
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .initialOffsetY -
                                                                          ((_this6
                                                                              .controlCoordinates
                                                                              .pinchOffsetY -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .containerOffsetY -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .containerHeight /
                                                                                  2 -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .initialOffsetY) /
                                                                              (_this6
                                                                                  .controlCoordinates
                                                                                  .targetScale -
                                                                                  _this6
                                                                                      .controlCoordinates
                                                                                      .scaleDifference)) *
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .scaleDifference,
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetY *
                                                                          -1,
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetY
                                                                  );
                                                        _this6.zoomPanElement(
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetX +
                                                                'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetY +
                                                                'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .targetScale
                                                        );
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .targetScale > 1
                                                        ) {
                                                            _this6.controlCoordinates.zoomed = true;
                                                            if (
                                                                (!_this6
                                                                    .domNodes
                                                                    .caption
                                                                    .style
                                                                    .opacity ||
                                                                    _this6
                                                                        .domNodes
                                                                        .caption
                                                                        .style
                                                                        .opacity >
                                                                        0) &&
                                                                _this6.domNodes
                                                                    .caption
                                                                    .style
                                                                    .display !==
                                                                    'none'
                                                            ) {
                                                                _this6.fadeOut(
                                                                    _this6
                                                                        .domNodes
                                                                        .caption,
                                                                    _this6
                                                                        .options
                                                                        .fadeSpeed
                                                                );
                                                            }
                                                        } else {
                                                            if (
                                                                _this6
                                                                    .controlCoordinates
                                                                    .initialScale ===
                                                                1
                                                            ) {
                                                                _this6.controlCoordinates.zoomed = false;
                                                                if (
                                                                    _this6
                                                                        .domNodes
                                                                        .caption
                                                                        .style
                                                                        .display ===
                                                                    'none'
                                                                ) {
                                                                    _this6.fadeIn(
                                                                        _this6
                                                                            .domNodes
                                                                            .caption,
                                                                        _this6
                                                                            .options
                                                                            .fadeSpeed
                                                                    );
                                                                }
                                                            }
                                                            _this6.controlCoordinates.initialPinchDistance =
                                                                null;
                                                            _this6.controlCoordinates.capture = false;
                                                        }
                                                        _this6.controlCoordinates.initialPinchDistance =
                                                            _this6.controlCoordinates.targetPinchDistance;
                                                        _this6.controlCoordinates.initialScale =
                                                            _this6.controlCoordinates.targetScale;
                                                        _this6.controlCoordinates.initialOffsetX =
                                                            _this6.controlCoordinates.targetOffsetX;
                                                        _this6.controlCoordinates.initialOffsetY =
                                                            _this6.controlCoordinates.targetOffsetY;
                                                        _this6.setZoomData(
                                                            _this6
                                                                .controlCoordinates
                                                                .targetScale,
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetX,
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetY
                                                        );
                                                        _this6.zoomPanElement(
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetX +
                                                                'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetY +
                                                                'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .targetScale
                                                        );
                                                    }
                                                );
                                            }
                                            this.addEventListener(
                                                this.domNodes.image,
                                                [
                                                    'touchstart.' +
                                                        this.eventNamespace,
                                                    'mousedown.' +
                                                        this.eventNamespace
                                                ],
                                                function (event) {
                                                    if (
                                                        event.target.tagName ===
                                                            'A' &&
                                                        event.type ===
                                                            'touchstart'
                                                    ) {
                                                        return true;
                                                    }
                                                    if (
                                                        event.type ===
                                                        'mousedown'
                                                    ) {
                                                        event.preventDefault();
                                                        _this6.controlCoordinates.initialPointerOffsetX =
                                                            event.clientX;
                                                        _this6.controlCoordinates.initialPointerOffsetY =
                                                            event.clientY;
                                                        _this6.controlCoordinates.containerHeight =
                                                            _this6.getDimensions(
                                                                _this6.domNodes
                                                                    .image
                                                            ).height;
                                                        _this6.controlCoordinates.containerWidth =
                                                            _this6.getDimensions(
                                                                _this6.domNodes
                                                                    .image
                                                            ).width;
                                                        _this6.controlCoordinates.imgHeight =
                                                            _this6.getDimensions(
                                                                _this6.currentImage
                                                            ).height;
                                                        _this6.controlCoordinates.imgWidth =
                                                            _this6.getDimensions(
                                                                _this6.currentImage
                                                            ).width;
                                                        _this6.controlCoordinates.containerOffsetX =
                                                            _this6.domNodes.image.offsetLeft;
                                                        _this6.controlCoordinates.containerOffsetY =
                                                            _this6.domNodes.image.offsetTop;
                                                        _this6.controlCoordinates.initialOffsetX =
                                                            parseFloat(
                                                                _this6
                                                                    .currentImage
                                                                    .dataset
                                                                    .translateX
                                                            );
                                                        _this6.controlCoordinates.initialOffsetY =
                                                            parseFloat(
                                                                _this6
                                                                    .currentImage
                                                                    .dataset
                                                                    .translateY
                                                            );
                                                        _this6.controlCoordinates.capture = true;
                                                    } else {
                                                        _this6.controlCoordinates.touchCount =
                                                            event.touches.length;
                                                        _this6.controlCoordinates.initialPointerOffsetX =
                                                            event.touches[0].clientX;
                                                        _this6.controlCoordinates.initialPointerOffsetY =
                                                            event.touches[0].clientY;
                                                        _this6.controlCoordinates.containerHeight =
                                                            _this6.getDimensions(
                                                                _this6.domNodes
                                                                    .image
                                                            ).height;
                                                        _this6.controlCoordinates.containerWidth =
                                                            _this6.getDimensions(
                                                                _this6.domNodes
                                                                    .image
                                                            ).width;
                                                        _this6.controlCoordinates.imgHeight =
                                                            _this6.getDimensions(
                                                                _this6.currentImage
                                                            ).height;
                                                        _this6.controlCoordinates.imgWidth =
                                                            _this6.getDimensions(
                                                                _this6.currentImage
                                                            ).width;
                                                        _this6.controlCoordinates.containerOffsetX =
                                                            _this6.domNodes.image.offsetLeft;
                                                        _this6.controlCoordinates.containerOffsetY =
                                                            _this6.domNodes.image.offsetTop;
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .touchCount ===
                                                            1
                                                        ) {
                                                            /* Single touch */ if (
                                                                !_this6
                                                                    .controlCoordinates
                                                                    .doubleTapped
                                                            ) {
                                                                _this6.controlCoordinates.doubleTapped = true;
                                                                setTimeout(
                                                                    function () {
                                                                        _this6.controlCoordinates.doubleTapped = false;
                                                                    },
                                                                    300
                                                                );
                                                            } else {
                                                                _this6.currentImage.classList.add(
                                                                    'sl-transition'
                                                                );
                                                                if (
                                                                    !_this6
                                                                        .controlCoordinates
                                                                        .zoomed
                                                                ) {
                                                                    _this6.controlCoordinates.initialScale =
                                                                        _this6.options.doubleTapZoom;
                                                                    _this6.setZoomData(
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .initialScale,
                                                                        0,
                                                                        0
                                                                    );
                                                                    _this6.zoomPanElement(
                                                                        0 +
                                                                            'px',
                                                                        0 +
                                                                            'px',
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .initialScale
                                                                    );
                                                                    if (
                                                                        (!_this6
                                                                            .domNodes
                                                                            .caption
                                                                            .style
                                                                            .opacity ||
                                                                            _this6
                                                                                .domNodes
                                                                                .caption
                                                                                .style
                                                                                .opacity >
                                                                                0) &&
                                                                        _this6
                                                                            .domNodes
                                                                            .caption
                                                                            .style
                                                                            .display !==
                                                                            'none'
                                                                    ) {
                                                                        _this6.fadeOut(
                                                                            _this6
                                                                                .domNodes
                                                                                .caption,
                                                                            _this6
                                                                                .options
                                                                                .fadeSpeed
                                                                        );
                                                                    }
                                                                    _this6.controlCoordinates.zoomed = true;
                                                                } else {
                                                                    _this6.controlCoordinates.initialScale = 1;
                                                                    _this6.setZoomData(
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .initialScale,
                                                                        0,
                                                                        0
                                                                    );
                                                                    _this6.zoomPanElement(
                                                                        0 +
                                                                            'px',
                                                                        0 +
                                                                            'px',
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .initialScale
                                                                    );
                                                                    _this6.controlCoordinates.zoomed = false;
                                                                }
                                                                setTimeout(
                                                                    function () {
                                                                        if (
                                                                            _this6.currentImage
                                                                        ) {
                                                                            _this6.currentImage.classList.remove(
                                                                                'sl-transition'
                                                                            );
                                                                        }
                                                                    },
                                                                    200
                                                                );
                                                                return false;
                                                            }
                                                            _this6.controlCoordinates.initialOffsetX =
                                                                parseFloat(
                                                                    _this6
                                                                        .currentImage
                                                                        .dataset
                                                                        .translateX
                                                                );
                                                            _this6.controlCoordinates.initialOffsetY =
                                                                parseFloat(
                                                                    _this6
                                                                        .currentImage
                                                                        .dataset
                                                                        .translateY
                                                                );
                                                        } else if (
                                                            _this6
                                                                .controlCoordinates
                                                                .touchCount ===
                                                            2
                                                        ) {
                                                            /* Pinch */ _this6.controlCoordinates.initialPointerOffsetX2 =
                                                                event.touches[1].clientX;
                                                            _this6.controlCoordinates.initialPointerOffsetY2 =
                                                                event.touches[1].clientY;
                                                            _this6.controlCoordinates.initialOffsetX =
                                                                parseFloat(
                                                                    _this6
                                                                        .currentImage
                                                                        .dataset
                                                                        .translateX
                                                                );
                                                            _this6.controlCoordinates.initialOffsetY =
                                                                parseFloat(
                                                                    _this6
                                                                        .currentImage
                                                                        .dataset
                                                                        .translateY
                                                                );
                                                            _this6.controlCoordinates.pinchOffsetX =
                                                                (_this6
                                                                    .controlCoordinates
                                                                    .initialPointerOffsetX +
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .initialPointerOffsetX2) /
                                                                2;
                                                            _this6.controlCoordinates.pinchOffsetY =
                                                                (_this6
                                                                    .controlCoordinates
                                                                    .initialPointerOffsetY +
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .initialPointerOffsetY2) /
                                                                2;
                                                            _this6.controlCoordinates.initialPinchDistance =
                                                                Math.sqrt(
                                                                    (_this6
                                                                        .controlCoordinates
                                                                        .initialPointerOffsetX -
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .initialPointerOffsetX2) *
                                                                        (_this6
                                                                            .controlCoordinates
                                                                            .initialPointerOffsetX -
                                                                            _this6
                                                                                .controlCoordinates
                                                                                .initialPointerOffsetX2) +
                                                                        (_this6
                                                                            .controlCoordinates
                                                                            .initialPointerOffsetY -
                                                                            _this6
                                                                                .controlCoordinates
                                                                                .initialPointerOffsetY2) *
                                                                            (_this6
                                                                                .controlCoordinates
                                                                                .initialPointerOffsetY -
                                                                                _this6
                                                                                    .controlCoordinates
                                                                                    .initialPointerOffsetY2)
                                                                );
                                                        }
                                                        _this6.controlCoordinates.capture = true;
                                                    }
                                                    if (
                                                        _this6
                                                            .controlCoordinates
                                                            .mousedown
                                                    )
                                                        return true;
                                                    if (
                                                        _this6.transitionCapable
                                                    ) {
                                                        _this6.controlCoordinates.imageLeft =
                                                            parseInt(
                                                                _this6.domNodes
                                                                    .image.style
                                                                    .left,
                                                                10
                                                            );
                                                    }
                                                    _this6.controlCoordinates.mousedown = true;
                                                    _this6.controlCoordinates.swipeDiff = 0;
                                                    _this6.controlCoordinates.swipeYDiff = 0;
                                                    _this6.controlCoordinates.swipeStart =
                                                        event.pageX ||
                                                        event.touches[0].pageX;
                                                    _this6.controlCoordinates.swipeYStart =
                                                        event.pageY ||
                                                        event.touches[0].pageY;
                                                    return false;
                                                }
                                            );
                                            this.addEventListener(
                                                this.domNodes.image,
                                                [
                                                    'touchmove.' +
                                                        this.eventNamespace,
                                                    'mousemove.' +
                                                        this.eventNamespace,
                                                    'MSPointerMove'
                                                ],
                                                function (event) {
                                                    if (
                                                        !_this6
                                                            .controlCoordinates
                                                            .mousedown
                                                    ) {
                                                        return true;
                                                    }
                                                    if (
                                                        event.type ===
                                                        'touchmove'
                                                    ) {
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .capture ===
                                                            false
                                                        ) {
                                                            return false;
                                                        }
                                                        _this6.controlCoordinates.pointerOffsetX =
                                                            event.touches[0].clientX;
                                                        _this6.controlCoordinates.pointerOffsetY =
                                                            event.touches[0].clientY;
                                                        _this6.controlCoordinates.touchCount =
                                                            event.touches.length;
                                                        _this6
                                                            .controlCoordinates
                                                            .touchmoveCount++;
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .touchCount > 1
                                                        ) {
                                                            /* Pinch */ _this6.controlCoordinates.pointerOffsetX2 =
                                                                event.touches[1].clientX;
                                                            _this6.controlCoordinates.pointerOffsetY2 =
                                                                event.touches[1].clientY;
                                                            _this6.controlCoordinates.targetPinchDistance =
                                                                Math.sqrt(
                                                                    (_this6
                                                                        .controlCoordinates
                                                                        .pointerOffsetX -
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .pointerOffsetX2) *
                                                                        (_this6
                                                                            .controlCoordinates
                                                                            .pointerOffsetX -
                                                                            _this6
                                                                                .controlCoordinates
                                                                                .pointerOffsetX2) +
                                                                        (_this6
                                                                            .controlCoordinates
                                                                            .pointerOffsetY -
                                                                            _this6
                                                                                .controlCoordinates
                                                                                .pointerOffsetY2) *
                                                                            (_this6
                                                                                .controlCoordinates
                                                                                .pointerOffsetY -
                                                                                _this6
                                                                                    .controlCoordinates
                                                                                    .pointerOffsetY2)
                                                                );
                                                            if (
                                                                _this6
                                                                    .controlCoordinates
                                                                    .initialPinchDistance ===
                                                                null
                                                            ) {
                                                                _this6.controlCoordinates.initialPinchDistance =
                                                                    _this6.controlCoordinates.targetPinchDistance;
                                                            }
                                                            if (
                                                                Math.abs(
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .initialPinchDistance -
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .targetPinchDistance
                                                                ) >= 1
                                                            ) {
                                                                /* Initialize helpers */
                                                                _this6.controlCoordinates.targetScale =
                                                                    _this6.minMax(
                                                                        (_this6
                                                                            .controlCoordinates
                                                                            .targetPinchDistance /
                                                                            _this6
                                                                                .controlCoordinates
                                                                                .initialPinchDistance) *
                                                                            _this6
                                                                                .controlCoordinates
                                                                                .initialScale,
                                                                        1,
                                                                        _this6
                                                                            .options
                                                                            .maxZoom
                                                                    );
                                                                _this6.controlCoordinates.limitOffsetX =
                                                                    (_this6
                                                                        .controlCoordinates
                                                                        .imgWidth *
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .targetScale -
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .containerWidth) /
                                                                    2;
                                                                _this6.controlCoordinates.limitOffsetY =
                                                                    (_this6
                                                                        .controlCoordinates
                                                                        .imgHeight *
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .targetScale -
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .containerHeight) /
                                                                    2;
                                                                _this6.controlCoordinates.scaleDifference =
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetScale -
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .initialScale;
                                                                _this6.controlCoordinates.targetOffsetX =
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .imgWidth *
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .targetScale <=
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .containerWidth
                                                                        ? 0
                                                                        : _this6.minMax(
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .initialOffsetX -
                                                                                  ((_this6
                                                                                      .controlCoordinates
                                                                                      .pinchOffsetX -
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .containerOffsetX -
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .containerWidth /
                                                                                          2 -
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .initialOffsetX) /
                                                                                      (_this6
                                                                                          .controlCoordinates
                                                                                          .targetScale -
                                                                                          _this6
                                                                                              .controlCoordinates
                                                                                              .scaleDifference)) *
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .scaleDifference,
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .limitOffsetX *
                                                                                  -1,
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .limitOffsetX
                                                                          );
                                                                _this6.controlCoordinates.targetOffsetY =
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .imgHeight *
                                                                        _this6
                                                                            .controlCoordinates
                                                                            .targetScale <=
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .containerHeight
                                                                        ? 0
                                                                        : _this6.minMax(
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .initialOffsetY -
                                                                                  ((_this6
                                                                                      .controlCoordinates
                                                                                      .pinchOffsetY -
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .containerOffsetY -
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .containerHeight /
                                                                                          2 -
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .initialOffsetY) /
                                                                                      (_this6
                                                                                          .controlCoordinates
                                                                                          .targetScale -
                                                                                          _this6
                                                                                              .controlCoordinates
                                                                                              .scaleDifference)) *
                                                                                      _this6
                                                                                          .controlCoordinates
                                                                                          .scaleDifference,
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .limitOffsetY *
                                                                                  -1,
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .limitOffsetY
                                                                          );
                                                                _this6.zoomPanElement(
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetOffsetX +
                                                                        'px',
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetOffsetY +
                                                                        'px',
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetScale
                                                                );
                                                                if (
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetScale >
                                                                    1
                                                                ) {
                                                                    _this6.controlCoordinates.zoomed = true;
                                                                    if (
                                                                        (!_this6
                                                                            .domNodes
                                                                            .caption
                                                                            .style
                                                                            .opacity ||
                                                                            _this6
                                                                                .domNodes
                                                                                .caption
                                                                                .style
                                                                                .opacity >
                                                                                0) &&
                                                                        _this6
                                                                            .domNodes
                                                                            .caption
                                                                            .style
                                                                            .display !==
                                                                            'none'
                                                                    ) {
                                                                        _this6.fadeOut(
                                                                            _this6
                                                                                .domNodes
                                                                                .caption,
                                                                            _this6
                                                                                .options
                                                                                .fadeSpeed
                                                                        );
                                                                    }
                                                                }
                                                                _this6.controlCoordinates.initialPinchDistance =
                                                                    _this6.controlCoordinates.targetPinchDistance;
                                                                _this6.controlCoordinates.initialScale =
                                                                    _this6.controlCoordinates.targetScale;
                                                                _this6.controlCoordinates.initialOffsetX =
                                                                    _this6.controlCoordinates.targetOffsetX;
                                                                _this6.controlCoordinates.initialOffsetY =
                                                                    _this6.controlCoordinates.targetOffsetY;
                                                            }
                                                        } else {
                                                            _this6.controlCoordinates.targetScale =
                                                                _this6.controlCoordinates.initialScale;
                                                            _this6.controlCoordinates.limitOffsetX =
                                                                (_this6
                                                                    .controlCoordinates
                                                                    .imgWidth *
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetScale -
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .containerWidth) /
                                                                2;
                                                            _this6.controlCoordinates.limitOffsetY =
                                                                (_this6
                                                                    .controlCoordinates
                                                                    .imgHeight *
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetScale -
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .containerHeight) /
                                                                2;
                                                            _this6.controlCoordinates.targetOffsetX =
                                                                _this6
                                                                    .controlCoordinates
                                                                    .imgWidth *
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetScale <=
                                                                _this6
                                                                    .controlCoordinates
                                                                    .containerWidth
                                                                    ? 0
                                                                    : _this6.minMax(
                                                                          _this6
                                                                              .controlCoordinates
                                                                              .pointerOffsetX -
                                                                              (_this6
                                                                                  .controlCoordinates
                                                                                  .initialPointerOffsetX -
                                                                                  _this6
                                                                                      .controlCoordinates
                                                                                      .initialOffsetX),
                                                                          _this6
                                                                              .controlCoordinates
                                                                              .limitOffsetX *
                                                                              -1,
                                                                          _this6
                                                                              .controlCoordinates
                                                                              .limitOffsetX
                                                                      );
                                                            _this6.controlCoordinates.targetOffsetY =
                                                                _this6
                                                                    .controlCoordinates
                                                                    .imgHeight *
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetScale <=
                                                                _this6
                                                                    .controlCoordinates
                                                                    .containerHeight
                                                                    ? 0
                                                                    : _this6.minMax(
                                                                          _this6
                                                                              .controlCoordinates
                                                                              .pointerOffsetY -
                                                                              (_this6
                                                                                  .controlCoordinates
                                                                                  .initialPointerOffsetY -
                                                                                  _this6
                                                                                      .controlCoordinates
                                                                                      .initialOffsetY),
                                                                          _this6
                                                                              .controlCoordinates
                                                                              .limitOffsetY *
                                                                              -1,
                                                                          _this6
                                                                              .controlCoordinates
                                                                              .limitOffsetY
                                                                      );
                                                            if (
                                                                Math.abs(
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetOffsetX
                                                                ) ===
                                                                Math.abs(
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .limitOffsetX
                                                                )
                                                            ) {
                                                                _this6.controlCoordinates.initialOffsetX =
                                                                    _this6.controlCoordinates.targetOffsetX;
                                                                _this6.controlCoordinates.initialPointerOffsetX =
                                                                    _this6.controlCoordinates.pointerOffsetX;
                                                            }
                                                            if (
                                                                Math.abs(
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetOffsetY
                                                                ) ===
                                                                Math.abs(
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .limitOffsetY
                                                                )
                                                            ) {
                                                                _this6.controlCoordinates.initialOffsetY =
                                                                    _this6.controlCoordinates.targetOffsetY;
                                                                _this6.controlCoordinates.initialPointerOffsetY =
                                                                    _this6.controlCoordinates.pointerOffsetY;
                                                            }
                                                            _this6.setZoomData(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .initialScale,
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetOffsetX,
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetOffsetY
                                                            );
                                                            _this6.zoomPanElement(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetOffsetX +
                                                                    'px',
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetOffsetY +
                                                                    'px',
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale
                                                            );
                                                        }
                                                    }

                                                    /* Mouse Move implementation */
                                                    if (
                                                        event.type ===
                                                            'mousemove' &&
                                                        _this6
                                                            .controlCoordinates
                                                            .mousedown
                                                    ) {
                                                        if (
                                                            event.type ==
                                                            'touchmove'
                                                        )
                                                            return true;
                                                        event.preventDefault();
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .capture ===
                                                            false
                                                        )
                                                            return false;
                                                        _this6.controlCoordinates.pointerOffsetX =
                                                            event.clientX;
                                                        _this6.controlCoordinates.pointerOffsetY =
                                                            event.clientY;
                                                        _this6.controlCoordinates.targetScale =
                                                            _this6.controlCoordinates.initialScale;
                                                        _this6.controlCoordinates.limitOffsetX =
                                                            (_this6
                                                                .controlCoordinates
                                                                .imgWidth *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale -
                                                                _this6
                                                                    .controlCoordinates
                                                                    .containerWidth) /
                                                            2;
                                                        _this6.controlCoordinates.limitOffsetY =
                                                            (_this6
                                                                .controlCoordinates
                                                                .imgHeight *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale -
                                                                _this6
                                                                    .controlCoordinates
                                                                    .containerHeight) /
                                                            2;
                                                        _this6.controlCoordinates.targetOffsetX =
                                                            _this6
                                                                .controlCoordinates
                                                                .imgWidth *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale <=
                                                            _this6
                                                                .controlCoordinates
                                                                .containerWidth
                                                                ? 0
                                                                : _this6.minMax(
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .pointerOffsetX -
                                                                          (_this6
                                                                              .controlCoordinates
                                                                              .initialPointerOffsetX -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .initialOffsetX),
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetX *
                                                                          -1,
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetX
                                                                  );
                                                        _this6.controlCoordinates.targetOffsetY =
                                                            _this6
                                                                .controlCoordinates
                                                                .imgHeight *
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetScale <=
                                                            _this6
                                                                .controlCoordinates
                                                                .containerHeight
                                                                ? 0
                                                                : _this6.minMax(
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .pointerOffsetY -
                                                                          (_this6
                                                                              .controlCoordinates
                                                                              .initialPointerOffsetY -
                                                                              _this6
                                                                                  .controlCoordinates
                                                                                  .initialOffsetY),
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetY *
                                                                          -1,
                                                                      _this6
                                                                          .controlCoordinates
                                                                          .limitOffsetY
                                                                  );
                                                        if (
                                                            Math.abs(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetOffsetX
                                                            ) ===
                                                            Math.abs(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .limitOffsetX
                                                            )
                                                        ) {
                                                            _this6.controlCoordinates.initialOffsetX =
                                                                _this6.controlCoordinates.targetOffsetX;
                                                            _this6.controlCoordinates.initialPointerOffsetX =
                                                                _this6.controlCoordinates.pointerOffsetX;
                                                        }
                                                        if (
                                                            Math.abs(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .targetOffsetY
                                                            ) ===
                                                            Math.abs(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .limitOffsetY
                                                            )
                                                        ) {
                                                            _this6.controlCoordinates.initialOffsetY =
                                                                _this6.controlCoordinates.targetOffsetY;
                                                            _this6.controlCoordinates.initialPointerOffsetY =
                                                                _this6.controlCoordinates.pointerOffsetY;
                                                        }
                                                        _this6.setZoomData(
                                                            _this6
                                                                .controlCoordinates
                                                                .initialScale,
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetX,
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetY
                                                        );
                                                        _this6.zoomPanElement(
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetX +
                                                                'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .targetOffsetY +
                                                                'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .targetScale
                                                        );
                                                    }
                                                    if (
                                                        !_this6
                                                            .controlCoordinates
                                                            .zoomed
                                                    ) {
                                                        _this6.controlCoordinates.swipeEnd =
                                                            event.pageX ||
                                                            event.touches[0]
                                                                .pageX;
                                                        _this6.controlCoordinates.swipeYEnd =
                                                            event.pageY ||
                                                            event.touches[0]
                                                                .pageY;
                                                        _this6.controlCoordinates.swipeDiff =
                                                            _this6
                                                                .controlCoordinates
                                                                .swipeStart -
                                                            _this6
                                                                .controlCoordinates
                                                                .swipeEnd;
                                                        _this6.controlCoordinates.swipeYDiff =
                                                            _this6
                                                                .controlCoordinates
                                                                .swipeYStart -
                                                            _this6
                                                                .controlCoordinates
                                                                .swipeYEnd;
                                                        if (
                                                            _this6.options
                                                                .animationSlide
                                                        ) {
                                                            _this6.slide(
                                                                0,
                                                                -_this6
                                                                    .controlCoordinates
                                                                    .swipeDiff +
                                                                    'px'
                                                            );
                                                        }
                                                    }
                                                }
                                            );
                                            this.addEventListener(
                                                this.domNodes.image,
                                                [
                                                    'touchend.' +
                                                        this.eventNamespace,
                                                    'mouseup.' +
                                                        this.eventNamespace,
                                                    'touchcancel.' +
                                                        this.eventNamespace,
                                                    'mouseleave.' +
                                                        this.eventNamespace,
                                                    'pointerup',
                                                    'pointercancel',
                                                    'MSPointerUp',
                                                    'MSPointerCancel'
                                                ],
                                                function (event) {
                                                    if (
                                                        _this6.isTouchDevice &&
                                                        event.type ===
                                                            'touchend'
                                                    ) {
                                                        _this6.controlCoordinates.touchCount =
                                                            event.touches.length;
                                                        if (
                                                            _this6
                                                                .controlCoordinates
                                                                .touchCount ===
                                                            0
                                                        ) {
                                                            /* No touch */ /* Set attributes */
                                                            if (
                                                                _this6.currentImage
                                                            ) {
                                                                _this6.setZoomData(
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .initialScale,
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetOffsetX,
                                                                    _this6
                                                                        .controlCoordinates
                                                                        .targetOffsetY
                                                                );
                                                            }
                                                            if (
                                                                _this6
                                                                    .controlCoordinates
                                                                    .initialScale ===
                                                                1
                                                            ) {
                                                                _this6.controlCoordinates.zoomed = false;
                                                                if (
                                                                    _this6
                                                                        .domNodes
                                                                        .caption
                                                                        .style
                                                                        .display ===
                                                                    'none'
                                                                ) {
                                                                    _this6.fadeIn(
                                                                        _this6
                                                                            .domNodes
                                                                            .caption,
                                                                        _this6
                                                                            .options
                                                                            .fadeSpeed
                                                                    );
                                                                }
                                                            }
                                                            _this6.controlCoordinates.initialPinchDistance =
                                                                null;
                                                            _this6.controlCoordinates.capture = false;
                                                        } else if (
                                                            _this6
                                                                .controlCoordinates
                                                                .touchCount ===
                                                            1
                                                        ) {
                                                            /* Single touch */ _this6.controlCoordinates.initialPointerOffsetX =
                                                                event.touches[0].clientX;
                                                            _this6.controlCoordinates.initialPointerOffsetY =
                                                                event.touches[0].clientY;
                                                        } else if (
                                                            _this6
                                                                .controlCoordinates
                                                                .touchCount > 1
                                                        ) {
                                                            /* Pinch */ _this6.controlCoordinates.initialPinchDistance =
                                                                null;
                                                        }
                                                    }
                                                    if (
                                                        _this6
                                                            .controlCoordinates
                                                            .mousedown
                                                    ) {
                                                        _this6.controlCoordinates.mousedown = false;
                                                        var possibleDir = true;
                                                        if (
                                                            !_this6.options.loop
                                                        ) {
                                                            if (
                                                                _this6.currentImageIndex ===
                                                                    0 &&
                                                                _this6
                                                                    .controlCoordinates
                                                                    .swipeDiff <
                                                                    0
                                                            ) {
                                                                possibleDir = false;
                                                            }
                                                            if (
                                                                _this6.currentImageIndex >=
                                                                    _this6
                                                                        .relatedElements
                                                                        .length -
                                                                        1 &&
                                                                _this6
                                                                    .controlCoordinates
                                                                    .swipeDiff >
                                                                    0
                                                            ) {
                                                                possibleDir = false;
                                                            }
                                                        }
                                                        if (
                                                            Math.abs(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .swipeDiff
                                                            ) >
                                                                _this6.options
                                                                    .swipeTolerance &&
                                                            possibleDir
                                                        ) {
                                                            _this6.loadImage(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .swipeDiff >
                                                                    0
                                                                    ? 1
                                                                    : -1
                                                            );
                                                        } else if (
                                                            _this6.options
                                                                .animationSlide
                                                        ) {
                                                            _this6.slide(
                                                                _this6.options
                                                                    .animationSpeed /
                                                                    1000,
                                                                0 + 'px'
                                                            );
                                                        }
                                                        if (
                                                            _this6.options
                                                                .swipeClose &&
                                                            Math.abs(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .swipeYDiff
                                                            ) > 50 &&
                                                            Math.abs(
                                                                _this6
                                                                    .controlCoordinates
                                                                    .swipeDiff
                                                            ) <
                                                                _this6.options
                                                                    .swipeTolerance
                                                        ) {
                                                            _this6.close();
                                                        }
                                                    }
                                                }
                                            );
                                            this.addEventListener(
                                                this.domNodes.image,
                                                ['dblclick'],
                                                function (event) {
                                                    if (_this6.isTouchDevice)
                                                        return;
                                                    _this6.controlCoordinates.initialPointerOffsetX =
                                                        event.clientX;
                                                    _this6.controlCoordinates.initialPointerOffsetY =
                                                        event.clientY;
                                                    _this6.controlCoordinates.containerHeight =
                                                        _this6.getDimensions(
                                                            _this6.domNodes
                                                                .image
                                                        ).height;
                                                    _this6.controlCoordinates.containerWidth =
                                                        _this6.getDimensions(
                                                            _this6.domNodes
                                                                .image
                                                        ).width;
                                                    _this6.controlCoordinates.imgHeight =
                                                        _this6.getDimensions(
                                                            _this6.currentImage
                                                        ).height;
                                                    _this6.controlCoordinates.imgWidth =
                                                        _this6.getDimensions(
                                                            _this6.currentImage
                                                        ).width;
                                                    _this6.controlCoordinates.containerOffsetX =
                                                        _this6.domNodes.image.offsetLeft;
                                                    _this6.controlCoordinates.containerOffsetY =
                                                        _this6.domNodes.image.offsetTop;
                                                    _this6.currentImage.classList.add(
                                                        'sl-transition'
                                                    );
                                                    if (
                                                        !_this6
                                                            .controlCoordinates
                                                            .zoomed
                                                    ) {
                                                        _this6.controlCoordinates.initialScale =
                                                            _this6.options.doubleTapZoom;
                                                        _this6.setZoomData(
                                                            _this6
                                                                .controlCoordinates
                                                                .initialScale,
                                                            0,
                                                            0
                                                        );
                                                        _this6.zoomPanElement(
                                                            0 + 'px',
                                                            0 + 'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .initialScale
                                                        );
                                                        if (
                                                            (!_this6.domNodes
                                                                .caption.style
                                                                .opacity ||
                                                                _this6.domNodes
                                                                    .caption
                                                                    .style
                                                                    .opacity >
                                                                    0) &&
                                                            _this6.domNodes
                                                                .caption.style
                                                                .display !==
                                                                'none'
                                                        ) {
                                                            _this6.fadeOut(
                                                                _this6.domNodes
                                                                    .caption,
                                                                _this6.options
                                                                    .fadeSpeed
                                                            );
                                                        }
                                                        _this6.controlCoordinates.zoomed = true;
                                                    } else {
                                                        _this6.controlCoordinates.initialScale = 1;
                                                        _this6.setZoomData(
                                                            _this6
                                                                .controlCoordinates
                                                                .initialScale,
                                                            0,
                                                            0
                                                        );
                                                        _this6.zoomPanElement(
                                                            0 + 'px',
                                                            0 + 'px',
                                                            _this6
                                                                .controlCoordinates
                                                                .initialScale
                                                        );
                                                        _this6.controlCoordinates.zoomed = false;
                                                        if (
                                                            _this6.domNodes
                                                                .caption.style
                                                                .display ===
                                                            'none'
                                                        ) {
                                                            _this6.fadeIn(
                                                                _this6.domNodes
                                                                    .caption,
                                                                _this6.options
                                                                    .fadeSpeed
                                                            );
                                                        }
                                                    }
                                                    setTimeout(function () {
                                                        if (
                                                            _this6.currentImage
                                                        ) {
                                                            _this6.currentImage.classList.remove(
                                                                'sl-transition'
                                                            );
                                                            _this6.currentImage.style[
                                                                _this6.transitionPrefix +
                                                                    'transform-origin'
                                                            ] = null;
                                                        }
                                                    }, 200);
                                                    _this6.controlCoordinates.capture = true;
                                                    return false;
                                                }
                                            );
                                        }
                                    },
                                    {
                                        key: 'getDimensions',
                                        value: function getDimensions(element) {
                                            var styles =
                                                    window.getComputedStyle(
                                                        element
                                                    ),
                                                height = element.offsetHeight,
                                                width = element.offsetWidth,
                                                borderTopWidth = parseFloat(
                                                    styles.borderTopWidth
                                                ),
                                                borderBottomWidth = parseFloat(
                                                    styles.borderBottomWidth
                                                ),
                                                paddingTop = parseFloat(
                                                    styles.paddingTop
                                                ),
                                                paddingBottom = parseFloat(
                                                    styles.paddingBottom
                                                ),
                                                borderLeftWidth = parseFloat(
                                                    styles.borderLeftWidth
                                                ),
                                                borderRightWidth = parseFloat(
                                                    styles.borderRightWidth
                                                ),
                                                paddingLeft = parseFloat(
                                                    styles.paddingLeft
                                                ),
                                                paddingRight = parseFloat(
                                                    styles.paddingRight
                                                );
                                            return {
                                                height:
                                                    height -
                                                    borderBottomWidth -
                                                    borderTopWidth -
                                                    paddingTop -
                                                    paddingBottom,
                                                width:
                                                    width -
                                                    borderLeftWidth -
                                                    borderRightWidth -
                                                    paddingLeft -
                                                    paddingRight
                                            };
                                        }
                                    },
                                    {
                                        key: 'updateHash',
                                        value: function updateHash() {
                                            var newHash =
                                                    'pid=' +
                                                    (this.currentImageIndex +
                                                        1),
                                                newURL =
                                                    window.location.href.split(
                                                        '#'
                                                    )[0] +
                                                    '#' +
                                                    newHash;
                                            this.hashReseted = false;
                                            if (this.pushStateSupport) {
                                                window.history[
                                                    this.historyHasChanges
                                                        ? 'replaceState'
                                                        : 'pushState'
                                                ]('', document.title, newURL);
                                            } else {
                                                // what is the browser target of this?
                                                if (this.historyHasChanges) {
                                                    window.location.replace(
                                                        newURL
                                                    );
                                                } else {
                                                    window.location.hash =
                                                        newHash;
                                                }
                                            }
                                            if (!this.historyHasChanges) {
                                                this.urlChangedOnce = true;
                                            }
                                            this.historyHasChanges = true;
                                        }
                                    },
                                    {
                                        key: 'resetHash',
                                        value: function resetHash() {
                                            this.hashReseted = true;
                                            if (this.urlChangedOnce) {
                                                history.back();
                                            } else {
                                                if (this.pushStateSupport) {
                                                    history.pushState(
                                                        '',
                                                        document.title,
                                                        window.location
                                                            .pathname +
                                                            window.location
                                                                .search
                                                    );
                                                } else {
                                                    window.location.hash = '';
                                                }
                                            }
                                            //
                                            //in case an history operation is still pending
                                            clearTimeout(
                                                this.historyUpdateTimeout
                                            );
                                        }
                                    },
                                    {
                                        key: 'updateURL',
                                        value: function updateURL() {
                                            clearTimeout(
                                                this.historyUpdateTimeout
                                            );
                                            if (!this.historyHasChanges) {
                                                this.updateHash(); // first time
                                            } else {
                                                this.historyUpdateTimeout =
                                                    setTimeout(
                                                        this.updateHash.bind(
                                                            this
                                                        ),
                                                        800
                                                    );
                                            }
                                        }
                                    },
                                    {
                                        key: 'setCaption',
                                        value: function setCaption(
                                            captionText,
                                            imageWidth,
                                            allowHTML
                                        ) {
                                            var _this7 = this;
                                            if (
                                                this.options.captions &&
                                                captionText &&
                                                captionText !== '' &&
                                                typeof captionText !==
                                                    'undefined'
                                            ) {
                                                var _ref;
                                                var property = (
                                                    (_ref =
                                                        allowHTML !== null &&
                                                        allowHTML !== void 0
                                                            ? allowHTML
                                                            : this.options
                                                                  .captionHTML) !==
                                                        null && _ref !== void 0
                                                        ? _ref
                                                        : true
                                                )
                                                    ? 'innerHTML'
                                                    : 'innerText';
                                                this.hide(
                                                    this.domNodes.caption
                                                );
                                                this.domNodes.caption.style.width =
                                                    imageWidth + 'px';
                                                this.domNodes.caption[
                                                    property
                                                ] = captionText;
                                                this.domNodes.image.appendChild(
                                                    this.domNodes.caption
                                                );
                                                setTimeout(function () {
                                                    _this7.fadeIn(
                                                        _this7.domNodes.caption,
                                                        _this7.options.fadeSpeed
                                                    );
                                                }, this.options.captionDelay);
                                            }
                                        }
                                    },
                                    {
                                        key: 'slide',
                                        value: function slide(speed, pos) {
                                            if (!this.transitionCapable) {
                                                return (this.domNodes.image.style.left =
                                                    pos);
                                            }
                                            this.domNodes.image.style[
                                                this.transitionPrefix +
                                                    'transform'
                                            ] = 'translateX(' + pos + ')';
                                            this.domNodes.image.style[
                                                this.transitionPrefix +
                                                    'transition'
                                            ] =
                                                this.transitionPrefix +
                                                'transform ' +
                                                speed +
                                                's linear';
                                        }
                                    },
                                    {
                                        key: 'getRelated',
                                        value: function getRelated(rel) {
                                            var elems;
                                            if (
                                                rel &&
                                                rel !== false &&
                                                rel !== 'nofollow'
                                            ) {
                                                elems = Array.from(
                                                    this.elements
                                                ).filter(function (element) {
                                                    return (
                                                        element.getAttribute(
                                                            'rel'
                                                        ) === rel
                                                    );
                                                });
                                            } else {
                                                elems = this.elements;
                                            }
                                            return elems;
                                        }
                                    },
                                    {
                                        key: 'openImage',
                                        value: function openImage(element) {
                                            var _this8 = this;
                                            element.dispatchEvent(
                                                new Event(
                                                    'show.' +
                                                        this.eventNamespace
                                                )
                                            );
                                            this.globalScrollbarWidth =
                                                this.getScrollbarWidth();
                                            if (this.options.disableScroll) {
                                                this.toggleScrollbar('hide');
                                                this.globalScrollbarWidth = 0;
                                            }
                                            if (
                                                this.options.htmlClass &&
                                                this.options.htmlClass !== ''
                                            ) {
                                                document
                                                    .querySelector('html')
                                                    .classList.add(
                                                        this.options.htmlClass
                                                    );
                                            }
                                            document.body.appendChild(
                                                this.domNodes.wrapper
                                            );
                                            this.domNodes.wrapper.appendChild(
                                                this.domNodes.image
                                            );
                                            if (this.options.overlay) {
                                                document.body.appendChild(
                                                    this.domNodes.overlay
                                                );
                                            }
                                            this.relatedElements =
                                                this.getRelated(element.rel);
                                            if (this.options.showCounter) {
                                                if (
                                                    this.relatedElements
                                                        .length == 1 &&
                                                    this.domNodes.wrapper.contains(
                                                        this.domNodes.counter
                                                    )
                                                ) {
                                                    this.domNodes.wrapper.removeChild(
                                                        this.domNodes.counter
                                                    );
                                                } else if (
                                                    this.relatedElements
                                                        .length > 1 &&
                                                    !this.domNodes.wrapper.contains(
                                                        this.domNodes.counter
                                                    )
                                                ) {
                                                    this.domNodes.wrapper.appendChild(
                                                        this.domNodes.counter
                                                    );
                                                }
                                            }
                                            if (
                                                this.options.download &&
                                                this.domNodes.download
                                            ) {
                                                this.domNodes.wrapper.appendChild(
                                                    this.domNodes.download
                                                );
                                            }
                                            this.isAnimating = true;
                                            this.currentImageIndex =
                                                this.relatedElements.indexOf(
                                                    element
                                                );
                                            var targetURL =
                                                element.getAttribute(
                                                    this.options.sourceAttr
                                                );
                                            this.currentImage =
                                                document.createElement('img');
                                            this.currentImage.style.display =
                                                'none';
                                            this.currentImage.setAttribute(
                                                'src',
                                                targetURL
                                            );
                                            this.currentImage.dataset.scale = 1;
                                            this.currentImage.dataset.translateX = 0;
                                            this.currentImage.dataset.translateY = 0;
                                            if (
                                                this.loadedImages.indexOf(
                                                    targetURL
                                                ) === -1
                                            ) {
                                                this.loadedImages.push(
                                                    targetURL
                                                );
                                            }
                                            this.domNodes.image.innerHTML = '';
                                            this.domNodes.image.setAttribute(
                                                'style',
                                                ''
                                            );
                                            this.domNodes.image.appendChild(
                                                this.currentImage
                                            );
                                            this.fadeIn(
                                                this.domNodes.overlay,
                                                this.options.fadeSpeed
                                            );
                                            this.fadeIn(
                                                [
                                                    this.domNodes.counter,
                                                    this.domNodes.navigation,
                                                    this.domNodes.closeButton,
                                                    this.domNodes.download
                                                ],
                                                this.options.fadeSpeed
                                            );
                                            this.show(this.domNodes.spinner);
                                            this.domNodes.counter.querySelector(
                                                '.sl-current'
                                            ).innerHTML =
                                                this.currentImageIndex + 1;
                                            this.domNodes.counter.querySelector(
                                                '.sl-total'
                                            ).innerHTML =
                                                this.relatedElements.length;
                                            this.adjustImage();
                                            if (this.options.preloading) {
                                                this.preload();
                                            }
                                            setTimeout(function () {
                                                element.dispatchEvent(
                                                    new Event(
                                                        'shown.' +
                                                            _this8.eventNamespace
                                                    )
                                                );
                                            }, this.options.animationSpeed);
                                        }
                                    },
                                    {
                                        key: 'forceFocus',
                                        value: function forceFocus() {
                                            var _this9 = this;
                                            this.removeEventListener(
                                                document,
                                                'focusin.' + this.eventNamespace
                                            );
                                            this.addEventListener(
                                                document,
                                                'focusin.' +
                                                    this.eventNamespace,
                                                function (event) {
                                                    if (
                                                        document !==
                                                            event.target &&
                                                        _this9.domNodes
                                                            .wrapper !==
                                                            event.target &&
                                                        !_this9.domNodes.wrapper.contains(
                                                            event.target
                                                        )
                                                    ) {
                                                        _this9.domNodes.wrapper.focus();
                                                    }
                                                }
                                            );
                                        }

                                        // utility
                                    },
                                    {
                                        key: 'addEventListener',
                                        value: function addEventListener(
                                            elements,
                                            events,
                                            callback,
                                            opts
                                        ) {
                                            elements = this.wrap(elements);
                                            events = this.wrap(events);
                                            var _iterator =
                                                    _createForOfIteratorHelper(
                                                        elements
                                                    ),
                                                _step;
                                            try {
                                                for (
                                                    _iterator.s();
                                                    !(_step = _iterator.n())
                                                        .done;

                                                ) {
                                                    var element = _step.value;
                                                    if (!element.namespaces) {
                                                        element.namespaces = {};
                                                    } // save the namespaces addEventListener the DOM element itself
                                                    var _iterator2 =
                                                            _createForOfIteratorHelper(
                                                                events
                                                            ),
                                                        _step2;
                                                    try {
                                                        for (
                                                            _iterator2.s();
                                                            !(_step2 =
                                                                _iterator2.n())
                                                                .done;

                                                        ) {
                                                            var event =
                                                                _step2.value;
                                                            var options =
                                                                opts || false;
                                                            var needsPassiveFix =
                                                                [
                                                                    'touchstart',
                                                                    'touchmove',
                                                                    'mousewheel',
                                                                    'DOMMouseScroll'
                                                                ].indexOf(
                                                                    event.split(
                                                                        '.'
                                                                    )[0]
                                                                ) >= 0;
                                                            if (
                                                                needsPassiveFix &&
                                                                this
                                                                    .isPassiveEventsSupported
                                                            ) {
                                                                if (
                                                                    _typeof(
                                                                        options
                                                                    ) ===
                                                                    'object'
                                                                ) {
                                                                    options.passive = true;
                                                                } else {
                                                                    options = {
                                                                        passive: true
                                                                    };
                                                                }
                                                            }
                                                            element.namespaces[
                                                                event
                                                            ] = callback;
                                                            element.addEventListener(
                                                                event.split(
                                                                    '.'
                                                                )[0],
                                                                callback,
                                                                options
                                                            );
                                                        }
                                                    } catch (err) {
                                                        _iterator2.e(err);
                                                    } finally {
                                                        _iterator2.f();
                                                    }
                                                }
                                            } catch (err) {
                                                _iterator.e(err);
                                            } finally {
                                                _iterator.f();
                                            }
                                        }
                                    },
                                    {
                                        key: 'removeEventListener',
                                        value: function removeEventListener(
                                            elements,
                                            events
                                        ) {
                                            elements = this.wrap(elements);
                                            events = this.wrap(events);
                                            var _iterator3 =
                                                    _createForOfIteratorHelper(
                                                        elements
                                                    ),
                                                _step3;
                                            try {
                                                for (
                                                    _iterator3.s();
                                                    !(_step3 = _iterator3.n())
                                                        .done;

                                                ) {
                                                    var element = _step3.value;
                                                    var _iterator4 =
                                                            _createForOfIteratorHelper(
                                                                events
                                                            ),
                                                        _step4;
                                                    try {
                                                        for (
                                                            _iterator4.s();
                                                            !(_step4 =
                                                                _iterator4.n())
                                                                .done;

                                                        ) {
                                                            var event =
                                                                _step4.value;
                                                            if (
                                                                element.namespaces &&
                                                                element
                                                                    .namespaces[
                                                                    event
                                                                ]
                                                            ) {
                                                                element.removeEventListener(
                                                                    event.split(
                                                                        '.'
                                                                    )[0],
                                                                    element
                                                                        .namespaces[
                                                                        event
                                                                    ]
                                                                );
                                                                delete element
                                                                    .namespaces[
                                                                    event
                                                                ];
                                                            }
                                                        }
                                                    } catch (err) {
                                                        _iterator4.e(err);
                                                    } finally {
                                                        _iterator4.f();
                                                    }
                                                }
                                            } catch (err) {
                                                _iterator3.e(err);
                                            } finally {
                                                _iterator3.f();
                                            }
                                        }
                                    },
                                    {
                                        key: 'fadeOut',
                                        value: function fadeOut(
                                            elements,
                                            duration,
                                            callback
                                        ) {
                                            var _this10 = this;
                                            elements = this.wrap(elements);
                                            var _iterator5 =
                                                    _createForOfIteratorHelper(
                                                        elements
                                                    ),
                                                _step5;
                                            try {
                                                for (
                                                    _iterator5.s();
                                                    !(_step5 = _iterator5.n())
                                                        .done;

                                                ) {
                                                    var element = _step5.value;
                                                    element.style.opacity =
                                                        parseFloat(element) ||
                                                        window
                                                            .getComputedStyle(
                                                                element
                                                            )
                                                            .getPropertyValue(
                                                                'opacity'
                                                            );
                                                }
                                            } catch (err) {
                                                _iterator5.e(err);
                                            } finally {
                                                _iterator5.f();
                                            }
                                            this.isFadeIn = false;
                                            var step =
                                                    16.66666 /
                                                    (duration ||
                                                        this.options.fadeSpeed),
                                                fade = function fade() {
                                                    var currentOpacity =
                                                        parseFloat(
                                                            elements[0].style
                                                                .opacity
                                                        );
                                                    if (
                                                        (currentOpacity -=
                                                            step) < 0
                                                    ) {
                                                        var _iterator6 =
                                                                _createForOfIteratorHelper(
                                                                    elements
                                                                ),
                                                            _step6;
                                                        try {
                                                            for (
                                                                _iterator6.s();
                                                                !(_step6 =
                                                                    _iterator6.n())
                                                                    .done;

                                                            ) {
                                                                var element =
                                                                    _step6.value;
                                                                element.style.display =
                                                                    'none';
                                                                // element.style.opacity = '';
                                                                element.style.opacity = 1;
                                                            }
                                                        } catch (err) {
                                                            _iterator6.e(err);
                                                        } finally {
                                                            _iterator6.f();
                                                        }
                                                        callback &&
                                                            callback.call(
                                                                _this10,
                                                                elements
                                                            );
                                                    } else {
                                                        var _iterator7 =
                                                                _createForOfIteratorHelper(
                                                                    elements
                                                                ),
                                                            _step7;
                                                        try {
                                                            for (
                                                                _iterator7.s();
                                                                !(_step7 =
                                                                    _iterator7.n())
                                                                    .done;

                                                            ) {
                                                                var _element =
                                                                    _step7.value;
                                                                _element.style.opacity =
                                                                    currentOpacity;
                                                            }
                                                        } catch (err) {
                                                            _iterator7.e(err);
                                                        } finally {
                                                            _iterator7.f();
                                                        }
                                                        requestAnimationFrame(
                                                            fade
                                                        );
                                                    }
                                                };
                                            fade();
                                        }
                                    },
                                    {
                                        key: 'fadeIn',
                                        value: function fadeIn(
                                            elements,
                                            duration,
                                            callback,
                                            display
                                        ) {
                                            var _this11 = this;
                                            elements = this.wrap(elements);
                                            var _iterator8 =
                                                    _createForOfIteratorHelper(
                                                        elements
                                                    ),
                                                _step8;
                                            try {
                                                for (
                                                    _iterator8.s();
                                                    !(_step8 = _iterator8.n())
                                                        .done;

                                                ) {
                                                    var element = _step8.value;
                                                    if (element) {
                                                        element.style.opacity = 0;
                                                        element.style.display =
                                                            display || 'block';
                                                    }
                                                }
                                            } catch (err) {
                                                _iterator8.e(err);
                                            } finally {
                                                _iterator8.f();
                                            }
                                            this.isFadeIn = true;
                                            var opacityTarget = parseFloat(
                                                    elements[0].dataset
                                                        .opacityTarget || 1
                                                ),
                                                step =
                                                    (16.66666 * opacityTarget) /
                                                    (duration ||
                                                        this.options.fadeSpeed),
                                                fade = function fade() {
                                                    var currentOpacity =
                                                        parseFloat(
                                                            elements[0].style
                                                                .opacity
                                                        );
                                                    if (
                                                        !(
                                                            (currentOpacity +=
                                                                step) >
                                                            opacityTarget
                                                        )
                                                    ) {
                                                        var _iterator9 =
                                                                _createForOfIteratorHelper(
                                                                    elements
                                                                ),
                                                            _step9;
                                                        try {
                                                            for (
                                                                _iterator9.s();
                                                                !(_step9 =
                                                                    _iterator9.n())
                                                                    .done;

                                                            ) {
                                                                var element =
                                                                    _step9.value;
                                                                if (element) {
                                                                    element.style.opacity =
                                                                        currentOpacity;
                                                                }
                                                            }
                                                        } catch (err) {
                                                            _iterator9.e(err);
                                                        } finally {
                                                            _iterator9.f();
                                                        }
                                                        if (!_this11.isFadeIn)
                                                            return;
                                                        requestAnimationFrame(
                                                            fade
                                                        );
                                                    } else {
                                                        var _iterator10 =
                                                                _createForOfIteratorHelper(
                                                                    elements
                                                                ),
                                                            _step10;
                                                        try {
                                                            for (
                                                                _iterator10.s();
                                                                !(_step10 =
                                                                    _iterator10.n())
                                                                    .done;

                                                            ) {
                                                                var _element2 =
                                                                    _step10.value;
                                                                if (_element2) {
                                                                    _element2.style.opacity =
                                                                        opacityTarget;
                                                                }
                                                            }
                                                        } catch (err) {
                                                            _iterator10.e(err);
                                                        } finally {
                                                            _iterator10.f();
                                                        }
                                                        callback &&
                                                            callback.call(
                                                                _this11,
                                                                elements
                                                            );
                                                    }
                                                };
                                            fade();
                                        }
                                    },
                                    {
                                        key: 'hide',
                                        value: function hide(elements) {
                                            elements = this.wrap(elements);
                                            var _iterator11 =
                                                    _createForOfIteratorHelper(
                                                        elements
                                                    ),
                                                _step11;
                                            try {
                                                for (
                                                    _iterator11.s();
                                                    !(_step11 = _iterator11.n())
                                                        .done;

                                                ) {
                                                    var element = _step11.value;
                                                    if (
                                                        element.style.display !=
                                                        'none'
                                                    ) {
                                                        element.dataset.initialDisplay =
                                                            element.style.display;
                                                    }
                                                    element.style.display =
                                                        'none';
                                                }
                                            } catch (err) {
                                                _iterator11.e(err);
                                            } finally {
                                                _iterator11.f();
                                            }
                                        }
                                    },
                                    {
                                        key: 'show',
                                        value: function show(
                                            elements,
                                            display
                                        ) {
                                            elements = this.wrap(elements);
                                            var _iterator12 =
                                                    _createForOfIteratorHelper(
                                                        elements
                                                    ),
                                                _step12;
                                            try {
                                                for (
                                                    _iterator12.s();
                                                    !(_step12 = _iterator12.n())
                                                        .done;

                                                ) {
                                                    var element = _step12.value;
                                                    element.style.display =
                                                        element.dataset
                                                            .initialDisplay ||
                                                        display ||
                                                        'block';
                                                }
                                            } catch (err) {
                                                _iterator12.e(err);
                                            } finally {
                                                _iterator12.f();
                                            }
                                        }
                                    },
                                    {
                                        key: 'wrap',
                                        value: function wrap(input) {
                                            return typeof input[
                                                Symbol.iterator
                                            ] === 'function' &&
                                                typeof input !== 'string'
                                                ? input
                                                : [input];
                                        }
                                    },
                                    {
                                        key: 'on',
                                        value: function on(events, callback) {
                                            events = this.wrap(events);
                                            var _iterator13 =
                                                    _createForOfIteratorHelper(
                                                        this.elements
                                                    ),
                                                _step13;
                                            try {
                                                for (
                                                    _iterator13.s();
                                                    !(_step13 = _iterator13.n())
                                                        .done;

                                                ) {
                                                    var element = _step13.value;
                                                    if (
                                                        !element.fullyNamespacedEvents
                                                    ) {
                                                        element.fullyNamespacedEvents =
                                                            {};
                                                    }
                                                    var _iterator14 =
                                                            _createForOfIteratorHelper(
                                                                events
                                                            ),
                                                        _step14;
                                                    try {
                                                        for (
                                                            _iterator14.s();
                                                            !(_step14 =
                                                                _iterator14.n())
                                                                .done;

                                                        ) {
                                                            var event =
                                                                _step14.value;
                                                            element.fullyNamespacedEvents[
                                                                event
                                                            ] = callback;
                                                            element.addEventListener(
                                                                event,
                                                                callback
                                                            );
                                                        }
                                                    } catch (err) {
                                                        _iterator14.e(err);
                                                    } finally {
                                                        _iterator14.f();
                                                    }
                                                }
                                            } catch (err) {
                                                _iterator13.e(err);
                                            } finally {
                                                _iterator13.f();
                                            }
                                            return this;
                                        }
                                    },
                                    {
                                        key: 'off',
                                        value: function off(events) {
                                            events = this.wrap(events);
                                            var _iterator15 =
                                                    _createForOfIteratorHelper(
                                                        this.elements
                                                    ),
                                                _step15;
                                            try {
                                                for (
                                                    _iterator15.s();
                                                    !(_step15 = _iterator15.n())
                                                        .done;

                                                ) {
                                                    var element = _step15.value;
                                                    var _iterator16 =
                                                            _createForOfIteratorHelper(
                                                                events
                                                            ),
                                                        _step16;
                                                    try {
                                                        for (
                                                            _iterator16.s();
                                                            !(_step16 =
                                                                _iterator16.n())
                                                                .done;

                                                        ) {
                                                            var event =
                                                                _step16.value;
                                                            if (
                                                                typeof element.fullyNamespacedEvents !==
                                                                    'undefined' &&
                                                                event in
                                                                    element.fullyNamespacedEvents
                                                            ) {
                                                                element.removeEventListener(
                                                                    event,
                                                                    element
                                                                        .fullyNamespacedEvents[
                                                                        event
                                                                    ]
                                                                );
                                                            }
                                                        }
                                                    } catch (err) {
                                                        _iterator16.e(err);
                                                    } finally {
                                                        _iterator16.f();
                                                    }
                                                }
                                            } catch (err) {
                                                _iterator15.e(err);
                                            } finally {
                                                _iterator15.f();
                                            }
                                            return this;
                                        }

                                        // api
                                    },
                                    {
                                        key: 'open',
                                        value: function open(elem) {
                                            var position =
                                                arguments.length > 1 &&
                                                arguments[1] !== undefined
                                                    ? arguments[1]
                                                    : 0;
                                            elem = elem || this.elements[0];
                                            if (
                                                typeof jQuery !== 'undefined' &&
                                                elem instanceof jQuery
                                            ) {
                                                elem = elem.get(0);
                                            }
                                            if (position > 0) {
                                                elem = this.elements[position];
                                            }
                                            this.initialImageIndex =
                                                this.elements.indexOf(elem);
                                            if (this.initialImageIndex > -1) {
                                                this.openImage(elem);
                                            }
                                        }
                                    },
                                    {
                                        key: 'openPosition',
                                        value: function openPosition(position) {
                                            var elem = this.elements[position];
                                            this.open(elem, position);
                                        }
                                    },
                                    {
                                        key: 'next',
                                        value: function next() {
                                            this.loadImage(1);
                                        }
                                    },
                                    {
                                        key: 'prev',
                                        value: function prev() {
                                            this.loadImage(-1);
                                        }

                                        // get some useful data
                                    },
                                    {
                                        key: 'getLighboxData',
                                        value: function getLighboxData() {
                                            return {
                                                currentImageIndex:
                                                    this.currentImageIndex,
                                                currentImage: this.currentImage,
                                                globalScrollbarWidth:
                                                    this.globalScrollbarWidth
                                            };
                                        }

                                        //close is exposed anyways..
                                    },
                                    {
                                        key: 'destroy',
                                        value: function destroy() {
                                            //remove all custom event listeners from elements
                                            this.off([
                                                'close.' + this.eventNamespace,
                                                'closed.' + this.eventNamespace,
                                                'nextImageLoaded.' +
                                                    this.eventNamespace,
                                                'prevImageLoaded.' +
                                                    this.eventNamespace,
                                                'change.' + this.eventNamespace,
                                                'nextDone.' +
                                                    this.eventNamespace,
                                                'prevDone.' +
                                                    this.eventNamespace,
                                                'error.' + this.eventNamespace,
                                                'changed.' +
                                                    this.eventNamespace,
                                                'next.' + this.eventNamespace,
                                                'prev.' + this.eventNamespace,
                                                'show.' + this.eventNamespace,
                                                'shown.' + this.eventNamespace
                                            ]);
                                            this.removeEventListener(
                                                this.elements,
                                                'click.' + this.eventNamespace
                                            );
                                            this.removeEventListener(
                                                document,
                                                'focusin.' + this.eventNamespace
                                            );
                                            this.removeEventListener(
                                                document.body,
                                                'contextmenu.' +
                                                    this.eventNamespace
                                            );
                                            this.removeEventListener(
                                                document.body,
                                                'keyup.' + this.eventNamespace
                                            );
                                            this.removeEventListener(
                                                this.domNodes.navigation.getElementsByTagName(
                                                    'button'
                                                ),
                                                'click.' + this.eventNamespace
                                            );
                                            this.removeEventListener(
                                                this.domNodes.closeButton,
                                                'click.' + this.eventNamespace
                                            );
                                            this.removeEventListener(
                                                window,
                                                'resize.' + this.eventNamespace
                                            );
                                            this.removeEventListener(
                                                window,
                                                'hashchange.' +
                                                    this.eventNamespace
                                            );
                                            this.close();
                                            if (this.isOpen) {
                                                document.body.removeChild(
                                                    this.domNodes.wrapper
                                                );
                                                document.body.removeChild(
                                                    this.domNodes.overlay
                                                );
                                            }
                                            this.elements = null;
                                        }
                                    },
                                    {
                                        key: 'refresh',
                                        value: function refresh() {
                                            if (!this.initialSelector) {
                                                throw 'refreshing only works when you initialize using a selector!';
                                            }
                                            var options = this.options,
                                                selector = this.initialSelector;
                                            this.destroy();
                                            this.constructor(selector, options);
                                            return this;
                                        }
                                    }
                                ]);
                                return SimpleLightbox;
                            })();
                            var _default = SimpleLightbox;
                            exports['default'] = _default;
                            global.SimpleLightbox = SimpleLightbox;
                        }).call(this);
                    }).call(
                        this,
                        typeof global !== 'undefined'
                            ? global
                            : typeof self !== 'undefined'
                            ? self
                            : typeof window !== 'undefined'
                            ? window
                            : {}
                    );
                },
                {}
            ]
        },
        {},
        [1]
    );
    /* eslint-enable */

    /* eslint-disable no-nested-ternary, no-undef */
    result = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : window;
    /* eslint-enable no-nested-ternary, no-undef */

    return result.SimpleLightbox;
});


// This is a modified version of the zoom library within SC
define('jQuery.lightboxZoom', [
    'jQuery'
], function lightboxZoomModule(
    jQuery
) {
    /* eslint-disable no-mixed-operators, no-param-reassign */

    function transformCoordinate(coordinate, offset, size) {
        return ((coordinate - offset) / size) * 100;
    }

    jQuery.fn.lightboxZoom = function lightboxZoom(url, slideIndex) {
        var $div;
        var $img;

        slideIndex = slideIndex || 0;

        // Changed the selector to avoid wierd behavior with bxSlider
        $div = jQuery('[data-zoom]:not(.bx-clone)');

        // Changed from direct children to any image inside the container
        // needed because lightbox uses a different markup and images are not the direct
        // child of the container
        $img = jQuery($div.find('img')[slideIndex]);

        if ($img) {
            $div
            .css({ position: 'relative', overflow: 'hidden' });

            // Added this validation as the video thumbnail shouldn't have zoom
            if (!$img.data('skip-zoom')) {
                $div
                .on('mouseover', function mouseover() {
                    $img.css({
                        transform: 'scale(2.3)'
                    });
                })
                .on('mouseout', function mouseout() {
                    $img.css({
                        transform: 'scale(1)'
                    });
                })
                .on('mousemove', function mousemove(e) {
                    $img.css({
                        'transform-origin':
                        transformCoordinate(e.pageX, $div.offset().left, $div.width()) -
                        slideIndex * 100 +
                        '% ' +
                        transformCoordinate(e.pageY, $div.offset().top, $div.height()) +
                        '%'
                    });
                });
            }

            if (url) {
                $img.attr('src', url);
            }
        }
    };

    /* eslint-enable no-mixed-operators, no-param-reassign */

    return jQuery;
});


define('SuiteLabs.EnhancedPDP.Gallery.View', [
    'enhancedpdp_gallery.tpl',
    'SCView',
    'External.SimpleLightbox',
    'Utilities.ResizeImage',
    'Utils',
    'jQuery.lightboxZoom',
    'underscore'
], function EnhancedPDPGalleryViewDefinition(
    enhancedGalleryTpl,
    SCViewComponent,
    SimpleLightbox,
    resizeImage,
    Utils,
    jQuery,
    _
) {
    'use strict';

    var YOUTUBE_VIDEO_URL = 'https://www.youtube.com/embed/$(0)';
    var YOUTUBE_IMAGE_URL = 'https://i.ytimg.com/vi/$(0)';
    var YOUTUBE_IMG_MAIN = YOUTUBE_IMAGE_URL + '/sddefault.jpg';
    var YOUTUBE_IMG_THUMB = YOUTUBE_IMAGE_URL + '/default.jpg';
    var YOUTUBE_IMG_ZOOM = YOUTUBE_IMAGE_URL + '/sddefault.jpg';

    var SCView = SCViewComponent.SCView;

    var EnhancedPDPGallery = function EnhancedPDPGallery(options) {
        SCView.call(this);

        this.options = options || {};

        this.template = enhancedGalleryTpl;
        this.lightboxSelector = '.gallery [data-zoom]:not(.bx-clone) [data-lightbox-elem]';
        this.bxSliderPromise = jQuery.Deferred();

        this.attributes = {
            id: 'EnhancedPDP.Gallery',
            'class': 'enhanced-pdp-gallery'
        };

        this.pdpComponent = options.container.getComponent('PDP');
        this.environmentComponent = options.container.getComponent('Environment');
        this.configuration = this.environmentComponent.getConfig('enhancedPDP') || {
            videoIdField: 'custitem_yt_video_id',
            videoPosition: 'first',
            closeMode: 'Close on cross'
        };
        this.configuration = _(this.configuration).extend({
            galleryMagnify: this.environmentComponent.getConfig('isZoomEnabled')
        });

        this.pdpComponent.cancelableOn('afterOptionSelection', jQuery.proxy(this.afterSelection, this));

        this.itemInfo = function itemInfo() {
            return this.pdpComponent.getItemInfo();
        };
    };

    EnhancedPDPGallery.prototype = Object.create(SCView.prototype);

    EnhancedPDPGallery.prototype.constructor = EnhancedPDPGallery;

    EnhancedPDPGallery.prototype.getEvents = function getEvents() {
        var events = {};
        events['click ' + this.lightboxSelector] = 'onImageClick';
        return events;
    };

    EnhancedPDPGallery.prototype.onImageClick = function onImageClick(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    EnhancedPDPGallery.prototype.isMatrixItem = function isMatrixItem() {
        var itemInfo = this.itemInfo();
        var item = itemInfo ? itemInfo.item : {};
        return item.itemoptions_detail && item.itemoptions_detail.matrixtype === 'parent';
    };

    EnhancedPDPGallery.prototype.getImages = function getImages() {
        var ytVideoId;
        var imagesList = [];
        var ytImage;
        var self = this;
        var options;
        var images;
        var imageUrl;
        var i;

        if (this.itemInfo()) {
            ytVideoId = this.itemInfo().item[this.configuration.videoIdField];

            if (this.isMatrixItem()) {
                options = this.itemInfo().options.filter(function eachOption(option) {
                    return option.isMatrixDimension;
                });

                images = _.flatten(options.map(function eachOption(option) {
                    return self.isGalleryOption(option) ? self.getOptionImages(option) : [];
                }));
            }

            if (!images || images.length === 0) {
                images = this.itemInfo().item.keyMapping_images;
            }

            for (i = 0; i < images.length; i++) {
                imageUrl = resizeImage(images[i].url, 'zoom'); // Previous values: main, tinythumb
                imagesList.push({
                    altimagetext: images[i].altimagetext,
                    main: imageUrl,
                    thumb: imageUrl,
                    zoom: imageUrl,
                    skipZoom: !this.configuration.galleryMagnify
                });
            }

            if (ytVideoId) {
                ytImage = {
                    isVideo: true,
                    main: _(YOUTUBE_IMG_MAIN).translate(ytVideoId),
                    thumb: _(YOUTUBE_IMG_THUMB).translate(ytVideoId),
                    zoom: _(YOUTUBE_IMG_ZOOM).translate(ytVideoId),
                    skipZoom: true
                };

                switch (this.configuration.videoPosition) {
                case 'first':
                    imagesList.unshift(ytImage);
                    break;
                case 'second':
                    if (imagesList.length >= 2) {
                        imagesList.splice(1, 0, ytImage);
                    } else {
                        imagesList.push(ytImage);
                    }
                    break;
                case 'last':
                    imagesList.push(ytImage);
                    break;
                default:
                    break;
                }
            }
        }

        return imagesList;
    };

    EnhancedPDPGallery.prototype.lightboxLoader = function lightboxLoader() {
        var ytVideoId;
        var self = this;
        var options = {
            overlayOpacity: 1,
            showCounter: false,
            docClose: this.configuration.closeMode !== 'Close on cross'
        };

        if (this.itemInfo()) {
            ytVideoId = this.itemInfo().item[this.configuration.videoIdField];

            this.initSlider();

            if (ytVideoId) {
                options.additionalHtml = '<iframe src="' + _(YOUTUBE_VIDEO_URL).translate(ytVideoId) + '" frameborder="0"></iframe>';
                options.htmlClass = 'lightbox-video';
            }

            this.bxSliderPromise.then(function onSliderLoad() {
                var imageChangeHandler = function imageChangeHandler(e) {
                    var $target = jQuery(e.target);
                    var hasVideo = $target.data('is-video');

                    // Hide the video by default
                    _.defer(function deferActions() {
                        jQuery('.lightbox-video .sl-additional-html').hide();

                        if (hasVideo) {
                            jQuery('.lightbox-video .sl-image img').hide();
                            jQuery('.lightbox-video .sl-additional-html').show();
                        } else {
                            jQuery('.lightbox-video .sl-image img').show();
                            jQuery('.lightbox-video .sl-additional-html').hide();
                        }
                    });
                };

                self.$lightbox = new SimpleLightbox(self.lightboxSelector, options);
                self.$lightbox.on('shown.simplelightbox', imageChangeHandler);
                self.$lightbox.on('nextDone.simplelightbox', imageChangeHandler);
                self.$lightbox.on('prevDone.simplelightbox', imageChangeHandler);

                _.defer(function deferRender() {
                    self.initZoom();
                });
            });
        }
    };

    EnhancedPDPGallery.prototype.initZoom = function initZoom() {
        var images;

        if (this.configuration.galleryMagnify && !SC.ENVIRONMENT.isTouchEnabled) {
            images = this.getImages();

            this.$('[data-zoom]:not(.bx-clone)').each(function eachImage(slideIndex) {
                jQuery(this).lightboxZoom(images[slideIndex].zoom, slideIndex);
            });
        }
    };

    EnhancedPDPGallery.prototype.render = function render() {
        var self = this;
        var promise = jQuery.Deferred();

        SCView.prototype.render.apply(this, arguments);

        promise.then(function afterRender() {
            self.lightboxLoader();
        });

        return promise.resolve();
    };

    EnhancedPDPGallery.prototype.afterSelection = function afterSelection(option) {
        if (this.isGalleryOption(option)) {
            this.render();
        }
    };

    EnhancedPDPGallery.prototype.isGalleryOption = function isGalleryOption(option) {
        var label = option.value && option.value.label;
        var key = label && label.toLowerCase();
        var itemInfo = this.itemInfo();

        return Boolean(
            itemInfo &&
            itemInfo.item.itemimages_detail &&
            itemInfo.item.itemimages_detail.media &&
            itemInfo.item.itemimages_detail.media[key]
        );
    };

    EnhancedPDPGallery.prototype.getOptionImages = function getOptionImages(option) {
        var label = option.value && option.value.label;
        var key = label && label.toLowerCase();
        var itemInfo = this.itemInfo();

        return itemInfo && itemInfo.item.itemimages_detail.media[key].urls;
    };

    EnhancedPDPGallery.prototype.initSlider = function initSlider() {
        var self = this;

        if (this.images.length > 1) {
            this.$slider = Utils.initBxSlider(this.$('[data-slider]'), {
                buildPager: _.bind(this.buildSliderPager, this),
                startSlide: 0,
                adaptiveHeight: true,
                touchEnabled: true,
                nextText:
                    '<a class="product-details-image-gallery-next-icon" data-action="next-image"></a>',
                prevText:
                    '<a class="product-details-image-gallery-prev-icon" data-action="prev-image"></a>',
                controls: true,
                onSliderLoad: function onSliderLoad() {
                    self.bxSliderPromise.resolve();
                }
            });
        } else if (this.images.length === 1) {
            self.bxSliderPromise.resolve();
        }
    };

    EnhancedPDPGallery.prototype.buildSliderPager = function buildSliderPager(slideIndex) {
        var image = this.images[slideIndex];
        var ret;

        if (image) {
            ret = _('<img src="$(0)" alt="$(1)">').translate(image.thumb, image.altimagetext);
        }

        return ret;
    };

    EnhancedPDPGallery.prototype.getContext = function getContext() {
        this.images = this.getImages();

        return {
            images: this.images,
            firstImage: this.images[0] || {},
            showImages: this.images.length > 0,
            showImageSlider: this.images.length > 1
        };
    };

    return EnhancedPDPGallery;
});


define('Product.Option.Model.MaxLength', [
    'Product.Option.Model',
    'Utils',
    'Backbone',
    'underscore'
], function ProductOptionModelMaxLength(
    ProductOptionModel,
    Utils,
    Backbone,
    _
) {
    'use strict';

    _.extend(ProductOptionModel.prototype, {
        validation: _.extend(ProductOptionModel.prototype.validation, {
            'value.internalid': {
                fn: function optionValueValidator() { // eslint-disable-line
                    var value = this.get('value') && this.get('value').internalid;
                    var maxLength = 160;
                    var optionsConfiguration;
                    var selectedOptionConfig;

                    if (this.get('isMandatory') && !value) {
                        return Utils.translate('Please specify a value for this option');
                    }

                    if (value) {
                        if (this.get('type') === 'text' || this.get('type') === 'textarea') {
                            // This piece of validation is custom
                            try {
                                optionsConfiguration = SC.CONFIGURATION.ItemOptions.optionsConfiguration;
                                selectedOptionConfig = _.findWhere(optionsConfiguration, { cartOptionId: this.get('cartOptionId') });

                                if (selectedOptionConfig.maxLength) {
                                    maxLength = selectedOptionConfig.maxLength;
                                }
                            } catch (error) {
                                console.log('There was an error when validating the item options, details: ' + error.message);
                            }

                            if (this.get('isMandatory') && !String(value).trim()) {
                                return Utils.translate('Please enter a valid input for this string');
                            }
                            // End of validation customization

                            if (value.length > maxLength) {
                                return Utils.translate(
                                    'Please enter a string shorter (maximum length: $(0))',
                                    maxLength
                                );
                            }
                        } else if (
                            this.get('type') === 'email' &&
                            !Backbone.Validation.patterns.email.test(value)
                        ) {
                            return Utils.translate('Please enter a valid email');
                        } else if (
                            this.get('type') === 'integer' &&
                            !Backbone.Validation.patterns.netsuiteInteger.test(value)
                        ) {
                            return Utils.translate('Please enter a valid integer number');
                        } else if (
                            this.get('type') === 'float' &&
                            !Backbone.Validation.patterns.netsuiteFloat.test(value)
                        ) {
                            return Utils.translate('Please enter a valid decimal number');
                        } else if (
                            this.get('type') === 'currency' &&
                            !Backbone.Validation.patterns.netsuiteFloat.test(value)
                        ) {
                            return Utils.translate('Please enter a valid currency number');
                        } else if (
                            this.get('type') === 'phone' &&
                            !Backbone.Validation.patterns.netsuitePhone.test(value)
                        ) {
                            return Utils.translate('Please enter a valid phone');
                        } else if (
                            this.get('type') === 'percent' &&
                            !Backbone.Validation.patterns.netsuitePercent.test(value)
                        ) {
                            return Utils.translate('Please enter a valid percent');
                        } else if (
                            this.get('type') === 'url' &&
                            !Backbone.Validation.patterns.netsuiteUrl.test(value)
                        ) {
                            return Utils.translate('Please enter a valid url');
                        } else if (
                            this.get('type') === 'select' &&
                            !_.findWhere(this.get('values'), { internalid: value })
                        ) {
                            return Utils.translate('Please select a valid value for this option');
                        }
                    }
                }
            }
        })
    });
});


define('SuiteLabs.EnhancedPDP', [
    'SuiteLabs.EnhancedPDP.Gallery.View',
    'Product.Option.Model.MaxLength'
], function EnhancedPDP(
    EnhancedPDPGalleryView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');

            if (pdp) {
                pdp.removeChildView('Product.ImageGallery');

                pdp.addChildViews(pdp.PDP_FULL_VIEW, {
                    'Product.ImageGallery': {
                        'ProductGallery.Enhanced': {
                            childViewConstructor: function childViewConstructor() {
                                return new EnhancedPDPGalleryView({
                                    container: container
                                });
                            },
                            childViewIndex: 1
                        }
                    }
                });
            }
        }
    };
});


};

extensions['SuiteLabs.EnhancedProductReviews.1.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/EnhancedProductReviews/1.0.1/' + asset;
}

define('GlobalViews.StarRating.View.EPR', [
    'GlobalViews.StarRating.View',
    'SC.Configuration',
    'enhanced_global_views_star_rating.tpl',
    'jQuery',
    'Utils',
    'underscore'
], function GlobalViewsStarRatingViewEPR(
    GlobalViewsStarRatingView,
    Configuration,
    EnhancedGlobalViewsStarRatingTpl,
    jQuery,
    Utils,
    _
) {
    'use strict';

    _.extend(GlobalViewsStarRatingView.prototype, {
        template: EnhancedGlobalViewsStarRatingTpl,

        events: _.extend({}, GlobalViewsStarRatingView.prototype.events, {
            'click [data-action="scroll-to-reviews"]': 'scrollToReviews'
        }),

        getProductReviewsContainer: function getProductReviewsContainer() {
            var $elem = jQuery('#product-review-center');
            var domElem = $elem.get(0);

            if (!domElem) {
                // Fallback to alternative container
                $elem = jQuery('.product-reviews-center-content');
                domElem = $elem.get(0);
            }

            return domElem;
        },

        isPusherVisible: function isPusherVisible($pusher) {
            var pusherElem = $pusher.get(0);

            return Utils.isPhoneDevice()
            && pusherElem
            && $pusher.css('display') !== 'none';
        },

        scrollToReviews: function scrollToReviews() {
            var $pusher = jQuery('.product-reviews-center-pusher');
            var reviewsContainer = this.getProductReviewsContainer();

            if (this.isPusherVisible($pusher)) {
                $pusher.click();
            } else if (reviewsContainer) {
                reviewsContainer.scrollIntoView(true);
            }
        },

        getContext: _.wrap(GlobalViewsStarRatingView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var isPDP = this.options.isPDP;
            var isFormView = this.$el.attr('id') === 'rating';
            var config = Configuration.get('enhancedProductReviews') || {
                displayEmptyStars: false,
                newReviewLabel: 'Be the first to write a review'
            };

            _.extend(context, {
                showNoReviewsLink: isPDP && !context.ratingCountGreaterThan0,
                newReviewLink: this.model && this.model.get('_url') + '/newReview',
                newReviewLabel: config.newReviewLabel,
                showRating: config.displayEmptyStars || isFormView || !!(context.value && context.value > 0)
            });

            return context;
        })
    });
});


define('ProductDetails.Full.View.EPR', [
    'ProductDetails.Full.View',
    'GlobalViews.StarRating.View',
    'SC.Configuration',
    'underscore'
], function ProductDetailsFullViewEPR(
    ProductDetailsFullView,
    GlobalViewsStarRatingView,
    Configuration,
    _
) {
    'use strict';

    _(ProductDetailsFullView.prototype).extend({
        getChildViews: _.wrap(ProductDetailsFullView.prototype.getChildViews, function getChildViews(fn) {
            var childViews = fn.apply(this, _.toArray(arguments).slice(1));

            if (childViews['Global.StarRating']) {
                childViews['Global.StarRating'] = function wrapperFunction(options) {
                    return function GlobalStarRating() {
                        return new GlobalViewsStarRatingView({
                            model: options.model.get('item'),
                            showRatingCount: true,
                            showSchemaInfo: true,
                            isPDP: true
                        });
                    };
                };
            }
            return childViews;
        }),

        switchReviewsRatingPosition: function switchReviewsRatingPosition() {
            var ratingContainer = this.$('.product-details-full-rating').detach();
            var config = Configuration.get('enhancedProductReviews') || {
                container: '[data-cms-area="item_info"]',
                containerPosition: 'before'
            };

            switch (config.containerPosition) {
            case 'last':
                this.$(config.container).append(ratingContainer);
                break;
            case 'before':
                this.$(config.container).before(ratingContainer);
                break;
            case 'after':
                this.$(config.container).after(ratingContainer);
                break;
            default:
                break;
            }
        },

        render: _.wrap(ProductDetailsFullView.prototype.render, function render(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));

            this.switchReviewsRatingPosition();

            return ret;
        })
    });
});


define('ProductReviews.Center.View.EPR', [
    'ProductReviews.Center.View',
    'GlobalViews.Pagination.View',
    'Configuration',
    'UrlHelper',
    'Backbone',
    'underscore'
], function ProductReviewsCenterViewEPR(
    ProductReviewsCenterView,
    GlobalViewsPaginationView,
    Configuration,
    UrlHelperModule,
    Backbone,
    _
) {
    'use strict';

    _(ProductReviewsCenterView.prototype).extend({
        pager: function pager(page) {
            return page >= 1
                ? '/' + UrlHelperModule.UrlHelper.setUrlParameter(
                        Backbone.history.fragment,
                        'page',
                        page
                    )
                : '/' + UrlHelperModule.UrlHelper.removeUrlParameter(
                        Backbone.history.fragment,
                        'page'
                    );
        },

        initialize: _(ProductReviewsCenterView.prototype.initialize).wrap(
            function initialize(fn) {
                var self = this;
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                if (this.queryOptions && this.queryOptions.page) {
                    this.on('afterViewRender', function afterViewRender() {
                        _.defer(function deferredScroll() {
                            var $elem = self.$('.product-reviews-center-container');
                            var domElem = $elem.get(0);

                            if (domElem) {
                                domElem.scrollIntoView(true);
                            }
                        });
                    });
                }

                return init;
            }
        ),

        setupListHeader: _(ProductReviewsCenterView.prototype.setupListHeader).wrap(
            function setupListHeader(fn) {
                var ret = fn.apply(this, _(arguments).toArray().slice(1));

                ret.pager = this.pager;

                return ret;
            }
        ),

        childViews: _(ProductReviewsCenterView.prototype.childViews).extend({}, ProductReviewsCenterView.prototype.childViews, {
            'GlobalViews.Pagination': function GlobalViewsPagination() {
                return new GlobalViewsPaginationView(
                    _.extend(
                        {
                            currentPage: this.collection.page || 0,
                            totalPages: this.collection.totalPages || 0,
                            pager: this.pager,
                            extraClass: 'pull-right no-margin-top no-margin-bottom'
                        },
                        Configuration.get('defaultPaginationSettings')
                    )
                );
            }
        })
    });
});


define('Facets.ItemCell.View.EPR', [
    'Facets.ItemCell.View',
    'GlobalViews.StarRating.View',
    'underscore'
], function ProductDetailsFullViewEPR(
    FacetsItemCellView,
    GlobalViewsStarRatingView,
    _
) {
    'use strict';

    _.extend(FacetsItemCellView.prototype.childViews, {
        'GlobalViews.StarRating': function GlobalViewsStarRating() {
            return new GlobalViewsStarRatingView({
                model: this.model,
                showRatingCount: false
            });
        }
    });
});


define('SuiteLabs.Enhanced.ProductReviews.Main', [
    'GlobalViews.StarRating.View.EPR',
    'ProductReviews.Center.View.EPR',
    'ProductDetails.Full.View.EPR',
    'Facets.ItemCell.View.EPR'
], function SuiteLabsEnhancedProductReviewsMain() {
    'use strict';

    /* EPR -> Enhanced Product Reviews */
});


};

extensions['SuiteLabs.EnhancedSearch.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/EnhancedSearch/1.0.0/' + asset;
}

define('EnhancedSearch.View', [
    'ItemsSearcher.View',
    'underscore'
], function EnhancedSearchViewModule(
    ItemsSearcherView,
    _
) {
    'use strict';

    // @class ItemRelations.Related.View @extends Backbone.CollectionView
    return ItemsSearcherView.extend({
        // defaultOptions: {
        //     // @property {String} placeholderLabel
        //     placeholderLabel: Utils.translate('Search for products'),
        //     // @property {Number} minLength
        //     minLength: 3,
        //     // @property {Number} maxLength
        //     maxLength: 10,
        //     // @property {Number} limit
        //     limit: 10,
        //     // @property {String} sort
        //     sort: 'relevance:desc',
        //     // @property {Array} labels
        //     labels: [],
        //     // @property {ItemsSearcher.Collection} collection
        //     collection: ItemsSearcherCollection,
        //     // @property {String} query
        //     query: '',
        //     // @property {Boolean} ajaxDone
        //     ajaxDone: false,
        //     // @property {Boolean} showMenuOnClick
        //     showMenuOnClick: false,
        //     // @property {ItemsSearcher.Item.View} itemView
        //     itemView: ItemsSearcherItemView,
        //     // @property {Boolean} highlight
        //     highlight: true,
        //     // @property {Function} template
        //     template: itemssearcher_tpl,
        //     // @property {Void} componentId
        //     componentId: void 0,
        //     // @property {Void} componentName
        //     componentName: void 0,
        //     // @property {Boolean} showSeeAll Indicate if the first result should be the "See All" option
        //     showSeeAll: true,
        //     // @property {Boolean} highlightFirst
        //     highlightFirst: false,
        //     // @property {ItemsSearcher.View.Options.Item.View.Option} itemViewOptions
        //     itemViewOptions: {},
        //     // @property {ItemsSearcher.View.Options.Collection.Option} collectionOptions
        //     collectionOptions: {},
        //     // @property {Function<Item.Model, String, String>} getItemDisplayName This function give the chance to
        //     // change the way items display name is returned
        //     getItemDisplayName: null
        // },

        // initialize: function initialize(options) {
        //     this.options = _.defaults(options || {}, this.defaultOptions);
        //     this.collection = new this.options.collection([], this.options.collectionOptions);
        //     this.template = this.options.template;
        //     this.on('afterViewRender', this.configureTypeahead, this);
        //     this.installPlugins();
        // },

        getTypeAheadConfiguration: function getTypeAheadConfiguration() {
            var self = this;
            this.categories = [
                { name: 'Holosun Red dot', url: '/holosun-red-dot' },
                { name: 'Geissele Automatics', url: '/geissele-automatics' },
                { name: 'AR-15 Bolt Carriers', url: '/ar15-bolt-carriers' },
                { name: 'Geissele Triggers', url: '/geissele-triggers' },
                { name: 'AR-15 Charging Handles', url: '/ar15-charging-handles' },
                { name: 'EOTech', url: '/eotech' },
                { name: 'Bravo Company Manufacturing - Upper Receivers', url: '/bcm-upper-receivers' },
                { name: 'Surefire Weapon Lights & Switches', url: '/surefire-lights' },
                { name: 'Upper Receivers', url: '/upper-receivers' },
                { name: 'AR-15 Upper Receivers', url: '/ar15-upper-receivers' }
            ];

            this.products = [
                {
                    name: 'LaRue Tactical MBT-2S AR-15 Trigger - Straight Bow',
                    sku: 'LT-MBT-2S-SB',
                    manufacturer: 'LaRue Tactical',
                    url: '/larue-tactical-mbt-2s-straight'
                },
                {
                    name: 'LaRue Tactical MBT-2S AR-15 Trigger - Curved',
                    sku: 'LT-MBT-2S',
                    manufacturer: 'LaRue Tactical',
                    url: '/larue-tactical-mbt-2s-curved'
                },
                {
                    name: 'Primary Arms Compact PLXC 1-8x24 FFP Rifle Scope',
                    sku: 'PA-PLXC-1-8X24F-RAPTOR-5.56Y',
                    manufacturer: 'Primary Arms',
                    url: '/primary-arms-plxc-1-8x24'
                }
            ];

            return {
                name: 'categories',
                source: function source(query, syncResults) {
                    var matches = self.categories.filter(function filterItems(item) {
                        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                    });
                    syncResults(matches);
                },
                display: 'name',
                templates: {
                    header: '<div class="typeahead-section-title"><strong>Trending Categories</strong></div>',
                    suggestion: function suggest(item) {
                        return '<li class="typeahead-category-item">' +
                                '<a href="' + item.url + '" class="typeahead-category-link">' +
                                    '<span class="typeahead-checkmark">✔</span> ' + item.name +
                                '</a>' +
                            '</li>';
                    }
                }
            };
        }
    });
});


define('EnhancedSearch.Model', [
    'SCModel',
    'Utils'],
    function EnhancedSearchModel(
        SCModelComponent,
        Utils
    ) {
        'use strict';

        /* global getExtensionAssetsPath */

        var SCModel = SCModelComponent.SCModel;
        function EnhancedSearchModelObject() {
            SCModel.call(this);
            this.urlRoot = function urlRoot() {
                return Utils.getAbsoluteUrl(
                    getExtensionAssetsPath('Modules/Main/SuiteScript2/EnhancedSearch.Service.ss'), true
                );
            };
        }

        EnhancedSearchModelObject.prototype = Object.create(SCModel.prototype);
        EnhancedSearchModelObject.prototype.constructor = EnhancedSearchModelObject;
        return EnhancedSearchModelObject;
    });


/**
* @NApiVersion 2.x
* @NModuleScope TargetAccount
*/
define([
    'N/log',
    'N/search'
], function EnhancedSearch(
    nLog,
    nSearch
) {
    'use strict';

    var TRENDING_PRODUCTS_SAVED_SEARCH_ID = 'customsearch_trending_products';
    var TRENDING_CATEGORIES_SAVED_SEARCH_ID = 'customsearch_trending_categories';

    return {
        getTrendingProducts: function getTrendingProducts() {
            var items = [];

            var itemsSearch = nSearch.load({
                id: TRENDING_PRODUCTS_SAVED_SEARCH_ID
            });

            itemsSearch.run().each(function forEachResult(result) {
                items.push({
                    id: result.getValue('internalid'),
                    name: result.getValue('name'),
                    manufacturer: result.getValue('manufacturer'),
                    sku: result.getValue('sku'),
                    url: result.getValue('url')
                });

                return true;
            });

            return items;
            // return {
            //     downloadableItems: results
            // };
        },
        getTrendingCategories: function getTrendingCategories() {
            var categories = [];

            var categoriesSearch = nSearch.load({
                id: TRENDING_CATEGORIES_SAVED_SEARCH_ID
            });

            categoriesSearch.run().each(function forEachResult(result) {
                categories.push({
                    id: result.getValue('internalid'),
                    name: result.getValue('name'),
                    url: result.getValue('url')
                });

                return true;
            });
            return categories;
        }
    };
});


define('EnhancedSearch.View', [
    'SCView',
    'EnhancedSearch.Model',
    'enhanced_search.tpl',
    'underscore',
    'jQuery'
], function EnhancedSearchViewModule(
    SCViewComponent,
    EnhancedSearchModel,
    EnhancedSearchTpl,
    _,
    jQuery
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function EnhancedSearchView(options) {
        var self = this;
        SCView.call(this);
        this.options = options || {};

        this.template = EnhancedSearchTpl;
        this.model = new EnhancedSearchModel();

        this.show = false;
        this.categories = [];
        this.products = [];

        this.categories = [
          { name: 'Holosun Red dot', url: '/holosun-red-dot' },
          { name: 'Geissele Automatics', url: '/geissele-automatics' },
          { name: 'AR-15 Bolt Carriers', url: '/ar15-bolt-carriers' },
          { name: 'Geissele Triggers', url: '/geissele-triggers' },
          { name: 'AR-15 Charging Handles', url: '/ar15-charging-handles' },
          { name: 'EOTech', url: '/eotech' },
          { name: 'Bravo Company Manufacturing - Upper Receivers', url: '/bcm-upper-receivers' },
          { name: 'Surefire Weapon Lights & Switches', url: '/surefire-lights' },
          { name: 'Upper Receivers', url: '/upper-receivers' },
          { name: 'AR-15 Upper Receivers', url: '/ar15-upper-receivers' }
        ];

        this.products = [
            {
                name: 'LaRue Tactical MBT-2S AR-15 Trigger - Straight Bow',
                sku: 'LT-MBT-2S-SB',
                manufacturer: 'LaRue Tactical',
                url: '/larue-tactical-mbt-2s-straight'
            },
            {
                name: 'LaRue Tactical MBT-2S AR-15 Trigger - Curved',
                sku: 'LT-MBT-2S',
                manufacturer: 'LaRue Tactical',
                url: '/larue-tactical-mbt-2s-curved'
            },
            {
                name: 'Primary Arms Compact PLXC 1-8x24 FFP Rifle Scope',
                sku: 'PA-PLXC-1-8X24F-RAPTOR-5.56Y',
                manufacturer: 'Primary Arms',
                url: '/primary-arms-plxc-1-8x24'
            }
        ];

        this.options.layout.on('afterShowContent', function afterShowContent() {
            // jQuery('.typeahead').on('focus', function focus() {
            //     jQuery(this).typeahead('val', ''); // para forzar render inicial
            //     jQuery('.typeahead').typeahead('open');
            //     // self.show = true;
            //     // self.render();
            // });

            // jQuery('.typeahead').on('blur', function blur() {
            //     // self.show = false;
            //     // self.render();
            //     jQuery('.typeahead').typeahead('close');
            // });

            // jQuery('.typeahead').on('change', function blur() {
            //     var query = jQuery(this).val();
            //     if (query === '') {
            //         self.show = false;
            //     } else {
            //         self.show = true;
            //         self.searchItems(query);
            //     }
            //     self.render();
            // });
            jQuery('.typeahead').typeahead(
                {
                    minLength: 0,
                    highlight: true
                },
                // Primer dataset: Categorías
                {
                    name: 'categories',
                    source: function source(query, syncResults) {
                        var matches = self.categories.filter(function filterItems(item) {
                            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                        });
                        syncResults(matches);
                    },
                    display: 'name',
                    templates: {
                        header: '<div class="typeahead-section-title"><strong>Trending Categories</strong></div>',
                        suggestion: function suggest(item) {
                            return '<li class="typeahead-category-item">' +
                                    '<a href="' + item.url + '" class="typeahead-category-link">' +
                                        '<span class="typeahead-checkmark">✔</span> ' + item.name +
                                    '</a>' +
                                '</li>';
                        }
                    }
                },
                // Segundo dataset: Productos
                {
                    name: 'products',
                    source: function source(query, syncResults) {
                        var matches = self.products.filter(function filterItems(item) {
                            return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
                        });
                        syncResults(matches);
                    },
                    display: 'name',
                    templates: {
                        header: '<div class="typeahead-section-title"><strong>Trending Products</strong></div>',
                        suggestion: function suggest(item) {
                            // return '<div>' + item.name + '</div>';

                            return '<li class="typeahead-product-item"> <a href="' + item.url + '" class="typeahead-product-link">' +
                                '<div class="typeahead-product-info">' +
                                    '<div class="typeahead-product-name">' + item.name + '</div>' +
                                    '<div class="typeahead-product-sku">SKU: ' + item.sku + '</div>' +
                                    '<div class="typeahead-product-manufacturer">Manufactured by ' + item.manufacturer + '</div>' +
                                ' </div>' +
                                '</a> </div>';
                        }
                    }
                }
            );
        });

        // this.model.fetch({
        //     data: {
        //         action: 'getTrendingProductsAndCategories'
        //     }
        // }).done(function enhancedSearchPromise() {
        //     self.products = self.model.get('trendingProducts');
        //     self.categories = self.model.get('trendingCategories');
        //     self.render();
        // });
    }

    EnhancedSearchView.prototype = Object.create(SCView.prototype);
    EnhancedSearchView.prototype.constructor = EnhancedSearchView;

    EnhancedSearchView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        // this.getTrendingProductsAndCategories().always(function afterGetTrendingProductsAndCategories() {
        SCView.prototype.render.apply(self, args);
        // });
    };

    EnhancedSearchView.prototype.searchItems = function searchItems(query) {
        // var results;
        // var allItems = categories.concat(products);
        var searchQuery = query.toLowerCase();

        // Filtrar categorías
        this.categories = this.categories.filter(function filterItems(item) {
            var name = item.name.toLowerCase();
            return name === searchQuery || name.indexOf(searchQuery) !== -1;
        });

        // Filtrar productos
        this.products = this.products.filter(function filterItems(item) {
            var name = item.name.toLowerCase();
            return name === searchQuery || name.indexOf(searchQuery) !== -1;
        });
    };
    // EnhancedSearchView.prototype.getTrendingProductsAndCategories = function getTrendingProductsAndCategories() {
    //     var self = this;
    //     var item = this.options.PDPComponent.getItemInfo();
    //     var enhancedSearchPromise = jQuery.Deferred();

    //     var properties = {
    //         width: item.item.custitem_pacejet_item_width,
    //         height: item.item.custitem_pacejet_item_height,
    //         length: item.item.custitem_pacejet_item_length,
    //         weight: item.item.weight,
    //         id: item.item.internalid,
    //         quantity: item.quantity
    //     };

    //     this.options.EnhancedSearchModel.fetch({
    //         data: {
    //             action: 'getZipCodeAndPajecetData',
    //             item: JSON.stringify(properties)
    //         }
    //     }).done(function enhancedSearchSuccessfull() {
    //         self.zipCode = self.options.EnhancedSearchModel.get('zipCode');
    //         self.rates = self.options.EnhancedSearchModel.get('rates');
    //         if (!self.zipCode) {
    //             self.show = false;
    //         }
    //     }).always(function enhancedSearchAlways() {
    //         enhancedSearchPromise.resolve();
    //     });
    //     return enhancedSearchPromise;
    // };

    EnhancedSearchView.prototype.getContext = function getContext() {
        // var environment = this.options.container.getComponent('Environment');
        // var EnhancedSearch = environment.getConfig('enhancedSearch');

        return {
            show: this.show,
            trendingCategoriesLabel: 'Trending Categories', // EnhancedSearch.extensions.trendingCategoriesLabel,
            trendingProductsLabel: 'Trending Products', // EnhancedSearch.extensions.trendingProductsLabel,
            hasCategories: this.categories.length > 0, // EnhancedSearch.extensions.categories.length > 0,
            hasProducts: this.products.length > 0, // EnhancedSearch.extensions.products.length > 0,
            categories: this.categories, // EnhancedSearch.extensions.categories,
            products: this.products // EnhancedSearch.extensions.products
        };
    };

    return EnhancedSearchView;
});


define('EnhancedSearch', [
    'EnhancedSearch.View'
], function EnhancedSearch(
    EnhancedSearchView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            // var enhancedSearch = environment.getConfig('enhancedSearch.trendingProductsLabel');
            if (layout) {
                layout.addChildView('ItemsSeacher', function addChildView() {
                    return new EnhancedSearchView({
                        container: container,
                        layout: layout
                    });
                });
            }
        }
    };
});


};

extensions['SuiteLabs.HeaderFiltering.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/HeaderFiltering/1.0.0/' + asset;
}

define('HeaderFiltering', [
    'Configuration',
    'jQuery'
], function HeaderFiltering(
    Configuration,
    jQuery
) {
    'use strict';

    var blacklistDomains = Configuration.get('xTouchpoint.blacklist') || [];

    jQuery.ajaxSetup({
        beforeSend: function beforeSend(jqXhr, options) {
            var isBlacklisted;
            var i = 0;

            if (options.contentType.indexOf('charset') < 0) {
                // If there's no charset, we set it to UTF-8
                jqXhr.setRequestHeader('Content-Type', options.contentType + '; charset=UTF-8');
            }

            if (options && options.url) {
                while (!isBlacklisted && i < blacklistDomains.length) {
                    isBlacklisted = options.url.indexOf(blacklistDomains[i]) >= 0;
                    i++;
                }
            }

            if (!SC.dontSetRequestHeaderTouchpoint && !isBlacklisted) {
                // Add header so that suitescript code can know the current touchpoint
                jqXhr.setRequestHeader('X-SC-Touchpoint', SC.ENVIRONMENT.SCTouchpoint);
            }
        }
    });
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

extensions['NSeComm.HideFacets.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/NSeComm/HideFacets/1.0.0/' + asset;
}

/*
    © 2023 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
define('NSeComm.HideFacets.Main', [
    'facets_faceted_navigation_hide_option.tpl'
], function NSeCommHideFacetsMain(
) {
    'use strict';

    return {};
});


};

extensions['SuiteLabs.ItemBadgesErrorHandler.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/ItemBadgesErrorHandler/1.0.0/' + asset;
}

define('SuiteLabs.ItemBadgesErrorHandler', [
    'underscore'
], function ItemBadgesErrorHandler(
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            var ItemBadgesView;

            try {
                ItemBadgesView = require('SuiteCommerce.ItemBadges.View');

                if (ItemBadgesView) {
                    _(ItemBadgesView.prototype).extend({
                        registerInstrumentationLog: _(ItemBadgesView.prototype.registerInstrumentationLog).wrap(
                            function registerInstrumentationLog(fn) {
                                return this.badgeCollection ? fn.apply(this, _(arguments).toArray().slice(1)) : '';
                            }
                        ),
                        getContext: _(ItemBadgesView.prototype.getContext).wrap(
                            function getContext(fn) {
                                if (this.currentView === 'pdp' || _.isFunction(this.contextData.item)) {
                                    return fn.apply(this, _(arguments).toArray().slice(1));
                                }
                                return {
                                    position: '',
                                    hasBadges: false,
                                    hasThumbnailListAside: false
                                }
                            }
                        )
                    });
                }
            } catch (e) {
                // SuiteCommerce.ItemBadges.View not found
            }
        }
    };
});


};

extensions['SuiteLabs.ItemOptionsFieldHelp.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/ItemOptionsFieldHelp/1.0.0/' + asset;
}

define('ItemOptionsFieldHelp.View', [
    'item_options_field_help.tpl',
    'SCView',
    'jQuery',
    'underscore'
], function ItemOptionsFieldHelpViewModule(
    ItemOptionsFieldHelpTpl,
    SCViewComponent,
    jQuery,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    var ItemOptionsFieldHelpView = function ItemOptionsFieldHelpView(options) {
        SCView.call(this);

        this.options = options || {};

        this.template = ItemOptionsFieldHelpTpl;

        this.contextDataRequest = ['item'];

        this.environment = options.container.getComponent('Environment');
    };

    ItemOptionsFieldHelpView.prototype = Object.create(SCView.prototype);

    ItemOptionsFieldHelpView.prototype.constructor = ItemOptionsFieldHelpView;

    ItemOptionsFieldHelpView.prototype.getEvents = function getEvents() {
        var events = {};
        return events;
    };

    ItemOptionsFieldHelpView.prototype.onImageClick = function onImageClick(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    ItemOptionsFieldHelpView.prototype.getConfiguredItemOptions = function getConfiguredItemOptions() {
        return _.chain(this.environment.getConfig('ItemOptions.optionsConfiguration'))
            .filter(function filterVisibleItemOptions(itemOption) {
                return !!itemOption.templates;
            })
            .pluck('cartOptionId')
            .value();
    };

    ItemOptionsFieldHelpView.prototype.render = function render() {
        var item = this.contextData.item && this.contextData.item();
        var configuredItemOptions;
        var optionsToFetch;
        var itemOptions;
        var i;

        if (item) {
            configuredItemOptions = this.getConfiguredItemOptions();
            itemOptions = _.pluck(item.options, 'cartOptionId');
            optionsToFetch = _.intersection(configuredItemOptions, itemOptions);

            if (optionsToFetch && optionsToFetch.length) {
                for (i = 0; i < optionsToFetch.length; i++) {
                    jQuery.get('/core/help/fieldhelp.nl?f=' + optionsToFetch[i] + '&amp;NS_VER=2021.2.0')
                        .done(_.bind(this.fieldHelpFetched, { cartOptionId: optionsToFetch[i] }));
                }
            }
        }

        return SCView.prototype.render.apply(this, arguments);
    };

    ItemOptionsFieldHelpView.prototype.fieldHelpFetched = function fieldHelpFetched(response) {
        var tempElement = document.createElement('html');
        var textElement;
        var tooltipElement;
        var text;

        tempElement.innerHTML = response;
        textElement = tempElement.getElementsByClassName('text');

        if (textElement && textElement.length) {
            text = _.translate(textElement[0].textContent);

            if (text && _.isFunction(text.trim) && text.trim()) {
                tooltipElement = jQuery('<i class="field-help-tooltip" data-placement="auto" data-toggle="tooltip" title="' + text + '"></i>');

                jQuery('#' + this.cartOptionId + '-container label:first')
                .append(tooltipElement);

                tooltipElement.tooltip({ html: true });
            }
        }
    };

    ItemOptionsFieldHelpView.prototype.getContext = function getContext() {
        return {};
    };

    return ItemOptionsFieldHelpView;
});



define('SuiteLabs.ItemOptionsFieldHelp.Main', [
    'ItemOptionsFieldHelp.View'
], function SuiteLabsItemOptionsFieldHelpMain(
    ItemOptionsFieldHelpView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdp = container.getComponent('PDP');

            if (pdp) {
                pdp.addChildView('Options.Collection', function ItemOptionsFieldHelpChildView() {
                    return new ItemOptionsFieldHelpView({ container: container });
                });
            }
        }
    };
});


};

extensions['SuiteLabs.ItemResultsSorting.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/ItemResultsSorting/1.0.0/' + asset;
}

define('Facets.Translator.ItemResultsSorting', [
    'Facets.Translator',
    'Configuration',
    'underscore'
], function MainView(
    FacetsTranslator,
    Configuration,
    _
) {
    'use strict';

    _.extend(FacetsTranslator.prototype, {
        parseUrlOptions: _.wrap(FacetsTranslator.prototype.parseUrlOptions, function parseUrlOptions(fn) {
            var defaultSort = Configuration.get('typeahead.sort');

            fn.apply(this, _.toArray(arguments).slice(1));

            if (this.options.keywords) {
                this.options.order = defaultSort;
            }
        })
    });
});


define('SuiteLabs.ItemResultsSorting.Main', [
    'Facets.Translator.ItemResultsSorting'
], function SuiteLabsItemResultsSortingMain() {
    'use strict';
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


define('SuiteLabs.Klaviyo.Shopping', [
    'Klaviyo.Tracker',
    'Tracker'
], function SuiteLabsKlaviyoShopping(
    KlaviyoTracker,
    Tracker
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            if (!SC.isPageGenerator()) {
                Tracker.getInstance().trackers.push(KlaviyoTracker);
            }
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



define('ManageShoppingErrors.Main', [
    'ProductDetails.Full.View',
    'underscore',
    'Utils',
    'Utils.Extend'
], function ManageShoppingErrorsMain(
    ProductDetailsFullView,
    _,
    Utils
) {
    'use strict';

    _.extend(ProductDetailsFullView.prototype, {

        bindModel: _.wrap(ProductDetailsFullView.prototype.bindModel, function bindModel(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.model.areAttributesValid = _.wrap(this.model.areAttributesValid, function areAttributesValid(fnValid) {
                var result = fnValid.apply(this, _.toArray(arguments).slice(1));
                if (Utils.isPhoneDevice()) {
                    Utils.animateToError();
                }
                return result;
            });
        })
    });
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

extensions['SuiteLabs.NavigablePromoItems.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/NavigablePromoItems/1.0.0/' + asset;
}

define('SuiteLabs.NavigablePromoItems', [
    'Cart.Detailed.View',
    'Cart.Lines.Free.View',

    'suitelabs_cart_lines_free.tpl',

    'Configuration',
    'GlobalViews.Message.View',

    'underscore'
], function NavigablePromoItems(
    CartDetailedView,
    CartLinesFreeView,

    cartLinesFreeTpl,

    Configuration,
    GlobalViewsMessageView,

    _
) {
    'use strict';

    var configuration = Configuration.navPromoItems || {
        promoTexts: []
    };

    _(CartDetailedView.prototype).extend({
        childViews: _(CartDetailedView.prototype.childViews).extend({
            'FreeGift.Info': function freeGiftInfo() {
                var message;
                var freeGifts = _(this.model.get('lines').models || []).filter(function eachLine(line) {
                    return line.get('free_gift') === true;
                });
                var freeGiftCode;
                var freeGiftData;

                if (freeGifts.length === 1) {
                    try {
                        freeGiftCode = String(freeGifts[0].get('free_gift_info').promotion_couponcode);
                        freeGiftData = _(configuration.promoTexts).findWhere({ promoCode: freeGiftCode }) || {};
                    } catch (e) {
                        freeGiftData = {};
                    }
                    message = _.translate(
                        freeGiftData.promoText || 'The following item is free but it may generate shipping costs.'
                    );
                } else if (freeGifts.length > 1) {
                    message = _.translate(
                        'The following items are free but they may generate shipping costs.'
                    );
                }

                return message ? new GlobalViewsMessageView({
                    message: message,
                    type: 'info',
                    closable: false
                }) : null;
            }
        })
    });

    _(CartLinesFreeView.prototype).extend({
        initialize: _(CartLinesFreeView.prototype.initialize).wrap(
            function initialize(fn) {
                this.template = cartLinesFreeTpl;
                return fn.apply(this, _(arguments).toArray().slice(1));
            }
        )
    });
});


};

extensions['SuiteLabs.OptionsAndUpgrades.1.0.2'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/OptionsAndUpgrades/1.0.2/' + asset;
}

define('OptionsAndUpgrades.ItemRelations.Related.View', [
    'ItemRelations.Related.View',
    'oau_item_relations_related.tpl',
    'SC.Configuration',
    'jQuery',
    'Utils',
    'underscore'
], function OAUItemRelationsRelatedView(
    ItemRelationsRelatedView,
    itemRelationsRelatedTpl,
    Configuration,
    jQuery,
    Utils,
    _
) {
    'use strict';

    var debugMode = false;

    _(ItemRelationsRelatedView.prototype).extend({
        initialize: _(ItemRelationsRelatedView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.isRelatedView = true;
                this.configuration = Configuration.get('optionsAndUpgrades') || {};
                this.on('afterCompositeViewRender', _(this.afterRender).bind(this));

                return init;
            }
        ),

        isOAU: function isOAU() {
            try {
                return this.parentView.options.model.get('item').get(
                    this.configuration.itemFieldId
                );
            } catch (e) { if (debugMode) { console.log(e.message); } }

            return false;
        },

        render: _(ItemRelationsRelatedView.prototype.render).wrap(
            function render(fn) {
                try {
                    this.template = this.isOAU() ? itemRelationsRelatedTpl : this.template;
                } catch (e) { if (debugMode) { console.log(e.message); } }

                return fn.apply(this, _(arguments).toArray().slice(1));
            }
        ),

        carouselInitialize: function carouselInitialize() {
            var config = this.options.application.getConfig();
            var carousel = this.$el.find('[data-type="carousel-items"]');
            var imgMinHeight;
            var carouselConfig = Configuration.get('bxSliderDefaults', {});

            if (carousel.length > 0) {
                if (Utils.isPhoneDevice() === false && (config.siteSettings.imagesizes || false)) {
                    imgMinHeight = (_.where(config.siteSettings.imagesizes || [], {
                        name: config.imageSizeMapping.thumbnail || ''
                    })[0]).maxheight;

                    carousel
                        .find('.item-relations-related-item-thumbnail')
                        .css('minHeight', imgMinHeight);
                }

                // Roll back to the slideWidth default value for this specific feature
                // using the PoshThemeExtension value (300) breaks the styling of the slider on this case
                carouselConfig.slideWidth = 228;
                carouselConfig.maxSlides = 5;

                Utils.initBxSlider(carousel, carouselConfig);
            }
        },

        afterRender: function afterRender() {
            var configuration = this.configuration;
            var $placeholder;

            if (this.isOAU()) {
                $placeholder = jQuery('[data-view="' + configuration.relatedItemsPlaceholder + '"]');

                if ($placeholder.length === 0) {
                    $placeholder = jQuery('[data-cms-area="' + configuration.relatedItemsPlaceholder + '"]');
                }

                if ($placeholder.length) {
                    if (configuration.relatedItemsPosition === 'first') {
                        $placeholder.prepend(this.$el);
                    } else {
                        $placeholder.append(this.$el);
                    }
                }
            }
        },

        getContext: _(ItemRelationsRelatedView.prototype.getContext).wrap(
            function getContext(fn) {
                var context = fn.apply(this, _(arguments).toArray().slice(1));
                var configuration = this.configuration || Configuration.get('optionsAndUpgrades') || {};

                if (this.isOAU()) {
                    context = _(context).extend({
                        relatedItemsTitle: this.configuration ? this.configuration.relatedItemsTitle : 'You may also like',
                        noImages: configuration.hideProductImage
                    });
                }
                return context;
            }
        )
    });

    return ItemRelationsRelatedView;
});


define('OptionsAndUpgrades.ItemRelations.RelatedItem.View', [
    'ItemRelations.RelatedItem.View',
    'oau_item_relations_related_item.tpl',
    'SC.Configuration',
    'jQuery',
    'underscore'
], function OAUItemRelationsRelatedItemView(
    ItemRelationsRelatedItemView,
    itemRelationsRelatedItemTpl,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    _(ItemRelationsRelatedItemView.prototype).extend({
        initialize: _(ItemRelationsRelatedItemView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.configuration = Configuration.get('optionsAndUpgrades') || {};
                this.on('afterCompositeViewRender', _(this.afterRender).bind(this));

                return init;
            }
        ),

        isOAU: function isOAU() {
            try {
                return this.parentView.parentView.options.model.get('item').get(
                    this.configuration.itemFieldId
                );
            } catch (e) { if (debugMode) { console.log(e.message); } }

            return false;
        },

        events: _(ItemRelationsRelatedItemView.prototype.events || {}).extend({
            'change [data-action="add"]': 'addToCart'
        }),

        addToCart: function addToCart(e) {
            var itemId = this.model.get('internalid');
            var isChecked = this.$(e.target).is(':checked');
            var parentId;

            if (!this.$(e.target).length) {
                this.$('[data-action="add"]').click();
            } else {
                parentId = String(this.parentView.options.itemsIds);

                SC.SESSION.oauAddToCart = SC.SESSION.oauAddToCart || {};
                SC.SESSION.oauAddToCart[parentId] = SC.SESSION.oauAddToCart[parentId] || {};
                if (isChecked) {
                    SC.SESSION.oauAddToCart[parentId][itemId] = itemId;
                } else {
                    delete SC.SESSION.oauAddToCart[parentId][itemId];
                }
            }
            return e.preventDefault() || e.stopPropagation();
        },

        afterRender: function afterRender() {
            // Do nothing
        },

        render: _(ItemRelationsRelatedItemView.prototype.render).wrap(
            function render(fn) {
                try {
                    this.template = this.isOAU() ? itemRelationsRelatedItemTpl : this.template;
                } catch (e) { if (debugMode) { console.log(e.message); } }

                return fn.apply(this, _(arguments).toArray().slice(1));
            }
        ),

        getContext: _(ItemRelationsRelatedItemView.prototype.getContext).wrap(
            function getContext(fn) {
                var context = fn.apply(this, _(arguments).toArray().slice(1));
                var isRelatedView = this.parentView && this.parentView.isRelatedView;
                var date = new Date();

                if (this.isOAU()) {
                    context = _(context).extend({
                        showATC: isRelatedView,
                        noImages: isRelatedView && this.configuration.hideProductImage,
                        addToCartText: isRelatedView && this.configuration.addToCartText,
                        timestamp: date.getTime()
                    });
                }
                return context;
            }
        )
    });

    return ItemRelationsRelatedItemView;
});


define('OptionsAndUpgrades.ProductDetails.Full.View', [
    'ProductDetails.Full.View',
    'SC.Configuration',
    'jQuery',
    'underscore'
], function OAUProductDetailsFullView(
    ProductDetailsFullView,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    _(ProductDetailsFullView.prototype).extend({
        initialize: _(ProductDetailsFullView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.configuration = Configuration.get('optionsAndUpgrades') || {};
                this.on('afterCompositeViewRender', _(this.afterRender).bind(this));

                return init;
            }
        ),

        events: _(ProductDetailsFullView.prototype.events || {}).extend({
            'click [data-action="toRelated"]': 'scrollToRelated'
        }),

        scrollToRelated: function scrollToRelated(e) {
            jQuery('html, body').animate({
                scrollTop: jQuery('[data-container="oau"]').offset().top - 20
            }, 200);
            return e.preventDefault() || e.stopPropagation();
        },

        afterRender: function afterRender() {
            var isOAU;

            try {
                isOAU = this.options.model.get('item').get(
                    this.configuration.itemFieldId
                );
                if (isOAU && this.configuration.enableRelatedItemsScrollToLink) {
                    this.$el.find('[data-view="StockDescription"]').prepend(
                        '<div><a class="to-related" href="#" data-action="toRelated">' + this.configuration.relatedItemsTitle + '</a></div>'
                    );
                }
            } catch (e) { if (debugMode) { console.log(e.message); } }
        }
    });

    return ProductDetailsFullView;
});


define('OptionsAndUpgrades.LiveOrder.Model', [
    'LiveOrder.Model',
    'LiveOrder.Line.Model',
    'jQuery',
    'underscore'
], function OAULiveOrderModel(
    LiveOrderModel,
    LiveOrderLineModel,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    _(LiveOrderModel.prototype).extend({
        addLines: _(LiveOrderModel.prototype.addLines).wrap(
            function addLines(fn, lines) {
                var itemsQueueSelector = 'input[name="relateditems_queue"]';
                var relatedItemIds = [];

                try {
                    _(lines).each(function eachLine(line) {
                        var parentId = String(line.get('item').get('internalid'));

                        if (SC.SESSION.oauAddToCart && SC.SESSION.oauAddToCart[parentId]) {
                            relatedItemIds = relatedItemIds.concat(
                                _(SC.SESSION.oauAddToCart[parentId]).toArray()
                            );
                            delete SC.SESSION.oauAddToCart[parentId];
                        }
                    });

                    relatedItemIds.forEach(function eachId(itemId) {
                        jQuery(itemsQueueSelector + '[data-item-id="' + itemId + '"]').prop('checked', false).prop('disabled', true);
                        lines.unshift(
                            LiveOrderLineModel.createFromOuterLine({
                                quantity: 1,
                                item: { internalid: itemId }
                            })
                        );
                    });
                } catch (e) { if (debugMode) { console.log(e.message); } }

                return fn.apply(this, _(arguments).toArray().slice(1)).then(function afterAddLines() {
                    relatedItemIds.forEach(function eachId(itemId) {
                        jQuery(itemsQueueSelector + '[data-item-id="' + itemId + '"]').prop('disabled', false);
                    });
                });
            }
        )
    });

    return LiveOrderModel;
});


define('SuiteLabs.OptionsAndUpgrades.Main', [
    'OptionsAndUpgrades.LiveOrder.Model',
    'OptionsAndUpgrades.ProductDetails.Full.View',
    'OptionsAndUpgrades.ItemRelations.Related.View',
    'OptionsAndUpgrades.ItemRelations.RelatedItem.View'
], function OptionsAndUpgradesMain(

) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            // This snippet of code is debatable, it is needed for making the "Add to Cart"
            // checkboxes work on the Options and Upgrades feature, but if enabled then it breaks
            // the navigation of the elements within Available Finishes section. Ben considered that the
            // second thing was more important that's why it is commented out.
            // container.getLayout().on('beforeRender', function beforeRender() {
            //     if (SC.CONFIGURATION && SC.CONFIGURATION.bxSliderDefaults) {
            //         SC.CONFIGURATION.bxSliderDefaults.touchEnabled = false;
            //     }
            // });
            SC.SESSION = SC.SESSION || {};
        }
    };
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

extensions['SuiteLabs.PayPalOptions.1.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/PayPalOptions/1.0.1/' + asset;
}

define('PayPalOptions.View', [
    'paypal_options.tpl',
    'SCView',
    'jQuery',
    'Utils',
    'underscore'
], function PayPalOptionsViewModule(
    PayPalOptionsTpl,
    SCViewComponent,
    jQuery,
    Utils,
    _
) {
    'use strict';

    /* globals getExtensionAssetsPath */

    var SCView = SCViewComponent.SCView;

    function PayPalOptionsView(options) {
        var windowResizeFn;
        var self = this;

        SCView.call(this);

        this.environment = options.environment;
        this.getAmount = options.getAmount;
        this.template = PayPalOptionsTpl;

        windowResizeFn = _.throttle(function windowResizeThrottled() {
            self.render();
        }, 1000);

        this.windowResizeHandler = _.bind(windowResizeFn, this);

        jQuery(window).on('resize', this.windowResizeHandler);
    }

    PayPalOptionsView.prototype = Object.create(SCView.prototype);

    PayPalOptionsView.prototype.constructor = PayPalOptionsView;

    PayPalOptionsView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        var promise = new jQuery.Deferred();

        this.getAmount().then(function getAmount(amount) {
            self.amount = amount;
            SCView.prototype.render.apply(self, args);
            promise.resolve();
        });

        return promise;
    };

    PayPalOptionsView.prototype.getContext = function getContext() {
        var paypalCheckoutBtn;
        var paypalLaterBtn;

        if (Utils.isDesktopDevice()) {
            paypalCheckoutBtn = '/images/paypal/Yellow-Button_PP-Checkout-500.png';
            paypalLaterBtn = '/images/paypal/Blue-Button_PP-Pay-Later-500.png';
        } else {
            paypalCheckoutBtn = '/images/paypal/Yellow-Button_PP-Checkout-300.png';
            paypalLaterBtn = '/images/paypal/Blue-Button_PP-Pay-Later-300.png';
        }

        return {
            paypalCheckoutBtn: paypalCheckoutBtn,
            paypalLaterBtn: paypalLaterBtn,
            cartTotal: this.amount
        };
    };

    return PayPalOptionsView;
});


define('PayPalOptions.Cart.Summary.View', [
    'Cart.Summary.View',
    'PayPalOptions.View',
    'paypal_options_cart_summary.tpl',
    'jQuery',
    'underscore'
], function SuiteLabsPayPalOptionsMain(
    CartSummaryView,
    PayPalOptionsView,
    PayPalOptionsTpl,
    jQuery,
    _
) {
    _.extend(CartSummaryView.prototype, {
        render: _.wrap(CartSummaryView.prototype.render, function render(fn) {
            if (this.template.Name !== 'themehelper_cart_summary') {
                this.template = PayPalOptionsTpl;
            }

            return fn.apply(this, _.toArray(arguments).slice(1));
        }),

        childViews: _.extend({}, CartSummaryView.prototype.childViews, {
            'PayPalOptions.Messaging': function PayPalOptionsMessaging() {
                var self = this;

                return new PayPalOptionsView({
                    environment: this.options.application.getComponent('Environment'),
                    getAmount: function getAmount() {
                        var cart = self.options.application.getComponent('Cart');
                        var promise = jQuery.Deferred();

                        cart.getSummary().then(function getSummary(summary) {
                            promise.resolve(summary.subtotal);
                        });

                        return promise;
                    }
                });
            }
        })
    });
});


define('PayPalOptions.PDP.View', [
    'paypal_options_pdp.tpl',
    'Item.Model',
    'SCView'
], function PayPalOptionsPDPViewModule(
    PayPalOptionsPDPTpl,
    ItemModel,
    SCViewComponent
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function PayPalOptionsPDPView(options) {
        SCView.call(this);

        this.pdp = options.pdp;
        this.template = PayPalOptionsPDPTpl;
    }

    PayPalOptionsPDPView.prototype = Object.create(SCView.prototype);

    PayPalOptionsPDPView.prototype.constructor = PayPalOptionsPDPView;

    PayPalOptionsPDPView.prototype.getContext = function getContext() {
        var itemInfo = this.pdp.getItemInfo();
        var priceContainer;
        var price;
        var item;

        if (itemInfo && itemInfo.item) {
            item = new ItemModel(itemInfo.item);
            priceContainer = item.getPrice();
            price = priceContainer.price || 0;
        }

        return {
            price: price,
            showMessage: !!price
        };
    };

    return PayPalOptionsPDPView;
});


define('SuiteLabs.PayPalOptions.Main', [
    'PayPalOptions.PDP.View',
    'jQuery',
    'PayPalOptions.Cart.Summary.View',
    'PayPalOptions.View'
], function SuiteLabsPayPalOptionsMain(
    PayPalOptionsPDPView,
    jQuery
) {
    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            var pdp = container.getComponent('PDP');
            var sdkUrl = environment.getConfig('paypalOptions.sdkUrl');

            if (!environment.isPageGenerator() && sdkUrl) {
                pdp.addChildView('Product.Price', function payPalOptionsPDPView() {
                    return new PayPalOptionsPDPView({
                        pdp: pdp
                    });
                });

                jQuery.getScript(sdkUrl);
            }
        }
    };
});


};

extensions['ACS.PDPPageTitle.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/PDPPageTitle/1.0.0/' + asset;
}

define('PDPPageTitle.View', [
    'ProductDetails.Full.View',
    'underscore',
    'SC.Configuration'
], function PDPPageTitleView(
    ProductDetails,
    _,
    Configuration
) {
    'use strict';

    return _(ProductDetails.prototype).extend({
        getTitle: function getTitle() {
            var pageTitle;
            var itemTitle;

            pageTitle = Configuration.get('productDetail.websiteDisplayName');

            if (!pageTitle) {
                pageTitle = Configuration.get('siteSettings.displayname');
            }
            itemTitle = this.model.get('item').get('pagetitle');

            // Removes Forced Site Name on Product Name
            itemTitle = itemTitle.split('|')[0].trim();

            return itemTitle + ' | ' + pageTitle;
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

extensions['SuiteLabs.ProductBanner.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/ProductBanner/1.0.0/' + asset;
}

define('ProductBanner.View', [
    'product_banner.tpl',
    'SCView'
], function ProductBannerViewModule(
    ProductBannerTpl,
    SCViewComponent
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function ProductBannerView(options) {
        SCView.call(this);

        this.content = options.content;
        this.key = options.key;
        this.template = ProductBannerTpl;

        this.contextDataRequest = ['item'];
    }

    ProductBannerView.prototype = Object.create(SCView.prototype);

    ProductBannerView.prototype.constructor = ProductBannerView;

    ProductBannerView.prototype.render = function render() {
        var item = this.contextData.item();
        var itemBanners = item
            && item.custitem_product_banner
            && item.custitem_product_banner.split(',');
        var bannerFound;
        var i = 0;

        while (!bannerFound && i < itemBanners.length) {
            if (itemBanners[i].trim() === this.key) {
                SCView.prototype.render.apply(this, arguments);
                bannerFound = true;
            }

            i++;
        }
    };

    ProductBannerView.prototype.getContext = function getContext() {
        return {
            content: this.content
        };
    };

    return ProductBannerView;
});


define('SuiteLabs.ProductBanner.Main', [
    'ProductBanner.View',
    'underscore'
], function SuiteLabsProductBannerMain(
    ProductBannerView,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pdpComponent = container.getComponent('PDP');
            var environmentComponent = container.getComponent('Environment');
            var bannersConfig;
            var banner;
            var i;

            if (environmentComponent && pdpComponent) {
                bannersConfig = environmentComponent.getConfig('productBanner');

                if (bannersConfig.banners && bannersConfig.banners.length) {
                    for (i = 0; i < bannersConfig.banners.length; i++) {
                        banner = bannersConfig.banners[i];

                        pdpComponent.addChildView(banner.placeholder, _.bind(function BannerViews() {
                            return new ProductBannerView({
                                content: this.content,
                                key: this.key
                            });
                        }, banner));
                    }
                }
            }
        }
    };
});


};

extensions['ACS.QuoteButton.1.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/QuoteButton/1.0.1/' + asset;
}

define('ProductDetailToQuote.View.Extend', [
    'ProductDetailToQuote.View',
    'Profile.Model',
    'acs_product_detail_to_quote.tpl',
    'underscore'
], function ProductDetailToQuoteViewExtend(
        ProductDetailToQuoteView,
        ProfileModel,
        template,
        _
    ) {
    'use strict';

    return _.extend(ProductDetailToQuoteView.prototype, {
        template: template,

        getContext: _.wrap(ProductDetailToQuoteView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));

            context.isLoggedIn = ProfileModel.getInstance().get('isLoggedIn') === 'T';

            return context;
        })
    });
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

extensions['ACS.RemoveYouMayAlsoLike.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/RemoveYouMayAlsoLike/1.0.0/' + asset;
}


define('RemoveYouMayAlsoLike', [
], function RemoveYouMayAlsoLikeModule(
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var cart = container.getComponent('Cart');

            cart.removeChildView('Related.Items');
        }
    };
});


};

extensions['SuiteLabs.ResponsiveMerchZones.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/ResponsiveMerchZones/1.0.0/' + asset;
}

define('SuiteLabs.ResponsiveMerchZones.Main', [
    'underscore'
], function SuiteLabsResponsiveMerchZonesMain(
    _
) {
    'use strict';

    var CMSMerchzoneCCT;

    try {
        CMSMerchzoneCCT = require('CXExtensibility.CoreContent.CMSMerchzoneCCT.View');
    } catch (e) {
        console.log('Could not load the required CXExtensibility.CoreContent.CMSMerchzoneCCT.View module');
    }

    if (CMSMerchzoneCCT) {
        _.extend(CMSMerchzoneCCT.prototype, {
            renderGrid: function renderGrid() {
                var gridClass = 'cms-merchzone-grid';
                var numItems = parseInt(this.settings.custrecord_merchzone_numitems, 10) || 4;

                if (numItems >= 3 && numItems <= 6) {
                    gridClass += '-' + numItems + '-cols';
                } else {
                    gridClass = 'cms-merchzone-grid-4-cols';
                }

                this.$('.cms-merchzone-slider')
                    .removeClass('cms-merchzone-slider')
                    .addClass(gridClass)
                    .addClass('cms-merchzone-grid');
            }
        });
    }
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

extensions['SuiteLabs.SEOImagePatch.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/SEOImagePatch/1.0.0/' + asset;
}

define('SuiteLabs.SEOImagePatch.Main', [
    'jQuery'
], function SEOImagePatchMain(
    jQuery
) {
    'use strict';

    // If the UA is google and main div is not empty (was pre-rendered) then unwrap the images for googlebot
    if (navigator.userAgent.match(/googlebot/i) && jQuery('#main') && String(jQuery('#main').html()).trim()) {
        jQuery('noscript').each(function eachNoScript() {
            jQuery(this).parent().append(
                jQuery(this).text()
            );
        });
    }
    return {};
});


};

extensions['SSD.ShippingMethodExtension.1.0.7'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SSD/ShippingMethodExtension/1.0.7/' + asset;
}

/**
 * Created by ammann on 7/21/17.
 */

define('Cart.Detailed.View.Site', [
    'Cart.Detailed.View',
    'underscore',
    'SC.Configuration'
],
    function CartDetailedViewSite(
        View,
        _,
        Configuration
    ) {
        'use strict';

        _.extend(View.prototype, {
            events: _.extend(View.prototype.events || {}, {
                'click input[name="delivery-options"]': 'changeDeliveryOptions'
            }),
            /* eslint-disable */
            changeDeliveryOptions: function (e) {
                /* eslint-enable */
                var shipMethod = this.$(e.target).val();
                var self = this;
                e.preventDefault();
                this.model.set('shipmethod', shipMethod);
                /* eslint-disable */
                this.model.save().always(function () {
                    /* eslint-disable */
                    self.showContent();
                });
            },
            getContext: function () {
                var lines = this.model.get('lines')
                    , product_count = lines.length
                    , item_count = _.reduce(lines.models, function (memo, line) { return memo + line.get('quantity'); }, 0)
                    , product_and_items_count = '';

                if (product_count === 1) {
                    if (item_count === 1) {
                        product_and_items_count = _('1 Product, 1 Item').translate();
                    }
                    else {
                        product_and_items_count = _('1 Product, $(0) Items').translate(item_count);
                    }
                }
                else {
                    if (item_count === 1) {
                        product_and_items_count = _('$(0) Products, 1 Item').translate(product_count);
                    }
                    else {
                        product_and_items_count = _('$(0) Products, $(1) Items').translate(product_count, item_count);
                    }
                }

                // @class Cart.Detailed.View.Context
                return {

                    //@property {LiveOrder.Model} model
                    model: this.model
                    //@property {Boolean} showLines
                    , showLines: !!(lines && lines.length)
                    //@property {Orderline.Collection} lines
                    , lines: lines
                    //@property {String} productsAndItemsCount
                    , productsAndItemsCount: product_and_items_count
                    //@property {Number} productCount
                    , productCount: product_count
                    //@property {Number} itemCount
                    , itemCount: item_count
                    //@property {String} pageHeader
                    , pageHeader: this.page_header
                    , showPaypalButton: Configuration.get('siteSettings.checkout.paypalexpress.available', 'F') === 'T'
                    // @property {String} paypalButtonImageUrl
                    , paypalButtonImageUrl: Configuration.get('paypalButtonImageUrl', 'https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png')
                };
                // @class Cart.Detailed.View
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



define(
	'ShippingMethodExtension.Shopping',   
	[ 
		'Profile.Model',
		'Cart.Detailed.View.Site',
		'Cart.ShippingMethodForm.View.Site',
		'Cart.Summary.View.Site'
	]
,   function 
	(
		ProfileModel,
		CartDetailedViewSite,
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

extensions['SuiteLabs.StickyScroll.1.0.4'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/StickyScroll/1.0.4/' + asset;
}


define('SuiteLabs.StickyScroll.Main', [
    'Facets.Browse.View',
    'Facets.ItemCell.View',
    'ProductDetails.Base.View',
    'Backbone',
    'jQuery',
    'underscore'
], function SuiteLabsStickyScrollMain(
    FacetsBrowseView,
    FacetsItemCellView,
    ProductDetailsBaseView,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    // Window.sessionStorage
    var globalStorage = sessionStorage;

    var latestProductVisited;
    var latestProductFound;

    var InfiniteScrollItemsHandler;

    if (!SC.isPageGenerator()) {
        /* eslint-disable global-require, no-console */
        try {
            InfiniteScrollItemsHandler = require('SuiteCommerce.InfiniteScroll.ItemsHandler');

            _.extend(InfiniteScrollItemsHandler.default, {
                loadPage: _.wrap(InfiniteScrollItemsHandler.default.loadPage, function loadPage(fn, _searchApiUrl, pageNumber) {
                    var self = this;
                    var promise = fn.apply(this, _.toArray(arguments).slice(1));

                    return promise.then(function itemPageMapping() {
                        var itemMap = JSON.parse(globalStorage.getItem('itemPageMapping') || '{}');

                        self.collection.forEach(function forEachItem(itemModel) {
                            var itemId = String(itemModel.get('internalid'));

                            itemMap[itemId] = pageNumber;
                        });
                        globalStorage.setItem('itemPageMapping', JSON.stringify(itemMap));
                    });
                })
            });
        } catch (e) {
            if (debugMode) {
                console.warn('InfiniteScroll was not found.');
            }
        }
        /* eslint-enable global-require, no-console */

        _.extend(FacetsBrowseView.prototype, {
            initialize: _.wrap(FacetsBrowseView.prototype.initialize, function initialize(fn) {
                var ret = fn.apply(this, _.toArray(arguments).slice(1));
                var self = this;

                this.on('afterCompositeViewRender', function afterViewRender() {
                    var application = self.getApplication();

                    return application && application.getLayout().trigger('itemListRendered');
                });

                return ret;
            }),

            getApplication: function getApplication() {
                return (this.options && this.options.application) || (SC && SC.Application);
            }
        });

        _.extend(FacetsItemCellView.prototype, {
            initialize: _.wrap(FacetsItemCellView.prototype.initialize, function initialize(fn) {
                var ret = fn.apply(this, _.toArray(arguments).slice(1));
                var self = this;

                this.on('afterViewRender', function afterViewRender() {
                    var application = self.getApplication();
                    var itemId = self.model.get('internalid');

                    return application && application.getLayout().trigger('cellRendered', itemId);
                });

                return ret;
            }),

            getApplication: function getApplication() {
                return (this.options && this.options.application) || (SC && SC.Application);
            }
        });

        _.extend(ProductDetailsBaseView.prototype, {
            initialize: _.wrap(ProductDetailsBaseView.prototype.initialize, function initialize(fn) {
                var self = this;
                var ret = fn.apply(this, _.toArray(arguments).slice(1));

                this.on('afterViewRender', function afterViewRender() {
                    var item = self.model.get('item');
                    var itemId = item.get('internalid');
                    latestProductVisited = itemId;
                    latestProductFound = false;
                });

                return ret;
            })
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getLayout();
            var layoutPromise;
            var cellPromise;

            if (!SC.isPageGenerator()) {
                layout.on('beforeAppendView', function beforeAppendView() {
                    layoutPromise = jQuery.Deferred();
                    cellPromise = jQuery.Deferred();

                    jQuery.when(layoutPromise, cellPromise).then(
                        function scrollTo() {
                            var elem = document.querySelector('[data-item-id="' + latestProductVisited + '"]');

                            if (elem) {
                                _.defer(function elemScroll() {
                                    elem.scrollIntoView();
                                });
                            }
                            globalStorage.setItem('nextPage.' + latestProductVisited, '');
                        },
                        function loadNextPage() {
                            var fragment = Backbone.history.fragment;
                            var pageRegExp = /([?|&])page=(\d+)/;
                            var pageValues = pageRegExp.exec(fragment);

                            var itemId = String(latestProductVisited);
                            var itemMap = JSON.parse(globalStorage.getItem('itemPageMapping') || '{}');
                            var nextPage = itemMap[itemId] || 1;
                            var nextFragment;

                            // If we do not come from a PDP, we stop the loop.
                            if (!latestProductVisited) {
                                return true;
                            }

                            // If the current nextPage value is equal than the previous attempt, we stop the loop.
                            if (String(globalStorage.getItem('nextPage.' + itemId)) === String(nextPage)) {
                                return true;
                            }
                            globalStorage.setItem('nextPage.' + itemId, nextPage);

                            if (pageValues) {
                                nextFragment = fragment.replace(pageRegExp, pageValues[1] + 'page=' + nextPage);
                            } else {
                                nextFragment = fragment + (fragment.indexOf('?') !== -1 ? '&' : '?') + 'page=' + nextPage;
                            }
                            return Backbone.history.navigate(nextFragment, { trigger: true });
                        }
                    );
                });

                layout.on('itemListRendered', function itemListRendered() {
                    if (!cellPromise) {
                        return true;
                    }
                    return latestProductFound ? cellPromise.resolve() : cellPromise.reject();
                });

                layout.on('cellRendered', function cellRendered(itemId) {
                    if (itemId === latestProductVisited) {
                        latestProductFound = true;
                    } else {
                        latestProductFound = latestProductFound || false;
                    }
                });

                layout.on('afterAppendView', function afterAppendView() {
                    layoutPromise.resolve();
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


};

extensions['ACS.StrikeThroughPrice.1.0.0'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/ACS/StrikeThroughPrice/1.0.0/' + asset;
}

define('ACS.StrikeThrough.Prices.Helper', [
    'Utils',
    'underscore'
], function ACSStrikeThroughPricesHelper(
    Utils,
    _
) {
    'use strict';

    return {
        getComparePriceInfo: function getComparePriceInfo(options) {
            var onlinePriceInfo = this.getOnlinePrice(options);

            if (!_.isEmpty(onlinePriceInfo) && options.context.price < onlinePriceInfo.actualOnlinePrice) {
                return onlinePriceInfo;
            }
            return false;
        },

        isMatrixItem: function isMatrixItem(context) {
            var item = context && context.model && context.model.item;
            return item && item.matrixchilditems_detail && item.matrixchilditems_detail.length;
        },

        isPLP: function isPLP(PLPComponent) {
            return !_.isEmpty(PLPComponent.getItemsInfo());
        },

        isPDP: function isPDP(PDPComponent) {
            return !_.isEmpty(PDPComponent.getItemInfo());
        },

        getOnlinePrice: function getOnlinePrice(options) {
            var onlinePriceInfo = {};
            var item = options.context.model && options.context.model.item;
            var matrixChildren;

            if (options.isPDPView) {
                matrixChildren = options.PDPComponent.getSelectedMatrixChilds();

                if (matrixChildren && matrixChildren.length === 1) {
                    item = _.first(matrixChildren);
                }
            }

            if (item && item[options.priceLevel]) {
                onlinePriceInfo.actualOnlinePrice = item[options.priceLevel];
                onlinePriceInfo.actualOnlinePriceFormatted = item[options.priceLevel + '_formatted'] || Utils.formatCurrency(onlinePriceInfo.actualOnlinePrice);
                onlinePriceInfo.showComparePrice = true;
            }
            return onlinePriceInfo;
        }
    };
});


/* eslint-disable max-len */
define('StrikeThroughPrice', [
    'ACS.StrikeThrough.Prices.Helper'
], function StrikeThroughPrice(
    PriceHelper
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var PDPComponent = container.getComponent('PDP');
            var PLPComponent = container.getComponent('PLP');
            var Environment = container.getComponent('Environment');
            var layout = container.getComponent('Layout');
            var onlinePriceInfo;
            var priceLevel = Environment.getConfig('priceLevel.default');

            if (layout && PLPComponent && PDPComponent) {
                layout.addToViewContextDefinition('ProductViews.Price.View', 'comparePrice', 'number', function productViewsPriceComparePrice(context) {
                    if (PriceHelper.isMatrixItem(context) && !context.isPriceRange && context.price) {
                        if (PriceHelper.isPLP(PLPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel
                            });
                        } else if (PriceHelper.isPDP(PDPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel,
                                isPDPView: true,
                                PDPComponent: PDPComponent
                            });
                        }
                        context.comparePrice = onlinePriceInfo ? onlinePriceInfo.actualOnlinePrice : context.comparePrice;
                    }
                    return context.comparePrice;
                });

                layout.addToViewContextDefinition('ProductViews.Price.View', 'comparePriceFormatted', 'string', function productViewsPriceComparePriceFormatted(context) {
                    if (PriceHelper.isMatrixItem(context) && !context.isPriceRange && context.price) {
                        if (PriceHelper.isPLP(PLPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel
                            });
                        } else if (PriceHelper.isPDP(PDPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel,
                                isPDPView: true,
                                PDPComponent: PDPComponent
                            });
                        }
                        context.comparePriceFormatted = onlinePriceInfo ? onlinePriceInfo.actualOnlinePriceFormatted : context.comparePriceFormatted;
                    }
                    return context.comparePriceFormatted;
                });

                layout.addToViewContextDefinition('ProductViews.Price.View', 'showComparePrice', 'boolean', function productViewsPriceShowComparePrice(context) {
                    if (PriceHelper.isMatrixItem(context) && !context.isPriceRange && context.price) {
                        if (PriceHelper.isPLP(PLPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel
                            });
                        } else if (PriceHelper.isPDP(PDPComponent)) {
                            onlinePriceInfo = PriceHelper.getComparePriceInfo({
                                context: context,
                                priceLevel: priceLevel,
                                isPDPView: true,
                                PDPComponent: PDPComponent
                            });
                        }
                        context.showComparePrice = onlinePriceInfo ? onlinePriceInfo.showComparePrice : context.showComparePrice;
                    }
                    return context.showComparePrice;
                });
            }
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


define('ThemeHelper.ProductViews.Price.View', [
    'ProductViews.Price.View',
    'themehelper_product_views_price.tpl',
    'underscore'
], function ThemeHelperProductViewsPriceView(
    ProductViewsPriceView,
    Template,
    _
) {
    'use strict';

    _.extend(ProductViewsPriceView.prototype, {
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

extensions['SuiteLabs.WishlistNotifyText.1.0.1'] = function(){

function getExtensionAssetsPath(asset){
	return 'extensions/SuiteLabs/WishlistNotifyText/1.0.1/' + asset;
}

define('WishlistNotifyText', [
    'ProductList.Control.View',
    'wishlist_notify_text_product_list_control.tpl',
    'underscore'
], function WishlistNotifyText(
    ProductListControlView,
    WishlistNotifyTextTpl,
    _
) {
    'use strict';

    _.extend(ProductListControlView.prototype, {
        render: _.wrap(ProductListControlView.prototype.render, function render(fn) {
            if (this.template.Name !== 'themehelper_product_list_control') {
                this.template = WishlistNotifyTextTpl;
            }

            return fn.apply(this, _.toArray(arguments).slice(1));
        })
    });

    return {
        mountToApp: function mountToApp(container) {
            var pdpComponent = container.getComponent('PDP');

            if (pdpComponent) {
                pdpComponent.addToViewContextDefinition('ProductList.Control.View', 'showNotifyLaterText', 'boolean', function showNotifyLaterText() {
                    var iteminfo = pdpComponent.getItemInfo();
                    var stockStatus = iteminfo.item.custitemstockstatus;
                    return stockStatus === 'On Backorder';
                });
            }
        }
    };
});


};

SC.ENVIRONMENT.EXTENSIONS_JS_MODULE_NAMES = ["ItemRelations.Finishes.Collection","ItemRelations.Finishes.View","ItemRelations.Related.Finishes.Collection","ProductDetails.View.Site","BackbonePluginInstaller","CoolingCalculator.Results.View","CoolingCalculator.View","CoolingCalculator.Results.Model",["N/search","N/runtime","N/file","N/log"],"CustomForms.Form.View","CustomForms.Model","CustomForms.View","External.SimpleLightbox","jQuery.lightboxZoom","SuiteLabs.EnhancedPDP.Gallery.View","Product.Option.Model.MaxLength","GlobalViews.StarRating.View.EPR","ProductDetails.Full.View.EPR","ProductReviews.Center.View.EPR","Facets.ItemCell.View.EPR","EnhancedSearch.View","EnhancedSearch.Model",["N/log","N/search"],"EnhancedSearch.View","HeaderReorganization.Header.Profile.View","ItemOptionsFieldHelp.View","Facets.Translator.ItemResultsSorting","Klaviyo.Tracker","Utils.Extend","OptionsAndUpgrades.ItemRelations.Related.View","OptionsAndUpgrades.ItemRelations.RelatedItem.View","OptionsAndUpgrades.ProductDetails.Full.View","OptionsAndUpgrades.LiveOrder.Model","PayPalOptions.View","PayPalOptions.Cart.Summary.View","PayPalOptions.PDP.View","PepperJamTracker","ProductBanner.View","SearchRecommendations.View","Cart.Detailed.View.Site","Cart.ShippingMethodForm.View.Site","Cart.Summary.View.Site","ShippingMethodExtension.View","OrderWizard.SignifydTracker","SignifydTracker","SignifydTracker.Model","SignifydTrackerExtension.Checkout","Facets.ItemCell.View.Extension","ACS.StrikeThrough.Prices.Helper","ThemeHelper.ProductDetails.Full.View","ThemeHelper.Cart.Lines.View","ThemeHelper.ProductDetails.QuickView.View","ThemeHelper.Transaction.Line.Views.Cell.Navigable.View","ThemeHelper.Cart.Item.Summary.View","ThemeHelper.Facets.Browse.View","NSeComm.ThemeHelper.MyAccount","ThemeHelper.Transaction.Line.Views.Cell.Actionable.View","ThemeHelper.Cart.Summary.View","ThemeHelper.OrderWizard.Module.CartSummary","ThemeHelper.LoginRegister.Register.View","NSeComm.ThemeHelper.Checkout","ThemeHelper.Header.View","ThemeHelper.OrderWizard.Module.Address","ThemeHelper.CreditCard.Edit.Form.SecurityCode.View","ThemeHelper.CreditCard.Edit.Form.View","ThemeHelper.GoogleTagManager","ThemeHelper.Cart.Detailed.View","ThemeHelper.ProductReviews.Review.View","ThemeHelper.ProductDetails.Quantity.View","ThemeHelper.ProductHideAddToCart.Checker","ThemeHelper.ProductReviews.Center.View","ThemeHelper.Footer.View","ThemeHelper.ProductList.View","ThemeHelper.ProductViews.Price.View","ThemeHelper.Facets.FacetedNavigationItemCategory.View","ThemeHelper.Address.Edit.Fields.View"];
try{
	extensions['SSD.AvailableFinishesExtension.1.0.0']();
	SC.addExtensionModule('AvailableFinishesExtension');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.BackbonePluginInstaller.1.0.0']();
	SC.addExtensionModule('Backbone.PluginInstaller');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.CoolingCalculator.1.0.2']();
	SC.addExtensionModule('SuiteLabs.CoolingCalculator.Main');
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
	extensions['SuiteLabs.CustomForms.2.0.0']();
	SC.addExtensionModule('SuiteLabs.CustomForms.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.DisplayPriceLevels.1.0.0']();
	SC.addExtensionModule('DisplayPriceLevels.EntryPoint');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.EnhancedPDP.1.0.3']();
	SC.addExtensionModule('SuiteLabs.EnhancedPDP');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.EnhancedProductReviews.1.0.1']();
	SC.addExtensionModule('SuiteLabs.Enhanced.ProductReviews.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.EnhancedSearch.1.0.0']();
	SC.addExtensionModule('EnhancedSearch');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.HeaderFiltering.1.0.0']();
	SC.addExtensionModule('HeaderFiltering');
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
	extensions['NSeComm.HideFacets.1.0.0']();
	SC.addExtensionModule('NSeComm.HideFacets.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.ItemBadgesErrorHandler.1.0.0']();
	SC.addExtensionModule('SuiteLabs.ItemBadgesErrorHandler');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.ItemOptionsFieldHelp.1.0.0']();
	SC.addExtensionModule('SuiteLabs.ItemOptionsFieldHelp.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.ItemResultsSorting.1.0.0']();
	SC.addExtensionModule('SuiteLabs.ItemResultsSorting.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.Klaviyo.1.0.0']();
	SC.addExtensionModule('SuiteLabs.Klaviyo.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.ManageScreenErrors.1.0.0']();
	SC.addExtensionModule('ManageShoppingErrors.Main');
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
	extensions['SuiteLabs.NavigablePromoItems.1.0.0']();
	SC.addExtensionModule('SuiteLabs.NavigablePromoItems');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.OptionsAndUpgrades.1.0.2']();
	SC.addExtensionModule('SuiteLabs.OptionsAndUpgrades.Main');
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
	extensions['SuiteLabs.PayPalOptions.1.0.1']();
	SC.addExtensionModule('SuiteLabs.PayPalOptions.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.PDPPageTitle.1.0.0']();
	SC.addExtensionModule('PDPPageTitle.View');
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
	extensions['SuiteLabs.ProductBanner.1.0.0']();
	SC.addExtensionModule('SuiteLabs.ProductBanner.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.QuoteButton.1.0.1']();
	SC.addExtensionModule('ProductDetailToQuote.View.Extend');
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
	extensions['ACS.RemoveYouMayAlsoLike.1.0.0']();
	SC.addExtensionModule('RemoveYouMayAlsoLike');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SuiteLabs.ResponsiveMerchZones.1.0.0']();
	SC.addExtensionModule('SuiteLabs.ResponsiveMerchZones.Main');
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
	extensions['SuiteLabs.SEOImagePatch.1.0.0']();
	SC.addExtensionModule('SuiteLabs.SEOImagePatch.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.ShippingMethodExtension.1.0.7']();
	SC.addExtensionModule('ShippingMethodExtension.Shopping');
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
	extensions['SuiteLabs.StickyScroll.1.0.4']();
	SC.addExtensionModule('SuiteLabs.StickyScroll.Main');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['SSD.StockStatusExtension.1.0.3']();
	SC.addExtensionModule('StockStatusExtension.Shopping');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['ACS.StrikeThroughPrice.1.0.0']();
	SC.addExtensionModule('StrikeThroughPrice');
}
catch(error)
{
	console.error(error);
}


try{
	extensions['NSeComm.ThemeHelper.1.0.18']();
	SC.addExtensionModule('NSeComm.ThemeHelper.Main');
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


try{
	extensions['SuiteLabs.WishlistNotifyText.1.0.1']();
	SC.addExtensionModule('WishlistNotifyText');
}
catch(error)
{
	console.error(error);
}

