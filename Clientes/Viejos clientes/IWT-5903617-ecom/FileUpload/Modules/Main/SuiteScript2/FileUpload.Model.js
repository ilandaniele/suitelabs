/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */
define([
    'N/file',
    'N/search'
], function FileUploadModelService(
    file,
    search
) {
    'use strict';

    var FileUploadModel = {
        validateSize: function validateSize(uploadedFile) {
            var sizeInMB = uploadedFile.size / 1024 / 1024;

            return sizeInMB <= 10;
        },

        validateFileType: function validateFileType(uploadedFile, fileExtension) {
            var supportedFileTypes = [
                file.Type.PNGIMAGE,
                file.Type.JPGIMAGE,
                file.Type.GIFIMAGE,
                file.Type.WORD,
                file.Type.PDF,
                file.Type.TIFFIMAGE,
                file.Type.POWERPOINT,
                file.Type.ZIP
            ];
            var isAI = uploadedFile.fileType === 'POSTSCRIPT' && fileExtension === 'ai';
            var isPSD = uploadedFile.fileType === 'MISCBINARY' && fileExtension === 'psd';

            return supportedFileTypes.indexOf(uploadedFile.fileType) !== -1 || isAI || isPSD;
        },

        get: function get(fileId) {
            return search.lookupFields({
                type: 'file',
                id: fileId,
                columns: ['name', 'url']
            });
        },

        list: function list(fileIds) {
            var files = {};
            var filesSearch = search.create({
                type: 'file',
                columns: [{ name: 'url' }, { name: 'name' }],
                filters: [{
                    name: 'internalid',
                    operator: 'anyof',
                    values: fileIds
                }]
            });

            filesSearch.run().each(function forEachResult(result) {
                files[result.id] = {
                    name: result.getValue({
                        name: 'name'
                    }),
                    url: result.getValue({
                        name: 'url'
                    })
                };
                return true;
            });

            return files;
        },

        upload: function upload(files) {
            var pdpUploadFile = files.pdpUploadFile;
            // we need to overwrite the name of the file adding a suffix with a timestamp to be unique
            var fileNameRaw = pdpUploadFile.name.split('.'); // if the name is image.pepe.jpg we should get ['image','pepe','jpg']
            var fileNameExtension = fileNameRaw.pop(); // pop retrieves the last element and remove it from the array 'jpg'
            var fileNameBase = fileNameRaw.join('.'); // we join by . and we get again the same original name without extension 'image.pepe'
            var isValidFormat = FileUploadModel.validateFileType(pdpUploadFile, fileNameExtension);
            var isValidSize = FileUploadModel.validateSize(pdpUploadFile);

            if (!isValidFormat) {
                throw 'Unsupported file type';
            }

            if (!isValidSize) {
                throw 'File is too large, size limit is 10MB';
            }

            pdpUploadFile.name =
                fileNameBase + '_' + Date.now() + '.' + fileNameExtension;
            pdpUploadFile.folder = 5939;

            /**
             * output should be internalid of the file with the following form
             * { fileId: 'xxx' }
             */
            return {
                fileId: String(pdpUploadFile.save())
            };
        }
    };

    return FileUploadModel;
});
