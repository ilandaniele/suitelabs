define('InventoryLocationQuantitiesTable.View', [
    'inventory_location_quantities_table.tpl',
    'SCView'
], function InventoryLocationQuantitiesTableViewModule(
    InventoryLocationQuantitiesTableTpl,
    SCViewComponent
) {
    'use strict';


    var SCView = SCViewComponent.SCView;

    var InventoryLocationQuantitiesTableView = function InventoryLocationQuantitiesTableView(options) {
        var self = this;
        SCView.call(this);
        this.options = options || {};
        this.template = InventoryLocationQuantitiesTableTpl;
        this.attributes = {
            'id': 'InventoryLocationQuantitiesTableView',
            'class': 'InventoryLocationQuantitiesTable-view'
        };
        this.contextDataRequest = ['item'];
        this.table = [];
        this.title = '';

        this.options.pdp.on('afterOptionSelection', function afterOptionSelection() {
            self.render();
        });
    };

    InventoryLocationQuantitiesTableView.prototype = Object.create(SCView.prototype);

    InventoryLocationQuantitiesTableView.prototype.constructor = InventoryLocationQuantitiesTableView;

    InventoryLocationQuantitiesTableView.prototype.getContext = function getContext() {
        var item = this.contextData.item && this.contextData.item();
        this.getInventoryLocationData(item);

        return {
            title: this.title,
            table: this.table
        };
    };

    InventoryLocationQuantitiesTableView.prototype.getInventoryLocationData = function getInventoryLocationData(item) {
        var itemToGenerate = {};
        if (item.matrixchilditems_detail && item.matrixchilditems_detail.length > 0) {
            if (this.options.pdp.getSelectedMatrixChilds().length === 1) {
                itemToGenerate = this.options.pdp.getSelectedMatrixChilds()[0];
            } else {
                itemToGenerate = {};
            }
        } else {
            itemToGenerate = item;
        }

        this.table = [];
        this.title = '';
        if (itemToGenerate !== {}) {
            if (itemToGenerate.custitem_csgscr_inv_loc_one > 0) {
                this.table.push({ name: 'SUMC', quantity: itemToGenerate.custitem_csgscr_inv_loc_one });
            }
            if (itemToGenerate.custitem_csgscr_inv_loc_two > 0) {
                this.table.push({ name: 'Medical', quantity: itemToGenerate.custitem_csgscr_inv_loc_two });
            }
            if (itemToGenerate.custitem_csgscr_inv_loc_three > 0) {
                this.table.push({ name: 'McKale', quantity: itemToGenerate.custitem_csgscr_inv_loc_three });
            }
            if (itemToGenerate.custitem_csgscr_inv_loc_four > 0) {
                this.table.push({ name: 'Threads', quantity: itemToGenerate.custitem_csgscr_inv_loc_four });
            }
            if (itemToGenerate.custitem_csgscr_inv_loc_five > 0) {
                this.table.push({ name: 'Biosphere', quantity: itemToGenerate.custitem_csgscr_inv_loc_five });
            }
            if (itemToGenerate.custitemcsgscr_inv_loc_six > 0) {
                this.table.push({ name: 'Flandrau', quantity: itemToGenerate.custitemcsgscr_inv_loc_six });
            }
            if (itemToGenerate.custitem_csgscr_inv_loc_seven > 0) {
                this.table.push({ name: 'Souvenirs', quantity: itemToGenerate.custitem_csgscr_inv_loc_seven });
            }

            if (this.table.length > 0) {
                this.title = itemToGenerate.custitem_csgscr_inv_details;
            }
        }
    };

    return InventoryLocationQuantitiesTableView;
});
