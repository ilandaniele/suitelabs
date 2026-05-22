define('AgeVerificationPopUp', [
    'AgeVerificationPopUp.View'
], function AgeVerificationPopUpModule(
    AgeVerificationPopUpView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var layout = container.getComponent('Layout');
            var environment = container.getComponent('Environment');
			var PDP = container.getComponent('PDP');

            if (PDP) {
                PDP.addChildView('Product.Options', function addInventoryLocationQuantitiesTableView() {
                    return new InventoryLocationQuantitiesTableView({
                        container: container,
                        pdp: PDP
                    });
                });
            }
			//agrego la vista hija a la PDP, en esta vista hago la movida.
			
			
            var ageVerificationPopUpViewModal;
            var modalMessageWasDisplayed = false;

            if (layout && environment && !environment.isPageGenerator()) {
                if (!getCookie(cookie)) {
                    ageVerificationPopUpViewModal = new AgeVerificationPopUpView({
                        container: container
                    });

                    layout.on('afterShowContent', function afterShowContent() {
                        if (!modalMessageWasDisplayed) {
                            layout.showContent(ageVerificationPopUpViewModal, {
                                showInModal: true,
                                options: {
                                    className: 'age-verification-pop-up-modal',
                                    modalOptions: {
                                        keyboard: false,
                                        backdrop: 'static'
                                    }
                                }
                            });
                            modalMessageWasDisplayed = true;
                        }
                    });
                }
            }
        }
    };
});
