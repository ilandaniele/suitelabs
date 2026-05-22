define('OptionsAndUpgrades.LiveOrder.Model', [
    'LiveOrder.Model',
    'LiveOrder.Line.Model',
    'jQuery',
    'underscore'
], function OAULiveOrderModel(
    LiveOrderModel,
    LiveOrderLineModel,
    jQuery,
    _
) {
    'use strict';

    var debugMode = false;

    _(LiveOrderModel.prototype).extend({
        addLines: _(LiveOrderModel.prototype.addLines).wrap(
            function addLines(fn, lines) {
                var itemsQueueSelector = 'input[name="relateditems_queue"]';
                var relatedItemIds = [];

                try {
                    _(lines).each(function eachLine(line) {
                        var parentId = String(line.get('item').get('internalid'));

                        if (SC.SESSION.oauAddToCart && SC.SESSION.oauAddToCart[parentId]) {
                            relatedItemIds = relatedItemIds.concat(
                                _(SC.SESSION.oauAddToCart[parentId]).toArray()
                            );
                            delete SC.SESSION.oauAddToCart[parentId];
                        }
                    });

                    relatedItemIds.forEach(function eachId(itemId) {
                        jQuery(itemsQueueSelector + '[data-item-id="' + itemId + '"]').prop('checked', false).prop('disabled', true);
                        lines.unshift(
                            LiveOrderLineModel.createFromOuterLine({
                                quantity: 1,
                                item: { internalid: itemId }
                            })
                        );
                    });
                } catch (e) { if (debugMode) { console.log(e.message); } }

                return fn.apply(this, _(arguments).toArray().slice(1)).then(function afterAddLines() {
                    relatedItemIds.forEach(function eachId(itemId) {
                        jQuery(itemsQueueSelector + '[data-item-id="' + itemId + '"]').prop('disabled', false);
                    });
                });
            }
        )
    });

    return LiveOrderModel;
});
