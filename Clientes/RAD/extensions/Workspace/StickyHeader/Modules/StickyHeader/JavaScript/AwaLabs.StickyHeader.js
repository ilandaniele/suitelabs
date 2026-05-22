define('AwaLabs.StickyHeader', [
    'Header.View',
    'Profile.Model',
    'Header.Profile.View',
    'Header.Menu.MyAccount.View',
    'Handlebars',
    'jQuery'
], function AwaLabsStickyHeader(
    HeaderView,
    ProfileModel,
    HeaderProfileView,
    HeaderMenuMyAccountView,
    Handlebars,
    jQuery
) {
    'use strict';
    return {
        mountToApp: function mountToApp(container) {
            var Layout;
            /* eslint-disable no-underscore-dangle */
            if (container.layout) {
                Layout = container.getLayout();
                /* eslint-enable no-underscore-dangle */
                Layout.once('afterAppendView', function afterAppendView() {
                    jQuery(document).on('scroll', function stickyScroll() {
                        var $headerMainNavWrapper;
                        var $headerMainWrapper;
                        if (jQuery('html').hasClass('ns_is-edit')) {
                            return;
                        }

                        $headerMainNavWrapper = Layout.$('#site-header');
                        $headerMainWrapper = Layout.$('.header-main-wrapper');

                        $headerMainWrapper.css({
                            'minHeight': $headerMainWrapper.height()
                        });


                        if (jQuery(document).scrollTop() > 0) {
                            $headerMainNavWrapper.addClass('sticky-header');
                            $headerMainNavWrapper.next().addClass('less-padding');
                        } else {
                            $headerMainNavWrapper.removeClass('sticky-header');
                            $headerMainNavWrapper.next().removeClass('less-padding');
                        }
                    });
                });
            }
        }
    };
});
