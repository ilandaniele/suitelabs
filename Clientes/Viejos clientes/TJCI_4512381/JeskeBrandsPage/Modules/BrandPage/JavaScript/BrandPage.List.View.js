// @module PSeComm.JeskeBrandsPage.BrandPage
define('BrandPage.List.View', [
    'PageType.Base.View',
    'BrandsPage.List.Collection',
    'BrandsPage.List.Collection.View',
    'brands_list.tpl'],
    function BrandPageListView(
        PageTypeBaseView,
        BrandsPageListCollection,
        BrandsPageListCollectionView,
        BrandsListTpl) {
        'use strict';

        // @class PSeComm.JeskeBrandsPage.BrandPage.View @extends Backbone.View
        return PageTypeBaseView.PageTypeBaseView.extend({
            template: BrandsListTpl,
            initialize: function initialize() {
                this.collection = new BrandsPageListCollection();
            },
            beforeShowContent: function beforeShowContent() {
                this.childViews = {
                    'BrandsPage.List.Collection.View': function () {
                        return new BrandsPageListCollectionView({
                            collection: this.collection
                        });
                    }
                };
                return this.collection.fetch();
            }
        });
    });
