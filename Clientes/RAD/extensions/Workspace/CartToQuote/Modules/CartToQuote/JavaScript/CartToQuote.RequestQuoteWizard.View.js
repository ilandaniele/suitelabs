define('CartToQuote.RequestQuoteWizard.View', [
    'RequestQuoteWizard.View',
    'underscore',
    'Utils'
], function CartToQuoteRequestQuoteWizardView(
    RequestQuoteWizardView,
    _,
    Utils
) {
    'use strict';

    _.extend(RequestQuoteWizardView.prototype, {
        getTitle: function getTitle() {
            return Utils.translate('Market Wizard');
        },
        getBreadcrumbPages: function getBreadcrumbPages() {
            return { href: '/request-a-quote', text: Utils.translate('Market Wizard') };
        }
    });
});
