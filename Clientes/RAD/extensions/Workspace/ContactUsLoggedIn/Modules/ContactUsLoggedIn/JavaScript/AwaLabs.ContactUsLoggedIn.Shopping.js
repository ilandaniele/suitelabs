define('AwaLabs.ContactUsLoggedIn.Shopping', [
    'ContactUsLoggedIn.Page.View'
], function ContactUsLoggedIn(
    ContactUsLoggedInPageView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var pageType = container.getComponent('PageType');

            if (pageType) {
                pageType.registerPageType({
                    name: 'contact-us',
                    view: ContactUsLoggedInPageView,
                    routes: ['contact-us']
                });
            }
        }
    };
});
