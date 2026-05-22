define('PDPCustomField.Base.View', [
    'SCView',
    'underscore'
], function PDPCustomFieldBaseViewModule(
    SCViewComponent,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    function BaseView(options) {
        var self = this;

        SCView.call(this);

        this.options = options;
        this.contextDataRequest = ['item'];
        this.pdp = options.application.getComponent('PDP');
        this.environment = options.application.getComponent('Environment');

        this.pdp.on('afterOptionSelection', function afterOptionSelection(changedOption) {
            var selectedMatrixChildren;
            var matrixDimensions = self.getMatrixDimensions();

            if (
                changedOption
                && changedOption.cartOptionId
                && matrixDimensions.indexOf(changedOption.cartOptionId) >= 0
            ) {
                selectedMatrixChildren = self.pdp.getSelectedMatrixChilds();

                if (selectedMatrixChildren && selectedMatrixChildren.length === 1) {
                    self.render();
                }
            }
        });
    }

    BaseView.prototype = Object.create(SCView.prototype);

    BaseView.prototype.constructor = BaseView;

    BaseView.prototype.getMatrixDimensions = function getMatrixDimensions() {
        var itemInfo = this.pdp.getItemInfo();
        var options = itemInfo ? itemInfo.options : [];

        return _.chain(options)
            .filter({ isMatrixDimension: true })
            .pluck('cartOptionId')
            .value();
    };

    BaseView.prototype.getItem = function getItem() {
        var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
        var selectedMatrixChildren;
        var item;

        if (isMatrix) {
            selectedMatrixChildren = this.pdp.getSelectedMatrixChilds();

            if (selectedMatrixChildren.length === 1) {
                item = selectedMatrixChildren[0];
            }
        } else {
            item = this.contextData.item();
        }

        return item;
    };

    return BaseView;
});
