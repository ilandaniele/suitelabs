// @module NSeComm.RelatedCategories.Main
define('NSeComm.RelatedCategories.Main.View', [
    'nsecomm_relatedcategories_main.tpl',
    'SCView'
    // 'underscore'
], function NSeCommRelatedCategoriesMainView(
  NseCommRelatedCategoriesMainTpl,
  SCViewComponent
  // _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function RelatedCategoriesView(options) {
        SCView.call(this);
        this.options = options || {};
        this.template = NseCommRelatedCategoriesMainTpl;
        this.attributes = {
            id: 'MyViewId',
            'class': 'my-view'
        };
        this.on('afterViewRender', this.afterRender, this);
        // in case you need to request data for item
        this.contextDataRequest = ['item'];
    }

  // @class NSeComm.RelatedCategories.Main.View @extends Backbone.View
    RelatedCategoriesView.prototype = Object.create(SCView.prototype);
    RelatedCategoriesView.prototype.constructor = RelatedCategoriesView;
    RelatedCategoriesView.prototype.getContext = function getContext() {
        var item = this.contextData.item();
        var relatedProducts;
        try {
            relatedProducts = JSON.parse(item.custitem_nssc_related_commerce_json);
        } catch (e) {
            relatedProducts = null;
        }

        return {
            relatedCategories: relatedProducts
        };
    };

    RelatedCategoriesView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        SCView.prototype.render.apply(self, args);
    };

    return RelatedCategoriesView;
});
