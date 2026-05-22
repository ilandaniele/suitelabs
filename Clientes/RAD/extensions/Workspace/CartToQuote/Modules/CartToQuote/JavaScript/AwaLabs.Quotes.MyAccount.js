define('AwaLabs.Quotes.MyAccount', [
    'ErrorManagement.PageNotFound.View',
    'Profile.Model',
    'MyAccountMenu',
    'Utils',
    'Quote.Collection',
    'MenuTree.View',
    'CartToQuote.RequestQuoteWizard.Module.Items',
    'CartToQuote.RequestQuoteWizard.Module.Items.Line.Action.View',
    'CartToQuote.RequestQuoteWizard',
    'CartToQuote.Transaction.Line.Views.Cell.Actionable.Expanded.View',
    'CartToQuote.RequestQuoteWizard.View',
    'CartToQuote.Module.Items.Line.Quantity.View'
], function AwaLabsQuotesMyAccount(
    PageNotFoundView,
    ProfileModel,
    MyAccountMenu,
    Utils,
    QuoteCollection,
    MenuTreeView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(conteiner) {
            var profile = ProfileModel.getInstance();
            var pageType = conteiner.getComponent('PageType');
            var layout = conteiner.getComponent('Layout');
            var environment = conteiner.getComponent('Environment');
            var menu = MyAccountMenu.getInstance();
            var quotesCollection = new QuoteCollection();
            var subEntryQuote = {
                entryId: 'orders',
                id: 'quotes',
                url: 'quotes',
                index: 5,
                permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
            };
            var SubEntryMarketWizard = {
                entryId: 'orders',
                id: 'marketwizard',
                url: 'request-a-quote',
                index: 6,
                name: Utils.translate('Market Wizard'),
                permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
            };
            var isLoggedIn = profile.get('isLoggedIn') === 'T' && profile.get('isGuest') === 'F';

            if (layout) {
                layout.addToViewContextDefinition('RequestQuoteWizard.Module.Message', 'message', 'string', function fn() {
                    return environment.getConfig('marketWizardTopMessage');
                });
                layout.addToViewContextDefinition('RequestQuoteWizard.Module.Header', 'title', 'string', function fn() {
                    return Utils.translate('Market Wizard');
                });
            }

            if (isLoggedIn && profile.get('isTrade')) {
                menu.addSubEntry(SubEntryMarketWizard);
                quotesCollection.fetch().done(function doneFn() {
                    subEntryQuote.name = quotesCollection.length > 0 ? Utils.translate('Quotes($(0))', quotesCollection.length) : Utils.translate('Quotes');
                    menu.addSubEntry(subEntryQuote);
                    MenuTreeView.getInstance().updateMenuItemsUI();
                });
            } else {
                pageType.registerPageType({
                    'name': 'Quotes',
                    'routes': ['quotes', 'quotes?:options', 'quotes/:id', 'request-quote-wizard'],
                    'view': PageNotFoundView,
                    'defaultTemplate': {
                        'name': 'error_management_page_not_found.tpl',
                        'displayName': 'Page not found'
                    }
                });
            }
        }

    };
});
