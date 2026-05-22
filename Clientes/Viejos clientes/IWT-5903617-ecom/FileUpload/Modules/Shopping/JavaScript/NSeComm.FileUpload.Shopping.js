define('NSeComm.FileUpload.Shopping', [
    'NSeComm.FileUpload.PDP',
    'NSeComm.FileUpload.Cart',
    'NSeComm.FileUpload.Common'
], function NSeCommFileUploadShopping(
    NSeCommFileUploadPDP,
    NSeCommFileUploadCart,
    NSeCommFileUploadCommon
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            NSeCommFileUploadPDP.mountToApp(container);
            NSeCommFileUploadCart.mountToApp(container);
            NSeCommFileUploadCommon.mountToApp(container);
        }
    };
});
