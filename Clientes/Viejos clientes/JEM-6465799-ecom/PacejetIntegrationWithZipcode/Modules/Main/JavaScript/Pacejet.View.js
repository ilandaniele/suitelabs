define('Pacejet.View', [
    'pacejetintegrationwithzipcode_pacejet_rates.tpl',
    'SCView',
    'jQuery'
], function PacejetViewModule(
    PacejetTpl,
    SCViewComponent,
    jQuery
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function PacejetView(options) {
        var self = this;

        SCView.call(this);
        this.options = options || {};
        this.template = PacejetTpl;
        this.zipCode = '';
        this.show = true;
        this.rates = {};

        this.contextDataRequest = ['item'];

        this.options.PDPComponent.on('afterQuantityChange', function afterQuantityChange() {
            self.pacejetCall();
        });
    }

    PacejetView.prototype = Object.create(SCView.prototype);
    PacejetView.prototype.constructor = PacejetView;
    PacejetView.prototype.getContext = function getContext() {
        if (!this.rates.fastestArrivalDate && !this.rates.lowestCostArrivalDate) {
            this.show = false;
        }

        return {
            zipCode: this.zipCode,
            rates: this.rates,
            show: this.show
        };
    };
    PacejetView.prototype.render = function render() {
        var self = this;
        var args = arguments;
        this.pacejetCall().always(function afterPacejetCall() {
            SCView.prototype.render.apply(self, args);
        });
    };

    PacejetView.prototype.pacejetCall = function pacejetCall() {
        var self = this;
        var item = this.options.PDPComponent.getItemInfo();
        var pacejetPromise = jQuery.Deferred();

        var properties = {
            width: item.item.custitem_pacejet_item_width,
            height: item.item.custitem_pacejet_item_height,
            length: item.item.custitem_pacejet_item_length,
            weight: item.item.weight,
            id: item.item.internalid,
            quantity: item.quantity
        };

        this.options.PacejetModel.fetch({
            data: {
                action: 'getZipCodeAndPajecetData',
                item: JSON.stringify(properties)
            }
        }).done(function pacejetSuccessfull() {
            self.zipCode = self.options.PacejetModel.get('zipCode');
            self.rates = self.options.PacejetModel.get('rates');
            if (!self.zipCode) {
                self.show = false;
            }
        }).always(function pacejetAlways() {
            pacejetPromise.resolve();
        });
        return pacejetPromise;
    };

    return PacejetView;
});
