define('CartRestrictionPopUp.View', [
    'SCView',
    'cart_restriction_pop_up.tpl'
], function CartRestrictionPopUpViewModule(
    SCViewComponent,
    CartRestrictionPopUpTpl
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    var popUpContent = '';

    var CartRestrictionPopUpView = function CartRestrictionPopUpView(options) {
        SCView.call(this);

        this.options = options || {};
        this.template = CartRestrictionPopUpTpl;
        this.attributes = {
            'id': 'CartRestrictionPopUpView',
            'class': 'CartRestrictionPopUp-view'
        };
        popUpContent = this.options.message;
    };

    CartRestrictionPopUpView.prototype = Object.create(SCView.prototype);

    CartRestrictionPopUpView.prototype.constructor = CartRestrictionPopUpView;

    CartRestrictionPopUpView.prototype.render = function render() {
        SCView.prototype.render.apply(this, arguments);
    };

    CartRestrictionPopUpView.prototype.getContext = function getContext() {
        return {
            popUpContent: popUpContent
        };
    };

    return CartRestrictionPopUpView;
});
