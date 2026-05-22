define('OptionsAndUpgrades.ItemRelations.Related.View', [
    'ItemRelations.Related.View',
    'oau_item_relations_related.tpl',
    'SC.Configuration',
    'jQuery',
    'Utils',
    'underscore'
], function OAUItemRelationsRelatedView(
    ItemRelationsRelatedView,
    itemRelationsRelatedTpl,
    Configuration,
    jQuery,
    Utils,
    _
) {
    'use strict';

    var debugMode = false;

    _(ItemRelationsRelatedView.prototype).extend({
        initialize: _(ItemRelationsRelatedView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.isRelatedView = true;
                this.configuration = Configuration.get('optionsAndUpgrades') || {};
                this.on('afterCompositeViewRender', _(this.afterRender).bind(this));

                return init;
            }
        ),

        isOAU: function isOAU() {
            try {
                return this.parentView.options.model.get('item').get(
                    this.configuration.itemFieldId
                );
            } catch (e) { if (debugMode) { console.log(e.message); } }

            return false;
        },

        render: _(ItemRelationsRelatedView.prototype.render).wrap(
            function render(fn) {
                try {
                    this.template = this.isOAU() ? itemRelationsRelatedTpl : this.template;
                } catch (e) { if (debugMode) { console.log(e.message); } }

                return fn.apply(this, _(arguments).toArray().slice(1));
            }
        ),

        carouselInitialize: function carouselInitialize() {
            var config = this.options.application.getConfig();
            var carousel = this.$el.find('[data-type="carousel-items"]');
            var imgMinHeight;
            var carouselConfig = Configuration.get('bxSliderDefaults', {});

            if (carousel.length > 0) {
                if (Utils.isPhoneDevice() === false && (config.siteSettings.imagesizes || false)) {
                    imgMinHeight = (_.where(config.siteSettings.imagesizes || [], {
                        name: config.imageSizeMapping.thumbnail || ''
                    })[0]).maxheight;

                    carousel
                        .find('.item-relations-related-item-thumbnail')
                        .css('minHeight', imgMinHeight);
                }

                // Roll back to the slideWidth default value for this specific feature
                // using the PoshThemeExtension value (300) breaks the styling of the slider on this case
                carouselConfig.slideWidth = 228;
                carouselConfig.maxSlides = 5;

                Utils.initBxSlider(carousel, carouselConfig);
            }
        },

        afterRender: function afterRender() {
            var configuration = this.configuration;
            var $placeholder;

            if (this.isOAU()) {
                $placeholder = jQuery('[data-view="' + configuration.relatedItemsPlaceholder + '"]');

                if ($placeholder.length === 0) {
                    $placeholder = jQuery('[data-cms-area="' + configuration.relatedItemsPlaceholder + '"]');
                }

                if ($placeholder.length) {
                    if (configuration.relatedItemsPosition === 'first') {
                        $placeholder.prepend(this.$el);
                    } else {
                        $placeholder.append(this.$el);
                    }
                }
            }
        },

        getContext: _(ItemRelationsRelatedView.prototype.getContext).wrap(
            function getContext(fn) {
                var context = fn.apply(this, _(arguments).toArray().slice(1));
                var configuration = this.configuration || Configuration.get('optionsAndUpgrades') || {};

                if (this.isOAU()) {
                    context = _(context).extend({
                        relatedItemsTitle: this.configuration ? this.configuration.relatedItemsTitle : 'You may also like',
                        noImages: configuration.hideProductImage
                    });
                }
                return context;
            }
        )
    });

    return ItemRelationsRelatedView;
});
