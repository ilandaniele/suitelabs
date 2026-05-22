define('AwaLabs.DynamicMerchandisingZones', [
    'MerchandisingZoneSliders',
    'Item.Collection',
    'Merchandising.View',
    'Backbone',
    'underscore',
    'Utils',
    'awalabs_dynamicmerchandisingzones.tpl'
], function DynamicMerchandisingZone(
    MerchandisingZoneSliders,
    ItemCollection,
    MerchandisingView,
    Backbone,
    _,
    Utils,
    awalabsDynamicmerchandisingzones
) {
    'use strict';

    var loadTpl = function loadTplIntoView(view, tplName) {
        var tplFn;

        if (tplName) {
            // we try to get the 'template' from the merchandising rule
            try {
                tplFn = Utils.requireModules(tplName + '.tpl');
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn('Template ' + tplName + ' is not compiled into the application, using default');
            }
            if (tplFn) {
                view.template = tplFn;
            } else {
                view.template = awalabsDynamicmerchandisingzones;
            }
        } else {
            view.template = awalabsDynamicmerchandisingzones;
        }
    };

    return {
        mountToApp: function mountToApp(application) {
            var Layout = application.getLayout();
            this.application = application;

            Backbone.Events.on('cms:custom:merchzone-rendered',

                function onMZRender(itemsData, options) {
                    _.defer(function deferredAppend() {
                        var $placeHolder = Layout.$('#' + options.divId);
                        var collection = new ItemCollection(itemsData, { parse: true });

                        var view = new MerchandisingView({
                            items: collection,
                            model: new Backbone.Model({
                                show: Infinity
                            })
                        });

                        var containerTpl = $placeHolder.closest('[data-cms-area]').data('template');

                        loadTpl(view, containerTpl || options.tpl);


                        view.setElement($placeHolder[0]);
                        view.render();
                        view.trigger('afterMerchandAppendToDOM');

                    });
                }
            );
        }
    };
});
