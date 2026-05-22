define('CartToQuote.RequestQuoteWizard.Module.Items.Line.Action.View', [
    'underscore',
    'RequestQuoteWizard.Module.Items.Line.Actions.View',
    'LiveOrder.Model',
    'Profile.Model'
], function CartToQuoteRequestQuoteWizardModuleItemsLineActionView(
    _,
    RequestQuoteWizardModuleItemsLineActionsView,
    LiveOrderModel,
    ProfileModel
) {
    'use strict';

    _.extend(RequestQuoteWizardModuleItemsLineActionsView.prototype, {
        events: _.extend(RequestQuoteWizardModuleItemsLineActionsView.prototype.events, {
            'click [data-action="add-item-to-cart"]': 'addItemToCart'
        }),
        addItemToCart: function addItemToCart(e) {
            var self = this;
            var cart = LiveOrderModel.getInstance();
            var addToCartPromise;
            e.preventDefault();
            e.stopPropagation();
            addToCartPromise = cart.addLine(this.model);
            addToCartPromise.then(function thenFn() {
                self.options.model.collection.remove(self.options.model);
            });
            if (addToCartPromise) {
                self.disableElementsOnPromise(addToCartPromise, '[data-line="' + self.model.id + '"]');
            }
        },
        getContext: _.wrap(RequestQuoteWizardModuleItemsLineActionsView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var profile = ProfileModel.getInstance();
            context.lineId = this.options.model.id;
            context.isTradeAndNotIsBackOrderable = profile.get('isTrade') &&
                this.model.get('item') &&
                !this.model.get('item').get('isbackorderable') &&
                this.model.get('item').get('quantityavailable') === 0;
            return context;
        })
    });
});
