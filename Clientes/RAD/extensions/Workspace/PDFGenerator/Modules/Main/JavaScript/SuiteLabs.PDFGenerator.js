define('SuiteLabs.PDFGenerator', [
    'PDFGenerator.View',
    'underscore'
], function SuiteLabsPDFGenerator(
    PDFGeneratorView,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var PDP = container.getComponent('PDP');

            PDP.addChildView('PDFGenerator', function PDFGenerator() {
                return new PDFGeneratorView({ application: container });
            });
        }
    };
});
