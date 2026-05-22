define('NSeComm.PLPCustomFields', [
    'PLPCustomFields.View'
], function NSeCommPLPCustomFields(
    PLPCustomFieldsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var plp = container.getComponent('PLP');
            var environment = container.getComponent('Environment');

            if (plp) {
                plp.addChildViews(plp.PLP_VIEW, {
                    'ItemViews.Price': {
                        'PLPCustomFields': {
                            childViewIndex: 1,
                            childViewConstructor: function PLPCustomFieldsViewConstructor() {
                                return function CreateView() {
                                    return new PLPCustomFieldsView({
                                        plp: plp,
                                        container: container,
                                        additionalFields: environment.getConfig('extensions.PLPCustomFields.fields')
                                    });
                                };
                            }
                        }
                    }
                });
            }
        }
    };
});
