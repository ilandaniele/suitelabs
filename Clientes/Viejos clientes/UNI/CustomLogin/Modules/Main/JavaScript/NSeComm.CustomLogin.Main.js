define('NSeComm.CustomLogin.Main', [
    'CustomLogin.View'
], function NSeCommCustomLoginMain(
    CustomLoginView
) {
    'use strict';
 
    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            if (layout) {
                layout.addChildViews(
                    'LoginRegister.View',
                    {
                        'Login': {
                            'CustomLoginView': {
                                childViewIndex: 1,
                                childViewConstructor: function () {
                                    return new CustomLoginView({ container: container });
                                }
                            }
                        }
                    }
                );
            }
        }
    };
});