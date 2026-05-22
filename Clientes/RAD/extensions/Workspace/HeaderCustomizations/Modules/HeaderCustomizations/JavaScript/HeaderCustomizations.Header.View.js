define('HeaderCustomizations.Header.View', [
    'Header.View',
    'underscore',
    'jQuery'
], function HeaderCustomizationsHeaderView(
    HeaderView,
    _,
    jQuery
) {
    'use strict';

    _.extend(HeaderView.prototype, {
        initialize: _.wrap(HeaderView.prototype.initialize, function initialize(fn) {
            var self = this;
            fn.apply(this, _.toArray(arguments).slice(1));
            jQuery(window).on('price_change', function priceChange() {
                self.render();
            });
        })
    });
});
