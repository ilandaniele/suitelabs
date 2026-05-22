define('AwaLabs.PLPColorRelations', [
    'Utils',
    'underscore'
], function AwaLabsPLPColorRelations(
    Utils,
    _
) {
    'use strict';

    return {
        plp: null,
        environment: null,
        getItem: function getItem(itemId) {
            var items = (this.plp) ? this.plp.getItemsInfo() : [];
            return _.findWhere(items, {
                internalid: itemId
            });
        },
        getItemOptionsAndFilters: function getItemOptionsAndFilters(itemId) {
            var currentFilters = (this.plp) ? this.plp.getFilters() : [];
            var multiImageOptionConfig = this.environment.getConfig('productline.multiImageOption') || [];
            var item = this.getItem(itemId);
            var itemOption;
            var itemData = [];

            if (item) {
                if (currentFilters && currentFilters.length) {
                    _.each(currentFilters, function eachFilter(filter) {
                        itemOption = _.findWhere(item.options, {
                            itemOptionId: filter.id
                        });
                        if (itemOption) {
                            itemData.push({
                                itemOption: itemOption,
                                filter: filter,
                                filterImage: (_.contains(multiImageOptionConfig, itemOption.cartOptionId))
                            });
                        }
                    });
                }
            }
            return itemData;
        },
        getThumbnail: function getThumbnail(thumbnail, itemId) {
            var defaultThumbnail = thumbnail;
            var item = this.getItem(itemId);
            var itemOptionData = this.getItemOptionsAndFilters(itemId);
            var itemImages;
            var imagesContainer = {};
            var images = [];

            var filterValue;
            var filterLabel;
            var optionValue;
            var self = this;

            if (item) {
                itemImages = item.itemimages_detail;

                _.each(itemOptionData, function each(optionData) {
                    if (optionData.filterImage) {
                        filterValue = optionData.filter.value;
                        filterLabel = self.plp.current_view.translator.getLabelForValue(optionData.filter.id, filterValue);
                        optionValue = _.find(optionData.itemOption.values, function find(value) {
                            return value.label === filterLabel;
                        });
                        if (itemImages) {
                            imagesContainer = (item.itemimages_detail[optionValue.label]) ?
                                item.itemimages_detail[optionValue.label] :
                                item.itemimages_detail;
                            images.push(Utils.imageFlatten(imagesContainer));
                        }
                    }
                });

                if (images && images.length) {
                    images = _.flatten(images);
                }
            }

            return images.length ? this.getFirstImage(images) : (this.getDefaultImage(item) || defaultThumbnail);
        },
        getFirstImage: function getFirstImage(flattenedImages) {
            var i;
            var detail;
            var splitted;
            for (i = 0; i < flattenedImages.length; i++) {
                detail = flattenedImages[i];
                splitted = detail.url.split('.');
                if (splitted[splitted.length - 2] === 'default') {
                    return detail;
                }
            }
            return flattenedImages[0];
        },
        getDefaultImage: function getDefaultImage(model) {
            var image = model && model.keyMapping_images[0];
            var preferedOptions = [];
            var preferedOption;
            if (model && model.custitem_sc_prefered_options) {
                preferedOptions = model.custitem_sc_prefered_options.split('_');
            }
            if (preferedOptions && preferedOptions.length > 0) {
                preferedOption = _.first(preferedOptions);
                if (model && model.itemimages_detail &&
                    model.itemimages_detail[preferedOption] &&
                    model.itemimages_detail[preferedOption].urls &&
                    model.itemimages_detail[preferedOption].urls.length > 0) {
                    image = model.itemimages_detail[preferedOption].urls[0];
                }
            }
            return image;
        },
        getUrl: function getUrl(currentUrl, itemId) {
            var url = currentUrl;
            var itemOptionData = this.getItemOptionsAndFilters(itemId);
            var filterValue;
            var filterLabel;
            var optionValue;
            var self = this;

            if (itemOptionData && itemOptionData.length) {
                _.each(itemOptionData, function each(optionData) {
                    filterValue = optionData.filter.value;
                    filterLabel = self.plp.current_view.translator.getLabelForValue(optionData.filter.id, filterValue);
                    optionValue = _.find(optionData.itemOption.values, function find(value) {
                        // return value.label.split(' ').join('-') === filterValue;
                        return value.label === filterLabel;
                    });
                    // TODO: Review if applicable more than one facet.
                    if (optionValue && optionValue.url) {
                        url = optionValue.url;
                    }
                });
            }
            return url;
        },
        mountToApp: function mountToApp(container) {
            var self = this;
            var layout = container.getComponent('Layout');

            this.plp = container.getComponent('PLP');
            this.environment = container.getComponent('Environment');

            if (layout) {
                layout.addToViewContextDefinition('Facets.ItemCell.View', 'url', 'string', function colorRelations(context) {
                    var currentUrl = context.url;
                    var itemId = context.itemId;
                    return self.getUrl(currentUrl, itemId);
                });
                layout.addToViewContextDefinition('Facets.ItemCell.View', 'thumbnail', 'string', function colorRelations(context) {
                    var thumbnail = context.thumbnail;
                    var itemId = context.itemId;
                    return self.getThumbnail(thumbnail, itemId);
                });
            }
        }
    };
});
