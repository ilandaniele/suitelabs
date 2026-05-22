define('CoolingCalculator.View', [
    'CoolingCalculator.Results.Model',
    'cooling_calculator.tpl',
    'PageType.Base.View',
    'jQuery'
], function CoolingCalculatorViewModule(
    CoolingCalculatorModel,
    CoolingCalculatorTpl,
    PageTypeBaseViewComponent,
    jQuery
) {
    'use strict';

    var PageTypeBaseView = PageTypeBaseViewComponent.__esModule ? // eslint-disable-line no-underscore-dangle
        PageTypeBaseViewComponent.PageTypeBaseView :
        PageTypeBaseViewComponent;

    return PageTypeBaseView.extend({
        template: CoolingCalculatorTpl,

        initialize: function initialize() {
            this.model = new CoolingCalculatorModel();
        },

        getTitle: function getTitle() {
            return this.options.pageInfo.title;
        },

        beforeShowContent: function beforeShowContent() {
            var promise = jQuery.Deferred();

            this.options.pageInfo = {
                title: 'Thermal Load Calculation Worksheet',
                url: 'cellar-sizing-tool'
            };

            this.model.fetch({
                data: {
                    action: 'getRValues'
                }
            }).always(function afterFetch(data) {
                SC.SESSION = SC.SESSION || {};
                SC.SESSION.rValues = data.rValues;
                promise.resolve();
            });
            return promise;
        },

        getContext: function getContext() {
            return {};
        }
    });
});
