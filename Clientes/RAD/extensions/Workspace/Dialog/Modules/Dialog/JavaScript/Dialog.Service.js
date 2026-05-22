define('Dialog.Service', [
    'Dialog.View',
    'underscore'
], function Dialog(
    DialogView,
    _
) {
    'use strict';

    var DialogService = function DialogService(application) {
        this.application = application;
    };

    _.extend(DialogService.prototype, {
        getConfigData: function getConfigData(name) {
            var configuration = this.application.getComponent('Environment');
            var config = _.findWhere(configuration.getConfig('dialogsConfig'), { name: name });
            var buttons = {};
            if (config) {
                if (config.hasOkBtn) {
                    buttons.ok = {
                        text: config.okBtnText
                    };
                }
                if (config.hasCancelBtn) {
                    buttons.cancel = {
                        text: config.cancelBtnText
                    };
                }
                config.buttons = buttons;
                return config;
            }
            return {};
        },
        openModalDialog: function openModalDialog(viewOptions) {
            this.application.getLayout().showInModal(
                new DialogView(viewOptions), {
                    modalOptions: {
                        backdrop: 'static',
                        keyboard: false
                    }
                }
            );
        },
        openDialog: function openDialog(params) {
            var options;
            var dialogConfig;
            if (_.isString(params)) {
                options = {
                    name: params
                };
            } else {
                options = {
                    name: params.name,
                    headerText: params.headerText,
                    bodyHtml: params.bodyHtml || params.bodyText,
                    buttons: params.buttons,
                    onClose: params.onClose,
                    hideOkButton: params.hideOkButton
                };
            }
            if (options.name) {
                dialogConfig = this.getConfigData(options.name);
                _.extend(options, {
                    headerText: dialogConfig.headerText || options.headerText,
                    bodyHtml: dialogConfig.bodyHtml || options.bodyHtml || dialogConfig.body,
                    buttons: dialogConfig.buttons || options.buttons
                });
                if (dialogConfig.buttons && dialogConfig.buttons.ok && options.buttons && options.buttons.ok) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            ok: {
                                text: dialogConfig.buttons.ok.text || options.buttons.ok.text,
                                onClick: options.buttons.ok.onClick
                            }
                        })
                    });
                }
                if (dialogConfig.buttons && dialogConfig.buttons.cancel && options.buttons && options.buttons.cancel) {
                    _.extend(options, {
                        buttons: _.extend({}, options.buttons, {
                            cancel: {
                                text: dialogConfig.buttons.cancel.text || options.buttons.cancel.text,
                                onClick: options.buttons.cancel.onClick
                            }
                        })
                    });
                }
                this.openModalDialog(options);
            } else {
                this.openModalDialog(options);
            }
        }
    });
    return DialogService;
});
