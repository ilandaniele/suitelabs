define('AwaLabs.OrderStatusImprovements', [
    'Utils',
    'underscore'
], function AwaLabsOrderStatusImprovements(
    Utils,
    _
) {
    'use strict';

    var orderFinderModel;
    var orderFinderModelOriginalUrl;
    var OrderStatusImprovementsConfig;
    var imageNotAvailableConfig;
    var multiImageOptionConfig;

    try {
        orderFinderModel = require('SuiteCommerce.OrderStatus.OrderFinder.Order.Model'); // eslint-disable-line global-require
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    }

    if (orderFinderModel && _.isFunction(orderFinderModel)) {
        orderFinderModelOriginalUrl = orderFinderModel.prototype.urlRoot;
        _.extend(orderFinderModel.prototype, {
            urlRoot: function urlRoot() {
                var modelURL = orderFinderModelOriginalUrl;
                if (OrderStatusImprovementsConfig && OrderStatusImprovementsConfig.enable) {
                    modelURL = Utils.getAbsoluteUrl(getExtensionAssetsPath('services/OrderStatusImprovements.Service.ss'));
                }
                return modelURL;
            },
            parse: function parse(response) {
                var self = this;
                var itemDetails = response.details && response.details.itemDetails;

                if (OrderStatusImprovementsConfig && OrderStatusImprovementsConfig.enable) {
                    _.each(itemDetails, function each(details) {
                        details.thumbnail = (details.item) ? self.getThumbnail(details.item) : {
                            url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                                'img/no_image_available.jpeg',
                                imageNotAvailableConfig
                            ),
                            altimagetext: details.name
                        };
                    });
                }

                return response;
            },
            filterImages: function filterImages(itemImagesDetail, imageOptionFilters, itemOptions, selectedOption) {
                var imagesContainer = itemImagesDetail;
                var selectedOptionFilter;
                var labelOption;
                var label;

                _.each(imageOptionFilters, function each(imageFilter) {
                    selectedOptionFilter = _.findWhere(itemOptions.fields, {
                        internalid: imageFilter
                    });

                    if (selectedOptionFilter && selectedOptionFilter.values) {
                        if (selectedOption && selectedOption[selectedOptionFilter.sourcefrom]) {
                            labelOption = _.find(selectedOptionFilter.values, function find(option) {
                                return option.label && option.label.toLowerCase() === selectedOption[selectedOptionFilter.sourcefrom].toLowerCase();
                            });
                            label = labelOption && labelOption.label;

                            _.each(imagesContainer, function eachImageContainer(value, key) {
                                if (key.toLowerCase() === label) {
                                    imagesContainer = value;
                                }
                            });
                        }
                    }
                });

                return imagesContainer;
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
            getThumbnail: function getThumbnail(itemData) {
                var item = (itemData.matrix_parent) ? itemData.matrix_parent : itemData;
                var itemImagesDetail = item.itemimages_detail || {};
                var imageFilters = multiImageOptionConfig;
                var images = [];
                var imagesContainer = {};
                var selectedOption = _.find(item.matrixchilditems_detail, function find(option) {
                    return option.internalid === itemData.internalid;
                });

                if (itemImagesDetail.thumbnail) {
                    imagesContainer = this.filterImages(itemImagesDetail.thumbnail, imageFilters, item.itemoptions_detail, selectedOption);
                    images = Utils.imageFlatten(imagesContainer);
                    return this.getFirstImage(images) || itemImagesDetail.thumbnail;
                }

                itemImagesDetail = itemImagesDetail.media || itemImagesDetail;
                imagesContainer = this.filterImages(itemImagesDetail, imageFilters, item.itemoptions_detail, selectedOption);
                images = Utils.imageFlatten(imagesContainer);

                return images.length ? this.getFirstImage(images) : {
                    url: Utils.getThemeAbsoluteUrlOfNonManagedResources(
                        'img/no_image_available.jpeg',
                        imageNotAvailableConfig
                    ),
                    altimagetext: item.displayname
                };
            }
        });
    }

    return {
        mountToApp: function mountToApp(container) {
            var environment = container.getComponent('Environment');
            OrderStatusImprovementsConfig = environment.getConfig('OrderStatusImprovements');
            imageNotAvailableConfig = environment.getConfig('imageNotAvailable');
            multiImageOptionConfig = environment.getConfig('productline.multiImageOption') || [];
        }
    };
});
