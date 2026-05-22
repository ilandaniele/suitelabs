/**
 * @NApiVersion 2.x
 * @NModuleScope Public
 */
define([
    'N/https',
    './FileUpload.Model.js'
], function FileUpload(
    https,
    fileUploadModel
) {
    'use strict';

    return {
        service: function service(ctx) {
            var output;

            try {
                switch (ctx.request.method) {
                case https.Method.GET:
                    if (ctx.request.parameters.id) {
                        output = fileUploadModel.get(ctx.request.parameters.id);
                    } else if (ctx.request.parameters.ids) {
                        output = fileUploadModel.list(ctx.request.parameters.ids.split(','));
                    }
                    break;
                case https.Method.POST:
                    output = fileUploadModel.upload(ctx.request.files);
                    break;
                default:
                    output = {
                        error: true,
                        details: 'method not implemented'
                    };
                    break;
                }
            } catch (e) {
                log.error({
                    title: 'Error in FileUpload.Service',
                    details: e
                });
                output = {
                    error: true,
                    details: e
                };
            }

            ctx.response.write(JSON.stringify(output));
        }
    };
});
