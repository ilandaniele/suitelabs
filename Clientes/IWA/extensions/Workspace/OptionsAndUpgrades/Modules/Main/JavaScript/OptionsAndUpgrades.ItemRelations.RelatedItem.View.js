define('OptionsAndUpgrades.ItemRelations.RelatedItem.View', [
    'ItemRelations.RelatedItem.View',
    'oau_item_relations_related_item.tpl',
    'SC.Configuration',
    'jQuery',
    'underscore'
], function OAUItemRelationsRelatedItemView(
    ItemRelationsRelatedItemView,
    itemRelationsRelatedItemTpl,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    _(ItemRelationsRelatedItemView.prototype).extend({
        initialize: _(ItemRelationsRelatedItemView.prototype.initialize).wrap(
            function initialize(fn) {
                var init = fn.apply(this, _(arguments).toArray().slice(1));

                this.configuration = Configuration.get('optionsAndUpgrades') || {};
                this.on('afterCompositeViewRender', _(this.afterRender).bind(this));

                return init;
            }
        ),

        isOAU: function isOAU() {
            try {
                return this.parentView.parentView.options.model.get('item').get(
                    this.configuration.itemFieldId
                );
            } catch (e) { if (debugMode) { console.log(e.message); } }

            return false;
        },

        events: _(ItemRelationsRelatedItemView.prototype.events || {}).extend({
            'change [data-action="add"]': 'addToCart'
        }),

        addToCart: function addToCart(e) {
            var itemId = this.model.get('internalid');
            var isChecked = this.$(e.target).is(':checked');
            var parentId;

            if (!this.$(e.target).length) {
                this.$('[data-action="add"]').click();
            } else {
                parentId = String(this.parentView.options.itemsIds);

                SC.SESSION.oauAddToCart = SC.SESSION.oauAddToCart || {};
                SC.SESSION.oauAddToCart[parentId] = SC.SESSION.oauAddToCart[parentId] || {};
                if (isChecked) {
                    SC.SESSION.oauAddToCart[parentId][itemId] = itemId;
                } else {
                    delete SC.SESSION.oauAddToCart[parentId][itemId];
                }
            }
            return e.preventDefault() || e.stopPropagation();
        },

        afterRender: function afterRender() {
            // Do nothing
        },

        render: _(ItemRelationsRelatedItemView.prototype.render).wrap(
            function render(fn) {
                try {
                    this.template = this.isOAU() ? itemRelationsRelatedItemTpl : this.template;
                } catch (e) { if (debugMode) { console.log(e.message); } }

                return fn.apply(this, _(arguments).toArray().slice(1));
            }
        ),

        getContext: _(ItemRelationsRelatedItemView.prototype.getContext).wrap(
            function getContext(fn) {
                var context = fn.apply(this, _(arguments).toArray().slice(1));
                var isRelatedView = this.parentView && this.parentView.isRelatedView;
                var date = new Date();

                if (this.isOAU()) {
                    context = _(context).extend({
                        showATC: isRelatedView,
                        noImages: isRelatedView && this.configuration.hideProductImage,
                        addToCartText: isRelatedView && this.configuration.addToCartText,
                        timestamp: date.getTime()
                    });
                }
                return context;
            }
        )
    });

    return ItemRelationsRelatedItemView;
});
