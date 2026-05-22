define('AssamblyInstructions.View', [
    'awalabs_assambly_instructions.tpl',
    'AssamblyInstructions.Modal.View',
    'Backbone'
], function AssamblyInstructionsView(
    awalabsAssamblyInstructionsTpl,
    AssamblyInstructionsModalView,
    Backbone
) {
    'use strict';

    return Backbone.View.extend({

        template: awalabsAssamblyInstructionsTpl,
        events: {
            'click [data-action="showModal"]': 'showMessageInModal'
        },
        initialize: function initialize(options) {
            var pdp = options.application.getComponent('PDP');
            this.item = pdp.getItemInfo() ? pdp.getItemInfo().item : {};
            this.application = options.application;
            this.profile = options.profile;
        },
        showMessageInModal: function showMessageInModal() {
            var layout = this.options.application.getComponent('Layout');
            var messageModalView = new AssamblyInstructionsModalView({
                application: this.application
            });

            layout.showContent(messageModalView, { showInModal: true, options: { className: 'assambly-instructions-modal' } });
        },
        getContext: function getContext() {
            var itemAssamblyInstructions = this.item.custitem_item_assembley_instructions;

            return {
                assamblyInstrucitonsLink: itemAssamblyInstructions,
                isUserLoggedIn: this.profile.isloggedin
            };
        }
    });
});
