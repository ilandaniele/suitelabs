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
