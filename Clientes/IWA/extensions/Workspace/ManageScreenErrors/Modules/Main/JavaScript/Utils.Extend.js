
define('Utils.Extend', [
    'Utils',
    'jQuery',
    'underscore'
], function UtilsExtend(
    Utils,
    jQuery,
    _
) {
    'use strict';

    var isScreenScrolling = false;
    _.extend(Utils, {
        animatedScroll: function animatedScroll(element) {
            var top;
            this.animateToError();
            if (!this.isInCheckout()) {
                top = jQuery(element).offset().top;
                if (!isScreenScrolling && top) {
                    isScreenScrolling = true;
                    jQuery('html, body').animate({
                        scrollTop: top
                    }, 600, 'swing', function done() {
                        isScreenScrolling = false;
                    });
                }
            } else {
                this.animateToError();
            }
        },

        animateToError: function animateToError() {
            var messageError = jQuery('.global-views-message-error');
            if (messageError.length > 0 && messageError.length !== jQuery('.global-views-message-error [hidden]').length) {
                jQuery('html, body').animate({
                    scrollTop: jQuery('.global-views-message-error').offset().top
                }, 500);
            } else if (jQuery('p[data-validation-error]').length > 0) {
                jQuery('html, body').animate({
                    scrollTop: jQuery('p[data-validation-error]').closest('div[data-validation*="control-group"]').offset().top
                }, 500);
            }
        }
    });
});
