define('NSeComm.MyAccountAdditionalFields', [
    'MyAccountAdditionalFields.Base.View',
    'MyAccountAdditionalFields.Model',
    'underscore'
], function NSeCommMyAccountAdditionalFields(
    MyAccountAdditionalFieldsBaseView,
    MyAccountAdditionalFieldsModel,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var myAccountMenu = container.getComponent('MyAccountMenu');
            var pageType = container.getComponent('PageType');
            var environmentComponent = container.getComponent('Environment');
            var additionalFields;
            var myAccountAdditionalFieldsModel = new MyAccountAdditionalFieldsModel();

            var MyAccountAdditionalFieldsMenuGroupEntry = {
                id: 'MyAccountAdditionalFields',
                groupid: 'settings',
                name: _.translate('ADDITIONAL_FIELDS_SECTION_TITLE'),
                index: environmentComponent.getConfig('myAccountAdditionalFields.index'),
                url: 'additional-fields'
            };

            myAccountAdditionalFieldsModel.fetch({
                data: {
                    action: 'hasAdditionalFields'
                }
            }).then(function hasAdditionalFieldsCallSuccessfull() {
                additionalFields = myAccountAdditionalFieldsModel.get('additionalFields');
                if (!additionalFields) {
                    myAccountMenu.addGroupEntry(MyAccountAdditionalFieldsMenuGroupEntry);
                }
            });

            pageType.registerPageType({
                name: _.translate('ADDITIONAL_FIELDS_SECTION_TITLE'),
                routes: ['additional-fields'],
                view: MyAccountAdditionalFieldsBaseView,
                options: {
                    model: myAccountAdditionalFieldsModel
                }
            });
        }
    };
});
