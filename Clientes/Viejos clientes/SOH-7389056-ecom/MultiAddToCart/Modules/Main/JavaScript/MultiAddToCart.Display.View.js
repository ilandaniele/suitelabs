define('MultiAddToCart.Display.View', [
    'SCView',
    'multiaddtocart_display.tpl'
], function MultiAddToCartDisplayViewModule(
    SCViewModule,
    multiaddtocartDisplayTpl
) {
    'use strict';

    var SCView = SCViewModule.SCView;

    function MultiAddToCartDisplayView(options) {
        SCView.call(this, options);

        this.model = options.model;

        this.template = multiaddtocartDisplayTpl;

        this.model.on('change:items', this.render, this);
    }

    MultiAddToCartDisplayView.prototype = Object.create(SCView.prototype);
    MultiAddToCartDisplayView.prototype.constructor = MultiAddToCartDisplayView;

    MultiAddToCartDisplayView.prototype.getContext = function getContext() {
        var items = this.model.get('items') || [];
        var hasItemSelected = items && items.length > 0;

        return {
            model: this.model,
            items: items,
            hasItemSelected: hasItemSelected
        };
    };

    return MultiAddToCartDisplayView;
});
