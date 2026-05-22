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
