define('Dialog.View', [
    'Backbone',
    'dialog.tpl',
    'jQuery',
    'Utils'
], function DialogView(
    Backbone,
    dialogTpl,
    jQuery,
    Utils
) {
    'use strict';

    /** @class DialogView @extend Backbone.View */
    return Backbone.View.extend({

        template: dialogTpl,

        attributes: {
            'class': 'DialogView'
        },

        events: {
            'click .dialog-footer-cancel-button': 'onCancelButtonClickedHandler',
            'click .dialog-footer-ok-button': 'onOkButtonClickedHandler',
            'click .global-views-modal-content-header-close': 'onClose'
        },
        resolveBodyHtml: function resolveBodyHtml() {
            return this.options.bodyHtml ||
                jQuery('<p>').html(this.options.bodyText || Utils.translate('Proceeding with your request...')).prop('outerHTML');
        },

        initialize: function initialize(options) {
            var doNothingFunction = function doNothing() {};
            this.hasName = !!options.name;
            this.name = options.name;
            this.headerText = options.headerText;
            this.hasHeaderText = !!this.headerText;
            this.bodyHtml = this.resolveBodyHtml();
            if (options.buttons) {
                this.hasOkButton = !!options.buttons.ok;
                if (this.hasOkButton) {
                    this.okButtonText = options.buttons.ok.text || Utils.translate('OK');
                    this.onOkButtonClicked = options.buttons.ok.onClick || doNothingFunction;
                }
                this.hasCancelButton = !!options.buttons.cancel;
                if (this.hasCancelButton) {
                    this.cancelButtonText = options.buttons.cancel.text || Utils.translate('CANCEL');
                    this.onCancelButtonClicked = options.buttons.cancel.onClick || doNothingFunction;
                }
            } else {
                this.hasOkButton = !options.hideOkButton;
                this.okButtonText = Utils.translate('OK');
                this.onOkButtonClicked = doNothingFunction;
                this.hasCancelButton = false;
            }
            this.onClose = options.onClose || doNothingFunction;
        },

        onCancelButtonClickedHandler: function onCancelButtonClickedHandler() {
            this.onCancelButtonClicked();
            this.onClose();
        },

        onOkButtonClickedHandler: function onOkButtonClickedHandler() {
            this.onOkButtonClicked();
            this.onClose();
        },

        getContext: function getContext() {
            return {
                hasName: this.hasName,
                name: this.name,
                hasHeaderText: this.hasHeaderText,
                headerText: this.headerText,
                bodyHtml: this.bodyHtml,
                hasOkButton: !!this.hasOkButton,
                okButtonText: this.okButtonText,
                hasCancelButton: !!this.hasCancelButton,
                cancelButtonText: this.cancelButtonText
            };
        }

    });
});
