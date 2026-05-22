define('AwaLabs.ProductGalleryAddons', [
    'ProductDetails.ImageGallery.View',
    'Utilities.ResizeImage',
    'Configuration',
    'Utils',
    'underscore',
    'fitVids'
], function AwaLabsProductGalleryVertical(
    ProductDetailsImageGalleryView,
    resizeImage,
    Configuration,
    Utils,
    _
) {
    'use strict';

    _.extend(ProductDetailsImageGalleryView.prototype, {
        initialize: _.wrap(ProductDetailsImageGalleryView.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            if (this.images && this.model && this.model.get('item') && this.model.get('item').get('custitem_ef_pdp_video_url')) {
                this.images.push({
                    altimagetext: _('Video').translate(),
                    url: this.model.get('item').get('custitem_ef_pdp_video_url'),
                    isVideo: true,
                    thumb: Utils.getAbsoluteUrl('img/default-video-thumbnail.jpg')
                });
                // If we have a video, we should remove image not available. And leave the video as main
                this.images = _.filter(this.images, function filterImages(image) {
                    return image.url !== Configuration.imageNotAvailable;
                });
                this.hasVideo = true;
            }
        }),
        initSlider: function initSlider() {
            var self = this;
            var $slider;
            var sliderOptions;
            var galleryHeight;
            var slidesNumber;
            var pagerSize;
            if (self.images.length > 1) {
                self.$slider = Utils.initBxSlider(self.$('[data-slider]'), {
                    buildPager: _.bind(self.buildSliderPager, self),
                    startSlide: 0,
                    adaptiveHeight: false,
                    touchEnabled: true,
                    nextText: '<a class="product-details-image-gallery-next-icon" data-action="next-image"></a>',
                    prevText: '<a class="product-details-image-gallery-prev-icon" data-action="prev-image"></a>',
                    controls: true,
                    infiniteLoop: false,
                    video: this.hasVideo,
                    useCSS: !this.hasVideo,
                    onSliderLoad: function onSliderLoad() {
                        if (!self.parentView.inModal) {
                            $slider = self.$('.bx-custom-pager');
                            galleryHeight = $slider.closest('.product-details-image-gallery').height() - 30;
                            pagerSize = $slider.width();
                            slidesNumber = Math.floor(galleryHeight / pagerSize);
                            sliderOptions = {
                                mode: 'vertical',
                                slideMargin: 0,
                                pager: false,
                                controls: true,
                                forceStart: true,
                                infiniteLoop: false,
                                wrapperClass: 'bx-wrapper product-details-image-gallery-thumbs',
                                minSlides: 1,
                                moveSlides: slidesNumber,
                                nextText: '<a class="product-details-image-gallery-thumbs-next-icon" data-action="next-image-vertical"></a>',
                                prevText: '<a class="product-details-image-gallery-thumbs-prev-icon" data-action="prev-image-vertical"></a>',
                                onSliderLoad: function onPagerSliderLoad() {
                                    self.$('[data-action="next-image-vertical"]').off();
                                    self.$('[data-action="prev-image-vertical"]').off();

                                    self.$('[data-action="next-image-vertical"]').click(_.bind(self.nextImageEventHandler, self));
                                    self.$('[data-action="prev-image-vertical"]').click(_.bind(self.previousImageEventHandler, self));

                                    self.$('[data-action="next-image-vertical"],[data-action="prev-image-vertical"]').click(function nextImage() {
                                        _.defer(function defer() {
                                            self.thumbSlider.goToSlide(Math.floor(self.$slider.getCurrentSlide()/slidesNumber) * slidesNumber);
                                        });
                                    });
                                }
                            };
                            self.thumbSlider = $slider.bxSlider(sliderOptions);
                        }
                    }
                });

                if (self.$('.bx-custom-pager').find('img').length) {
                    self.$('.bx-custom-pager').closest('[data-view="Product.ImageGallery"]').parent().addClass('has-vertical-images');
                }

                self.$('[data-action="next-image"]').off();
                self.$('[data-action="prev-image"]').off();


                self.$('[data-action="next-image"]').click(_.bind(self.nextImageEventHandler, self));
                self.$('[data-action="prev-image"]').click(_.bind(self.previousImageEventHandler, self));
            }
        },
        buildSliderPager: function buildSliderPager(slideIndex) {
            var image = this.images[slideIndex];
            if (image) {
                if (image.isVideo) {
                    return (
                        '<img src="' +
                        resizeImage(image.thumb, 'tinythumb') +
                        '" alt="' +
                        image.altimagetext +
                        '">'
                    );
                }
                return (
                    '<img src="' +
                    resizeImage(image.url, 'tinythumb') +
                    '" alt="' +
                    image.altimagetext +
                    '">'
                );
            }
            return '';
        }
    });

    return {};
});
