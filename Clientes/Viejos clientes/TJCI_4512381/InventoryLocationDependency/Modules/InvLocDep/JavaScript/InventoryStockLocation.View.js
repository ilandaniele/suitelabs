define('InventoryStockLocation.View', [
    'SCView',
    'inventory_stock_location.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function InventoryStockLocationView(
    SCViewComponent,
    InventoryStockLocationTpl,
    Backbone,
    jQuery,
    _) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function InventoryStockLocationViewMain(options) {
        var self = this;
        SCView.call(this);

        this.options = options || {};
        this.container = options.container;
        this.template = InventoryStockLocationTpl;
        this.noItem = false;
        this.pdpitem = this.options.pdp.getItemInfo();
        self.locations = this.pdpitem.item.quantityavailable_detail.locations;
        console.log('this.pdpitem', this.pdpitem);

        if (self.locations.length === 0) {
            self.noItem = true;
        } else {
            self.locArr = _.map(self.locations, function (ab, c) {
                console.log('c', c);
                if (ab.internalid === '1') {
                    ab.location = 'MS';
                } else if (ab.internalid === '2') {
                    ab.location = 'WI';
                } else {
                    ab.location = 'NV';
                }
                return ab;
            });
        }
        self.render();
    }

    // Inherit parent instance methods.
    InventoryStockLocationViewMain.prototype = Object.create(SCView.prototype);

    // Restore the constuctor
    InventoryStockLocationViewMain.prototype.constructor = InventoryStockLocationViewMain;
    InventoryStockLocationViewMain.prototype.getContext = function () {
        return {
            locations: this.locArr,
            noItem: this.noItem
        };
    };

    InventoryStockLocationViewMain.prototype.validateContextDataRequest = function () {
        return true;
    };
    InventoryStockLocationViewMain.prototype.contextDataRequest = ['item'];

    // Return the AMD constructor.
    return InventoryStockLocationViewMain;
});
