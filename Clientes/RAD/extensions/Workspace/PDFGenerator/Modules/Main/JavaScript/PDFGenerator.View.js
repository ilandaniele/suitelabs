define('PDFGenerator.View', [
    'Backbone',
    'pdf_generator.tpl',
    'underscore',
    'Utils'
], function PDFGeneratorView(
    Backbone,
    pdfGeneratorTpl,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: pdfGeneratorTpl,

        initialize: function initialize(options) {
            var self = this;
            this.pdp = options.application.getComponent('PDP');

            this.pdp.on('afterOptionSelection', function afterChangeOption(event) {
                var matrixDimension;

                matrixDimension = self.getMatrixDimension();

                if (event && matrixDimension && matrixDimension.cartOptionId === event.cartOptionId) {
                    self.render();
                }
            });
        },

        getMatrixDimension: function getMatrixDimension() {
            var product = this.pdp.getItemInfo();
            var matrixDimension = _.findWhere(product.options, { isMatrixDimension: true });

            return matrixDimension;
        },

        getItem: function getItem() {
            var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
            var selectedMatrixChildren;
            var product;
            var item;

            if (isMatrix) {
                selectedMatrixChildren = this.pdp.getSelectedMatrixChilds();

                if (selectedMatrixChildren.length === 1) {
                    item = selectedMatrixChildren[0];
                }
            } else {
                product = this.pdp.getItemInfo();
                item = product && product.item;
            }

            return item;
        },

        generateUrl: function generateUrl() {
            var isMatrix = this.pdp.getAllMatrixChilds().length > 0;
            var matrixDimension;
            var item = this.getItem();
            var url;

            if (item) {
                url = 'Modules/Main/SuiteScript2/PDFGenerator.Service.ss?id=' + item.internalid;

                if (isMatrix) {
                    matrixDimension = this.getMatrixDimension();
                    url += '&dimension=' + matrixDimension.itemOptionId;
                }

                url = _.getAbsoluteUrl(getExtensionAssetsPath(url), true);
            }

            return url;
        },

        getContext: function getContext() {
            var url = this.generateUrl();

            return {
                url: url,
                showDownloanBtn: !!url
            };
        }
    });
});
