define('ItemOptionsFieldHelp.View', [
    'item_options_field_help.tpl',
    'SCView',
    'jQuery',
    'underscore'
], function ItemOptionsFieldHelpViewModule(
    ItemOptionsFieldHelpTpl,
    SCViewComponent,
    jQuery,
    _
) {
    'use strict';

    var SCView = SCViewComponent.SCView;

    var ItemOptionsFieldHelpView = function ItemOptionsFieldHelpView(options) {
        SCView.call(this);

        this.options = options || {};

        this.template = ItemOptionsFieldHelpTpl;

        this.contextDataRequest = ['item'];

        this.environment = options.container.getComponent('Environment');
    };

    ItemOptionsFieldHelpView.prototype = Object.create(SCView.prototype);

    ItemOptionsFieldHelpView.prototype.constructor = ItemOptionsFieldHelpView;

    ItemOptionsFieldHelpView.prototype.getEvents = function getEvents() {
        var events = {};
        return events;
    };

    ItemOptionsFieldHelpView.prototype.onImageClick = function onImageClick(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    ItemOptionsFieldHelpView.prototype.getConfiguredItemOptions = function getConfiguredItemOptions() {
        return _.chain(this.environment.getConfig('ItemOptions.optionsConfiguration'))
            .filter(function filterVisibleItemOptions(itemOption) {
                return !!itemOption.templates;
            })
            .pluck('cartOptionId')
            .value();
    };

    ItemOptionsFieldHelpView.prototype.render = function render() {
        var item = this.contextData.item && this.contextData.item();
        var configuredItemOptions;
        var optionsToFetch;
        var itemOptions;
        var i;

        if (item) {
            configuredItemOptions = this.getConfiguredItemOptions();
            itemOptions = _.pluck(item.options, 'cartOptionId');
            optionsToFetch = _.intersection(configuredItemOptions, itemOptions);

            if (optionsToFetch && optionsToFetch.length) {
                for (i = 0; i < optionsToFetch.length; i++) {
                    jQuery.get('/core/help/fieldhelp.nl?f=' + optionsToFetch[i] + '&amp;NS_VER=2021.2.0')
                        .done(_.bind(this.fieldHelpFetched, { cartOptionId: optionsToFetch[i] }));
                }
            }
        }

        return SCView.prototype.render.apply(this, arguments);
    };

    ItemOptionsFieldHelpView.prototype.fieldHelpFetched = function fieldHelpFetched(response) {
        var tempElement = document.createElement('html');
        var textElement;
        var tooltipElement;
        var text;

        tempElement.innerHTML = response;
        textElement = tempElement.getElementsByClassName('text');

        if (textElement && textElement.length) {
            text = _.translate(textElement[0].textContent);

            if (text && _.isFunction(text.trim) && text.trim()) {
                tooltipElement = jQuery('<i class="field-help-tooltip" data-placement="auto" data-toggle="tooltip" title="' + text + '"></i>');

                jQuery('#' + this.cartOptionId + '-container label:first')
                .append(tooltipElement);

                tooltipElement.tooltip({ html: true });
            }
        }
    };

    ItemOptionsFieldHelpView.prototype.getContext = function getContext() {
        return {};
    };

    return ItemOptionsFieldHelpView;
});
