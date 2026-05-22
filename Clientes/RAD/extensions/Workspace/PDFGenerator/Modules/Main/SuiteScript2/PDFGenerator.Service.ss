/**
* @NApiVersion 2.x
* @NModuleScope Public
*/
define([
    './PDFGenerator.Model.js'
], function PDFGeneratorService(
    PDFGeneratorModel
) {
    'use strict';

    return {
        service: function service(ctx) {
            var result;

            try {
                if (ctx.request.parameters) {
                    result = PDFGeneratorModel.generate(
                        ctx.request.parameters.id,
                        ctx.request.parameters.dimension
                    );

                    if (result) {
                        ctx.response.writeFile({
                            file: result
                        });

                        ctx.response.setHeader({
                            name: 'X-Robots-Tag',
                            value: 'noindex'
                        });
                    } else {
                        ctx.response.write({
                            output: 'Sorry, but the file could not be generated, please contact the system administrator'
                        });
                    }
                }
            } catch (e) {
                log.error('There was an error in the PDFGenerator service', e.message);
            }
        }
    };
});
