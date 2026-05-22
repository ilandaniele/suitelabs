define('AwaLabs.AssamblyInstructions', [
    'AssamblyInstructions.View'
],
function AwaLabsAssamblyInstructions(
    AssamblyInstructionsView
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var layout = application.getComponent('Layout');
            var profileComponent = application.getComponent('UserProfile');
            var pdp = application.getComponent('PDP');

            if (layout && profileComponent) {
                // We wait for the profile to pass it to the view.
                profileComponent.getUserProfile().then(function afterGetUserProfile(profile) {
                    layout.addChildView('AssamblyInstructions', function addChildView() {
                        return new AssamblyInstructionsView({
                            application: application,
                            profile: profile
                        });
                    });
                });

                // Hides the AssamblyInstructions data view If assembly Instructions Approved is not checked.
                layout.addToViewContextDefinition('ProductDetails.Full.View', 'showAssamblyInstructions', 'boolean',
                function addToContextshowAssamblyInstructions() {
                    var item = pdp.getItemInfo() ? pdp.getItemInfo().item : {};
                    return item.custitem98 && item.custitem_item_assembley_instructions;
                });
            }
        }
    };
});
