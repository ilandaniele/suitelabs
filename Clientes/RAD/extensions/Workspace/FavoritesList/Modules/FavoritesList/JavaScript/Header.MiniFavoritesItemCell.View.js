define('Header.MiniFavoritesItemCell.View', [
    'Configuration',
    'Transaction.Line.Views.Option.View',
    'Profile.Model',
    'Item.Model',
    'header_mini_favorites_item_cell.tpl',
    'underscore',
    'Backbone',
    'Backbone.CompositeView',
    'Backbone.CollectionView',
    'underscore',
    'Utils'
],
function HeaderMiniFavoritesItemCellView(
    Configuration,
    ItemViewsSelectedOptionView,
    ProfileModel,
    ItemDetailsModel,
    headerMiniFavoritesItemCellTpl,
    _,
    Backbone,
    BackboneCompositeView,
    BackboneCollectionView
) {
    'use strict';

    return Backbone.View.extend({
        template: headerMiniFavoritesItemCellTpl,
        initialize: function initialize() {
            var item = this.model.get('item');
            var itemDetails = new ItemDetailsModel(item);
            this.model.set('itemDetails', itemDetails);
            BackboneCompositeView.add(this);
        },
        childViews: {
            'Item.SelectedOptions': function ItemSelectedOptions() {
                return new BackboneCollectionView({
                    collection: this.model.get('itemDetails').getPosibleOptions(),
                    childView: ItemViewsSelectedOptionView,
                    viewsPerRow: 1,
                    childViewOptions: {
                        cartLine: this.model,
                        templateName: 'selected'
                    }
                });
            }
        },
        getContext: function getContext() {
            var line = this.model;
            var item = line.get('item');
            var itemDetails = line.get('itemDetails');
            var retailPricelevel = Configuration.get('priceTogglePriceToggle');
            var user = ProfileModel.getInstance();
            var useRetailPrices = user.get('isEnabledRetailPrices');
            return {
                loading: false,
                formattedPrice: useRetailPrices ? item[retailPricelevel + '_formatted'] : item.onlinecustomerprice_detail.onlinecustomerprice_formatted,
                name: item.displayname,
                itemType: item.itemtype,
                url: itemDetails.get('_thumbnail').url,
                altimagetext: itemDetails.get('_thumbnail').altimagetext,
                itemId: itemDetails.id,
                linkAttributes: itemDetails.getFullLink({
                    quantity: null,
                    location: null,
                    fulfillmentChoice: null
                }),
                quantity: line.get('quantity'),
                isPriceEnabled: !ProfileModel.getInstance().hidePrices()
            };
        }
    });
});
