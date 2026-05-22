define('CartRestriction.Model', [
    'SCModel'
], function CartRestrictionModel(
    SCModelComponent
) {
    'use strict';

    var SCModel = SCModelComponent.SCModel;
    function CartRestrictionModelObject(url) {
        SCModel.call(this);
        this.urlRoot = function urlRoot() {
            return url;
        };
    }

    CartRestrictionModelObject.prototype = Object.create(SCModel.prototype);
    CartRestrictionModelObject.prototype.constructor = CartRestrictionModelObject;
    return CartRestrictionModelObject;
});
