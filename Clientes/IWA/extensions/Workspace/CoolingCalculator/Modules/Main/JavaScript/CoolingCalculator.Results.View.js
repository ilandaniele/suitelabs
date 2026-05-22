define('CoolingCalculator.Results.View', [
    'CoolingCalculator.Results.Model',
    'cooling_calculator_results.tpl',
    'Backbone',
    'jQuery',
    'underscore'
], function CoolingCalculatorResultsViewModule(
    CoolingCalculatorResultsModel,
    CoolingCalculatorResultsTpl,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    var PageTypeBaseView = Backbone.View;

    return PageTypeBaseView.extend({
        template: CoolingCalculatorResultsTpl,

        initialize: function initialize(options) {
            this.options = options || {};
            this.tlcId = options.routerArguments[0];

            this.model = new CoolingCalculatorResultsModel({
                internalid: this.tlcId
            });
        },

        beforeShowContent: function beforeShowContent() {
            var promise = jQuery.Deferred();

            this.model.fetch({
                data: {
                    action: 'getThermalDetails',
                    tlcId: this.tlcId
                }
            }).always(function afterFetch() {
                promise.resolve();
            });
            return promise;
        },

        getContext: function getContext() {
            var items = this.model.get('items');
            var itemsByType = {};
            var isPreview = this.tlcId && this.model.get('isPreview');

            _(items).chain()
            .sortBy(function sortByBTUH(item) {
                return parseInt(item.btuh, 0);
            })
            .each(function eachItem(item) {
                var unitType = item.unitType;

                itemsByType[unitType] = itemsByType[unitType] || {
                    unitType: item.unitType_text,
                    itemList: []
                };

                item.exposure_text = item.exposure_text.split(',').join(' / ');

                if (item.notes) {
                    try {
                        item.notes = jQuery(item.notes).text();
                    } catch (e) {}
                }

                itemsByType[unitType].itemList.push(item);
            });
            items = _(_(itemsByType).toArray()).compact();

            return {
                tlcId: this.model.get('tlcId'),
                totalLoad: this.model.get('totalLoad'),
                items: items,
                hasItems: items.length > 0,
                isPreview: isPreview
            };
        }
    });
});
