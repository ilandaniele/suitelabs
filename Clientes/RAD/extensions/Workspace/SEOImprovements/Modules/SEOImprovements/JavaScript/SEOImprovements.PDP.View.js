define('SEOImprovements.PDP.View', [
    'ProductDetails.ImageGallery.View',
    'ProductDetails.Full.View',
    'underscore',
    'jQuery',
    'Configuration'
], function fnSEOImprovementsPDPView(
    ProductDetailsImageGalleryView,
    ProductDetailsFullView,
    _,
    jQuery,
    Configuration
) {
    'use strict';

    _.extend(ProductDetailsImageGalleryView.prototype, {
        getContext: _.wrap(ProductDetailsImageGalleryView.prototype.getContext, function getContext(fn) {
            var originalRet = fn.apply(this, _.toArray(arguments).slice(1));
            var self = this;
            _.each(originalRet.images, function eachImg(image) {
                if (!image.altimagetext) {
                    image.altimagetext = self.model.getItem().get('keyMapping_name');
                }
            });
            return originalRet;
        })
    });

    _.extend(ProductDetailsFullView.prototype, {
        getMetaDescription: _.wrap(ProductDetailsFullView.prototype.getMetaDescription, function getMetaDescription(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            var descriptionFieldId;
            var descriptionField;
            var div;
            var descriptionText;

            if (!ret) {
                descriptionFieldId = Configuration.get('seo.productDescriptionField');
                //eslint-disable-next-line
                descriptionField = descriptionFieldId && this.model.get('item').get(descriptionFieldId) ? this.model.get('item').get(descriptionFieldId) : this.model.get('item').get('storedescription') || this.model.get('item').get('featureddescription');

                // To remove html tags
                div = document.createElement('div');
                div.innerHTML = descriptionField;
                descriptionText = div.innerText;

                return descriptionText;
            }
            return ret;
        }),
        getTitle: _.wrap(ProductDetailsFullView.prototype.getTitle, function getTitle(fn) {
            var ret = fn.apply(this, _.toArray(arguments).slice(1));
            return ret || (this.model && this.model.get('item') && this.model.get('item').get('_pageTitle'));
        })
    });
});
