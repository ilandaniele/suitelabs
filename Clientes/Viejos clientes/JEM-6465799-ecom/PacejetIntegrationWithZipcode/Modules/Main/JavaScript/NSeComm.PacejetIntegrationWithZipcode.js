
define('NSeComm.PacejetIntegrationWithZipcode', [
    'ZipCode.View',
    'Pacejet.View',
    'Pacejet.Model'
], function NSeCommPacejetIntegrationWithZipcode(
    ZipCodeView,
    PacejetView,
    PacejetModel) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var PDP = container.getComponent('PDP');

            PDP.addChildViews(PDP.PDP_FULL_VIEW, {
                'Product.Stock.Info': {
                    'Pacejet.View': {
                        childViewIndex: 1,
                        childViewConstructor: function childViewConstructor() {
                            return new PacejetView(
                                {
                                    'PacejetModel': new PacejetModel(),
                                    'PDPComponent': PDP
                                }
                            );
                        }
                    }
                }
            });

            if (layout) {
                layout.addChildView('Header', function addChildView() {
                    return new ZipCodeView(
                        {
                            'PacejetModel': new PacejetModel()
                        }
                    );
                });
            }
        }
    };
});
