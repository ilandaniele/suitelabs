define('NSeComm.FileUpload.Common', [

], function NSeCommFileUploadCommon(

) {
    'use strict';

    function getLinkAttributes(context) {
        // removes parameters for file item options
        return context.linkAttributes
            .replace(/(file)=[^"]*/g, '')
            .replace(/\?"/g, '"');
    }

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');

            layout.addToViewContextDefinition('Cart.Lines.View', 'linkAttributes', 'string', getLinkAttributes);
            layout.addToViewContextDefinition('Header.MiniCartItemCell.View', 'linkAttributes', 'string', getLinkAttributes);
        }
    };
});
