define('BrandsPage.List.Collection.View', [
    'SCCollectionView',
    'BrandsPage.List.Details.View',
    'brandspage_collection.tpl',
    'underscore'
], function (
    SCCollectionViewModule,
    BrandsPageListDetailsView,
    BrandsPageCollectionTpl,
    _
) {
    'use strict';

    var SCCollectionView = SCCollectionViewModule.SCCollectionView;

    function BrandsPageListCollectionView(options) {
        SCCollectionView.call(this, options.collection);
        this.collection = options.collection;
        // console.log('this.collection', this.collection)
        _.sortBy(this.collection.models, 'sortorder');

        // console.log('this.models', _.sortBy(this.collection.models,'sortorder'))
        this.template = BrandsPageCollectionTpl;
    }

    BrandsPageListCollectionView.prototype = Object.create(SCCollectionView.prototype);
    BrandsPageListCollectionView.prototype.constructor = BrandsPageListCollectionView;

    BrandsPageListCollectionView.prototype.getCellViewsPerRow = function () {
        return 1;
    };

    BrandsPageListCollectionView.prototype.getCellViewInstance = function (model) {
        return new BrandsPageListDetailsView({
            model: model
        });
    };

    BrandsPageListCollectionView.prototype.getContext = function () {
        return {};
    };

    return BrandsPageListCollectionView;
});
