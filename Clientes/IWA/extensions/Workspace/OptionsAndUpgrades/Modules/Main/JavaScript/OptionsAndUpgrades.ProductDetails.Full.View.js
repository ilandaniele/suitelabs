define('OptionsAndUpgrades.ProductDetails.Full.View', [
    'ProductDetails.Full.View',
    'SC.Configuration',
    'jQuery',
    'underscore'
], function OAUProductDetailsFullView(
    ProductDetailsFullView,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    _(ProductDetailsFullView.prototype).extend({
        initialize: _(ProductDetailsFullView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.configuration = Configuration.get('optionsAndUpgrades') || {};
                this.on('afterCompositeViewRender', _(this.afterRender).bind(this));

                return init;
            }
        ),

        events: _(ProductDetailsFullView.prototype.events || {}).extend({
            'click [data-action="toRelated"]': 'scrollToRelated'
        }),

        scrollToRelated: function scrollToRelated(e) {
            jQuery('html, body').animate({
                scrollTop: jQuery('[data-container="oau"]').offset().top - 20
            }, 200);
            return e.preventDefault() || e.stopPropagation();
        },

        afterRender: function afterRender() {
            var isOAU;

            try {
                isOAU = this.options.model.get('item').get(
                    this.configuration.itemFieldId
                );
                if (isOAU && this.configuration.enableRelatedItemsScrollToLink) {
                    this.$el.find('[data-view="StockDescription"]').prepend(
                        '<div><a class="to-related" href="#" data-action="toRelated">' + this.configuration.relatedItemsTitle + '</a></div>'
                    );
                }
            } catch (e) { if (debugMode) { console.log(e.message); } }
        }
    });

    return ProductDetailsFullView;
});
